import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, ARENA_EXIT_POS, BOSS_TYPE, RARITY_COLORS, DIFF_COLORS } from '../config/index.js';
import { playPortal, playBossDeath, startZoneMusic } from '../sound.js';
import { rollEquip, rollAccountEquip } from '../utils.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';
import { onKill } from '../quests.js';
import { BaseZone } from '../systems/BaseZone.js';

export class ArenaZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossAlive = false;
    }

    setup() {
        const s = this.scene;
        s.cameras.main.setBackgroundColor('#0d0d1a');
        s.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
        s.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);

        s.add.image(400, 300, 'boss_ground').setDepth(0);

        s.exitPortal = s.add.sprite(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y, s.zones.mine.isUnlocked ? 'mine_ladder' : 'boss_portal').setDepth(1);
        s.exitPortalGlow = s.add.image(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y, 'portal_glow').setDepth(0).setScale(2);
        if (s.zones.mine.isUnlocked) {
            s.exitPortalGlow.setTint(0xf1c40f).setAlpha(0.5);
        } else {
            s.exitPortalGlow.setTint(0x9b59b6).setAlpha(0.6);
        }
        s.tweens.add({
            targets: s.exitPortalGlow,
            alpha: { from: 0.3, to: 0.7 },
            duration: 1800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        if (!s.zones.mine.isUnlocked && s.particles) {
            s.particles.startPortalParticles(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y, [0x9b59b6, 0xaa66cc, 0xbb77dd]);
        }
        s.exitHint = s.add.text(ARENA_EXIT_POS.x, ARENA_EXIT_POS.y + 55, '', {
            fontSize: '11px', fill: '#aa50ee', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.player.x = 400;
        s.player.y = 500;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.stopFollow();

        this.bossAlive = false;
        this.bossDefeated = s.zones.mine.isUnlocked;

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();

        if (!s.zones.mine.isUnlocked) {
            this.spawnBoss();
        }

        this.setupEnemyOverlap();

        s.zone = 'arena';
        s.hintText.setText(s.zones.mine.isUnlocked ? 'Enter the Mine! | I=inventory | TAB=stats | P=pause' : 'Defeat the Ancient Treant! | I=inventory | TAB=stats | P=pause');
        startZoneMusic('arena');
    }

    _destroyZoneSpecific() {
        const s = this.scene;
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
        this._destroyDefeatedUI();
        this._destroyStumps();
        if (s.exitPortal) { s.exitPortal.destroy(); s.exitPortal = null; }
        if (s.exitPortalGlow) { s.exitPortalGlow.destroy(); s.exitPortalGlow = null; }
        if (s.exitHint) { s.exitHint.destroy(); s.exitHint = null; }
        this.bossAlive = false;
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.player.y > 500) {
            this.exitArena();
        } else if (!this.bossDefeated) {
            s.attack();
        }
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

        this.bossAlive = true;
        s.enemies.add(s.boss);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(s.boss, 'boss');
        }
    }

    checkExitProximity() {
        const s = this.scene;
        if (s.zone !== 'arena' || s.transitioning || s.menuOpen) return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, ARENA_EXIT_POS.x, ARENA_EXIT_POS.y);
        if (dist < 50) {
            s.exitHint.setText(s.zones.mine.isUnlocked ? 'SPACE to enter the Mine' : 'SPACE to exit');
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
            if (s.zones.mine.isUnlocked) {
                s._setupZone('mine');
            } else {
                s._setupZone('forest');
            }
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }
}
