import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Phaser
global.Phaser = {
    Math: {
        Distance: { Between: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) },
        Between: (min, max) => min + Math.random() * (max - min),
        Clamp: (val, min, max) => Math.max(min, Math.min(max, val))
    }
};

// Mock dependencies
vi.mock('../src/sound.js', () => ({
    playEnemyDeath: vi.fn(),
    playBossDeath: vi.fn(),
    playLoot: vi.fn(),
    playBreak: vi.fn(),
    playLevelUp: vi.fn(),
    playBossAoE: vi.fn()
}));

vi.mock('../src/bestiary.js', () => ({
    recordKill: vi.fn(),
    recordEncounter: vi.fn(),
    getAllBestiaryBonuses: () => ({})
}));

vi.mock('../src/soulBook.js', () => ({
    recordSoulCollect: vi.fn(),
    getSoulBonuses: () => ({ hp: 0, dmg: 0, speed: 0, corDecay: 0 })
}));

vi.mock('../src/quests.js', () => ({
    onKill: vi.fn(),
    onCollect: vi.fn()
}));

vi.mock('../src/config/gold.js', () => ({
    rollGold: vi.fn(() => 10),
    rollBossGold: vi.fn(() => 100),
    rollChestGold: vi.fn(() => 20)
}));

vi.mock('../src/config/pets.js', () => ({
    getPetStats: vi.fn(() => ({})),
    rollBossCrystals: vi.fn(() => 5),
    canGetCrystals: () => true,
    CRYSTAL_RUN_CAPS: { Normal: 200 }
}));

vi.mock('../src/utils.js', () => ({
    rollEquip: vi.fn(() => ({ name: 'Test Sword', rarity: 'common', stats: { dmg: 5 } })),
    rollMaterial: vi.fn(() => ({ name: 'Herb', rarity: 'common' })),
    rollZoneEquip: vi.fn(() => ({ name: 'Zone Sword', rarity: 'uncommon', stats: { dmg: 8 } })),
    rollZoneMaterial: vi.fn(() => ({ name: 'Zone Herb', rarity: 'common' })),
    rollAccountEquip: vi.fn(() => ({ name: 'Ring', rarity: 'rare', type: 'accountEquip', slot: 'accessory', stats: { hpPercent: 3 } })),
    rollCaveRelic: vi.fn(() => null),
    rollVillageAccountEquip: vi.fn(() => null)
}));

vi.mock('../src/config/index.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        RARITY_COLORS: { common: 0xaaaaaa, uncommon: 0x22aa44, rare: 0x3498db, epic: 0x9b59b6, legendary: 0xf1c40f },
        EQUIP_DROP_CHANCE: 0.05,
        ACCOUNT_EQUIP_DROP_CHANCE: 0.001,
        BOSS_DROP_CHANCE: 0.50,
        ENEMY_TYPES: [],
        MINE_ENEMY_TYPES: [],
        DIFF_MULT: { Normal: { hp: 1, dmg: 1, exp: 1 }, Hard: { hp: 1.5, dmg: 1.5, exp: 1.5 } }
    };
});

import { CombatLoot } from '../src/systems/CombatLoot.js';

function createMockScene(overrides = {}) {
    const player = {
        x: 100, y: 100,
        setTint: vi.fn(),
        clearTint: vi.fn(),
        setAlpha: vi.fn(),
        active: true
    };
    return {
        invincible: false,
        playerHP: 100,
        playerMaxHP: 100,
        playerDamage: 20,
        computedDamageReduction: 0,
        shieldActive: false,
        shieldHP: 0,
        lifeLinkActive: false,
        shieldVfx: null,
        player,
        zone: 'forest',
        difficulty: 'Normal',
        diffMulti: { hp: 1, dmg: 1, exp: 1 },
        classData: { stats: { hp: 100, damage: 20, speed: 150 } },
        classKey: 'sage',
        kills: 0,
        playerExp: 0,
        accountExp: 0,
        gold: 0,
        crystals: 0,
        accountEffects: { expPercent: 0, goldPercent: 0 },
        talentEffects: {},
        accountLevel: 1,
        materials: [],
        equipBag: [],
        maxEquipBag: 20,
        equipment: { weapon: null, armor: null, accessory: null },
        accountEquipment: { hat: null, mantle: null, legs: null, weapon: null, accessory: null, ring: null, charm: null, relic: null },
        accountEquipBag: [],
        maxAccountEquipBag: 16,
        bestiarySeen: {},
        enemies: { getLength: () => 0, getChildren: () => [] },
        stumps: { getLength: () => 0, getChildren: () => [] },
        forestChests: { getLength: () => 0, getChildren: () => [] },
        mineChests: { getLength: () => 0, getChildren: () => [] },
        caveChests: { getLength: () => 0, getChildren: () => [] },
        villageChests: { getLength: () => 0, getChildren: () => [] },
        villageZombies: { getLength: () => 0, getChildren: () => [] },
        hellImps: { getLength: () => 0, getChildren: () => [] },
        caveSmallBats: { getLength: () => 0, getChildren: () => [] },
        snowyIceShards: { getLength: () => 0, getChildren: () => [] },
        boss: null,
        mineBoss: null,
        caveBoss: null,
        villageBoss: null,
        hellBoss: null,
        snowyIceSpirit: null,
        castleBoss: null,
        zones: {
            mine: { isUnlocked: false, bossDefeated: false, hasSecretKey: false },
            cave: { bossDefeated: false },
            arena: { bossDefeated: false, bossAlive: false },
            village: { bossDefeated: false },
            hell: { bossDefeated: false },
            castle: { bossDefeated: false }
        },
        floatingText: vi.fn(),
        add: {
            sprite: vi.fn(() => ({ setDepth: vi.fn().mockReturnThis(), setAlpha: vi.fn().mockReturnThis(), setScale: vi.fn().mockReturnThis(), setTint: vi.fn().mockReturnThis(), destroy: vi.fn() })),
            text: vi.fn(() => ({ setOrigin: vi.fn().mockReturnThis(), setDepth: vi.fn().mockReturnThis(), setScrollFactor: vi.fn().mockReturnThis(), destroy: vi.fn() })),
            rectangle: vi.fn(() => ({ setOrigin: vi.fn().mockReturnThis(), setDepth: vi.fn().mockReturnThis(), destroy: vi.fn() }))
        },
        tweens: { add: vi.fn() },
        time: { delayedCall: vi.fn() },
        particles: { spawnEnemyDeath: vi.fn(), spawnBossDeath: vi.fn(), spawnLootPickup: vi.fn() },
        camera: { scrollX: 0, scrollY: 0 },
        checkLevelUp: vi.fn(),
        _checkAccountLevelUp: vi.fn(),
        updateUI: vi.fn(),
        addEquip: vi.fn(() => true),
        addMaterial: vi.fn(() => true),
        addAccountEquip: vi.fn(() => true),
        awardCrystals: vi.fn(() => 5),
        loot: null,
        combat: null,
        ...overrides
    };
}

describe('CombatLoot', () => {
    let scene;
    let loot;

    beforeEach(() => {
        scene = createMockScene();
        loot = new CombatLoot(scene);
        scene.loot = loot;
        scene.combat = { makeEnemy: vi.fn() };
    });

    describe('killEnemy', () => {
        it('should add EXP and gold on enemy kill', () => {
            const enemy = {
                active: true,
                stats: { key: 'goblin', name: 'Goblin', hp: 40, maxHp: 40, damage: 5, exp: 10 },
                hpBg: { destroy: vi.fn() },
                hpFill: { destroy: vi.fn() }
            };

            loot.killEnemy(enemy);

            expect(scene.playerExp).toBe(10);
            expect(scene.kills).toBe(1);
        });

        it('should record kill in bestiary', () => {
            const { recordKill } = require('../src/bestiary.js');
            const enemy = {
                active: true,
                stats: { key: 'goblin', name: 'Goblin', hp: 40, maxHp: 40, damage: 5, exp: 10 },
                hpBg: { destroy: vi.fn() },
                hpFill: { destroy: vi.fn() }
            };

            loot.killEnemy(enemy);

            expect(recordKill).toHaveBeenCalledWith('goblin');
        });
    });

    describe('breakChest', () => {
        it('should add gold and items on chest break', () => {
            const chest = {
                active: true,
                broken: false,
                isForestChest: true,
                stats: { hp: 40, maxHp: 40 },
                loot: [{ name: 'Sword', rarity: 'common' }],
                hpBg: { destroy: vi.fn() },
                hpFill: { destroy: vi.fn() },
                hintText: { setText: vi.fn() }
            };

            loot.breakChest(chest);

            expect(chest.broken).toBe(true);
            expect(scene.gold).toBeGreaterThan(0);
        });
    });

    describe('breakStump', () => {
        it('should add materials on stump break', () => {
            const stump = {
                active: true,
                stats: { hp: 40, maxHp: 40 },
                hpBg: { destroy: vi.fn() },
                hpFill: { destroy: vi.fn() }
            };

            loot.breakStump(stump);

            expect(scene.stumpsBroken).toBe(1);
        });
    });
});
