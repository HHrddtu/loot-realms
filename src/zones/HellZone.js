import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    HELL_WIDTH, HELL_HEIGHT,
    HELL_LAVA_DAMAGE, HELL_LAVA_INTERVAL, HELL_HEAT_DAMAGE,
    HEAT_CRYSTAL,
    BOSS_DROP_CHANCE, RARITY_COLORS, VILLAGE_WIDTH, CEMETERY_HEIGHT
} from '../config/index.js';
import { rollEquip, rollAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { HellSpawner } from './HellSpawner.js';
import { HellBoss } from './HellBoss.js';

export class HellZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.spawner = new HellSpawner(this);
        this.bossAI = new HellBoss(this);
    }

    setup() {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - HELL_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#1a0000');
        s.physics.world.setBounds(ox, 0, HELL_WIDTH, HELL_HEIGHT);
        s.cameras.main.setBounds(ox, 0, HELL_WIDTH, HELL_HEIGHT);
        s.hellOffsetX = ox;

        s.hellBg = s.add.tileSprite(ox, 0, HELL_WIDTH, HELL_HEIGHT, 'hell_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + HELL_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.hellImps = s.physics.add.group();
        s.hellLavaCircles = [];
        s.hellBoss = null;
        this.bossDefeated = false;
        this.bossSpawned = false;
        s.hellHeatTimer = 0;
        s.hellLavaCooldown = false;
        s.hellReturnPortal = null;

        this.spawner.spawnHellCamps();
        this.spawner.spawnHellLavaCircles();

        this.setupEnemyOverlap();

        s.physics.add.overlap(s.player, s.hellImps, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'hell';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startHellEmbers(HELL_WIDTH, HELL_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.hellImps && s.hellImps.getLength && s.hellImps.getLength() > 0) {
            s.hellImps.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.hellImps.clear(true, true);
        }
        if (s.hellImps) { s.hellImps.destroy(); s.hellImps = null; }
        if (s.hellLavaCircles) {
            s.hellLavaCircles.forEach(lc => {
                if (lc.gfx) lc.gfx.destroy();
                if (lc.vfx) lc.vfx.destroy();
            });
            s.hellLavaCircles = null;
        }
        if (s.hellBoss) {
            if (s.hellBoss.hpBg) s.hellBoss.hpBg.destroy();
            if (s.hellBoss.hpFill) s.hellBoss.hpFill.destroy();
            if (s.hellBossNameText) s.hellBossNameText.destroy();
            s.hellBoss.destroy();
            s.hellBoss = null;
        }
        if (s.hellBossFireWaveVfx) {
            s.hellBossFireWaveVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.hellBossFireWaveVfx = null;
        }
        if (s.hellBg) { s.hellBg.destroy(); s.hellBg = null; }
        if (s.hellReturnPortal) { if (s.hellReturnPortal.destroy) s.hellReturnPortal.destroy(); s.hellReturnPortal = null; }
        if (s.hellReturnPortalHint) { s.hellReturnPortalHint.destroy(); s.hellReturnPortalHint = null; }
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'cemetery') {
            if (s.zones.village.bossDefeated && s.hellPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.hellPortal.x, s.hellPortal.y
            ) < 60) {
                this.enterHell();
            }
        } else if (s.zone === 'hell') {
            if (this.bossDefeated && s.hellReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.hellReturnPortal.x, s.hellReturnPortal.y
            ) < 60) {
                this.exitHell();
            } else {
                s.attack();
            }
        }
    }

    update(time, delta) {
        this.updateHellLava(time, delta);
        this.updateHellMobs(delta);
        this.bossAI.updateHellBoss();
        this.updateHellImps();
        this.checkReturnPortal();
    }

    updateHellLava(time, delta) {
        const s = this.scene;
        if (!s.hellLavaCircles || s.zone !== 'hell' || s.menuOpen || s.transitioning) return;
        s.hellLavaCircles.forEach(lc => {
            lc.timer += delta;
            if (lc.timer >= 4000) {
                lc.timer = 0;
                lc.vfx.setAlpha(0.6).setScale(1);
                s.tweens.add({
                    targets: lc.vfx, scaleX: 1.5, scaleY: 1.5, alpha: 0, duration: 1000,
                    ease: 'Quad.easeOut'
                });
            }
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, lc.x, lc.y);
            if (dist < lc.r && !s.hellLavaCooldown) {
                s.combat.takeDamage(HELL_LAVA_DAMAGE);
                s.hellLavaCooldown = true;
                s.time.delayedCall(HELL_LAVA_INTERVAL, () => { s.hellLavaCooldown = false; });
            }
        });
    }

    updateHellMobs(delta) {
        const s = this.scene;
        if (s.zone !== 'hell' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        if (s.enemies.getLength() === 0 && !this.bossSpawned && !this.bossDefeated) {
            this.bossAI.spawnHellBoss();
        }

        s.hellHeatTimer += s.game.loop.delta;
        if (s.hellHeatTimer >= 1000) {
            s.hellHeatTimer = 0;
            if (!s.equipment.armor || s.equipment.armor.id !== 'magma_armor') {
                s.combat.takeDamage(HELL_HEAT_DAMAGE);
                s.cameras.main.flash(200, 255, 0, 0, true);
            }
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

    victoryHellBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.hellOffsetX;

        if (s.hellBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.hellBoss.x, s.hellBoss.y);
            if (s.hellBoss.hpBg) s.hellBoss.hpBg.destroy();
            if (s.hellBoss.hpFill) s.hellBoss.hpFill.destroy();
            if (s.hellBossNameText) s.hellBossNameText.destroy();
            s.hellBoss.destroy();
            s.hellBoss = null;
        }

        s.defeatedText = s.add.text(ox + HELL_WIDTH / 2, 250, 'RED DEMON DEFEATED!', {
            fontSize: '26px', fill: '#ff2200', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({
            targets: s.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; }
        });

        s.defeatedLoot = [];
        const lootItems = [];

        const crystal = { ...HEAT_CRYSTAL, type: 'equip' };
        if (s.addEquip(crystal)) {
            lootItems.push(crystal);
            playLoot();
        }

        if (Math.random() < 0.6) {
            const item = rollEquip();
            if (s.addEquip(item)) {
                lootItems.push(item);
                playLoot();
            }
        }

        if (Math.random() < BOSS_DROP_CHANCE) {
            const accItem = rollAccountEquip();
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + HELL_WIDTH / 2, 280 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        s.hellReturnPortal = s.add.rectangle(ox + HELL_WIDTH / 2, HELL_HEIGHT / 2 + 60, 60, 12, 0xff2200, 0.5).setDepth(2);
        s.hellReturnPortalHint = s.add.text(ox + HELL_WIDTH / 2, HELL_HEIGHT / 2 + 45, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.time.delayedCall(3000, () => {
            if (s.zone === 'hell') {
                s.floatingText(ox + HELL_WIDTH / 2, HELL_HEIGHT / 2,
                    'Portal to Village appeared!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('hell', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + HELL_WIDTH / 2, 310);
            if (granted > 0) {
                s.floatingText(ox + HELL_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterHell() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'cemetery' || !s.zones.village.bossDefeated) return;
        const ox = s.villageOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + VILLAGE_WIDTH / 2, CEMETERY_HEIGHT - 40
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 255, 0, 0);
        s.time.delayedCall(800, () => {
            s._setupZone('hell');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    exitHell() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'hell' || !this.bossDefeated) return;
        const ox = s.hellOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + HELL_WIDTH / 2, HELL_HEIGHT / 2 + 60
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('village', !s.zones.village.isRestored);
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    updateHellImps() {
        const s = this.scene;
        if (s.zone !== 'hell' || s.menuOpen || s.transitioning) return;
        if (!s.hellImps) return;
        s.hellImps.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const aggroImp = s.getAggroTarget();
            const dx = aggroImp.x - e.x;
            const dy = aggroImp.y - e.y;
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
        if (s.zone !== 'hell' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.hellReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.hellReturnPortal.x, s.hellReturnPortal.y
            );
            if (pd < 80) {
                s.hellReturnPortalHint.setText('SPACE = return to Village');
            } else if (s.hellReturnPortalHint) {
                s.hellReturnPortalHint.setText('');
            }
        }
    }
}
