"use client";

import { PlayerOnboarding } from "@/components/onboarding/PlayerOnboarding";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { PersistedAppState, Player } from "@/types/game";

const INITIAL_APP_STATE: PersistedAppState = {
  screen: "welcome",
  playStyle: "tournament",
  players: [],
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
  const { value: appState, setValue: setAppState } =
    useLocalStorage<PersistedAppState>(
      "pickleball-cuzzies:session",
      INITIAL_APP_STATE,
    );

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
