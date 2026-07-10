"use client";

import { Repeat2, Trophy } from "lucide-react";

export type PlayStyle = "tournament" | "rotation";

type PlayStyleSelectorProps = {
  value: PlayStyle;
  onChange: (value: PlayStyle) => void;
};

const options = [
  {
    value: "tournament" as const,
    title: "Tournament Style",
    description: "Fill every available court with balanced matchups.",
    icon: Trophy,
    accent: "lime",
  },
  {
    value: "rotation" as const,
    title: "One Match Rotation",
    description: "Run one court while the longest-waiting crew rotates in.",
    icon: Repeat2,
    accent: "cyan",
  },
];

export function PlayStyleSelector({
  value,
  onChange,
}: PlayStyleSelectorProps) {
  return (
    <fieldset className="mt-10 space-y-3">
      <legend className="mb-3 text-left text-sm font-bold text-slate-200">
        How are the cuzzies playing?
      </legend>

      {options.map((option) => {
        const Icon = option.icon;
        const isActive = value === option.value;
        const activeClasses =
          option.accent === "lime"
            ? "border-brand-lime/70 bg-brand-lime/10 shadow-lime-glow"
            : "border-brand-cyan/70 bg-brand-cyan/10 shadow-[0_0_28px_rgb(34_211_238/0.12)]";

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`group flex min-h-24 w-full items-center gap-4 rounded-3xl border p-4 text-left transition-colors ${
              isActive
                ? activeClasses
                : "border-white/10 bg-app-surface/60 hover:border-white/20 hover:bg-app-surface"
            }`}
          >
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-2xl border ${
                isActive
                  ? "border-current bg-black/20 text-white"
                  : "border-white/10 bg-white/5 text-slate-400"
              }`}
            >
              <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold tracking-tight text-white">
                {option.title}
              </span>
              <span className="mt-1 block text-sm leading-5 text-slate-400">
                {option.description}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={`size-4 shrink-0 rounded-full border-2 ${
                isActive
                  ? option.accent === "lime"
                    ? "border-brand-lime bg-brand-lime shadow-[0_0_12px_rgb(204_255_0/0.7)]"
                    : "border-brand-cyan bg-brand-cyan shadow-[0_0_12px_rgb(34_211_238/0.7)]"
                  : "border-slate-600"
              }`}
            />
          </button>
        );
      })}
    </fieldset>
  );
}
