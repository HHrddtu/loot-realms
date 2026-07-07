import { describe, it, expect, beforeEach, vi } from 'vitest';

global.Phaser = {
    Math: {
        Distance: { Between: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) },
        Between: (min, max) => min
    }
};

vi.mock('../src/sound.js', () => ({
    playEnemyDeath: vi.fn(),
    playBossDeath: vi.fn(),
    playLoot: vi.fn(),
    playBreak: vi.fn(),
    playLevelUp: vi.fn()
}));

vi.mock('../src/bestiary.js', () => ({
    recordKill: vi.fn(),
    recordEncounter: vi.fn(),
    getAllBestiaryBonuses: () => ({ hp: 0, dmg: 0, speed: 0 })
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
    rollBossCrystals: vi.fn(() => 0),
    canGetCrystals: () => true,
    CRYSTAL_RUN_CAPS: {}
}));

vi.mock('../src/utils.js', () => ({
    rollEquip: vi.fn(() => ({ name: 'Test Sword', rarity: 'common' })),
    rollMaterial: vi.fn(() => ({ name: 'Herb', rarity: 'common' })),
    rollZoneEquip: vi.fn(() => ({ name: 'Zone Sword', rarity: 'common' })),
    rollZoneMaterial: vi.fn(() => ({ name: 'Zone Herb', rarity: 'common' })),
    rollAccountEquip: vi.fn(() => ({ name: 'Ring', rarity: 'common', type: 'accountEquip', slot: 'accessory' })),
    rollCaveRelic: vi.fn(() => null),
    rollVillageAccountEquip: vi.fn(() => null)
}));

vi.mock('../src/config/index.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        RARITY_COLORS: { common: 0xaaaaaa, uncommon: 0x22aa44, rare: 0x3498db, epic: 0x9b59b6, legendary: 0xf1c40f },
        EQUIP_DROP_CHANCE: -1,
        ACCOUNT_EQUIP_DROP_CHANCE: -1,
        BOSS_DROP_CHANCE: -1,
        ENEMY_TYPES: [],
        MINE_ENEMY_TYPES: [],
        DIFF_MULT: { Normal: { hp: 1, dmg: 1, exp: 1 }, Hard: { hp: 1.5, dmg: 1.5, exp: 1.5 } }
    };
});

import { CombatCore } from '../src/systems/CombatCore.js';
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
        crystalsThisRun: 0,
        enemies: { add: vi.fn() },
        addEquip: vi.fn(() => true),
        addAccountEquip: vi.fn(() => true),
        checkLevelUp: vi.fn(),
        _checkAccountLevelUp: vi.fn(),
        updateUI: vi.fn(),
        floatingText: vi.fn(),
        recalcStats: vi.fn(),
        _updateQuestIcons: vi.fn(),
        cameras: { main: { shake: vi.fn() } },
        time: { delayedCall: vi.fn((_, cb) => { if (typeof cb === 'function') cb(); }) },
        tweens: { add: vi.fn() },
        particles: { spawnDamageToPlayer: vi.fn(), spawnEnemyDeath: vi.fn() },
        ui: { showDamageFlash: vi.fn() },
        add: {
            sprite: vi.fn(() => ({ setDepth: vi.fn(() => ({ destroy: vi.fn() })) })),
            text: vi.fn(() => ({ setOrigin: vi.fn(() => ({ setDepth: vi.fn(() => ({ destroy: vi.fn() })) })) }))
        },
        ...overrides
    };
}

describe('CombatCore.takeDamage', () => {
    it('applies basic damage', () => {
        const s = createMockScene();
        const core = new CombatCore(s);
        core.takeDamage(20);
        expect(s.playerHP).toBe(80);
        expect(s.invincible).toBe(true);
    });

    it('reduces damage by computedDamageReduction', () => {
        const s = createMockScene({ computedDamageReduction: 50 });
        const core = new CombatCore(s);
        core.takeDamage(20);
        expect(s.playerHP).toBe(90);
    });

    it('absorbs damage with shield before hurting HP', () => {
        const s = createMockScene({ shieldActive: true, shieldHP: 15 });
        const core = new CombatCore(s);
        core.takeDamage(20);
        expect(s.shieldHP).toBe(0);
        expect(s.playerHP).toBe(95);
    });

    it('respawns player on fatal damage', () => {
        const s = createMockScene({ playerHP: 10, playerMaxHP: 100 });
        const core = new CombatCore(s);
        core.takeDamage(20);
        expect(s.playerHP).toBe(100);
        expect(s.recalcStats).toHaveBeenCalled();
    });
});

describe('CombatLoot.killEnemy', () => {
    it('destroys enemy and grants exp/gold', () => {
        const s = createMockScene();
        const loot = new CombatLoot(s);
        const enemy = {
            x: 200, y: 200,
            stats: { key: 'test', name: 'Test', hp: 0, maxHp: 10, exp: 5 },
            hpBg: { destroy: vi.fn() },
            hpFill: { destroy: vi.fn() },
            destroy: vi.fn()
        };
        loot.killEnemy(enemy);
        expect(s.kills).toBe(1);
        expect(s.playerExp).toBe(5);
        expect(s.accountExp).toBe(5);
        expect(enemy.destroy).toHaveBeenCalled();
        expect(enemy.hpBg.destroy).toHaveBeenCalled();
        expect(enemy.hpFill.destroy).toHaveBeenCalled();
    });
});
