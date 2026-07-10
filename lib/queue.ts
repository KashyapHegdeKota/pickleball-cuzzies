import type { Player } from "@/types/game";

type QueueSelection = {
  selected: Player[];
  benched: Player[];
};

function compareQueuePriority(
  playerA: Player,
  playerB: Player,
  tieA = 0,
  tieB = 0,
) {
  if (playerA.matchCount !== playerB.matchCount) {
    return playerA.matchCount - playerB.matchCount;
  }

  if (playerA.consecutiveBenches !== playerB.consecutiveBenches) {
    return playerB.consecutiveBenches - playerA.consecutiveBenches;
  }

  if (playerA.lastPlayedRound !== playerB.lastPlayedRound) {
    return playerA.lastPlayedRound - playerB.lastPlayedRound;
  }

  return tieA - tieB;
}

export function selectPlayersForRound(
  players: readonly Player[],
  activeSlots: number,
  random: () => number = Math.random,
): QueueSelection {
  const safeSlotCount = Math.max(
    0,
    Math.min(players.length, activeSlots - (activeSlots % 4)),
  );
  const rankedPlayers = players
    .map((player) => ({ player, tieBreaker: random() }))
    .sort((a, b) =>
      compareQueuePriority(a.player, b.player, a.tieBreaker, b.tieBreaker),
    )
    .map(({ player }) => player);

  const selected = rankedPlayers.slice(0, safeSlotCount);
  const selectedIds = new Set(selected.map((player) => player.id));
  const benched = rankedPlayers
    .filter((player) => !selectedIds.has(player.id))
    .sort((a, b) => {
      if (a.consecutiveBenches !== b.consecutiveBenches) {
        return b.consecutiveBenches - a.consecutiveBenches;
      }
      if (a.lastPlayedRound !== b.lastPlayedRound) {
        return a.lastPlayedRound - b.lastPlayedRound;
      }
      return a.matchCount - b.matchCount;
    });

  return { selected, benched };
}

export function updateWaitHistory(
  players: readonly Player[],
  selectedPlayerIds: ReadonlySet<string>,
  round: number,
): Player[] {
  return players.map((player) =>
    selectedPlayerIds.has(player.id)
      ? {
          ...player,
          lastPlayedRound: round,
          consecutiveBenches: 0,
        }
      : {
          ...player,
          consecutiveBenches: player.consecutiveBenches + 1,
        },
  );
}

export function orderBenchQueue(players: readonly Player[]): Player[] {
  return [...players].sort((a, b) => {
    if (a.consecutiveBenches !== b.consecutiveBenches) {
      return b.consecutiveBenches - a.consecutiveBenches;
    }
    if (a.lastPlayedRound !== b.lastPlayedRound) {
      return a.lastPlayedRound - b.lastPlayedRound;
    }
    if (a.matchCount !== b.matchCount) return a.matchCount - b.matchCount;
    return a.name.localeCompare(b.name);
  });
}
