import { Armchair, Timer } from "lucide-react";
import { getSkillLabel } from "@/lib/skill";
import type { Player } from "@/types/game";

type BenchQueueProps = {
  benchPlayerIds: string[];
  playersById: ReadonlyMap<string, Player>;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function BenchQueue({
  benchPlayerIds,
  playersById,
}: BenchQueueProps) {
  const benchedPlayers = benchPlayerIds
    .map((id) => playersById.get(id))
    .filter((player): player is Player => Boolean(player));

  return (
    <section className="mt-6" aria-labelledby="bench-title">
      <div className="flex items-end justify-between gap-4 px-1">
        <div>
          <p className="flex items-center gap-2 text-xs font-black tracking-[0.16em] text-brand-cyan uppercase">
            <Armchair aria-hidden="true" size={15} />
            On the bench
          </p>
          <h2 id="bench-title" className="mt-1 text-lg font-black tracking-tight text-white">
            Next-up queue
          </h2>
        </div>
        <p className="text-xs font-bold text-slate-500">Longest wait first</p>
      </div>

      {benchedPlayers.length === 0 ? (
        <div className="mt-3 flex min-h-20 items-center justify-center rounded-3xl border border-white/8 bg-white/4 px-4 text-center text-sm font-bold text-slate-500">
          Everyone is active this round.
        </div>
      ) : (
        <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {benchedPlayers.map((player, index) => (
            <article
              key={player.id}
              className="flex min-w-48 snap-start items-center gap-3 rounded-3xl border border-white/8 bg-white/5 p-3"
            >
              <div className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-cyan/10 font-mono text-sm font-black text-brand-cyan">
                {initials(player.name)}
                <span className="absolute -left-1 -top-1 grid size-5 place-items-center rounded-full bg-brand-lime font-mono text-[10px] font-black text-slate-950">
                  {index + 1}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-white">{player.name}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Timer aria-hidden="true" size={13} />
                  {player.consecutiveBenches} waiting · {getSkillLabel(player.skill)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
