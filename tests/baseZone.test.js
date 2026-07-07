import { describe, it, expect, beforeEach, vi } from 'vitest';

import { BaseZone } from '../src/systems/BaseZone.js';

function createMockScene() {
    return {
        physics: { world: { colliders: { destroy: vi.fn() } } },
        fireballs: [{ glow: { destroy: vi.fn() }, destroy: vi.fn() }],
        enemyProjectiles: [{ destroy: vi.fn() }],
        shieldActive: true,
        shieldHP: 50,
        shieldVfx: { destroy: vi.fn() },
        enemies: {
            getLength: () => 2,
            getChildren: () => [
                { hpBg: { destroy: vi.fn() }, hpFill: { destroy: vi.fn() }, nameText: { destroy: vi.fn() } },
                { hpBg: { destroy: vi.fn() }, hpFill: { destroy: vi.fn() }, nameText: { destroy: vi.fn() } }
            ],
            clear: vi.fn(),
            destroy: vi.fn()
        },
        stumps: {
            getLength: () => 1,
            getChildren: () => [{ hpBg: { destroy: vi.fn() }, hpFill: { destroy: vi.fn() } }],
            clear: vi.fn(),
            destroy: vi.fn()
        },
        defeatedText: { destroy: vi.fn() },
        defeatedLoot: [{ destroy: vi.fn() }],
        npcSprites: [{ nameTag: { destroy: vi.fn() }, questIcon: { destroy: vi.fn() }, destroy: vi.fn() }],
        questIcons: [],
        nearbyNpc: { name: 'test' }
    };
}

describe('BaseZone', () => {
    let zone;
    let scene;

    beforeEach(() => {
        scene = createMockScene();
        zone = new BaseZone(scene);
        zone.scene = scene;
    });

    it('clear() destroys colliders', () => {
        zone.clear();
        expect(scene.physics.world.colliders.destroy).toHaveBeenCalled();
    });

    it('clear() destroys fireballs', () => {
        zone.clear();
        for (const fb of scene.fireballs) {
            expect(fb.glow.destroy).toHaveBeenCalled();
            expect(fb.destroy).toHaveBeenCalled();
        }
        expect(scene.fireballs).toEqual([]);
    });

    it('clear() destroys enemy projectiles', () => {
        zone.clear();
        for (const p of scene.enemyProjectiles) {
            expect(p.destroy).toHaveBeenCalled();
        }
        expect(scene.enemyProjectiles).toEqual([]);
    });

    it('clear() destroys shield', () => {
        const vfx = scene.shieldVfx;
        zone.clear();
        expect(scene.shieldActive).toBe(false);
        expect(scene.shieldHP).toBe(0);
        expect(vfx.destroy).toHaveBeenCalled();
    });

    it('clear() destroys enemies', () => {
        const enemies = scene.enemies;
        zone.clear();
        expect(enemies.clear).toHaveBeenCalledWith(true, true);
        expect(enemies.destroy).toHaveBeenCalled();
    });

    it('clear() destroys stumps', () => {
        const stumps = scene.stumps;
        zone.clear();
        expect(stumps.clear).toHaveBeenCalledWith(true, true);
    });

    it('clear() destroys defeated UI', () => {
        const dt = scene.defeatedText;
        const dl = scene.defeatedLoot[0];
        zone.clear();
        expect(dt.destroy).toHaveBeenCalled();
        expect(dl.destroy).toHaveBeenCalled();
    });

    it('clear() destroys NPCs', () => {
        const npc = scene.npcSprites[0];
        zone.clear();
        expect(npc.destroy).toHaveBeenCalled();
        expect(scene.npcSprites).toEqual([]);
        expect(scene.nearbyNpc).toBeNull();
    });
});
