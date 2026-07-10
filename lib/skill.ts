import type { Player, SkillTier } from "@/types/game";

export const SKILL_WEIGHTS: Readonly<Record<SkillTier, number>> = {
  good: 3,
  mid: 2,
  ass: 1,
};

export function getSkillWeight(skill: SkillTier): number {
  return SKILL_WEIGHTS[skill];
}

export function getPlayerSkillWeight(player: Player): number {
  return getSkillWeight(player.skill);
}

export function getTeamSkillTotal(team: readonly Player[]): number {
  return team.reduce(
    (total, player) => total + getPlayerSkillWeight(player),
    0,
  );
}

export function getSkillLabel(skill: SkillTier): string {
  const labels: Record<SkillTier, string> = {
    good: "Good",
    mid: "Mid",
    ass: "Ass",
  };
  return labels[skill];
}
