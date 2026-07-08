import Phaser from 'phaser';
import {
    CASTLE_WIDTH, CASTLE_ROOM_HEIGHT, CASTLE_ROOMS, CASTLE_ATTIC_INDEX,
    CASTLE_SPAWN_POS, GAME_WIDTH, GAME_HEIGHT, VILLAGE_WIDTH, VILLAGE_HEIGHT
} from '../config/index.js';
import { startZoneMusic } from '../sound.js';
import { BaseZone } from '../systems/BaseZone.js';
import { CastleSpawner } from './CastleSpawner.js';
import { CastleBoss } from './CastleBoss.js';

export class CastleZone extends BaseZone {
    constructor(scene) {
        super(scene);
        this.spawner = new CastleSpawner(scene, this);
        this.bossAI = new CastleBoss(scene, this);
        this.questDone = false;
        this.currentRoom = 0;
        this.floorCleared = false;
        this.bossDefeated = false;
        this.keyObtained = false;
        this.rescued = false;
        this.atticUnlocked = false;
        this.bossAlive = false;
        this.bossSpawned = false;
    }

    setup(roomIndex = 0) {
        this.scene._destroyOrphanedCaveStairs();
        // Clean up village NPCs that might still be visible
        // (not castleChildNPC - he leads the player here, should persist)
        const npcRefs = ['villageChildNPC', 'villageChildHint', 
                        'villageMerchantNPC', 'villageMerchantHint', 'villageInn', 'villageInnHint'];
        npcRefs.forEach(ref => {
            if (this.scene[ref]) {
                if (this.scene[ref].destroy) this.scene[ref].destroy();
                this.scene[ref] = null;
            }
        });
        this.scene.cameras.main.setBackgroundColor('#2c2c2c');
        this.scene.physics.world.setBounds(0, 0, CASTLE_WIDTH, CASTLE_ROOM_HEIGHT);
        this.scene.cameras.main.setBounds(0, 0, CASTLE_WIDTH, CASTLE_ROOM_HEIGHT);
        this.scene.castleOffsetX = 0;
        this.scene.castleOffsetY = 0;

        this.scene.player.x = CASTLE_SPAWN_POS.x;
        this.scene.player.y = CASTLE_SPAWN_POS.y;
        this.scene.player.body.setCollideWorldBounds(true);
        this.scene.cameras.main.startFollow(this.scene.player, true, 0.08, 0.08);
        this.scene.cameras.main.setDeadzone(50, 40);

        this.scene.enemies = this.scene.physics.add.group();
        this.scene.villageChests = this.scene.physics.add.group();

        this.currentRoom = roomIndex;
        this.bossAlive = false;
        this.bossDefeated = false;
        this.bossSpawned = false;
        this.keyObtained = false;
        this.atticUnlocked = false;
        this.rescued = false;
        this.floorCleared = false;
        this.scene.castleStairsUp = null;
        this.scene.castleStairsUpHint = null;
        this.scene.castleBossDoor = null;
        this.scene.castleBossDoorHint = null;

        this.spawner._drawRoom(roomIndex);
        this.spawner._spawnRoomContent(roomIndex);

        this.scene.physics.add.overlap(this.scene.player, this.scene.enemies, (p, e) => {
            if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                this.scene.combat.takeDamage(e.stats.damage);
            }
        }, null, this.scene);

        this.scene.zone = 'castle';
        this.scene.hintText.setText('SPACE=attack | I=inventory | TAB=stats | T=talents | Q/W/E=spells');
        startZoneMusic('castle');
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.villageChests && s.villageChests.getLength && s.villageChests.getLength() > 0) {
            s.villageChests.getChildren().forEach(ch => {
                if (ch.hintText) ch.hintText.destroy();
                if (ch.hpBg) ch.hpBg.destroy();
                if (ch.hpFill) ch.hpFill.destroy();
            });
            s.villageChests.clear(true, true);
        }
        if (s.villageChests) { s.villageChests.destroy(); s.villageChests = null; }
        if (s.castleDecor) {
            s.castleDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
            s.castleDecor = null;
        }
        if (s.castleBg) { s.castleBg.destroy(); s.castleBg = null; }
        if (s.castleAtticDoor) { if (s.castleAtticDoor.destroy) s.castleAtticDoor.destroy(); s.castleAtticDoor = null; }
        if (s.castleAtticHint) { if (s.castleAtticHint.destroy) s.castleAtticHint.destroy(); s.castleAtticHint = null; }
        if (s.castleStairsUp) { if (s.castleStairsUp.destroy) s.castleStairsUp.destroy(); s.castleStairsUp = null; }
        if (s.castleStairsUpHint) { if (s.castleStairsUpHint.destroy) s.castleStairsUpHint.destroy(); s.castleStairsUpHint = null; }
        if (s.castleBossDoor) { if (s.castleBossDoor.destroy) s.castleBossDoor.destroy(); s.castleBossDoor = null; }
        if (s.castleBossDoorHint) { if (s.castleBossDoorHint.destroy) s.castleBossDoorHint.destroy(); s.castleBossDoorHint = null; }
        if (s.castleBoss) {
            if (s.castleBoss.hpBg) s.castleBoss.hpBg.destroy();
            if (s.castleBoss.hpFill) s.castleBoss.hpFill.destroy();
            if (s.castleBossNameText) s.castleBossNameText.destroy();
            s.castleBoss.destroy();
            s.castleBoss = null;
        }
        if (s.castleVillagers) {
            s.castleVillagers.forEach(v => { if (v && v.destroy) v.destroy(); });
            s.castleVillagers = null;
        }
        if (s.castleElder) { if (s.castleElder.destroy) s.castleElder.destroy(); s.castleElder = null; }
        if (s.castleElderHint) { if (s.castleElderHint.destroy) s.castleElderHint.destroy(); s.castleElderHint = null; }
        if (this._castleBoy) { if (this._castleBoy.destroy) this._castleBoy.destroy(); this._castleBoy = null; }
        this._destroyDefeatedUI();
    }

    update(time, delta) {
        if (this.scene.zone !== 'castle' || this.scene.menuOpen || this.scene.transitioning) return;
        this.bossAI._updateBandits();
        this.bossAI._updateBoss();
        this._updateChestHints();
        this._updateStairsUpHint();
        this._updateBossDoorHint();
        this._updateAtticHint();
    }

    handleSpace() {
        if (this.scene.transitioning || this.scene.menuOpen) return;
        if (this.scene.nearbyNpc) {
            this.scene.npc.interactWithNpc();
            return;
        }

        if (this.scene.villageChests) {
            const chests = this.scene.villageChests.getChildren();
            for (let i = 0; i < chests.length; i++) {
                const ch = chests[i];
                if (!ch.active || ch.broken) continue;
                const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, ch.x, ch.y);
                if (dist < 50) { this.spawner._openChest(ch); return; }
            }
        }

        if (this.scene.castleStairsUp) {
            const su = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.castleStairsUp.x, this.scene.castleStairsUp.y);
            if (su < 50 && this.floorCleared) { this.goUp(); return; }
        }

        if (this.scene.castleBossDoor && this.bossDefeated && this.atticUnlocked) {
            const bd = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.castleBossDoor.x, this.scene.castleBossDoor.y);
            if (bd < 50) { this._enterAttic(); return; }
        }

        if (this.scene.castleAtticDoor && !this.atticUnlocked) {
            const ad = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.castleAtticDoor.x, this.scene.castleAtticDoor.y);
            if (ad < 50) { this._unlockAttic(); return; }
        }

        if (this.currentRoom === CASTLE_ATTIC_INDEX && this.scene.castleElder) {
            const ed = Phaser.Math.Distance.Between(
                this.scene.player.x, this.scene.player.y,
                this.scene.castleElder.x, this.scene.castleElder.y
            );
            if (ed < 60) { this._talkToElder(); return; }
        }

        if (!this.bossDefeated && this.currentRoom === CASTLE_ROOMS - 1) {
            this.scene.attack();
        } else if (this.scene.enemies && this.scene.enemies.getLength() > 0) {
            this.scene.attack();
        } else {
            this.scene.attack();
        }
    }

    /* ===== ATTIC ===== */

    _unlockAttic() {
        if (this.atticUnlocked) return;
        if (!this.keyObtained) {
            this.scene.floatingText(CASTLE_WIDTH / 2, 80, 'Need Castle Key!', '#e74c3c');
            return;
        }
        this.atticUnlocked = true;
        if (this.scene.castleAtticDoor) {
            this.scene.castleAtticDoor.destroy();
            this.scene.castleAtticDoor = null;
        }
        if (this.scene.castleAtticHint) {
            this.scene.castleAtticHint.setText('');
        }
        this.scene.floatingText(CASTLE_WIDTH / 2, 80, 'The door is unlocked!', '#2ecc71');
    }

    _talkToElder() {
        if (this.scene.transitioning || this.scene.menuOpen) return;
        if (!this.scene.castleElder) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleElder.x, this.scene.castleElder.y
        );
        if (dist > 60) return;

        this.scene.transitioning = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();

        if (this.scene.castleElderHint) this.scene.castleElderHint.setText('');

        const elderMsg = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60,
            'Elder: "Thank you, hero... You saved us all.\nWe were taken by the bandits so long ago.\nPlease, take us back home..."', {
            fontSize: '15px', fill: '#f5cba7', fontFamily: 'Georgia', fontStyle: 'italic',
            stroke: '#000', strokeThickness: 3, wordWrap: { width: 440 }, align: 'center'
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        const elderBox = this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 500, 80, 0x000000, 0.75)
            .setDepth(19).setScrollFactor(0);

        const spaceHint = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, '[ SPACE ]', {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

        this.scene.time.delayedCall(500, () => {
            this.scene.input.keyboard.once('keydown-SPACE', () => {
                elderMsg.destroy();
                elderBox.destroy();
                spaceHint.destroy();
                this._returnToVillage();
            });
        });
    }

    _returnToVillage() {
        this.scene.cameras.main.fadeOut(1200, 0, 0, 0);
        this.scene.time.delayedCall(1200, () => {
            this.clear();
            this.scene.zones.village.isRestored = true;
            this.questDone = true;
            this.rescued = true;

            this.scene._setupVillage(false);

            const ox = this.scene.villageOffsetX || 0;
            const cx = ox + VILLAGE_WIDTH / 2;

            const thankTexts = [
                '"Thank you, hero!"',
                '"We are free at last!"',
                '"Bless you, brave one!"'
            ];
            let idx = 0;
            const thankTimer = this.scene.time.addEvent({
                delay: 1500, repeat: thankTexts.length - 1,
                callback: () => {
                    if (idx < thankTexts.length) {
                        this.scene.floatingText(
                            cx + Phaser.Math.Between(-100, 100),
                            180 + Phaser.Math.Between(-20, 20),
                            thankTexts[idx], '#2ecc71'
                        );
                        idx++;
                    }
                }
            });

            this.scene.time.delayedCall(thankTexts.length * 1500 + 500, () => {
                const boyX = cx - 60;
                const boyY = 280;
                this._castleBoy = this.scene.add.sprite(boyX, boyY, 'child_npc_boy').setDepth(6);
                this.scene.tweens.add({
                    targets: this._castleBoy, y: boyY - 20, duration: 1200, ease: 'Power2',
                    onComplete: () => {
                        const boyMsg = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40,
                            '"You... you saved everyone! You are amazing!\nI want to be just like you when I grow up!"', {
                            fontSize: '15px', fill: '#2ecc71', fontFamily: 'Georgia', fontStyle: 'italic',
                            stroke: '#000', strokeThickness: 3, wordWrap: { width: 420 }, align: 'center'
                        }).setOrigin(0.5).setDepth(20).setScrollFactor(0);

                        const boyBox = this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30, 460, 60, 0x000000, 0.75)
                            .setDepth(19).setScrollFactor(0);

                        this.scene.time.delayedCall(3500, () => {
                            boyMsg.destroy();
                            boyBox.destroy();
                            this.scene.floatingText(boyX, boyY - 30, '*waves goodbye*', '#f1c40f');
                            this.scene.tweens.add({
                                targets: this._castleBoy, x: ox + VILLAGE_WIDTH + 50, duration: 2000, ease: 'Power1',
                                onComplete: () => { if (this._castleBoy) { this._castleBoy.destroy(); this._castleBoy = null; } }
                            });

                            this.scene.time.delayedCall(2500, () => {
                                this._villageTimeSkip();
                            });
                        });
                    }
                });
            });

            this.scene.cameras.main.fadeIn(1000, 0, 0, 0);
            this.scene.transitioning = false;
            this.scene.menuOpen = false;
            this.scene.physics.resume();
        });
    }

    _villageTimeSkip() {
        this.scene.transitioning = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();

        this.scene.cameras.main.fadeOut(1500, 0, 0, 0);
        this.scene.time.delayedCall(1500, () => {
            const timeText = this.scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, '20 years later...', {
                fontSize: '28px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'italic',
                stroke: '#000', strokeThickness: 4
            }).setOrigin(0.5).setDepth(100).setScrollFactor(0);

            this.scene.cameras.main.fadeIn(1000, 0, 0, 0);

            this.scene.time.delayedCall(3000, () => {
                timeText.destroy();
                this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
                this.scene.time.delayedCall(1000, () => {
                    this.scene.zones.village.isRestored = true;
                    this.scene.zones.village.isThriving = true;
                    this.questDone = true;
                    this.scene.zone = 'village';
                    this.scene._setupVillage(false);
                    this.scene.cameras.main.fadeIn(1000, 0, 0, 0);
                    this.scene.transitioning = false;
                    this.scene.menuOpen = false;
                    this.scene.physics.resume();

                    this.scene.time.delayedCall(500, () => {
                        const ox = this.scene.villageOffsetX || 0;
                        this.scene.floatingText(
                            ox + VILLAGE_WIDTH / 2, 200,
                            'The village has thrived for 20 years!', '#2ecc71'
                        );
                    });
                });
            });
        });
    }

    /* ===== HINTS ===== */

    _updateChestHints() {
        if (!this.scene.villageChests) return;
        this.scene.villageChests.getChildren().forEach(ch => {
            if (!ch.active || ch.broken || !ch.hintText) return;
            const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, ch.x, ch.y);
            ch.hintText.setText(dist < 50 ? 'SPACE = open' : '');
        });
    }

    _updateAtticHint() {
        if (!this.scene.castleAtticHint || !this.scene.castleAtticDoor) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleAtticDoor.x, this.scene.castleAtticDoor.y
        );
        if (dist < 50) {
            if (this.keyObtained && !this.atticUnlocked) {
                this.scene.castleAtticHint.setText('SPACE = unlock with key');
            } else if (!this.keyObtained) {
                this.scene.castleAtticHint.setText('Need Castle Key');
            }
        } else {
            this.scene.castleAtticHint.setText('');
        }
    }

    _updateStairsUpHint() {
        if (this.currentRoom >= CASTLE_ROOMS - 1) return;

        const alive = this.scene.enemies ? this.scene.enemies.getChildren().filter(e => e.active && e.stats && e.stats.hp > 0 && !e.stats.isBoss).length : 0;
        const wasCleared = this.floorCleared;
        this.floorCleared = alive === 0;

        if (this.floorCleared && !this.scene.castleStairsUp) {
            this.spawner._spawnStairsUp();
        }

        if (this.scene.castleStairsUp && this.scene.castleStairsUpHint) {
            const dist = Phaser.Math.Distance.Between(
                this.scene.player.x, this.scene.player.y,
                this.scene.castleStairsUp.x, this.scene.castleStairsUp.y
            );
            this.scene.castleStairsUpHint.setText(dist < 50 ? 'SPACE = go up' : '');
        }
    }

    _updateBossDoorHint() {
        if (!this.scene.castleBossDoor || !this.scene.castleBossDoorHint) return;
        const dist = Phaser.Math.Distance.Between(
            this.scene.player.x, this.scene.player.y,
            this.scene.castleBossDoor.x, this.scene.castleBossDoor.y
        );
        if (dist < 50) {
            if (this.bossDefeated && this.atticUnlocked) {
                this.scene.castleBossDoorHint.setText('SPACE = enter');
            } else if (!this.bossDefeated) {
                this.scene.castleBossDoorHint.setText('Defeat the boss first');
            } else if (!this.atticUnlocked) {
                this.scene.castleBossDoorHint.setText('Unlock the attic first');
            }
        } else {
            this.scene.castleBossDoorHint.setText('');
        }
    }

    /* ===== ROOM TRANSITIONS ===== */

    goUp() {
        if (this.scene.transitioning) return;
        const room = this.currentRoom;

        if (room >= CASTLE_ROOMS - 1) return;

        this.scene.transitioning = true;
        this.scene.cameras.main.fadeOut(400, 0, 0, 0);
        this.scene.time.delayedCall(400, () => {
            this.currentRoom++;
            this.floorCleared = false;
            this.scene.physics.world.colliders.destroy();
            if (this.scene.enemies) {
                this.scene.enemies.getChildren().forEach(e => {
                    if (e.hpBg) e.hpBg.destroy();
                    if (e.hpFill) e.hpFill.destroy();
                });
                this.scene.enemies.clear(true, true);
            }
            if (this.scene.villageChests) {
                this.scene.villageChests.getChildren().forEach(ch => {
                    if (ch.hintText) ch.hintText.destroy();
                    if (ch.hpBg) ch.hpBg.destroy();
                    if (ch.hpFill) ch.hpFill.destroy();
                });
                this.scene.villageChests.clear(true, true);
            }
            if (this.scene.castleDecor) {
                this.scene.castleDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
                this.scene.castleDecor = [];
            }
            if (this.scene.castleBg) { this.scene.castleBg.destroy(); this.scene.castleBg = null; }
            if (this.scene.castleAtticDoor) { if (this.scene.castleAtticDoor.destroy) this.scene.castleAtticDoor.destroy(); this.scene.castleAtticDoor = null; }
            if (this.scene.castleAtticHint) { if (this.scene.castleAtticHint.destroy) this.scene.castleAtticHint.destroy(); this.scene.castleAtticHint = null; }
            if (this.scene.castleStairsUp) { if (this.scene.castleStairsUp.destroy) this.scene.castleStairsUp.destroy(); this.scene.castleStairsUp = null; }
            if (this.scene.castleStairsUpHint) { if (this.scene.castleStairsUpHint.destroy) this.scene.castleStairsUpHint.destroy(); this.scene.castleStairsUpHint = null; }
            if (this.scene.castleBossDoor) { if (this.scene.castleBossDoor.destroy) this.scene.castleBossDoor.destroy(); this.scene.castleBossDoor = null; }
            if (this.scene.castleBossDoorHint) { if (this.scene.castleBossDoorHint.destroy) this.scene.castleBossDoorHint.destroy(); this.scene.castleBossDoorHint = null; }
            if (this.scene.castleElder) { if (this.scene.castleElder.destroy) this.scene.castleElder.destroy(); this.scene.castleElder = null; }
            if (this.scene.castleElderHint) { if (this.scene.castleElderHint.destroy) this.scene.castleElderHint.destroy(); this.scene.castleElderHint = null; }

            this.spawner._drawRoom(this.currentRoom);
            this.spawner._spawnRoomContent(this.currentRoom);

            this.scene.physics.add.overlap(this.scene.player, this.scene.enemies, (p, e) => {
                if (e.active && e.stats && !this.scene.menuOpen && !this.scene.transitioning) {
                    this.scene.combat.takeDamage(e.stats.damage);
                }
            }, null, this.scene);

            this.scene.player.x = CASTLE_SPAWN_POS.x;
            this.scene.player.y = CASTLE_ROOM_HEIGHT - 50;
            this.scene.cameras.main.fadeIn(400, 0, 0, 0);
            this.scene.transitioning = false;
        });
    }

    _enterAttic() {
        if (this.scene.transitioning) return;
        this.scene.transitioning = true;
        this.scene.cameras.main.fadeOut(400, 0, 0, 0);
        this.scene.time.delayedCall(400, () => {
            this.currentRoom = CASTLE_ATTIC_INDEX;
            this.scene.physics.world.colliders.destroy();
            if (this.scene.enemies) {
                this.scene.enemies.getChildren().forEach(e => {
                    if (e.hpBg) e.hpBg.destroy();
                    if (e.hpFill) e.hpFill.destroy();
                });
                this.scene.enemies.clear(true, true);
            }
            if (this.scene.villageChests) {
                this.scene.villageChests.getChildren().forEach(ch => {
                    if (ch.hintText) ch.hintText.destroy();
                    if (ch.hpBg) ch.hpBg.destroy();
                    if (ch.hpFill) ch.hpFill.destroy();
                });
                this.scene.villageChests.clear(true, true);
            }
            if (this.scene.castleDecor) {
                this.scene.castleDecor.forEach(d => { if (d && d.destroy) d.destroy(); });
                this.scene.castleDecor = [];
            }
            if (this.scene.castleBg) { this.scene.castleBg.destroy(); this.scene.castleBg = null; }
            if (this.scene.castleAtticDoor) { if (this.scene.castleAtticDoor.destroy) this.scene.castleAtticDoor.destroy(); this.scene.castleAtticDoor = null; }
            if (this.scene.castleAtticHint) { if (this.scene.castleAtticHint.destroy) this.scene.castleAtticHint.destroy(); this.scene.castleAtticHint = null; }
            if (this.scene.castleStairsUp) { if (this.scene.castleStairsUp.destroy) this.scene.castleStairsUp.destroy(); this.scene.castleStairsUp = null; }
            if (this.scene.castleStairsUpHint) { if (this.scene.castleStairsUpHint.destroy) this.scene.castleStairsUpHint.destroy(); this.scene.castleStairsUpHint = null; }
            if (this.scene.castleBossDoor) { if (this.scene.castleBossDoor.destroy) this.scene.castleBossDoor.destroy(); this.scene.castleBossDoor = null; }
            if (this.scene.castleBossDoorHint) { if (this.scene.castleBossDoorHint.destroy) this.scene.castleBossDoorHint.destroy(); this.scene.castleBossDoorHint = null; }
            if (this.scene.castleElder) { if (this.scene.castleElder.destroy) this.scene.castleElder.destroy(); this.scene.castleElder = null; }
            if (this.scene.castleElderHint) { if (this.scene.castleElderHint.destroy) this.scene.castleElderHint.destroy(); this.scene.castleElderHint = null; }

            this.spawner._drawRoom(CASTLE_ATTIC_INDEX);
            this.spawner._spawnRoomContent(CASTLE_ATTIC_INDEX);

            this.scene.player.x = CASTLE_SPAWN_POS.x;
            this.scene.player.y = CASTLE_ROOM_HEIGHT - 50;
            this.scene.cameras.main.fadeIn(400, 0, 0, 0);
            this.scene.transitioning = false;
        });
    }
}
