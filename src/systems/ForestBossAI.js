import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { playBossAoE } from '../sound.js';
import { BossAI } from './BossAI.js';

export class ForestBossAI {
    constructor(scene) {
        this.scene = scene;
    }

    update(time, delta) {
        const s = this.scene;
        if (!s.zones.arena.bossAlive || !s.boss || !s.boss.active) return;
        const b = s.boss;
        const st = b.stats;

        BossAI.updateHpBar(b, {
            x: b.x, y: b.y - 50,
            nameText: s.bossNameText, nameYOffset: -10
        });

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.invulnerable) {
            b.body.setVelocity(0);
            return;
        }

        const hpPct = st.hp / st.maxHp;
        if (hpPct <= 0.3 && st.phase !== 3) {
            st.phase = 3;
            this._bossPhaseTransition(b);
            return;
        } else if (hpPct <= 0.6 && st.phase !== 2) {
            st.phase = 2;
            this._bossPhaseTransition(b);
            return;
        }

        if (st.aiState === 'telegraph') {
            b.body.setVelocity(0);
            st.telegraphTimer -= delta;
            if (st.telegraphTimer <= 0) {
                this._bossExecuteAttack(b);
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

        if (dist > 30) {
            b.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
            if (!b.anims.isPlaying || b.anims.currentAnim.key !== 'treant_walk') {
                b.play('treant_walk');
            }
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
            b.stop();
            b.setFrame(0);
        }

        st.attackTimer -= delta;
        st.slamCooldown -= delta;
        st.rootCooldown -= delta;
        st.chargeCooldown -= delta;

        if (st.attackTimer <= 0) {
            const attack = this._pickTreantAttack(st);
            if (attack) {
                this._bossTelegraph(b, attack);
            } else {
                st.attackTimer = 800;
            }
        }
    }

    _pickTreantAttack(st) {
        const available = [];
        if (st.slamCooldown <= 0) available.push('slam');
        if (st.phase >= 2 && st.rootCooldown <= 0) available.push('roots');
        if (st.phase >= 3 && st.chargeCooldown <= 0) available.push('charge');
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    _bossTelegraph(boss, attackType) {
        const s = this.scene;
        const st = boss.stats;
        st.aiState = 'telegraph';
        st.currentAttack = attackType;
        st.telegraphTimer = 500;
        boss.body.setVelocity(0);

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        if (attackType === 'slam') {
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_circle')
                .setAlpha(0).setDepth(10).setScale(st.aoeRadius / 64);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg;
            st.slamCooldown = st.phase >= 3 ? 2500 : 4000;
        } else if (attackType === 'roots') {
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_square')
                .setAlpha(0).setDepth(10).setScale(1.2);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg;
            st.rootCooldown = st.phase >= 3 ? 5000 : 8000;
        } else if (attackType === 'charge') {
            const dx = s.player.x - boss.x;
            const dy = s.player.y - boss.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = dx / dist;
            const ny = dy / dist;
            const angle = Math.atan2(ny, nx);
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_line')
                .setAlpha(0).setDepth(10).setRotation(angle);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg;
            st.chargeCooldown = 5000;
        }
        st.attackTimer = 3000;
    }

    _bossExecuteAttack(boss) {
        const st = boss.stats;
        st.aiState = 'attacking';
        st.attackDuration = 400;

        if (st.currentAttack === 'slam') {
            this._treantGroundSlam(boss);
        } else if (st.currentAttack === 'roots') {
            this._treantRootSummon(boss);
        } else if (st.currentAttack === 'charge') {
            this._treantCharge(boss);
            st.attackDuration = 600;
        }
    }

    _treantGroundSlam(boss) {
        const s = this.scene;
        const st = boss.stats;
        const dmgMul = st.phase === 3 ? st.aoeDmgMul * 1.5 : st.aoeDmgMul;
        const aoeDmg = Math.floor(st.damage * dmgMul);
        const radius = st.aoeRadius;
        playBossAoE();

        const ring = s.add.sprite(boss.x, boss.y, 'boss_aoe')
            .setAlpha(0.9).setScale(0.3).setDepth(10);
        s.tweens.add({
            targets: ring, scaleX: 1.8, scaleY: 1.8, alpha: 0, duration: 500,
            onComplete: () => ring.destroy()
        });

        const ring2 = s.add.sprite(boss.x, boss.y, 'boss_aoe')
            .setAlpha(0.5).setScale(0.1).setDepth(10);
        s.tweens.add({
            targets: ring2, scaleX: 1.2, scaleY: 1.2, alpha: 0, duration: 400, delay: 100,
            onComplete: () => ring2.destroy()
        });

        s.time.delayedCall(300, () => {
            if (!boss.active) return;
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y);
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

    _treantRootSummon(boss) {
        const s = this.scene;
        const st = boss.stats;
        playBossAoE();
        s.floatingText(boss.x, boss.y - 40, 'ROOTS!', '#22aa44');

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        const count = st.phase >= 3 ? 3 : 2;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
            const sx = boss.x + Math.cos(angle) * 70;
            const sy = boss.y + Math.sin(angle) * 70;
            this._spawnTreantRootAdd(sx, sy);
        }
    }

    _spawnTreantRootAdd(x, y) {
        const s = this.scene;
        const e = s.add.sprite(x, y, 'root_add').setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(18, 20);
        e.body.setCollideWorldBounds(true);

        const rootHp = Math.floor(60 * (s.diffMulti.hp || 1));
        const rootDmg = Math.floor(8 * (s.diffMulti.dmg || 1));

        e.stats = {
            key: 'root_add', name: 'Treant Root',
            hp: rootHp, maxHp: rootHp,
            damage: rootDmg, exp: 5,
            bw: 18, bh: 20,
            wTimer: 0, wDir: 0
        };

        e.hpBg = s.add.rectangle(x, y - 18, 22, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - 18, 22, 3, 0x22aa44).setOrigin(0.5).setDepth(11);
        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(e, 'root_add');
        }
    }

    _treantCharge(boss) {
        const s = this.scene;
        const st = boss.stats;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const chargeSpeed = st.baseSpeed * 3;
        const dmg = Math.floor(st.damage * 1.8);

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        boss.setTint(0xffaa44);
        boss.body.setVelocity((dx / dist) * chargeSpeed, (dy / dist) * chargeSpeed);

        s.time.delayedCall(400, () => {
            if (!boss.active) return;
            boss.body.setVelocity(0);
            boss.clearTint();
            const pdist = Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y);
            if (pdist < 60) {
                s.combat.takeDamage(dmg);
                const pushX = s.player.x - boss.x;
                const pushY = s.player.y - boss.y;
                const pushDist = Math.sqrt(pushX * pushX + pushY * pushY) || 1;
                s.player.x += (pushX / pushDist) * 60;
                s.player.y += (pushY / pushDist) * 60;
                s.floatingText(s.player.x, s.player.y - 30, 'CHARGED!', '#ff6622');
            }
        });
    }

    _bossPhaseTransition(boss) {
        BossAI.phaseTransition(this.scene, boss, 'PHASE 2!', '#ffaa00');
    }
}
