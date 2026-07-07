import Phaser from 'phaser';
import {
    CAVE_WIDTH, CAVE_HEIGHT, CAVE_BOSS_TYPE, CAVE_SMALL_BAT,
    GAME_WIDTH, DIFF_COLORS
} from '../config/index.js';
import { playBossAoE } from '../sound.js';
import { BaseBossAI } from '../systems/BaseBossAI.js';

export class CaveBoss extends BaseBossAI {
    constructor(scene, zone) {
        super(scene, zone, {
            bossRef: 'caveBoss',
            nameTextRef: 'caveBossNameText',
            color: '#bf77f6',
            animKey: 'giant_bat_walk_anim'
        });
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

        this.zone.bossAlive = true;
        s.enemies.add(s.caveBoss);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(s.caveBoss, 'caveBoss');
        }
    }

    updateCaveBoss() {
        const s = this.scene;
        if (!this.zone.bossAlive || !s.caveBoss || !s.caveBoss.active) return;
        const b = s.caveBoss;
        const st = b.stats;
        const delta = s.game.loop.delta;

        BossAI.updateHpBar(b, { x: GAME_WIDTH / 2, y: 100 });

        if (s.menuOpen || s.transitioning) { b.body.setVelocity(0); return; }
        if (st.transitioning || st.invulnerable) { b.body.setVelocity(0); return; }
        if (st.isDashing) return;

        const hpPct = st.hp / st.maxHp;
        if (hpPct <= 0.3 && st.phase !== 3) { st.phase = 3; this._phaseTransition(b); return; }
        if (hpPct <= 0.6 && st.phase !== 2) { st.phase = 2; this._phaseTransition(b); return; }

        if (!st.summoned && st.phase >= 2) { st.summoned = true; this.caveBossSummon(b); }

        this._updateStateMachine(b, delta);
    }

    _tickTimers(boss, delta) {
        const st = boss.stats;
        super._tickTimers(boss, delta);
        st.dashCooldown -= delta;
        st.screechCooldownTimer -= delta;
        st.summonCooldown -= delta;
    }

    _pickAttack(boss) {
        const st = boss.stats;
        const available = [];
        if (st.screechCooldownTimer <= 0) available.push('screech');
        if (st.dashCooldown <= 0) available.push('dash');
        if (st.phase >= 3 && st.summonCooldown <= 0) available.push('summon');
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    _telegraph(boss, attackType) {
        const s = this.scene;
        const st = boss.stats;
        super._telegraph(boss, attackType);

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
    }

    _executeAttack(boss) {
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
}
