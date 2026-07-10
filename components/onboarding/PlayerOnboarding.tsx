"use client";

import { ArrowLeft, Play, Plus, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Player } from "@/types/game";
import { BulkImport } from "./BulkImport";
import { PlayerList } from "./PlayerList";

type PlayerOnboardingProps = {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onAddPlayers: (names: string[]) => void;
  onUpdateSkill: (playerId: string, skill: Player["skill"]) => void;
  onDeletePlayer: (playerId: string) => void;
  onStartSession: () => void;
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
  onDeletePlayer,
  onStartSession,
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

      <PlayerList
        players={players}
        onUpdateSkill={onUpdateSkill}
        onDelete={onDeletePlayer}
      />

      <div className="sticky bottom-0 z-20 -mx-4 mt-6 bg-gradient-to-t from-app-canvas via-app-canvas/95 to-transparent px-4 pt-6 safe-area-bottom">
        <button
          type="button"
          onClick={onStartSession}
          disabled={players.length < 4}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-lime px-5 font-black text-slate-950 shadow-lime-glow disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
        >
          <Play aria-hidden="true" size={20} fill="currentColor" />
          {players.length < 4
            ? `Add ${4 - players.length} more to start`
            : "Generate first round"}
        </button>
      </div>
    </section>
  );
}
