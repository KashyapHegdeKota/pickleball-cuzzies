"use client";

import { Trophy, X } from "lucide-react";
import { useEffect } from "react";
import type { Player } from "@/types/game";

type LeaderboardSheetProps = {
  players: Player[];
  isOpen: boolean;
  onClose: () => void;
};

function winRate(player: Player) {
  return player.matchCount === 0 ? 0 : (player.wins / player.matchCount) * 100;
}

export function LeaderboardSheet({
  players,
  isOpen,
  onClose,
}: LeaderboardSheetProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const standings = [...players].sort((a, b) => {
    if (a.wins !== b.wins) return b.wins - a.wins;
    const rateDifference = winRate(b) - winRate(a);
    if (rateDifference !== 0) return rateDifference;
    if (a.matchCount !== b.matchCount) return b.matchCount - a.matchCount;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="leaderboard-title">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close leaderboard"
        className="animate-backdrop-in absolute inset-0 size-full bg-slate-950/80 backdrop-blur-sm"
      />

      <section className="animate-sheet-up safe-area-bottom absolute inset-x-0 bottom-0 mx-auto max-h-[82dvh] w-full max-w-2xl overflow-hidden rounded-t-[2rem] border border-white/10 bg-slate-900 shadow-[0_-28px_100px_rgb(0_0_0/0.6)]">
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-slate-700" />
        <header className="flex items-center gap-3 border-b border-white/8 px-4 py-4 sm:px-6">
          <span className="grid size-11 place-items-center rounded-2xl bg-brand-lime/10 text-brand-lime">
            <Trophy aria-hidden="true" size={21} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-[0.16em] text-brand-cyan uppercase">
              Live standings
            </p>
            <h2 id="leaderboard-title" className="text-xl font-black tracking-tight text-white">
              Cuzzies leaderboard
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-11 place-items-center rounded-xl bg-white/5 text-slate-400 hover:text-white"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <div className="max-h-[calc(82dvh-7rem)] overflow-y-auto px-4 py-3 sm:px-6">
          <ol className="space-y-2">
            {standings.map((player, index) => (
              <li
                key={player.id}
                className="rounded-2xl border border-white/6 bg-white/4 p-3"
              >
                <div className="flex min-h-10 items-center gap-3">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-xl font-mono text-sm font-black ${
                    index === 0
                      ? "bg-brand-lime/12 text-brand-lime"
                      : "bg-white/5 text-slate-500"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-left font-extrabold text-white">
                    {player.name}
                  </span>
                  <span className="rounded-full bg-brand-cyan/10 px-2.5 py-1 font-mono text-xs font-black text-brand-cyan">
                    {Math.round(winRate(player))}%
                  </span>
                </div>
                <dl className="mt-2 grid grid-cols-3 divide-x divide-white/8 rounded-xl bg-slate-950/45 py-2 text-center">
                  <div>
                    <dt className="font-mono text-[9px] font-bold tracking-wider text-slate-600 uppercase">Wins</dt>
                    <dd className="mt-0.5 font-mono text-sm font-black text-emerald-300">{player.wins}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-bold tracking-wider text-slate-600 uppercase">Losses</dt>
                    <dd className="mt-0.5 font-mono text-sm font-black text-orange-300">{player.losses}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-bold tracking-wider text-slate-600 uppercase">Played</dt>
                    <dd className="mt-0.5 font-mono text-sm font-black text-slate-300">{player.matchCount}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
