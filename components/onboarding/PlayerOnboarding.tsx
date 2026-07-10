"use client";

import { ArrowLeft, Plus, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Player } from "@/types/game";
import { BulkImport } from "./BulkImport";
import { SkillTierSelector } from "./SkillTierSelector";

type PlayerOnboardingProps = {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onAddPlayers: (names: string[]) => void;
  onUpdateSkill: (playerId: string, skill: Player["skill"]) => void;
  onBack: () => void;
};

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

export function PlayerOnboarding({
  players,
  onAddPlayer,
  onAddPlayers,
  onUpdateSkill,
  onBack,
}: PlayerOnboardingProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = normalizeName(name);

    if (!normalizedName) {
      setError("Enter a player name first.");
      return;
    }

    if (
      players.some(
        (player) => player.name.toLocaleLowerCase() === normalizedName.toLocaleLowerCase(),
      )
    ) {
      setError(`${normalizedName} is already on the roster.`);
      return;
    }

    onAddPlayer(normalizedName);
    setName("");
    setError("");
  }

  return (
    <section className="mx-auto w-full max-w-xl" aria-labelledby="players-title">
      <button
        type="button"
        onClick={onBack}
        className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-400 hover:text-white"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        Play style
      </button>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-brand-cyan uppercase">
            Build the crew
          </p>
          <h1
            id="players-title"
            className="mt-2 text-4xl font-black tracking-[-0.045em] text-white"
          >
            Who&apos;s playing?
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-300">
          <Users aria-hidden="true" size={17} className="text-brand-lime" />
          {players.length}
        </div>
      </div>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
        Add the full group now. Skills and rotations can be adjusted before the
        first serve.
      </p>

      <BulkImport
        existingNames={players.map((player) => player.name)}
        onImport={onAddPlayers}
      />

      <form onSubmit={handleSubmit} className="mt-7">
        <label htmlFor="player-name" className="text-sm font-bold text-slate-200">
          Player name
        </label>
        <div className="mt-2 flex gap-2 rounded-2xl border border-white/10 bg-app-surface/80 p-2 shadow-surface focus-within:border-brand-lime/50">
          <input
            id="player-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            autoComplete="off"
            maxLength={40}
            placeholder="e.g. Jordan"
            className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-base text-white placeholder:text-slate-600 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Add player"
            className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-lime text-slate-950 shadow-lime-glow"
          >
            <Plus aria-hidden="true" size={23} strokeWidth={3} />
          </button>
        </div>
        <p className={`mt-2 min-h-5 text-sm ${error ? "text-orange-400" : "text-slate-500"}`}>
          {error || "Press enter or tap + to add."}
        </p>
      </form>

      {players.length > 0 && (
        <div className="mt-5 space-y-2" aria-label="Players added">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex min-h-12 flex-wrap items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3"
            >
              <span className="font-mono text-xs text-slate-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-24 flex-1 truncate font-bold text-slate-100">
                {player.name}
              </span>
              <SkillTierSelector
                value={player.skill}
                onChange={(skill) => onUpdateSkill(player.id, skill)}
                playerName={player.name}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
