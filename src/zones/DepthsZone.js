import Phaser from 'phaser';
import {
    GAME_WIDTH,
    DEPTHS_WIDTH, DEPTHS_HEIGHT,
    BOSS_DROP_CHANCE, ZONE_BOSS_SECOND_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { CombatLoot } from '../systems/CombatLoot.js';
import { DepthsSpawner } from './DepthsSpawner.js';
import { DepthsBoss } from './DepthsBoss.js';

export class DepthsZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.spawner = new DepthsSpawner(this);
        this.bossAI = new DepthsBoss(this);
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - DEPTHS_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#0a0010');
        s.physics.world.setBounds(ox, 0, DEPTHS_WIDTH, DEPTHS_HEIGHT);
        s.cameras.main.setBounds(ox, 0, DEPTHS_WIDTH, DEPTHS_HEIGHT);
        s.depthsOffsetX = ox;

        s.depthsBg = s.add.tileSprite(ox, 0, DEPTHS_WIDTH, DEPTHS_HEIGHT, 'depths_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + DEPTHS_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.depthsMinions = s.physics.add.group();
        s.depthsChests = s.physics.add.group();
        s.depthsBoss = null;
        this.bossDefeated = false;
        this.bossSpawned = false;
        s.depthsReturnPortal = null;

        this.spawner.spawnDepthsCamps();
        this.spawner.spawnDepthsChests();

        if (s.loreItems) {
            s.loreItems.spawnLoreItems('depths', [
                { x: s.depthsOffsetX + 200, y: 200 },
                { x: s.depthsOffsetX + 600, y: 600 }
            ]);
        }

        this.setupEnemyOverlap();
        this._setupMinionOverlap(s.depthsMinions);

        s.zone = 'depths';
        s._spawnNPCs();
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startCaveDrip(DEPTHS_WIDTH, DEPTHS_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        this._destroyGroup(s.depthsMinions);
        s.depthsMinions = null;
        this._destroyChestGroup(s.depthsChests);
        s.depthsChests = null;
        if (s.depthsBoss) {
            this._destroyBoss(s.depthsBoss, s.depthsBossNameText);
            s.depthsBoss = null;
            s.depthsBossNameText = null;
        }
        if (s.depthsBossDeathWaveVfx) {
            s.depthsBossDeathWaveVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.depthsBossDeathWaveVfx = null;
        }
        if (s.depthsBg) { s.depthsBg.destroy(); s.depthsBg = null; }
        if (s.depthsReturnPortal) { if (s.depthsReturnPortal.destroy) s.depthsReturnPortal.destroy(); s.depthsReturnPortal = null; }
        if (s.depthsReturnPortalHint) { s.depthsReturnPortalHint.destroy(); s.depthsReturnPortalHint = null; }
        if (s.depthsCursedPortal) { if (s.depthsCursedPortal.destroy) s.depthsCursedPortal.destroy(); s.depthsCursedPortal = null; }
        if (s.depthsCursedPortalHint) { s.depthsCursedPortalHint.destroy(); s.depthsCursedPortalHint = null; }
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc && !s.menuOpen) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'depths') {
            // Check cursed portal
            if (this.bossDefeated && s.depthsCursedPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.depthsCursedPortal.x, s.depthsCursedPortal.y
            ) < 60) {
                this.enterCursed();
                return;
            }
            if (this.bossDefeated && s.depthsReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.depthsReturnPortal.x, s.depthsReturnPortal.y
            ) < 60) {
                this.exitDepths();
            } else {
                if (s.loreItems && s.loreItems.tryInteract()) return;
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateDepthsMobs(delta);
        if (this.scene.loreItems) this.scene.loreItems.update();
        this.bossAI.updateDepthsBoss();
        this.updateDepthsMinions();
        this.checkReturnPortal();
    }

    updateDepthsMobs(delta) {
        this._updateMobs(delta, 'depths', this.bossAI.spawnDepthsBoss.bind(this.bossAI));
    }

    updateDepthsMinions() {
        this._updateMinionGroup(this.scene.depthsMinions, 'depths');
    }

    victoryDepthsBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        CombatLoot.celebrateBossKill(s);
        const ox = s.depthsOffsetX;

        if (s.depthsBoss) {
            const bossX = s.depthsBoss.x;
            const bossY = s.depthsBoss.y;

            // Screen shake
            s.cameras.main.shake(300, 0.02);

            // Explosion particles
            if (s.particles) s.particles.spawnBossDeath(bossX, bossY);

            // Flash screen
            s.cameras.main.flash(500, 136, 0, 255, true);

            if (s.depthsBoss.hpBg) { s.depthsBoss.hpBg.destroy(); s.depthsBoss.hpBg = null; }
            if (s.depthsBoss.hpFill) { s.depthsBoss.hpFill.destroy(); s.depthsBoss.hpFill = null; }
            if (s.depthsBossNameText) { s.depthsBossNameText.destroy(); s.depthsBossNameText = null; }
            s.depthsBoss.destroy();
            s.depthsBoss = null;

            // Spirit effect - rising ghost with glow
            const spirit = s.add.sprite(bossX, bossY, 'lich_king').setDepth(10).setAlpha(0.9).setTint(0x8800ff);
            const spiritGlow = s.add.image(bossX, bossY, 'portal_glow').setDepth(9).setAlpha(0.5).setScale(2).setTint(0x8800ff);
            s.tweens.add({
                targets: spirit, y: bossY - 120, alpha: 0, scaleX: 0.3, scaleY: 0.3,
                duration: 4000, ease: 'Quad.easeOut',
                onComplete: () => { if (spirit.active) spirit.destroy(); }
            });
            s.tweens.add({
                targets: spiritGlow, y: bossY - 120, alpha: 0, scaleX: 0.5, scaleY: 0.5,
                duration: 4000, ease: 'Quad.easeOut',
                onComplete: () => { if (spiritGlow.active) spiritGlow.destroy(); }
            });
        }

        s.defeatedText = s.add.text(ox + DEPTHS_WIDTH / 2, 250, 'LICH KING DEFEATED!', {
            fontSize: '26px', fill: '#8800ff', fontFamily: 'Arial', fontStyle: 'bold',
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
            const accItem = rollZoneAccountEquip('depths');
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + DEPTHS_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        s.depthsReturnPortal = s.add.sprite(ox + DEPTHS_WIDTH / 2, DEPTHS_HEIGHT - 100, 'portal').setDepth(6).setScale(1.2).setTint(0x8800ff);
        s.depthsReturnPortalHint = s.add.text(ox + DEPTHS_WIDTH / 2, DEPTHS_HEIGHT - 115, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        // Cursed Lands portal appears after boss death
        if (!s.depthsCursedPortal && this.bossDefeated) {
            const cpx = ox + DEPTHS_WIDTH / 2;
            const cpy = DEPTHS_HEIGHT / 2;
            s.depthsCursedPortal = s.add.sprite(cpx, cpy, 'portal').setDepth(6).setScale(1.2).setTint(0x00aa00);
            s.tweens.add({ targets: s.depthsCursedPortal, y: cpy - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            s.depthsCursedPortalHint = s.add.text(cpx, cpy - 40, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
        }

        s.time.delayedCall(3000, () => {
            if (s.zone === 'depths') {
                s.floatingText(ox + DEPTHS_WIDTH / 2, DEPTHS_HEIGHT - 130,
                    'Portal to Village appeared!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('depths', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + DEPTHS_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + DEPTHS_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterDepths() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (!s.zones.village.isThriving) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 10, 0, 16);
        s.time.delayedCall(800, () => {
            s._setupZone('depths');
            s.cameras.main.fadeIn(500, 10, 0, 16);
            s.transitioning = false;
        });
    }

    exitDepths() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'depths' || !this.bossDefeated) return;
        const ox = s.depthsOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + DEPTHS_WIDTH / 2, DEPTHS_HEIGHT - 100
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('village');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    enterCursed() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (!this.bossDefeated) return;
        const ox = s.depthsOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + DEPTHS_WIDTH / 2, DEPTHS_HEIGHT / 2
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 10, 20, 10);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('cursed');
            s.cameras.main.fadeIn(500, 10, 20, 10);
            s.transitioning = false;
        });
    }

    updateDepthsMinions() {
        const s = this.scene;
        if (s.zone !== 'depths' || s.menuOpen || s.transitioning) return;
        if (!s.depthsMinions) return;
        s.depthsMinions.getChildren().forEach(e => {
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
        if (s.zone !== 'depths' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.depthsReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.depthsReturnPortal.x, s.depthsReturnPortal.y
            );
            if (pd < 80) {
                s.depthsReturnPortalHint.setText('SPACE = return to Village');
            } else if (s.depthsReturnPortalHint) {
                s.depthsReturnPortalHint.setText('');
            }
        }
    }
}
