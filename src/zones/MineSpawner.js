import { MINE_ENEMY_TYPES, MINE_ROCK_COUNT, MINE_CRYSTAL_COUNT, MINE_CHEST_COUNT, MINE_CHEST_DROP_CHANCE } from '../config/index.js';
import { rollZoneEquip, rollZoneMaterial } from '../utils.js';

export class MineSpawner {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    spawnEnemies() {
        for (let i = 0; i < MINE_ENEMY_TYPES.length; i++) {
            const t = MINE_ENEMY_TYPES[i % MINE_ENEMY_TYPES.length];
            this.makeEnemy(t, 80 + Math.random() * 640, 200 + Math.random() * 500);
        }
    }

    makeEnemy(t, x, y) {
        const s = this.scene;
        const e = s.add.sprite(x, y, t.key).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh); e.body.setCollideWorldBounds(true);
        e.stats = { key: t.key, name: t.name, hp: Math.floor(t.hp * s.diffMulti.hp), maxHp: Math.floor(t.hp * s.diffMulti.hp), damage: Math.floor(t.dmg * s.diffMulti.dmg), exp: Math.floor(t.exp * s.diffMulti.exp), bw: t.bw, bh: t.bh, wTimer: 0, wDir: 0 };
        const hw = t.bw + 4;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        s.enemies.add(e);
        return e;
    }

    spawnRocks() {
        for (let i = 0; i < MINE_ROCK_COUNT; i++) {
            const r = this.scene.add.sprite(60 + Math.random() * 680, 150 + Math.random() * 550, 'mine_rock').setDepth(4);
            this.scene.physics.add.existing(r, false);
            r.body.setSize(28, 22); r.body.setImmovable(true);
            this.scene.mineRocks.add(r);
        }
    }

    spawnCrystals() {
        for (let i = 0; i < MINE_CRYSTAL_COUNT; i++) {
            const cr = this.scene.add.sprite(60 + Math.random() * 680, 150 + Math.random() * 550, 'mine_crystal').setDepth(3).setAlpha(0.6 + Math.random() * 0.4);
            this.scene.tweens.add({ targets: cr, alpha: 0.3, duration: 1500 + Math.random() * 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            this.scene.mineCrystals.add(cr);
        }
    }

    spawnChests() {
        for (let i = 0; i < MINE_CHEST_COUNT; i++) {
            this.createChest(100 + Math.random() * 600, 250 + Math.random() * 400);
        }
    }

    createChest(x, y) {
        const s = this.scene;
        const ch = s.add.sprite(x, y, 'mine_chest').setDepth(6);
        s.physics.add.existing(ch, false);
        ch.body.setSize(24, 18);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 50, maxHp: 50 };
        ch.hpBg = s.add.rectangle(x, y - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = s.add.rectangle(x, y - 18, 28, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
        ch.broken = false; ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            if (Math.random() < MINE_CHEST_DROP_CHANCE) ch.loot.push(rollZoneEquip('mine'));
        }
        ch.hintText = s.add.text(x, y - 22, '', { fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
        ch.mpId = 'chest_mine_' + Date.now();
        s.mineChests.add(ch);
        ch.body.setSize(22, 18);
        ch.body.setCollideWorldBounds(true);
        return ch;
    }

    spawnTorches() {
        const s = this.scene;
        s.mineTorches = [];
        const positions = [
            { x: 80, y: 200 }, { x: 720, y: 200 }, { x: 80, y: 400 }, { x: 720, y: 400 },
            { x: 80, y: 600 }, { x: 720, y: 600 }, { x: 400, y: 300 }, { x: 200, y: 500 },
            { x: 600, y: 500 }, { x: 400, y: 700 }
        ];
        positions.forEach(p => {
            const torch = s.add.sprite(p.x, p.y, 'torch').setDepth(14);
            const glow = s.add.image(p.x, p.y - 4, 'torch_glow').setDepth(2).setAlpha(0.8);
            s.tweens.add({ targets: [torch, glow], alpha: { from: 0.7, to: 1 }, duration: 400 + Math.random() * 300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: Math.random() * 500 });
            s.tweens.add({ targets: glow, scaleX: { from: 0.9, to: 1.15 }, scaleY: { from: 0.9, to: 1.15 }, duration: 600 + Math.random() * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: Math.random() * 300 });
            s.mineTorches.push({ torch, glow });
        });
    }

    spawnDecor() {
        const s = this.scene;
        s.mineDecor = [];
        const decorTypes = [
            { key: 'mine_barrel', count: 5 }, { key: 'mine_crate', count: 4 },
            { key: 'mine_sign', count: 3 }, { key: 'mine_skull', count: 4 },
            { key: 'mine_ore_vein', count: 6 }, { key: 'mine_bucket', count: 3 },
            { key: 'mine_beam', count: 6 }
        ];
        decorTypes.forEach(dt => {
            for (let i = 0; i < dt.count; i++) {
                let x, y, blocked;
                do {
                    x = 40 + Math.random() * 720;
                    y = 80 + Math.random() * 740;
                    blocked = false;
                    if (Math.abs(x - 400) < 60 && Math.abs(y - 520) < 60) blocked = true;
                    if (Math.abs(x - 400) < 60 && Math.abs(y - 40) < 60) blocked = true;
                    if (Math.abs(x - 400) < 60 && Math.abs(y - 200) < 60) blocked = true;
                } while (blocked);
                const d = s.add.sprite(x, y, dt.key).setDepth(dt.key === 'mine_beam' ? 2 : 3);
                if (dt.key === 'mine_beam') d.setAlpha(0.6);
                if (dt.key === 'mine_ore_vein') {
                    s.tweens.add({ targets: d, alpha: 0.3, duration: 2000 + Math.random() * 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
                }
                s.mineDecor.push(d);
            }
        });
    }

    spawnCart() {
        const s = this.scene;
        if (s.mineCart) { s.mineCart.destroy(); s.mineCart = null; }
        const path = [{ x: 100, y: 100 }, { x: 700, y: 100 }, { x: 700, y: 500 }, { x: 100, y: 500 }, { x: 100, y: 100 }];
        const cart = s.add.sprite(path[0].x, path[0].y, 'mine_cart').setDepth(7);
        s.physics.add.existing(cart, false);
        cart.body.setSize(30, 20);
        cart.body.setCollideWorldBounds(true);
        cart.cartPath = path;
        cart.cartIdx = 0;
        cart.cartSpeed = 120;
        cart.cartActive = false;
        cart.cartCooldown = 0;
        cart.cartTriggerZone = s.add.zone(100, 100, 60, 60);
        s.physics.add.existing(cart.cartTriggerZone, true);
        s.physics.add.overlap(s.player, cart.cartTriggerZone, () => {
            if (!cart.cartActive && cart.cartCooldown <= 0) { cart.cartActive = true; cart.cartIdx = 0; }
        }, null, s);
        s.mineCart = cart;
    }
}
