"use client";

import { Minus, Plus } from "lucide-react";

type ScoreStepperProps = {
  score: number;
  teamLabel: string;
  tone: "cyan" | "lime";
  disabled?: boolean;
  onChange: (score: number) => void;
};

export function ScoreStepper({
  score,
  teamLabel,
  tone,
  disabled = false,
  onChange,
}: ScoreStepperProps) {
  const accentClass =
    tone === "cyan"
      ? "bg-brand-cyan/12 text-brand-cyan hover:bg-brand-cyan/20"
      : "bg-brand-lime/12 text-brand-lime hover:bg-brand-lime/20";

  return (
    <div className="mt-3 grid grid-cols-[3.25rem_1fr_3.25rem] items-center gap-2 rounded-2xl border border-white/8 bg-slate-950/65 p-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, score - 1))}
        disabled={disabled || score === 0}
        aria-label={`Subtract a point from ${teamLabel}`}
        className={`grid size-[3.25rem] place-items-center rounded-xl ${accentClass} disabled:cursor-not-allowed disabled:opacity-25`}
      >
        <Minus aria-hidden="true" size={24} strokeWidth={2.8} />
      </button>

      <output
        key={score}
        aria-label={`${teamLabel} score`}
        aria-live="polite"
        className="animate-score-pop text-center font-mono text-4xl font-black tabular-nums text-white"
      >
        {score}
      </output>

      <button
        type="button"
        onClick={() => onChange(Math.min(99, score + 1))}
        disabled={disabled || score === 99}
        aria-label={`Add a point to ${teamLabel}`}
        className={`grid size-[3.25rem] place-items-center rounded-xl ${accentClass} disabled:cursor-not-allowed disabled:opacity-25`}
      >
        <Plus aria-hidden="true" size={24} strokeWidth={2.8} />
      </button>
    </div>
  );
}
