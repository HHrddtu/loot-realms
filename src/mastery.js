import { getClassMastery, CLASS_MASTERY } from './config/mastery.js';

export function getMasteryNodesForClass(classKey) {
    return getClassMastery(classKey);
}

export function getMasteryNode(id) {
    for (const key of Object.keys(CLASS_MASTERY)) {
        const node = CLASS_MASTERY[key].find(n => n.id === id);
        if (node) return node;
    }
    return null;
}

export function canUnlockMastery(talentId, unlockedIds) {
    const mastery = getMasteryNode(talentId);
    if (!mastery) return false;
    if (unlockedIds.includes(talentId)) return false;
    return mastery.requires.every(req => unlockedIds.includes(req));
}

export function getMasteryCost() {
    return 1;
}

export function getMasteryEffects(unlockedIds) {
    const effects = {
        damagePercent: 0, critChance: 0, critDamagePercent: 0,
        corruptionMax: 0, spellDamage: 0, hpPercent: 0, healPower: 0,
        speedPercent: 0, lifeSteal: 0, areaDamage: 0,
        regenPercent: 0, dodgePercent: 0, damageReduction: 0, damageReflection: 0,
        cooldownReduction: 0, moveSpeedPercent: 0, shieldPercent: 0, shieldReflect: 0,
        dotPower: 0, dotDuration: 0, armorReduction: 0, spellSpeed: 0,
        bossDamagePercent: 0, damagePercentLowHp: 0, damagePercentFullHp: 0
    };
    (unlockedIds || []).forEach(id => {
        const m = getMasteryNode(id);
        if (!m) return;
        const e = m.effects;
        for (const key in e) {
            if (effects[key] !== undefined) effects[key] += e[key];
        }
    });
    return effects;
}

export function mergeMasteryEffects(talentEffects, masteryEffects) {
    const merged = { ...talentEffects };
    for (const key in masteryEffects) {
        if (typeof merged[key] === 'number' && typeof masteryEffects[key] === 'number') {
            merged[key] += masteryEffects[key];
        } else if (merged[key] === undefined || merged[key] === null) {
            merged[key] = masteryEffects[key];
        }
    }
    return merged;
}