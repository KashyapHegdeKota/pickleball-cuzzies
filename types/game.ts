import type { PlayStyle } from "@/components/welcome/PlayStyleSelector";

export type AppScreen = "welcome" | "players" | "dashboard";
export type SkillTier = "good" | "mid" | "ass";

export type Player = {
  id: string;
  name: string;
  skill: SkillTier;
  wins: number;
  losses: number;
  matchCount: number;
  lastPlayedRound: number;
  consecutiveBenches: number;
};

export type PersistedAppState = {
  screen: AppScreen;
  playStyle: PlayStyle;
  players: Player[];
};
