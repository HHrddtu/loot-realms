import Phaser from 'phaser';
import {
    GAME_WIDTH,
    SWAMP_WIDTH, SWAMP_HEIGHT,
    BOSS_DROP_CHANCE, ZONE_BOSS_SECOND_DROP_CHANCE, RARITY_COLORS,
    SWAMP_HAZARD
} from '../config/index.js';
import { rollEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';
import { resolveSwampHazard } from '../systems/ZoneHazards.js';

import { BaseZone } from '../systems/BaseZone.js';
import { SwampSpawner } from './SwampSpawner.js';
import { SwampBoss } from './SwampBoss.js';

export class SwampZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.hazardTick = 0;
        this.inHazard = false;
        this.spawner = new SwampSpawner(this);
        this.bossAI = new SwampBoss(this);
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - SWAMP_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#0a1a0a');
        s.physics.world.setBounds(ox, 0, SWAMP_WIDTH, SWAMP_HEIGHT);
        s.cameras.main.setBounds(ox, 0, SWAMP_WIDTH, SWAMP_HEIGHT);
        s.swampOffsetX = ox;

        s.swampBg = s.add.tileSprite(ox, 0, SWAMP_WIDTH, SWAMP_HEIGHT, 'swamp_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + SWAMP_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.swampMinions = s.physics.add.group();
        s.swampChests = s.physics.add.group();
        s.swampBoss = null;
        this.bossSpawned = false;
        s.swampReturnPortal = null;
        s.swampReturnPortalHint = null;

        this.spawner.spawnSwampCamps();
        this.spawner.spawnSwampChests();

        this.hazardTick = 0;
        this.inHazard = false;
        s._zoneSpeedMult = 1;
        this._spawnSwampHazards();
        if (s.particles) s.particles.startSwampMiasma(SWAMP_WIDTH, SWAMP_HEIGHT);

        this.setupEnemyOverlap();
        this._setupMinionOverlap(s.swampMinions);

        s.zone = 'swamp';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');

        if (this.bossDefeated) this._spawnVictoryObjects();
    }

    _spawnSwampHazards() {
        const s = this.scene;
        const ox = s.swampOffsetX;
        s.swampPuddles = [];
        s.swampIslands = [];
        SWAMP_HAZARD.puddles.forEach(p => {
            const c = s.add.circle(ox + p.x, p.y, SWAMP_HAZARD.puddleRadius,
                SWAMP_HAZARD.puddleColor, SWAMP_HAZARD.puddleAlpha)
                .setDepth(1)
                .setStrokeStyle(2, 0x1f4a25, 0.6);
            s.tweens.add({
                targets: c,
                alpha: { from: SWAMP_HAZARD.puddleAlpha * 0.7, to: SWAMP_HAZARD.puddleAlpha },
                duration: 1600,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            s.swampPuddles.push(c);
        });
        SWAMP_HAZARD.islands.forEach(i => {
            const c = s.add.circle(ox + i.x, i.y, i.radius,
                SWAMP_HAZARD.safeColor, SWAMP_HAZARD.safeAlpha)
                .setDepth(2)
                .setStrokeStyle(3, 0x5a7a3a, 0.8);
            s.swampIslands.push(c);
        });
    }

    _spawnVictoryObjects() {
        const s = this.scene;
        const ox = s.swampOffsetX;
        if (!s.swampReturnPortal) {
            s.swampReturnPortal = s.add.sprite(ox + SWAMP_WIDTH / 2, SWAMP_HEIGHT - 100, 'portal').setDepth(6).setScale(1.2).setTint(0x00aa00);
            s.swampReturnPortalHint = s.add.text(ox + SWAMP_WIDTH / 2, SWAMP_HEIGHT - 115, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        this._destroyGroup(s.swampMinions);
        s.swampMinions = null;
        this._destroyChestGroup(s.swampChests);
        s.swampChests = null;
        if (s.swampBoss) {
            this._destroyBoss(s.swampBoss, s.swampBossNameText);
            s.swampBoss = null;
            s.swampBossNameText = null;
        }
        if (s.swampBossVfx) {
            s.swampBossVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.swampBossVfx = null;
        }
        if (s.swampBg) { s.swampBg.destroy(); s.swampBg = null; }
        if (s.swampReturnPortal) { if (s.swampReturnPortal.destroy) s.swampReturnPortal.destroy(); s.swampReturnPortal = null; }
        if (s.swampReturnPortalHint) { if (s.swampReturnPortalHint.destroy) s.swampReturnPortalHint.destroy(); s.swampReturnPortalHint = null; }
        if (s.swampPuddles) {
            s.swampPuddles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.swampPuddles = null;
        }
        if (s.swampIslands) {
            s.swampIslands.forEach(i => { if (i && i.destroy) i.destroy(); });
            s.swampIslands = null;
        }
        this.hazardTick = 0;
        this.inHazard = false;
        s._zoneSpeedMult = 1;
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc && !s.menuOpen) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'swamp') {
            if (this.bossDefeated && s.swampReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.swampReturnPortal.x, s.swampReturnPortal.y
            ) < 60) {
                this.exitSwamp();
            } else {
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateSwampMobs(delta);
        this.bossAI.updateSwampBoss();
        this.updateSwampMinions();
        this.checkReturnPortal();
        this.updateSwampHazards(delta);
    }

    updateSwampHazards(delta) {
        const s = this.scene;
        if (s.zone !== 'swamp' || s.menuOpen || s.transitioning) return;

        const { inPuddle, onIsland } = resolveSwampHazard(
            s.player.x, s.player.y, s.swampOffsetX, SWAMP_HAZARD
        );
        s._zoneSpeedMult = inPuddle ? SWAMP_HAZARD.slowMult : 1;

        if (inPuddle) {
            this.hazardTick += delta;
            if (!this.inHazard) {
                this.inHazard = true;
                s.floatingText(s.player.x, s.player.y - 45, 'TOXIC BOG!', '#2ecc71');
                if (s.hintText) s.hintText.setText('Toxic bog: slow + poison. Find safe ground!');
            }
            if (this.hazardTick >= SWAMP_HAZARD.tickInterval) {
                this.hazardTick = 0;
                s.combat.takeDamage(SWAMP_HAZARD.poisonDamage);
                s.floatingText(s.player.x, s.player.y - 30,
                    '-' + SWAMP_HAZARD.poisonDamage + ' TOXIC', '#27ae60');
            }
        } else {
            this.hazardTick = 0;
            if (this.inHazard) {
                this.inHazard = false;
                s.floatingText(s.player.x, s.player.y - 45,
                    onIsland ? 'Safe ground' : 'Out of the bog', '#8fbc6a');
            }
        }
    }

    updateSwampMobs(delta) {
        this._updateMobs(delta, 'swamp', this.bossAI.spawnSwampBoss.bind(this.bossAI));
    }

    updateSwampMinions() {
        this._updateMinionGroup(this.scene.swampMinions, 'swamp');
    }

    victorySwampBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.swampOffsetX;

        if (s.swampBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.swampBoss.x, s.swampBoss.y);
            if (s.swampBoss.hpBg) { s.swampBoss.hpBg.destroy(); s.swampBoss.hpBg = null; }
            if (s.swampBoss.hpFill) { s.swampBoss.hpFill.destroy(); s.swampBoss.hpFill = null; }
            if (s.swampBossNameText) { s.swampBossNameText.destroy(); s.swampBossNameText = null; }
            s.swampBoss.destroy();
            s.swampBoss = null;
        }

        s.defeatedText = s.add.text(ox + SWAMP_WIDTH / 2, 250, 'SLIME KING DEFEATED!', {
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
            const lt = s.add.text(ox + SWAMP_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        this._spawnVictoryObjects();

        s.time.delayedCall(3000, () => {
            if (s.zone === 'swamp') {
                s.floatingText(ox + SWAMP_WIDTH / 2, SWAMP_HEIGHT - 130,
                    'Portal back to Desert appeared!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('cursed', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + SWAMP_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + SWAMP_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterSwamp() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 5, 15, 5);
        s.time.delayedCall(800, () => {
            s._setupZone('swamp');
            s.cameras.main.fadeIn(500, 5, 15, 5);
            s.transitioning = false;
        });
    }

    exitSwamp() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'swamp' || !this.bossDefeated) return;
        const ox = s.swampOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + SWAMP_WIDTH / 2, SWAMP_HEIGHT - 100
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            s._setupZone('desert');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    checkReturnPortal() {
        const s = this.scene;
        if (s.zone !== 'swamp' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.swampReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.swampReturnPortal.x, s.swampReturnPortal.y
            );
            if (pd < 80) {
                s.swampReturnPortalHint.setText('SPACE = return to Desert');
            } else if (s.swampReturnPortalHint) {
                s.swampReturnPortalHint.setText('');
            }
        }
    }
}