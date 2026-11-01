import { describe, it, expect, beforeEach, vi } from 'vitest';

const store = vi.hoisted(() => ({
    completed: [],
    active: [],
    progress: {}
}));

vi.mock('../src/save.js', () => ({
    loadAccount: () => ({ completedQuests: [...store.completed] }),
    saveAccount: vi.fn(),
    loadGame: () => ({
        activeQuests: [...store.active],
        questProgress: { ...store.progress }
    }),
    saveGame: vi.fn()
}));

import {
    initQuests,
    setGameScene,
    checkZoneTransitionGate,
    getQuestProgress
} from '../src/quests.js';

function makeScene(overrides = {}) {
    return {
        zones: {
            mine: { bossDefeated: false },
            arena: { bossDefeated: false },
            village: { bossDefeated: false },
            depths: { bossDefeated: false },
            cursed: { bossDefeated: false },
            shadow: { bossDefeated: false },
            tower: { bossDefeated: false },
            throne: { bossDefeated: false },
            ...overrides
        }
    };
}

describe('zone quest gate', () => {
    beforeEach(() => {
        store.completed = [];
        store.active = [];
        store.progress = {};
        setGameScene(makeScene());
        initQuests();
    });

    it('blocks a forward transition when the zone boss quest is incomplete', () => {
        store.active = ['quest_mine'];
        initQuests();

        const gate = checkZoneTransitionGate('mine', 'cave');

        expect(gate.blocked).toBe(true);
        expect(gate.questKey).toBe('quest_mine');
        expect(gate.progress).toEqual({ current: 0, total: 1 });
    });

    it('allows a forward transition once the objective is complete', () => {
        store.active = ['quest_mine'];
        store.progress = { quest_mine: 1 };
        initQuests();

        expect(checkZoneTransitionGate('mine', 'cave').blocked).toBe(false);
    });

    it('never blocks backtracking', () => {
        store.active = ['quest_mine'];
        initQuests();

        expect(checkZoneTransitionGate('mine', 'forest').blocked).toBe(false);
    });

    it('does not block when the quest is unavailable (old saves)', () => {
        store.active = [];
        initQuests();

        const gate = checkZoneTransitionGate('mine', 'cave');

        expect(gate.blocked).toBe(false);
        expect(gate.unavailable).toBe(true);
    });

    it('does not lock optional side zones', () => {
        store.active = ['quest_mine'];
        initQuests();

        expect(checkZoneTransitionGate('mine', 'hell').blocked).toBe(false);
        expect(checkZoneTransitionGate('mine', 'desert').blocked).toBe(false);
    });

    it('credits the objective when the boss is already dead', () => {
        store.active = ['quest_mine'];
        initQuests();
        setGameScene(makeScene({ mine: { bossDefeated: true } }));

        const gate = checkZoneTransitionGate('mine', 'cave');

        expect(gate.blocked).toBe(false);
        expect(gate.credited).toBe(true);
        expect(getQuestProgress('quest_mine').current).toBe(1);
    });

    it('uses the boss quest for zones with a quest chain', () => {
        store.active = ['defeat_village_boss'];
        initQuests();

        expect(checkZoneTransitionGate('village', 'depths').blocked).toBe(true);

        store.progress = { defeat_village_boss: 1 };
        initQuests();

        expect(checkZoneTransitionGate('village', 'depths').blocked).toBe(false);
    });
});
