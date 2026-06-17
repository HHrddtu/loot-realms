import Phaser from 'phaser';
import {
    VILLAGE_WIDTH, VILLAGE_HEIGHT,
    SNOWY_VILLAGE_ENEMY_TYPES, SNOWY_VILLAGE_BOSS_TYPE, SNOWY_BOSS_MINION,
    WARMTH_CORE,
    SNOWY_VILLAGE_CAMP_POSITIONS, SNOWY_VILLAGE_CHEST_COUNT, SNOWY_VILLAGE_CHEST_DROP_CHANCE,
    VILLAGE_CHEST_EQUIP_DROP_CHANCE
} from '../config/index.js';
import { playBossDeath, playLoot } from '../sound.js';
import { rollVillageEquip, rollEquip } from '../utils.js';

export class SnowyZone {
    constructor(scene) {
        this.scene = scene;
    }

    _spawnSnowyVillageCamps() {
        const ox = this.scene.villageOffsetX;
        const roleOrder = ['tank', 'assassin', 'archer', 'healer'];
        for (let i = 0; i < SNOWY_VILLAGE_CAMP_POSITIONS.length; i++) {
            const cp = SNOWY_VILLAGE_CAMP_POSITIONS[i];
            for (let j = 0; j < 4; j++) {
                const role = roleOrder[j % roleOrder.length];
                const t = SNOWY_VILLAGE_ENEMY_TYPES[role];
                const angle = (j / 4) * Math.PI * 2;
                const ex = ox + cp.x + Math.cos(angle) * 30;
                const ey = cp.y + Math.sin(angle) * 25;
                this._makeSnowyVillageEnemy(t, ex, ey, i);
            }
        }
    }

    _makeSnowyVillageEnemy(t, x, y, campIndex) {
        const walkTex = t.key + '_walk';
        const animKey = t.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(5);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(t.bw, t.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        const rangedInterval = t.role === 'archer' ? 1800 : t.role === 'healer' ? 2500 : 2000;
        e.stats = {
            key: t.key, name: t.name,
            hp: Math.floor(t.hp * this.scene.diffMulti.hp),
            maxHp: Math.floor(t.hp * this.scene.diffMulti.hp),
            damage: Math.floor(t.dmg * this.scene.diffMulti.dmg),
            exp: Math.floor(t.exp * this.scene.diffMulti.exp),
            bw: t.bw, bh: t.bh, role: t.role,
            campIndex: campIndex,
            wTimer: 0, wDir: 0,
            rangedTimer: 0, rangedInterval
        };

        const hw = t.bw + 4;
        e.hpBg = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x333333).setOrigin(0.5).setDepth(11);
        e.hpFill = this.scene.add.rectangle(x, y - t.bh / 2 - 8, hw, 3, 0x3498db).setOrigin(0.5).setDepth(11);
        this.scene.enemies.add(e);
        return e;
    }

    _spawnSnowyVillageChests() {
        const ox = this.scene.villageOffsetX;
        for (let i = 0; i < SNOWY_VILLAGE_CHEST_COUNT; i++) {
            const cy = 100 + Math.random() * (VILLAGE_HEIGHT - 200);
            const cx = ox + 50 + Math.random() * (VILLAGE_WIDTH - 100);
            this._createSnowyVillageChest(cx, cy);
        }
    }

    _createSnowyVillageChest(x, y) {
        const ch = this.scene.add.sprite(x, y, 'snowy_barrel').setDepth(6);
        this.scene.physics.add.existing(ch, false);
        ch.body.setSize(18, 22);
        ch.body.setCollideWorldBounds(true);
        ch.stats = { hp: 60, maxHp: 60 };
        ch.hpBg = this.scene.add.rectangle(x, y - 16, 22, 3, 0x333333).setOrigin(0.5).setDepth(11);
        ch.hpFill = this.scene.add.rectangle(x, y - 16, 22, 3, 0x3498db).setOrigin(0.5).setDepth(11);
        ch.loot = [];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
            if (Math.random() < SNOWY_VILLAGE_CHEST_DROP_CHANCE) {
                ch.loot.push(rollVillageEquip());
            }
        }
        if (Math.random() < VILLAGE_CHEST_EQUIP_DROP_CHANCE) {
            ch.loot.push(rollEquip());
        }
        ch.hintText = this.scene.add.text(x, y - 20, '', {
            fontSize: '10px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
        ch.broken = false;
        this.scene.villageChests.add(ch);
        return ch;
    }

    _spawnSnowyCampfire() {
        const ox = this.scene.villageOffsetX;
        const cf = this.scene.add.image(ox + VILLAGE_WIDTH / 2, 100, 'campfire').setDepth(6);
        this.scene.physics.add.existing(cf, false);
        cf.body.setSize(24, 30);
        cf.body.setCollideWorldBounds(true);
        this.scene.campfire = cf;
        this.scene.campfireHint = this.scene.add.text(ox + VILLAGE_WIDTH / 2, 70, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    _spawnSnowyVillageBoss() {
        if (this.scene.snowyIceSpirit) return;
        const ox = this.scene.villageOffsetX;
        const x = ox + VILLAGE_WIDTH / 2;
        const y = VILLAGE_HEIGHT - 100;

        const walkTex = SNOWY_VILLAGE_BOSS_TYPE.key + '_walk';
        const animKey = SNOWY_VILLAGE_BOSS_TYPE.key + '_walk_anim';
        const e = this.scene.add.sprite(x, y, walkTex).setDepth(6);
        this.scene.physics.add.existing(e, false);
        e.body.setSize(SNOWY_VILLAGE_BOSS_TYPE.bw, SNOWY_VILLAGE_BOSS_TYPE.bh);
        e.body.setCollideWorldBounds(true);
        if (this.scene.anims.exists(animKey)) e.play(animKey);

        const bt = SNOWY_VILLAGE_BOSS_TYPE;
        const diffKey = this.scene.difficulty || 'Normal';
        e.stats = {
            key: bt.key, name: bt.name,
            hp: Math.floor((bt.hp[diffKey] || bt.hp.Normal)),
            maxHp: Math.floor((bt.hp[diffKey] || bt.hp.Normal)),
            damage: Math.floor((bt.dmg[diffKey] || bt.dmg.Normal)),
            exp: Math.floor((bt.exp[diffKey] || bt.exp.Normal)),
            bw: bt.bw, bh: bt.bh
        };

        const hpW = 80;
        e.hpBg = this.scene.add.rectangle(400, 56, hpW, 6, 0x333333).setOrigin(0.5).setScrollFactor(0).setDepth(20);
        e.hpFill = this.scene.add.rectangle(400 - hpW / 2, 56, hpW, 6, 0x3498db).setOrigin(0, 0.5).setScrollFactor(0).setDepth(20);
        this.scene.snowyIceSpiritNameText = this.scene.add.text(400, 44, bt.name, {
            fontSize: '13px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);

        this.scene.snowyIceSpirit = e;
        this.scene.snowyIceSpiritAbilities = { frostWaveTimer: 0, blizzardTimer: 0, summonTimer: 0 };
        this.scene.snowyIceShards = this.scene.physics.add.group();
    }

    _updateSnowyVillageBoss() {
        if (!this.scene.snowyIceSpirit || !this.scene.snowyIceSpirit.active) return;
        const b = this.scene.snowyIceSpirit;
        const s = b.stats;

        b.hpBg.x = 400;
        b.hpBg.y = 56;
        b.hpFill.x = 400 - b.hpBg.width / 2;
        b.hpFill.y = 56;
        b.hpFill.width = b.hpBg.width * (s.hp / s.maxHp);

        if (b.hp <= 0) {
            this._snowyIceSpiritDied();
            return;
        }

        const dx = this.scene.player.x - b.x;
        const dy = this.scene.player.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 40) {
            b.body.setVelocity((dx / dist) * 60, (dy / dist) * 60);
            b.setFlipX(dx < 0);
        } else {
            b.body.setVelocity(0);
        }

        const ab = this.scene.snowyIceSpiritAbilities;
        ab.frostWaveTimer += this.scene.game.loop.delta;
        ab.blizzardTimer += this.scene.game.loop.delta;
        ab.summonTimer += this.scene.game.loop.delta;

        if (ab.frostWaveTimer >= 5000) {
            ab.frostWaveTimer = 0;
            this._snowyFrostWave(b);
        }
        if (ab.blizzardTimer >= 8000) {
            ab.blizzardTimer = 0;
            this._snowyBlizzard(b);
        }
        if (ab.summonTimer >= 12000) {
            ab.summonTimer = 0;
            this._snowySummonShards(b);
        }

        if (this.scene.snowyIceShards && this.scene.snowyIceShards.getLength() > 0) {
            this.scene.snowyIceShards.getChildren().forEach(s => {
                if (!s.active || !s.stats) return;
                const sdx = this.scene.player.x - s.x;
                const sdy = this.scene.player.y - s.y;
                const sd = Math.sqrt(sdx * sdx + sdy * sdy);
                if (sd < 200) {
                    if (sd > 15) {
                        s.body.setVelocity((sdx / sd) * 90, (sdy / sd) * 90);
                        s.setFlipX(sdx < 0);
                    } else {
                        s.body.setVelocity(0);
                    }
                } else {
                    s.body.setVelocity(0);
                }
                if (s.hpBg) { s.hpBg.x = s.x; s.hpBg.y = s.y - s.stats.bh / 2 - 6; }
                if (s.hpFill) { s.hpFill.x = s.x; s.hpFill.y = s.y - s.stats.bh / 2 - 6; }
            });
        }
    }

    _snowyFrostWave(boss) {
        if (!boss || !boss.active) return;
        const ox = this.scene.villageOffsetX;
        const px = this.scene.player.x;
        const py = this.scene.player.y;
        const dx = px - boss.x;
        const dy = py - boss.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 250) return;
        if (dist < 100) {
            this.scene.combat.takeDamage(Math.floor(boss.stats.damage * 0.6));
        }
        const vfx = this.scene.add.image(boss.x + dx * 0.5, boss.y + dy * 0.5, 'frost_wave_vfx').setDepth(10).setAlpha(0.7);
        this.scene.tweens.add({ targets: vfx, alpha: 0, scale: 1.5, duration: 600, onComplete: () => vfx.destroy() });
    }

    _snowyBlizzard(boss) {
        if (!boss || !boss.active) return;
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, boss.x, boss.y);
        if (dist < 150) {
            this.scene.combat.takeDamage(Math.floor(boss.stats.damage * 0.8));
        }
        const vfx = this.scene.add.image(boss.x, boss.y, 'blizzard_vfx').setDepth(10).setAlpha(0.7).setScale(1.5);
        this.scene.tweens.add({ targets: vfx, alpha: 0, scale: 2, duration: 800, onComplete: () => vfx.destroy() });
    }

    _snowySummonShards(boss) {
        if (!boss || !boss.active || !this.scene.snowyIceShards) return;
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2;
            const sx = boss.x + Math.cos(angle) * 50;
            const sy = boss.y + Math.sin(angle) * 40;
            const shard = this.scene.add.sprite(sx, sy, 'ice_shard').setDepth(5);
            this.scene.physics.add.existing(shard, false);
            shard.body.setSize(10, 12);
            shard.body.setCollideWorldBounds(true);
            const dm = this.scene.diffMulti || { hp: 1, dmg: 1 };
            shard.stats = { hp: Math.floor(SNOWY_BOSS_MINION.hp * dm.hp), maxHp: Math.floor(SNOWY_BOSS_MINION.hp * dm.hp), damage: Math.floor(SNOWY_BOSS_MINION.dmg * dm.dmg), bh: 12 };
            shard.hpBg = this.scene.add.rectangle(sx, sy - 12, 14, 3, 0x333333).setOrigin(0.5).setDepth(11);
            shard.hpFill = this.scene.add.rectangle(sx, sy - 12, 14, 3, 0x3498db).setOrigin(0.5).setDepth(11);
            this.scene.snowyIceShards.add(shard);
        }
    }

    _snowyIceSpiritDied() {
        if (!this.scene.snowyIceSpirit) return;
        playBossDeath();
        const ox = this.scene.villageOffsetX;

        if (this.scene.snowyIceSpirit.hpBg) this.scene.snowyIceSpirit.hpBg.destroy();
        if (this.scene.snowyIceSpirit.hpFill) this.scene.snowyIceSpirit.hpFill.destroy();
        if (this.scene.snowyIceSpiritNameText) this.scene.snowyIceSpiritNameText.destroy();
        this.scene.snowyIceSpirit.destroy();
        this.scene.snowyIceSpirit = null;

        if (this.scene.snowyIceShards) {
            this.scene.snowyIceShards.getChildren().forEach(s => {
                if (s.hpBg) s.hpBg.destroy();
                if (s.hpFill) s.hpFill.destroy();
            });
            this.scene.snowyIceShards.clear(true, true);
        }

        this.scene.defeatedText = this.scene.add.text(ox + VILLAGE_WIDTH / 2, 200, 'ICE SPIRIT DEFEATED!', {
            fontSize: '22px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
        this.scene.tweens.add({
            targets: this.scene.defeatedText, alpha: 0, duration: 5000,
            onComplete: () => { if (this.scene.defeatedText) this.scene.defeatedText.destroy(); this.scene.defeatedText = null; }
        });

        const warmCore = { ...WARMTH_CORE, type: 'equip' };
        if (this.scene.addEquip(warmCore)) {
            this.scene.floatingText(ox + VILLAGE_WIDTH / 2, 230, '+' + warmCore.name, '#ff6600');
            playLoot();
        }

        this.scene.villageBossDefeated = true;
        this.scene.checkLevelUp();
        this.scene._checkAccountLevelUp();
        this.scene.updateUI();

        this.scene.time.delayedCall(2000, () => {
            this.scene.floatingText(ox + VILLAGE_WIDTH / 2, 260, 'Use Warmth Core at the campfire!', '#f1c40f');
        });
    }

    _updateSnowyVillageMobs() {
        if (this.scene.zone !== 'village' || !this.scene.villageFrozen || this.scene.menuOpen || this.scene.transitioning) return;
        if (!this.scene.enemies) return;

        this.scene.enemies.getChildren().forEach(e => {
            if (!e.active || !e.stats) return;
            const aggro = this.scene.getAggroTarget();
            const dx = aggro.x - e.x;
            const dy = aggro.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
                let speed = 55;
                if (e.stats.role === 'assassin') speed = 85;
                else if (e.stats.role === 'tank') speed = 38;
                else if (e.stats.role === 'healer') speed = 50;
                if (dist > 30) {
                    e.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
                    e.setFlipX(dx < 0);
                } else {
                    e.body.setVelocity(0);
                }
                if (e.stats.role === 'healer' && dist < 150) {
                    this.scene.enemies.getChildren().forEach(ally => {
                        if (ally !== e && ally.active && ally.stats && ally.stats.hp < ally.stats.maxHp) {
                            const ad = Phaser.Math.Distance.Between(e.x, e.y, ally.x, ally.y);
                            if (ad < 80) {
                                ally.stats.hp = Math.min(ally.stats.maxHp, ally.stats.hp + 2);
                                if (ally.hpFill) ally.hpFill.width = (ally.hpBg.width) * (ally.stats.hp / ally.stats.maxHp);
                            }
                        }
                    });
                }
            } else {
                e.body.setVelocity(0);
            }
            e.hpBg.x = e.x;
            e.hpBg.y = e.y - e.stats.bh / 2 - 8;
            e.hpFill.x = e.x;
            e.hpFill.y = e.y - e.stats.bh / 2 - 8;
        });
    }

    _checkSnowyVillageProgress() {
        if (this.scene.zone !== 'village' || !this.scene.villageFrozen || this.scene.snowyVillageAllCleared) return;
        if (!this.scene.enemies || this.scene.enemies.getLength() === 0) {
            this.scene.snowyVillageAllCleared = true;
            this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 180, 'All winter spirits vanquished!', '#3498db');
            this.scene.time.delayedCall(2000, () => {
                this._spawnSnowyVillageBoss();
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'ICE SPIRIT has appeared!', '#ff4444');
            });
        }
    }

    _activateCampfire() {
        if (!this.scene.villageFrozen || !this.scene.campfire) return;
        const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.scene.campfire.x, this.scene.campfire.y);
        if (dist >= 60) return;

        let hasWarmthCore = false;
        const bag = this.scene.equipBag || [];
        for (let i = 0; i < bag.length; i++) {
            if (bag[i] && (bag[i].id === 'warmth_core' || bag[i].key === 'warmth_core')) {
                bag.splice(i, 1);
                hasWarmthCore = true;
                break;
            }
        }
        if (!hasWarmthCore) {
            if (this.scene.campfireHint) this.scene.campfireHint.setText('Need Warmth Core!');
            return;
        }

        this.scene.transitioning = true;
        if (this.scene.campfireHint) this.scene.campfireHint.setText('');
        this.scene.cameras.main.fadeOut(1500, 255, 200, 100);

        this.scene.time.delayedCall(1500, () => {
            this.scene.villageRestored = true;
            this.scene._clearVillage();
            this.scene._setupVillage(false);
            this.scene.cameras.main.fadeIn(1000, 255, 200, 100);
            this.scene.transitioning = false;

            this.scene.time.delayedCall(500, () => {
                this.scene.floatingText(this.scene.villageOffsetX + VILLAGE_WIDTH / 2, 200, 'The village is restored!', '#ff6600');
            });
        });
    }
}
