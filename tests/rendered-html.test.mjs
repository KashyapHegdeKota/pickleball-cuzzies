import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Pickleball Cuzzies application shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.match(html, /<title>Pickleball Cuzzies<\/title>/i);
  assert.match(html, /name="theme-color" content="#020617"/i);
  assert.match(html, /Loading the crew/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /\/og\.png/i);
});

test("keeps the mobile design system centralized", async () => {
  const [page, layout, shell, tailwind, packageJson, appFiles, css] =
    await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/layout/AppShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../tailwind.config.mjs", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../app/", import.meta.url)),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(css, /--app-canvas:\s*#020617/);
  assert.match(css, /--brand-lime:\s*#ccff00/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(tailwind, /"brand-cyan": "#22d3ee"/);
  assert.match(shell, /min-h-dvh/);
  assert.match(shell, /max-w-app/);
  assert.match(page, /<AppShell>/);
  assert.match(layout, /viewportFit:\s*"cover"/);
  assert.match(packageJson, /"name": "pickleball-cuzzies"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /drizzle/);
  assert.ok(!appFiles.includes("_sites-preview"));
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
  const socialImage = await stat(new URL("../public/og.png", import.meta.url));
  assert.ok(socialImage.size > 100_000);
});
