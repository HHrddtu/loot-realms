import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT, CAVE_WIDTH, CAVE_HEIGHT,
    CAVE_ENEMY_TYPES, CAVE_BOSS_TYPE,
    CAVE_CHEST_COUNT, CAVE_CHEST_DROP_CHANCE,
    CAVE_CHEST_CLOSED_KEY, CAVE_CHEST_W, CAVE_CHEST_H,
    CAVE_SMALL_BAT, DIFF_MULT, DIFF_COLORS
} from '../config/index.js';
import { rollZoneEquip } from '../utils.js';
import { playPortal, playBossAoE, startZoneMusic } from '../sound.js';
import { BossAI } from '../systems/BossAI.js';
import { BaseZone } from '../systems/BaseZone.js';

export class CaveZone extends BaseZone {
    constructor(scene) {
        super(scene);
    }

    setup() {
        const s = this.scene;
        const caveOffsetX = (GAME_WIDTH - CAVE_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#0d0d0d');
        s.physics.world.setBounds(caveOffsetX, 0, CAVE_WIDTH, CAVE_HEIGHT);
        s.cameras.main.setBounds(caveOffsetX, 0, CAVE_WIDTH, CAVE_HEIGHT);

        s.caveBg = s.add.tileSprite(caveOffsetX, 0, CAVE_WIDTH, CAVE_HEIGHT, 'cave_ground')
            .setOrigin(0, 0).setDepth(0);

        s.caveOffsetX = caveOffsetX;
        s.player.x = caveOffsetX + CAVE_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();
        s.caveChests = s.physics.add.group();
        s.caveTorches = [];
        s.traps = [];

        this.spawnCaveEnemies();
        this.spawnCaveChests();
        this.spawnCaveTorches();

        s.caveDarkness = s.add.image(caveOffsetX + CAVE_WIDTH / 2, 300, 'mine_darkness')
            .setScale(CAVE_WIDTH / 800, CAVE_HEIGHT / 600)
            .setDepth(13).setAlpha(0.92).setScrollFactor(0);

        s.caveBossDefeated = false;
        s.caveBossAlive = false;
        s.caveBossSpawned = false;
        s.caveSmallBats = s.physics.add.group();

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.physics.add.overlap(s.player, s.caveSmallBats, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.trapGroup = s.physics.add.group();
        s.groundLootGroup = s.physics.add.group();
        s.caveExtraChests = s.physics.add.group();

        this.spawnTrapsInZone('cave');
        this.spawnGroundLootInZone('cave');
        this.spawnExtraChestsInZone('cave');

        s.physics.add.overlap(s.player, s.trapGroup, (p, trap) => {
            if (!trap.active || trap.onCooldown || s.menuOpen || s.transitioning) return;
            trap.onCooldown = true;
            const dmg = 10 + Math.floor(Math.random() * 11);
            s.combat.takeDamage(dmg);
            s.floatingText(trap.x, trap.y - 20, '-' + dmg, '#e74c3c');
            const angle = Math.atan2(p.y - trap.y, p.x - trap.x);
            const kb = 150;
            p.body.setVelocity(Math.cos(angle) * kb, Math.sin(angle) * kb);
            trap.setAlpha(0.2);
            s.time.delayedCall(3000, () => {
                if (trap.active) {
                    trap.onCooldown = false;
                    trap.setAlpha(0.7);
                }
            });
        }, null, s);

        s.physics.add.overlap(s.player, s.groundLootGroup, (p, loot) => {
            if (!loot.active) return;
            const gold = loot.goldValue || 10;
            s.gold += gold;
            s.floatingText(loot.x, loot.y - 20, '+' + gold + ' gold', '#f1c40f');
            loot.destroy();
        }, null, s);

        s.zone = 'cave';
        s.npc.spawnNPCs();
        s.hintText.setText('Q=quests | I=inventory | TAB=stats | T=talents | P=pause');
        startZoneMusic('cave');
        if (s.particles) {
            s.particles.startCaveDrip(500, 1200);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.traps) {
            s.traps.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.traps = null;
        }
        if (s.trapGroup) { s.trapGroup.clear(true, true); s.trapGroup.destroy(); s.trapGroup = null; }
        if (s.groundLootGroup) { s.groundLootGroup.clear(true, true); s.groundLootGroup.destroy(); s.groundLootGroup = null; }
        if (s.caveExtraChests) {
            s.caveExtraChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.caveExtraChests.clear(true, true);
            s.caveExtraChests.destroy();
            s.caveExtraChests = null;
        }
        if (s.stumps && s.stumps.getLength && s.stumps.getLength() > 0) s.stumps.clear(true, true);
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
        if (s.caveChests && s.caveChests.getLength && s.caveChests.getLength() > 0) {
            s.caveChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.caveChests.clear(true, true);
        }
        if (s.caveChests) { s.caveChests.destroy(); s.caveChests = null; }
        if (s.caveSmallBats && s.caveSmallBats.getLength && s.caveSmallBats.getLength() > 0) {
            s.caveSmallBats.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.caveSmallBats.clear(true, true);
        }
        if (s.caveSmallBats) { s.caveSmallBats.destroy(); s.caveSmallBats = null; }
        if (s.caveBoss) {
            if (s.caveBoss.hpBg) s.caveBoss.hpBg.destroy();
            if (s.caveBoss.hpFill) s.caveBoss.hpFill.destroy();
            if (s.caveBoss.aoeRing) s.caveBoss.aoeRing.destroy();
            if (s.caveBoss.aoeRing2) s.caveBoss.aoeRing2.destroy();
            if (s.caveBoss.telegraph) s.caveBoss.telegraph.destroy();
            if (s.caveBoss.auraRing) s.caveBoss.auraRing.destroy();
            s.caveBoss.destroy();
            s.caveBoss = null;
        }
        if (s.caveBossNameText) { s.caveBossNameText.destroy(); s.caveBossNameText = null; }
        if (s.caveBossTimer) { s.caveBossTimer.destroy(); s.caveBossTimer = null; }
        if (s.caveBg) { s.caveBg.destroy(); s.caveBg = null; }
        if (s.caveDarkness) { s.caveDarkness.destroy(); s.caveDarkness = null; }
        if (s.caveStairs) { s.caveStairs.destroy(); s.caveStairs = null; }
        if (s.caveStairsHint) { s.caveStairsHint.destroy(); s.caveStairsHint = null; }
        if (s.caveTorches) {
            s.caveTorches.forEach(t => { if (t.torch) t.torch.destroy(); if (t.glow) t.glow.destroy(); });
            s.caveTorches = null;
        }
        if (s.defeatedText) { s.defeatedText.destroy(); s.defeatedText = null; }
        if (s.defeatedLoot) {
            s.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.defeatedLoot = null;
        }
        s.caveBossAlive = false;
        s.caveBossSpawned = false;
        s.caveBossDefeated = false;
    }

    update(time, delta) {
        const s = this.scene;
        if (s.zone === 'cave') {
            this.checkCaveProximity();
            this.caveBossSpawnCheck();
            this.updateCaveMobs();
            this.updateCaveBoss();
        }
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

    checkCaveProximity() {
        const s = this.scene;
        if (s.zone !== 'cave' || s.transitioning || s.menuOpen) return;

        if (s.caveChests) {
            s.caveChests.getChildren().forEach(ch => {
                if (!ch.active || ch.broken) return;
                const cdist = Phaser.Math.Distance.Between(
                    s.player.x, s.player.y, ch.x, ch.y
                );
                ch.hintText.setText(cdist < 45 ? 'Attack!' : '');
            });
        }

        if (s.caveExtraChests) {
            s.caveExtraChests.getChildren().forEach(ch => {
                if (!ch.active || ch.broken) return;
                const cdist = Phaser.Math.Distance.Between(
                    s.player.x, s.player.y, ch.x, ch.y
                );
                ch.hintText.setText(cdist < 45 ? 'Attack!' : '');
            });
        }

        if (s.caveStairs && s.caveBossDefeated) {
            const sdist = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.caveStairs.x, s.caveStairs.y
            );
            if (s.caveStairsHint) {
                s.caveStairsHint.setText(sdist < 50 ? 'SPACE to enter Village' : '');
            }
        }
    }

    enterCaveVillage() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'cave' || !s.caveBossDefeated) return;
        if (!s.caveStairs) return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.caveStairs.x, s.caveStairs.y
        );
        if (dist >= 50) return;

        s.transitioning = true;
        if (s.caveStairsHint) s.caveStairsHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('village');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    updateCaveMobs() {
        const s = this.scene;
        if (s.zone !== 'cave' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        const ox = s.caveOffsetX;

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            if (e === s.caveBoss) return;

            const aggroBat = s.getAggroTarget();
            const dx = aggroBat.x - e.x;
            const dy = aggroBat.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const clampX = Phaser.Math.Clamp(e.x, ox + 16, ox + CAVE_WIDTH - 16);
            const clampY = Phaser.Math.Clamp(e.y, 16, CAVE_HEIGHT - 16);
            if (e.x !== clampX || e.y !== clampY) {
                e.x = clampX;
                e.y = clampY;
            }

            if (dist < 250) {
                const speed = 55;
                if (dist > 25) {
                    e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }
            } else {
                const centerX = ox + CAVE_WIDTH / 2;
                const centerY = CAVE_HEIGHT / 2;
                const wDx = centerX - e.x;
                const wDy = centerY - e.y;
                const wDist = Math.sqrt(wDx * wDx + wDy * wDy);
                if (wDist > 60) {
                    e.body.setVelocity((wDx / wDist) * 25, (wDy / wDist) * 25);
                    e.setFlipX(wDx < 0);
                } else {
                    e.body.setVelocity(0);
                }
            }

            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.y - e.stats.bh / 2 - 8;
        });

        if (s.caveSmallBats) {
            s.caveSmallBats.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                const aggroSmall = s.getAggroTarget();
                const dx = aggroSmall.x - e.x;
                const dy = aggroSmall.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    const speed = 70;
                    if (dist > 20) {
                        e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                        e.setFlipX(dx < 0);
                    } else {
                        e.body.setVelocity(0);
                    }
                } else {
                    e.body.setVelocity(0);
                }
                e.hpBg.x = e.x;
                e.hpBg.y = e.y - e.stats.bh / 2 - 6;
                e.hpFill.x = e.x;
                e.hpFill.y = e.y - e.stats.bh / 2 - 6;
            });
        }
    }

    caveBossSpawnCheck() {
        const s = this.scene;
        if (s.zone !== 'cave' || s.caveBossSpawned || s.caveBossDefeated) return;
        const alive = s.enemies.getChildren().filter(e => e.active);
        if (alive.length <= 2) {
            s.caveBossSpawned = true;
            this.spawnCaveBoss();
        }
    }

    spawnCaveBoss() {
        const s = this.scene;
        const bt = CAVE_BOSS_TYPE;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        s.caveBoss = s.add.sprite(s.caveOffsetX + CAVE_WIDTH / 2, CAVE_HEIGHT - 150, 'giant_bat_walk').setDepth(5);
        s.physics.add.existing(s.caveBoss, false);
        s.caveBoss.body.setSize(bt.bw, bt.bh);
        s.caveBoss.body.setCollideWorldBounds(true);
        s.caveBoss.play('giant_bat_walk_anim');

        s.caveBoss.stats = {
            name: bt.name, hp: hp, maxHp: hp,
            damage: dmg, exp: exp, speed: spd,
            bw: bt.bw, bh: bt.bh,
            dashTimer: 0, dashInterval: bt.dashInterval,
            dashSpeed: bt.dashSpeed, dashDmgMul: bt.dashDmgMul,
            screechTimer: 0, screechCooldown: bt.screechCooldown,
            screechRadius: bt.screechRadius, screechDmgMul: bt.screechDmgMul,
            summonHpThreshold: bt.summonHpThreshold,
            summonCount: bt.summonCount,
            summoned: false, isDashing: false,
            phase: 1,
            aiState: 'chase',
            attackTimer: 3000,
            cooldownTimer: 0,
            currentAttack: null,
            invulnerable: false,
            baseSpeed: spd,
            baseDamage: dmg,
            telegraphTimer: 0,
            attackDuration: 0,
            transitioning: false,
            phaseTriggered: false,
            dashCooldown: 0,
            screechCooldownTimer: 0,
            summonCooldown: 0
        };

        const hw = bt.bw + 20;
        s.caveBoss.hpBg = s.add.rectangle(s.caveOffsetX + CAVE_WIDTH / 2, 100, hw, 5, 0x222222).setOrigin(0.5).setDepth(15).setScrollFactor(0);
        s.caveBoss.hpFill = s.add.rectangle(s.caveOffsetX + CAVE_WIDTH / 2, 100, hw, 5, 0x8e44ad).setOrigin(0.5).setDepth(15).setScrollFactor(0);
        s.caveBossNameText = s.add.text(s.caveOffsetX + CAVE_WIDTH / 2, 85, bt.name, {
            fontSize: '12px', fill: DIFF_COLORS[s.difficulty] || '#bf77f6', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(15).setScrollFactor(0);

        s.caveBossAlive = true;
        s.enemies.add(s.caveBoss);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(s.caveBoss, 'caveBoss');
        }
    }

    updateCaveBoss() {
        const s = this.scene;
        if (!s.caveBossAlive || !s.caveBoss || !s.caveBoss.active) return;
        const b = s.caveBoss;
        const st = b.stats;
        const delta = s.game.loop.delta;

        b.hpBg.x = GAME_WIDTH / 2;
        b.hpBg.y = 100;
        b.hpFill.x = GAME_WIDTH / 2;
        b.hpFill.y = 100;
        b.hpFill.width = b.hpBg.width * (st.hp / st.maxHp);

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.transitioning || st.invulnerable) {
            b.body.setVelocity(0);
            return;
        }

        if (st.isDashing) return;

        const hpPct = st.hp / st.maxHp;
        if (hpPct <= 0.3 && st.phase !== 3) {
            st.phase = 3;
            this._caveBossPhaseTransition(b);
            return;
        } else if (hpPct <= 0.6 && st.phase !== 2) {
            st.phase = 2;
            this._caveBossPhaseTransition(b);
            return;
        }

        if (!st.summoned && st.phase >= 2) {
            st.summoned = true;
            this.caveBossSummon(b);
        }

        if (st.aiState === 'telegraph') {
            b.body.setVelocity(0);
            st.telegraphTimer -= delta;
            if (st.telegraphTimer <= 0) {
                this._caveBossExecuteAttack(b);
            }
            return;
        }

        if (st.aiState === 'attacking') {
            b.body.setVelocity(0);
            st.attackDuration -= delta;
            if (st.attackDuration <= 0) {
                st.aiState = 'cooldown';
                st.cooldownTimer = 800;
                if (b.telegraph) { b.telegraph.destroy(); b.telegraph = null; }
            }
            return;
        }

        if (st.aiState === 'cooldown') {
            b.body.setVelocity(0);
            st.cooldownTimer -= delta;
            if (st.cooldownTimer <= 0) {
                st.aiState = 'chase';
            }
            return;
        }

        st.aiState = 'chase';
        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = st.phase === 3 ? st.baseSpeed * 1.2 : st.baseSpeed;

        if (dist > 50) {
            b.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        st.attackTimer -= delta;
        st.dashCooldown -= delta;
        st.screechCooldownTimer -= delta;
        st.summonCooldown -= delta;

        if (st.attackTimer <= 0) {
            const attack = this._pickCaveBossAttack(st);
            if (attack) {
                this._caveBossTelegraph(b, attack);
            } else {
                st.attackTimer = 800;
            }
        }
    }

    _pickCaveBossAttack(st) {
        const available = [];
        if (st.screechCooldownTimer <= 0) available.push('screech');
        if (st.dashCooldown <= 0) available.push('dash');
        if (st.phase >= 3 && st.summonCooldown <= 0) available.push('summon');
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    _caveBossTelegraph(boss, attackType) {
        const s = this.scene;
        const st = boss.stats;
        st.aiState = 'telegraph';
        st.currentAttack = attackType;
        st.telegraphTimer = 500;
        boss.body.setVelocity(0);

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        if (attackType === 'screech') {
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_circle')
                .setAlpha(0).setDepth(10).setScale(st.screechRadius / 64);
            s.tweens.add({ targets: tg, alpha: 0.8, duration: 200 });
            boss.telegraph = tg;
            st.screechCooldownTimer = st.phase >= 3 ? 5000 : 8000;
        } else if (attackType === 'dash') {
            const dx = s.player.x - boss.x;
            const dy = s.player.y - boss.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const angle = Math.atan2(dy, dx);
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_line')
                .setAlpha(0).setDepth(10).setRotation(angle);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg;
            st.dashCooldown = st.phase >= 3 ? 3000 : 5000;
        } else if (attackType === 'summon') {
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_square')
                .setAlpha(0).setDepth(10).setScale(1.5);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg;
            st.summonCooldown = 12000;
        }
        st.attackTimer = 3000;
    }

    _caveBossExecuteAttack(boss) {
        const st = boss.stats;
        st.aiState = 'attacking';
        st.attackDuration = 400;

        if (st.currentAttack === 'screech') {
            this.caveBossScreech(boss);
        } else if (st.currentAttack === 'dash') {
            this.caveBossDash(boss);
            st.attackDuration = 600;
        } else if (st.currentAttack === 'summon') {
            this.caveBossSummon(boss);
            st.attackDuration = 500;
        }
    }

    _caveBossPhaseTransition(boss) {
        BossAI.phaseTransition(this.scene, boss, 'PHASE 2!', '#bf77f6');
    }

    handleSpace() {
        const s = this.scene;
        if (s.caveBossDefeated && s.caveStairs && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.caveStairs.x, s.caveStairs.y
        ) < 50) {
            s._enterCaveVillage();
        } else {
            s.attack();
        }
    }

    caveBossDash(boss) {
        const s = this.scene;
        const st = boss.stats;
        st.isDashing = true;

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const dashSpeed = st.phase >= 3 ? st.dashSpeed * 1.3 : st.dashSpeed;
        boss.body.setVelocity((dx / dist) * dashSpeed, (dy / dist) * dashSpeed);
        boss.setTint(0x00ffff);
        s.time.delayedCall(400, () => {
            if (boss.active) {
                boss.body.setVelocity(0);
                boss.clearTint();
                st.isDashing = false;
                const pdist = Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y);
                if (pdist < 60) {
                    s.combat.takeDamage(Math.floor(boss.stats.damage * st.dashDmgMul));
                }
            }
        });
    }

    caveBossScreech(boss) {
        const s = this.scene;
        const st = boss.stats;
        const dmgMul = st.phase === 3 ? st.screechDmgMul * 1.5 : st.screechDmgMul;
        const dmg = Math.floor(boss.stats.damage * dmgMul);
        playBossAoE();

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        const ring = s.add.sprite(boss.x, boss.y, 'skeleton_lord_aoe')
            .setAlpha(0.7).setScale(0.2).setDepth(10);
        s.tweens.add({
            targets: ring, scaleX: 2.0, scaleY: 2.0, alpha: 0, duration: 700,
            onComplete: () => ring.destroy()
        });

        s.time.delayedCall(350, () => {
            if (!boss.active) return;
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y);
            if (dist < st.screechRadius) {
                s.combat.takeDamage(dmg);
                s.floatingText(s.player.x, s.player.y - 30, 'SCREECH!', '#e74c3c');
            }
        });
    }

    caveBossSummon(boss) {
        const s = this.scene;
        playBossAoE();
        s.floatingText(boss.x, boss.y - 40, 'SUMMONING!', '#9b59b6');

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        const count = boss.stats.phase >= 3 ? boss.stats.summonCount + 1 : boss.stats.summonCount;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 80;
            const sy = boss.y + Math.sin(angle) * 80;
            this.spawnSmallBat(sx, sy);
        }
    }

    spawnSmallBat(x, y) {
        const s = this.scene;
        const bt = CAVE_SMALL_BAT;
        const e = s.add.sprite(x, y, 'small_bat_walk').setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(bt.bw, bt.bh);
        e.body.setCollideWorldBounds(true);
        e.play('small_bat_walk_anim');

        e.stats = {
            key: bt.key, name: bt.name,
            hp: Math.floor(bt.hp * s.diffMulti.hp),
            maxHp: Math.floor(bt.hp * s.diffMulti.hp),
            damage: Math.floor(bt.dmg * s.diffMulti.dmg),
            exp: Math.floor(bt.exp * s.diffMulti.exp),
            bw: bt.bw, bh: bt.bh
        };

        const hw = bt.bw + 4;
        e.hpBg = s.add.rectangle(x, y - bt.bh / 2 - 6, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - bt.bh / 2 - 6, hw, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        s.caveSmallBats.add(e);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(e, 'small_bat');
        }
    }

    destroyOrphanedCaveStairs() {
        const s = this.scene;
        if (s.caveStairs) { s.caveStairs.destroy(); s.caveStairs = null; }
        if (s.caveStairsHint) { s.caveStairsHint.destroy(); s.caveStairsHint = null; }
        const toRemove = [];
        s.children.list.forEach(child => {
            if (child.texture && child.texture.key === 'cave_stairs') toRemove.push(child);
        });
        toRemove.forEach(st => st.destroy());
    }
}
