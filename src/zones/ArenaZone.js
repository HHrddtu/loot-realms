import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, ARENA_EXIT_POS, BOSS_TYPE, RARITY_COLORS, DIFF_COLORS } from '../config/index.js';
import { playPortal, playBossDeath, startZoneMusic } from '../sound.js';
import { rollEquip, rollAccountEquip } from '../utils.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';
import { onKill } from '../quests.js';

export class ArenaZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup() {
        const s = this.scene;
        s.cameras.main.setBackgroundColor('#0d0d1a');
        s.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
        s.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);

        s.add.image(400, 300, 'boss_ground').setDepth(0);

        s.exitPortal = s.add.sprite(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y, s.mineUnlocked ? 'mine_ladder' : 'boss_portal').setDepth(1);
        s.exitHint = s.add.text(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y + 50, '', {
            fontSize: '11px', fill: '#aa50ee', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.player.x = 400;
        s.player.y = 500;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.stopFollow();

        s.bossAlive = false;
        s.bossDefeated = s.mineUnlocked;

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();

        if (!s.mineUnlocked) {
            this.spawnBoss();
        }

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'arena';
        s.hintText.setText(s.mineUnlocked ? 'Enter the Mine! | I=inventory | TAB=stats | P=pause' : 'Defeat the Ancient Treant! | I=inventory | TAB=stats | P=pause');
        startZoneMusic('arena');
    }

    clear() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        if (s.fireballs) {
            s.fireballs.forEach(fb => { if (fb.glow) fb.glow.destroy(); fb.destroy(); });
            s.fireballs = [];
        }
        if (s.enemyProjectiles) {
            s.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.enemyProjectiles = [];
        }
        if (s.shieldActive) {
            s.shieldActive = false;
            s.shieldHP = 0;
            if (s.shieldVfx) { s.shieldVfx.destroy(); s.shieldVfx = null; }
        }
        if (s.boss) {
            if (s.boss.hpBg) s.boss.hpBg.destroy();
            if (s.boss.hpFill) s.boss.hpFill.destroy();
            if (s.bossNameText) s.bossNameText.destroy();
            if (s.boss.aoeRing) { s.boss.aoeRing.destroy(); s.boss.aoeRing = null; }
            if (s.boss.aoeRing2) { s.boss.aoeRing2.destroy(); s.boss.aoeRing2 = null; }
            if (s.boss.telegraph) { s.boss.telegraph.destroy(); s.boss.telegraph = null; }
            s.boss.destroy();
            s.boss = null;
        }
        if (s.bossTimer) { s.bossTimer.destroy(); s.bossTimer = null; }
        if (s.defeatedText) { s.defeatedText.destroy(); s.defeatedText = null; }
        if (s.defeatedLoot) {
            s.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.defeatedLoot = null;
        }
        if (s.enemies && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
        if (s.stumps && s.stumps.getLength && s.stumps.getLength() > 0) {
            s.stumps.getChildren().forEach(st => {
                if (st.hpBg) st.hpBg.destroy();
                if (st.hpFill) st.hpFill.destroy();
            });
            s.stumps.clear(true, true);
        }
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
        if (s.exitPortal) { s.exitPortal.destroy(); s.exitPortal = null; }
        if (s.exitHint) { s.exitHint.destroy(); s.exitHint = null; }
        s.bossAlive = false;
    }

    update(time, delta) {
        this.checkExitProximity();
    }

    spawnBoss() {
        const s = this.scene;
        const bt = BOSS_TYPE;
        const hp = Math.floor(bt.hp[s.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[s.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[s.difficulty] || bt.exp.Normal);
        const spd = bt.speeds[s.difficulty] || bt.speeds.Normal;

        s.boss = s.add.sprite(400, 180, 'treant_boss').setDepth(5);
        s.physics.add.existing(s.boss, false);
        s.boss.body.setSize(bt.bw, bt.bh);
        s.boss.body.setCollideWorldBounds(true);

        s.boss.stats = {
            name: bt.name,
            hp: hp, maxHp: hp,
            damage: dmg, exp: exp,
            speed: spd,
            bw: bt.bw, bh: bt.bh,
            aoeTimer: 0, aoeInterval: bt.aoeInterval,
            aoeDmgMul: bt.aoeDmgMul, aoeRadius: bt.aoeRadius,
            phase: 1,
            aiState: 'chase',
            attackTimer: 2500,
            cooldownTimer: 0,
            currentAttack: null,
            invulnerable: false,
            baseSpeed: spd,
            baseDamage: dmg,
            telegraphTimer: 0,
            attackDuration: 0,
            transitioning: false,
            phaseTriggered: false,
            slamCooldown: 0,
            rootCooldown: 0,
            chargeCooldown: 0
        };

        const hw = bt.bw + 20;
        s.boss.hpBg = s.add.rectangle(400, 130, hw, 5, 0x222222).setOrigin(0.5).setDepth(15);
        s.boss.hpFill = s.add.rectangle(400, 130, hw, 5, 0xe74c3c).setOrigin(0.5).setDepth(15);

        s.bossNameText = s.add.text(400, 118, bt.name, {
            fontSize: '12px', fill: DIFF_COLORS[s.scene.difficulty] || '#ff4444', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(15);

        s.bossAlive = true;
        s.enemies.add(s.boss);
    }

    checkExitProximity() {
        const s = this.scene;
        if (s.zone !== 'arena' || s.transitioning || s.menuOpen) return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, ARENA_EXIT_POS.x, ARENA_EXIT_POS.y);
        if (dist < 50) {
            s.exitHint.setText(s.mineUnlocked ? 'SPACE to enter the Mine' : 'SPACE to exit');
        } else {
            s.exitHint.setText('');
        }
    }

    exitArena() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'arena') return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, ARENA_EXIT_POS.x, ARENA_EXIT_POS.y);
        if (dist >= 50) return;

        s.transitioning = true;
        s.exitHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(500, 0, 0, 0);
        s.time.delayedCall(500, () => {
            this.clear();
            if (s.mineUnlocked) {
                s._setupZone('mine');
            } else {
                s._setupZone('forest');
            }
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }
}
