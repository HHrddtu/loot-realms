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
            // Window glow effect on each house
            const glowL = this.scene.add.image(hx - 16, hy - 3, 'glow_window').setDepth(1).setAlpha(0.6);
            const glowR = this.scene.add.image(hx + 16, hy - 3, 'glow_window').setDepth(1).setAlpha(0.6);
            this.scene.villageDecor.push(glowL, glowR);
            // Gentle pulsing tween for window glow
            this.scene.tweens.add({
                targets: [glowL, glowR],
                alpha: { from: 0.4, to: 0.8 },
                duration: 2000 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            if (hp.garden) {
                VILLAGE_GARDEN_POSITIONS.forEach(gp => {
                    this.scene.villageDecor.push(this.scene.add.sprite(ox + gp.x, gp.y, 'village_garden').setDepth(1));
                });
            }
        });
    }

    spawnDeadVillageDecor() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor = [];

        // Broken houses instead of normal ones
        const deadHouseKeys = ['village_house_dead', 'village_house_dead', 'village_house_dead'];
        VILLAGE_HOUSE_POSITIONS.forEach((hp, i) => {
            const hx = ox + hp.x, hy = hp.y;
            const houseKey = deadHouseKeys[i % deadHouseKeys.length];
            this.scene.villageDecor.push(this.scene.add.sprite(hx, hy, houseKey).setDepth(2));
            // Dead gardens (withered)
            if (hp.garden) {
                VILLAGE_GARDEN_POSITIONS.forEach(gp => {
                    this.scene.villageDecor.push(this.scene.add.sprite(ox + gp.x, gp.y, 'village_garden_dead').setDepth(1));
                });
            }
        });

        // Dead trees scattered around
        const deadTreePositions = [
            { x: 60, y: 150 }, { x: 700, y: 250 }, { x: 50, y: 650 },
            { x: 720, y: 900 }, { x: 30, y: 1350 }, { x: 740, y: 1600 },
            { x: 650, y: 400 }, { x: 100, y: 1750 }
        ];
        deadTreePositions.forEach(tp => {
            this.scene.villageDecor.push(this.scene.add.sprite(ox + tp.x, tp.y, 'dead_tree').setDepth(2).setAlpha(0.8));
        });

        // Broken fences along edges
        for (let y = 50; y < 1950; y += 120) {
            const f1 = this.scene.add.sprite(ox + 15, y, 'broken_fence').setDepth(1).setAlpha(0.6);
            const f2 = this.scene.add.sprite(ox + VILLAGE_WIDTH - 15, y, 'broken_fence').setDepth(1).setAlpha(0.6).setFlipX(true);
            this.scene.villageDecor.push(f1, f2);
        }

        // Corpses at VILLAGE_CORPSE_POSITIONS
        const corpsePositions = [
            { x: 150, y: 180 }, { x: 450, y: 350 }, { x: 300, y: 600 },
            { x: 550, y: 850 }, { x: 130, y: 1050 }, { x: 400, y: 1300 },
            { x: 250, y: 1600 }, { x: 500, y: 1750 }, { x: 180, y: 1850 },
            { x: 480, y: 1950 }
        ];
        corpsePositions.forEach(cp => {
            this.scene.villageDecor.push(this.scene.add.sprite(ox + cp.x, cp.y, 'village_corpse').setDepth(3));
        });

        // Dark tombstones scattered
        for (let i = 0; i < 6; i++) {
            const tx = ox + 80 + Math.random() * (VILLAGE_WIDTH - 160);
            const ty = 100 + Math.random() * 1800;
            const tomb = this.scene.add.rectangle(tx, ty, 6, 10, 0x444444).setDepth(3);
            this.scene.villageDecor.push(tomb);
        }
    }

    spawnRestoredVillageDecor() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor = [];

        // Normal houses with warm window glow (simple restored village)
        VILLAGE_HOUSE_POSITIONS.forEach(hp => {
            const hx = ox + hp.x, hy = hp.y;
            this.scene.villageDecor.push(this.scene.add.sprite(hx, hy, 'village_house').setDepth(2));
            const glowL = this.scene.add.image(hx - 16, hy - 3, 'glow_window').setDepth(1).setAlpha(0.6);
            const glowR = this.scene.add.image(hx + 16, hy - 3, 'glow_window').setDepth(1).setAlpha(0.6);
            this.scene.villageDecor.push(glowL, glowR);
            this.scene.tweens.add({
                targets: [glowL, glowR],
                alpha: { from: 0.4, to: 0.8 },
                duration: 2000 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            if (hp.garden) {
                VILLAGE_GARDEN_POSITIONS.forEach(gp => {
                    this.scene.villageDecor.push(this.scene.add.sprite(ox + gp.x, gp.y, 'village_garden').setDepth(1));
                });
            }
        });
    }

    spawnThrivingVillageDecor() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor = [];

        // Colorful houses
        const houseKeys = ['village_house_red', 'village_house_green', 'village_house_blue', 'village_house_red', 'village_house_green', 'village_house_blue'];
        VILLAGE_HOUSE_POSITIONS.forEach((hp, i) => {
            const hx = ox + hp.x, hy = hp.y;
            const houseKey = houseKeys[i % houseKeys.length];
            this.scene.villageDecor.push(this.scene.add.sprite(hx, hy, houseKey).setDepth(2));
            // Bright window glow
            const glowL = this.scene.add.image(hx - 16, hy - 3, 'glow_window').setDepth(1).setAlpha(0.8);
            const glowR = this.scene.add.image(hx + 16, hy - 3, 'glow_window').setDepth(1).setAlpha(0.8);
            this.scene.villageDecor.push(glowL, glowR);
            this.scene.tweens.add({
                targets: [glowL, glowR],
                alpha: { from: 0.6, to: 1 },
                duration: 1500 + Math.random() * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        // Lush gardens with crops
        VILLAGE_GARDEN_POSITIONS.forEach(gp => {
            const garden = this.scene.add.sprite(ox + gp.x, gp.y, 'village_garden').setDepth(1);
            this.scene.villageDecor.push(garden);
            const crop = this.scene.add.sprite(ox + gp.x, gp.y + 14, 'village_crop').setDepth(2);
            this.scene.villageDecor.push(crop);
        });

        // Central fountain
        const fountain = this.scene.add.sprite(ox + VILLAGE_WIDTH / 2, 1000, 'village_fountain').setDepth(4);
        this.scene.villageDecor.push(fountain);
        this.scene.tweens.add({
            targets: fountain,
            alpha: { from: 0.9, to: 1 },
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Lanterns
        const lanternPositions = [
            { x: 150, y: 300 }, { x: 650, y: 300 },
            { x: 150, y: 700 }, { x: 650, y: 700 },
            { x: 150, y: 1100 }, { x: 650, y: 1100 },
            { x: 150, y: 1500 }, { x: 650, y: 1500 }
        ];
        lanternPositions.forEach(lp => {
            const lantern = this.scene.add.sprite(ox + lp.x, lp.y, 'village_lantern').setDepth(3);
            this.scene.villageDecor.push(lantern);
            const glow = this.scene.add.image(ox + lp.x, lp.y - 2, 'glow_window').setDepth(2).setAlpha(0.5).setScale(1.5);
            this.scene.villageDecor.push(glow);
            this.scene.tweens.add({
                targets: glow,
                alpha: { from: 0.3, to: 0.7 },
                duration: 1200 + Math.random() * 800,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        // Dancing villagers around fountain
        const dancerPositions = [
            { x: 300, y: 950 }, { x: 500, y: 950 },
            { x: 350, y: 1050 }, { x: 450, y: 1050 }
        ];
        dancerPositions.forEach(dp => {
            const dancer = this.scene.add.sprite(ox + dp.x, dp.y, 'villager_dancer').setDepth(7);
            this.scene.villageDecor.push(dancer);
            this.scene.tweens.add({
                targets: dancer,
                y: dp.y - 4,
                duration: 400 + Math.random() * 200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            this.scene.tweens.add({
                targets: dancer,
                x: ox + dp.x + 3,
                duration: 600 + Math.random() * 300,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        // Walking rescued villagers
        const villagerTextures = ['villager_rescued_0', 'villager_rescued_1', 'villager_rescued_2', 'villager_rescued_3', 'villager_rescued_4'];
        const walkerPositions = [
            { x: 200, y: 400 }, { x: 600, y: 600 },
            { x: 100, y: 1200 }, { x: 700, y: 1400 }
        ];
        walkerPositions.forEach((wp, i) => {
            const tex = villagerTextures[i % villagerTextures.length];
            const walker = this.scene.add.sprite(ox + wp.x, wp.y, tex).setDepth(7);
            this.scene.villageDecor.push(walker);
            this.scene.tweens.add({
                targets: walker,
                y: wp.y - 2,
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        // Elder near fountain
        const elder = this.scene.add.sprite(ox + VILLAGE_WIDTH / 2 + 30, 1000, 'villager_elder').setDepth(8);
        this.scene.villageDecor.push(elder);
        this.scene.tweens.add({
            targets: elder,
            y: 998,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    showVillageClearedDecor() {
        const ox = this.scene.villageOffsetX;
        this.scene.villageDecor.forEach(d => d.destroy());
        this.scene.villageDecor = [];
        VILLAGE_HOUSE_POSITIONS.forEach(hp => {
            const house = this.scene.add.sprite(ox + hp.x, hp.y, 'village_house').setDepth(2);
            this.scene.villageDecor.push(house);
        });
        // Don't create cemetery gate if castle quest is done
        if (!this.scene.villageCemeteryGate && !this.scene.zones.castle.questDone) {
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

    spawnRestoredCampfire() {
        const ox = this.scene.villageOffsetX;
        const cfx = ox + VILLAGE_WIDTH / 2, cfy = 180;
        this.scene.campfire = this.scene.add.sprite(cfx, cfy, 'campfire_active').setDepth(5).setScale(1.5);
        this.scene.campfireHint = this.scene.add.text(cfx, cfy - 40, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
        if (this.scene.particles) {
            this.scene.particles.startCampfireSparks(cfx, cfy);
        }
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
