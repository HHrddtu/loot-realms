import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT, FOREST_HEIGHT,
    MINE_ENEMY_TYPES, MINE_ENEMY_COUNT, MINE_BOSS_TYPE,
    MINE_ROCK_COUNT, MINE_CRYSTAL_COUNT,
    MINE_EXIT_POS, MINE_RETURN_POS, MINE_BOSS_PORTAL_POS,
    MINE_CHEST_COUNT, MINE_CHEST_DROP_CHANCE,
    ARENA_EXIT_POS, DIFF_MULT
} from '../config/index.js';
import { rollZoneEquip, rollZoneMaterial } from '../utils.js';
import { startMusic, playPortal, playBossAoE } from '../sound.js';

export class MineZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup() {
        const s = this.scene;
        s.cameras.main.setBackgroundColor('#0a0a0a');
        s.physics.world.setBounds(0, 0, GAME_WIDTH, FOREST_HEIGHT);
        s.cameras.main.setBounds(0, 0, GAME_WIDTH, FOREST_HEIGHT);

        s.mineBg = s.add.tileSprite(0, 0, GAME_WIDTH, FOREST_HEIGHT, 'mine_ground')
            .setOrigin(0, 0).setScale(1, FOREST_HEIGHT / 200).setDepth(0);

        s.mineRails = s.add.tileSprite(0, 0, GAME_WIDTH, FOREST_HEIGHT, 'mine_rails')
            .setOrigin(0, 0).setDepth(1).setAlpha(0.4);

        s.exitLadder = s.add.sprite(MINE_EXIT_POS.x, MINE_EXIT_POS.y, 'mine_ladder').setDepth(1);
        s.exitHint = s.add.text(MINE_EXIT_POS.x, MINE_EXIT_POS.y + 40, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.mineBossPortal = s.add.sprite(MINE_BOSS_PORTAL_POS.x, MINE_BOSS_PORTAL_POS.y, 'mine_boss_portal').setDepth(2);
        s.mineBossPortalHint = s.add.text(MINE_BOSS_PORTAL_POS.x, MINE_BOSS_PORTAL_POS.y + 44, '', {
            fontSize: '11px', fill: '#bf77f6', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.player.x = MINE_RETURN_POS.x;
        s.player.y = MINE_RETURN_POS.y;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(100, 80);

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();
        s.mineRocks = s.physics.add.group();
        s.mineCrystals = s.physics.add.group();
        s.mineChests = s.physics.add.group();

        this.spawnMineEnemies();
        this.spawnMineRocks();
        this.spawnMineCrystals();
        this.spawnMineChests();
        this.spawnMineTorches();
        this.spawnMineDecor();
        this.spawnMineCart();

        s.mineDarkness = s.add.image(400, 300, 'mine_darkness').setDepth(13).setAlpha(0.9).setScrollFactor(0);

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.mineBossDefeated = false;
        s.mineBossAlive = false;

        s.zone = 'mine';
        s.npc.spawnNPCs();
        s.hintText.setText('Q=quests | I=inventory | TAB=stats | T=talents | P=pause');
        startMusic();
        if (s.particles) {
            s.particles.startMineDust(GAME_WIDTH, FOREST_HEIGHT);
            s.particles.startCandleGlow(200, 300);
            s.particles.startCandleGlow(600, 500);
            s.particles.startCandleGlow(400, 800);
        }
    }

    clear() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        if (s.fireballs) {
            s.fireballs.forEach(fb => { if (fb.glow) fb.glow.destroy(); fb.destroy(); });
            s.fireballs = [];
        }
        if (s.enemyProjectiles) {
            s.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.enemyProjectiles = [];
        }
        if (s.shieldActive) {
            s.shieldActive = false;
            s.shieldHP = 0;
            if (s.shieldVfx) { s.shieldVfx.destroy(); s.shieldVfx = null; }
        }
        if (s.enemies && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
        if (s.stumps && s.stumps.getLength && s.stumps.getLength() > 0) {
            s.stumps.getChildren().forEach(st => {
                if (st.hpBg) st.hpBg.destroy();
                if (st.hpFill) st.hpFill.destroy();
            });
            s.stumps.clear(true, true);
        }
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
        if (s.mineRocks && s.mineRocks.getLength && s.mineRocks.getLength() > 0) {
            s.mineRocks.clear(true, true);
        }
        if (s.mineRocks) { s.mineRocks.destroy(); s.mineRocks = null; }
        if (s.mineCrystals && s.mineCrystals.getLength && s.mineCrystals.getLength() > 0) {
            s.mineCrystals.getChildren().forEach(cr => s.tweens.killTweensOf(cr));
            s.mineCrystals.clear(true, true);
        }
        if (s.mineCrystals) { s.mineCrystals.destroy(); s.mineCrystals = null; }
        if (s.mineChests && s.mineChests.getLength && s.mineChests.getLength() > 0) {
            s.mineChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.mineChests.clear(true, true);
        }
        if (s.mineChests) { s.mineChests.destroy(); s.mineChests = null; }
        if (s.mineCart) {
            if (s.mineCart.cartTriggerZone) { s.mineCart.cartTriggerZone.destroy(); s.mineCart.cartTriggerZone = null; }
            s.mineCart.destroy();
            s.mineCart = null;
        }
        if (s.mineBg) { s.mineBg.destroy(); s.mineBg = null; }
        if (s.mineRails) { s.mineRails.destroy(); s.mineRails = null; }
        if (s.exitLadder) { s.exitLadder.destroy(); s.exitLadder = null; }
        if (s.exitHint) { s.exitHint.destroy(); s.exitHint = null; }
        if (s.mineBossPortal) { s.mineBossPortal.destroy(); s.mineBossPortal = null; }
        if (s.mineBossPortalHint) { s.mineBossPortalHint.destroy(); s.mineBossPortalHint = null; }
        if (s.mineTorches) {
            s.mineTorches.forEach(t => {
                if (t.torch) t.torch.destroy();
                if (t.glow) t.glow.destroy();
            });
            s.mineTorches = null;
        }
        if (s.mineDarkness) { s.mineDarkness.destroy(); s.mineDarkness = null; }
        if (s.mineDecor) {
            s.mineDecor.forEach(d => d.destroy());
            s.mineDecor = null;
        }
        if (s.mineBoss) {
            if (s.mineBoss.hpBg) s.mineBoss.hpBg.destroy();
            if (s.mineBoss.hpFill) s.mineBoss.hpFill.destroy();
            if (s.mineBossNameText) s.mineBossNameText.destroy();
            if (s.mineBoss.aoeRing) { s.mineBoss.aoeRing.destroy(); s.mineBoss.aoeRing = null; }
            if (s.mineBoss.aoeRing2) { s.mineBoss.aoeRing2.destroy(); s.mineBoss.aoeRing2 = null; }
            s.mineBoss.destroy();
            s.mineBoss = null;
        }
        if (s.mineBossTimer) { s.mineBossTimer.destroy(); s.mineBossTimer = null; }
    }

    update(time, delta) {
        const s = this.scene;
        if (s.zone === 'mine') {
            this.checkMineExitProximity();
            this.updateMineCart();
        } else if (s.zone === 'mine_boss') {
            this.checkMineBossArenaExitProximity();
            this.updateMineBoss();
        }
    }

    spawnMineEnemies() {
        for (let i = 0; i < MINE_ENEMY_COUNT; i++) {
            const t = MINE_ENEMY_TYPES[i % MINE_ENEMY_TYPES.length];
            this.makeMineEnemy(t, 80 + Math.random() * 640, 200 + Math.random() * 500);
        }
    }

    makeMineEnemy(t, x, y) {
        const s = this.scene;
        const e = s.add.sprite(x, y, t.key).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);

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
        return e;
    }

    spawnMineRocks() {
        const s = this.scene;
        for (let i = 0; i < MINE_ROCK_COUNT; i++) {
            const r = s.add.sprite(60 + Math.random() * 680, 150 + Math.random() * 550, 'mine_rock').setDepth(4);
            s.physics.add.existing(r, false);
            r.body.setSize(28, 22);
            r.body.setImmovable(true);
            s.mineRocks.add(r);
        }
    }

    spawnMineCrystals() {
        const s = this.scene;
        for (let i = 0; i < MINE_CRYSTAL_COUNT; i++) {
            const cr = s.add.sprite(60 + Math.random() * 680, 150 + Math.random() * 550, 'mine_crystal').setDepth(3);
            cr.setAlpha(0.6 + Math.random() * 0.4);
            s.tweens.add({
                targets: cr, alpha: 0.3, duration: 1500 + Math.random() * 2000,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
            });
            s.mineCrystals.add(cr);
        }
    }

    spawnMineChests() {
        for (let i = 0; i < MINE_CHEST_COUNT; i++) {
            const cx = 100 + Math.random() * 600;
            const cy = 250 + Math.random() * 400;
            this.createMineChest(cx, cy);
        }
    }

    createMineChest(x, y) {
        const s = this.scene;
        const ch = s.add.sprite(x, y, 'mine_chest').setDepth(6);
        s.physics.add.existing(ch, false);
        ch.body.setSize(24, 18);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 50, maxHp: 50 };
        ch.hpBg = s.add.rectangle(x, y - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = s.add.rectangle(x, y - 18, 28, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            if (Math.random() < MINE_CHEST_DROP_CHANCE) {
                ch.loot.push(rollZoneEquip('mine'));
            }
        }
        ch.hintText = s.add.text(x, y - 22, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        s.mineChests.add(ch);
        return ch;
    }

    spawnMineTorches() {
        const s = this.scene;
        s.mineTorches = [];
        const positions = [
            { x: 80, y: 200 }, { x: 720, y: 200 },
            { x: 80, y: 400 }, { x: 720, y: 400 },
            { x: 80, y: 600 }, { x: 720, y: 600 },
            { x: 400, y: 300 }, { x: 200, y: 500 },
            { x: 600, y: 500 }, { x: 400, y: 700 }
        ];
        positions.forEach(p => {
            const torch = s.add.sprite(p.x, p.y, 'torch').setDepth(14);
            const glow = s.add.image(p.x, p.y - 4, 'torch_glow').setDepth(2).setAlpha(0.8);
            s.tweens.add({
                targets: [torch, glow],
                alpha: { from: 0.7, to: 1 },
                duration: 400 + Math.random() * 300,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: Math.random() * 500
            });
            s.tweens.add({
                targets: glow,
                scaleX: { from: 0.9, to: 1.15 },
                scaleY: { from: 0.9, to: 1.15 },
                duration: 600 + Math.random() * 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                delay: Math.random() * 300
            });
            s.mineTorches.push({ torch, glow });
        });
    }

    spawnMineDecor() {
        const s = this.scene;
        s.mineDecor = [];
        const decorTypes = [
            { key: 'mine_barrel', count: 5 },
            { key: 'mine_crate', count: 4 },
            { key: 'mine_sign', count: 3 },
            { key: 'mine_skull', count: 4 },
            { key: 'mine_ore_vein', count: 6 },
            { key: 'mine_bucket', count: 3 },
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
                    s.tweens.add({
                        targets: d, alpha: 0.3, duration: 2000 + Math.random() * 2000,
                        yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
                    });
                }
                s.mineDecor.push(d);
            }
        });
    }

    spawnMineCart() {
        const s = this.scene;
        if (s.mineCart) { s.mineCart.destroy(); s.mineCart = null; }

        const path = [
            { x: 100, y: 100 },
            { x: 700, y: 100 },
            { x: 700, y: 500 },
            { x: 100, y: 500 },
            { x: 100, y: 100 }
        ];

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
            if (!cart.cartActive && cart.cartCooldown <= 0) {
                cart.cartActive = true;
                cart.cartIdx = 0;
            }
        }, null, s);

        s.mineCart = cart;
    }

    updateMineCart() {
        const s = this.scene;
        const cart = s.mineCart;
        if (!cart || !cart.cartActive) {
            if (cart && cart.cartCooldown > 0) cart.cartCooldown -= s.game.loop.delta;
            return;
        }

        const target = cart.cartPath[cart.cartIdx];
        if (!target) { cart.cartActive = false; return; }

        const dx = target.x - cart.x;
        const dy = target.y - cart.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
            cart.cartIdx++;
            if (cart.cartIdx >= cart.cartPath.length) {
                cart.cartActive = false;
                cart.cartCooldown = 5000;
                cart.body.setVelocity(0, 0);
                return;
            }
        } else {
            const speed = cart.cartSpeed;
            cart.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        }

        if (s.enemies) {
            s.enemies.getChildren().forEach(e => {
                if (e.active && e.stats) {
                    const d = Phaser.Math.Distance.Between(cart.x, cart.y, e.x, e.y);
                    if (d < 30) {
                        const knockX = (e.x - cart.x) / d * 200;
                        const knockY = (e.y - cart.y) / d * 200;
                        e.body.setVelocity(knockX, knockY);
                        s.time.delayedCall(200, () => { if (e.body) e.body.setVelocity(0, 0); });
                        s.combat.hitEnemy(e, 25);
                    }
                }
            });
        }

        const pd = Phaser.Math.Distance.Between(cart.x, cart.y, s.player.x, s.player.y);
        if (pd < 25 && !s.menuOpen && !s.transitioning) {
            s.combat.takeDamage(15);
            const knockDir = s.player.x < cart.x ? -1 : 1;
            s.player.body.setVelocity(knockDir * 200, -150);
        }
    }

    checkMineExitProximity() {
        const s = this.scene;
        if (s.zone !== 'mine' || s.transitioning || s.menuOpen) return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, MINE_EXIT_POS.x, MINE_EXIT_POS.y
        );
        if (dist < 50) {
            s.exitHint.setText('SPACE to exit');
        } else {
            s.exitHint.setText('');
        }

        if (s.mineBossPortal && !s.mineBossDefeated) {
            const bdist = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, MINE_BOSS_PORTAL_POS.x, MINE_BOSS_PORTAL_POS.y
            );
            if (bdist < 50) {
                s.mineBossPortalHint.setText('SPACE to enter boss room');
            } else {
                s.mineBossPortalHint.setText('');
            }
        } else if (s.mineBossPortalHint) {
            s.mineBossPortalHint.setText('');
        }

        if (s.mineChests) {
            s.mineChests.getChildren().forEach(ch => {
                if (!ch.active || ch.broken) return;
                const cdist = Phaser.Math.Distance.Between(
                    s.player.x, s.player.y, ch.x, ch.y
                );
                if (cdist < 55) {
                    ch.hintText.setText('Attack!');
                } else {
                    ch.hintText.setText('');
                }
            });
        }
    }

    exitMine() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'mine') return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, MINE_EXIT_POS.x, MINE_EXIT_POS.y
        );
        if (dist >= 50) return;

        s.transitioning = true;
        s.exitHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(500, 0, 0, 0);
        s.time.delayedCall(500, () => {
            this.clear();
            s._setupZone('forest');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    enterMineBossArena() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'mine') return;
        if (s.mineBossDefeated) return;

        s.transitioning = true;
        s.mineBossPortalHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(500, 0, 0, 0);
        s.time.delayedCall(500, () => {
            this.clear();
            this.setupBossArena();
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    setupBossArena() {
        const s = this.scene;
        s.cameras.main.setBackgroundColor('#0a0510');
        s.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
        s.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);

        s.add.image(400, 300, 'boss_ground').setDepth(0);

        s.mineArenaExit = s.add.sprite(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y, 'mine_ladder').setDepth(1);
        s.mineArenaExitHint = s.add.text(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y + 50, '', {
            fontSize: '11px', fill: '#bf77f6', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.player.x = 400;
        s.player.y = 500;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.stopFollow();

        s.mineBossDefeated = false;
        s.mineBossAlive = false;

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();
        this.spawnMineBoss();

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'mine_boss';
        s.hintText.setText('Defeat the Skeleton Lord! | I=inventory | TAB=stats | P=pause');
        startMusic();
    }

    clearBossArena() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        if (s.mineBoss) {
            if (s.mineBoss.hpBg) s.mineBoss.hpBg.destroy();
            if (s.mineBoss.hpFill) s.mineBoss.hpFill.destroy();
            if (s.mineBossNameText) s.mineBossNameText.destroy();
            if (s.mineBoss.aoeRing) { s.mineBoss.aoeRing.destroy(); s.mineBoss.aoeRing = null; }
            if (s.mineBoss.aoeRing2) { s.mineBoss.aoeRing2.destroy(); s.mineBoss.aoeRing2 = null; }
            s.mineBoss.destroy();
            s.mineBoss = null;
        }
        if (s.bossTimer) { s.bossTimer.destroy(); s.bossTimer = null; }
        if (s.defeatedText) { s.defeatedText.destroy(); s.defeatedText = null; }
        if (s.defeatedLoot) {
            s.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.defeatedLoot = null;
        }
        if (s.enemies && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
        if (s.stumps && s.stumps.getLength && s.stumps.getLength() > 0) s.stumps.clear(true, true);
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
        if (s.mineArenaExit) { s.mineArenaExit.destroy(); s.mineArenaExit = null; }
        if (s.mineArenaExitHint) { s.mineArenaExitHint.destroy(); s.mineArenaExitHint = null; }
        s.mineBossAlive = false;
    }

    exitMineBossArena() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'mine_boss') return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ARENA_EXIT_POS.x, ARENA_EXIT_POS.y
        );
        if (dist >= 50) return;

        s.transitioning = true;
        if (s.mineArenaExitHint) s.mineArenaExitHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(500, 0, 0, 0);
        s.time.delayedCall(500, () => {
            this.clearBossArena();
            this.setup();
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    checkMineBossArenaExitProximity() {
        const s = this.scene;
        if (s.zone !== 'mine_boss' || s.transitioning || s.menuOpen) return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ARENA_EXIT_POS.x, ARENA_EXIT_POS.y
        );
        if (dist < 50) {
            if (s.mineArenaExitHint) s.mineArenaExitHint.setText('SPACE to exit');
        } else {
            if (s.mineArenaExitHint) s.mineArenaExitHint.setText('');
        }
    }

    spawnMineBoss() {
        const s = this.scene;
        const bt = MINE_BOSS_TYPE;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        s.mineBoss = s.add.sprite(400, 200, 'skeleton_lord_walk').setDepth(5);
        s.physics.add.existing(s.mineBoss, false);
        s.mineBoss.body.setSize(bt.bw, bt.bh);
        s.mineBoss.body.setCollideWorldBounds(true);
        s.mineBoss.play('skeleton_lord_walk');

        s.mineBoss.stats = {
            name: bt.name,
            hp: hp, maxHp: hp,
            damage: dmg, exp: exp,
            speed: spd,
            bw: bt.bw, bh: bt.bh,
            aoeTimer: 0, aoeInterval: bt.aoeInterval,
            aoeDmgMul: bt.aoeDmgMul, aoeRadius: bt.aoeRadius
        };

        const hw = bt.bw + 20;
        s.mineBoss.hpBg = s.add.rectangle(400, 100, hw, 5, 0x333333).setOrigin(0.5).setDepth(15);
        s.mineBoss.hpFill = s.add.rectangle(400, 100, hw, 5, 0x9b59b6).setOrigin(0.5).setDepth(15);

        s.mineBossNameText = s.add.text(400, 85, bt.name, {
            fontSize: '12px', fill: '#bf77f6', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(15);

        s.mineBossAlive = true;
        s.enemies.add(s.mineBoss);
    }

    updateMineBoss() {
        const s = this.scene;
        if (!s.mineBossAlive || !s.mineBoss || !s.mineBoss.active) return;
        const b = s.mineBoss;
        const st = b.stats;

        b.hpBg.x = 400;
        b.hpBg.y = 100;
        b.hpFill.x = 400;
        b.hpFill.y = 100;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (!b.anims.isPlaying || b.anims.currentAnim.key !== 'skeleton_lord_walk') {
                b.play('skeleton_lord_walk');
            }
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
            b.stop();
            b.setFrame(0);
        }

        st.aoeTimer += s.game.loop.delta;
        if (st.aoeTimer >= st.aoeInterval) {
            st.aoeTimer = 0;
            this.mineBossAoE(b);
        }
    }

    mineBossAoE(boss) {
        const s = this.scene;
        const aoeDmg = Math.floor(boss.stats.damage * boss.stats.aoeDmgMul);
        const radius = boss.stats.aoeRadius;
        playBossAoE();

        const ring = s.add.sprite(boss.x, boss.y, 'skeleton_lord_aoe')
            .setAlpha(0.9)
            .setScale(0.3);
        s.tweens.add({
            targets: ring, scaleX: 1.8, scaleY: 1.8, alpha: 0, duration: 600,
            onComplete: () => ring.destroy()
        });

        const ring2 = s.add.sprite(boss.x, boss.y, 'skeleton_lord_aoe')
            .setAlpha(0.5)
            .setScale(0.1);
        s.tweens.add({
            targets: ring2, scaleX: 1.2, scaleY: 1.2, alpha: 0, duration: 500, delay: 100,
            onComplete: () => ring2.destroy()
        });

        s.time.delayedCall(350, () => {
            const dist = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, boss.x, boss.y
            );
            if (dist < radius) {
                s.combat.takeDamage(aoeDmg);
                const pushX = s.player.x - boss.x;
                const pushY = s.player.y - boss.y;
                const pushDist = Math.sqrt(pushX * pushX + pushY * pushY) || 1;
                s.player.x += (pushX / pushDist) * 45;
                s.player.y += (pushY / pushDist) * 45;
            }
        });
    }
}
