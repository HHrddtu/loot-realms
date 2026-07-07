import { CLASS_TALENTS, CLASS_BRANCHES, TALENT_SCOPE } from './config/talents.js';

export { CLASS_TALENTS, CLASS_BRANCHES, TALENT_SCOPE };

export function getTalentsForClass(classKey) {
    return CLASS_TALENTS[classKey] || CLASS_TALENTS.sage;
}

export function getClassBranches(classKey) {
    return CLASS_BRANCHES[classKey] || CLASS_BRANCHES.sage;
}

export function getTalent(id) {
    for (const key in CLASS_TALENTS) {
        const found = CLASS_TALENTS[key].find(t => t.id === id);
        if (found) return found;
    }
    return null;
}

export function canUnlock(talentId, unlockedIds) {
    const talent = getTalent(talentId);
    if (!talent) return false;
    if (unlockedIds.includes(talentId)) return false;
    return talent.requires.every(req => unlockedIds.includes(req));
}

export function getTalentCost(row) {
    if (row <= 2) return 1;
    if (row <= 5) return 2;
    if (row <= 8) return 3;
    if (row <= 11) return 5;
    return 8;
}

export function getTalentEffects(unlockedIds) {
    const effects = {
        damagePercent: 0, damagePercentVs: {}, critChance: 0, critDamagePercent: 0,
        corruptionMax: 0, spellDamage: 0, hpPercent: 0, healPower: 0,
        speedPercent: 0, revealHp: false, lifeSteal: 0, areaDamage: 0,
        bossDamagePercent: 0, damagePercentLowHp: 0, damagePercentFullHp: 0,
        regenPercent: 0, dodgePercent: 0, damageReduction: 0, damageReflection: 0,
        cooldownReduction: 0, moveSpeedPercent: 0, shieldPercent: 0, shieldReflect: 0,
        shieldDuration: 0, shieldAbsorbsCorruption: false, dotPower: 0, dotDuration: 0,
        spellPierce: false, spellChain: 0, spellSpeed: 0, spellSplashBurn: false,
        spellSpreadOnKill: false, armorReduction: 0, purifyHeal: 0, purifyCorReduce: 0,
        purifyRegenDuration: 0, purifyShield: false, healBonusHp: 0,
        shieldStealPercent: 0, cheatDeath: false, inventorySlots: 0
    };
    unlockedIds.forEach(id => {
        const t = getTalent(id);
        if (!t) return;
        const e = t.effects;
        for (const key in e) {
            if (effects[key] !== undefined) {
                if (typeof effects[key] === 'boolean') {
                    effects[key] = effects[key] || e[key];
                } else if (typeof effects[key] === 'number') {
                    effects[key] += e[key];
                } else if (typeof effects[key] === 'object') {
                    for (const k in e[key]) {
                        effects[key][k] = (effects[key][k] || 0) + e[key][k];
                    }
                }
            }
        }
    });
    return effects;
}
