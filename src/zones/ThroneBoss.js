import Phaser from 'phaser';
import {
    THRONE_WIDTH, THRONE_HEIGHT,
    THRONE_BOSS_TYPE, THRONE_BOSS_MINION_TANK, THRONE_BOSS_MINION_MAGE, THRONE_BOSS_MINION_ASSASSIN,
    DIFF_COLORS
} from '../config/index.js';
import { BossAI } from '../systems/BossAI.js';

export class ThroneBoss {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
        this.phase = 0;
        this.healed = false;
    }

    spawnThroneBoss() {
        const s = this.scene;
        if (this.zone.bossSpawned) return;
        this.zone.bossSpawned = true;
        this.phase = 0;
        this.healed = false;
        const bt = THRONE_BOSS_TYPE;
        const ox = s.throneOffsetX;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        const bx = ox + THRONE_WIDTH / 2;
        const by = 200;
        const b = s.add.sprite(bx, by, 'eternity_lord_walk').setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);
        if (s.anims.exists('eternity_lord_walk_anim')) b.play('eternity_lord_walk_anim');

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            auraTimer: 0, auraInterval: bt.auraInterval,
            summonTimer: 0, summonInterval: 12000
        };

        const hpW = 80;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0xffd700).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.throneBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#ffd700', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.throneBoss = b;
        s.throneBossVfx = [];
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(b, 'throneBoss');
        }

        s.floatingText(bx, by - 60, 'ETERNITY LORD AWAKENS!', '#ffd700');
    }

    updateThroneBoss() {
        const s = this.scene;
        if (!s.throneBoss || !s.throneBoss.active) return;
        const b = s.throneBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.throneBossNameText, nameYOffset: -15, show: true
            });
        }

        const hpPct = st.hp / st.maxHp;

        // Phase transitions
        if (this.phase < 3 && hpPct <= THRONE_BOSS_TYPE.phaseThresholds[this.phase]) {
            this.phase++;
            s.floatingText(b.x, b.y - 60, 'PHASE ' + (this.phase + 1) + '!', '#ff0000');

            // Phase 2: Heal to 50%
            if (this.phase === 1 && !this.healed) {
                this.healed = true;
                st.hp = Math.floor(st.maxHp * THRONE_BOSS_TYPE.healAmount);
                s.floatingText(b.x, b.y - 80, 'HEALING!', '#00ff00');
            }
            // Phase 3: Spawn assassins
            if (this.phase === 2) {
                this.spawnPhaseMinions(b, 'assassin', THRONE_BOSS_TYPE.summonPhase4.assassin);
            }
        }

        // Aura damage
        st.auraTimer += s.game.loop.delta;
        if (st.auraTimer >= st.auraInterval) {
            st.auraTimer = 0;
            this.shadowAura(b);
        }

        // Summon minions
        st.summonTimer += s.game.loop.delta;
        if (st.summonTimer >= st.summonInterval) {
            st.summonTimer = 0;
            if (this.phase === 1) {
                this.spawnPhaseMinions(b, 'tank', THRONE_BOSS_TYPE.summonPhase2.tank);
                this.spawnPhaseMinions(b, 'mage', THRONE_BOSS_TYPE.summonPhase2.mage);
            } else if (this.phase >= 2) {
                this.spawnPhaseMinions(b, 'assassin', THRONE_BOSS_TYPE.summonPhase4.assassin);
            }
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('eternity_lord_walk_anim') && !b.anims.isPlaying) b.play('eternity_lord_walk_anim');
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }
    }

    shadowAura(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
        if (dist > THRONE_BOSS_TYPE.auraRadius) return;

        const dmg = Math.floor(boss.stats.damage * THRONE_BOSS_TYPE.auraDmgMul);
        s.combat.takeDamage(dmg);
        s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' ETERNITY', '#ffd700');
    }

    spawnPhaseMinions(boss, type, count) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = type === 'tank' ? THRONE_BOSS_MINION_TANK :
                   type === 'mage' ? THRONE_BOSS_MINION_MAGE :
                   THRONE_BOSS_MINION_ASSASSIN;
        const texKey = type === 'tank' ? 'eternity_spawn_1_walk' :
                       type === 'mage' ? 'eternity_spawn_2_walk' :
                       'eternity_spawn_3_walk';
        const ox = s.throneOffsetX;

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 80;
            const iy = boss.y + Math.sin(angle) * 80;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + THRONE_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, THRONE_HEIGHT - 10);

            const minion = s.add.sprite(clampedX, clampedY, texKey).setDepth(5);
            s.physics.add.existing(minion, false);
            minion.body.setSize(bt.bw, bt.bh);
            minion.body.setCollideWorldBounds(true);
            if (s.anims.exists(texKey.replace('_walk', '_walk_anim'))) minion.play(texKey.replace('_walk', '_walk_anim'));

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

            s.throneMinions.add(minion);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(minion, bt.key);
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED ' + count + ' ' + type.toUpperCase() + 'S!', '#ff0000');
    }
}
