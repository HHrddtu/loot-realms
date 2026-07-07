import Phaser from 'phaser';
import { VILLAGE_ENEMY_TYPES, VILLAGE_CAMP_POSITIONS, VILLAGE_MOBS_PER_CAMP, VILLAGE_HOUSE_POSITIONS, VILLAGE_CHILD_HOUSE, VILLAGE_GARDEN_POSITIONS,
         VILLAGE_CHEST_COUNT_MIN, VILLAGE_CHEST_COUNT_MAX, VILLAGE_CHEST_DROP_CHANCE, VILLAGE_CHEST_EQUIP_DROP_CHANCE,
         VILLAGE_CHEST_OPEN_KEY, VILLAGE_CHEST_CLOSED_KEY, VILLAGE_CHEST_W, VILLAGE_CHEST_H,
         SNOWY_VILLAGE_ENEMY_TYPES, SNOWY_VILLAGE_CAMP_POSITIONS, SNOWY_VILLAGE_BOSS_TYPE,
         SNOWY_VILLAGE_CHEST_COUNT, SNOWY_VILLAGE_CHEST_DROP_CHANCE,
         WARMTH_CORE, DIFF_COLORS, VILLAGE_WIDTH, VILLAGE_HEIGHT, CEMETERY_HEIGHT, GAME_WIDTH } from '../config/index.js';
import { rollVillageEquip } from '../utils.js';

export class VillageSpawner {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    spawnVillageCamps() {
        const ox = this.scene.villageOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'healer'];
        for (let i = 0; i < VILLAGE_CAMP_POSITIONS.length; i++) {
            const cp = VILLAGE_CAMP_POSITIONS[i];
            for (let j = 0; j < VILLAGE_MOBS_PER_CAMP; j++) {
                const role = roleOrder[j % roleOrder.length];
                const t = VILLAGE_ENEMY_TYPES[role];
                if (!t) continue;
                const angle = (j / VILLAGE_MOBS_PER_CAMP) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 25, ey = cp.y + Math.sin(angle) * 20;
                this._makeVillageEnemy(t, ex, ey, i);
            }
        }
    }

    _makeVillageEnemy(t, x, y, campIndex) {
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);
        const diff = this.scene.diffMulti;
        e.stats = { key: t.key, name: t.name, hp: Math.floor(t.hp * diff.hp), maxHp: Math.floor(t.hp * diff.hp), damage: Math.floor(t.dmg * diff.dmg), exp: Math.floor(t.exp * diff.exp), bw: t.bw, bh: t.bh, wTimer: 0, wDir: 0, campIndex };
        const hpW = t.bw + 6;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hpW, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hpW, 3, 0xe74c3c).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        if (this.scene.multiplayer && this.scene.mpSync) this.scene.mpSync.assignMobId(e, t.key);
    }

    spawnVillageDecor(frozen) {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor = [];
        VILLAGE_HOUSE_POSITIONS.forEach(hp => {
            const hx = ox + hp.x, hy = hp.y;
            const houseKey = frozen ? 'snow_house' : 'village_house';
            this.scene.villageDecor.push(this.scene.add.sprite(hx, hy, houseKey).setDepth(2));
            if (hp.garden) {
                VILLAGE_GARDEN_POSITIONS.forEach(gp => {
                    this.scene.villageDecor.push(this.scene.add.sprite(ox + gp.x, gp.y, 'village_garden').setDepth(1));
                });
            }
        });
        if (!frozen) {
            const roadY = 80;
            for (let rx = 0; rx < 3; rx++) {
                this.scene.villageDecor.push(this.scene.add.sprite(ox + 50 + rx * 200, roadY, 'village_road').setDepth(1));
            }
        }
    }

    showVillageClearedDecor() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor.forEach(d => d.destroy());
        this.scene.villageDecor = [];
        VILLAGE_HOUSE_POSITIONS.forEach(hp => {
            const house = this.scene.add.sprite(ox + hp.x, hp.y, 'village_house').setDepth(2);
            this.scene.villageDecor.push(house);
        });
        // Roads between houses
        const roadYPositions = [370, 620, 920, 1170, 1620];
        roadYPositions.forEach(ry => {
            this.scene.villageDecor.push(this.scene.add.sprite(ox + VILLAGE_WIDTH / 2, ry, 'village_road').setDepth(1));
        });
        if (!this.scene.villageCemeteryGate) {
            const gx = ox + VILLAGE_WIDTH / 2, gy = 2000;
            this.scene.villageCemeteryGate = this.scene.add.rectangle(gx, gy, 40, 20, 0x666666).setDepth(5);
            this.scene.physics.add.existing(this.scene.villageCemeteryGate, true);
        }
    }

    spawnVillageChests() {
        const ox = this.scene.villageOffsetX;
        const count = VILLAGE_CHEST_COUNT_MIN + Math.floor(Math.random() * (VILLAGE_CHEST_COUNT_MAX - VILLAGE_CHEST_COUNT_MIN));
        for (let i = 0; i < count; i++) {
            const cx = ox + 30 + Math.random() * (VILLAGE_WIDTH - 60);
            const cy = 60 + Math.random() * (VILLAGE_HEIGHT - 80);
            this._createVillageChest(cx, cy);
        }
    }

    _createVillageChest(x, y) {
        const ch = this.scene.add.sprite(x, y, VILLAGE_CHEST_CLOSED_KEY).setDepth(6);
        ch.stats = { hp: 50, maxHp: 50 };
        ch.hpBg = this.scene.add.rectangle(x, y - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = this.scene.add.rectangle(x, y - 18, 28, 3, 0xf1c40f).setOrigin(0.5).setDepth(11);
        ch.broken = false; ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            const item = rollVillageEquip();
            if (item) ch.loot.push(item);
        }
        ch.hintText = this.scene.add.text(x, y - 22, '', { fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
        this.scene.villageChests.add(ch);
        ch.body.setSize(22, 18);
    }

    spawnChildNPC() {
        const ox = this.scene.villageOffsetX;
        // Spawn child near the child house (below the house)
        const childX = ox + VILLAGE_CHILD_HOUSE.x + VILLAGE_CHILD_HOUSE.w / 2;
        const childY = VILLAGE_CHILD_HOUSE.y + VILLAGE_CHILD_HOUSE.h + 15;
        this.scene.villageChildNPC = this.scene.add.sprite(childX, childY, 'child_npc').setDepth(8);
        this.scene.villageChildHint = this.scene.add.text(childX, childY + 20, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
    }

    spawnCastleChild() {
        const ox = this.scene.villageOffsetX;
        // Spawn child near village entrance, not at top of screen
        const childX = ox + VILLAGE_WIDTH / 2;
        const childY = 200;
        this.scene.castleChildNPC = this.scene.add.sprite(childX, childY, 'child_npc').setDepth(8);
        this.scene.castleChildHint = this.scene.add.text(childX, childY + 20, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
    }

    /* ===== SNOWY VILLAGE SPAWN ===== */

    spawnSnowyVillageCamps() {
        const ox = this.scene.villageOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'healer'];
        for (let i = 0; i < SNOWY_VILLAGE_CAMP_POSITIONS.length; i++) {
            const cp = SNOWY_VILLAGE_CAMP_POSITIONS[i];
            for (let j = 0; j < 4; j++) {
                const role = roleOrder[j % roleOrder.length];
                const t = SNOWY_VILLAGE_ENEMY_TYPES[role];
                const angle = (j / 4) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 30, ey = cp.y + Math.sin(angle) * 25;
                this._makeSnowyVillageEnemy(t, ex, ey, i);
            }
        }
    }

    _makeSnowyVillageEnemy(t, x, y, campIndex) {
        const e = this.scene.add.sprite(x, y, t.key + '_walk').setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh); e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(t.key + '_walk_anim')) e.play(t.key + '_walk_anim');
        const diff = this.scene.diffMulti;
        const rangedInterval = t.role === 'archer' ? 1800 : t.role === 'healer' ? 2500 : 2000;
        e.stats = { key: t.key, name: t.name, hp: Math.floor(t.hp * diff.hp), maxHp: Math.floor(t.hp * diff.hp), damage: Math.floor(t.dmg * diff.dmg), exp: Math.floor(t.exp * diff.exp), bw: t.bw, bh: t.bh, role: t.role, campIndex, rangedTimer: 0, rangedInterval };
        const hpW = t.bw + 6;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hpW, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hpW, 3, 0xff0000).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        if (this.scene.multiplayer && this.scene.mpSync) this.scene.mpSync.assignMobId(e, t.key);
    }

    spawnSnowyVillageChests() {
        const ox = this.scene.villageOffsetX;
        for (let i = 0; i < SNOWY_VILLAGE_CHEST_COUNT; i++) {
            const cx = ox + 40 + Math.random() * (VILLAGE_WIDTH - 80);
            const cy = 60 + Math.random() * (VILLAGE_HEIGHT - 80);
            this._createVillageChest(cx, cy);
        }
    }

    spawnSnowyCampfire() {
        const ox = this.scene.villageOffsetX;
        const cfx = ox + VILLAGE_WIDTH / 2, cfy = 180;
        this.scene.campfire = this.scene.add.sprite(cfx, cfy, 'campfire').setDepth(5).setScale(1.5);
        this.scene.campfireHint = this.scene.add.text(cfx, cfy - 40, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
    }

    spawnSnowyVillageBoss() {
        const ox = this.scene.villageOffsetX;
        const bt = SNOWY_VILLAGE_BOSS_TYPE;
        const diffKey = this.scene.difficulty || 'Normal';
        const bx = ox + VILLAGE_WIDTH / 2, by = 250;
        const e = this.scene.add.sprite(bx, by, 'ice_spirit_walk').setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(bt.bw, bt.bh);
        e.body.setCollideWorldBounds(true);
        const hp = Math.floor(bt.hp[diffKey] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[diffKey] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[diffKey] || bt.exp.Normal);
        e.stats = { key: bt.key, name: bt.name, hp, maxHp: hp, damage: dmg, exp, bw: bt.bw, bh: bt.bh, frostTimer: 0, frostInterval: bt.frostWaveInterval, blizzardTimer: 0, blizzardInterval: bt.blizzardInterval, shardTimer: 0, shardInterval: bt.summonInterval };
        const hpW = 60;
        e.hpBg = this.scene.add.rectangle(400, 120, hpW, 5, 0x000000).setDepth(12).setScrollFactor(0);
        e.hpFill = this.scene.add.rectangle(400 - hpW / 2, 120, hpW, 5, 0x3498db).setOrigin(0, 0.5).setDepth(12).setScrollFactor(0);
        e.hpBg.setVisible(false); e.hpFill.setVisible(false);
        this.scene.snowyIceSpirit = e;
        this.scene.snowyIceSpiritNameText = this.scene.add.text(400, 105, bt.name, { fontSize: '14px', fill: DIFF_COLORS[this.scene.difficulty] || '#3498db', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(12).setScrollFactor(0).setVisible(false);
        this.scene.enemies.add(e);
        this.scene.floatingText(bx, by - 60, 'ICE SPIRIT APPEARS!', '#3498db');
    }
}
