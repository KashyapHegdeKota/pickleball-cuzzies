"use client";

import type { SkillTier } from "@/types/game";

type SkillTierSelectorProps = {
  value: SkillTier;
  onChange: (skill: SkillTier) => void;
  playerName: string;
};

const tiers: Array<{
  value: SkillTier;
  label: string;
  activeClassName: string;
}> = [
  {
    value: "good",
    label: "Good",
    activeClassName: "bg-emerald-400/15 text-emerald-300",
  },
  {
    value: "mid",
    label: "Mid",
    activeClassName: "bg-amber-400/15 text-amber-300",
  },
  {
    value: "ass",
    label: "Ass",
    activeClassName: "bg-orange-500/15 text-orange-300",
  },
];

export function SkillTierSelector({
  value,
  onChange,
  playerName,
}: SkillTierSelectorProps) {
  return (
    <div
      role="group"
      aria-label={`Skill level for ${playerName}`}
      className="grid min-w-52 grid-cols-3 rounded-xl border border-white/10 bg-slate-950/70 p-1"
    >
      {tiers.map((tier) => {
        const isActive = tier.value === value;
        return (
          <button
            key={tier.value}
            type="button"
            onClick={() => onChange(tier.value)}
            aria-pressed={isActive}
            className={`min-h-11 rounded-lg px-2 text-xs font-black transition-colors ${
              isActive
                ? tier.activeClassName
                : "text-slate-600 hover:bg-white/5 hover:text-slate-300"
            }`}
          >
            {tier.label}
          </button>
        );
      })}
    </div>
  );
}
