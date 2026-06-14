import Phaser from 'phaser';
import {
    CASTLE_WIDTH, CASTLE_ROOM_HEIGHT, CASTLE_TOTAL_HEIGHT, CASTLE_ROOMS, CASTLE_ATTIC_INDEX,
    CASTLE_CHEST_POSITIONS, CASTLE_VILLAGER_POSITIONS, CASTLE_SPAWN_POS,
    BANDIT_TYPES, BANDIT_LEADER_BOSS, CASTLE_CHEST_COUNT, CASTLE_CHEST_DROP_CHANCE,
    CASTLE_KEY, GAME_WIDTH, GAME_HEIGHT, RARITY_COLORS,
    VILLAGE_WIDTH, VILLAGE_HEIGHT
} from '../config/index.js';
import { rollEquip } from '../utils.js';
import { playLoot, playBossAoE, playBossDeath, playPortal, startMusic } from '../sound.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';

export class CastleZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup(roomIndex = 0) {
        this.scene._destroyOrphanedCaveStairs();
        this.scene.cameras.main.setBackgroundColor('#2c2c2c');
        this.scene.physics.world.setBounds(0, 0, CASTLE_WIDTH, CASTLE_ROOM_HEIGHT);
        this.scene.cameras.main.setBounds(0, 0, CASTLE_WIDTH, CASTLE_ROOM_HEIGHT);
        this.scene.castleOffsetX = 0;
        this.scene.castleOffsetY = 0;

        this.scene.player.x = CASTLE_SPAWN_POS.x;
        this.scene.player.y = CASTLE_SPAWN_POS.y;
        this.scene.player.body.setCollideWorldBounds(true);
        this.scene.cameras.main.startFollow(this.scene.player, true, 0.08, 0.08);
        this.scene.cameras.main.setDeadzone(50, 40);

        this.scene.enemies = this.scene.physics.add.group();
        this.scene.villageChests = this.scene.physics.add.group();

        this.scene.castleRoom = roomIndex;
        this.scene.castleBossAlive = false;
        this.scene.castleBossDefeated = false;
        this.scene.castleBossSpawned = false;
        this.scene.castleKeyObtained = false;
        this.scene.castleAtticUnlocked = false;
        this.scene.castleRescued = false;
        this.scene.castleFloorCleared = false;
        this.scene.castleStairsUp = null;
        this.scene.castleStairsUpHint = null;
        this.scene.castleBossDoor = null;
        this.scene.castleBossDoorHint = null;

        this._drawRoom(roomIndex);
        this._spawnRoomContent(roomIndex);

        this.scene.physics.add.overlap(this.scene.player, this.scene.enemies, (p, e) => {
            if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(e.stats.damage);
            }
        }, null, this.scene);

        this.scene.zone = 'castle';
        this.scene.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | Q/W/E=spells');
        startMusic();
    }

    clear() {
        this.scene.physics.world.colliders.destroy();
        if (this.scene.fireballs) {
            this.scene.fireballs.forEach(fb => { if (fb.glow) fb.glow.destroy(); fb.destroy(); });
            this.scene.fireballs = [];
        }
        if (this.scene.enemyProjectiles) {
            this.scene.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            this.scene.enemyProjectiles = [];
        }
        if (this.scene.shieldActive) {
            this.scene.shieldActive = false;
            this.scene.shieldHP = 0;
            if (this.scene.shieldVfx) { this.scene.shieldVfx.destroy(); this.scene.shieldVfx = null; }
        }
        if (this.scene.enemies && this.scene.enemies.getLength && this.scene.enemies.getLength() > 0) {
            this.scene.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
                if (e.nameText) e.nameText.destroy();
            });
            this.scene.enemies.clear(true, true);
        }
        if (this.scene.enemies) { this.scene.enemies.destroy(); this.scene.enemies = null; }
        if (this.scene.villageChests && this.scene.villageChests.getLength && this.scene.villageChests.getLength() > 0) {
            this.scene.villageChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            this.scene.villageChests.clear(true, true);
        }
        if (this.scene.villageChests) { this.scene.villageChests.destroy(); this.scene.villageChests = null; }
        if (this.scene.castleDecor) {
            this.scene.castleDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
            this.scene.castleDecor = null;
        }
        if (this.scene.castleBg) { this.scene.castleBg.destroy(); this.scene.castleBg = null; }
        if (this.scene.castleAtticDoor) { if (this.scene.castleAtticDoor.destroy) this.scene.castleAtticDoor.destroy(); this.scene.castleAtticDoor = null; }
        if (this.scene.castleAtticHint) { if (this.scene.castleAtticHint.destroy) this.scene.castleAtticHint.destroy(); this.scene.castleAtticHint = null; }
        if (this.scene.castleStairsUp) { if (this.scene.castleStairsUp.destroy) this.scene.castleStairsUp.destroy(); this.scene.castleStairsUp = null; }
        if (this.scene.castleStairsUpHint) { if (this.scene.castleStairsUpHint.destroy) this.scene.castleStairsUpHint.destroy(); this.scene.castleStairsUpHint = null; }
        if (this.scene.castleBossDoor) { if (this.scene.castleBossDoor.destroy) this.scene.castleBossDoor.destroy(); this.scene.castleBossDoor = null; }
        if (this.scene.castleBossDoorHint) { if (this.scene.castleBossDoorHint.destroy) this.scene.castleBossDoorHint.destroy(); this.scene.castleBossDoorHint = null; }
        if (this.scene.castleBoss) {
            if (this.scene.castleBoss.hpBg) this.scene.castleBoss.hpBg.destroy();
            if (this.scene.castleBoss.hpFill) this.scene.castleBoss.hpFill.destroy();
            if (this.scene.castleBossNameText) this.scene.castleBossNameText.destroy();
            this.scene.castleBoss.destroy();
            this.scene.castleBoss = null;
        }
        if (this.scene.castleVillagers) {
            this.scene.castleVillagers.forEach(v => { if (v && v.destroy) v.destroy(); });
            this.scene.castleVillagers = null;
        }
        if (this.scene.castleElder) { if (this.scene.castleElder.destroy) this.scene.castleElder.destroy(); this.scene.castleElder = null; }
        if (this.scene.castleElderHint) { if (this.scene.castleElderHint.destroy) this.scene.castleElderHint.destroy(); this.scene.castleElderHint = null; }
        if (this.scene.defeatedText) { this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        if (this.scene.defeatedLoot) {
            this.scene.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            this.scene.defeatedLoot = null;
        }
    }

    update(time, delta) {
        if (this.scene.zone !== 'castle' || this.scene.menuOpen || this.scene.transitioning) return;
        this._updateBandits();
        this._updateBoss();
        this._updateChestHints();
        this._updateStairsUpHint();
        this._updateBossDoorHint();
        this._updateAtticHint();
    }

    handleSpace() {
        if (this.scene.transitioning || this.scene.menuOpen) return;

        if (this.scene.villageChests) {
            const chests = this.scene.villageChests.getChildren();
            for (let i = 0; i < chests.length; i++) {
                const ch = chests[i];
                if (!ch.active || ch.broken) continue;
                const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, ch.x, ch.y);
                if (dist < 50) { this._openChest(ch); return; }
            }
        }

        if (this.scene.castleStairsUp) {
            const su = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.castleStairsUp.x, this.scene.castleStairsUp.y);
            if (su < 50 && this.scene.castleFloorCleared) { this.goUp(); return; }
        }

        if (this.scene.castleBossDoor && this.scene.castleBossDefeated && this.scene.castleAtticUnlocked) {
            const bd = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.castleBossDoor.x, this.scene.castleBossDoor.y);
            if (bd < 50) { this._enterAttic(); return; }
        }

        if (this.scene.castleAtticDoor && !this.scene.castleAtticUnlocked) {
            const ad = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.castleAtticDoor.x, this.scene.castleAtticDoor.y);
            if (ad < 50) { this._unlockAttic(); return; }
        }

        if (this.scene.castleRoom === CASTLE_ATTIC_INDEX && this.scene.castleElder) {
            const ed = Phaser.Math.Distance.Between(
                this.scene.player.x, this.scene.player.y,
                this.scene.castleElder.x, this.scene.castleElder.y
            );
            if (ed < 60) { this._talkToElder(); return; }
        }

        if (!this.scene.castleBossDefeated && this.scene.castleRoom === CASTLE_ROOMS - 1) {
            this.scene.attack();
        } else if (this.scene.enemies && this.scene.enemies.getLength() > 0) {
            this.scene.attack();
        } else {
            this.scene.attack();
        }
    }

    _openChest(ch) {
        ch.broken = true;
        ch.setAlpha(0.3);
        if (ch.hpBg) ch.hpBg.setAlpha(0);
        if (ch.hpFill) ch.hpFill.setAlpha(0);
        if (ch.hintText) ch.hintText.setText('');

        if (ch.loot && ch.loot.length > 0) {
            ch.loot.forEach(item => {
                this.scene.equipBag.push(item);
                this.scene.floatingText(ch.x, ch.y - 20, `${item.name} (${item.rarity})`, '#f1c40f');
            });
        } else {
            const gold = Math.floor(Math.random() * 20) + 5;
            this.scene.gold = (this.scene.gold || 0) + gold;
            this.scene.floatingText(ch.x, ch.y - 20, `+${gold} gold`, '#f1c40f');
        }
        playLoot();
    }

    /* ===== ROOM DRAWING ===== */

    _drawRoom(roomIndex) {
        this.scene.castleBg = this.scene.add.tileSprite(0, 0, CASTLE_WIDTH, CASTLE_ROOM_HEIGHT, 'castle_ground')
            .setOrigin(0, 0).setDepth(0);
        this.scene.castleDecor = [];

        if (roomIndex < CASTLE_ROOMS) {
            this._drawWalls();
            if (roomIndex === CASTLE_ROOMS - 1) this._drawBossDoor();
        } else if (roomIndex === CASTLE_ATTIC_INDEX) {
            this._drawAttic();
        }
    }

    _drawWalls() {
        const wallColor = 0x555555;
        const leftWall = this.scene.add.rectangle(0, 0, 20, CASTLE_ROOM_HEIGHT, wallColor).setOrigin(0, 0).setDepth(1);
        const rightWall = this.scene.add.rectangle(CASTLE_WIDTH - 20, 0, 20, CASTLE_ROOM_HEIGHT, wallColor).setOrigin(0, 0).setDepth(1);
        const topWall = this.scene.add.rectangle(0, 0, CASTLE_WIDTH, 20, wallColor).setOrigin(0, 0).setDepth(1);
        const bottomWall = this.scene.add.rectangle(0, CASTLE_ROOM_HEIGHT - 20, CASTLE_WIDTH, 20, wallColor).setOrigin(0, 0).setDepth(1);
        this.scene.castleDecor.push(leftWall, rightWall, topWall, bottomWall);

        for (let i = 0; i < 6; i++) {
            const bx = 40 + (i * ((CASTLE_WIDTH - 80) / 5));
            const brick = this.scene.add.rectangle(bx, 10, 40, 18, 0x666666, 0.3).setOrigin(0.5).setDepth(1);
            this.scene.castleDecor.push(brick);
        }
    }

    _drawStairsUp() {
        const x = CASTLE_WIDTH / 2;
        const y = 30;
        const stairs = this.scene.add.image(x, y, 'castle_stairs').setDepth(3);
        this.scene.physics.add.existing(stairs, true);
        stairs.body.setSize(40, 20);
        this.scene.castleStairsUp = stairs;
        this.scene.castleStairsUpHint = this.scene.add.text(x, y + 15, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _drawBossDoor() {
        const x = CASTLE_WIDTH / 2;
        const y = 50;
        const door = this.scene.add.image(x, y, 'castle_door').setDepth(3);
        this.scene.physics.add.existing(door, true);
        door.body.setSize(40, 50);
        this.scene.castleBossDoor = door;
        this.scene.castleBossDoorHint = this.scene.add.text(x, y + 35, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _drawAttic() {
        const bars = this.scene.add.image(CASTLE_WIDTH / 2, CASTLE_ROOM_HEIGHT / 2, 'castle_bars').setDepth(3).setScale(5, 5);
        if (!this.scene.castleDecor) this.scene.castleDecor = [];
        this.scene.castleDecor.push(bars);
    }

    /* ===== ROOM CONTENT ===== */

    _spawnRoomContent(roomIndex) {
        if (roomIndex < CASTLE_ROOMS) {
            this._spawnBandits(roomIndex);
            this._spawnRoomChests(roomIndex);
            if (roomIndex === CASTLE_ROOMS - 1) this._spawnAtticDoor();
        } else if (roomIndex === CASTLE_ATTIC_INDEX) {
            this._spawnVillagers();
        }
    }

    _spawnAtticDoor() {
        if (this.scene.castleAtticUnlocked) return;
        const doorX = CASTLE_WIDTH / 2;
        const doorY = 60;
        this.scene.castleAtticDoor = this.scene.add.rectangle(doorX, doorY, 50, 16, 0x7f8c8d, 0.8).setDepth(6);
        this.scene.physics.add.existing(this.scene.castleAtticDoor, true);
        this.scene.castleAtticHint = this.scene.add.text(doorX, doorY - 20, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _spawnBandits(roomIndex) {
        if (roomIndex === CASTLE_ROOMS - 1) {
            this._spawnBoss();
            return;
        }
        const configs = this._getBanditConfigForRoom(roomIndex);
        configs.forEach(cfg => {
            const x = 60 + Math.random() * (CASTLE_WIDTH - 120);
            const y = 80 + Math.random() * (CASTLE_ROOM_HEIGHT - 160);
            this._makeBandit(cfg, x, y, roomIndex);
        });
    }

    _getBanditConfigForRoom(roomIndex) {
        if (roomIndex === 0) {
            return [
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee }
            ];
        } else if (roomIndex <= 2) {
            return [
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee }
            ];
        } else if (roomIndex <= 4) {
            return [
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.ranger },
                { ...BANDIT_TYPES.ranger }
            ];
        } else {
            return [
                { ...BANDIT_TYPES.elite },
                { ...BANDIT_TYPES.elite },
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.ranger }
            ];
        }
    }

    _makeBandit(t, x, y) {
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * this.scene.diffMulti.hp),
            maxHp: Math.floor(t.hp * this.scene.diffMulti.hp),
            damage: Math.floor(t.dmg * this.scene.diffMulti.dmg),
            exp: Math.floor(t.exp * this.scene.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            wTimer: 0, wDir: 0,
            rangedTimer: 0, rangedInterval: t.role === 'ranger' ? 1800 : 2000
        };

        const hw = t.bw + 4;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xc0392b).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        return e;
    }

    _spawnRoomChests(roomIndex) {
        CASTLE_CHEST_POSITIONS.forEach(cp => {
            if (cp.room === roomIndex) {
                this._createChest(cp.x, cp.y);
            }
        });
    }

    _createChest(x, y) {
        const ch = this.scene.add.sprite(x, y, 'village_barrel').setDepth(6);
        this.scene.physics.add.existing(ch, false);
        ch.body.setSize(18, 22);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 60, maxHp: 60 };
        ch.hpBg = this.scene.add.rectangle(x, y - 16, 22, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = this.scene.add.rectangle(x, y - 16, 22, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        if (Math.random() < CASTLE_CHEST_DROP_CHANCE) {
            ch.loot.push(rollEquip());
        }
        ch.hintText = this.scene.add.text(x, y - 20, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        this.scene.villageChests.add(ch);
        return ch;
    }

    /* ===== BANDIT AI ===== */

    _updateBandits() {
        if (!this.scene.enemies) return;
        const delta = this.scene.game.loop.delta;

        this.scene.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            if (e.stats.isBoss) return;

            const dx = this.scene.player.x - e.x;
            const dy = this.scene.player.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (e.stats.role === 'ranger') {
                e.body.setVelocity(0);
                if (dist < 200 && dist > 40) {
                    e.setFlipX(dx < 0);
                    e.stats.rangedTimer += delta;
                    if (e.stats.rangedTimer >= e.stats.rangedInterval) {
                        e.stats.rangedTimer = 0;
                        this._fireBanditArrow(e, dx, dy);
                    }
                }
            } else {
                const chaseRange = e.stats.role === 'elite' ? 280 : 220;
                const stopRange = 20;
                if (dist < chaseRange && dist > stopRange) {
                    const spd = e.stats.role === 'elite' ? 90 : 65;
                    e.body.setVelocity((dx / dist) * spd, (dy / dist) * spd);
                    e.setFlipX(dx < 0);
                    if (e.walkAnimKey && this.scene.anims.exists(e.walkAnimKey)) {
                        if (!e.anims.isPlaying || e.anims.currentAnim.key !== e.walkAnimKey) {
                            e.play(e.walkAnimKey);
                        }
                    }
                } else {
                    e.body.setVelocity(0);
                    if (e.anims.isPlaying) { e.stop(); e.setFrame(0); }
                }
            }

            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.y - e.stats.bh / 2 - 8;
        });
    }

    _fireBanditArrow(e, dx, dy) {
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const proj = this.scene.add.sprite(e.x, e.y, 'enemy_arrow').setDepth(15);
        this.scene.physics.add.existing(proj);
        proj.body.setVelocity((dx / dist) * 180, (dy / dist) * 180);
        proj.damage = e.stats.damage;
        proj.lifespan = 2000;
        proj.isHeal = false;
        this.scene.enemyProjectiles.push(proj);
    }

    /* ===== BOSS ===== */

    _spawnBoss() {
        if (this.scene.castleBossSpawned) return;
        try {
            const bt = BANDIT_LEADER_BOSS;
            const diffKey = this.scene.difficulty || 'Normal';
            const hp = Math.floor(bt.hp[diffKey] || bt.hp.Normal);
            const dmg = Math.floor(bt.dmg[diffKey] || bt.dmg.Normal);
            const exp = Math.floor(bt.exp[diffKey] || bt.exp.Normal);
            const spd = bt.speeds[diffKey] || bt.speeds.Normal;

            this.scene.castleBossSpawned = true;
            this.scene.castleBossAlive = true;

            const x = CASTLE_WIDTH / 2;
            const y = 120;

            this.scene.castleBoss = this.scene.add.sprite(x, y, 'bandit_leader').setDepth(6);
            this.scene.physics.add.existing(this.scene.castleBoss, false);
            this.scene.castleBoss.body.setSize(bt.bw, bt.bh);
            this.scene.castleBoss.body.setCollideWorldBounds(true);
            if (this.scene.anims.exists('bandit_leader_walk_anim')) this.scene.castleBoss.play('bandit_leader_walk_anim');

            this.scene.castleBoss.stats = {
                name: bt.name, hp: hp, maxHp: hp,
                damage: dmg, exp: exp, speed: spd,
                bw: bt.bw, bh: bt.bh, isBoss: true,
                windupTime: bt.windupTime,
                strikeTime: bt.strikeTime,
                strikeDmgMul: bt.strikeDmgMul,
                whirlwindTimer: 0, whirlwindInterval: bt.whirlwindInterval,
                whirlwindRadius: bt.whirlwindRadius, whirlwindDmgMul: bt.whirlwindDmgMul,
                summonTimer: 0, summonInterval: bt.summonInterval,
                summonCount: bt.summonCount,
                state: 'idle',
                stateTimer: 0
            };

            const hw = bt.bw + 20;
            const barX = GAME_WIDTH / 2;
            this.scene.castleBoss.hpBg = this.scene.add.rectangle(barX, 50, hw, 5, 0x333333).setOrigin(0.5).setDepth(15).setScrollFactor(0);
            this.scene.castleBoss.hpFill = this.scene.add.rectangle(barX, 50, hw, 5, 0xc0392b).setOrigin(0.5).setDepth(15).setScrollFactor(0);
            this.scene.castleBossNameText = this.scene.add.text(barX, 35, bt.name, {
                fontSize: '12px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(15).setScrollFactor(0);

            if (this.scene.enemies) this.scene.enemies.add(this.scene.castleBoss);

            try { playBossAoE(); } catch(e) {}
            this.scene.floatingText(x, y - 60, 'BANDIT LEADER appears!', '#c0392b');
        } catch(e) {
            console.error('[Castle] Boss spawn error:', e);
            this.scene.castleBossSpawned = false;
            this.scene.castleBossAlive = false;
        }
    }

    _updateBoss() {
        if (!this.scene.castleBossAlive || !this.scene.castleBoss || !this.scene.castleBoss.active) return;
        const b = this.scene.castleBoss;
        const s = b.stats;

        if (b.hpBg && b.hpBg.active) {
            b.hpBg.x = GAME_WIDTH / 2;
            b.hpBg.y = 50;
        }
        if (b.hpFill && b.hpFill.active) {
            b.hpFill.x = GAME_WIDTH / 2;
            b.hpFill.y = 50;
            b.hpFill.width = (b.hpBg ? b.hpBg.width : 60) * (s.hp / s.maxHp);
        }

        if (this.scene.menuOpen || this.scene.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (s.hp <= 0) {
            this._banditLeaderDied();
            return;
        }

        const dx = this.scene.player.x - b.x;
        const dy = this.scene.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        s.stateTimer += this.scene.game.loop.delta;

        switch (s.state) {
            case 'idle':
                if (dist > 16) {
                    b.body.setVelocity((dx / dist) * s.speed * 0.5, (dy / dist) * s.speed * 0.5);
                    b.setFlipX(dx < 0);
                } else {
                    b.body.setVelocity(0);
                }
                if (s.stateTimer >= 1000) {
                    s.state = 'windup';
                    s.stateTimer = 0;
                    b.setTint(0xff6600);
                }
                break;

            case 'windup':
                b.body.setVelocity(0);
                if (s.stateTimer >= s.windupTime) {
                    s.state = 'strike';
                    s.stateTimer = 0;
                    b.clearTint();
                }
                break;

            case 'strike':
                if (dist < 80) {
                    const strikeDmg = Math.floor(s.damage * s.strikeDmgMul);
                    this.scene.combat.takeDamage(strikeDmg);
                    this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'STRIKE!', '#e74c3c');
                    const pushX = this.scene.player.x - b.x;
                    const pushY = this.scene.player.y - b.y;
                    const pushDist = Math.sqrt(pushX * pushX + pushY * pushY) || 1;
                    this.scene.player.x += (pushX / pushDist) * 50;
                    this.scene.player.y += (pushY / pushDist) * 50;
                }
                s.state = 'idle';
                s.stateTimer = 0;
                break;
        }

        s.whirlwindTimer += this.scene.game.loop.delta;
        if (s.whirlwindTimer >= s.whirlwindInterval) {
            s.whirlwindTimer = 0;
            this._bossWhirlwind(b);
        }

        s.summonTimer += this.scene.game.loop.delta;
        if (s.summonTimer >= s.summonInterval) {
            s.summonTimer = 0;
            this._bossSummonGuards(b);
        }
    }

    _bossWhirlwind(boss) {
        playBossAoE();
        this.scene.floatingText(boss.x, boss.y - 40, 'WHIRLWIND!', '#e67e22');

        const ring = this.scene.add.circle(boss.x, boss.y, 5, 0xe67e22, 0.6).setDepth(12);
        this.scene.tweens.add({
            targets: ring,
            scaleX: 8, scaleY: 8, alpha: 0, duration: 500,
            onComplete: () => ring.destroy()
        });

        this.scene.time.delayedCall(200, () => {
            const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, boss.x, boss.y);
            if (dist < boss.stats.whirlwindRadius) {
                this.scene.combat.takeDamage(Math.floor(boss.stats.damage * boss.stats.whirlwindDmgMul));
            }
        });
    }

    _bossSummonGuards(boss) {
        playBossAoE();
        this.scene.floatingText(boss.x, boss.y - 40, 'GUARDS!', '#c0392b');

        for (let i = 0; i < boss.stats.summonCount; i++) {
            const angle = (i / boss.stats.summonCount) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 60;
            const sy = boss.y + Math.sin(angle) * 50;
            const clampedX = Phaser.Math.Clamp(sx, 30, CASTLE_WIDTH - 30);
            const clampedY = Phaser.Math.Clamp(sy, 30, CASTLE_ROOM_HEIGHT - 30);
            this._makeBandit(BANDIT_TYPES.melee, clampedX, clampedY);
        }
    }

    _banditLeaderDied() {
        if (!this.scene.castleBoss) return;
        playBossDeath();
        const b = this.scene.castleBoss;

        if (this.scene.particles) this.scene.particles.spawnBossDeath(b.x, b.y);
        if (this.scene.castleBoss.hpBg) this.scene.castleBoss.hpBg.destroy();
        if (this.scene.castleBoss.hpFill) this.scene.castleBoss.hpFill.destroy();
        if (this.scene.castleBossNameText) this.scene.castleBossNameText.destroy();

        this.scene.castleBossDefeated = true;
        this.scene.castleBossAlive = false;

        recordKill('bandit_leader');
        recordSoulCollect('bandit_leader');

        this.scene.defeatedText = this.scene.add.text(GAME_WIDTH / 2, 100, 'BANDIT LEADER DEFEATED!', {
            fontSize: '22px', fill: '#c0392b', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        this.scene.tweens.add({
            targets: this.scene.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (this.scene.defeatedText) this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        });

        this.scene.defeatedLoot = [];

        const castleKey = { ...CASTLE_KEY, type: 'equip' };
        this.scene.equipBag.push(castleKey);
        this.scene.castleKeyObtained = true;
        playLoot();

        this.scene.time.delayedCall(500, () => {
            this.scene.floatingText(GAME_WIDTH / 2, 130, 'Castle Key obtained!', '#f1c40f');
        });

        if (Math.random() < 0.6) {
            const item = rollEquip();
            this.scene.equipBag.push(item);
            playLoot();
        }

        this.scene.time.delayedCall(3000, () => {
            this.scene.floatingText(GAME_WIDTH / 2, 180, 'Use the key on the attic door!', '#f1c40f');
        });

        b.destroy();
        this.scene.castleBoss = null;
        this.scene.checkLevelUp();
        this.scene._checkAccountLevelUp();
        this.scene.updateUI();
    }

    /* ===== ATTIC ===== */

    _unlockAttic() {
        if (this.scene.castleAtticUnlocked) return;
        if (!this.scene.castleKeyObtained) {
            this.scene.floatingText(CASTLE_WIDTH / 2, 80, 'Need Castle Key!', '#e74c3c');
            return;
        }
        this.scene.castleAtticUnlocked = true;
        if (this.scene.castleAtticDoor) {
            this.scene.castleAtticDoor.destroy();
            this.scene.castleAtticDoor = null;
        }
        if (this.scene.castleAtticHint) {
            this.scene.castleAtticHint.setText('');
        }
        this.scene.floatingText(CASTLE_WIDTH / 2, 80, 'The door is unlocked!', '#2ecc71');
    }

    _spawnVillagers() {
        this.scene.castleVillagers = [];
        const villagerTextures = [
            'villager_rescued_0', 'villager_rescued_1', 'villager_rescued_2',
            'villager_rescued_3', 'villager_rescued_4'
        ];

        CASTLE_VILLAGER_POSITIONS.forEach((pos, i) => {
            const texKey = villagerTextures[i % villagerTextures.length];
            const v = this.scene.add.sprite(pos.x, pos.y, texKey).setDepth(5);
            this.scene.physics.add.existing(v, true);
            this.scene.castleVillagers.push(v);
            this.scene.tweens.add({
                targets: v, y: pos.y - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
            });
        });

        const ecx = CASTLE_WIDTH / 2;
        const ecy = CASTLE_ROOM_HEIGHT / 2;
        this.scene.castleElder = this.scene.add.sprite(ecx, ecy, 'villager_elder').setDepth(6);
        this.scene.physics.add.existing(this.scene.castleElder, true);
        this.scene.castleElderHint = this.scene.add.text(ecx, ecy - 30, 'SPACE to talk', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        this.scene.tweens.add({
            targets: this.scene.castleElder, y: ecy - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });
        this.scene.tweens.add({
            targets: this.scene.castleElderHint, y: ecy - 33, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });
    }

    _talkToElder() {
        if (this.scene.transitioning || this.scene.menuOpen) return;
        if (!this.scene.castleElder) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleElder.x, this.scene.castleElder.y
        );
        if (dist > 60) return;

        this.scene.transitioning = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();

        if (this.scene.castleElderHint) this.scene.castleElderHint.setText('');

        const elderMsg = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60,
            'Elder: "Thank you, hero... You saved us all.\nWe were taken by the bandits so long ago.\nPlease, take us back home..."', {
            fontSize: '15px', fill: '#f5cba7', fontFamily: 'Georgia', fontStyle: 'italic',
            stroke: '#000', strokeThickness: 3, wordWrap: { width: 440 }, align: 'center'
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        const elderBox = this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 500, 80, 0x000000, 0.75)
            .setDepth(19).setScrollFactor(0);

        const spaceHint = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, '[ SPACE ]', {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        this.scene.time.delayedCall(500, () => {
            this.scene.input.keyboard.once('keydown-SPACE', () => {
                elderMsg.destroy();
                elderBox.destroy();
                spaceHint.destroy();
                this._returnToVillage();
            });
        });
    }

    _returnToVillage() {
        this.scene.cameras.main.fadeOut(1200, 0, 0, 0);
        this.scene.time.delayedCall(1200, () => {
            this.clear();
            this.scene.villageRestored = true;
            this.scene.castleQuestDone = true;
            this.scene.castleRescued = true;

            this.scene._setupVillage(false);

            const ox = this.scene.villageOffsetX || 0;
            const cx = ox + VILLAGE_WIDTH / 2;

            const thankTexts = [
                '"Thank you, hero!"',
                '"We are free at last!"',
                '"Bless you, brave one!"'
            ];
            let idx = 0;
            const thankTimer = this.scene.time.addEvent({
                delay: 1500, repeat: thankTexts.length - 1,
                callback: () => {
                    if (idx < thankTexts.length) {
                        this.scene.floatingText(
                            cx + Phaser.Math.Between(-100, 100),
                            180 + Phaser.Math.Between(-20, 20),
                            thankTexts[idx], '#2ecc71'
                        );
                        idx++;
                    }
                }
            });

            this.scene.time.delayedCall(thankTexts.length * 1500 + 500, () => {
                const boyX = cx - 60;
                const boyY = 280;
                const boy = this.scene.add.sprite(boyX, boyY, 'child_npc_boy').setDepth(6);
                this.scene.tweens.add({
                    targets: boy, y: boyY - 20, duration: 1200, ease: 'Power2',
                    onComplete: () => {
                        const boyMsg = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40,
                            '"You... you saved everyone! You are amazing!\nI want to be just like you when I grow up!"', {
                            fontSize: '15px', fill: '#2ecc71', fontFamily: 'Georgia', fontStyle: 'italic',
                            stroke: '#000', strokeThickness: 3, wordWrap: { width: 420 }, align: 'center'
                        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

                        const boyBox = this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30, 460, 60, 0x000000, 0.75)
                            .setDepth(19).setScrollFactor(0);

                        this.scene.time.delayedCall(3500, () => {
                            boyMsg.destroy();
                            boyBox.destroy();
                            this.scene.floatingText(boyX, boyY - 30, '*waves goodbye*', '#f1c40f');
                            this.scene.tweens.add({
                                targets: boy, x: ox + VILLAGE_WIDTH + 50, duration: 2000, ease: 'Power1',
                                onComplete: () => { boy.destroy(); }
                            });

                            this.scene.time.delayedCall(2500, () => {
                                this._villageTimeSkip();
                            });
                        });
                    }
                });
            });

            this.scene.cameras.main.fadeIn(1000, 0, 0, 0);
            this.scene.transitioning = false;
            this.scene.menuOpen = false;
            this.scene.physics.resume();
        });
    }

    _villageTimeSkip() {
        this.scene.transitioning = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();

        this.scene.cameras.main.fadeOut(1500, 0, 0, 0);
        this.scene.time.delayedCall(1500, () => {
            const timeText = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, '20 years later...', {
                fontSize: '28px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'italic',
                stroke: '#000', strokeThickness: 4
            }).setOrigin(0.5).setDepth(100).setScrollFactor(0);

            this.scene.cameras.main.fadeIn(1000, 0, 0, 0);

            this.scene.time.delayedCall(3000, () => {
                timeText.destroy();
                this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
                this.scene.time.delayedCall(1000, () => {
                    this.scene.villageRestored = true;
                    this.scene.villageThriving = true;
                    this.scene.castleQuestDone = true;
                    this.scene.zone = 'village';
                    this.scene._setupVillage(false);
                    this.scene.cameras.main.fadeIn(1000, 0, 0, 0);
                    this.scene.transitioning = false;
                    this.scene.menuOpen = false;
                    this.scene.physics.resume();

                    this.scene.time.delayedCall(500, () => {
                        const ox = this.scene.villageOffsetX || 0;
                        this.scene.floatingText(
                            ox + VILLAGE_WIDTH / 2, 200,
                            'The village has thrived for 20 years!', '#2ecc71'
                        );
                    });
                });
            });
        });
    }

    /* ===== HINTS ===== */

    _updateChestHints() {
        if (!this.scene.villageChests) return;
        this.scene.villageChests.getChildren().forEach(ch => {
            if (!ch.active || ch.broken || !ch.hintText) return;
            const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, ch.x, ch.y);
            ch.hintText.setText(dist < 50 ? 'SPACE = open' : '');
        });
    }

    _updateAtticHint() {
        if (!this.scene.castleAtticHint || !this.scene.castleAtticDoor) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleAtticDoor.x, this.scene.castleAtticDoor.y
        );
        if (dist < 50) {
            if (this.scene.castleKeyObtained && !this.scene.castleAtticUnlocked) {
                this.scene.castleAtticHint.setText('SPACE = unlock with key');
            } else if (!this.scene.castleKeyObtained) {
                this.scene.castleAtticHint.setText('Need Castle Key');
            }
        } else {
            this.scene.castleAtticHint.setText('');
        }
    }

    _updateStairsUpHint() {
        if (this.scene.castleRoom >= CASTLE_ROOMS - 1) return;

        const alive = this.scene.enemies ? this.scene.enemies.getChildren().filter(e => e.active && e.stats && !e.stats.isBoss).length : 0;
        const wasCleared = this.scene.castleFloorCleared;
        this.scene.castleFloorCleared = alive === 0;

        if (!wasCleared && this.scene.castleFloorCleared && !this.scene.castleStairsUp) {
            this._spawnStairsUp();
        }

        if (this.scene.castleStairsUp && this.scene.castleStairsUpHint) {
            const dist = Phaser.Math.Distance.Between(
                this.scene.player.x, this.scene.player.y,
                this.scene.castleStairsUp.x, this.scene.castleStairsUp.y
            );
            this.scene.castleStairsUpHint.setText(dist < 50 ? 'SPACE = go up' : '');
        }
    }

    _spawnStairsUp() {
        const x = CASTLE_WIDTH / 2;
        const y = 30;
        const stairs = this.scene.add.image(x, y, 'castle_stairs').setDepth(3);
        this.scene.physics.add.existing(stairs, true);
        stairs.body.setSize(40, 20);
        this.scene.castleStairsUp = stairs;
        this.scene.castleStairsUpHint = this.scene.add.text(x, y + 15, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        this.scene.floatingText(x, y + 40, 'Stairs unlocked!', '#2ecc71');
    }

    _updateBossDoorHint() {
        if (!this.scene.castleBossDoor || !this.scene.castleBossDoorHint) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleBossDoor.x, this.scene.castleBossDoor.y
        );
        if (dist < 50) {
            if (this.scene.castleBossDefeated && this.scene.castleAtticUnlocked) {
                this.scene.castleBossDoorHint.setText('SPACE = enter');
            } else if (!this.scene.castleBossDefeated) {
                this.scene.castleBossDoorHint.setText('Defeat the boss first');
            } else if (!this.scene.castleAtticUnlocked) {
                this.scene.castleBossDoorHint.setText('Unlock the attic first');
            }
        } else {
            this.scene.castleBossDoorHint.setText('');
        }
    }

    /* ===== ROOM TRANSITIONS ===== */

    goUp() {
        if (this.scene.transitioning) return;
        const room = this.scene.castleRoom;

        if (room >= CASTLE_ROOMS - 1) return;

        this.scene.transitioning = true;
        this.scene.cameras.main.fadeOut(400, 0, 0, 0);
        this.scene.time.delayedCall(400, () => {
            this.scene.castleRoom++;
            this.scene.physics.world.colliders.destroy();
            if (this.scene.enemies) {
                this.scene.enemies.getChildren().forEach(e => {
                    if (e.hpBg) e.hpBg.destroy();
                    if (e.hpFill) e.hpFill.destroy();
                });
                this.scene.enemies.clear(true, true);
            }
            if (this.scene.villageChests) {
                this.scene.villageChests.getChildren().forEach(ch => {
                    if (ch.hintText) ch.hintText.destroy();
                    if (ch.hpBg) ch.hpBg.destroy();
                    if (ch.hpFill) ch.hpFill.destroy();
                });
                this.scene.villageChests.clear(true, true);
            }
            if (this.scene.castleDecor) {
                this.scene.castleDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
                this.scene.castleDecor = [];
            }
            if (this.scene.castleBg) { this.scene.castleBg.destroy(); this.scene.castleBg = null; }
            if (this.scene.castleAtticDoor) { if (this.scene.castleAtticDoor.destroy) this.scene.castleAtticDoor.destroy(); this.scene.castleAtticDoor = null; }
            if (this.scene.castleAtticHint) { if (this.scene.castleAtticHint.destroy) this.scene.castleAtticHint.destroy(); this.scene.castleAtticHint = null; }
            if (this.scene.castleStairsUp) { if (this.scene.castleStairsUp.destroy) this.scene.castleStairsUp.destroy(); this.scene.castleStairsUp = null; }
            if (this.scene.castleStairsUpHint) { if (this.scene.castleStairsUpHint.destroy) this.scene.castleStairsUpHint.destroy(); this.scene.castleStairsUpHint = null; }
            if (this.scene.castleBossDoor) { if (this.scene.castleBossDoor.destroy) this.scene.castleBossDoor.destroy(); this.scene.castleBossDoor = null; }
            if (this.scene.castleBossDoorHint) { if (this.scene.castleBossDoorHint.destroy) this.scene.castleBossDoorHint.destroy(); this.scene.castleBossDoorHint = null; }
            if (this.scene.castleElder) { if (this.scene.castleElder.destroy) this.scene.castleElder.destroy(); this.scene.castleElder = null; }
            if (this.scene.castleElderHint) { if (this.scene.castleElderHint.destroy) this.scene.castleElderHint.destroy(); this.scene.castleElderHint = null; }

            this._drawRoom(this.scene.castleRoom);
            this._spawnRoomContent(this.scene.castleRoom);

            this.scene.physics.add.overlap(this.scene.player, this.scene.enemies, (p, e) => {
                if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                    this.scene.combat.takeDamage(e.stats.damage);
                }
            }, null, this.scene);

            this.scene.player.x = CASTLE_SPAWN_POS.x;
            this.scene.player.y = CASTLE_ROOM_HEIGHT - 50;
            this.scene.cameras.main.fadeIn(400, 0, 0, 0);
            this.scene.transitioning = false;
        });
    }

    _enterAttic() {
        if (this.scene.transitioning) return;
        this.scene.transitioning = true;
        this.scene.cameras.main.fadeOut(400, 0, 0, 0);
        this.scene.time.delayedCall(400, () => {
            this.scene.castleRoom = CASTLE_ATTIC_INDEX;
            this.scene.physics.world.colliders.destroy();
            if (this.scene.enemies) {
                this.scene.enemies.getChildren().forEach(e => {
                    if (e.hpBg) e.hpBg.destroy();
                    if (e.hpFill) e.hpFill.destroy();
                });
                this.scene.enemies.clear(true, true);
            }
            if (this.scene.villageChests) {
                this.scene.villageChests.getChildren().forEach(ch => {
                    if (ch.hintText) ch.hintText.destroy();
                    if (ch.hpBg) ch.hpBg.destroy();
                    if (ch.hpFill) ch.hpFill.destroy();
                });
                this.scene.villageChests.clear(true, true);
            }
            if (this.scene.castleDecor) {
                this.scene.castleDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
                this.scene.castleDecor = [];
            }
            if (this.scene.castleBg) { this.scene.castleBg.destroy(); this.scene.castleBg = null; }
            if (this.scene.castleAtticDoor) { if (this.scene.castleAtticDoor.destroy) this.scene.castleAtticDoor.destroy(); this.scene.castleAtticDoor = null; }
            if (this.scene.castleAtticHint) { if (this.scene.castleAtticHint.destroy) this.scene.castleAtticHint.destroy(); this.scene.castleAtticHint = null; }
            if (this.scene.castleStairsUp) { if (this.scene.castleStairsUp.destroy) this.scene.castleStairsUp.destroy(); this.scene.castleStairsUp = null; }
            if (this.scene.castleStairsUpHint) { if (this.scene.castleStairsUpHint.destroy) this.scene.castleStairsUpHint.destroy(); this.scene.castleStairsUpHint = null; }
            if (this.scene.castleBossDoor) { if (this.scene.castleBossDoor.destroy) this.scene.castleBossDoor.destroy(); this.scene.castleBossDoor = null; }
            if (this.scene.castleBossDoorHint) { if (this.scene.castleBossDoorHint.destroy) this.scene.castleBossDoorHint.destroy(); this.scene.castleBossDoorHint = null; }
            if (this.scene.castleElder) { if (this.scene.castleElder.destroy) this.scene.castleElder.destroy(); this.scene.castleElder = null; }
            if (this.scene.castleElderHint) { if (this.scene.castleElderHint.destroy) this.scene.castleElderHint.destroy(); this.scene.castleElderHint = null; }

            this._drawRoom(CASTLE_ATTIC_INDEX);
            this._spawnRoomContent(CASTLE_ATTIC_INDEX);

            this.scene.player.x = CASTLE_SPAWN_POS.x;
            this.scene.player.y = CASTLE_ROOM_HEIGHT - 50;
            this.scene.cameras.main.fadeIn(400, 0, 0, 0);
            this.scene.transitioning = false;
        });
    }
}
