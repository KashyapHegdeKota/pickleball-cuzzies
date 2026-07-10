export type AppScreen = "welcome" | "players" | "dashboard";
export type PlayStyle = "tournament" | "rotation";
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

export type MatchStatus = "active" | "finished";

export type CourtMatch = {
  id: string;
  courtNumber: number;
  round: number;
  teamA: [string, string];
  teamB: [string, string];
  teamASkill: number;
  teamBSkill: number;
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  winner?: "A" | "B";
};

export type MatchHistoryEntry = CourtMatch & {
  status: "finished";
  winner: "A" | "B";
  finishedAt: string;
};

export type PersistedAppState = {
  screen: AppScreen;
  playStyle: PlayStyle;
  players: Player[];
  round: number;
  courts: CourtMatch[];
  benchPlayerIds: string[];
  history: MatchHistoryEntry[];
};
