"use client";

import { Trash2, UserRoundPlus } from "lucide-react";
import type { Player } from "@/types/game";
import { SkillTierSelector } from "./SkillTierSelector";

type PlayerListProps = {
  players: Player[];
  onUpdateSkill: (playerId: string, skill: Player["skill"]) => void;
  onDelete: (playerId: string) => void;
};

export function PlayerList({
  players,
  onUpdateSkill,
  onDelete,
}: PlayerListProps) {
  if (players.length === 0) {
    return (
      <div className="mt-6 rounded-3xl border border-dashed border-white/10 px-5 py-8 text-center">
        <UserRoundPlus
          aria-hidden="true"
          size={24}
          className="mx-auto text-slate-600"
        />
        <p className="mt-3 text-sm font-bold text-slate-400">The roster is empty</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Add one name or paste the whole crew above.
        </p>
      </div>
    );
  }

  return (
    <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Players added">
      {players.map((player, index) => (
        <li
          key={player.id}
          className="rounded-3xl border border-white/8 bg-white/4 p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.03)]"
        >
          <div className="flex min-h-11 items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/5 font-mono text-xs text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 truncate font-extrabold tracking-tight text-slate-100">
              {player.name}
            </span>
            <button
              type="button"
              onClick={() => onDelete(player.id)}
              aria-label={`Delete ${player.name}`}
              className="grid size-11 shrink-0 place-items-center rounded-xl text-slate-600 hover:bg-orange-500/10 hover:text-orange-400"
            >
              <Trash2 aria-hidden="true" size={19} />
            </button>
          </div>

          <div className="mt-2">
            <SkillTierSelector
              value={player.skill}
              onChange={(skill) => onUpdateSkill(player.id, skill)}
              playerName={player.name}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
