"use client";

import { PlayerOnboarding } from "@/components/onboarding/PlayerOnboarding";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { RoundOverview } from "@/components/dashboard/RoundOverview";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateNextRound } from "@/lib/rounds";
import type { PersistedAppState, Player } from "@/types/game";

const INITIAL_APP_STATE: PersistedAppState = {
  screen: "welcome",
  playStyle: "tournament",
  players: [],
  round: 0,
  courts: [],
  benchPlayerIds: [],
  history: [],
};

function createPlayer(name: string): Player {
  return {
    id: crypto.randomUUID(),
    name,
    skill: "mid",
    wins: 0,
    losses: 0,
    matchCount: 0,
    lastPlayedRound: -1,
    consecutiveBenches: 0,
  };
}

export function PickleballCuzziesApp() {
  const { value: persistedState, setValue: setAppState } =
    useLocalStorage<PersistedAppState>(
      "pickleball-cuzzies:session",
      INITIAL_APP_STATE,
    );
  const appState = { ...INITIAL_APP_STATE, ...persistedState };

  if (appState.screen === "dashboard") {
    return (
      <RoundOverview
        round={appState.round}
        courts={appState.courts}
        players={appState.players}
        benchPlayerIds={appState.benchPlayerIds}
        onBackToRoster={() =>
          setAppState((current) => ({ ...current, screen: "players" }))
        }
        onScoreChange={(courtId, team, score) =>
          setAppState((current) => ({
            ...current,
            courts: current.courts.map((court) =>
              court.id === courtId && court.status === "active"
                ? team === "A"
                  ? { ...court, scoreA: score }
                  : { ...court, scoreB: score }
                : court,
            ),
          }))
        }
      />
    );
  }

  if (appState.screen === "players") {
    return (
      <PlayerOnboarding
        players={appState.players}
        onBack={() =>
          setAppState((current) => ({ ...current, screen: "welcome" }))
        }
        onAddPlayer={(name) =>
          setAppState((current) => ({
            ...current,
            players: [...current.players, createPlayer(name)],
          }))
        }
        onAddPlayers={(names) =>
          setAppState((current) => ({
            ...current,
            players: [
              ...current.players,
              ...names.map((name) => createPlayer(name)),
            ],
          }))
        }
        onUpdateSkill={(playerId, skill) =>
          setAppState((current) => ({
            ...current,
            players: current.players.map((player) =>
              player.id === playerId ? { ...player, skill } : player,
            ),
          }))
        }
        onDeletePlayer={(playerId) =>
          setAppState((current) => ({
            ...current,
            players: current.players.filter((player) => player.id !== playerId),
          }))
        }
        onStartSession={() =>
          setAppState((current) => {
            const normalized = { ...INITIAL_APP_STATE, ...current };
            const generated = generateNextRound(
              normalized.players,
              normalized.playStyle,
              normalized.round,
            );
            return {
              ...normalized,
              ...generated,
              screen: "dashboard",
            };
          })
        }
      />
    );
  }

  return (
    <WelcomeScreen
      playStyle={appState.playStyle}
      onPlayStyleChange={(playStyle) =>
        setAppState((current) => ({ ...current, playStyle }))
      }
      onContinue={() =>
        setAppState((current) => ({ ...current, screen: "players" }))
      }
    />
  );
}
