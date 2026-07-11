import {
    HELL_CAMP_COUNT, HELL_MOBS_PER_CAMP,
    HELL_ENEMY_TYPES, HELL_CAMP_POSITIONS, HELL_LAVA_POSITIONS
} from '../config/index.js';

export class HellSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnHellCamps() {
        const s = this.scene;
        const ox = s.hellOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'mage', 'healer'];
        for (let i = 0; i < HELL_CAMP_COUNT; i++) {
            const cp = HELL_CAMP_POSITIONS[i];
            for (let j = 0; j < HELL_MOBS_PER_CAMP; j++) {
                const role = roleOrder[j];
                const t = HELL_ENEMY_TYPES[role];
                const angle = (j / HELL_MOBS_PER_CAMP) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 35;
                const ey = cp.y + Math.sin(angle) * 30;
                this.makeHellEnemy(t, ex, ey, i);
            }
        }
    }

    makeHellEnemy(t, x, y, campIndex) {
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

    spawnHellLavaCircles() {
        const s = this.scene;
        const ox = s.hellOffsetX;
        HELL_LAVA_POSITIONS.forEach(lp => {
            const gfx = s.add.sprite(ox + lp.x, lp.y, 'hell_lava_circle').setDepth(1).setAlpha(0.4);
            const vfx = s.add.sprite(ox + lp.x, lp.y, 'hell_lava_circle').setDepth(1).setAlpha(0).setScale(1);
            s.hellLavaCircles.push({ x: ox + lp.x, y: lp.y, r: lp.r, gfx, vfx, timer: 0 });
        });
    }
}
