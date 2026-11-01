import { ACHIEVEMENTS } from './config/achievements.js';
import { getCompletedQuestCount } from './quests.js';

const STORAGE_KEY = 'loot_realms_achievements';

let unlocked = null;

function load() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

function save() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked || []));
    } catch (e) {}
}

export function initAchievements() {
    unlocked = load();
}

export function getUnlockedAchievements() {
    if (!unlocked) initAchievements();
    return [...unlocked];
}

export function isAchievementUnlocked(id) {
    if (!unlocked) initAchievements();
    return unlocked.includes(id);
}

export function getAchievementStats(scene) {
    const z = (scene && scene.zones) || {};
    const boss = key => !!(z[key] && z[key].bossDefeated);
    return {
        kills: scene?.kills || 0,
        level: scene?.playerLevel || 1,
        gold: scene?.gold || 0,
        quests: getCompletedQuestCount(),
        talents: (scene?.unlockedTalents || []).length,
        forestCleared: boss('arena'),
        mineCleared: boss('mine'),
        caveCleared: boss('cave'),
        villageCleared: boss('village'),
        depthsCleared: boss('depths'),
        cursedCleared: boss('cursed'),
        shadowCleared: boss('shadow'),
        towerCleared: boss('tower'),
        throneCleared: boss('throne'),
        desertCleared: boss('desert'),
        swampCleared: boss('swamp')
    };
}

export function checkAchievements(stats) {
    if (!unlocked) initAchievements();
    const newlyCompleted = [];
    ACHIEVEMENTS.forEach(achievement => {
        if (unlocked.includes(achievement.id)) return;
        if ((stats[achievement.stat] || 0) >= achievement.threshold) {
            unlocked.push(achievement.id);
            newlyCompleted.push(achievement);
        }
    });
    if (newlyCompleted.length > 0) save();
    return newlyCompleted;
}

export function getAchievementProgress(stats) {
    if (!unlocked) initAchievements();
    return ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        current: stats[achievement.stat] || 0,
        unlocked: unlocked.includes(achievement.id)
    }));
}

export function resetAchievements() {
    unlocked = [];
    save();
}
