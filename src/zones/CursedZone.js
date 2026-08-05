import Phaser from 'phaser';
import {
    GAME_WIDTH,
    CURSED_WIDTH, CURSED_HEIGHT,
    BOSS_DROP_CHANCE, ZONE_BOSS_SECOND_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { CursedSpawner } from './CursedSpawner.js';
import { CursedBoss } from './CursedBoss.js';

export class CursedZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.spawner = new CursedSpawner(this);
        this.bossAI = new CursedBoss(this);
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - CURSED_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#0a1a0a');
        s.physics.world.setBounds(ox, 0, CURSED_WIDTH, CURSED_HEIGHT);
        s.cameras.main.setBounds(ox, 0, CURSED_WIDTH, CURSED_HEIGHT);
        s.cursedOffsetX = ox;

        s.cursedBg = s.add.tileSprite(ox, 0, CURSED_WIDTH, CURSED_HEIGHT, 'cursed_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + CURSED_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.cursedMinions = s.physics.add.group();
        s.cursedChests = s.physics.add.group();
        s.cursedBoss = null;
        this.bossDefeated = false;
        this.bossSpawned = false;
        s.cursedReturnPortal = null;

        this.spawner.spawnCursedCamps();
        this.spawner.spawnCursedChests();

        this.setupEnemyOverlap();
        this._setupMinionOverlap(s.cursedMinions);

        s.zone = 'cursed';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startCaveDrip(CURSED_WIDTH, CURSED_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        this._destroyGroup(s.cursedMinions);
        s.cursedMinions = null;
        this._destroyChestGroup(s.cursedChests);
        s.cursedChests = null;
        if (s.cursedBoss) {
            this._destroyBoss(s.cursedBoss, s.cursedBossNameText);
            s.cursedBoss = null;
            s.cursedBossNameText = null;
        }
        if (s.cursedBossVfx) {
            s.cursedBossVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.cursedBossVfx = null;
        }
        if (s.cursedBg) { s.cursedBg.destroy(); s.cursedBg = null; }
        if (s.cursedReturnPortal) { if (s.cursedReturnPortal.destroy) s.cursedReturnPortal.destroy(); s.cursedReturnPortal = null; }
        if (s.cursedReturnPortalHint) { s.cursedReturnPortalHint.destroy(); s.cursedReturnPortalHint = null; }
        if (s.cursedShadowPortal) { if (s.cursedShadowPortal.destroy) s.cursedShadowPortal.destroy(); s.cursedShadowPortal = null; }
        if (s.cursedShadowPortalHint) { if (s.cursedShadowPortalHint.destroy) s.cursedShadowPortalHint.destroy(); s.cursedShadowPortalHint = null; }
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc && !s.menuOpen) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'cursed') {
            // Check shadow portal
            if (this.bossDefeated && s.cursedShadowPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.cursedShadowPortal.x, s.cursedShadowPortal.y
            ) < 60) {
                this.enterShadow();
                return;
            }
            if (this.bossDefeated && s.cursedReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.cursedReturnPortal.x, s.cursedReturnPortal.y
            ) < 60) {
                this.exitCursed();
            } else {
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateCursedMobs(delta);
        this.bossAI.updateCursedBoss();
        this.updateCursedMinions();
        this.checkReturnPortal();
    }

    updateCursedMobs(delta) {
        this._updateMobs(delta, 'cursed', this.bossAI.spawnCursedBoss);
    }

    updateCursedMinions() {
        this._updateMinionGroup(this.scene.cursedMinions, 'cursed');
    }

    victoryCursedBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.cursedOffsetX;

        if (s.cursedBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.cursedBoss.x, s.cursedBoss.y);
            if (s.cursedBoss.hpBg) { s.cursedBoss.hpBg.destroy(); s.cursedBoss.hpBg = null; }
            if (s.cursedBoss.hpFill) { s.cursedBoss.hpFill.destroy(); s.cursedBoss.hpFill = null; }
            if (s.cursedBossNameText) { s.cursedBossNameText.destroy(); s.cursedBossNameText = null; }
            s.cursedBoss.destroy();
            s.cursedBoss = null;
        }

        s.defeatedText = s.add.text(ox + CURSED_WIDTH / 2, 250, 'ANCIENT EVIL DEFEATED!', {
            fontSize: '26px', fill: '#00aa00', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({
            targets: s.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; }
        });

        s.defeatedLoot = [];
        const lootItems = [];

        if (Math.random() < ZONE_BOSS_SECOND_DROP_CHANCE) {
            const item = rollEquip();
            if (s.addEquip(item)) {
                lootItems.push(item);
                playLoot();
            }
        }

        if (Math.random() < BOSS_DROP_CHANCE) {
            const accItem = rollZoneAccountEquip('cursed');
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + CURSED_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        s.cursedReturnPortal = s.add.sprite(ox + CURSED_WIDTH / 2, CURSED_HEIGHT - 100, 'portal').setDepth(6).setScale(1.2).setTint(0x00aa00);
        s.cursedReturnPortalHint = s.add.text(ox + CURSED_WIDTH / 2, CURSED_HEIGHT - 115, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        // Shadow Dimension portal
        if (!s.cursedShadowPortal && this.bossDefeated) {
            const spx = ox + CURSED_WIDTH / 2;
            const spy = CURSED_HEIGHT / 2;
            s.cursedShadowPortal = s.add.sprite(spx, spy, 'portal').setDepth(6).setScale(1.2).setTint(0x8800ff);
            s.tweens.add({ targets: s.cursedShadowPortal, y: spy - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            s.cursedShadowPortalHint = s.add.text(spx, spy - 14, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
        }

        s.time.delayedCall(3000, () => {
            if (s.zone === 'cursed') {
                s.floatingText(ox + CURSED_WIDTH / 2, CURSED_HEIGHT - 130,
                    'Portal to Depths appeared!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('cursed', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + CURSED_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + CURSED_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterCursed() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 10, 20, 10);
        s.time.delayedCall(800, () => {
            s._setupZone('cursed');
            s.cameras.main.fadeIn(500, 10, 20, 10);
            s.transitioning = false;
        });
    }

    exitCursed() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'cursed' || !this.bossDefeated) return;
        const ox = s.cursedOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + CURSED_WIDTH / 2, CURSED_HEIGHT - 100
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('depths');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    updateCursedMinions() {
        const s = this.scene;
        if (s.zone !== 'cursed' || s.menuOpen || s.transitioning) return;
        if (!s.cursedMinions) return;
        s.cursedMinions.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const aggroMinion = s.getAggroTarget();
            const dx = aggroMinion.x - e.x;
            const dy = aggroMinion.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                const spd = e.stats.speed || 80;
                if (dist > 20) {
                    e.body.setVelocity((dx / dist) * spd, (dy / dist) * spd);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }
            } else {
                e.body.setVelocity(0);
            }
            if (e.hpBg) { e.hpBg.x = e.x; e.hpBg.y = e.y - e.stats.bh / 2 - 6; }
            if (e.hpFill) { e.hpFill.x = e.x; e.hpFill.y = e.y - e.stats.bh / 2 - 6; }
        });
    }

    checkReturnPortal() {
        const s = this.scene;
        if (s.zone !== 'cursed' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.cursedReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.cursedReturnPortal.x, s.cursedReturnPortal.y
            );
            if (pd < 80) {
                s.cursedReturnPortalHint.setText('SPACE = return to Depths');
            } else if (s.cursedReturnPortalHint) {
                s.cursedReturnPortalHint.setText('');
            }
        }
        if (this.bossDefeated && s.cursedShadowPortal) {
            const spd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.cursedShadowPortal.x, s.cursedShadowPortal.y
            );
            if (spd < 80) {
                if (s.cursedShadowPortalHint) s.cursedShadowPortalHint.setText('SPACE = enter Shadow Dimension');
            } else if (s.cursedShadowPortalHint) {
                s.cursedShadowPortalHint.setText('');
            }
        }
    }

    enterShadow() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (!this.bossDefeated) return;
        const ox = s.cursedOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + CURSED_WIDTH / 2, CURSED_HEIGHT / 2
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 5, 0, 16);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('shadow');
            s.cameras.main.fadeIn(500, 5, 0, 16);
            s.transitioning = false;
        });
    }
}
