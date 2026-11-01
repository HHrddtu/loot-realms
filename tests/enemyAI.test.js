import { describe, it, expect, beforeEach, vi } from 'vitest';

global.Phaser = {
    Math: {
        Distance: {
            Between: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        }
    }
};

import { EnemyAI } from '../src/systems/EnemyAI.js';

function createMockEnemy(stats = {}, overrides = {}) {
    const vel = { x: 0, y: 0 };
    const body = {
        setVelocity: vi.fn(),
        setVelocityX: vi.fn((v) => vel.x = v),
        setVelocityY: vi.fn((v) => vel.y = v),
        velocity: vel
    };
    const anims = { isPlaying: false, currentAnim: null };
    return {
        active: true,
        x: 100, y: 100,
        hpBg: { x: 0, y: 0, width: 40 },
        hpFill: { x: 0, y: 0, width: 40 },
        body,
        anims,
        stats: {
            key: 'test_enemy', name: 'Test',
            hp: 50, maxHp: 100,
            damage: 10, exp: 10,
            bw: 20, bh: 20,
            wTimer: 0, wDir: 0,
            speed: 50,
            ...stats
        },
        setFlipX: vi.fn(),
        play: vi.fn(),
        stop: vi.fn(),
        setFrame: vi.fn(),
        walkAnimKey: 'test_walk',
        ...overrides
    };
}

describe('EnemyAI', () => {
    let player;
    let scene;

    beforeEach(() => {
        player = { x: 300, y: 300 };
        scene = { menuOpen: false, transitioning: false };
    });

    it('chases player when within range', () => {
        const e = createMockEnemy({ speed: 50 }, { x: 250, y: 250 });
        e._alerted = true;
        EnemyAI.updateWanderChase(e, player, scene);
        expect(e.body.setVelocity).toHaveBeenCalled();
        const [vx, vy] = e.body.setVelocity.mock.calls[0];
        expect(vx).not.toBe(0);
        expect(vy).not.toBe(0);
    });

    it('stops when menu is open', () => {
        scene.menuOpen = true;
        const e = createMockEnemy();
        EnemyAI.updateWanderChase(e, player, scene);
        expect(e.body.setVelocity).toHaveBeenCalledWith(0);
    });

    it('stops when transitioning', () => {
        scene.transitioning = true;
        const e = createMockEnemy();
        EnemyAI.updateWanderChase(e, player, scene);
        expect(e.body.setVelocity).toHaveBeenCalledWith(0);
    });

    it('wanders when player is far', () => {
        player.x = 500; player.y = 500;
        const e = createMockEnemy();
        EnemyAI.updateWanderChase(e, player, scene);
        // Should have called some velocity method (wander moves in random direction)
        const calls = e.body.setVelocity.mock.calls.length +
                      e.body.setVelocityX.mock.calls.length +
                      e.body.setVelocityY.mock.calls.length;
        expect(calls).toBeGreaterThan(0);
    });

    it('does nothing for inactive enemies', () => {
        const e = createMockEnemy();
        e.active = false;
        EnemyAI.updateWanderChase(e, player, scene);
        expect(e.body.setVelocity).not.toHaveBeenCalled();
    });

    it('updates HP bar position', () => {
        const e = createMockEnemy();
        EnemyAI._updateHpBar(e);
        expect(e.hpBg.x).toBe(e.x);
        expect(e.hpBg.y).toBe(e.y - e.stats.bh / 2 - 8);
    });

    it('telegraphs melee attacks and only damages after the lunge', () => {
        const player = { x: 120, y: 100 };
        const scene = {
            player,
            time: { now: 0, delayedCall: vi.fn((ms, cb) => cb()) },
            add: { circle: vi.fn(() => ({ setDepth() { return this; }, destroy: vi.fn() })) },
            tweens: { add: vi.fn() },
            floatingText: vi.fn(),
            combat: { takeDamage: vi.fn() }
        };
        const e = createMockEnemy(
            { telegraphed: true, damage: 10 },
            { x: 100, y: 100, setTint: vi.fn(), clearTint: vi.fn() }
        );

        EnemyAI._defaultBehavior(e, player, 20, scene);

        expect(e.stats._attackPhase).toBe('windup');
        expect(e.body.setVelocity).toHaveBeenCalledWith(0);
        expect(e.setTint).toHaveBeenCalledWith(0xffaa00);
        expect(scene.combat.takeDamage).not.toHaveBeenCalled();

        scene.time.now = 600;
        EnemyAI._defaultBehavior(e, player, 20, scene);

        expect(e.stats._attackPhase).toBe('lunge');
        expect(scene.combat.takeDamage).toHaveBeenCalledWith(10);
    });
});
