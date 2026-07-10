import { CircleDot, Sparkles } from "lucide-react";
import type { CourtMatch, Player } from "@/types/game";

type CourtCardProps = {
  court: CourtMatch;
  playersById: ReadonlyMap<string, Player>;
};

function TeamNames({
  playerIds,
  playersById,
}: {
  playerIds: [string, string];
  playersById: ReadonlyMap<string, Player>;
}) {
  return (
    <div className="min-w-0">
      {playerIds.map((id) => (
        <p key={id} className="truncate text-base font-extrabold tracking-tight text-white">
          {playersById.get(id)?.name ?? "Unknown player"}
        </p>
      ))}
    </div>
  );
}

export function CourtCard({ court, playersById }: CourtCardProps) {
  return (
    <article className="relative overflow-hidden rounded-4xl border border-white/10 bg-app-surface/72 p-4 shadow-surface backdrop-blur-xl sm:p-5">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 size-36 rounded-full bg-brand-lime/8 blur-3xl"
      />

      <header className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-lime/10 text-brand-lime">
            <CircleDot aria-hidden="true" size={18} />
          </span>
          <div>
            <p className="text-sm font-black tracking-tight text-white">
              Court {court.courtNumber}
            </p>
            <p className="text-xs text-slate-500">Round {court.round}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-brand-lime/20 bg-brand-lime/8 px-3 py-1.5 text-[11px] font-black tracking-wider text-brand-lime uppercase">
          <Sparkles aria-hidden="true" size={13} />
          Balanced
        </div>
      </header>

      <div className="relative mt-4 grid gap-2">
        <div className="flex min-h-24 items-center gap-3 rounded-3xl border border-white/8 bg-white/4 p-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-cyan/10 font-mono text-sm font-black text-brand-cyan">
            A
          </div>
          <div className="min-w-0 flex-1">
            <TeamNames playerIds={court.teamA} playersById={playersById} />
            <p className="mt-1 text-xs text-slate-500">Team rating {court.teamASkill}</p>
          </div>
          <span className="font-mono text-4xl font-black tabular-nums text-white">
            {court.scoreA}
          </span>
        </div>

        <div className="relative z-10 -my-4 grid place-items-center">
          <span className="grid size-9 place-items-center rounded-full border-4 border-app-surface bg-slate-800 font-mono text-[10px] font-black tracking-widest text-slate-400 uppercase">
            vs
          </span>
        </div>

        <div className="flex min-h-24 items-center gap-3 rounded-3xl border border-white/8 bg-white/4 p-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-lime/10 font-mono text-sm font-black text-brand-lime">
            B
          </div>
          <div className="min-w-0 flex-1">
            <TeamNames playerIds={court.teamB} playersById={playersById} />
            <p className="mt-1 text-xs text-slate-500">Team rating {court.teamBSkill}</p>
          </div>
          <span className="font-mono text-4xl font-black tabular-nums text-white">
            {court.scoreB}
          </span>
        </div>
      </div>
    </article>
  );
}
