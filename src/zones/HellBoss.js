import Phaser from 'phaser';
import {
    HELL_WIDTH, HELL_HEIGHT,
    HELL_BOSS_TYPE, HELL_BOSS_MINION, DIFF_COLORS
} from '../config/index.js';
import { BossAI } from '../systems/BossAI.js';

export class HellBoss {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnHellBoss() {
        const s = this.scene;
        if (this.zone.bossSpawned) return;
        this.zone.bossSpawned = true;
        const bt = HELL_BOSS_TYPE;
        const ox = s.hellOffsetX;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        const bx = ox + HELL_WIDTH / 2;
        const by = HELL_HEIGHT / 2;
        const b = s.add.sprite(bx, by, 'red_demon_walk').setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);
        if (s.anims.exists('red_demon_walk_anim')) b.play('red_demon_walk_anim');

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            aoeTimer: 0, aoeInterval: bt.fireWaveInterval,
            meteorTimer: 0, meteorInterval: bt.meteorInterval,
            summonTimer: 0, summonInterval: bt.summonInterval
        };

        const hpW = 80;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0xff2200).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.hellBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#ff4400', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.hellBoss = b;
        s.hellBossFireWaveVfx = [];
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(b, 'hellBoss');
        }

        s.floatingText(bx, by - 60, 'RED DEMON APPEARS!', '#ff2200');
    }

    updateHellBoss() {
        const s = this.scene;
        if (!s.hellBoss || !s.hellBoss.active) return;
        const b = s.hellBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.hellBossNameText, nameYOffset: -15, show: true
            });
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('red_demon_walk_anim') && !b.anims.isPlaying) b.play('red_demon_walk_anim');
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const delta = s.game.loop.delta;

        st.aoeTimer += delta;
        if (st.aoeTimer >= st.aoeInterval) {
            st.aoeTimer = 0;
            this.fireWave(b);
        }

        st.meteorTimer += delta;
        if (st.meteorTimer >= st.meteorInterval) {
            st.meteorTimer = 0;
            this.meteor(b);
        }

        st.summonTimer += delta;
        if (st.summonTimer >= st.summonInterval) {
            st.summonTimer = 0;
            this.summon(b);
        }
    }

    fireWave(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 200) return;

        const dmg = Math.floor(boss.stats.damage * HELL_BOSS_TYPE.fireWaveDmgMul);
        const radius = HELL_BOSS_TYPE.fireWaveRadius;

        const vfx = s.add.sprite(boss.x, boss.y, 'fire_wave_vfx').setDepth(8).setScale(2).setAlpha(0.7);
        s.hellBossFireWaveVfx.push(vfx);
        s.tweens.add({
            targets: vfx, x: s.player.x, y: s.player.y, alpha: 0, duration: 500,
            onComplete: () => { if (vfx.active) vfx.destroy(); }
        });

        s.time.delayedCall(500, () => {
            const pd = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
            if (pd < radius) {
                s.combat.takeDamage(dmg);
                s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' FIRE WAVE', '#ff4400');
            }
        });
    }

    meteor(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const ox = s.hellOffsetX;
        for (let i = 0; i < 3; i++) {
            const mx = s.player.x + Phaser.Math.Between(-80, 80);
            const my = s.player.y + Phaser.Math.Between(-80, 80);
            const clampedX = Phaser.Math.Clamp(mx, ox + 20, ox + HELL_WIDTH - 20);
            const clampedY = Phaser.Math.Clamp(my, 20, HELL_HEIGHT - 20);

            const meteor = s.add.sprite(clampedX, clampedY - 200, 'meteor_vfx').setDepth(8).setAlpha(0.8);
            s.tweens.add({
                targets: meteor, y: clampedY, alpha: 1, duration: 800, delay: i * 200,
                ease: 'Quad.easeIn',
                onComplete: () => {
                    if (meteor.active) meteor.destroy();
                    const pd = Phaser.Math.Distance.Between(clampedX, clampedY, s.player.x, s.player.y);
                    if (pd < HELL_BOSS_TYPE.meteorRadius) {
                        const dmg = Math.floor(boss.stats.damage * HELL_BOSS_TYPE.meteorDmgMul);
                        s.combat.takeDamage(dmg);
                        s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' METEOR', '#ff6600');
                    }
                }
            });
        }
    }

    summon(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = HELL_BOSS_MINION;
        const ox = s.hellOffsetX;
        for (let i = 0; i < HELL_BOSS_TYPE.summonCount; i++) {
            const angle = (i / HELL_BOSS_TYPE.summonCount) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 60;
            const iy = boss.y + Math.sin(angle) * 60;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + HELL_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, HELL_HEIGHT - 10);

            const imp = s.add.sprite(clampedX, clampedY, 'hell_imp_walk').setDepth(5);
            s.physics.add.existing(imp, false);
            imp.body.setSize(bt.bw, bt.bh);
            imp.body.setCollideWorldBounds(true);
            if (s.anims.exists('hell_imp_walk_anim')) imp.play('hell_imp_walk_anim');

            const hp = Math.floor(bt.hp * s.diffMulti.hp);
            imp.stats = {
                key: bt.key, name: bt.name,
                hp, maxHp: hp,
                damage: Math.floor(bt.dmg * s.diffMulti.dmg),
                exp: Math.floor(bt.exp * s.diffMulti.exp),
                bw: bt.bw, bh: bt.bh, speed: 80
            };

            const hpW = bt.bw + 6;
            imp.hpBg = s.add.rectangle(clampedX, clampedY - bt.bh / 2 - 6, hpW, 3, 0x000000).setDepth(6);
            imp.hpFill = s.add.rectangle(clampedX - hpW / 2, clampedY - bt.bh / 2 - 6, hpW, 3, 0xff0000).setOrigin(0, 0.5).setDepth(6);

            s.hellImps.add(imp);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(imp, 'hell_imp');
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED ' + HELL_BOSS_TYPE.summonCount + ' IMPS!', '#ff4400');
    }
}
