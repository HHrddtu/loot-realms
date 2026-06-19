import Phaser from 'phaser';
import {
    GAME_WIDTH, FOREST_HEIGHT, ENEMY_COUNT, STUMP_COUNT,
    PORTAL_POS, PORTAL_ENTER_DIST, FOREST_RETURN_POS,
    ENEMY_TYPES
} from '../config/index.js';
import { playPortal, startZoneMusic } from '../sound.js';
import { recordEncounter } from '../bestiary.js';

export class ForestZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup() {
        const s = this.scene;
        s.bossDefeated = false;
        s.cameras.main.setBackgroundColor('#16213e');
        s.physics.world.setBounds(0, 0, GAME_WIDTH, FOREST_HEIGHT);
        s.cameras.main.setBounds(0, 0, GAME_WIDTH, FOREST_HEIGHT);

        s.forestBg = s.add.tileSprite(0, 0, GAME_WIDTH, FOREST_HEIGHT, 'ground')
            .setOrigin(0, 0).setScale(1, FOREST_HEIGHT / 200).setDepth(0);

        s.portalSprite = s.add.sprite(PORTAL_POS.x, PORTAL_POS.y, 'tree_hole').setDepth(1);
        s.portalHint = s.add.text(PORTAL_POS.x, PORTAL_POS.y + 50, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.player.x = FOREST_RETURN_POS.x;
        s.player.y = FOREST_RETURN_POS.y;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.08, 0.08);
        s.cameras.main.setDeadzone(100, 80);

        s.enemies = s.physics.add.group();
        s.stumps = s.physics.add.group();
        s.traps = [];
        s.trapGroup = s.physics.add.group();
        s.groundLootGroup = s.physics.add.group();
        s.forestChests = s.physics.add.group();
        this.spawnEnemies();
        this.spawnStumps();
        this.spawnForestTraps();
        this.spawnForestGroundLoot();
        this.spawnForestChests();

        s.physics.add.overlap(s.player, s.enemies, (p, e) => {
            if (e.active && e.stats && !s.menuOpen && !s.transitioning) {
                s.combat.takeDamage(e.stats.damage);
            }
        }, null, s);

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
            if (s.multiplayer && s.mpSync && loot.mpId) {
                s.mpSync.broadcastLootCollected(loot.mpId);
            }
            const gold = loot.goldValue || 10;
            s.gold += gold;
            s.floatingText(loot.x, loot.y - 20, '+' + gold + ' gold', '#f1c40f');
            loot.destroy();
        }, null, s);

        s.physics.add.overlap(s.player, s.forestChests, (p, ch) => {
            if (!ch.active || ch.opened) return;
            const dist = Phaser.Math.Distance.Between(p.x, p.y, ch.x, ch.y);
            if (dist < 45) {
                ch.opened = true;
                ch.setTexture('treasure_chest');
                if (s.multiplayer && s.mpSync && ch.mpId) {
                    s.mpSync.broadcastChestOpened(ch.mpId);
                }
                const gold = 15 + Math.floor(Math.random() * 26);
                s.gold += gold;
                s.floatingText(ch.x, ch.y - 20, '+' + gold + ' gold', '#f1c40f');
            }
        }, null, s);

        s.zone = 'forest';
        s.npc.spawnNPCs();
        s.hintText.setText('Arrows=move | SPACE=attack/NPC | I=inventory | TAB=stats | T=talents | C=craft | Q=quests | P=pause | M=sound');
        startZoneMusic('forest');
        if (s.particles) {
            s.particles.startForestLeaves(800, FOREST_HEIGHT);
            s.particles.startFirefly(800, FOREST_HEIGHT);
        }
    }

    clear() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        if (s.traps) {
            s.traps.forEach(t => {
                if (t && t.destroy) t.destroy();
            });
            s.traps = null;
        }
        if (s.trapGroup) { s.trapGroup.clear(true, true); s.trapGroup.destroy(); s.trapGroup = null; }
        if (s.groundLootGroup) { s.groundLootGroup.clear(true, true); s.groundLootGroup.destroy(); s.groundLootGroup = null; }
        if (s.forestChests) {
            s.forestChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
            });
            s.forestChests.clear(true, true);
            s.forestChests.destroy();
            s.forestChests = null;
        }
        if (s.enemyProjectiles) {
            s.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.enemyProjectiles = [];
        }
        if (s.enemies && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
        if (s.stumps && s.stumps.getLength && s.stumps.getLength() > 0) {
            s.stumps.getChildren().forEach(st => {
                if (st.hpBg) st.hpBg.destroy();
                if (st.hpFill) st.hpFill.destroy();
            });
            s.stumps.clear(true, true);
        }
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
        if (s.forestBg) { s.forestBg.destroy(); s.forestBg = null; }
        if (s.portalSprite) { s.portalSprite.destroy(); s.portalSprite = null; }
        if (s.portalHint) { s.portalHint.destroy(); s.portalHint = null; }
        s.npcSprites.forEach(n => { if (n.nameTag) n.nameTag.destroy(); if (n.questIcon) n.questIcon.destroy(); n.destroy(); });
        s.npcSprites = [];
        s.questIcons = [];
        s.nearbyNpc = null;
    }

    update(time, delta) {
        this.checkPortalProximity();
        this.checkChestProximity();
    }

    checkChestProximity() {
        const s = this.scene;
        if (s.zone !== 'forest' || s.transitioning || s.menuOpen) return;
        if (s.forestChests) {
            s.forestChests.getChildren().forEach(ch => {
                if (!ch.active || ch.opened) return;
                const cdist = Phaser.Math.Distance.Between(
                    s.player.x, s.player.y, ch.x, ch.y
                );
                ch.hintText.setText(cdist < 45 ? 'Open!' : '');
            });
        }
    }

    spawnEnemies() {
        const s = this.scene;
        for (let i = 0; i < ENEMY_COUNT; i++) {
            const t = ENEMY_TYPES[i];
            const e = s.combat.makeEnemy(t, 100 + Math.random() * 600, 300 + Math.random() * 400);
            if (s.multiplayer && s.mpSync && e) {
                s.mpSync.assignMobId(e, t.key);
            }
        }
    }

    spawnStumps() {
        for (let i = 0; i < STUMP_COUNT; i++) {
            this.createStump(60 + Math.random() * 680, 450 + Math.random() * 300);
        }
    }

    createStump(x, y) {
        const s = this.scene;
        const stump = s.add.sprite(x, y, 'stump').setDepth(5);
        s.physics.add.existing(stump, false);
        stump.body.setSize(24, 18);
        stump.body.setCollideWorldBounds(true);
        stump.stats = { hp: 30, maxHp: 30 };
        stump.hpBg = s.add.rectangle(x, y - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
        stump.hpFill = s.add.rectangle(x, y - 18, 28, 3, 0x8b6914).setOrigin(0.5).setDepth(11);
        s.stumps.add(stump);
    }

    spawnForestTraps() {
        const s = this.scene;
        const texKeys = ['trap_spikes', 'trap_poison'];
        for (let i = 0; i < 4; i++) {
            const tx = 40 + Math.random() * (GAME_WIDTH - 80);
            const ty = 200 + Math.random() * (FOREST_HEIGHT - 400);
            const tex = texKeys[Math.floor(Math.random() * texKeys.length)];
            const trap = s.add.sprite(tx, ty, tex).setDepth(1).setAlpha(0.7);
            trap.onCooldown = false;
            s.trapGroup.add(trap);
            trap.body.setSize(20, 20);
            s.traps.push(trap);
            s.tweens.add({
                targets: trap, alpha: { from: 0.5, to: 0.8 },
                duration: 1200 + Math.random() * 800, yoyo: true, repeat: -1,
                ease: 'Sine.easeInOut', delay: Math.random() * 500
            });
        }
    }

    spawnForestGroundLoot() {
        const s = this.scene;
        for (let i = 0; i < 6; i++) {
            const lx = 30 + Math.random() * (GAME_WIDTH - 60);
            const ly = 150 + Math.random() * (FOREST_HEIGHT - 300);
            const loot = s.add.sprite(lx, ly, 'gold_pile').setDepth(1).setAlpha(0.85);
            loot.goldValue = 5 + Math.floor(Math.random() * 11);
            loot.mpId = 'loot_forest_' + i;
            s.groundLootGroup.add(loot);
            loot.body.setSize(10, 8);
            s.tweens.add({
                targets: loot, alpha: { from: 0.6, to: 1 },
                duration: 800 + Math.random() * 600, yoyo: true, repeat: -1,
                ease: 'Sine.easeInOut', delay: Math.random() * 400
            });
        }
    }

    spawnForestChests() {
        const s = this.scene;
        for (let i = 0; i < 4; i++) {
            const cx = 50 + Math.random() * (GAME_WIDTH - 100);
            const cy = 180 + Math.random() * (FOREST_HEIGHT - 360);
            const ch = s.add.sprite(cx, cy, 'treasure_chest').setDepth(6);
            ch.opened = false;
            ch.mpId = 'chest_forest_' + i;
            ch.hintText = s.add.text(cx, cy - 18, '', {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
            s.forestChests.add(ch);
            ch.body.setSize(22, 18);
            ch.body.setCollideWorldBounds(true);
        }
    }

    checkPortalProximity() {
        const s = this.scene;
        if (s.zone !== 'forest' || s.transitioning || s.menuOpen || !s.portalHint) return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, PORTAL_POS.x, PORTAL_POS.y);
        if (dist < PORTAL_ENTER_DIST) {
            s.portalHint.setText('SPACE to enter');
        } else {
            s.portalHint.setText('');
        }
    }

    enterPortal() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.zone !== 'forest') return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, PORTAL_POS.x, PORTAL_POS.y);
        if (dist >= PORTAL_ENTER_DIST) return;

        s.transitioning = true;
        s.portalHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(500, 0, 0, 0);
        s.time.delayedCall(500, () => {
            this.clear();
            s._setupZone('arena');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }
}
