import Phaser from 'phaser';
import {
    CASTLE_WIDTH, CASTLE_ROOM_HEIGHT, CASTLE_ROOMS, CASTLE_ATTIC_INDEX,
    CASTLE_CHEST_POSITIONS, CASTLE_VILLAGER_POSITIONS,
    BANDIT_TYPES, CASTLE_CHEST_DROP_CHANCE, GAME_WIDTH
} from '../config/index.js';
import { rollZoneEquip } from '../utils.js';
import { playLoot } from '../sound.js';

export class CastleSpawner {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    _openChest(ch) {
        ch.broken = true;
        ch.setAlpha(0.3);
        if (ch.hpBg) ch.hpBg.setAlpha(0);
        if (ch.hpFill) ch.hpFill.setAlpha(0);
        if (ch.hintText) ch.hintText.setText('');

        if (ch.loot && ch.loot.length > 0) {
            ch.loot.forEach(item => {
                this.scene.equipBag.push(item);
                this.scene.floatingText(ch.x, ch.y - 20, `${item.name} (${item.rarity})`, '#f1c40f');
            });
        } else {
            const gold = Math.floor(Math.random() * 20) + 5;
            this.scene.gold = (this.scene.gold || 0) + gold;
            this.scene.floatingText(ch.x, ch.y - 20, `+${gold} gold`, '#f1c40f');
        }
        playLoot();
    }

    /* ===== ROOM DRAWING ===== */

    _drawRoom(roomIndex) {
        this.scene.castleBg = this.scene.add.tileSprite(0, 0, CASTLE_WIDTH, CASTLE_ROOM_HEIGHT, 'castle_ground')
            .setOrigin(0, 0).setDepth(0);
        this.scene.castleDecor = [];

        if (roomIndex < CASTLE_ROOMS) {
            this._drawWalls();
            if (roomIndex === CASTLE_ROOMS - 1) this._drawBossDoor();
        } else if (roomIndex === CASTLE_ATTIC_INDEX) {
            this._drawAttic();
        }
    }

    _drawWalls() {
        const wallColor = 0x555555;
        const leftWall = this.scene.add.rectangle(0, 0, 20, CASTLE_ROOM_HEIGHT, wallColor).setOrigin(0, 0).setDepth(1);
        const rightWall = this.scene.add.rectangle(CASTLE_WIDTH - 20, 0, 20, CASTLE_ROOM_HEIGHT, wallColor).setOrigin(0, 0).setDepth(1);
        const topWall = this.scene.add.rectangle(0, 0, CASTLE_WIDTH, 20, wallColor).setOrigin(0, 0).setDepth(1);
        const bottomWall = this.scene.add.rectangle(0, CASTLE_ROOM_HEIGHT - 20, CASTLE_WIDTH, 20, wallColor).setOrigin(0, 0).setDepth(1);
        this.scene.castleDecor.push(leftWall, rightWall, topWall, bottomWall);

        for (let i = 0; i < 6; i++) {
            const bx = 40 + (i * ((CASTLE_WIDTH - 80) / 5));
            const brick = this.scene.add.rectangle(bx, 10, 40, 18, 0x666666, 0.3).setOrigin(0.5).setDepth(1);
            this.scene.castleDecor.push(brick);
        }
    }

    _drawStairsUp() {
        const x = CASTLE_WIDTH / 2;
        const y = 30;
        const stairs = this.scene.add.image(x, y, 'castle_stairs').setDepth(3);
        this.scene.physics.add.existing(stairs, true);
        stairs.body.setSize(40, 20);
        this.scene.castleStairsUp = stairs;
        this.scene.castleStairsUpHint = this.scene.add.text(x, y + 15, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _drawBossDoor() {
        const x = CASTLE_WIDTH / 2;
        const y = 50;
        const door = this.scene.add.image(x, y, 'castle_door').setDepth(3);
        this.scene.physics.add.existing(door, true);
        door.body.setSize(40, 50);
        this.scene.castleBossDoor = door;
        this.scene.castleBossDoorHint = this.scene.add.text(x, y + 35, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _drawAttic() {
        const bars = this.scene.add.image(CASTLE_WIDTH / 2, CASTLE_ROOM_HEIGHT / 2, 'castle_bars').setDepth(3).setScale(5, 5);
        if (!this.scene.castleDecor) this.scene.castleDecor = [];
        this.scene.castleDecor.push(bars);
    }

    /* ===== ROOM CONTENT ===== */

    _spawnRoomContent(roomIndex) {
        if (roomIndex < CASTLE_ROOMS) {
            this._spawnBandits(roomIndex);
            this._spawnRoomChests(roomIndex);
            if (roomIndex === CASTLE_ROOMS - 1) this._spawnAtticDoor();
        } else if (roomIndex === CASTLE_ATTIC_INDEX) {
            this._spawnVillagers();
        }
    }

    _spawnAtticDoor() {
        if (this.zone.atticUnlocked) return;
        const doorX = CASTLE_WIDTH / 2;
        const doorY = 60;
        this.scene.castleAtticDoor = this.scene.add.rectangle(doorX, doorY, 50, 16, 0x7f8c8d, 0.8).setDepth(6);
        this.scene.physics.add.existing(this.scene.castleAtticDoor, true);
        this.scene.castleAtticHint = this.scene.add.text(doorX, doorY - 20, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _spawnBandits(roomIndex) {
        if (roomIndex === CASTLE_ROOMS - 1) {
            this.zone.bossAI._spawnBoss();
            return;
        }
        const configs = this._getBanditConfigForRoom(roomIndex);
        configs.forEach(cfg => {
            const x = 60 + Math.random() * (CASTLE_WIDTH - 120);
            const y = 80 + Math.random() * (CASTLE_ROOM_HEIGHT - 160);
            this._makeBandit(cfg, x, y, roomIndex);
        });
    }

    _getBanditConfigForRoom(roomIndex) {
        if (roomIndex === 0) {
            return [
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee }
            ];
        } else if (roomIndex <= 2) {
            return [
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee }
            ];
        } else if (roomIndex <= 4) {
            return [
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.ranger },
                { ...BANDIT_TYPES.ranger }
            ];
        } else {
            return [
                { ...BANDIT_TYPES.elite },
                { ...BANDIT_TYPES.elite },
                { ...BANDIT_TYPES.melee },
                { ...BANDIT_TYPES.ranger }
            ];
        }
    }

    _makeBandit(t, x, y) {
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * this.scene.diffMulti.hp),
            maxHp: Math.floor(t.hp * this.scene.diffMulti.hp),
            damage: Math.floor(t.dmg * this.scene.diffMulti.dmg),
            exp: Math.floor(t.exp * this.scene.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            wTimer: 0, wDir: 0,
            rangedTimer: 0, rangedInterval: t.role === 'ranger' ? 1800 : 2000
        };

        const hw = t.bw + 4;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0xc0392b).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        if (this.scene.multiplayer && this.scene.mpSync) {
            this.scene.mpSync.assignMobId(e, t.key);
        }
        return e;
    }

    _spawnRoomChests(roomIndex) {
        CASTLE_CHEST_POSITIONS.forEach(cp => {
            if (cp.room === roomIndex) {
                this._createChest(cp.x, cp.y);
            }
        });
    }

    _createChest(x, y) {
        const ch = this.scene.add.sprite(x, y, 'village_barrel').setDepth(6);
        this.scene.physics.add.existing(ch, false);
        ch.body.setSize(18, 22);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 60, maxHp: 60 };
        ch.hpBg = this.scene.add.rectangle(x, y - 16, 22, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = this.scene.add.rectangle(x, y - 16, 22, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        if (Math.random() < CASTLE_CHEST_DROP_CHANCE) {
            ch.loot.push(rollZoneEquip('castle'));
        }
        ch.hintText = this.scene.add.text(x, y - 20, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        this.scene.villageChests.add(ch);
        return ch;
    }

    /* ===== VILLAGERS ===== */

    _spawnVillagers() {
        this.scene.castleVillagers = [];
        const villagerTextures = [
            'villager_rescued_0', 'villager_rescued_1', 'villager_rescued_2',
            'villager_rescued_3', 'villager_rescued_4'
        ];

        CASTLE_VILLAGER_POSITIONS.forEach((pos, i) => {
            const texKey = villagerTextures[i % villagerTextures.length];
            const v = this.scene.add.sprite(pos.x, pos.y, texKey).setDepth(5);
            this.scene.physics.add.existing(v, true);
            this.scene.castleVillagers.push(v);
            this.scene.tweens.add({
                targets: v, y: pos.y - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
            });
        });

        const ecx = CASTLE_WIDTH / 2;
        const ecy = CASTLE_ROOM_HEIGHT / 2;
        this.scene.castleElder = this.scene.add.sprite(ecx, ecy, 'villager_elder').setDepth(6);
        this.scene.physics.add.existing(this.scene.castleElder, true);
        this.scene.castleElderHint = this.scene.add.text(ecx, ecy - 30, 'SPACE to talk', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        this.scene.tweens.add({
            targets: this.scene.castleElder, y: ecy - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });
        this.scene.tweens.add({
            targets: this.scene.castleElderHint, y: ecy - 33, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });
    }

    _spawnStairsUp() {
        const x = CASTLE_WIDTH / 2;
        const y = 30;
        const stairs = this.scene.add.image(x, y, 'castle_stairs').setDepth(3);
        this.scene.physics.add.existing(stairs, true);
        stairs.body.setSize(40, 20);
        this.scene.castleStairsUp = stairs;
        this.scene.castleStairsUpHint = this.scene.add.text(x, y + 15, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        this.scene.floatingText(x, y + 40, 'Stairs unlocked!', '#2ecc71');
    }
}
