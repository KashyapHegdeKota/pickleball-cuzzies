import { ArrowLeft, Users } from "lucide-react";
import type { CourtMatch, Player } from "@/types/game";
import { CourtCard } from "./CourtCard";

type RoundOverviewProps = {
  round: number;
  courts: CourtMatch[];
  players: Player[];
  benchPlayerIds: string[];
  onBackToRoster: () => void;
};

export function RoundOverview({
  round,
  courts,
  players,
  benchPlayerIds,
  onBackToRoster,
}: RoundOverviewProps) {
  const playersById = new Map(players.map((player) => [player.id, player]));

  return (
    <section className="mx-auto w-full max-w-xl" aria-labelledby="round-title">
      <button
        type="button"
        onClick={onBackToRoster}
        className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-400 hover:text-white"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        Roster
      </button>

      <p className="mt-4 font-mono text-xs font-bold tracking-[0.2em] text-brand-cyan uppercase">
        Round {round}
      </p>
      <h1 id="round-title" className="mt-2 text-4xl font-black tracking-[-0.05em]">
        Courts are set
      </h1>

      <div className="mt-7 space-y-3">
        {courts.map((court) => (
          <CourtCard key={court.id} court={court} playersById={playersById} />
        ))}
      </div>

      <div className="mt-5 flex min-h-14 items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 text-sm text-slate-400">
        <Users aria-hidden="true" size={18} className="text-brand-cyan" />
        {benchPlayerIds.length === 0
          ? "Everyone is on a court."
          : `${benchPlayerIds.length} waiting on the bench.`}
      </div>
    </section>
  );
}
