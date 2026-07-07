import {
    CAVE_WIDTH, CAVE_HEIGHT, CAVE_ENEMY_TYPES,
    CAVE_CHEST_COUNT, CAVE_CHEST_DROP_CHANCE,
    CAVE_CHEST_CLOSED_KEY, CAVE_CHEST_W, CAVE_CHEST_H,
    GAME_WIDTH, FOREST_HEIGHT
} from '../config/index.js';
import { rollZoneEquip } from '../utils.js';

export class CaveSpawner {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    spawnCaveEnemies() {
        const s = this.scene;
        const ox = s.caveOffsetX;
        const pairs = [
            { tank: CAVE_ENEMY_TYPES[2], dps: CAVE_ENEMY_TYPES[0] },
            { tank: CAVE_ENEMY_TYPES[2], dps: CAVE_ENEMY_TYPES[0] },
            { tank: CAVE_ENEMY_TYPES[2], dps: CAVE_ENEMY_TYPES[0] },
            { tank: CAVE_ENEMY_TYPES[2], dps: CAVE_ENEMY_TYPES[0] },
            { tank: CAVE_ENEMY_TYPES[3], dps: CAVE_ENEMY_TYPES[1] },
            { tank: CAVE_ENEMY_TYPES[3], dps: CAVE_ENEMY_TYPES[1] },
            { tank: CAVE_ENEMY_TYPES[3], dps: CAVE_ENEMY_TYPES[1] },
            { tank: CAVE_ENEMY_TYPES[3], dps: CAVE_ENEMY_TYPES[1] },
            { tank: CAVE_ENEMY_TYPES[2], dps: CAVE_ENEMY_TYPES[1] },
            { tank: CAVE_ENEMY_TYPES[2], dps: CAVE_ENEMY_TYPES[1] }
        ];

        for (let i = 0; i < pairs.length; i++) {
            const y = 100 + (i * 105);
            const xTank = ox + 60 + Math.random() * (CAVE_WIDTH - 120);
            const xDps = xTank + 30 + Math.random() * 40;
            this.makeCaveEnemy(pairs[i].tank, xTank, y);
            this.makeCaveEnemy(pairs[i].dps, xDps, y + 15);
        }
    }

    makeCaveEnemy(t, x, y) {
        const s = this.scene;
        const animKey = t.key === 'cave_spider' ? 'cave_spider_walk_anim' :
                        t.key === 'cave_bat' ? 'cave_bat_walk_anim' :
                        t.key === 'stone_golem' ? 'stone_golem_walk_anim' :
                        'earth_worm_walk_anim';
        const walkTex = t.key === 'cave_spider' ? 'cave_spider_walk' :
                        t.key === 'cave_bat' ? 'cave_bat_walk' :
                        t.key === 'stone_golem' ? 'stone_golem_walk' :
                        'earth_worm_walk';
        const e = s.add.sprite(x, y, walkTex).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        e.play(animKey);

        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * s.diffMulti.hp),
            maxHp: Math.floor(t.hp * s.diffMulti.hp),
            damage: Math.floor(t.dmg * s.diffMulti.dmg),
            exp: Math.floor(t.exp * s.diffMulti.exp),
            bw: t.bw, bh: t.bh,
            wTimer: 0, wDir: 0
        };

        const hw = t.bw + 4;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(e, t.key);
        }
        return e;
    }

    spawnCaveChests() {
        const s = this.scene;
        const ox = s.caveOffsetX;
        for (let i = 0; i < CAVE_CHEST_COUNT; i++) {
            const cy = 120 + (i * 108);
            const cx = ox + 40 + Math.random() * (CAVE_WIDTH - 80);
            this.createCaveChest(cx, cy);
        }
    }

    createCaveChest(x, y) {
        const s = this.scene;
        const ch = s.add.sprite(x, y, CAVE_CHEST_CLOSED_KEY).setDepth(6);
        s.physics.add.existing(ch, false);
        ch.body.setSize(CAVE_CHEST_W, CAVE_CHEST_H);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 50, maxHp: 50 };
        ch.hpBg = s.add.rectangle(x, y - 14, CAVE_CHEST_W + 4, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = s.add.rectangle(x, y - 14, CAVE_CHEST_W + 4, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            if (Math.random() < CAVE_CHEST_DROP_CHANCE) {
                ch.loot.push(rollZoneEquip('cave'));
            }
        }
        ch.hintText = s.add.text(x, y - 18, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        ch.isCaveChest = true;
        s.caveChests.add(ch);
        return ch;
    }

    spawnCaveTorches() {
        const s = this.scene;
        s.caveTorches = [];
        const ox = s.caveOffsetX;
        const positions = [
            { x: ox + 30, y: 100 }, { x: ox + CAVE_WIDTH - 30, y: 100 },
            { x: ox + 30, y: 300 }, { x: ox + CAVE_WIDTH - 30, y: 300 },
            { x: ox + 30, y: 500 }, { x: ox + CAVE_WIDTH - 30, y: 500 },
            { x: ox + 30, y: 700 }, { x: ox + CAVE_WIDTH - 30, y: 700 },
            { x: ox + 30, y: 900 }, { x: ox + CAVE_WIDTH - 30, y: 900 },
            { x: ox + CAVE_WIDTH / 2, y: 200 }, { x: ox + CAVE_WIDTH / 2, y: 600 },
            { x: ox + CAVE_WIDTH / 2, y: 1000 }
        ];
        positions.forEach(p => {
            const torch = s.add.sprite(p.x, p.y, 'torch').setDepth(14);
            const glow = s.add.image(p.x, p.y - 4, 'torch_glow').setDepth(2).setAlpha(0.8);
            s.tweens.add({
                targets: [torch, glow], alpha: { from: 0.6, to: 1 },
                duration: 400 + Math.random() * 300, yoyo: true, repeat: -1,
                ease: 'Sine.easeInOut', delay: Math.random() * 500
            });
            s.tweens.add({
                targets: glow, scaleX: { from: 0.8, to: 1.2 }, scaleY: { from: 0.8, to: 1.2 },
                duration: 600 + Math.random() * 400, yoyo: true, repeat: -1,
                ease: 'Sine.easeInOut', delay: Math.random() * 300
            });
            s.caveTorches.push({ torch, glow });
        });
    }

    spawnTrapsInZone(zone) {
        const s = this.scene;
        const ox = zone === 'cave' ? s.caveOffsetX : 0;
        const w = zone === 'cave' ? CAVE_WIDTH : GAME_WIDTH;
        const h = zone === 'cave' ? CAVE_HEIGHT : FOREST_HEIGHT;
        const count = zone === 'cave' ? 6 : 4;
        const texKeys = ['trap_spikes', 'trap_poison'];
        for (let i = 0; i < count; i++) {
            const tx = ox + 40 + Math.random() * (w - 80);
            const ty = 80 + Math.random() * (h - 160);
            const tex = texKeys[Math.floor(Math.random() * texKeys.length)];
            const trap = s.add.sprite(tx, ty, tex).setDepth(1).setAlpha(0.7);
            trap.onCooldown = false;
            s.trapGroup.add(trap);
            trap.body.setSize(20, 20);
            s.traps.push(trap);
            s.tweens.add({
                targets: trap, alpha: { from: 0.5, to: 0.8 },
                duration: 1200 + Math.random() * 800, yoyo: true, repeat: -1,
                ease: 'Sine.easeInOut', delay: Math.random() * 500
            });
        }
    }

    spawnGroundLootInZone(zone) {
        const s = this.scene;
        const ox = zone === 'cave' ? s.caveOffsetX : 0;
        const w = zone === 'cave' ? CAVE_WIDTH : GAME_WIDTH;
        const h = zone === 'cave' ? CAVE_HEIGHT : FOREST_HEIGHT;
        const count = zone === 'cave' ? 8 : 6;
        for (let i = 0; i < count; i++) {
            const lx = ox + 30 + Math.random() * (w - 60);
            const ly = 60 + Math.random() * (h - 120);
            const loot = s.add.sprite(lx, ly, 'gold_pile').setDepth(1).setAlpha(0.85);
            loot.goldValue = 5 + Math.floor(Math.random() * 11);
            s.groundLootGroup.add(loot);
            loot.body.setSize(10, 8);
            s.tweens.add({
                targets: loot, alpha: { from: 0.6, to: 1 },
                duration: 800 + Math.random() * 600, yoyo: true, repeat: -1,
                ease: 'Sine.easeInOut', delay: Math.random() * 400
            });
        }
    }

    spawnExtraChestsInZone(zone) {
        const s = this.scene;
        const ox = zone === 'cave' ? s.caveOffsetX : 0;
        const w = zone === 'cave' ? CAVE_WIDTH : GAME_WIDTH;
        const h = zone === 'cave' ? CAVE_HEIGHT : FOREST_HEIGHT;
        const count = zone === 'cave' ? 3 : 4;
        for (let i = 0; i < count; i++) {
            const cx = ox + 50 + Math.random() * (w - 100);
            const cy = 100 + Math.random() * (h - 200);
            const ch = s.add.sprite(cx, cy, 'treasure_chest').setDepth(6);
            ch.stats = { hp: 40, maxHp: 40 };
            ch.hpBg = s.add.rectangle(cx, cy - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
            ch.hpFill = s.add.rectangle(cx, cy - 18, 28, 3, 0xf1c40f).setOrigin(0.5).setDepth(11);
            ch.broken = false;
            ch.loot = [];
            const count2 = 1 + Math.floor(Math.random() * 2);
            for (let j = 0; j < count2; j++) {
                if (Math.random() < 0.5) ch.loot.push(rollZoneEquip(zone));
            }
            ch.hintText = s.add.text(cx, cy - 22, '', {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
            ch.isForestChest = true;
            s.caveExtraChests.add(ch);
            ch.body.setSize(22, 18);
            ch.body.setCollideWorldBounds(true);
        }
    }
}
