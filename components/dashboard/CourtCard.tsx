import { Check, CircleDot, Sparkles } from "lucide-react";
import type { CourtMatch, Player } from "@/types/game";
import { ScoreStepper } from "./ScoreStepper";

type CourtCardProps = {
  court: CourtMatch;
  playersById: ReadonlyMap<string, Player>;
  onScoreChange: (courtId: string, team: "A" | "B", score: number) => void;
  onFinish: (courtId: string) => void;
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

export function CourtCard({
  court,
  playersById,
  onScoreChange,
  onFinish,
}: CourtCardProps) {
  const isFinished = court.status === "finished";
  const isTied = court.scoreA === court.scoreB;

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
        <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-black tracking-wider uppercase ${
          isFinished
            ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-300"
            : "border-brand-lime/20 bg-brand-lime/8 text-brand-lime"
        }`}>
          {isFinished ? (
            <Check aria-hidden="true" size={13} />
          ) : (
            <Sparkles aria-hidden="true" size={13} />
          )}
          {isFinished ? "Final" : "Balanced"}
        </div>
      </header>

      <div className="relative mt-4 grid gap-2">
        <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
          <div className="flex min-h-12 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-cyan/10 font-mono text-sm font-black text-brand-cyan">
              A
            </div>
            <div className="min-w-0 flex-1">
              <TeamNames playerIds={court.teamA} playersById={playersById} />
              <p className="mt-1 text-xs text-slate-500">Team rating {court.teamASkill}</p>
            </div>
          </div>
          <ScoreStepper
            score={court.scoreA}
            teamLabel="Team A"
            tone="cyan"
            disabled={court.status === "finished"}
            onChange={(score) => onScoreChange(court.id, "A", score)}
          />
        </div>

        <div className="relative z-10 -my-4 grid place-items-center">
          <span className="grid size-9 place-items-center rounded-full border-4 border-app-surface bg-slate-800 font-mono text-[10px] font-black tracking-widest text-slate-400 uppercase">
            vs
          </span>
        </div>

        <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
          <div className="flex min-h-12 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-lime/10 font-mono text-sm font-black text-brand-lime">
              B
            </div>
            <div className="min-w-0 flex-1">
              <TeamNames playerIds={court.teamB} playersById={playersById} />
              <p className="mt-1 text-xs text-slate-500">Team rating {court.teamBSkill}</p>
            </div>
          </div>
          <ScoreStepper
            score={court.scoreB}
            teamLabel="Team B"
            tone="lime"
            disabled={court.status === "finished"}
            onChange={(score) => onScoreChange(court.id, "B", score)}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onFinish(court.id)}
        disabled={isFinished || isTied}
        className="relative mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:bg-white/6 disabled:text-slate-500"
      >
        <Check aria-hidden="true" size={18} strokeWidth={2.8} />
        {isFinished
          ? `Team ${court.winner} wins · Match saved`
          : isTied
            ? "Break the tie to finish"
            : "Finish match"}
      </button>
    </article>
  );
}
