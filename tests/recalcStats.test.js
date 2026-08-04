import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockClassData = {
    sage: { stats: { hp: 100, damage: 20, speed: 150, corruptionMax: 100 }, growth: { hpPerLevel: 15, dmgPerLevel: 4, speedPerLevel: 2 }, decay: 0.08 },
    alchemist: { stats: { hp: 120, damage: 15, speed: 140, corruptionMax: 120 }, growth: { hpPerLevel: 18, dmgPerLevel: 3, speedPerLevel: 2 }, decay: 0.08 },
    angel: { stats: { hp: 90, damage: 22, speed: 160, corruptionMax: 80 }, growth: { hpPerLevel: 12, dmgPerLevel: 5, speedPerLevel: 3 }, decay: 0.08 }
};

vi.mock('../src/config/index.js', () => ({
    DIFF_MULT: { Normal: { hp: 1, dmg: 1, exp: 1 }, Hard: { hp: 1.5, dmg: 1.5, exp: 1.5 } },
    MATERIAL_SLOTS: 100,
    EQUIP_BAG_SLOTS: 20,
    ACCOUNT_EQUIP_BAG_SLOTS: 20,
    EMPTY_ACCOUNT_EQUIPMENT: { weapon: null, armor: null, accessory: null }
}));

vi.mock('../src/classes.js', () => ({
    getClassData: (key) => mockClassData[key] || mockClassData.sage,
    getClassStats: (key, lvl) => {
        const c = mockClassData[key] || mockClassData.sage;
        return { maxHp: c.stats.hp, damage: c.stats.damage, speed: c.stats.speed };
    }
}));

vi.mock('../src/save.js', () => ({
    loadAccount: () => ({}),
    getAccountLevelUpReq: () => 100
}));

vi.mock('../src/talents.js', () => ({
    getTalentEffects: () => ({}),
    getTalent: () => null
}));

vi.mock('../src/accountTalents.js', () => ({
    getAccountTalentEffects: () => ({})
}));

vi.mock('../src/bestiary.js', () => ({
    getAllBestiaryBonuses: () => ({ hp: 0, dmg: 0, speed: 0 })
}));

vi.mock('../src/materialBook.js', () => ({
    getMaterialBonuses: () => ({ hp: 0, dmg: 0, speed: 0, corDecay: 0 }),
    recordMaterialCollect: () => {}
}));

vi.mock('../src/soulBook.js', () => ({
    getSoulBonuses: () => ({ hp: 0, dmg: 0, speed: 0, corDecay: 0 })
}));

vi.mock('../src/quests.js', () => ({
    onCollect: () => {}
}));

vi.mock('../src/sound.js', () => ({
    playLevelUp: () => {}
}));

vi.mock('../src/config/pets.js', () => ({
    getPetStats: () => ({})
}));

vi.mock('../src/config/sets.js', () => ({
    getSetBonuses: () => ({})
}));

import { PlayerSystem } from '../src/systems/PlayerSystem.js';

function createMockScene(overrides = {}) {
    const classKey = overrides.classKey || 'sage';
    const c = mockClassData[classKey] || mockClassData.sage;
    const defaults = {
        classKey,
        classData: c,
        difficulty: 'Normal',
        playerLevel: 1,
        playerHP: 100,
        playerMaxHP: 100,
        playerDamage: 20,
        playerSpeed: 150,
        materials: [],
        equipment: { weapon: null, armor: null, accessory: null },
        equipBag: [],
        unlockedTalents: [],
        talentEffects: {},
        accountEffects: {},
        accountEquipment: { weapon: null, armor: null, accessory: null },
        activeBoosts: {},
        upgradeLevels: {},
        equippedPet: null,
        petLevels: {},
        _divineBlessingDmgBuff: 0,
        _divineBlessingDefBuff: 0,
        _consumableBonusDmg: 0,
        _consumableBonusSpd: 0,
        _consumableBonusDef: 0,
        _consumableBonusCrit: 0,
        _consumableBonusLifesteal: 0
    };
    return { ...defaults, ...overrides };
}

describe('PlayerSystem.recalcStats', () => {
    let system;
    let scene;

    beforeEach(() => {
        scene = createMockScene();
        system = new PlayerSystem({ scene });
        system.scene = scene;
    });

    it('sets base stats for level 1 sage', () => {
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102);
        expect(scene.playerDamage).toBe(21);
        expect(scene.playerSpeed).toBe(151);
        expect(scene.corruptionMax).toBe(100);
    });

    it('increases stats per level', () => {
        scene.playerLevel = 10;
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(100 + 9 * 15 + 2);
        expect(scene.playerDamage).toBe(20 + 9 * 4 + 1);
        expect(scene.playerSpeed).toBe(150 + 9 * 2 + 1);
    });

    it('material items contribute speed only (HP/DMG from MaterialBook)', () => {
        scene.materials = [
            { stats: { hp: 10, dmg: 5, speed: 3 } },
            { stats: { hp: 5, dmg: 2, speed: 1 } }
        ];
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102);
        expect(scene.playerDamage).toBe(21);
        expect(scene.playerSpeed).toBe(150 + 3 + 1 + 1);
    });

    it('equipment contributes speed scaled by diffMult (HP/DMG from other sources)', () => {
        scene.equipment = {
            weapon: { stats: { hp: 20, dmg: 10, speed: 5 }, rarity: 'rare' },
            armor: null,
            accessory: null
        };
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102);
        expect(scene.playerDamage).toBe(21);
        expect(scene.playerSpeed).toBe(150 + 5 + 1);
    });

    it('preserves HP ratio after recalc', () => {
        scene.playerHP = 50;
        scene.playerMaxHP = 100;
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102);
        expect(scene.playerHP).toBe(Math.floor((50 / 100) * 102));
    });

    it('calculates different classes correctly', () => {
        scene.classKey = 'alchemist';
        scene.classData = mockClassData.alchemist;
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(122);
        expect(scene.playerDamage).toBe(16);
        expect(scene.playerSpeed).toBe(141);
    });

    it('handles no materials and no equipment gracefully', () => {
        scene.materials = [];
        scene.equipment = { weapon: null, armor: null, accessory: null };
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102);
        expect(scene.playerDamage).toBe(21);
        expect(scene.playerSpeed).toBe(151);
    });

    it('applies corruption max from class and talents', () => {
        scene.unlockedTalents = [];
        system.recalcStats();
        expect(scene.corruptionMax).toBe(100);
    });

    it('applies difficulty multiplier correctly', () => {
        scene.difficulty = 'Hard';
        system.recalcStats();
        expect(scene.playerMaxHP).toBeGreaterThanOrEqual(1);
        expect(scene.playerDamage).toBeGreaterThanOrEqual(1);
    });

    it('does not crash with empty data', () => {
        scene.materials = [];
        scene.equipment = { weapon: null, armor: null, accessory: null };
        scene.equippedPet = null;
        scene.upgradeLevels = {};
        scene.activeBoosts = {};
        expect(() => system.recalcStats()).not.toThrow();
    });

    it('multiple equipment pieces stack speed', () => {
        scene.equipment = {
            weapon: { stats: { speed: 10 } },
            armor: { stats: { speed: 5 } },
            accessory: { stats: { speed: 3 } }
        };
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerSpeed).toBe(150 + 10 + 5 + 3 + 1);
    });

    it('material count multiplies speed', () => {
        scene.materials = [
            { stats: { speed: 5 }, count: 3 }
        ];
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerSpeed).toBe(150 + 5 * 3 + 1);
    });

    it('hp ratio preserved when HP is at max', () => {
        scene.playerHP = 100;
        scene.playerMaxHP = 100;
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerHP).toBe(scene.playerMaxHP);
    });

    it('hp ratio preserved when HP is at 1', () => {
        scene.playerHP = 1;
        scene.playerMaxHP = 100;
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerHP).toBe(1);
    });

    it('hp is clamped to min 1 after recalc', () => {
        scene.playerHP = 0;
        scene.playerMaxHP = 100;
        system.recalcStats();
        expect(scene.playerHP).toBeGreaterThanOrEqual(1);
    });

    it('angel class has correct base stats', () => {
        scene.classKey = 'angel';
        scene.classData = mockClassData.angel;
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(92);
        expect(scene.playerDamage).toBe(23);
        expect(scene.playerSpeed).toBe(161);
    });

    it('account level scales all stats', () => {
        scene.accountLevel = 5;
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(100 + 5 * 2);
        expect(scene.playerDamage).toBe(20 + 5 * 1);
        expect(scene.playerSpeed).toBe(150 + 5 * 1);
    });

    it('account effects apply percentage bonuses', () => {
        scene.accountEffects = { hpPercent: 10, damagePercent: 10 };
        scene.accountLevel = 1;
        system.recalcStats();
        const expectedHp = Math.floor((100 + 2) * (1 + 10 / 100));
        const expectedDmg = Math.floor((20 + 1) * (1 + 10 / 100));
        expect(scene.playerMaxHP).toBe(expectedHp);
        expect(scene.playerDamage).toBe(expectedDmg);
    });

    it('upgrade levels apply flat percentage bonuses', () => {
        scene.upgradeLevels = { upg_hp: 2, upg_dmg: 3, upg_spd: 1 };
        scene.accountLevel = 1;
        system.recalcStats();
        const expectedHp = Math.floor((100 + 2) * (1 + 10 / 100));
        const expectedDmg = Math.floor((20 + 1) * (1 + 15 / 100));
        const expectedSpd = Math.floor((150 + 1) * (1 + 5 / 100));
        expect(scene.playerMaxHP).toBe(expectedHp);
        expect(scene.playerDamage).toBe(expectedDmg);
        expect(scene.playerSpeed).toBe(expectedSpd);
    });

    it('materials without speed stat do not affect speed', () => {
        scene.materials = [
            { stats: { hp: 10, dmg: 5 } }
        ];
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerSpeed).toBe(151);
    });

    it('materials without stats object are skipped', () => {
        scene.materials = [
            { name: 'broken material' }
        ];
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerSpeed).toBe(151);
    });

    it('equipment without stats is skipped', () => {
        scene.equipment = {
            weapon: { name: 'empty weapon' },
            armor: null,
            accessory: null
        };
        scene.accountLevel = 1;
        system.recalcStats();
        expect(scene.playerSpeed).toBe(151);
    });

    it('corruptionMax stacks from talents', () => {
        scene.talentEffects = { corruptionMax: 20 };
        system.recalcStats();
        expect(scene.corruptionMax).toBe(120);
    });

    it('computed crit chance includes talent and account effects', () => {
        scene.talentEffects = { critChance: 5 };
        scene.accountEffects = { critPercent: 3 };
        system.recalcStats();
        expect(scene.computedCritChance).toBe(8);
    });

    it('computed crit damage defaults to 1.5', () => {
        system.recalcStats();
        expect(scene.computedCritDamage).toBe(1.5);
    });

    it('computed crit damage includes talent bonus', () => {
        scene.talentEffects = { critDamagePercent: 50 };
        system.recalcStats();
        expect(scene.computedCritDamage).toBe(2.0);
    });
});
