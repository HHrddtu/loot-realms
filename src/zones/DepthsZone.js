import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    DEPTHS_WIDTH, DEPTHS_HEIGHT,
    BOSS_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollAccountEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
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

        this.setupEnemyOverlap();

        s.physics.add.overlap(s.player, s.depthsMinions, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'depths';
        s._spawnNPCs();
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startCaveDrip(DEPTHS_WIDTH, DEPTHS_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.depthsMinions && s.depthsMinions.getLength && s.depthsMinions.getLength() > 0) {
            s.depthsMinions.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.depthsMinions.clear(true, true);
        }
        if (s.depthsMinions) { s.depthsMinions.destroy(); s.depthsMinions = null; }
        if (s.depthsChests && s.depthsChests.getLength && s.depthsChests.getLength() > 0) {
            s.depthsChests.getChildren().forEach(ch => {
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
                if (ch.hintText) ch.hintText.destroy();
            });
            s.depthsChests.clear(true, true);
        }
        if (s.depthsChests) { s.depthsChests.destroy(); s.depthsChests = null; }
        if (s.depthsBoss) {
            if (s.depthsBoss.hpBg) s.depthsBoss.hpBg.destroy();
            if (s.depthsBoss.hpFill) s.depthsBoss.hpFill.destroy();
            if (s.depthsBossNameText) s.depthsBossNameText.destroy();
            s.depthsBoss.destroy();
            s.depthsBoss = null;
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
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
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
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateDepthsMobs(delta);
        this.bossAI.updateDepthsBoss();
        this.updateDepthsMinions();
        this.checkReturnPortal();
    }

    updateDepthsMobs(delta) {
        const s = this.scene;
        if (s.zone !== 'depths' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        if (s.enemies.getLength() === 0 && !this.bossSpawned && !this.bossDefeated) {
            this.bossAI.spawnDepthsBoss();
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

    victoryDepthsBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
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

            if (s.depthsBoss.hpBg) s.depthsBoss.hpBg.destroy();
            if (s.depthsBoss.hpFill) s.depthsBoss.hpFill.destroy();
            if (s.depthsBossNameText) s.depthsBossNameText.destroy();
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

        if (Math.random() < 0.6) {
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
