import Phaser from 'phaser';
import { MINE_BOSS_TYPE, DIFF_COLORS, GAME_WIDTH, GAME_HEIGHT, DIFF_MULT, SECRET_KEY_ITEM } from '../config/index.js';
import { playBossAoE } from '../sound.js';
import { BossAI } from '../systems/BossAI.js';

export class MineBoss {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    spawn() {
        const s = this.scene;
        const bt = MINE_BOSS_TYPE;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;
        const bx = 400, by = 180;
        const b = s.add.sprite(bx, by, 'skeleton_lord_walk').setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh); b.body.setCollideWorldBounds(true);
        if (s.anims.exists('skeleton_lord_walk')) b.play('skeleton_lord_walk');
        b.stats = { name: bt.name, hp, maxHp: hp, damage: dmg, exp, speed: spd, bw: bt.bw, bh: bt.bh, phase: 1, invulnerable: false, transitioning: false, phaseTriggered: false, aiState: 'chase', attackTimer: 2500, cooldownTimer: 0, currentAttack: null, telegraphTimer: 0, attackDuration: 0, baseSpeed: spd, baseDamage: dmg, telegraphWarn: false, aoeTimer: 0, aoeInterval: bt.aoeInterval, aoeDmgMul: bt.aoeDmgMul, aoeRadius: bt.aoeRadius, boneTimer: 3000, boneInterval: bt.boneInterval, auraTimer: 8000, auraInterval: bt.auraInterval, auraDmgMul: bt.auraDmgMul, summonTimer: 12000, summonInterval: bt.summonInterval, summonCount: bt.summonCount };
        const hw = bt.bw + 20;
        b.hpBg = s.add.rectangle(400, 130, hw, 5, 0x222222).setOrigin(0.5).setDepth(15);
        b.hpFill = s.add.rectangle(400, 130, hw, 5, 0x9b59b6).setOrigin(0.5).setDepth(15);
        s.mineBossNameText = s.add.text(400, 118, bt.name, { fontSize: '12px', fill: DIFF_COLORS[s.difficulty] || '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(15);
        s.mineBoss = b;
        s.mineBossAlive = true;
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) s.mpSync.assignMobId(b, 'mineBoss');
    }

    update(delta) {
        const s = this.scene;
        const b = s.mineBoss;
        if (!s.mineBossAlive || !b || !b.active) return;
        const st = b.stats;
        BossAI.updateHpBar(b, {
            x: b.x, y: b.y - 50,
            nameText: s.mineBossNameText, nameYOffset: -10
        });
        if (s.menuOpen || s.transitioning) { b.body.setVelocity(0); return; }
        if (st.transitioning || st.invulnerable) { b.body.setVelocity(0); return; }

        const hpPct = st.hp / st.maxHp;
        if (hpPct <= 0.3 && st.phase !== 3) { st.phase = 3; this._phaseTransition(b); return; }
        else if (hpPct <= 0.6 && st.phase !== 2) { st.phase = 2; this._phaseTransition(b); return; }

        if (st.aiState === 'telegraph') {
            b.body.setVelocity(0); st.telegraphTimer -= delta;
            if (st.telegraphTimer <= 0) this._executeAttack(b);
            return;
        }
        if (st.aiState === 'attacking') {
            b.body.setVelocity(0); st.attackDuration -= delta;
            if (st.attackDuration <= 0) { st.aiState = 'cooldown'; st.cooldownTimer = 800; if (b.telegraph) { b.telegraph.destroy(); b.telegraph = null; } }
            return;
        }
        if (st.aiState === 'cooldown') {
            b.body.setVelocity(0); st.cooldownTimer -= delta;
            if (st.cooldownTimer <= 0) st.aiState = 'chase';
            return;
        }

        st.aiState = 'chase';
        const dx = s.player.x - b.x, dy = s.player.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
        const speed = st.phase === 3 ? st.baseSpeed * 1.2 : st.baseSpeed;
        if (dist > 30) {
            b.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
            if (s.anims.exists('skeleton_lord_walk') && !b.anims.isPlaying) b.play('skeleton_lord_walk');
            b.setFlipX(dx < 0);
        } else { b.body.setVelocity(0); b.stop(); b.setFrame(0); }

        st.attackTimer -= delta; st.aoeTimer -= delta; st.boneTimer -= delta; st.auraTimer -= delta; st.summonTimer -= delta;
        if (st.attackTimer <= 0) {
            const attack = this._pickAttack(st);
            if (attack) { this._telegraph(b, attack); } else { st.attackTimer = 800; }
        }
    }

    _pickAttack(st) {
        const available = [];
        if (st.aoeTimer <= 0) available.push('aoe');
        if (st.phase >= 2 && st.boneTimer <= 0) available.push('bone');
        if (st.phase >= 2 && st.auraTimer <= 0) available.push('aura');
        if (st.phase >= 3 && st.summonTimer <= 0) available.push('summon');
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    }

    _telegraph(boss, attackType) {
        const s = this.scene; const st = boss.stats;
        st.aiState = 'telegraph'; st.currentAttack = attackType; st.telegraphTimer = 500;
        boss.body.setVelocity(0);
        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }
        if (attackType === 'aoe') {
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_circle').setAlpha(0).setDepth(10).setScale(st.aoeRadius / 64);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg; st.aoeTimer = st.phase >= 3 ? 2500 : 4000;
        } else if (attackType === 'bone') {
            const dx = s.player.x - boss.x, dy = s.player.y - boss.y, dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const angle = Math.atan2(dy / dist, dx / dist);
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_line').setAlpha(0).setDepth(10).setRotation(angle);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg; st.boneTimer = st.phase >= 3 ? 3000 : 5000;
        } else if (attackType === 'aura') {
            const tg = s.add.sprite(boss.x, boss.y, 'boss_telegraph_circle').setAlpha(0).setDepth(10).setScale(1.8);
            s.tweens.add({ targets: tg, alpha: 0.9, duration: 200 });
            boss.telegraph = tg; st.auraTimer = st.phase >= 3 ? 8000 : 12000;
        } else if (attackType === 'summon') {
            st.summonTimer = st.phase >= 3 ? 12000 : 18000;
        }
        st.attackTimer = 3000;
    }

    _executeAttack(boss) {
        const st = boss.stats; st.aiState = 'attacking'; st.attackDuration = 400;
        if (st.currentAttack === 'aoe') this._slam(boss);
        else if (st.currentAttack === 'bone') this._boneThrow(boss);
        else if (st.currentAttack === 'aura') this._deathAura(boss);
        else if (st.currentAttack === 'summon') { this._summon(boss); st.attackDuration = 500; }
    }

    _slam(boss) {
        const s = this.scene; const st = boss.stats;
        const dmgMul = st.phase === 3 ? st.aoeDmgMul * 1.5 : st.aoeDmgMul;
        const dmg = Math.floor(st.damage * dmgMul);
        playBossAoE();
        const ring = s.add.sprite(boss.x, boss.y, 'boss_aoe').setAlpha(0.9).setScale(0.3).setDepth(10);
        s.tweens.add({ targets: ring, scaleX: 1.8, scaleY: 1.8, alpha: 0, duration: 500, onComplete: () => ring.destroy() });
        const ring2 = s.add.sprite(boss.x, boss.y, 'boss_aoe').setAlpha(0.5).setScale(0.1).setDepth(10);
        s.tweens.add({ targets: ring2, scaleX: 1.2, scaleY: 1.2, alpha: 0, duration: 400, delay: 100, onComplete: () => ring2.destroy() });
        s.time.delayedCall(300, () => {
            if (!boss.active) return;
            if (Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y) < st.aoeRadius) {
                s.combat.takeDamage(dmg);
                const pushX = s.player.x - boss.x, pushY = s.player.y - boss.y, pushDist = Math.sqrt(pushX * pushX + pushY * pushY) || 1;
                s.player.x += (pushX / pushDist) * 45;
                s.player.y += (pushY / pushDist) * 45;
            }
        });
    }

    _boneThrow(boss) {
        const s = this.scene;
        playBossAoE();
        const dx = s.player.x - boss.x, dy = s.player.y - boss.y, dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const proj = s.add.sprite(boss.x, boss.y, 'bone_projectile').setDepth(10);
        s.physics.add.existing(proj); proj.body.setVelocity((dx / dist) * 250, (dy / dist) * 250);
        proj.damage = Math.floor(boss.stats.damage * 0.8); proj.lifespan = 2000;
        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }
        s.enemyProjectiles.push(proj);
    }

    _deathAura(boss) {
        const s = this.scene; const st = boss.stats;
        playBossAoE();
        const aura = s.add.circle(boss.x, boss.y, 100, 0x9b59b6, 0.2).setDepth(10);
        s.tweens.add({ targets: aura, scaleX: 1.5, scaleY: 1.5, alpha: 0, duration: 800, onComplete: () => aura.destroy() });
        s.time.delayedCall(500, () => {
            if (!boss.active) return;
            if (Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y) < 100) {
                const dmg = Math.floor(st.damage * st.auraDmgMul);
                s.combat.takeDamage(dmg);
                s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' AURA', '#9b59b6');
            }
        });
    }

    _summon(boss) {
        const s = this.scene; const st = boss.stats;
        playBossAoE();
        const count = st.phase >= 3 ? 3 : 2;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
            this._spawnAdd(boss.x + Math.cos(angle) * 70, boss.y + Math.sin(angle) * 70);
        }
    }

    _spawnAdd(x, y) {
        const s = this.scene;
        const e = s.add.sprite(x, y, 'skeleton_warrior').setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(18, 28); e.body.setCollideWorldBounds(true);
        const hp = Math.floor(80 * s.diffMulti.hp), dmg = Math.floor(10 * s.diffMulti.dmg);
        e.stats = { key: 'skeleton_guard', name: 'Skeleton Guard', hp, maxHp: hp, damage: dmg, exp: 15, bw: 18, bh: 28, wTimer: 0, wDir: 0 };
        e.hpBg = s.add.rectangle(x, y - 18, 22, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = s.add.rectangle(x, y - 18, 22, 3, 0x9b59b6).setOrigin(0.5).setDepth(11);
        s.enemies.add(e);
    }

    _phaseTransition(boss) {
        BossAI.phaseTransition(this.scene, boss, 'PHASE 2!', '#9b59b6');
    }

    clearArena() {
        const s = this.scene;
        if (s.mineBoss) {
            if (s.mineBoss.hpBg) s.mineBoss.hpBg.destroy();
            if (s.mineBoss.hpFill) s.mineBoss.hpFill.destroy();
            if (s.mineBossNameText) s.mineBossNameText.destroy();
            if (s.mineBoss.aoeRing) { s.mineBoss.aoeRing.destroy(); s.mineBoss.aoeRing = null; }
            if (s.mineBoss.aoeRing2) { s.mineBoss.aoeRing2.destroy(); s.mineBoss.aoeRing2 = null; }
            if (s.mineBoss.telegraph) { s.mineBoss.telegraph.destroy(); s.mineBoss.telegraph = null; }
            if (s.mineBoss.auraRing) { s.mineBoss.auraRing.destroy(); s.mineBoss.auraRing = null; }
            s.mineBoss.destroy(); s.mineBoss = null;
        }
        if (s.bossTimer) s.bossTimer.destroy();
        if (s.mineArenaExit) { s.mineArenaExit.destroy(); s.mineArenaExit = null; }
        if (s.mineArenaExitHint) { s.mineArenaExitHint.destroy(); s.mineArenaExitHint = null; }
        this.zone.bossAlive = false;
    }

    checkExitProximity() {
        const s = this.scene;
        if (s.zone !== 'mine_boss' || s.transitioning || s.menuOpen) return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, 400, 550);
        if (dist < 50) { if (s.mineArenaExitHint) s.mineArenaExitHint.setText('SPACE to exit'); }
        else { if (s.mineArenaExitHint) s.mineArenaExitHint.setText(''); }
    }
}
