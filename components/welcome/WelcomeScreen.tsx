"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BrandHero } from "./BrandHero";
import { PlayStyleSelector, type PlayStyle } from "./PlayStyleSelector";

const DEFAULT_PLAY_STYLE: PlayStyle = "tournament";

export function WelcomeScreen() {
  const { value: playStyle, setValue: setPlayStyle } =
    useLocalStorage<PlayStyle>("pickleball-cuzzies:play-style", DEFAULT_PLAY_STYLE);

  return (
    <div className="mx-auto w-full max-w-lg">
      <BrandHero />
      <PlayStyleSelector value={playStyle} onChange={setPlayStyle} />
    </div>
  );
}
