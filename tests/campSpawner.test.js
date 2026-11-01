import { describe, it, expect, vi } from 'vitest';
import { spawnCampMobs, spawnCampChests } from '../src/systems/CampSpawner.js';

function sprite(x, y, key) {
    return {
        x, y, texture: { key }, stats: null,
        setDepth() { return this; },
        setAlpha() { return this; },
        setTint() { return this; },
        play: vi.fn(),
        body: { setSize: vi.fn(), setCollideWorldBounds: vi.fn() }
    };
}

function makeScene() {
    return {
        depthsOffsetX: 100,
        diffMulti: { hp: 1, dmg: 1, exp: 1 },
        visionUnlocked: false,
        multiplayer: false,
        anims: { exists: () => true },
        physics: { add: { existing: vi.fn() } },
        add: {
            sprite: vi.fn(sprite),
            rectangle: vi.fn(() => ({ setOrigin() { return this; }, setDepth() { return this; }, setAlpha() { return this; } })),
            text: vi.fn(() => ({ setOrigin() { return this; }, setDepth() { return this; }, setAlpha() { return this; } }))
        },
        enemies: { add: vi.fn() },
        depthsChests: { add: vi.fn() }
    };
}

const enemyTypes = {
    tank: { key: 'crypt_soldier', name: 'Crypt Soldier', hp: 100, dmg: 10, exp: 5, bw: 20, bh: 20, role: 'tank' },
    assassin: { key: 'shadow_assassin', name: 'Shadow Assassin', hp: 80, dmg: 12, exp: 5, bw: 14, bh: 14, role: 'assassin' },
    archer: { key: 'bone_archer', name: 'Bone Archer', hp: 70, dmg: 9, exp: 5, bw: 14, bh: 14, role: 'archer' },
    mage: { key: 'necro_mage', name: 'Necro Mage', hp: 60, dmg: 14, exp: 5, bw: 14, bh: 14, role: 'necro' },
    healer: { key: 'dark_priest', name: 'Dark Priest', hp: 65, dmg: 8, exp: 5, bw: 14, bh: 14, role: 'healer' }
};

describe('CampSpawner', () => {
    it('spawns camp mobs with walk animation and stats', () => {
        const scene = makeScene();
        spawnCampMobs(scene, {
            offsetKey: 'depthsOffsetX',
            campCount: 1,
            mobsPerCamp: 5,
            campPositions: [{ x: 200, y: 300 }],
            enemyTypes
        });

        expect(scene.enemies.add.mock.calls.length).toBeGreaterThan(0);
        const enemy = scene.enemies.add.mock.calls[0][0];
        expect(enemy.walkAnimKey).toMatch(/_walk_anim$/);
        expect(enemy.stats.role).toBeTruthy();
        expect(enemy.stats.hp).toBeGreaterThan(0);
        expect(enemy.hpBg).toBeTruthy();
    });

    it('spawns chests with configured hp and group', () => {
        const scene = makeScene();
        spawnCampChests(scene, {
            offsetKey: 'depthsOffsetX',
            positions: [{ x: 10, y: 20 }, { x: 30, y: 40 }],
            texture: 'depths_chest',
            hp: 50,
            dropChance: 0,
            groupKey: 'depthsChests'
        });

        expect(scene.depthsChests.add).toHaveBeenCalledTimes(2);
        const chest = scene.depthsChests.add.mock.calls[0][0];
        expect(chest.stats).toEqual({ hp: 50, maxHp: 50 });
        expect(chest.texture.key).toBe('depths_chest');
    });
});
