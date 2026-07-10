"use client";

import { ArrowLeft, BarChart3, RefreshCw, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { CourtMatch, Player } from "@/types/game";
import { BenchQueue } from "./BenchQueue";
import { CourtCard } from "./CourtCard";
import { LeaderboardSheet } from "./LeaderboardSheet";

type RoundOverviewProps = {
  round: number;
  courts: CourtMatch[];
  players: Player[];
  benchPlayerIds: string[];
  onBackToRoster: () => void;
  onScoreChange: (courtId: string, team: "A" | "B", score: number) => void;
  onFinishMatch: (courtId: string) => void;
  onGenerateNextRound: () => void;
  onRequestReset: () => void;
};

export function RoundOverview({
  round,
  courts,
  players,
  benchPlayerIds,
  onBackToRoster,
  onScoreChange,
  onFinishMatch,
  onGenerateNextRound,
  onRequestReset,
}: RoundOverviewProps) {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const playersById = new Map(players.map((player) => [player.id, player]));
  const unfinishedCourtCount = courts.filter(
    (court) => court.status === "active",
  ).length;

  return (
    <section className="mx-auto w-full max-w-xl" aria-labelledby="round-title">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToRoster}
          className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-400 hover:text-white"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          Roster
        </button>
        <button
          type="button"
          onClick={onRequestReset}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-500 hover:text-orange-400"
        >
          <RotateCcw aria-hidden="true" size={16} />
          Reset
        </button>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-brand-cyan uppercase">
            Round {round}
          </p>
          <h1 id="round-title" className="mt-2 text-4xl font-black tracking-[-0.05em]">
            Courts are set
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setIsLeaderboardOpen(true)}
          className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-brand-lime"
          aria-label="Open leaderboard"
        >
          <BarChart3 aria-hidden="true" size={21} />
        </button>
      </div>

      <div className="mt-7 space-y-3">
        {courts.map((court) => (
          <CourtCard
            key={court.id}
            court={court}
            playersById={playersById}
            onScoreChange={onScoreChange}
            onFinish={onFinishMatch}
          />
        ))}
      </div>

      <BenchQueue benchPlayerIds={benchPlayerIds} playersById={playersById} />

      <div className="sticky bottom-0 z-20 -mx-4 mt-6 bg-gradient-to-t from-app-canvas via-app-canvas/95 to-transparent px-4 pt-6 safe-area-bottom">
        <button
          type="button"
          onClick={onGenerateNextRound}
          disabled={unfinishedCourtCount > 0}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-lime px-5 font-black text-slate-950 shadow-lime-glow disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
        >
          <RefreshCw aria-hidden="true" size={19} strokeWidth={2.6} />
          {unfinishedCourtCount > 0
            ? `Finish ${unfinishedCourtCount} ${unfinishedCourtCount === 1 ? "court" : "courts"}`
            : "Generate next round"}
        </button>
      </div>

      <LeaderboardSheet
        players={players}
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </section>
  );
}
