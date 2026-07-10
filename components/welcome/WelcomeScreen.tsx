"use client";

import { ArrowRight } from "lucide-react";
import type { PlayStyle } from "@/types/game";
import { BrandHero } from "./BrandHero";
import { PlayStyleSelector } from "./PlayStyleSelector";

type WelcomeScreenProps = {
  playStyle: PlayStyle;
  onPlayStyleChange: (playStyle: PlayStyle) => void;
  onContinue: () => void;
};

export function WelcomeScreen({
  playStyle,
  onPlayStyleChange,
  onContinue,
}: WelcomeScreenProps) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <BrandHero />
      <PlayStyleSelector value={playStyle} onChange={onPlayStyleChange} />
      <button
        type="button"
        onClick={onContinue}
        className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-lime px-5 font-black text-slate-950 shadow-lime-glow"
      >
        Build the roster
        <ArrowRight aria-hidden="true" size={20} strokeWidth={2.6} />
      </button>
    </div>
  );
}
