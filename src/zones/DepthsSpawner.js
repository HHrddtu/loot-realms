import {
    DEPTHS_CAMP_COUNT, DEPTHS_MOBS_PER_CAMP,
    DEPTHS_ENEMY_TYPES, DEPTHS_CAMP_POSITIONS, DEPTHS_CHEST_POSITIONS,
    DEPTHS_CHEST_DROP_CHANCE
} from '../config/index.js';
import { rollEquip } from '../utils.js';

export class DepthsSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnDepthsCamps() {
        const s = this.scene;
        const ox = s.depthsOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'mage', 'healer'];
        for (let i = 0; i < DEPTHS_CAMP_COUNT; i++) {
            const cp = DEPTHS_CAMP_POSITIONS[i];
            for (let j = 0; j < DEPTHS_MOBS_PER_CAMP; j++) {
                const role = roleOrder[j];
                const t = DEPTHS_ENEMY_TYPES[role];
                const angle = (j / DEPTHS_MOBS_PER_CAMP) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 35;
                const ey = cp.y + Math.sin(angle) * 30;
                this.makeDepthsEnemy(t, ex, ey, i);
            }
        }
    }

    makeDepthsEnemy(t, x, y, campIndex) {
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
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0x000000).setOrigin(0.5).setDepth(15);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0xff0000).setOrigin(0.5).setDepth(15);

        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(e, t.key);
        }
        return e;
    }

    spawnDepthsChests() {
        const s = this.scene;
        const ox = s.depthsOffsetX;
        DEPTHS_CHEST_POSITIONS.forEach(cp => {
            const ch = s.add.sprite(ox + cp.x, cp.y, 'depths_chest').setDepth(5);
            s.physics.add.existing(ch, false);
            ch.body.setSize(20, 18);
            ch.body.setCollideWorldBounds(true);
            ch.stats = { hp: 50, maxHp: 50 };
            ch.loot = [];
            if (Math.random() < DEPTHS_CHEST_DROP_CHANCE) {
                ch.loot.push(rollEquip());
            }
            ch.hpBg = s.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0x000000).setOrigin(0.5).setDepth(15);
            ch.hpFill = s.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0xffcc00).setOrigin(0.5).setDepth(15);
            ch.hintText = s.add.text(ox + cp.x, cp.y - 26, '', {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
            s.depthsChests.add(ch);
        });
    }
}
