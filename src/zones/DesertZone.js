import Phaser from 'phaser';
import {
    GAME_WIDTH,
    DESERT_WIDTH, DESERT_HEIGHT,
    BOSS_DROP_CHANCE, ZONE_BOSS_SECOND_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { DesertSpawner } from './DesertSpawner.js';
import { DesertBoss } from './DesertBoss.js';

export class DesertZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.spawner = new DesertSpawner(this);
        this.bossAI = new DesertBoss(this);
    }

    setup() {
        const s = this.scene;
        const ox = (GAME_WIDTH - DESERT_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#1a1408');
        s.physics.world.setBounds(ox, 0, DESERT_WIDTH, DESERT_HEIGHT);
        s.cameras.main.setBounds(ox, 0, DESERT_WIDTH, DESERT_HEIGHT);
        s.desertOffsetX = ox;

        s.desertBg = s.add.tileSprite(ox, 0, DESERT_WIDTH, DESERT_HEIGHT, 'desert_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + DESERT_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.desertMinions = s.physics.add.group();
        s.desertChests = s.physics.add.group();
        s.desertBoss = null;
        this.bossDefeated = false;
        this.bossSpawned = false;
        s.desertReturnPortal = null;

        this.spawner.spawnDesertCamps();
        this.spawner.spawnDesertChests();

        this.setupEnemyOverlap();
        this._setupMinionOverlap(s.desertMinions);

        s.zone = 'desert';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        this._destroyGroup(s.desertMinions);
        s.desertMinions = null;
        this._destroyChestGroup(s.desertChests);
        s.desertChests = null;
        if (s.desertBoss) {
            this._destroyBoss(s.desertBoss, s.desertBossNameText);
            s.desertBoss = null;
            s.desertBossNameText = null;
        }
        if (s.desertBossVfx) {
            s.desertBossVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.desertBossVfx = null;
        }
        if (s.desertBg) { s.desertBg.destroy(); s.desertBg = null; }
        if (s.desertReturnPortal) { if (s.desertReturnPortal.destroy) s.desertReturnPortal.destroy(); s.desertReturnPortal = null; }
        if (s.desertReturnPortalHint) { if (s.desertReturnPortalHint.destroy) s.desertReturnPortalHint.destroy(); s.desertReturnPortalHint = null; }
        if (s.desertSwampPortal) { if (s.desertSwampPortal.destroy) s.desertSwampPortal.destroy(); s.desertSwampPortal = null; }
        if (s.desertSwampPortalHint) { if (s.desertSwampPortalHint.destroy) s.desertSwampPortalHint.destroy(); s.desertSwampPortalHint = null; }
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc && !s.menuOpen) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'desert') {
            if (this.bossDefeated && s.desertSwampPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.desertSwampPortal.x, s.desertSwampPortal.y
            ) < 60) {
                this.enterSwamp();
                return;
            }
            if (this.bossDefeated && s.desertReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.desertReturnPortal.x, s.desertReturnPortal.y
            ) < 60) {
                this.exitDesert();
            } else {
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateDesertMobs(delta);
        this.bossAI.updateDesertBoss();
        this.updateDesertMinions();
        this.checkReturnPortal();
    }

    updateDesertMobs(delta) {
        this._updateMobs(delta, 'desert', this.bossAI.spawnDesertBoss.bind(this.bossAI));
    }

    updateDesertMinions() {
        this._updateMinionGroup(this.scene.desertMinions, 'desert');
    }

    victoryDesertBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.desertOffsetX;

        if (s.desertBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.desertBoss.x, s.desertBoss.y);
            if (s.desertBoss.hpBg) { s.desertBoss.hpBg.destroy(); s.desertBoss.hpBg = null; }
            if (s.desertBoss.hpFill) { s.desertBoss.hpFill.destroy(); s.desertBoss.hpFill = null; }
            if (s.desertBossNameText) { s.desertBossNameText.destroy(); s.desertBossNameText = null; }
            s.desertBoss.destroy();
            s.desertBoss = null;
        }

        s.defeatedText = s.add.text(ox + DESERT_WIDTH / 2, 250, 'SAND WYRM DEFEATED!', {
            fontSize: '26px', fill: '#c8a44a', fontFamily: 'Arial', fontStyle: 'bold',
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
            const lt = s.add.text(ox + DESERT_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        s.desertReturnPortal = s.add.sprite(ox + DESERT_WIDTH / 2, DESERT_HEIGHT - 100, 'portal').setDepth(6).setScale(1.2).setTint(0xc8a44a);
        s.desertReturnPortalHint = s.add.text(ox + DESERT_WIDTH / 2, DESERT_HEIGHT - 115, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        // Swamp portal
        if (!s.desertSwampPortal && this.bossDefeated) {
            const spx = ox + DESERT_WIDTH / 2;
            const spy = DESERT_HEIGHT / 2;
            s.desertSwampPortal = s.add.sprite(spx, spy, 'portal').setDepth(6).setScale(1.2).setTint(0x27ae60);
            s.tweens.add({ targets: s.desertSwampPortal, y: spy - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            s.desertSwampPortalHint = s.add.text(spx, spy - 14, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
        }

        s.time.delayedCall(3000, () => {
            if (s.zone === 'desert') {
                s.floatingText(ox + DESERT_WIDTH / 2, DESERT_HEIGHT - 130,
                    'Portal to Swamp appeared!', '#27ae60');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('cursed', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + DESERT_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + DESERT_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterDesert() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 20, 15, 5);
        s.time.delayedCall(800, () => {
            s._setupZone('desert');
            s.cameras.main.fadeIn(500, 20, 15, 5);
            s.transitioning = false;
        });
    }

    exitDesert() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'desert' || !this.bossDefeated) return;
        const ox = s.desertOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + DESERT_WIDTH / 2, DESERT_HEIGHT - 100
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('village', s.zones.village.isFrozen);
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    enterSwamp() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (!this.bossDefeated) return;
        const ox = s.desertOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + DESERT_WIDTH / 2, DESERT_HEIGHT / 2
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 5, 15, 5);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('swamp');
            s.cameras.main.fadeIn(500, 5, 15, 5);
            s.transitioning = false;
        });
    }

    checkReturnPortal() {
        const s = this.scene;
        if (s.zone !== 'desert' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.desertReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.desertReturnPortal.x, s.desertReturnPortal.y
            );
            if (pd < 80) {
                s.desertReturnPortalHint.setText('SPACE = return to Village');
            } else if (s.desertReturnPortalHint) {
                s.desertReturnPortalHint.setText('');
            }
        }
        if (this.bossDefeated && s.desertSwampPortal) {
            const spd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.desertSwampPortal.x, s.desertSwampPortal.y
            );
            if (spd < 80) {
                if (s.desertSwampPortalHint) s.desertSwampPortalHint.setText('SPACE = enter Swamp');
            } else if (s.desertSwampPortalHint) {
                s.desertSwampPortalHint.setText('');
            }
        }
    }
}