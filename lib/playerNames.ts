export function normalizePlayerName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

export function parsePlayerNames(input: string): string[] {
  const seen = new Set<string>();

  return input
    .split(/[\n,;]+/)
    .map((entry) =>
      normalizePlayerName(
        entry.replace(/^\s*(?:[-*•–—]|\d+[.)])\s*/, ""),
      ),
    )
    .filter((name) => {
      const key = name.toLocaleLowerCase();
      if (!name || name.length > 40 || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
