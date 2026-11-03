import { describe, it, expect, vi } from 'vitest';
import { FOREST_ENCOUNTERS } from '../src/config/encounters/forest.js';
import { getZoneEncounters } from '../src/config/encounters/index.js';
import { EncounterManager } from '../src/systems/EncounterManager.js';
import { EnemyAI } from '../src/systems/EnemyAI.js';

function makeEnemy(base, x, y) {
    return {
        x,
        y,
        active: true,
        scaleX: 1,
        scaleY: 1,
        texture: { key: base.key + '_walk' },
        stats: {
            key: base.key,
            name: base.name,
            hp: base.hp,
            maxHp: base.hp,
            damage: base.dmg,
            exp: base.exp,
            role: base.role || 'dps',
            telegraphed: base.telegraphed || false,
            bw: base.bw,
            bh: base.bh,
            speed: 50
        },
        setScale(value) { this.scaleX = value; this.scaleY = value; return this; },
        setTint: vi.fn()
    };
}

function spawnAllPacks(scene, mgr) {
    FOREST_ENCOUNTERS.forEach(pack => {
        scene.player.x = pack.trigger.x;
        scene.player.y = pack.trigger.y;
        mgr.update(1000, 16);
    });
}

function makeScene() {
    const spawned = [];
    return {
        spawned,
        gold: 0,
        _encounterSpeedMult: 1,
        player: { x: 0, y: 0 },
        time: { now: 1000 },
        menuOpen: false,
        transitioning: false,
        combat: {
            makeEnemy: vi.fn((base, x, y) => {
                const enemy = makeEnemy(base, x, y);
                spawned.push(enemy);
                return enemy;
            })
        },
        add: {
            circle: vi.fn(() => ({
                setDepth() { return this; },
                setStrokeStyle() { return this; },
                destroy: vi.fn()
            }))
        },
        tweens: { add: vi.fn() },
        floatingText: vi.fn(),
        addEquip: vi.fn(() => true),
        recalcStats: vi.fn(),
        ui: { updateUI: vi.fn() }
    };
}

describe('Forest encounters', () => {
    it('defines three authored packs with unique enemy verbs', () => {
        expect(FOREST_ENCOUNTERS).toHaveLength(3);
        expect(getZoneEncounters('forest')).toBe(FOREST_ENCOUNTERS);
        expect(getZoneEncounters('mine')).toEqual([]);
        expect(FOREST_ENCOUNTERS.every(p => p.trigger.type === 'onProximity')).toBe(true);
        expect(FOREST_ENCOUNTERS.some(p => p.enemies.some(e => e.role === 'trapper'))).toBe(true);
        expect(FOREST_ENCOUNTERS.some(p => p.enemies.some(e => e.splitOnDeath))).toBe(true);
        expect(FOREST_ENCOUNTERS.some(p => p.enemies.some(e => e.isElite))).toBe(true);
    });

    it('spawns packs only when the player approaches them', () => {
        const scene = makeScene();
        const mgr = new EncounterManager(scene);
        mgr.loadZone('forest');

        expect(scene.combat.makeEnemy).toHaveBeenCalledTimes(0);
        expect(mgr.getHuntStatus().packsLeft).toBe(3);

        spawnAllPacks(scene, mgr);

        expect(scene.combat.makeEnemy).toHaveBeenCalledTimes(10);
        const trapper = scene.spawned.find(e => e.stats.name === 'Goblin Trapper');
        expect(trapper.stats.role).toBe('trapper');
        expect(trapper.stats.telegraphed).toBe(false);

        const mother = scene.spawned.find(e => e.stats.name === 'Slime Mother');
        expect(mother.stats.splitOnDeath).toBe(true);
        expect(mother.stats.maxHp).toBeGreaterThan(100);

        const alpha = scene.spawned.find(e => e.stats.name === 'Rat Alpha');
        expect(alpha.stats.isElite).toBe(true);
        expect(alpha.stats.role).toBe('swarm');
    });

    it('splits a slime mother into non-splitting spawns', () => {
        const scene = makeScene();
        const mgr = new EncounterManager(scene);
        mgr.loadZone('forest');
        scene.spawned.length = 0;

        const parent = makeEnemy({ key: 'slime', name: 'Slime Mother', hp: 100, dmg: 10, exp: 10, bw: 16, bh: 14 }, 100, 100);
        parent.stats.maxHp = 100;
        parent.stats.hp = 100;
        parent.stats.encounterId = 'forest_slime_nest';
        parent.scaleX = 1.5;

        const children = mgr.handleSplit(parent);
        expect(children).toHaveLength(2);
        children.forEach(child => {
            expect(child.stats.isSpawn).toBe(true);
            expect(child.stats.splitOnDeath).toBe(false);
            expect(child.stats.name).toBe('Slime Spawn');
            expect(child.stats.maxHp).toBe(18);
        });
    });

    it('slows the player while a snare is armed', () => {
        const scene = makeScene();
        const mgr = new EncounterManager(scene);
        mgr.loadZone('forest');
        scene.player.x = 100;
        scene.player.y = 100;

        mgr.spawnSnare(100, 100);
        mgr.update(1000);
        expect(scene._encounterSpeedMult).toBe(1);

        mgr.update(1500);
        expect(scene._encounterSpeedMult).toBe(0.45);
        expect(scene.floatingText).toHaveBeenCalledWith(100, 70, 'SNARED!', '#9acd32');

        mgr.update(6000);
        expect(scene._encounterSpeedMult).toBe(1);
        expect(mgr.snares).toHaveLength(0);
    });

    it('spawns the apex after the packs are cleared and rewards the kill', () => {
        const scene = makeScene();
        const mgr = new EncounterManager(scene);
        mgr.loadZone('forest');
        spawnAllPacks(scene, mgr);

        mgr.packEnemies.forEach(enemy => {
            enemy.active = false;
            enemy.stats.hp = 0;
        });
        mgr.update(2000, 16);

        expect(mgr.apexSpawned).toBe(true);
        expect(mgr.apex.stats.name).toBe('Goblin Snarechief');
        expect(mgr.apex.stats.isApex).toBe(true);
        expect(mgr.apex.stats.isElite).toBe(true);
        expect(mgr.getHuntStatus().apex).toBe(true);

        mgr.apex.active = false;
        mgr.update(2100, 16);

        expect(mgr.huntComplete).toBe(true);
        expect(mgr.getHuntStatus().complete).toBe(true);
        expect(scene.gold).toBe(120);
        expect(scene.addEquip).toHaveBeenCalled();
    });

    it('clears snares and restores speed on zone transition', () => {
        const scene = makeScene();
        const mgr = new EncounterManager(scene);
        mgr.loadZone('forest');
        mgr.spawnSnare(0, 0);
        expect(mgr.snares).toHaveLength(1);

        mgr.clear();
        expect(mgr.snares).toHaveLength(0);
        expect(scene._encounterSpeedMult).toBe(1);
        expect(mgr.zone).toBe(null);
    });

    it('trapper throws a snare when the player is in range', () => {
        const scene = {
            game: { loop: { delta: 2600 } },
            anims: { exists: () => false },
            encounterMgr: { spawnSnare: vi.fn() }
        };
        const enemy = makeEnemy({ key: 'goblin', name: 'Goblin Trapper', hp: 72, dmg: 8, exp: 15, bw: 18, bh: 20 }, 100, 100);
        enemy.stats.snareTimer = 0;
        enemy.stats.speed = 70;
        enemy.setFlipX = vi.fn();
        enemy.body = { setVelocity: vi.fn() };

        EnemyAI._trapperBehavior(enemy, { x: 200, y: 100 }, 100, scene);

        expect(scene.encounterMgr.spawnSnare).toHaveBeenCalledWith(200, 100);
    });
});
