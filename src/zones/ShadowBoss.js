import Phaser from 'phaser';
import {
    SHADOW_WIDTH, SHADOW_HEIGHT,
    SHADOW_BOSS_TYPE, SHADOW_BOSS_MINION, DIFF_COLORS
} from '../config/index.js';
import { BossAI } from '../systems/BossAI.js';

export class ShadowBoss {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
        this.phase = 0;
    }

    spawnShadowBoss() {
        const s = this.scene;
        if (this.zone.bossSpawned) return;
        this.zone.bossSpawned = true;
        this.phase = 0;
        const bt = SHADOW_BOSS_TYPE;
        const ox = s.shadowOffsetX;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        const bx = ox + SHADOW_WIDTH / 2;
        const by = SHADOW_HEIGHT - 150;
        const b = s.add.sprite(bx, by, 'shadow_king_walk').setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);
        if (s.anims.exists('shadow_king_walk_anim')) b.play('shadow_king_walk_anim');

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            teleportTimer: 0, teleportInterval: bt.teleportInterval,
            darkBoltTimer: 0, darkBoltInterval: bt.darkBoltInterval,
            cloneTimer: 0, cloneInterval: bt.cloneInterval,
            auraTimer: 0, auraInterval: bt.auraInterval
        };

        const hpW = 80;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0x4a0080).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.shadowBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#8800ff', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.shadowBoss = b;
        s.shadowBossVfx = [];
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(b, 'shadowBoss');
        }

        s.floatingText(bx, by - 60, 'SHADOW KING APPEARS!', '#8800ff');
    }

    updateShadowBoss() {
        const s = this.scene;
        if (!s.shadowBoss || !s.shadowBoss.active) return;
        const b = s.shadowBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.shadowBossNameText, nameYOffset: -15, show: true
            });
        }

        const hpPct = st.hp / st.maxHp;
        if (this.phase < 2 && hpPct <= SHADOW_BOSS_TYPE.phaseThresholds[this.phase]) {
            this.phase++;
            s.floatingText(b.x, b.y - 60, 'PHASE ' + (this.phase + 1) + '!', '#aa00ff');
            st.damage = Math.floor(st.damage * 1.25);
            st.speed = Math.floor(st.speed * 1.15);
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('shadow_king_walk_anim') && !b.anims.isPlaying) b.play('shadow_king_walk_anim');
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const delta = s.game.loop.delta;

        st.teleportTimer += delta;
        if (st.teleportTimer >= st.teleportInterval) {
            st.teleportTimer = 0;
            this.teleport(b);
        }

        st.darkBoltTimer += delta;
        if (st.darkBoltTimer >= st.darkBoltInterval) {
            st.darkBoltTimer = 0;
            this.darkBolt(b);
        }

        st.cloneTimer += delta;
        if (st.cloneTimer >= st.cloneInterval) {
            st.cloneTimer = 0;
            this.summon(b);
        }

        st.auraTimer += delta;
        if (st.auraTimer >= st.auraInterval) {
            st.auraTimer = 0;
            this.shadowAura(b);
        }
    }

    teleport(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const ox = s.shadowOffsetX;
        const newX = Phaser.Math.Clamp(boss.x + Phaser.Math.Between(-200, 200), ox + 50, ox + SHADOW_WIDTH - 50);
        const newY = Phaser.Math.Clamp(boss.y + Phaser.Math.Between(-200, 200), 50, SHADOW_HEIGHT - 50);

        const vfx = s.add.sprite(boss.x, boss.y, 'death_wave_vfx').setDepth(8).setScale(1.5).setAlpha(0.5);
        s.shadowBossVfx.push(vfx);
        s.tweens.add({ targets: vfx, alpha: 0, duration: 500, onComplete: () => { if (vfx.active) vfx.destroy(); } });

        boss.x = newX;
        boss.y = newY;

        const vfx2 = s.add.sprite(newX, newY, 'death_wave_vfx').setDepth(8).setScale(1.5).setAlpha(0.5);
        s.shadowBossVfx.push(vfx2);
        s.tweens.add({ targets: vfx2, alpha: 0, duration: 500, onComplete: () => { if (vfx2.active) vfx2.destroy(); } });

        const dist = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
        if (dist < 100) {
            const dmg = Math.floor(boss.stats.damage * SHADOW_BOSS_TYPE.teleportDmgMul);
            s.combat.takeDamage(dmg);
            s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' TELEPORT', '#8800ff');
        }
    }

    darkBolt(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        for (let i = 0; i < SHADOW_BOSS_TYPE.darkBoltCount; i++) {
            const angle = (i / SHADOW_BOSS_TYPE.darkBoltCount) * Math.PI * 2;
            const speed = 200;
            const proj = s.add.sprite(boss.x, boss.y, 'enemy_magic').setDepth(15);
            s.physics.add.existing(proj);
            proj.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            proj.damage = Math.floor(boss.stats.damage * SHADOW_BOSS_TYPE.darkBoltDmgMul);
            proj.lifespan = 3000;
            proj.isHeal = false;
            s.enemyProjectiles.push(proj);
        }
    }

    shadowAura(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
        if (dist > SHADOW_BOSS_TYPE.auraRadius) return;

        const dmg = Math.floor(boss.stats.damage * SHADOW_BOSS_TYPE.auraDmgMul);
        s.combat.takeDamage(dmg);
        s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' SHADOW', '#6600aa');
    }

    summon(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = SHADOW_BOSS_MINION;
        const ox = s.shadowOffsetX;
        for (let i = 0; i < SHADOW_BOSS_TYPE.cloneCount; i++) {
            const angle = (i / SHADOW_BOSS_TYPE.cloneCount) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 60;
            const iy = boss.y + Math.sin(angle) * 60;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + SHADOW_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, SHADOW_HEIGHT - 10);

            const minion = s.add.sprite(clampedX, clampedY, 'shade_walk').setDepth(5);
            s.physics.add.existing(minion, false);
            minion.body.setSize(bt.bw, bt.bh);
            minion.body.setCollideWorldBounds(true);
            if (s.anims.exists('shade_walk_anim')) minion.play('shade_walk_anim');

            const hp = Math.floor(bt.hp * s.diffMulti.hp);
            minion.stats = {
                key: bt.key, name: bt.name,
                hp, maxHp: hp,
                damage: Math.floor(bt.dmg * s.diffMulti.dmg),
                exp: Math.floor(bt.exp * s.diffMulti.exp),
                bw: bt.bw, bh: bt.bh, speed: 80
            };

            const hpW = bt.bw + 6;
            minion.hpBg = s.add.rectangle(clampedX, clampedY - bt.bh / 2 - 6, hpW, 3, 0x000000).setDepth(6);
            minion.hpFill = s.add.rectangle(clampedX - hpW / 2, clampedY - bt.bh / 2 - 6, hpW, 3, 0xff0000).setOrigin(0, 0.5).setDepth(6);

            s.shadowMinions.add(minion);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(minion, 'shadow_spawn');
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED SHADOWS!', '#8800ff');
    }
}
