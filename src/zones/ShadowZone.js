import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    SHADOW_WIDTH, SHADOW_HEIGHT,
    BOSS_DROP_CHANCE, ZONE_BOSS_SECOND_DROP_CHANCE, RARITY_COLORS,
    RANGED_INTERVAL_DEFAULT, MOB_ROLE_DEFAULTS, HEALER_HEAL_AMOUNT_DEFAULT, HEALER_HEAL_RANGE_DEFAULT, HEALER_ALLY_RANGE_DEFAULT
} from '../config/index.js';
import { rollEquip, rollAccountEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { CombatLoot } from '../systems/CombatLoot.js';
import { ShadowSpawner } from './ShadowSpawner.js';
import { ShadowBoss } from './ShadowBoss.js';

export class ShadowZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.spawner = new ShadowSpawner(this);
        this.bossAI = new ShadowBoss(this);
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - SHADOW_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#050010');
        s.physics.world.setBounds(ox, 0, SHADOW_WIDTH, SHADOW_HEIGHT);
        s.cameras.main.setBounds(ox, 0, SHADOW_WIDTH, SHADOW_HEIGHT);
        s.shadowOffsetX = ox;

        s.shadowBg = s.add.tileSprite(ox, 0, SHADOW_WIDTH, SHADOW_HEIGHT, 'shadow_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + SHADOW_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.shadowMinions = s.physics.add.group();
        s.shadowChests = s.physics.add.group();
        s.shadowBoss = null;
        this.bossDefeated = false;
        this.bossSpawned = false;
        s.shadowReturnPortal = null;

        this.spawner.spawnShadowCamps();
        this.spawner.spawnShadowChests();

        this.setupEnemyOverlap();

        if (s.loreItems) {
            s.loreItems.spawnLoreItems('shadow', [
                { x: s.shadowOffsetX + 200, y: 300 },
                { x: s.shadowOffsetX + 600, y: 1000 }
            ]);
        }

        s.physics.add.overlap(s.player, s.shadowMinions, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'shadow';
        s._spawnNPCs();
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startCaveDrip(SHADOW_WIDTH, SHADOW_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.shadowMinions && s.shadowMinions.getLength && s.shadowMinions.getLength() > 0) {
            s.shadowMinions.getChildren().forEach(e => {
                if (e.hpBg) { e.hpBg.destroy(); e.hpBg = null; }
                if (e.hpFill) { e.hpFill.destroy(); e.hpFill = null; }
                if (e.shieldIcon) { e.shieldIcon.destroy(); e.shieldIcon = null; }
                if (e.roleIcon) { e.roleIcon.destroy(); e.roleIcon = null; }
            });
            s.shadowMinions.clear(true, true);
        }
        if (s.shadowMinions) { s.shadowMinions.destroy(); s.shadowMinions = null; }
        if (s.shadowChests && s.shadowChests.getLength && s.shadowChests.getLength() > 0) {
            s.shadowChests.getChildren().forEach(ch => {
                if (ch.hpBg) { ch.hpBg.destroy(); ch.hpBg = null; }
                if (ch.hpFill) { ch.hpFill.destroy(); ch.hpFill = null; }
                if (ch.hintText) { ch.hintText.destroy(); ch.hintText = null; }
            });
            s.shadowChests.clear(true, true);
        }
        if (s.shadowChests) { s.shadowChests.destroy(); s.shadowChests = null; }
        if (s.shadowBoss) {
            if (s.shadowBoss.hpBg) { s.shadowBoss.hpBg.destroy(); s.shadowBoss.hpBg = null; }
            if (s.shadowBoss.hpFill) { s.shadowBoss.hpFill.destroy(); s.shadowBoss.hpFill = null; }
            if (s.shadowBossNameText) { s.shadowBossNameText.destroy(); s.shadowBossNameText = null; }
            s.shadowBoss.destroy();
            s.shadowBoss = null;
        }
        if (s.shadowBossVfx) {
            s.shadowBossVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.shadowBossVfx = null;
        }
        if (s.shadowBg) { s.shadowBg.destroy(); s.shadowBg = null; }
        if (s.shadowReturnPortal) { if (s.shadowReturnPortal.destroy) s.shadowReturnPortal.destroy(); s.shadowReturnPortal = null; }
        if (s.shadowReturnPortalHint) { s.shadowReturnPortalHint.destroy(); s.shadowReturnPortalHint = null; }
        if (s.shadowTowerPortal) { if (s.shadowTowerPortal.destroy) s.shadowTowerPortal.destroy(); s.shadowTowerPortal = null; }
        if (s.shadowTowerPortalHint) { if (s.shadowTowerPortalHint.destroy) s.shadowTowerPortalHint.destroy(); s.shadowTowerPortalHint = null; }
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc && !s.menuOpen) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'shadow') {
            // Check tower portal
            if (this.bossDefeated && s.shadowTowerPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.shadowTowerPortal.x, s.shadowTowerPortal.y
            ) < 60) {
                this.enterTower();
                return;
            }
            if (this.bossDefeated && s.shadowReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.shadowReturnPortal.x, s.shadowReturnPortal.y
            ) < 60) {
                this.exitShadow();
            } else {
                if (s.loreItems && s.loreItems.tryInteract()) return;
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateShadowMobs(delta);
        if (this.scene.loreItems) this.scene.loreItems.update();
        this.bossAI.updateShadowBoss();
        this.updateShadowMinions();
        this.checkReturnPortal();
    }

    updateShadowMobs(delta) {
        const s = this.scene;
        if (s.zone !== 'shadow' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        if (s.enemies.getLength() === 0 && !this.bossSpawned && !this.bossDefeated) {
            this.bossAI.spawnShadowBoss();
        }

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;

            const aggro = s.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 250) {
                const roleDefaults = MOB_ROLE_DEFAULTS[e.stats.role] || MOB_ROLE_DEFAULTS.default;
                const speed = (e.stats.speed || 50) * roleDefaults.speedMult;
                const engageDist = roleDefaults.engageDist;

                if (dist > engageDist) {
                    e.body.setVelocity((dx / dist) * speed * roleDefaults.moveMult, (dy / dist) * speed * roleDefaults.moveMult);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (e.stats.role === 'archer' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'mage' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'magic');
                    }
                } else if (e.stats.role === 'healer' && dist < HEALER_HEAL_RANGE_DEFAULT) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || RANGED_INTERVAL_DEFAULT)) {
                        e.stats.rangedTimer = 0;
                        s.enemies.getChildren().forEach(ally => {
                            if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                                const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                                if (ad < HEALER_ALLY_RANGE_DEFAULT) {
                                    const healAmt = HEALER_HEAL_AMOUNT_DEFAULT;
                                    ally.stats.hp = Math.min(ally.stats.maxHp, ally.stats.hp + healAmt);
                                    if (ally.hpFill) ally.hpFill.width = ally.hpBg.width * (ally.stats.hp / ally.stats.maxHp);
                                    this._fireEnemyProjectile(e, ally.x - e.x, ally.y - e.y, 'heal');
                                }
                            }
                        });
                    }
                }
            } else {
                e.body.setVelocity(0);
            }

            if (e.hpBg) { e.hpBg.x = e.x; e.hpBg.y = e.y - e.stats.bh / 2 - 8; }
            if (e.hpFill) { e.hpFill.x = e.x; e.hpFill.y = e.y - e.stats.bh / 2 - 8; }
        });

        this._updateEnemyProjectiles();
    }

    _fireEnemyProjectile(e, dx, dy, type) {
        const s = this.scene;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = type === 'arrow' ? 200 : type === 'magic' ? 160 : 120;
        const texKey = type === 'arrow' ? 'enemy_arrow' : type === 'heal' ? 'enemy_heal' : 'enemy_magic';

        const proj = s.add.sprite(e.x, e.y, texKey).setDepth(15);
        s.physics.add.existing(proj);
        proj.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        proj.damage = e.stats.damage;
        proj.lifespan = 2000;
        proj.isHeal = (type === 'heal');
        s.enemyProjectiles.push(proj);
    }

    _updateEnemyProjectiles() {
        const s = this.scene;
        for (let i = s.enemyProjectiles.length - 1; i >= 0; i--) {
            const p = s.enemyProjectiles[i];
            if (!p.active) { s.enemyProjectiles.splice(i, 1); continue; }

            p.lifespan -= s.game.loop.delta;
            if (p.lifespan <= 0) { p.destroy(); s.enemyProjectiles.splice(i, 1); continue; }

            if (!p.isHeal) {
                const dist = Phaser.Math.Distance.Between(p.x, p.y, s.player.x, s.player.y);
                if (dist < 16) {
                    s.combat.takeDamage(p.damage);
                    p.destroy();
                    s.enemyProjectiles.splice(i, 1);
                }
            }
        }
    }

    victoryShadowBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        s.shadowStepUnlocked = true;
        s.doSave();
        playBossDeath();
        CombatLoot.celebrateBossKill(s);
        s.tutorialMgr.showAbilityTutorial('shadowStep');
        const ox = s.shadowOffsetX;

        if (s.shadowBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.shadowBoss.x, s.shadowBoss.y);
            if (s.shadowBoss.hpBg) { s.shadowBoss.hpBg.destroy(); s.shadowBoss.hpBg = null; }
            if (s.shadowBoss.hpFill) { s.shadowBoss.hpFill.destroy(); s.shadowBoss.hpFill = null; }
            if (s.shadowBossNameText) { s.shadowBossNameText.destroy(); s.shadowBossNameText = null; }
            s.shadowBoss.destroy();
            s.shadowBoss = null;
        }

        s.defeatedText = s.add.text(ox + SHADOW_WIDTH / 2, 250, 'SHADOW KING DEFEATED!', {
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
            const accItem = rollZoneAccountEquip('shadow');
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + SHADOW_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        s.shadowReturnPortal = s.add.sprite(ox + SHADOW_WIDTH / 2, SHADOW_HEIGHT - 100, 'portal').setDepth(6).setScale(1.2).setTint(0x8800ff);
        s.shadowReturnPortalHint = s.add.text(ox + SHADOW_WIDTH / 2, SHADOW_HEIGHT - 115, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        // Tower portal
        if (!s.shadowTowerPortal && this.bossDefeated) {
            const tpx = ox + SHADOW_WIDTH / 2;
            const tpy = SHADOW_HEIGHT / 2;
            s.shadowTowerPortal = s.add.sprite(tpx, tpy, 'portal').setDepth(6).setScale(1.2).setTint(0xcc8800);
            s.tweens.add({ targets: s.shadowTowerPortal, y: tpy - 5, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
            s.shadowTowerPortalHint = s.add.text(tpx, tpy - 14, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
        }

        s.time.delayedCall(3000, () => {
            if (s.zone === 'shadow') {
                s.floatingText(ox + SHADOW_WIDTH / 2, SHADOW_HEIGHT - 130,
                    'Portal to Cursed Lands appeared!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('shadow', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + SHADOW_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + SHADOW_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterShadow() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 5, 0, 16);
        s.time.delayedCall(800, () => {
            s._setupZone('shadow');
            s.cameras.main.fadeIn(500, 5, 0, 16);
            s.transitioning = false;
        });
    }

    exitShadow() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'shadow' || !this.bossDefeated) return;
        const ox = s.shadowOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + SHADOW_WIDTH / 2, SHADOW_HEIGHT - 100
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('cursed');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    enterTower() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (!this.bossDefeated) return;
        const ox = s.shadowOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + SHADOW_WIDTH / 2, SHADOW_HEIGHT / 2
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 26, 20, 8);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('tower');
            s.cameras.main.fadeIn(500, 26, 20, 8);
            s.transitioning = false;
        });
    }

    updateShadowMinions() {
        const s = this.scene;
        if (s.zone !== 'shadow' || s.menuOpen || s.transitioning) return;
        if (!s.shadowMinions) return;
        s.shadowMinions.getChildren().forEach(e => {
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
        if (s.zone !== 'shadow' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.shadowReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.shadowReturnPortal.x, s.shadowReturnPortal.y
            );
            if (pd < 80) {
                s.shadowReturnPortalHint.setText('SPACE = return to Cursed Lands');
            } else if (s.shadowReturnPortalHint) {
                s.shadowReturnPortalHint.setText('');
            }
        }
        if (this.bossDefeated && s.shadowTowerPortal) {
            const tpd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.shadowTowerPortal.x, s.shadowTowerPortal.y
            );
            if (tpd < 80) {
                if (s.shadowTowerPortalHint) s.shadowTowerPortalHint.setText('SPACE = enter Tower');
            } else if (s.shadowTowerPortalHint) {
                s.shadowTowerPortalHint.setText('');
            }
        }
    }
}
