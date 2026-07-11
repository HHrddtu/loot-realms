import Phaser from 'phaser';
import {
    CURSED_WIDTH, CURSED_HEIGHT,
    CURSED_BOSS_TYPE, CURSED_BOSS_MINION, DIFF_COLORS
} from '../config/index.js';
import { BossAI } from '../systems/BossAI.js';

export class CursedBoss {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
        this.phase = 0;
    }

    spawnCursedBoss() {
        const s = this.scene;
        if (this.zone.bossSpawned) return;
        this.zone.bossSpawned = true;
        this.phase = 0;
        const bt = CURSED_BOSS_TYPE;
        const ox = s.cursedOffsetX;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        const bx = ox + CURSED_WIDTH / 2;
        const by = CURSED_HEIGHT - 150;
        const b = s.add.sprite(bx, by, 'ancient_evil_walk').setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);
        if (s.anims.exists('ancient_evil_walk_anim')) b.play('ancient_evil_walk_anim');

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            poisonAuraTimer: 0, poisonAuraInterval: bt.poisonAuraInterval,
            deathWaveTimer: 0, deathWaveInterval: bt.deathWaveInterval,
            summonTimer: 0, summonInterval: bt.summonInterval
        };

        const hpW = 80;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0x00aa00).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.cursedBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#00aa00', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.cursedBoss = b;
        s.cursedBossVfx = [];
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(b, 'cursedBoss');
        }

        s.floatingText(bx, by - 60, 'ANCIENT EVIL AWAKENS!', '#00aa00');
    }

    updateCursedBoss() {
        const s = this.scene;
        if (!s.cursedBoss || !s.cursedBoss.active) return;
        const b = s.cursedBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.cursedBossNameText, nameYOffset: -15, show: true
            });
        }

        const hpPct = st.hp / st.maxHp;
        if (this.phase < 2 && hpPct <= CURSED_BOSS_TYPE.phaseThresholds[this.phase]) {
            this.phase++;
            s.floatingText(b.x, b.y - 60, 'PHASE ' + (this.phase + 1) + '!', '#00ff00');
            st.damage = Math.floor(st.damage * 1.2);
            st.speed = Math.floor(st.speed * 1.1);
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('ancient_evil_walk_anim') && !b.anims.isPlaying) b.play('ancient_evil_walk_anim');
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const delta = s.game.loop.delta;

        st.poisonAuraTimer += delta;
        if (st.poisonAuraTimer >= st.poisonAuraInterval) {
            st.poisonAuraTimer = 0;
            this.poisonAura(b);
        }

        st.deathWaveTimer += delta;
        if (st.deathWaveTimer >= st.deathWaveInterval) {
            st.deathWaveTimer = 0;
            this.deathWave(b);
        }

        st.summonTimer += delta;
        if (st.summonTimer >= st.summonInterval) {
            st.summonTimer = 0;
            this.summon(b);
        }
    }

    poisonAura(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
        if (dist > CURSED_BOSS_TYPE.poisonAuraRadius) return;

        const dmg = Math.floor(boss.stats.damage * CURSED_BOSS_TYPE.poisonAuraDmgMul);
        s.combat.takeDamage(dmg);
        s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' POISON', '#00aa00');
        // Subtle green tint instead of red flash
        s.cameras.main.flash(150, 0, 60, 0, true);
    }

    deathWave(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 200) return;

        const dmg = Math.floor(boss.stats.damage * CURSED_BOSS_TYPE.deathWaveDmgMul);
        const radius = CURSED_BOSS_TYPE.deathWaveRadius;

        const vfx = s.add.sprite(boss.x, boss.y, 'death_wave_vfx').setDepth(8).setScale(2).setAlpha(0.7);
        if (s.cursedBossVfx) s.cursedBossVfx.push(vfx);
        s.tweens.add({
            targets: vfx, x: s.player.x, y: s.player.y, alpha: 0, duration: 500,
            onComplete: () => { if (vfx.active) vfx.destroy(); }
        });

        s.time.delayedCall(500, () => {
            const pd = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
            if (pd < radius) {
                s.combat.takeDamage(dmg);
                s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' DEATH WAVE', '#00aa00');
            }
        });
    }

    summon(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = CURSED_BOSS_MINION;
        const ox = s.cursedOffsetX;
        for (let i = 0; i < CURSED_BOSS_TYPE.summonCount; i++) {
            const angle = (i / CURSED_BOSS_TYPE.summonCount) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 60;
            const iy = boss.y + Math.sin(angle) * 60;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + CURSED_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, CURSED_HEIGHT - 10);

            const minion = s.add.sprite(clampedX, clampedY, 'zombie_walk').setDepth(5);
            s.physics.add.existing(minion, false);
            minion.body.setSize(bt.bw, bt.bh);
            minion.body.setCollideWorldBounds(true);
            if (s.anims.exists('zombie_walk_anim')) minion.play('zombie_walk_anim');

            const hp = Math.floor(bt.hp * s.diffMulti.hp);
            minion.stats = {
                key: bt.key, name: bt.name,
                hp, maxHp: hp,
                damage: Math.floor(bt.dmg * s.diffMulti.dmg),
                exp: Math.floor(bt.exp * s.diffMulti.exp),
                bw: bt.bw, bh: bt.bh, speed: 80
            };

            const hpW = bt.bw + 6;
            minion.hpBg = s.add.rectangle(clampedX, clampedY - bt.bh / 2 - 6, hpW, 3, 0x000000).setDepth(15);
            minion.hpFill = s.add.rectangle(clampedX - hpW / 2, clampedY - bt.bh / 2 - 6, hpW, 3, 0xff0000).setOrigin(0, 0.5).setDepth(15);

            s.cursedMinions.add(minion);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(minion, 'death_zombie');
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED ' + CURSED_BOSS_TYPE.summonCount + ' ZOMBIES!', '#00aa00');
    }
}
