import Phaser from 'phaser';
import {
    TOWER_WIDTH, TOWER_HEIGHT,
    TOWER_BOSS_TYPE, TOWER_BOSS_MINION, DIFF_COLORS
} from '../config/index.js';
import { BossAI } from '../systems/BossAI.js';

export class TowerBoss {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
        this.phase = 0;
        this.shieldActive = false;
        this.berserkActive = false;
    }

    spawnTowerBoss() {
        const s = this.scene;
        if (this.zone.bossSpawned) return;
        this.zone.bossSpawned = true;
        this.phase = 0;
        this.shieldActive = false;
        this.berserkActive = false;
        const bt = TOWER_BOSS_TYPE;
        const ox = s.towerOffsetX;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        const bx = ox + TOWER_WIDTH / 2;
        const by = 200; // Inside the room (room height = 600)
        const b = s.add.sprite(bx, by, 'fallen_king_walk').setDepth(5);
        console.log('[TowerBoss] Boss sprite created, visible:', b.visible, 'alpha:', b.alpha);
        s.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh);
        b.body.setCollideWorldBounds(true);
        if (s.anims.exists('fallen_king_walk_anim')) b.play('fallen_king_walk_anim');

        b.stats = {
            key: bt.key, name: bt.name,
            hp, maxHp: hp, damage: dmg, exp,
            speed: spd, bw: bt.bw, bh: bt.bh,
            shieldTimer: 0, shieldInterval: bt.shieldInterval,
            summonTimer: 0, summonInterval: bt.summonInterval,
            baseDamage: dmg, baseSpeed: spd
        };

        const hpW = 80;
        b.hpBg = s.add.rectangle(400, 110, hpW, 6, 0x000000).setDepth(12).setScrollFactor(0);
        b.hpFill = s.add.rectangle(400 - hpW / 2, 110, hpW, 6, 0xcc8800).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        b.hpBg.setVisible(false);
        b.hpFill.setVisible(false);
        s.towerBossNameText = s.add.text(400, 95, bt.name, {
            fontSize: '14px', fill: DIFF_COLORS[s.difficulty] || '#cc8800', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);

        s.towerBoss = b;
        s.towerBossVfx = [];
        s.enemies.add(b);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(b, 'towerBoss');
        }

        s.floatingText(bx, by - 60, 'FALLEN KING AWAKENS!', '#cc8800');
    }

    updateTowerBoss() {
        const s = this.scene;
        if (!s.towerBoss || !s.towerBoss.active) return;
        const b = s.towerBoss;
        const st = b.stats;

        if (s.menuOpen || s.transitioning) {
            b.body.setVelocity(0);
            return;
        }

        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.towerBossNameText, nameYOffset: -15, show: true
            });
        }

        const hpPct = st.hp / st.maxHp;

        // Phase transitions
        if (this.phase < 2 && hpPct <= TOWER_BOSS_TYPE.phaseThresholds[this.phase]) {
            this.phase++;
            s.floatingText(b.x, b.y - 60, 'PHASE ' + (this.phase + 1) + '!', '#ffcc00');

            // Phase 2: Bloodlust
            if (this.phase === 1) {
                st.damage = Math.floor(st.baseDamage * TOWER_BOSS_TYPE.bloodlustDmgMul);
                s.floatingText(b.x, b.y - 80, 'BLOODLUST!', '#ff0000');
            }
            // Phase 3: Berserk
            if (this.phase === 2) {
                this.berserkActive = true;
                st.damage = Math.floor(st.baseDamage * TOWER_BOSS_TYPE.berserkDmgMul);
                st.speed = Math.floor(st.baseSpeed * TOWER_BOSS_TYPE.berserkSpeedMul);
                s.floatingText(b.x, b.y - 80, 'BERSERK!', '#ff0000');
                // Spawn extra guardians
                this.spawnExtraGuardians(b);
            }
        }

        // Shield phase (every 12 seconds)
        if (!this.shieldActive) {
            st.shieldTimer += s.game.loop.delta;
            if (st.shieldTimer >= st.shieldInterval) {
                st.shieldTimer = 0;
                this.activateShield(b);
            }
        }

        const dx = s.player.x - b.x;
        const dy = s.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 30 && !this.shieldActive) {
            const nx = dx / dist;
            const ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('fallen_king_walk_anim') && !b.anims.isPlaying) b.play('fallen_king_walk_anim');
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const delta = s.game.loop.delta;

        st.summonTimer += delta;
        if (st.summonTimer >= st.summonInterval) {
            st.summonTimer = 0;
            this.summon(b);
        }
    }

    activateShield(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        this.shieldActive = true;
        boss.setTint(0x66aaff);
        s.floatingText(boss.x, boss.y - 60, 'SHIELD!', '#66aaff');

        s.time.delayedCall(TOWER_BOSS_TYPE.shieldDuration, () => {
            this.shieldActive = false;
            if (boss.active) boss.clearTint();
        });
    }

    spawnExtraGuardians(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = TOWER_BOSS_MINION;
        const ox = s.towerOffsetX;
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 80;
            const iy = boss.y + Math.sin(angle) * 80;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + TOWER_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, TOWER_HEIGHT - 10);

            const minion = s.add.sprite(clampedX, clampedY, 'tower_guardian_walk').setDepth(5);
            s.physics.add.existing(minion, false);
            minion.body.setSize(bt.bw, bt.bh);
            minion.body.setCollideWorldBounds(true);
            if (s.anims.exists('tower_guardian_walk_anim')) minion.play('tower_guardian_walk_anim');

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

            s.towerMinions.add(minion);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(minion, 'tower_guardian');
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED 4 GUARDIANS!', '#cc8800');
    }

    summon(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const bt = TOWER_BOSS_MINION;
        const ox = s.towerOffsetX;
        for (let i = 0; i < TOWER_BOSS_TYPE.summonCount; i++) {
            const angle = (i / TOWER_BOSS_TYPE.summonCount) * Math.PI * 2;
            const ix = boss.x + Math.cos(angle) * 60;
            const iy = boss.y + Math.sin(angle) * 60;
            const clampedX = Phaser.Math.Clamp(ix, ox + 10, ox + TOWER_WIDTH - 10);
            const clampedY = Phaser.Math.Clamp(iy, 10, TOWER_HEIGHT - 10);

            const minion = s.add.sprite(clampedX, clampedY, 'tower_guardian_walk').setDepth(5);
            s.physics.add.existing(minion, false);
            minion.body.setSize(bt.bw, bt.bh);
            minion.body.setCollideWorldBounds(true);
            if (s.anims.exists('tower_guardian_walk_anim')) minion.play('tower_guardian_walk_anim');

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

            s.towerMinions.add(minion);
            if (s.multiplayer && s.mpSync) {
                s.mpSync.assignMobId(minion, 'tower_guardian');
            }
        }
        s.floatingText(boss.x, boss.y - 50, 'SUMMONED GUARDIANS!', '#cc8800');
    }
}
