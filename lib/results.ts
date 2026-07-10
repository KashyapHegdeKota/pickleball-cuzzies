import type { PersistedAppState } from "@/types/game";

export function recordMatchResult(
  state: PersistedAppState,
  courtId: string,
  finishedAt = new Date().toISOString(),
): PersistedAppState {
  const court = state.courts.find((match) => match.id === courtId);
  if (!court || court.status === "finished" || court.scoreA === court.scoreB) {
    return state;
  }

  const winner = court.scoreA > court.scoreB ? "A" : "B";
  const winnerIds = new Set(winner === "A" ? court.teamA : court.teamB);
  const participantIds = new Set([...court.teamA, ...court.teamB]);
  const finishedCourt = { ...court, status: "finished" as const, winner };

  return {
    ...state,
    players: state.players.map((player) => {
      if (!participantIds.has(player.id)) return player;
      const didWin = winnerIds.has(player.id);
      return {
        ...player,
        wins: player.wins + (didWin ? 1 : 0),
        losses: player.losses + (didWin ? 0 : 1),
        matchCount: player.matchCount + 1,
      };
    }),
    courts: state.courts.map((match) =>
      match.id === courtId ? finishedCourt : match,
    ),
    history: [
      ...state.history,
      {
        ...finishedCourt,
        status: "finished" as const,
        winner,
        finishedAt,
      },
    ],
  };
}
