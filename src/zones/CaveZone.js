import Phaser from 'phaser';
import {
    GAME_WIDTH, GAME_HEIGHT, CAVE_WIDTH, CAVE_HEIGHT,
    DIFF_COLORS
} from '../config/index.js';
import { playPortal, startZoneMusic } from '../sound.js';
import { BaseZone } from '../systems/BaseZone.js';
import { CaveSpawner } from './CaveSpawner.js';
import { CaveBoss } from './CaveBoss.js';

export class CaveZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.spawner = new CaveSpawner(scene, this);
        this.bossAI = new CaveBoss(scene, this);
        this.bossDefeated = false;
        this.bossAlive = false;
        this.bossSpawned = false;
    }

    setup() {
        const s = this.scene;
        const caveOffsetX = (GAME_WIDTH - CAVE_WIDTH) / 2;
        s.cameras.main.setBackgroundColor('#0d0d0d');
        s.physics.world.setBounds(caveOffsetX, 0, CAVE_WIDTH, CAVE_HEIGHT);
        s.cameras.main.setBounds(caveOffsetX, 0, CAVE_WIDTH, CAVE_HEIGHT);

        s.caveBg = s.add.tileSprite(caveOffsetX, 0, CAVE_WIDTH, CAVE_HEIGHT, 'cave_ground')
            .setOrigin(0, 0).setDepth(0);

        s.caveOffsetX = caveOffsetX;
        s.player.x = caveOffsetX + CAVE_WIDTH / 2;
        s.player.y = 50;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(50, 40);

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();
        s.caveChests = s.physics.add.group();
        s.caveTorches = [];
        s.traps = [];

        this.spawner.spawnCaveEnemies();
        this.spawner.spawnCaveChests();
        this.spawner.spawnCaveTorches();

        s.caveDarkness = s.add.image(caveOffsetX + CAVE_WIDTH / 2, 300, 'mine_darkness')
            .setScale(CAVE_WIDTH / 800, CAVE_HEIGHT / 600)
            .setDepth(13).setAlpha(0.92).setScrollFactor(0);

        this.bossAlive = false;
        this.bossSpawned = false;
        s.caveSmallBats = s.physics.add.group();

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.physics.add.overlap(s.player, s.caveSmallBats, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

        s.trapGroup = s.physics.add.group();
        s.groundLootGroup = s.physics.add.group();
        s.caveExtraChests = s.physics.add.group();

        this.spawner.spawnTrapsInZone('cave');
        this.spawner.spawnGroundLootInZone('cave');
        this.spawner.spawnExtraChestsInZone('cave');

        s.physics.add.overlap(s.player, s.trapGroup, (p, trap) => {
            if (!trap.active || trap.onCooldown || s.menuOpen || s.transitioning) return;
            trap.onCooldown = true;
            const dmg = 10 + Math.floor(Math.random() * 11);
            s.combat.takeDamage(dmg);
            s.floatingText(trap.x, trap.y - 20, '-' + dmg, '#e74c3c');
            const angle = Math.atan2(p.y - trap.y, p.x - trap.x);
            const kb = 150;
            p.body.setVelocity(Math.cos(angle) * kb, Math.sin(angle) * kb);
            trap.setAlpha(0.2);
            s.time.delayedCall(3000, () => {
                if (trap.active) {
                    trap.onCooldown = false;
                    trap.setAlpha(0.7);
                }
            });
        }, null, s);

        s.physics.add.overlap(s.player, s.groundLootGroup, (p, loot) => {
            if (!loot.active) return;
            const gold = loot.goldValue || 10;
            s.gold += gold;
            s.floatingText(loot.x, loot.y - 20, '+' + gold + ' gold', '#f1c40f');
            loot.destroy();
        }, null, s);

        s.zone = 'cave';
        s.npc.spawnNPCs();
        s.hintText.setText('Q=quests | I=inventory | TAB=stats | T=talents | P=pause');
        startZoneMusic('cave');
        if (s.particles) {
            s.particles.startCaveDrip(500, 1200);
        }

        if (this.bossDefeated) {
            const stairsX = s.caveOffsetX + CAVE_WIDTH / 2;
            s.caveStairs = s.add.sprite(stairsX, CAVE_HEIGHT - 80, 'cave_stairs').setDepth(1);
            s.caveStairsHint = s.add.text(stairsX, CAVE_HEIGHT - 55, '', {
                fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.traps) {
            s.traps.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.traps = null;
        }
        if (s.trapGroup) { s.trapGroup.clear(true, true); s.trapGroup.destroy(); s.trapGroup = null; }
        if (s.groundLootGroup) { s.groundLootGroup.clear(true, true); s.groundLootGroup.destroy(); s.groundLootGroup = null; }
        if (s.caveExtraChests) {
            s.caveExtraChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.caveExtraChests.clear(true, true);
            s.caveExtraChests.destroy();
            s.caveExtraChests = null;
        }
        if (s.caveChests && s.caveChests.getLength && s.caveChests.getLength() > 0) {
            s.caveChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.caveChests.clear(true, true);
        }
        if (s.caveChests) { s.caveChests.destroy(); s.caveChests = null; }
        if (s.caveSmallBats && s.caveSmallBats.getLength && s.caveSmallBats.getLength() > 0) {
            s.caveSmallBats.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.caveSmallBats.clear(true, true);
        }
        if (s.caveSmallBats) { s.caveSmallBats.destroy(); s.caveSmallBats = null; }
        if (s.caveBoss) {
            if (s.caveBoss.hpBg) s.caveBoss.hpBg.destroy();
            if (s.caveBoss.hpFill) s.caveBoss.hpFill.destroy();
            if (s.caveBoss.aoeRing) s.caveBoss.aoeRing.destroy();
            if (s.caveBoss.aoeRing2) s.caveBoss.aoeRing2.destroy();
            if (s.caveBoss.telegraph) s.caveBoss.telegraph.destroy();
            if (s.caveBoss.auraRing) s.caveBoss.auraRing.destroy();
            s.caveBoss.destroy();
            s.caveBoss = null;
        }
        if (s.caveBossNameText) { s.caveBossNameText.destroy(); s.caveBossNameText = null; }
        if (s.caveBossTimer) { s.caveBossTimer.destroy(); s.caveBossTimer = null; }
        if (s.caveBg) { s.caveBg.destroy(); s.caveBg = null; }
        if (s.caveDarkness) { s.caveDarkness.destroy(); s.caveDarkness = null; }
        if (s.caveStairs) { s.caveStairs.destroy(); s.caveStairs = null; }
        if (s.caveStairsHint) { s.caveStairsHint.destroy(); s.caveStairsHint = null; }
        if (s.caveTorches) {
            s.caveTorches.forEach(t => { if (t.torch) t.torch.destroy(); if (t.glow) t.glow.destroy(); });
            s.caveTorches = null;
        }
        this._destroyDefeatedUI();
        this.bossAlive = false;
        this.bossSpawned = false;
        this.bossDefeated = false;
    }

    update(time, delta) {
        const s = this.scene;
        if (s.zone === 'cave') {
            this.checkCaveProximity();
            this.caveBossSpawnCheck();
            this.updateCaveMobs();
            this.bossAI.updateCaveBoss();
        }
    }

    checkCaveProximity() {
        const s = this.scene;
        if (s.zone !== 'cave' || s.transitioning || s.menuOpen) return;

        if (s.caveChests) {
            s.caveChests.getChildren().forEach(ch => {
                if (!ch.active || ch.broken) return;
                const cdist = Phaser.Math.Distance.Between(
                    s.player.x, s.player.y, ch.x, ch.y
                );
                ch.hintText.setText(cdist < 45 ? 'Attack!' : '');
            });
        }

        if (s.caveExtraChests) {
            s.caveExtraChests.getChildren().forEach(ch => {
                if (!ch.active || ch.broken) return;
                const cdist = Phaser.Math.Distance.Between(
                    s.player.x, s.player.y, ch.x, ch.y
                );
                ch.hintText.setText(cdist < 45 ? 'Attack!' : '');
            });
        }

        if (s.caveStairs && this.bossDefeated) {
            const sdist = Phaser.Math.Distance.Between(
                s.player.x, s.player.y, s.caveStairs.x, s.caveStairs.y
            );
            if (s.caveStairsHint) {
                s.caveStairsHint.setText(sdist < 50 ? 'SPACE to enter Village' : '');
            }
        }
    }

    enterCaveVillage() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'cave' || !this.bossDefeated) return;
        if (!s.caveStairs) return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.caveStairs.x, s.caveStairs.y
        );
        if (dist >= 50) return;

        s.transitioning = true;
        if (s.caveStairsHint) s.caveStairsHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            this.clear();
            s._setupZone('village');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    updateCaveMobs() {
        const s = this.scene;
        if (s.zone !== 'cave' || s.menuOpen || s.transitioning) return;
        if (!s.enemies) return;

        const ox = s.caveOffsetX;

        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            if (e === s.caveBoss) return;

            const aggroBat = s.getAggroTarget();
            const dx = aggroBat.x - e.x;
            const dy = aggroBat.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const clampX = Phaser.Math.Clamp(e.x, ox + 16, ox + CAVE_WIDTH - 16);
            const clampY = Phaser.Math.Clamp(e.y, 16, CAVE_HEIGHT - 16);
            if (e.x !== clampX || e.y !== clampY) {
                e.x = clampX;
                e.y = clampY;
            }

            if (dist < 250) {
                const speed = 55;
                if (dist > 25) {
                    e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }
            } else {
                const centerX = ox + CAVE_WIDTH / 2;
                const centerY = CAVE_HEIGHT / 2;
                const wDx = centerX - e.x;
                const wDy = centerY - e.y;
                const wDist = Math.sqrt(wDx * wDx + wDy * wDy);
                if (wDist > 60) {
                    e.body.setVelocity((wDx / wDist) * 25, (wDy / wDist) * 25);
                    e.setFlipX(wDx < 0);
                } else {
                    e.body.setVelocity(0);
                }
            }

            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.y - e.stats.bh / 2 - 8;
        });

        if (s.caveSmallBats) {
            s.caveSmallBats.getChildren().forEach(e => {
                if (!e.active || !e.stats) return;
                const aggroSmall = s.getAggroTarget();
                const dx = aggroSmall.x - e.x;
                const dy = aggroSmall.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    const speed = 70;
                    if (dist > 20) {
                        e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                        e.setFlipX(dx < 0);
                    } else {
                        e.body.setVelocity(0);
                    }
                } else {
                    e.body.setVelocity(0);
                }
                e.hpBg.x = e.x;
                e.hpBg.y = e.y - e.stats.bh / 2 - 6;
                e.hpFill.x = e.x;
                e.hpFill.y = e.y - e.stats.bh / 2 - 6;
            });
        }
    }

    caveBossSpawnCheck() {
        const s = this.scene;
        if (s.zone !== 'cave' || this.bossSpawned || this.bossDefeated) return;
        const alive = s.enemies.getChildren().filter(e => e.active);
        if (alive.length <= 2) {
            this.bossSpawned = true;
            this.bossAI.spawnCaveBoss();
        }
    }

    handleSpace() {
        const s = this.scene;
        if (s.nearbyNpc) {
            s.npc.interactWithNpc();
            return;
        }
        if (this.bossDefeated && s.caveStairs && Phaser.Math.Distance.Between(
            s.player.x, s.player.y, s.caveStairs.x, s.caveStairs.y
        ) < 50) {
            this.enterCaveVillage();
        } else {
            s.attack();
        }
    }
}
