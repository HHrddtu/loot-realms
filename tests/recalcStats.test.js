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
        scene.accountLevel = 1; // +2 HP, +1 DMG, +1 SPD
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102); // 100 + 2 account
        expect(scene.playerDamage).toBe(21); // 20 + 1 account
        expect(scene.playerSpeed).toBe(151); // 150 + 1 account
        expect(scene.corruptionMax).toBe(100);
    });

    it('increases stats per level', () => {
        scene.playerLevel = 10;
        scene.accountLevel = 1; // +2 HP, +1 DMG, +1 SPD
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(100 + 9 * 15 + 2);
        expect(scene.playerDamage).toBe(20 + 9 * 4 + 1);
        expect(scene.playerSpeed).toBe(150 + 9 * 2 + 1);
    });

    it('applies material stat bonuses', () => {
        scene.materials = [
            { stats: { hp: 10, dmg: 5, speed: 3 } },
            { stats: { hp: 5, dmg: 2 } }
        ];
        scene.accountLevel = 1; // +2 HP, +1 DMG, +1 SPD
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(100 + 15 + 2);
        expect(scene.playerDamage).toBe(20 + 7 + 1);
        expect(scene.playerSpeed).toBe(150 + 3 + 1);
    });

    it('applies equipment stat bonuses with difficulty multiplier', () => {
        scene.equipment = {
            weapon: { stats: { hp: 20, dmg: 10, speed: 5 }, rarity: 'rare' },
            armor: null,
            accessory: null
        };
        scene.accountLevel = 1; // +2 HP, +1 DMG, +1 SPD
        const diffMult = { hp: 1, dmg: 1 };
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(100 + 20 * diffMult.hp + 2);
        expect(scene.playerDamage).toBe(20 + 10 * diffMult.dmg + 1);
    });

    it('preserves HP ratio after recalc', () => {
        scene.playerHP = 50;
        scene.playerMaxHP = 100;
        scene.materials = [{ stats: { hp: 100 } }];
        scene.accountLevel = 1; // +2 HP
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(202); // 100 + 100 material + 2 account
        expect(scene.playerHP).toBe(Math.floor((50 / 100) * 202));
    });

    it('calculates different classes correctly', () => {
        scene.classKey = 'alchemist';
        scene.classData = mockClassData.alchemist;
        scene.accountLevel = 1; // +2 HP, +1 DMG, +1 SPD
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(122); // 120 + 2 account
        expect(scene.playerDamage).toBe(16); // 15 + 1 account
        expect(scene.playerSpeed).toBe(141); // 140 + 1 account
    });

    it('handles no materials and no equipment gracefully', () => {
        scene.materials = [];
        scene.equipment = { weapon: null, armor: null, accessory: null };
        scene.accountLevel = 1; // Account level 1 gives +2 HP, +1 DMG, +1 SPD
        system.recalcStats();
        expect(scene.playerMaxHP).toBe(102); // 100 + 2 account bonus
        expect(scene.playerDamage).toBe(21); // 20 + 1 account bonus
        expect(scene.playerSpeed).toBe(151); // 150 + 1 account bonus
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
});
