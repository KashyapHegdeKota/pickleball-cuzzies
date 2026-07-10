import { getTeamSkillTotal } from "@/lib/skill";
import type { Player } from "@/types/game";

export type BalancedMatchup = {
  teamA: [string, string];
  teamB: [string, string];
  teamASkill: number;
  teamBSkill: number;
  skillDelta: number;
};

const teamPartitions = [
  [[0, 1], [2, 3]],
  [[0, 2], [1, 3]],
  [[0, 3], [1, 2]],
] as const;

function shuffled<T>(values: readonly T[], random: () => number): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function balanceCourt(
  players: readonly [Player, Player, Player, Player],
  random: () => number,
): BalancedMatchup {
  const candidates = teamPartitions.map(([teamAIndexes, teamBIndexes]) => {
    const teamA = teamAIndexes.map((index) => players[index]) as [Player, Player];
    const teamB = teamBIndexes.map((index) => players[index]) as [Player, Player];
    const teamASkill = getTeamSkillTotal(teamA);
    const teamBSkill = getTeamSkillTotal(teamB);

    return {
      teamA: [teamA[0].id, teamA[1].id] as [string, string],
      teamB: [teamB[0].id, teamB[1].id] as [string, string],
      teamASkill,
      teamBSkill,
      skillDelta: Math.abs(teamASkill - teamBSkill),
    };
  });

  const smallestDelta = Math.min(
    ...candidates.map((candidate) => candidate.skillDelta),
  );
  const fairestCandidates = candidates.filter(
    (candidate) => candidate.skillDelta === smallestDelta,
  );

  return fairestCandidates[Math.floor(random() * fairestCandidates.length)];
}

export function createBalancedMatchups(
  selectedPlayers: readonly Player[],
  random: () => number = Math.random,
): BalancedMatchup[] {
  if (selectedPlayers.length < 4 || selectedPlayers.length % 4 !== 0) {
    throw new Error("Balanced matchmaking requires complete groups of four players.");
  }

  const trialCount = Math.min(160, Math.max(36, selectedPlayers.length * 8));
  let bestMatchups: BalancedMatchup[] | null = null;
  let bestScore = Number.POSITIVE_INFINITY;
  let equalBestCount = 0;

  for (let trial = 0; trial < trialCount; trial += 1) {
    const candidateOrder = shuffled(selectedPlayers, random);
    const matchups: BalancedMatchup[] = [];

    for (let index = 0; index < candidateOrder.length; index += 4) {
      const courtPlayers = candidateOrder.slice(index, index + 4) as [
        Player,
        Player,
        Player,
        Player,
      ];
      matchups.push(balanceCourt(courtPlayers, random));
    }

    const totalDelta = matchups.reduce(
      (total, matchup) => total + matchup.skillDelta,
      0,
    );
    const worstCourtDelta = Math.max(
      ...matchups.map((matchup) => matchup.skillDelta),
    );
    const score = totalDelta * 10 + worstCourtDelta;

    if (score < bestScore) {
      bestScore = score;
      bestMatchups = matchups;
      equalBestCount = 1;
    } else if (score === bestScore) {
      equalBestCount += 1;
      if (random() < 1 / equalBestCount) bestMatchups = matchups;
    }
  }

  return bestMatchups ?? [];
}
