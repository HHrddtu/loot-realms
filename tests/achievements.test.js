import { describe, it, expect, beforeEach } from 'vitest';
import {
    initAchievements,
    resetAchievements,
    checkAchievements,
    getAchievementProgress,
    getAchievementStats
} from '../src/achievements.js';

describe('achievements', () => {
    beforeEach(() => {
        resetAchievements();
    });

    it('unlocks achievements once per threshold', () => {
        const first = checkAchievements({ kills: 1 });
        expect(first.map(a => a.id)).toEqual(['first_blood']);

        const again = checkAchievements({ kills: 1 });
        expect(again).toEqual([]);
    });

    it('unlocks multiple achievements from one snapshot', () => {
        const unlocked = checkAchievements({ kills: 50, level: 10 });
        expect(unlocked.map(a => a.id)).toEqual(['first_blood', 'hunter', 'level_5', 'level_10']);
    });

    it('persists unlocked achievements', () => {
        checkAchievements({ kills: 250 });
        initAchievements();
        const progress = getAchievementProgress({});
        expect(progress.filter(a => a.unlocked).map(a => a.id)).toEqual(['first_blood', 'hunter', 'slayer']);
    });

    it('builds stats from the scene', () => {
        const stats = getAchievementStats({
            kills: 7,
            playerLevel: 4,
            gold: 120,
            unlockedTalents: ['a', 'b'],
            zones: {
                arena: { bossDefeated: true },
                mine: { bossDefeated: false },
                depths: { bossDefeated: true }
            }
        });
        expect(stats.kills).toBe(7);
        expect(stats.level).toBe(4);
        expect(stats.forestCleared).toBe(true);
        expect(stats.mineCleared).toBe(false);
        expect(stats.depthsCleared).toBe(true);
        expect(stats.talents).toBe(2);
    });
});
