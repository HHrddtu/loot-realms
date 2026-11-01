import { describe, it, expect, beforeEach } from 'vitest';
import { QuestTracker, getSystemQuestFlags } from '../src/systems/QuestTracker.js';

describe('QuestTracker', () => {
    let tracker;

    beforeEach(() => {
        tracker = new QuestTracker();
        tracker.reset();
    });

    it('returns newly completed system quests once', () => {
        const first = tracker.checkQuests({ depthsBossDefeated: true });
        expect(first.map(q => q.id)).toEqual(['sys_depths_key']);

        const second = tracker.checkQuests({ depthsBossDefeated: true });
        expect(second).toEqual([]);
    });

    it('reports progress from save flags', () => {
        tracker.checkQuests({ depthsBossDefeated: true });
        const progress = tracker.getProgress({ depthsBossDefeated: true });
        expect(progress.find(q => q.id === 'sys_depths_key').completed).toBe(true);
        expect(progress.find(q => q.id === 'sys_cursed_village').completed).toBe(false);
    });

    it('reads boss flags from a scene', () => {
        const flags = getSystemQuestFlags({
            zones: {
                depths: { bossDefeated: true },
                cursed: { bossDefeated: false },
                shadow: { bossDefeated: true },
                tower: { bossDefeated: false },
                throne: { bossDefeated: true }
            }
        });
        expect(flags).toEqual({
            depthsBossDefeated: true,
            cursedBossDefeated: false,
            shadowBossDefeated: true,
            towerBossDefeated: false,
            throneBossDefeated: true
        });
    });
});
