"use client";

import { ChevronDown, ClipboardPaste, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";

type BulkImportProps = {
  existingNames: string[];
  onImport: (names: string[]) => void;
};

export function parsePlayerNames(input: string): string[] {
  const seen = new Set<string>();

  return input
    .split(/[\n,;]+/)
    .map((entry) =>
      entry
        .replace(/^\s*(?:[-*•–—]|\d+[.)])\s*/, "")
        .trim()
        .replace(/\s+/g, " "),
    )
    .filter((name) => {
      const key = name.toLocaleLowerCase();
      if (!name || name.length > 40 || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function BulkImport({ existingNames, onImport }: BulkImportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const importableNames = useMemo(() => {
    const existing = new Set(
      existingNames.map((name) => name.toLocaleLowerCase()),
    );
    return parsePlayerNames(value).filter(
      (name) => !existing.has(name.toLocaleLowerCase()),
    );
  }, [existingNames, value]);

  function handleImport() {
    if (importableNames.length === 0) return;
    onImport(importableNames);
    setValue("");
    setIsOpen(false);
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/4">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="bulk-import-panel"
        className="flex min-h-16 w-full items-center gap-3 px-4 text-left"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
          <ClipboardPaste aria-hidden="true" size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold text-white">Bulk import</span>
          <span className="mt-0.5 block truncate text-xs text-slate-500">
            Paste WhatsApp, iMessage, or Notes names
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          size={19}
          className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div id="bulk-import-panel" className="border-t border-white/8 p-4">
          <label htmlFor="bulk-player-names" className="sr-only">
            Comma or newline separated player names
          </label>
          <textarea
            id="bulk-player-names"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            rows={6}
            maxLength={5000}
            placeholder={"Malia, Jordan, Kai\nAvery\nNoah"}
            className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-base leading-6 text-white placeholder:text-slate-700 focus:border-brand-cyan/60 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="flex min-h-11 items-center gap-2 text-sm text-slate-400">
              <UsersRound aria-hidden="true" size={17} />
              {importableNames.length} new {importableNames.length === 1 ? "player" : "players"}
            </p>
            <button
              type="button"
              onClick={handleImport}
              disabled={importableNames.length === 0}
              className="min-h-11 rounded-xl bg-brand-cyan px-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Add all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
