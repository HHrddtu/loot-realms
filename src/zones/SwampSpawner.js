import {
    SWAMP_CAMP_COUNT, SWAMP_MOBS_PER_CAMP,
    SWAMP_ENEMY_TYPES, SWAMP_CAMP_POSITIONS, SWAMP_CHEST_POSITIONS,
    SWAMP_CHEST_DROP_CHANCE, RANGED_INTERVALS, RANGED_INTERVAL_DEFAULT
} from '../config/index.js';
import { rollEquip } from '../utils.js';

export class SwampSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnSwampCamps() {
        const s = this.scene;
        const ox = s.swampOffsetX;
        const baseRoles = ['tank', 'assassin', 'archer', 'mage', 'healer'];
        for (let i = 0; i < SWAMP_CAMP_COUNT; i++) {
            const cp = SWAMP_CAMP_POSITIONS[i];
            const roles = [...baseRoles].sort(() => Math.random() - 0.5);
            const mobs = SWAMP_MOBS_PER_CAMP + Math.floor(Math.random() * 3) - 1;
            for (let j = 0; j < mobs; j++) {
                const role = roles[j % roles.length];
                const t = SWAMP_ENEMY_TYPES[role];
                const angle = (j / mobs) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 35;
                const ey = cp.y + Math.sin(angle) * 30;
                this.makeSwampEnemy(t, ex, ey, i);
            }
        }
    }

    makeSwampEnemy(t, x, y, campIndex) {
        const s = this.scene;
        const animKey = t.key + '_walk_anim';
        const e = s.add.sprite(x, y, t.texKey || t.key).setDepth(5);
        s.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (s.anims.exists(animKey)) e.play(animKey);

        const rangedInterval = RANGED_INTERVALS[t.role] || RANGED_INTERVAL_DEFAULT;
        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * s.diffMulti.hp),
            maxHp: Math.floor(t.hp * s.diffMulti.hp),
            damage: Math.floor(t.dmg * s.diffMulti.dmg),
            exp: Math.floor(t.exp * s.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            campIndex: campIndex,
            hasShield: t.hasShield || false,
            rangedTimer: 0, rangedInterval
        };

        const hpW = t.bw + 10;
        e.hpBg = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0x000000).setOrigin(0.5).setDepth(15);
        e.hpFill = s.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0xff0000).setOrigin(0.5).setDepth(15);
        if (t.hasShield) e.shieldIcon = s.add.text(x, y - t.bh / 2 - 16, '\u{1F6E1}', { fontSize: '10px' }).setOrigin(0.5).setDepth(12);
        const roleIcons = { healer: '\u{2764}', mage: '\u{2728}', assassin: '\u{1F5E1}', fire: '\u{1F525}', poison: '\u{2620}', necro: '\u{1F480}', swarm: '\u{1F41D}' };
        if (roleIcons[t.role] && !t.hasShield) e.roleIcon = s.add.text(x, y - t.bh / 2 - 16, roleIcons[t.role], { fontSize: '10px' }).setOrigin(0.5).setDepth(12);

        s.enemies.add(e);
        if (s.multiplayer && s.mpSync) {
            s.mpSync.assignMobId(e, t.key);
        }
        return e;
    }

    spawnSwampChests() {
        const s = this.scene;
        const ox = s.swampOffsetX;
        SWAMP_CHEST_POSITIONS.forEach(cp => {
            const ch = s.add.sprite(ox + cp.x, cp.y, 'cursed_chest').setDepth(5);
            s.physics.add.existing(ch, false);
            ch.body.setSize(20, 18);
            ch.body.setCollideWorldBounds(true);
            ch.stats = { hp: 60, maxHp: 60 };
            ch.loot = [];
            if (Math.random() < SWAMP_CHEST_DROP_CHANCE) {
                ch.loot.push(rollEquip());
            }
            ch.hpBg = s.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0x000000).setOrigin(0.5).setDepth(15);
            ch.hpFill = s.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0xffcc00).setOrigin(0.5).setDepth(15);
            ch.hintText = s.add.text(ox + cp.x, cp.y - 26, '', {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);
            s.swampChests.add(ch);
        });
    }
}