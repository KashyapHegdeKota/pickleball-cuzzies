import { createBalancedMatchups } from "@/lib/matchmaking";
import { orderBenchQueue, selectPlayersForRound, updateWaitHistory } from "@/lib/queue";
import type { CourtMatch, Player, PlayStyle } from "@/types/game";

export type GeneratedRound = {
  round: number;
  players: Player[];
  courts: CourtMatch[];
  benchPlayerIds: string[];
};

export function getActiveSlotCount(
  playerCount: number,
  playStyle: PlayStyle,
): number {
  if (playerCount < 4) return 0;
  if (playStyle === "rotation") return 4;
  return Math.floor(playerCount / 4) * 4;
}

export function generateNextRound(
  players: readonly Player[],
  playStyle: PlayStyle,
  currentRound: number,
  random: () => number = Math.random,
): GeneratedRound {
  const activeSlots = getActiveSlotCount(players.length, playStyle);
  if (activeSlots < 4) {
    throw new Error("At least four players are required to generate a round.");
  }

  const nextRound = currentRound + 1;
  const { selected, benched } = selectPlayersForRound(
    players,
    activeSlots,
    random,
  );
  const matchups = createBalancedMatchups(selected, random);
  const selectedPlayerIds = new Set(selected.map((player) => player.id));
  const updatedPlayers = updateWaitHistory(
    players,
    selectedPlayerIds,
    nextRound,
  );
  const updatedPlayersById = new Map(
    updatedPlayers.map((player) => [player.id, player]),
  );
  const benchPlayerIds = orderBenchQueue(
    benched.map((player) => updatedPlayersById.get(player.id) ?? player),
  ).map((player) => player.id);

  const courts: CourtMatch[] = matchups.map((matchup, index) => ({
    id: crypto.randomUUID(),
    courtNumber: index + 1,
    round: nextRound,
    teamA: matchup.teamA,
    teamB: matchup.teamB,
    teamASkill: matchup.teamASkill,
    teamBSkill: matchup.teamBSkill,
    scoreA: 0,
    scoreB: 0,
    status: "active",
  }));

  return {
    round: nextRound,
    players: updatedPlayers,
    courts,
    benchPlayerIds,
  };
}
