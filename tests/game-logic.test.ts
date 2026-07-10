import assert from "node:assert/strict";
import test from "node:test";
import { createBalancedMatchups } from "@/lib/matchmaking";
import { parsePlayerNames } from "@/lib/playerNames";
import { selectPlayersForRound } from "@/lib/queue";
import { recordMatchResult } from "@/lib/results";
import { generateNextRound } from "@/lib/rounds";
import { getSkillWeight } from "@/lib/skill";
import type { PersistedAppState, Player, SkillTier } from "@/types/game";

function makePlayer(
  id: string,
  skill: SkillTier = "mid",
  overrides: Partial<Player> = {},
): Player {
  return {
    id,
    name: `Player ${id.toUpperCase()}`,
    skill,
    wins: 0,
    losses: 0,
    matchCount: 0,
    lastPlayedRound: -1,
    consecutiveBenches: 0,
    ...overrides,
  };
}

function seededRandom(initialSeed = 42) {
  let seed = initialSeed >>> 0;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

test("maps all three skill tiers to stable numeric weights", () => {
  assert.equal(getSkillWeight("good"), 3);
  assert.equal(getSkillWeight("mid"), 2);
  assert.equal(getSkillWeight("ass"), 1);
});

test("parses chat lists, strips bullets, and removes duplicates", () => {
  assert.deepEqual(
    parsePlayerNames("1. Malia\n• Jordan, Kai; jordan\n  Avery  Lee "),
    ["Malia", "Jordan", "Kai", "Avery Lee"],
  );
});

test("creates the fairest available teams without duplicating players", () => {
  const players = [
    makePlayer("a", "good"),
    makePlayer("b", "good"),
    makePlayer("c", "ass"),
    makePlayer("d", "ass"),
  ];
  const [matchup] = createBalancedMatchups(players, seededRandom());
  const assignedIds = [...matchup.teamA, ...matchup.teamB];

  assert.equal(new Set(assignedIds).size, 4);
  assert.equal(matchup.skillDelta, 0);
  assert.equal(matchup.teamASkill, matchup.teamBSkill);
});

test("strictly selects lowest-match players before higher-match players", () => {
  const players = [
    makePlayer("a", "mid", { matchCount: 1, consecutiveBenches: 9 }),
    makePlayer("b", "mid", { consecutiveBenches: 0 }),
    makePlayer("c", "mid", { consecutiveBenches: 3, lastPlayedRound: 3 }),
    makePlayer("d", "mid", { consecutiveBenches: 3, lastPlayedRound: 1 }),
    makePlayer("e", "mid", { consecutiveBenches: 1 }),
    makePlayer("f", "mid", { matchCount: 2, consecutiveBenches: 20 }),
  ];
  const { selected } = selectPlayersForRound(players, 4, seededRandom());

  assert.deepEqual(
    new Set(selected.map((player) => player.id)),
    new Set(["b", "c", "d", "e"]),
  );
});

test("one-match rotation generates one court and advances bench history", () => {
  const players = ["a", "b", "c", "d", "e", "f"].map((id) =>
    makePlayer(id),
  );
  const generated = generateNextRound(
    players,
    "rotation",
    0,
    seededRandom(),
  );

  assert.equal(generated.round, 1);
  assert.equal(generated.courts.length, 1);
  assert.equal(generated.benchPlayerIds.length, 2);
  assert.equal(
    generated.players.filter((player) => player.lastPlayedRound === 1).length,
    4,
  );
  assert.equal(
    generated.players.filter((player) => player.consecutiveBenches === 1).length,
    2,
  );
});

test("finishing a match updates records exactly once", () => {
  const players = ["a", "b", "c", "d"].map((id) => makePlayer(id));
  const state: PersistedAppState = {
    screen: "dashboard",
    playStyle: "rotation",
    players,
    round: 1,
    benchPlayerIds: [],
    history: [],
    courts: [
      {
        id: "court-1",
        courtNumber: 1,
        round: 1,
        teamA: ["a", "b"],
        teamB: ["c", "d"],
        teamASkill: 4,
        teamBSkill: 4,
        scoreA: 11,
        scoreB: 7,
        status: "active",
      },
    ],
  };
  const finished = recordMatchResult(state, "court-1", "2026-01-01T00:00:00Z");
  const repeated = recordMatchResult(
    finished,
    "court-1",
    "2026-01-01T00:01:00Z",
  );

  assert.equal(repeated.history.length, 1);
  assert.equal(repeated.courts[0].status, "finished");
  assert.equal(repeated.players.find((player) => player.id === "a")?.wins, 1);
  assert.equal(repeated.players.find((player) => player.id === "c")?.losses, 1);
  assert.ok(repeated.players.every((player) => player.matchCount === 1));
});
