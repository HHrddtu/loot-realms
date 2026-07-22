import Phaser from 'phaser';
import { SNOWY_VILLAGE_BOSS_TYPE, VILLAGE_WIDTH, WARMTH_CORE } from '../config/index.js';
import { rollBossCrystals } from '../config/pets.js';
import { rollZoneEquip } from '../utils.js';
import { playBossDeath, playLoot } from '../sound.js';
import { BossAI } from '../systems/BossAI.js';

export class IceSpiritBoss {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    spawnSnowyBoss() {
        const ox = this.scene.villageOffsetX;
        const bt = SNOWY_VILLAGE_BOSS_TYPE;
        const bx = ox + VILLAGE_WIDTH / 2, by = 250;
        const e = this.scene.add.sprite(bx, by, 'ice_spirit_walk').setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(bt.bw, bt.bh); e.body.setCollideWorldBounds(true);
        e.stats = { key: bt.key, name: bt.name, hp: Math.floor(bt.hp), maxHp: Math.floor(bt.hp), damage: Math.floor(bt.dmg), exp: Math.floor(bt.exp), bw: bt.bw, bh: bt.bh, frostTimer: 0, frostInterval: bt.frostWaveInterval, blizzardTimer: 0, blizzardInterval: bt.blizzardInterval, shardTimer: 0, shardInterval: bt.summonInterval };
        const hpW = 60;
        e.hpBg = this.scene.add.rectangle(bx, by - bt.bh / 2 - 12, hpW, 5, 0x000000).setDepth(12);
        e.hpFill = this.scene.add.rectangle(bx - hpW / 2, by - bt.bh / 2 - 12, hpW, 5, 0x3498db).setOrigin(0, 0.5).setDepth(12);
        e.hpBg.setVisible(false); e.hpFill.setVisible(false);
        this.scene.snowyIceSpirit = e;
        return e;
    }

    updateSnowyBoss(delta) {
        const s = this.scene;
        const e = s.snowyIceSpirit;
        if (!e || !e.active) return;
        const st = e.stats;
        if (s.menuOpen || s.transitioning) { e.body.setVelocity(0); return; }
        if (st.hp <= 0) { this.iceSpiritDied(); return; }

        // Phase check
        BossAI.checkPhase(e, [
            { hp: 0.65, phase: 2, text: 'BLIZZARD!', color: '#3498db',
              onEnter: () => { e.stats.frostInterval = 3000; e.stats.blizzardInterval = 5000; } },
            { hp: 0.30, phase: 3, text: 'ABSOLUTE ZERO!', color: '#88ddff',
              onEnter: () => { e.stats.frostInterval = 2000; e.stats.blizzardInterval = 3000; } }
        ], s);

        if (st.transitioning || st.invulnerable) { e.body.setVelocity(0); return; }

        if (st.hp > 0) {
            BossAI.updateHpBar(e, {
                x: 400, y: 110, width: 80, fillOffsetX: -40,
                nameText: s.snowyIceSpiritNameText, nameYOffset: -15, show: true
            });
        }
        const dx = s.player.x - e.x, dy = s.player.y - e.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 80) {
            e.body.setVelocity((dx / dist) * 60, (dy / dist) * 60); e.setFlipX(dx < 0);
        } else { e.body.setVelocity(0); }
        st.frostTimer += s.game.loop.delta;
        if (st.frostTimer >= st.frostInterval) { st.frostTimer = 0; this._snowyFrostWave(e); }
        st.blizzardTimer += s.game.loop.delta;
        if (st.blizzardTimer >= st.blizzardInterval) { st.blizzardTimer = 0; this._snowyBlizzard(e); }
        st.shardTimer += s.game.loop.delta;
        if (st.shardTimer >= st.shardInterval) { st.shardTimer = 0; this._snowySummonShards(e); }
    }

    _snowyFrostWave(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dx = s.player.x - boss.x;
        const dy = s.player.y - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 250) return;
        const dmg = Math.floor(boss.stats.damage * 0.6);
        if (dist < 100) {
            s.combat.takeDamage(dmg);
            s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' FROST', '#3498db');
        }
        const vfx = s.add.image(boss.x + dx * 0.5, boss.y + dy * 0.5, 'frost_wave_vfx').setDepth(10).setAlpha(0.7);
        s.tweens.add({ targets: vfx, alpha: 0, scale: 1.5, duration: 600, onComplete: () => vfx.destroy() });
    }

    _snowyBlizzard(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, boss.x, boss.y);
        if (dist < 150) {
            const dmg = Math.floor(boss.stats.damage * 0.8);
            s.combat.takeDamage(dmg);
            s.floatingText(s.player.x, s.player.y - 20, '-' + dmg + ' BLIZZARD', '#3498db');
        }
        const vfx = s.add.image(boss.x, boss.y, 'blizzard_vfx').setDepth(10).setAlpha(0.7).setScale(1.5);
        s.tweens.add({ targets: vfx, alpha: 0, scale: 2, duration: 800, onComplete: () => vfx.destroy() });
    }

    _snowySummonShards(boss) {
        const s = this.scene;
        if (!boss || !boss.active || !s.snowyIceShards) return;
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 50;
            const sy = boss.y + Math.sin(angle) * 40;
            const shard = s.add.sprite(sx, sy, 'ice_shard').setDepth(5);
            s.physics.add.existing(shard, false);
            shard.body.setSize(10, 12);
            shard.body.setCollideWorldBounds(true);
            const dm = s.diffMulti || { hp: 1, dmg: 1 };
            shard.stats = { hp: Math.floor(80 * dm.hp), maxHp: Math.floor(80 * dm.hp), damage: Math.floor(15 * dm.dmg), bh: 12 };
            shard.hpBg = s.add.rectangle(sx, sy - 12, 14, 3, 0x333333).setOrigin(0.5).setDepth(11);
            shard.hpFill = s.add.rectangle(sx, sy - 12, 14, 3, 0x3498db).setOrigin(0.5).setDepth(11);
            s.snowyIceShards.add(shard);
        }
    }

    iceSpiritDied() {
        const s = this.scene;
        if (s.zones.village.snowyBossDefeated) return;
        s.zones.village.snowyBossDefeated = true;
        playBossDeath();
        const ox = s.villageOffsetX;
        if (s.snowyIceSpirit) {
            if (s.particles) s.particles.spawnBossDeath(s.snowyIceSpirit.x, s.snowyIceSpirit.y);
            if (s.snowyIceSpirit.hpBg) s.snowyIceSpirit.hpBg.destroy();
            if (s.snowyIceSpirit.hpFill) s.snowyIceSpirit.hpFill.destroy();
            if (s.snowyIceSpiritNameText) s.snowyIceSpiritNameText.destroy();
            s.snowyIceSpirit.destroy(); s.snowyIceSpirit = null;
        }
        s.defeatedText = s.add.text(ox + VILLAGE_WIDTH / 2, 230, 'ICE SPIRIT DEFEATED!', { fontSize: '26px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({ targets: s.defeatedText, alpha: 0, duration: 5000, onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; } });
        s.defeatedLoot = [];
        const lootItems = [];
        if (s.addEquip({ ...WARMTH_CORE, type: 'equip' })) { lootItems.push(WARMTH_CORE); playLoot(); }
        if (Math.random() < 0.5) { const item = rollZoneEquip('village'); if (item && s.addEquip(item)) { lootItems.push(item); playLoot(); } }
        lootItems.forEach((item, i) => {
            const lt = s.add.text(ox + VILLAGE_WIDTH / 2, 280 + i * 22, '+' + item.name, { fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({ targets: lt, alpha: 0, duration: 5000, onComplete: () => { if (lt.active) lt.destroy(); } });
        });
        s.time.delayedCall(2000, () => { s.floatingText(ox + VILLAGE_WIDTH / 2, 260, 'Use Warmth Core at the campfire!', '#f1c40f'); });
    }
}
