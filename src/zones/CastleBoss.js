import Phaser from 'phaser';
import {
    CASTLE_WIDTH, CASTLE_ROOM_HEIGHT, CASTLE_ROOMS, BANDIT_TYPES, BANDIT_LEADER_BOSS,
    CASTLE_KEY, GAME_WIDTH, DIFF_COLORS
} from '../config/index.js';
import { rollEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playLoot, playBossAoE, playBossDeath } from '../sound.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';
import { BossAI } from '../systems/BossAI.js';

export class CastleBoss {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    /* ===== BANDIT AI ===== */

    _updateBandits() {
        if (!this.scene.enemies) return;
        const delta = this.scene.game.loop.delta;

        this.scene.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            if (e.stats.isBoss) return;

            const aggro = this.scene.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
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
        if (this.zone.bossSpawned) return;
        try {
            const bt = BANDIT_LEADER_BOSS;
            const diffKey = this.scene.difficulty || 'Normal';
            const hp = Math.floor(bt.hp[diffKey] || bt.hp.Normal);
            const dmg = Math.floor(bt.dmg[diffKey] || bt.dmg.Normal);
            const exp = Math.floor(bt.exp[diffKey] || bt.exp.Normal);
            const spd = bt.speeds[diffKey] || bt.speeds.Normal;

            this.zone.bossSpawned = true;
            this.zone.bossAlive = true;

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
                fontSize: '12px', fill: DIFF_COLORS[this.scene.difficulty] || '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(15).setScrollFactor(0);

            if (this.scene.enemies) this.scene.enemies.add(this.scene.castleBoss);
            if (this.scene.multiplayer && this.scene.mpSync) {
                this.scene.mpSync.assignMobId(this.scene.castleBoss, 'castleBoss');
            }

            try { playBossAoE(); } catch(e) {}
            this.scene.floatingText(x, y - 60, 'BANDIT LEADER appears!', '#c0392b');
        } catch(e) {
            console.error('[Castle] Boss spawn error:', e);
            this.zone.bossSpawned = false;
            this.zone.bossAlive = false;
        }
    }

    _updateBoss() {
        if (!this.zone.bossAlive || !this.scene.castleBoss || !this.scene.castleBoss.active) return;
        const b = this.scene.castleBoss;
        const s = b.stats;

        BossAI.updateHpBar(b, {
            x: GAME_WIDTH / 2, y: 50,
            nameText: this.scene.castleBossNameText, nameYOffset: -15
        });

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
            this.zone.spawner._makeBandit(BANDIT_TYPES.melee, clampedX, clampedY);
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

        this.zone.bossDefeated = true;
        this.zone.bossAlive = false;

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
        this.zone.keyObtained = true;
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

        const cc = rollBossCrystals('castle', this.scene.difficulty);
        if (cc > 0) {
            const granted = this.scene.awardCrystals(cc, GAME_WIDTH / 2, 200);
            if (granted > 0) {
                this.scene.floatingText(GAME_WIDTH / 2, 200, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }
}
