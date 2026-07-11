import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    CURSED_WIDTH, CURSED_HEIGHT,
    BOSS_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollAccountEquip, rollZoneAccountEquip } from '../utils.js';
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

        s.physics.add.overlap(s.player, s.cursedMinions, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'cursed';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startCaveDrip(CURSED_WIDTH, CURSED_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.cursedMinions && s.cursedMinions.getLength && s.cursedMinions.getLength() > 0) {
            s.cursedMinions.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.cursedMinions.clear(true, true);
        }
        if (s.cursedMinions) { s.cursedMinions.destroy(); s.cursedMinions = null; }
        if (s.cursedChests && s.cursedChests.getLength && s.cursedChests.getLength() > 0) {
            s.cursedChests.getChildren().forEach(ch => {
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
                if (ch.hintText) ch.hintText.destroy();
            });
            s.cursedChests.clear(true, true);
        }
        if (s.cursedChests) { s.cursedChests.destroy(); s.cursedChests = null; }
        if (s.cursedBoss) {
            if (s.cursedBoss.hpBg) s.cursedBoss.hpBg.destroy();
            if (s.cursedBoss.hpFill) s.cursedBoss.hpFill.destroy();
            if (s.cursedBossNameText) s.cursedBossNameText.destroy();
            s.cursedBoss.destroy();
            s.cursedBoss = null;
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
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
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
        const s = this.scene;
        if (s.zone !== 'cursed' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        if (s.enemies.getLength() === 0 && !this.bossSpawned && !this.bossDefeated) {
            this.bossAI.spawnCursedBoss();
        }

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;

            const aggro = s.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 250) {
                let speed = 50;
                let engageDist = 30;

                switch (e.stats.role) {
                    case 'tank':     speed = 40; engageDist = 25; break;
                    case 'assassin': speed = 90; engageDist = 20; break;
                    case 'archer':   speed = 45; engageDist = 150; break;
                    case 'mage':     speed = 40; engageDist = 180; break;
                    case 'healer':   speed = 45; engageDist = 120; break;
                }

                if (dist > engageDist) {
                    if (e.stats.role === 'tank' || e.stats.role === 'assassin') {
                        e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    } else if (e.stats.role === 'archer' || e.stats.role === 'mage' || e.stats.role === 'healer') {
                        e.body.setVelocity((dx / dist) * speed * 0.3, (dy / dist) * speed * 0.3);
                    } else {
                        e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    }
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }

                if (e.stats.role === 'archer' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 1500)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'arrow');
                    }
                } else if (e.stats.role === 'mage' && dist < 220 && dist > 40) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 2000)) {
                        e.stats.rangedTimer = 0;
                        this._fireEnemyProjectile(e, dx, dy, 'magic');
                    }
                } else if (e.stats.role === 'healer' && dist < 180) {
                    e.stats.rangedTimer = (e.stats.rangedTimer || 0) + delta;
                    if (e.stats.rangedTimer >= (e.stats.rangedInterval || 2200)) {
                        e.stats.rangedTimer = 0;
                        s.enemies.getChildren().forEach(ally => {
                            if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                                const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                                if (ad < 120) {
                                    const healAmt = 8;
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

    victoryCursedBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.cursedOffsetX;

        if (s.cursedBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.cursedBoss.x, s.cursedBoss.y);
            if (s.cursedBoss.hpBg) s.cursedBoss.hpBg.destroy();
            if (s.cursedBoss.hpFill) s.cursedBoss.hpFill.destroy();
            if (s.cursedBossNameText) s.cursedBossNameText.destroy();
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

        if (Math.random() < 0.6) {
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
