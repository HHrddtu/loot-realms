import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT,
    TOWER_WIDTH, TOWER_ROOM_HEIGHT, TOWER_ROOMS,
    BOSS_DROP_CHANCE, RARITY_COLORS
} from '../config/index.js';
import { rollEquip, rollAccountEquip, rollZoneAccountEquip } from '../utils.js';
import { rollBossCrystals } from '../config/pets.js';
import { playBossDeath, playLoot, playPortal } from '../sound.js';

import { BaseZone } from '../systems/BaseZone.js';
import { TowerSpawner } from './TowerSpawner.js';
import { TowerBoss } from './TowerBoss.js';

export class TowerZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.currentRoom = 0;
        this.floorCleared = false;
        this.spawner = new TowerSpawner(this);
        this.bossAI = new TowerBoss(this);
    }

    setup(roomIndex = 0) {
        const s = this.scene;
        s._destroyOrphanedCaveStairs();
        const ox = (GAME_WIDTH - TOWER_WIDTH) / 2;
        this.currentRoom = roomIndex;
        this.floorCleared = false;

        s.cameras.main.setBackgroundColor('#1a1408');
        s.physics.world.setBounds(ox, 0, TOWER_WIDTH, TOWER_ROOM_HEIGHT);
        s.cameras.main.setBounds(ox, 0, TOWER_WIDTH, TOWER_ROOM_HEIGHT);
        s.towerOffsetX = ox;

        s.towerBg = s.add.tileSprite(ox, 0, TOWER_WIDTH, TOWER_ROOM_HEIGHT, 'tower_ground')
            .setOrigin(0, 0).setDepth(0);

        s.player.x = ox + TOWER_WIDTH / 2;
        s.player.y = TOWER_ROOM_HEIGHT - 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.towerMinions = s.physics.add.group();
        s.towerChests = s.physics.add.group();
        s.towerBoss = null;
        s.towerStairsUp = null;
        s.towerStairsUpHint = null;
        s.towerReturnPortal = null;
        s.towerThronePortal = null;

        this.spawner.spawnRoomEnemies(roomIndex);
        this.spawner.spawnRoomChest(roomIndex);

        this.setupEnemyOverlap();

        s.physics.add.overlap(s.player, s.towerMinions, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.zone = 'tower';
        s.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause');
        if (s.particles) {
            s.particles.startCaveDrip(TOWER_WIDTH, TOWER_ROOM_HEIGHT);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.towerMinions && s.towerMinions.getLength && s.towerMinions.getLength() > 0) {
            s.towerMinions.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.towerMinions.clear(true, true);
        }
        if (s.towerMinions) { s.towerMinions.destroy(); s.towerMinions = null; }
        if (s.towerChests && s.towerChests.getLength && s.towerChests.getLength() > 0) {
            s.towerChests.getChildren().forEach(ch => {
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
                if (ch.hintText) ch.hintText.destroy();
            });
            s.towerChests.clear(true, true);
        }
        if (s.towerChests) { s.towerChests.destroy(); s.towerChests = null; }
        if (s.towerBoss) {
            if (s.towerBoss.hpBg) s.towerBoss.hpBg.destroy();
            if (s.towerBoss.hpFill) s.towerBoss.hpFill.destroy();
            if (s.towerBossNameText) s.towerBossNameText.destroy();
            s.towerBoss.destroy();
            s.towerBoss = null;
        }
        if (s.towerBossVfx) {
            s.towerBossVfx.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.towerBossVfx = null;
        }
        if (s.towerBg) { s.towerBg.destroy(); s.towerBg = null; }
        if (s.towerStairsUp) { if (s.towerStairsUp.destroy) s.towerStairsUp.destroy(); s.towerStairsUp = null; }
        if (s.towerStairsUpHint) { s.towerStairsUpHint.destroy(); s.towerStairsUpHint = null; }
        if (s.towerReturnPortal) { if (s.towerReturnPortal.destroy) s.towerReturnPortal.destroy(); s.towerReturnPortal = null; }
        if (s.towerReturnPortalHint) { if (s.towerReturnPortalHint.destroy) s.towerReturnPortalHint.destroy(); s.towerReturnPortalHint = null; }
        if (s.towerThronePortal) { if (s.towerThronePortal.destroy) s.towerThronePortal.destroy(); s.towerThronePortal = null; }
        if (s.towerThronePortalHint) { if (s.towerThronePortalHint.destroy) s.towerThronePortalHint.destroy(); s.towerThronePortalHint = null; }
        this._destroyDefeatedUI();
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone === 'tower') {
            // Check throne portal (after boss)
            if (this.bossDefeated && s.towerThronePortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.towerThronePortal.x, s.towerThronePortal.y
            ) < 60) {
                this.enterThrone();
                return;
            }
            // Check return portal
            if (this.bossDefeated && s.towerReturnPortal && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.towerReturnPortal.x, s.towerReturnPortal.y
            ) < 60) {
                this.exitTower();
                return;
            }
            // Check stairs up (only if floor is cleared)
            if (this.floorCleared && s.towerStairsUp && Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.towerStairsUp.x, s.towerStairsUp.y
            ) < 60) {
                this.goUp();
                return;
            }
            s.attack();
        }
    }

    goUp() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(400, 26, 20, 8);
        s.time.delayedCall(400, () => {
            this.clear();
            const nextRoom = this.currentRoom + 1;
            this.setup(nextRoom);
            s.cameras.main.fadeIn(300, 26, 20, 8);
            s.transitioning = false;
        });
    }

    update(time, delta) {
        this.updateTowerMobs(delta);
        this.bossAI.updateTowerBoss();
        this.updateTowerMinions();
        this._updateStairsUpHint();
        this._updatePortalHints();
    }

    _updateStairsUpHint() {
        const s = this.scene;
        if (s.zone !== 'tower' || s.menuOpen || s.transitioning) return;
        if (this.bossDefeated) return;
        // No stairs in boss room
        if (this.currentRoom >= TOWER_ROOMS - 1) return;

        // Count alive enemies
        let alive = 0;
        if (s.enemies) {
            const children = s.enemies.getChildren();
            for (let i = 0; i < children.length; i++) {
                const e = children[i];
                if (e && e.active && e.stats && e.stats.hp > 0 && !e.stats.isBoss) {
                    alive++;
                }
            }
        }

        // Debug: log every 2 seconds
        if (!this._debugTimer) this._debugTimer = 0;
        this.floorCleared = alive === 0;

        if (this.floorCleared && !s.towerStairsUp) {
            const ox = s.towerOffsetX;
            s.towerStairsUp = s.add.rectangle(ox + TOWER_WIDTH / 2, 30, 60, 12, 0x8b6914, 0.7).setDepth(4);
            s.towerStairsUpHint = s.add.text(ox + TOWER_WIDTH / 2, 16, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
            s.floatingText(ox + TOWER_WIDTH / 2, 60, 'Stairs unlocked!', '#2ecc71');
        }

        if (s.towerStairsUp) {
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, s.towerStairsUp.x, s.towerStairsUp.y);
            if (dist < 80) {
                s.towerStairsUpHint.setText('SPACE = climb up');
            } else if (s.towerStairsUpHint) {
                s.towerStairsUpHint.setText('');
            }
        }
    }

    _updatePortalHints() {
        const s = this.scene;
        if (s.zone !== 'tower' || s.transitioning || s.menuOpen) return;
        if (this.bossDefeated && s.towerReturnPortal) {
            const pd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.towerReturnPortal.x, s.towerReturnPortal.y
            );
            if (pd < 80) {
                s.towerReturnPortalHint.setText('SPACE = return to Shadow District');
            } else if (s.towerReturnPortalHint) {
                s.towerReturnPortalHint.setText('');
            }
        }
        if (this.bossDefeated && s.towerThronePortal) {
            const tpd = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.towerThronePortal.x, s.towerThronePortal.y
            );
            if (tpd < 80) {
                s.towerThronePortalHint.setText('SPACE = enter Throne of Eternity');
            } else if (s.towerThronePortalHint) {
                s.towerThronePortalHint.setText('');
            }
        }
    }

    updateTowerMobs(delta) {
        const s = this.scene;
        if (s.zone !== 'tower' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        // Boss spawns when all enemies in boss room are killed
        if (this.currentRoom >= TOWER_ROOMS - 1 && s.enemies.getLength() === 0 && !this.bossSpawned && !this.bossDefeated) {
            this.bossAI.spawnTowerBoss();
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

    victoryTowerBoss() {
        const s = this.scene;
        if (this.bossDefeated) return;
        this.bossDefeated = true;
        playBossDeath();
        const ox = s.towerOffsetX;

        if (s.towerBoss) {
            if (s.particles) s.particles.spawnBossDeath(s.towerBoss.x, s.towerBoss.y);
            if (s.towerBoss.hpBg) s.towerBoss.hpBg.destroy();
            if (s.towerBoss.hpFill) s.towerBoss.hpFill.destroy();
            if (s.towerBossNameText) s.towerBossNameText.destroy();
            s.towerBoss.destroy();
            s.towerBoss = null;
        }

        s.defeatedText = s.add.text(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 - 50, 'FALLEN KING DEFEATED!', {
            fontSize: '26px', fill: '#cc8800', fontFamily: 'Arial', fontStyle: 'bold',
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
            const accItem = rollZoneAccountEquip('tower');
            if (s.addAccountEquip(accItem)) {
                lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' });
                playLoot();
            }
        }

        lootItems.forEach((item, i) => {
            const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
            const lt = s.add.text(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + i * 22, '+' + item.name, {
                fontSize: '14px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({
                targets: lt, alpha: 0, duration: 5000,
                onComplete: () => { if (lt.active) lt.destroy(); }
            });
        });

        // Throne portal
        s.towerThronePortal = s.add.sprite(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2, 'portal').setDepth(6).setScale(1.2).setTint(0xffd700);
        s.towerThronePortalHint = s.add.text(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 - 40, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        // Return portal
        s.towerReturnPortal = s.add.sprite(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + 60, 'portal').setDepth(6).setScale(1.2).setTint(0x8800ff);
        s.towerReturnPortalHint = s.add.text(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + 45, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.time.delayedCall(3000, () => {
            if (s.zone === 'tower') {
                s.floatingText(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + 80,
                    'The throne awaits!', '#2ecc71');
            }
        });

        s.checkLevelUp();
        s._checkAccountLevelUp();
        s.ui.updateUI();

        const hc = rollBossCrystals('tower', s.difficulty);
        if (hc > 0) {
            const granted = s.awardCrystals(hc, ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + 100);
            if (granted > 0) {
                s.floatingText(ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + 100, '+' + granted + ' \u{1F48E}', '#3498db');
            }
        }
    }

    enterTower() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 26, 20, 8);
        s.time.delayedCall(800, () => {
            s._setupZone('tower');
            s.cameras.main.fadeIn(500, 26, 20, 8);
            s.transitioning = false;
        });
    }

    exitTower() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'tower' || !this.bossDefeated) return;
        const ox = s.towerOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2 + 60
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('shadow');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    enterThrone() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (!this.bossDefeated) return;
        const ox = s.towerOffsetX;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, ox + TOWER_WIDTH / 2, TOWER_ROOM_HEIGHT / 2
        );
        if (dist >= 60) return;

        s.transitioning = true;
        playPortal();
        s.cameras.main.fadeOut(800, 200, 180, 100);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('throne');
            s.cameras.main.fadeIn(500, 200, 180, 100);
            s.transitioning = false;
        });
    }

    updateTowerMinions() {
        const s = this.scene;
        if (s.zone !== 'tower' || s.menuOpen || s.transitioning) return;
        if (!s.towerMinions) return;
        s.towerMinions.getChildren().forEach(e => {
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
}
