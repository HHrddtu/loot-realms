import {
    TOWER_ENEMY_TYPES, TOWER_CHEST_DROP_CHANCE, TOWER_ROOMS, TOWER_WIDTH
} from '../config/index.js';
import { rollEquip } from '../utils.js';

// Enemy configs per room (escalating difficulty)
const ROOM_ENEMIES = [
    // Room 0: 2 tank
    [{ role: 'tank' }, { role: 'tank' }],
    // Room 1: 2 tank + 1 assassin
    [{ role: 'tank' }, { role: 'tank' }, { role: 'assassin' }],
    // Room 2: 1 tank + 1 assassin + 1 archer
    [{ role: 'tank' }, { role: 'assassin' }, { role: 'archer' }],
    // Room 3: 1 tank + 1 assassin + 1 archer + 1 mage
    [{ role: 'tank' }, { role: 'assassin' }, { role: 'archer' }, { role: 'mage' }],
    // Room 4: 1 tank + 1 assassin + 1 archer + 1 mage + 1 healer
    [{ role: 'tank' }, { role: 'assassin' }, { role: 'archer' }, { role: 'mage' }, { role: 'healer' }],
    // Room 5 (boss): no regular enemies
    []
];

// Chest position per room (center, near top)
const ROOM_CHEST = [
    { x: 150, y: 250 },
    { x: 650, y: 250 },
    { x: 150, y: 250 },
    { x: 650, y: 250 },
    { x: 150, y: 250 },
    { x: 400, y: 250 }  // Boss room
];

export class TowerSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnRoomEnemies(roomIndex) {
        const s = this.scene;
        const ox = s.towerOffsetX;
        const enemies = ROOM_ENEMIES[roomIndex] || [];

        enemies.forEach((def, i) => {
            const t = TOWER_ENEMY_TYPES[def.role];
            if (!t) return;
            // Spread enemies across the room (room is 800x600)
            const cols = Math.ceil(enemies.length / 2);
            const row = Math.floor(i / 2);
            const col = i % 2;
            const ex = ox + 200 + col * 400;
            const ey = 150 + row * 150; // Inside room bounds (0-600)
            this.makeTowerEnemy(t, ex, ey, roomIndex);
        });
    }

    makeTowerEnemy(t, x, y, campIndex) {
        const s = this.scene;
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = s.add.sprite(x, y, walkTex).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (s.anims.exists(animKey)) e.play(animKey);

        const rangedInterval = t.role === 'archer' ? 1500 : t.role === 'mage' ? 2000 : t.role === 'healer' ? 2200 : 2000;
        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * s.diffMulti.hp),
            maxHp: Math.floor(t.hp * s.diffMulti.hp),
            damage: Math.floor(t.dmg * s.diffMulti.dmg),
            exp: Math.floor(t.exp * s.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            campIndex: campIndex,
            rangedTimer: 0, rangedInterval
        };

        const hpW = t.bw + 10;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0x000000).setOrigin(0.5).setDepth(6);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0xff0000).setOrigin(0.5).setDepth(6);

        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(e, t.key);
        }
        return e;
    }

    spawnRoomChest(roomIndex) {
        const s = this.scene;
        if (roomIndex >= ROOM_CHEST.length) return;
        const ox = s.towerOffsetX;
        const cp = ROOM_CHEST[roomIndex];

        const ch = s.add.sprite(ox + cp.x, cp.y, 'tower_chest').setDepth(5);
        s.physics.add.existing(ch, false);
        ch.body.setSize(20, 18);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 80, maxHp: 80 };
        ch.loot = [];
        if (Math.random() < TOWER_CHEST_DROP_CHANCE) {
            ch.loot.push(rollEquip());
        }
        ch.hpBg = s.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0x000000).setOrigin(0.5).setDepth(6);
        ch.hpFill = s.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0xffcc00).setOrigin(0.5).setDepth(6);
        ch.hintText = s.add.text(ox + cp.x, cp.y - 26, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        s.towerChests.add(ch);
    }
}
