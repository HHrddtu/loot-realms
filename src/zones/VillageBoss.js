import Phaser from 'phaser';
import { VILLAGE_BOSS_TYPE, VILLAGE_CORPSE_MINION, SNOWY_BOSS_MINION,
         SNOWY_VILLAGE_BOSS_TYPE, DIFF_COLORS, VILLAGE_WIDTH, GAME_WIDTH, GAME_HEIGHT, WARMTH_CORE, MAGMA_ARMOR } from '../config/index.js';
import { rollBossCrystals } from '../config/pets.js';
import { rollZoneEquip, rollVillageAccountEquip } from '../utils.js';
import { playBossDeath, playBossAoE, playLoot } from '../sound.js';
import { recordKill } from '../bestiary.js';
import { onKill } from '../quests.js';
import { BossAI } from '../systems/BossAI.js';

export class VillageBoss {
    constructor(scene, zone) {
        this.scene = scene;
        this.zone = zone;
    }

    spawnVillageBoss() {
        const ox = this.scene.villageOffsetX;
        const bt = VILLAGE_BOSS_TYPE;
        const hp = Math.floor(bt.hp[this.scene.difficulty] || bt.hp.Normal);
        const dmg = Math.floor(bt.dmg[this.scene.difficulty] || bt.dmg.Normal);
        const exp = Math.floor(bt.exp[this.scene.difficulty] || bt.exp.Normal);
        const bx = ox + VILLAGE_WIDTH / 2, by = 200;
        const b = this.scene.add.sprite(bx, by, 'purple_demon_walk').setDepth(5);
        this.scene.physics.add.existing(b, false);
        b.body.setSize(bt.bw, bt.bh); b.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists('purple_demon_walk_anim')) b.play('purple_demon_walk_anim');
        b.stats = { name: bt.name, hp, maxHp: hp, damage: dmg, exp, bw: bt.bw, bh: bt.bh, speed: bt.speeds[this.scene.difficulty] || bt.speeds.Normal, meteorTimer: 0, meteorInterval: bt.meteorInterval, meteorRadius: bt.meteorRadius, meteorDmgMul: bt.meteorDmgMul, corpseTimer: 0, corpseInterval: bt.corpseInterval, corpseCount: bt.corpseCount, splitThreshold: bt.splitThreshold, splitDone: false };
        const hpW = 80;
        b.hpBg = this.scene.add.rectangle(bx, by - bt.bh / 2 - 12, hpW, 6, 0x000000).setDepth(12);
        b.hpFill = this.scene.add.rectangle(bx - hpW / 2, by - bt.bh / 2 - 12, hpW, 6, 0x9b59b6).setOrigin(0, 0.5).setDepth(12);
        b.hpBg.setVisible(false); b.hpFill.setVisible(false);
        this.scene.villageBossNameText = this.scene.add.text(bx, by - bt.bh / 2 - 24, bt.name, { fontSize: '14px', fill: DIFF_COLORS[this.scene.difficulty] || '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(12).setVisible(false);
        this.scene.villageBoss = b;
        this.scene.enemies.add(b);
        this.scene.floatingText(bx, by - 60, 'PURPLE DEMON APPEARS!', '#9b59b6');
    }

    updateBoss(delta) {
        const s = this.scene;
        const b = s.villageBoss;
        if (!b || !b.active) return;
        const st = b.stats;
        if (s.menuOpen || s.transitioning) { b.body.setVelocity(0); return; }
        if (st.hp > 0) {
            BossAI.updateHpBar(b, {
                x: b.x, y: b.y - st.bh / 2 - 12, width: 80, fillOffsetX: -40,
                nameText: s.villageBossNameText, nameYOffset: -12, show: true
            });
        }
        const dx = s.player.x - b.x, dy = s.player.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 30) {
            const nx = dx / dist, ny = dy / dist;
            b.body.setVelocity(nx * st.speed, ny * st.speed);
            if (s.anims.exists('purple_demon_walk_anim') && !b.anims.isPlaying) b.play('purple_demon_walk_anim');
            b.setFlipX(dx < 0);
        } else { b.body.setVelocity(0); }
        st.meteorTimer += s.game.loop.delta;
        if (st.meteorTimer >= st.meteorInterval) { st.meteorTimer = 0; this._villageBossMeteor(b); }
        st.corpseTimer += s.game.loop.delta;
        if (st.corpseTimer >= st.corpseInterval) { st.corpseTimer = 0; this._villageBossSummonCorpses(b); }
    }

    updateBossClones() {
        const s = this.scene;
        if (!s.enemies) return;
        s.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats || !e.stats.isBossClone) return;
            const dx = s.player.x - e.x, dy = s.player.y - e.y, dist = Math.sqrt(dx * dx + dy * dy);
            const spd = e.stats.speed || 60;
            if (dist > 16) {
                const chaseSpd = dist < 80 ? spd * 1.4 : spd;
                e.body.setVelocity((dx / dist) * chaseSpd, (dy / dist) * chaseSpd); e.setFlipX(dx < 0);
            } else { e.body.setVelocity(0); }
            if (s.anims.exists('purple_demon_walk_anim') && !e.anims.isPlaying) e.play('purple_demon_walk_anim');
            const dt = s.game.loop.delta;
            e.stats.meteorTimer = (e.stats.meteorTimer || 0) + dt;
            if (e.stats.meteorTimer >= (e.stats.meteorInterval || 8000)) { e.stats.meteorTimer = 0; this._villageBossMeteor(e); }
            BossAI.updateHpBar(e, { x: e.x, y: e.y - 44, width: 40, fillOffsetX: -20 });
        });
    }

    _villageBossMeteor(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        const ox = s.villageOffsetX;
        const px = s.player.x, py = s.player.y;
        for (let i = 0; i < 3; i++) {
            const mx = Phaser.Math.Clamp(px + Phaser.Math.Between(-60, 60), ox + 20, ox + VILLAGE_WIDTH - 20);
            const my = Phaser.Math.Clamp(py + Phaser.Math.Between(-60, 60), 20, 600 - 20);
            const meteor = s.add.sprite(mx, my - 200, 'meteor_vfx').setDepth(8).setAlpha(0.8);
            s.tweens.add({
                targets: meteor, y: my, alpha: 1, duration: 600, delay: i * 150, ease: 'Quad.easeIn',
                onComplete: () => {
                    if (meteor.active) meteor.destroy();
                    const dmg = Math.floor(boss.stats.damage * VILLAGE_BOSS_TYPE.meteorDmgMul);
                    if (Phaser.Math.Distance.Between(mx, my, s.player.x, s.player.y) < VILLAGE_BOSS_TYPE.meteorRadius) {
                        s.combat.takeDamage(dmg);
                        s.floatingText(s.player.x, s.player.y - 30, '-' + dmg + ' METEOR', '#9b59b6');
                    }
                }
            });
        }
    }

    _villageBossSummonCorpses(boss) {
        const s = this.scene;
        if (!boss || !boss.active) return;
        if (s.villageZombies && s.villageZombies.getLength && s.villageZombies.getLength() >= 8) return;
        const ox = s.villageOffsetX;
        const bt = VILLAGE_CORPSE_MINION;
        for (let i = 0; i < VILLAGE_BOSS_TYPE.corpseCount; i++) {
            const angle = (i / VILLAGE_BOSS_TYPE.corpseCount) * Math.PI * 2;
            const ix = Phaser.Math.Clamp(boss.x + Math.cos(angle) * 60, ox + 10, ox + VILLAGE_WIDTH - 10);
            const iy = Phaser.Math.Clamp(boss.y + Math.sin(angle) * 60, 10, 600 - 10);
            const z = s.add.sprite(ix, iy, 'zombie_walk').setDepth(5);
            s.physics.add.existing(z, false);
            z.body.setSize(bt.bw, bt.bh); z.body.setCollideWorldBounds(true);
            if (s.anims.exists('zombie_walk_anim')) z.play('zombie_walk_anim');
            z.stats = { key: bt.key, name: bt.name, hp: Math.floor(bt.hp * s.diffMulti.hp), maxHp: Math.floor(bt.hp * s.diffMulti.hp), damage: Math.floor(bt.dmg * s.diffMulti.dmg), exp: Math.floor(bt.exp * s.diffMulti.exp), bw: bt.bw, bh: bt.bh, speed: 40 };
            const hpW = bt.bw + 6;
            z.hpBg = s.add.rectangle(ix, iy - bt.bh / 2 - 6, hpW, 3, 0x000000).setDepth(6);
            z.hpFill = s.add.rectangle(ix - hpW / 2, iy - bt.bh / 2 - 6, hpW, 3, 0x5a6a4a).setOrigin(0, 0.5).setDepth(6);
            s.villageZombies.add(z);
        }
    }

    splitBoss(boss) {
        const s = this.scene;
        const st = boss.stats;
        if (st.splitDone) return;
        st.splitDone = true;
        const ox = s.villageOffsetX;
        playBossAoE();
        const count = 2;
        s.zones.village.bossClones = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const cx = boss.x + Math.cos(angle) * 50, cy = boss.y + Math.sin(angle) * 50;
            const clone = s.add.sprite(cx, cy, 'purple_demon_walk').setDepth(5);
            s.physics.add.existing(clone, false);
            clone.body.setSize(st.bw, st.bh); clone.body.setCollideWorldBounds(true);
            if (s.anims.exists('purple_demon_walk_anim')) clone.play('purple_demon_walk_anim');
            const cloneHp = Math.floor(st.maxHp * 0.4);
            clone.stats = { key: 'boss_clone', name: 'Demon Clone', hp: cloneHp, maxHp: cloneHp, damage: Math.floor(st.damage * 1.2), exp: Math.floor(st.exp * 0.3), bw: st.bw, bh: st.bh, speed: st.speed * 1.3, isBossClone: true, meteorTimer: 0, meteorInterval: st.meteorInterval, corpseTimer: 0, corpseInterval: st.corpseInterval };
            const hpW = 40;
            clone.hpBg = s.add.rectangle(clone.x, clone.y - st.bh / 2 - 8, hpW, 3, 0x333333).setOrigin(0.5).setDepth(11);
            clone.hpFill = s.add.rectangle(clone.x, clone.y - st.bh / 2 - 8, hpW, 3, 0x9b59b6).setOrigin(0.5).setDepth(11);
            s.enemies.add(clone);
            s.zones.village.bossClones.push(clone);
        }
        s.floatingText(boss.x, boss.y - 50, 'SPLIT!', '#9b59b6');
        s.tweens.add({ targets: boss, alpha: 0, duration: 500, onComplete: () => { boss.hpBg.destroy(); boss.hpFill.destroy(); s.villageBossNameText.destroy(); boss.destroy(); s.villageBoss = null; } });
    }

    killBossClone(clone) {
        const s = this.scene;
        const clones = s.zones.village.bossClones;
        if (clones) {
            const idx = clones.indexOf(clone);
            if (idx !== -1) clones.splice(idx, 1);
        }
        clone.hpBg.destroy(); clone.hpFill.destroy(); clone.destroy();
        if (!clones || clones.length === 0) {
            s.zones.village.bossDefeated = true;
            this._victoryBossClone();
        }
    }

    _victoryBossClone() {
        const s = this.scene;
        const ox = s.villageOffsetX;
        playBossDeath();
        if (s.particles) s.particles.spawnBossDeath(ox + VILLAGE_WIDTH / 2, 200);
        s.defeatedText = s.add.text(ox + VILLAGE_WIDTH / 2, 230, 'PURPLE DEMON DEFEATED!', { fontSize: '28px', fill: '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({ targets: s.defeatedText, alpha: 0, duration: 5000, onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; } });
        const lootItems = [];
        // Always drop Magma Armor for Hell zone
        if (s.addEquip({ ...MAGMA_ARMOR, type: 'equip' })) { lootItems.push(MAGMA_ARMOR); playLoot(); }
        [rollZoneEquip('village'), rollZoneEquip('village')].forEach(item => { if (item && s.addEquip(item)) { lootItems.push(item); playLoot(); } });
        if (Math.random() < 0.4) { const acc = rollVillageAccountEquip(); if (acc && s.addAccountEquip(acc)) { lootItems.push({ ...acc, name: acc.name + ' [ACCOUNT]' }); playLoot(); } }
        s.defeatedLoot = [];
        lootItems.forEach((item, i) => {
            const lt = s.add.text(ox + VILLAGE_WIDTH / 2, 280 + i * 22, '+' + item.name, { fontSize: '14px', fill: '#' + (item.rarity ? item.rarity.toString(16).padStart(6, '0') : 'f1c40f'), fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({ targets: lt, alpha: 0, duration: 5000, onComplete: () => { if (lt.active) lt.destroy(); } });
        });
        s.hellPortal = s.add.sprite(ox + VILLAGE_WIDTH / 2, 380, 'hell_portal').setDepth(1);
        s.hellPortalGlow = s.add.image(ox + VILLAGE_WIDTH / 2, 380, 'portal_glow').setDepth(0).setScale(2).setTint(0xff4400).setAlpha(0.7);
        s.tweens.add({
            targets: s.hellPortalGlow,
            alpha: { from: 0.4, to: 0.9 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        s.hellPortalHint = s.add.text(ox + VILLAGE_WIDTH / 2, 410, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
        if (s.particles) {
            s.particles.startPortalParticles(ox + VILLAGE_WIDTH / 2, 380, [0xff4400, 0xff6600, 0xff8800]);
        }
        s.time.delayedCall(3000, () => { s.floatingText(ox + VILLAGE_WIDTH / 2, 360, 'Hell portal appeared!', '#e74c3c'); });
        s.checkLevelUp(); s._checkAccountLevelUp(); s.ui.updateUI();
        const hc = rollBossCrystals('village', s.difficulty);
        if (hc > 0) { const granted = s.awardCrystals(hc, ox + VILLAGE_WIDTH / 2, 310); if (granted > 0) s.floatingText(ox + VILLAGE_WIDTH / 2, 310, '+' + granted + ' \u{1F48E}', '#3498db'); }
    }

    /* ===== SNOWY BOSS ===== */

    spawnSnowyBoss() {
        const ox = this.scene.villageOffsetX;
        const bt = SNOWY_VILLAGE_BOSS_TYPE;
        const bx = ox + VILLAGE_WIDTH / 2, by = 250;
        const e = this.scene.add.sprite(bx, by, 'ice_spirit_walk').setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(bt.bw, bt.bh); e.body.setCollideWorldBounds(true);
        e.stats = { key: bt.key, name: bt.name, hp: Math.floor(bt.hp * this.scene.diffMulti.hp), maxHp: Math.floor(bt.hp * this.scene.diffMulti.hp), damage: Math.floor(bt.dmg * this.scene.diffMulti.dmg), exp: Math.floor(bt.exp * this.scene.diffMulti.exp), bw: bt.bw, bh: bt.bh, frostTimer: 0, frostInterval: bt.frostInterval, blizzardTimer: 0, blizzardInterval: bt.blizzardInterval, shardTimer: 0, shardInterval: bt.shardInterval };
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
        const ox = s.villageOffsetX;
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
