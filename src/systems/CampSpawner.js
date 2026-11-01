import { RANGED_INTERVALS, RANGED_INTERVAL_DEFAULT } from '../config/index.js';
import { rollEquip } from '../utils.js';

const BASE_ROLES = ['tank', 'assassin', 'archer', 'mage', 'healer'];

const ROLE_ICONS = {
    healer: '\u{2764}',
    mage: '\u{2728}',
    assassin: '\u{1F5E1}',
    fire: '\u{1F525}',
    poison: '\u{2620}',
    necro: '\u{1F480}',
    swarm: '\u{1F41D}'
};

export function spawnCampMobs(scene, opts) {
    const ox = scene[opts.offsetKey] || 0;
    for (let i = 0; i < opts.campCount; i++) {
        const cp = opts.campPositions[i];
        if (!cp) continue;
        const roles = [...BASE_ROLES].sort(() => Math.random() - 0.5);
        const mobs = opts.mobsPerCamp + Math.floor(Math.random() * 3) - 1;
        for (let j = 0; j < mobs; j++) {
            const t = opts.enemyTypes[roles[j % roles.length]];
            if (!t) continue;
            const angle = (j / mobs) * Math.PI * 2;
            const ex = ox + cp.x + Math.cos(angle) * 35;
            const ey = cp.y + Math.sin(angle) * 30;
            makeCampEnemy(scene, t, ex, ey, i, opts);
        }
    }
}

export function makeCampEnemy(scene, t, x, y, campIndex, opts = {}) {
    const animKey = t.key + '_walk_anim';
    const texKey = opts.useTexKey ? (t.texKey || t.key) : t.key;
    const e = scene.add.sprite(x, y, texKey).setDepth(5);
    scene.physics.add.existing(e, false);
    e.body.setSize(t.bw, t.bh);
    e.body.setCollideWorldBounds(true);
    if (scene.anims.exists(animKey)) {
        e.play(animKey);
        e.walkAnimKey = animKey;
    }

    const rangedInterval = RANGED_INTERVALS[t.role] || RANGED_INTERVAL_DEFAULT;
    e.stats = {
        key: t.key, name: t.name,
        hp: Math.floor(t.hp * scene.diffMulti.hp),
        maxHp: Math.floor(t.hp * scene.diffMulti.hp),
        damage: Math.floor(t.dmg * scene.diffMulti.dmg),
        exp: Math.floor(t.exp * scene.diffMulti.exp),
        bw: t.bw, bh: t.bh, role: t.role,
        invisible: t.invisible || false,
        campIndex: campIndex,
        hasShield: t.hasShield || false,
        rangedTimer: 0, rangedInterval
    };

    const hpW = t.bw + 10;
    e.hpBg = scene.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0x000000).setOrigin(0.5).setDepth(15);
    e.hpFill = scene.add.rectangle(x, y - t.bh / 2 - 8, hpW, 4, 0xff0000).setOrigin(0.5).setDepth(15);
    if (t.hasShield) e.shieldIcon = scene.add.text(x, y - t.bh / 2 - 16, '\u{1F6E1}', { fontSize: '10px' }).setOrigin(0.5).setDepth(12);
    if (ROLE_ICONS[t.role] && !t.hasShield) {
        e.roleIcon = scene.add.text(x, y - t.bh / 2 - 16, ROLE_ICONS[t.role], { fontSize: '10px' }).setOrigin(0.5).setDepth(12);
    }

    if (t.invisible && !scene.visionUnlocked) {
        e.setAlpha(0.15);
        e.setTint(0xffffff);
        e.hpBg.setAlpha(0);
        e.hpFill.setAlpha(0);
        if (e.shieldIcon) e.shieldIcon.setAlpha(0);
    }

    scene.enemies.add(e);
    if (scene.multiplayer && scene.mpSync) {
        scene.mpSync.assignMobId(e, t.key);
    }
    return e;
}

export function spawnCampChests(scene, opts) {
    const ox = scene[opts.offsetKey] || 0;
    const group = scene[opts.groupKey];
    if (!group) return;
    opts.positions.forEach(cp => {
        const ch = scene.add.sprite(ox + cp.x, cp.y, opts.texture).setDepth(5);
        scene.physics.add.existing(ch, false);
        ch.body.setSize(20, 18);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: opts.hp, maxHp: opts.hp };
        ch.loot = [];
        if (Math.random() < opts.dropChance) {
            ch.loot.push(rollEquip());
        }
        ch.hpBg = scene.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0x000000).setOrigin(0.5).setDepth(15);
        ch.hpFill = scene.add.rectangle(ox + cp.x, cp.y - 16, 24, 4, 0xffcc00).setOrigin(0.5).setDepth(15);
        ch.hintText = scene.add.text(ox + cp.x, cp.y - 26, '', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        group.add(ch);
    });
}
