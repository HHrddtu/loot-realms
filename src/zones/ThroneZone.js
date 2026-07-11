import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    THRONE_WIDTH, THRONE_HEIGHT,
    BOSS_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollAccountEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { ThroneBoss } from './ThroneBoss.js';

export class ThroneZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.bossAI = new ThroneBoss(this);
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - THRONE_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#2a1a0a');
        s.physics.world.setBounds(ox, 0, THRONE_WIDTH, THRONE_HEIGHT);
        s.cameras.main.setBounds(ox, 0, THRONE_WIDTH, THRONE_HEIGHT);
        s.throneOffsetX = ox;

        s.throneBg = s.add.tileSprite(ox, 0, THRONE_WIDTH, THRONE_HEIGHT, 'throne_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + THRONE_WIDTH / 2;
        s.player.y = THRONE_HEIGHT - 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.throneMinions = s.physics.add.group();
        s.throneBoss = null;
        this.bossDefeated = false;
        this.bossSpawned = false;
        s.throneReturnPortal = null;

        this.setupEnemyOverlap();

        s.physics.add.overlap(s.player, s.throneMinions, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'throne';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');

        // Spawn boss immediately
        s.time.delayedCall(1500, () => {
            if (s.zone === 'throne' && !this.bossSpawned && !this.bossDefeated) {
                this.bossAI.spawnThroneBoss();
            }
        });
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.throneMinions && s.throneMinions.getLength && s.throneMinions.getLength() > 0) {
            s.throneMinions.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.throneMinions.clear(true, true);
        }
        if (s.throneMinions) { s.throneMinions.destroy(); s.throneMinions = null; }
        if (s.throneBoss) {
            if (s.throneBoss.hpBg) s.throneBoss.hpBg.destroy();
            if (s.throneBoss.hpFill) s.throneBoss.hpFill.destroy();
            if (s.throneBossNameText) s.throneBossNameText.destroy();
            s.throneBoss.destroy();
            s.throneBoss = null;
        }
        if (s.throneBossVfx) {
            s.throneBossVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.throneBossVfx = null;
        }
        if (s.throneBg) { s.throneBg.destroy(); s.throneBg = null; }
        if (s.throneReturnPortal) { if (s.throneReturnPortal.destroy) s.throneReturnPortal.destroy(); s.throneReturnPortal = null; }
        if (s.throneReturnPortalHint) { s.throneReturnPortalHint.destroy(); s.throneReturnPortalHint = null; }
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'throne') {
            if (this.bossDefeated && s.throneReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.throneReturnPortal.x, s.throneReturnPortal.y
            ) < 60) {
                this.exitThrone();
                return;
            }
            s.attack();
        }
    }

    update(time, delta) {
        this.bossAI.updateThroneBoss();
        this.updateThroneMinions();
        this.checkReturnPortal();
    }

    updateThroneMinions() {
        const s = this.scene;
        if (s.zone !== 'throne' || s.menuOpen || s.transitioning) return;
        if (!s.throneMinions) return;
        s.throneMinions.getChildren().forEach(e => {
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

    victoryThroneBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.throneOffsetX;

        if (s.throneBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.throneBoss.x, s.throneBoss.y);
            if (s.throneBoss.hpBg) s.throneBoss.hpBg.destroy();
            if (s.throneBoss.hpFill) s.throneBoss.hpFill.destroy();
            if (s.throneBossNameText) s.throneBossNameText.destroy();
            s.throneBoss.destroy();
            s.throneBoss = null;
        }

        // Victory text
        s.defeatedText = s.add.text(ox + THRONE_WIDTH / 2, 150, 'ETERNITY LORD DEFEATED!', {
            fontSize: '26px', fill: '#ffd700', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({
            targets: s.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; }
        });

        // Cutscene text
        s.time.delayedCall(3000, () => {
            if (s.zone === 'throne') {
                const lang = localStorage.getItem('game_lang') || 'en';
                const { LORE } = require('../config/lore.js');
                const finaleText = lang === 'ru' ? LORE.finale.textRu : lang === 'de' ? LORE.finale.textDe : LORE.finale.text;
                const cutsceneText = s.add.text(ox + THRONE_WIDTH / 2, 250, finaleText, {
                    fontSize: '16px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'italic',
                    stroke: '#000', strokeThickness: 3, wordWrap: { width: 500 }, align: 'center', lineSpacing: 4
                }).setOrigin(0.5).setScrollFactor(0);
                s.tweens.add({
                    targets: cutsceneText, alpha: 0, duration: 12000,
                    onComplete: () => { if (cutsceneText) cutsceneText.destroy(); }
                });
            }
        });

        // Drop unique loot
        s.defeatedLoot = [];
        const lootItems = [];

        // Always drop one of the unique items
        const uniqueLoots = [
            { ...CROWN_OF_ETERNITY, type: 'equip' },
            { ...SWORD_OF_ETERNITY, type: 'equip' },
            { ...AMULET_OF_ETERNITY, type: 'equip' }
        ];
        const chosen = uniqueLoots[Math.floor(Math.random() * uniqueLoots.length)];
        if (s.addEquip(chosen)) {
            lootItems.push(chosen);
            playLoot();
        }

        if (Math.random() < BOSS_DROP_CHANCE) {
            const accItem = rollZoneAccountEquip('throne');
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + THRONE_WIDTH / 2, 200 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        // Return portal
        s.throneReturnPortal = s.add.sprite(ox + THRONE_WIDTH / 2, THRONE_HEIGHT - 100, 'portal').setDepth(6).setScale(1.2).setTint(0xffd700);
        s.throneReturnPortalHint = s.add.text(ox + THRONE_WIDTH / 2, THRONE_HEIGHT - 115, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.time.delayedCall(5000, () => {
            if (s.zone === 'throne') {
                s.floatingText(ox + THRONE_WIDTH / 2, THRONE_HEIGHT - 130,
                    'Return to the world...', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        // Award prestige unlock
        s.prestigeUnlocked = true;
        s.doSave();

        const hc = rollBossCrystals('throne', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + THRONE_WIDTH / 2, 250);
            if (granted > 0) {
                s.floatingText(ox + THRONE_WIDTH / 2, 250, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    exitThrone() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'throne' || !this.bossDefeated) return;
        const ox = s.throneOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + THRONE_WIDTH / 2, THRONE_HEIGHT - 100
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

    checkReturnPortal() {
        const s = this.scene;
        if (s.zone !== 'throne' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.throneReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.throneReturnPortal.x, s.throneReturnPortal.y
            );
            if (pd < 80) {
                s.throneReturnPortalHint.setText('SPACE = return to Village');
            } else if (s.throneReturnPortalHint) {
                s.throneReturnPortalHint.setText('');
            }
        }
    }
}

// Import unique items
import { CROWN_OF_ETERNITY, SWORD_OF_ETERNITY, AMULET_OF_ETERNITY } from '../config/items.js';