import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="relative isolate min-h-dvh overflow-x-clip bg-app-canvas text-app-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-28 top-[-8rem] size-72 rounded-full bg-brand-cyan/8 blur-3xl" />
        <div className="absolute -right-32 top-1/3 size-80 rounded-full bg-brand-lime/6 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.025)_1px,transparent_1px)] bg-[size:100%_5rem] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="mx-auto flex min-h-dvh w-full max-w-app flex-col">
        <header className="safe-area-top border-b border-white/8 bg-app-canvas/75 backdrop-blur-xl">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
            <div
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-2xl border border-brand-lime/30 bg-brand-lime/10 font-mono text-xs font-black tracking-tight text-brand-lime shadow-lime-glow"
            >
              PC
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold tracking-tight text-white">
                Pickleball Cuzzies
              </p>
              <p className="text-xs text-slate-400">Mobile court companion</p>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="w-full">{children}</div>
        </main>

        <footer className="safe-area-bottom px-4 text-center sm:px-6">
          <p className="text-xs leading-5 text-slate-500">
            Built for quick decisions between rallies.
          </p>
        </footer>
      </div>
    </div>
  );
}
