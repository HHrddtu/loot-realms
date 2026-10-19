import Phaser from 'phaser';
import {
    SWAMP_WIDTH, SWAMP_HEIGHT,
    SWAMP_BOSS_TYPE, SWAMP_BOSS_MINION, DIFF_COLORS,
    BOSS_HP_BAR_WIDTH, BOSS_MINION_SPEED
} from '../config/index.js';
import { BossAI } from '../systems/BossAI.js';

export class SwampBoss {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
        this.phase = 0;
    }

    spawnSwampBoss() {
        const s = this.scene;
        if (this.zone.bossSpawned) return;
        this.zone.bossSpawned = true;
        this.phase = 0;
        const bt = SWAMP_BOSS_TYPE;
        const ox = s.swampOffsetX;
        const hp = Math.floor(bt.hp);
        const dmg = Math.floor(bt.dmg);
        const exp = Math.floor(bt.exp);
        const spd = bt.speed;

        const bx = ox + SWAMP_WIDTH / 2;
        const by = SWAMP_HEIGHT - 150;
        const b = s.add.sprite(bx, by, bt.texKey || bt.key).setDepth(5);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            splitTimer: 0, splitInterval: bt.splitInterval,
            acidSpitTimer: 0, acidSpitInterval: bt.acidSpitInterval,
            summonTimer: 0, summonInterval: bt.summonInterval
        };

        const hpW = BOSS_HP_BAR_WIDTH;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0x3aaa3a).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.swampBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#3aaa3a', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.swampBoss = b;
        s.swampBoss.bossHandler = () => { if (s.zones.swamp) s.zones.swamp.victorySwampBoss(); };
        s.swampBossVfx = [];
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(b, 'swampBoss');
        }

        s.floatingText(bx, by - 60, 'SLIME KING AWAKENS!', '#3aaa3a');
    }

    updateSwampBoss() {
        const s = this.scene;
        if (!s.swampBoss || !s.swampBoss.active) return;
        const b = s.swampBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.swampBossNameText, nameYOffset: -15, show: true
            });
        }

        const hpPct = st.hp / st.maxHp;
        if (this.phase < 2 && hpPct <= SWAMP_BOSS_TYPE.phaseThresholds[this.phase]) {
            this.phase++;
            s.floatingText(b.x, b.y - 60, 'PHASE ' + (this.phase + 1) + '!', '#2ecc71');
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
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const delta = s.game.loop.delta;

        st.splitTimer += delta;
        if (st.splitTimer >= st.splitInterval) {
            st.splitTimer = 0;
            this.split(b);
        }

        st.acidSpitTimer += delta;
        if (st.acidSpitTimer >= st.acidSpitInterval) {
            st.acidSpitTimer = 0;
            this.acidSpit(b);
        }

        st.summonTimer += delta;
        if (st.summonTimer >= st.summonInterval) {
            st.summonTimer = 0;
            this.summon(b);
        }
    }

    split(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
        if (dist > 100) return;

        const dmg = Math.floor(boss.stats.damage * 0.7);
        s.combat.takeDamage(dmg);
        s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' SPLIT', '#3aaa3a');
        s.cameras.main.flash(150, 30, 120, 30, true);
    }

    acidSpit(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 220) return;

        const dmg = Math.floor(boss.stats.damage * SWAMP_BOSS_TYPE.acidSpitDmgMul);
        const vfx = s.add.circle(boss.x, boss.y, 12, 0x3aaa3a, 0.6).setDepth(8);
        if (s.swampBossVfx) s.swampBossVfx.push(vfx);
        s.tweens.add({
            targets: vfx, x: s.player.x, y: s.player.y, alpha: 0, duration: 400,
            onComplete: () => { if (vfx.active) vfx.destroy(); }
        });
        s.time.delayedCall(400, () => {
            const pd = Phaser.Math.Distance.Between(boss.x, boss.y, s.player.x, s.player.y);
            if (pd < 110) {
                s.combat.takeDamage(dmg);
                s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' ACID', '#3aaa3a');
            }
        });
    }

    summon(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = SWAMP_BOSS_MINION;
        const ox = s.swampOffsetX;
        for (let i = 0; i < SWAMP_BOSS_TYPE.summonCount; i++) {
            const angle = (i / SWAMP_BOSS_TYPE.summonCount) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 60;
            const iy = boss.y + Math.sin(angle) * 60;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + SWAMP_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, SWAMP_HEIGHT - 10);

            const minion = s.add.sprite(clampedX, clampedY, bt.texKey || bt.key).setDepth(5);
            s.physics.add.existing(minion, false);
            minion.body.setSize(bt.bw, bt.bh);
            minion.body.setCollideWorldBounds(true);

            const hp = Math.floor(bt.hp * s.diffMulti.hp);
            minion.stats = {
                key: bt.key, name: bt.name,
                hp, maxHp: hp,
                damage: Math.floor(bt.dmg * s.diffMulti.dmg),
                exp: Math.floor(bt.exp * s.diffMulti.exp),
                bw: bt.bw, bh: bt.bh, speed: BOSS_MINION_SPEED
            };

            const hpW = bt.bw + 6;
            minion.hpBg = s.add.rectangle(clampedX, clampedY - bt.bh / 2 - 6, hpW, 3, 0x000000).setDepth(15);
            minion.hpFill = s.add.rectangle(clampedX - hpW / 2, clampedY - bt.bh / 2 - 6, hpW, 3, 0xff0000).setOrigin(0, 0.5).setDepth(15);

            s.swampMinions.add(minion);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(minion, 'slime_spawn');
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED ' + SWAMP_BOSS_TYPE.summonCount + ' SLIME SPAWNS!', '#3aaa3a');
    }
}