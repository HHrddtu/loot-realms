import Phaser from 'phaser';
import { DIFF_MULT, ENEMY_TYPES, RARITY_COLORS, EQUIP_DROP_CHANCE, BOSS_DROP_CHANCE,
         MINE_ENEMY_TYPES, MINE_CHEST_DROP_CHANCE, SECRET_KEY_ITEM, VILLAGE_CHEST_OPEN_KEY,
         CAVE_CHEST_OPEN_KEY, CAVE_WIDTH, VILLAGE_BOSS_TYPE, CAVE_HEIGHT } from '../config/index.js';
import { rollZoneEquip, rollZoneMaterial, rollEquip, rollMaterial, rollAccountEquip, rollCaveRelic } from '../utils.js';
import { rollGold, rollBossGold, rollChestGold } from '../config/gold.js';
import { rollBossCrystals, getPetStats } from '../config/pets.js';
import { playBossDeath, playEnemyDeath, playLoot, playBreak } from '../sound.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';
import { onKill, onCollect } from '../quests.js';
import { getMyId } from '../network.js';
import { EnemyAI } from './EnemyAI.js';

export class CombatLoot {
    constructor(scene) {
        this.scene = scene;
    }

    static spawnDeathEcho(scene, x, y, textureKey, opts = {}) {
        if (!textureKey || !scene.textures.exists(textureKey)) return null;
        const ghost = scene.add.sprite(x, y, textureKey)
            .setDepth(opts.depth || 6)
            .setAlpha(opts.alpha ?? 0.9);
        if (opts.scale) ghost.setScale(opts.scale);
        if (opts.flipX) ghost.setFlipX(true);
        if (opts.tint) ghost.setTint(opts.tint);

        if (opts.animKey && scene.anims.exists(opts.animKey)) {
            ghost.play(opts.animKey);
            scene.tweens.add({
                targets: ghost,
                alpha: 0,
                delay: opts.animDelay ?? 600,
                duration: opts.fadeDuration ?? 500,
                onComplete: () => { if (ghost.active) ghost.destroy(); }
            });
        } else {
            scene.tweens.add({
                targets: ghost,
                angle: opts.spin ?? 90,
                alpha: 0,
                scaleY: (opts.scale || 1) * 0.5,
                y: y + (opts.drop ?? 12),
                duration: opts.duration ?? 420,
                ease: 'Quad.easeIn',
                onComplete: () => { if (ghost.active) ghost.destroy(); }
            });
        }
        return ghost;
    }

    handleEnemyDeath(enemy) {
        // Guard against multiple calls in same frame
        if (enemy._deathHandled) return;
        enemy._deathHandled = true;

        const s = this.scene;

        const bossZone = this._bossZone(enemy);
        if (bossZone) this._grantFirstClear(bossZone);

        // Generic boss handler: if boss has bossHandler, call it
        if (enemy.bossHandler) {
            enemy.bossHandler(enemy);
            return;
        }

        // Legacy boss detection (will be removed as zones migrate to bossHandler)
        if (enemy === s.boss) { this.killBoss(); }
        else if (enemy === s.mineBoss) { this.killMineBoss(); }
        else if (enemy === s.caveBoss) { this.killCaveBoss(); }
        else if (enemy === s.villageBoss) {
            const bs = s.villageBoss.stats;
            if (!bs.splitDone && (bs.hp / bs.maxHp <= VILLAGE_BOSS_TYPE.splitThreshold || bs.hp <= 0)) {
                s.zones.village.boss.splitBoss(s.villageBoss);
            }
            return;
        } else if (enemy === s.hellBoss) { s.zones.hell.victoryHellBoss(); }
        else if (enemy === s.depthsBoss) { s.zones.depths.victoryDepthsBoss(); }
        else if (enemy === s.cursedBoss) { s.zones.cursed.victoryCursedBoss(); }
        else if (enemy === s.shadowBoss) { s.zones.shadow.victoryShadowBoss(); }
        else if (enemy === s.towerBoss) { s.zones.tower.victoryTowerBoss(); }
        else if (enemy === s.throneBoss) { s.zones.throne.victoryThroneBoss(); }
        else if (enemy === s.snowyIceSpirit) { s.zones.village.boss.iceSpiritDied(); }
        else if (enemy === s.castleBoss) { /* handled by CastleZone._updateBoss */ }
        else if (enemy.stats && enemy.stats.isBossClone) { s.zones.village.boss.killBossClone(enemy); }
        else {
            const lootData = this.killEnemy(enemy);
            const killer = enemy._lastAttackerPeerId || (typeof getMyId === 'function' ? getMyId() : null);
            if (s._distributeLoot) s._distributeLoot(lootData, killer);
        }
    }

    _bossZone(enemy) {
        const s = this.scene;
        if (enemy === s.boss) return 'forest';
        if (enemy === s.mineBoss) return 'mine';
        if (enemy === s.caveBoss) return 'cave';
        if (enemy === s.hellBoss) return 'hell';
        if (enemy === s.depthsBoss) return 'depths';
        if (enemy === s.cursedBoss) return 'cursed';
        if (enemy === s.shadowBoss) return 'shadow';
        if (enemy === s.towerBoss) return 'tower';
        if (enemy === s.throneBoss) return 'throne';
        if (enemy === s.snowyIceSpirit) return 'snowy';
        if (enemy === s.castleBoss) return 'castle';
        if (enemy === s.desertBoss) return 'desert';
        if (enemy === s.swampBoss) return 'swamp';
        return null;
    }

    _grantFirstClear(zone) {
        const s = this.scene;
        if (!s.firstClearZones) s.firstClearZones = {};
        if (s.firstClearZones[zone]) return;
        s.firstClearZones[zone] = true;
        s.talentPoints = (s.talentPoints || 0) + 1;
        s.masteryPoints = (s.masteryPoints || 0) + 1;
        s.accountExp = (s.accountExp || 0) + 50;
        const item = rollZoneEquip(zone);
        if (item) {
            if (typeof s.addEquip === 'function') s.addEquip(item);
            else { s.equipBag = s.equipBag || []; s.equipBag.push(item); }
        }
        s.floatingText(s.player.x, s.player.y - 60, 'ZONE CLEARED: +1 Talent, +1 Mastery', '#f1c40f');
        if (item) s.floatingText(s.player.x, s.player.y - 78, '+' + item.name, '#3498db');
        if (s.recalcStats) s.recalcStats();
        if (s.ui && s.ui.updateUI) s.ui.updateUI();
    }

    killEnemy(enemy) {
        const s = this.scene;
        const setB = s.setBonuses || {};
        const exp = Math.floor(enemy.stats.exp * (1 + (setB.expPercent || 0) / 100));
        playEnemyDeath();
        if (s.particles) s.particles.spawnEnemyDeath(enemy.x, enemy.y);
        if (enemy.stats.key) { recordKill(enemy.stats.key); recordSoulCollect(enemy.stats.key); onKill(enemy.stats.key); s._updateQuestIcons(); }

        for (let i = 0; i < 3; i++) {
            const c = s.add.sprite(enemy.x + Phaser.Math.Between(-12, 12), enemy.y + Phaser.Math.Between(-8, 8), 'coin');
            s.tweens.add({ targets: c, y: c.y - 25, alpha: 0, duration: 500 + i * 100, delay: i * 80, onComplete: () => c.destroy() });
        }

        const goldAmount = rollGold(s.zone || 'forest');
        const petStats = getPetStats(s.equippedPet, (s.petLevels || {})[s.equippedPet] || 1);
        const lootBonus = (petStats.lootPercent || 0) / 100;
        const goldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0) / 100) + lootBonus;
        let finalGold = Math.floor(goldAmount * goldBonus);
        if (s.setBonuses && s.setBonuses.transmuteOnKill) finalGold = Math.floor(finalGold * 1.5);

        const items = [];
        if (Math.random() < EQUIP_DROP_CHANCE + lootBonus * 0.5 + (setB.lootPercent || 0) / 100) {
            const item = rollEquip();
            if (item) items.push({ kind: 'equip', item, x: enemy.x, y: enemy.y - 45, rarity: item.rarity });
        }

        // Prestige-exclusive drops
        const prestige = s.prestigeLevel || 0;
        if (prestige >= 3 && Math.random() < 0.05) {
            const prestigeItems = [
                { name: 'Chaos Shard', rarity: 'epic', stats: { dmgPercent: 5 } },
                { name: 'Void Essence', rarity: 'epic', stats: { hpPercent: 5 } },
                { name: 'Blood Crystal', rarity: 'legendary', stats: { critPercent: 3 } }
            ];
            const pItem = prestigeItems[Math.floor(Math.random() * prestigeItems.length)];
            items.push({ kind: 'material', item: pItem, x: enemy.x, y: enemy.y - 50, rarity: pItem.rarity });
        }

        if (enemy.stats.isElite) {
            const eliteItem = rollZoneEquip(s.zone || 'forest');
            if (eliteItem) items.push({ kind: 'equip', item: eliteItem, x: enemy.x, y: enemy.y - 50, rarity: eliteItem.rarity });
        }

        if (enemy.stats.splitOnDeath && !enemy.stats.isSpawn && s.encounterMgr) {
            s.encounterMgr.handleSplit(enemy);
        }

        this._applyOnKillSetEffects(enemy, setB);
        CombatLoot.spawnDeathEcho(s, enemy.x, enemy.y, enemy.texture && enemy.texture.key, {
            scale: enemy.scaleX,
            flipX: enemy.flipX,
            tint: enemy.stats.isElite ? 0xffaa00 : 0xffffff,
            spin: Phaser.Math.Between(-110, 110),
            duration: 380
        });
        if (enemy.hpBg) { enemy.hpBg.destroy(); enemy.hpBg = null; }
        if (enemy.hpFill) { enemy.hpFill.destroy(); enemy.hpFill = null; }
        if (enemy.shieldIcon) { enemy.shieldIcon.destroy(); enemy.shieldIcon = null; }
        if (enemy.roleIcon) { enemy.roleIcon.destroy(); enemy.roleIcon = null; }
        if (enemy.slowIcon) { enemy.slowIcon.destroy(); enemy.slowIcon = null; }
        if (enemy.statusIcon) { enemy.statusIcon.destroy(); enemy.statusIcon = null; }
        enemy.destroy();

        return {
            source: 'mob',
            exp, killsDelta: 1,
            gold: finalGold + (enemy.stats.isElite ? finalGold : 0),
            goldX: enemy.x, goldY: enemy.y - 45,
            items
        };
    }

    _applyOnKillSetEffects(enemy, setB) {
        const s = this.scene;
        if (setB.boneShield && !s.shieldActive && s.spellSys && s.spellSys.effects) {
            s.spellSys.effects._castShield({
                absorption: Math.floor(s.playerMaxHP * 0.08),
                duration: 4
            });
        }
        if (setB.curseOnKill && s.enemies && s.enemies.scene) {
            s.enemies.getChildren().forEach(e => {
                if (!e.active || !e.stats || e === enemy || e.stats.hp <= 0) return;
                if (Phaser.Math.Distance.Between(enemy.x, enemy.y, e.x, e.y) < 120) {
                    EnemyAI._applyStatus(e, 'poison', {
                        dps: Math.max(3, Math.floor((enemy.stats.damage || 5) * 0.5)),
                        duration: 3
                    });
                }
            });
        }
    }

    killBoss() {
        const s = this.scene;
        const boss = s.boss;
        const killer = (boss && boss._lastAttackerPeerId) || (typeof getMyId === 'function' ? getMyId() : null);
        const lootData = this.killGenericBoss({
            bossRef: 'boss',
            nameTextKey: 'bossNameText', recordKey: 'ancient_treant',
            defeatedText: 'ARENA CONQUERED!', defeatedColor: '#f1c40f', secondDropChance: 0.5,
            textX: 400, textY: 200,
            onPostKill: () => {
                s.zones.mine.isUnlocked = true;
                s.zones.arena.bossDefeated = true;
                s._arenaBossJustKilled = true;
                s.time.delayedCall(3000, () => {
                    if (s.zone !== 'arena') return;
                    s.transitioning = true;
                    s.cameras.main.fadeOut(800, 0, 0, 0);
                    s.time.delayedCall(800, () => {
                        s._setupZone('mine');
                        s.cameras.main.fadeIn(500, 0, 0, 0);
                        s.transitioning = false;
                    });
                });
            }
        });
        if (s._distributeLoot) s._distributeLoot(lootData, killer);
        s.zones.arena.bossAlive = false;
    }

    killMineBoss() {
        const s = this.scene;
        const boss = s.mineBoss;
        const killer = (boss && boss._lastAttackerPeerId) || (typeof getMyId === 'function' ? getMyId() : null);
        const lootData = this.killGenericBoss({
            bossRef: 'mineBoss',
            nameTextKey: 'mineBossNameText', recordKey: 'skeleton_lord',
            defeatedText: 'SKELETON LORD DEFEATED!', defeatedColor: '#bf77f6', secondDropChance: 0.6,
            textX: 400, textY: 200,
            extraLoot: () => {
                if (!s.zones.mine.hasSecretKey) {
                    const keyItem = { ...SECRET_KEY_ITEM, _kind: 'material' };
                    return { items: [keyItem], zoneFlags: { 'mine.hasSecretKey': true } };
                }
                return { items: [], zoneFlags: {} };
            },
            onPostKill: () => {
                s.zones.cave.isUnlocked = true;
                s.time.delayedCall(2000, () => {
                    if (s.zone !== 'mine' && s.zone !== 'mine_boss') return;
                    s.floatingText(s.player.x, s.player.y - 50, 'Ancient Key obtained! Return to the Forest — the Cart Driver awaits.', '#bf77f6');
                });
            }
        });
        if (s._distributeLoot) s._distributeLoot(lootData, killer);
        s.zones.mine.bossDefeated = true;
        s.zones.mine.bossAlive = false;
    }

    killCaveBoss() {
        const s = this.scene;
        const textX = s.caveOffsetX + CAVE_WIDTH / 2;
        const boss = s.caveBoss;
        const killer = (boss && boss._lastAttackerPeerId) || (typeof getMyId === 'function' ? getMyId() : null);
        const lootData = this.killGenericBoss({
            bossRef: 'caveBoss',
            nameTextKey: 'caveBossNameText', recordKey: 'giant_bat',
            defeatedText: 'GIANT BAT DEFEATED!', defeatedColor: '#bf77f6', secondDropChance: 0.6,
            textX, textY: 200,
            extraLoot: () => {
                const items = []; const relic = rollCaveRelic(s.classKey);
                if (relic) items.push({ ...relic, name: relic.name + ' [RELIC]' });
                return { items, zoneFlags: {} };
            },
            onPostKill: () => {
                s.visionUnlocked = true;
                s.doSave();
                s.tutorialMgr.showAbilityTutorial('vision');
                s.caveStairs = s.add.sprite(textX, CAVE_HEIGHT - 80, 'cave_stairs').setDepth(1);
                s.caveStairsHint = s.add.text(textX, CAVE_HEIGHT - 55, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
            }
        });
        if (s._distributeLoot) s._distributeLoot(lootData, killer);
        s.zones.cave.bossDefeated = true;
        s.zones.cave.bossAlive = false;
    }

    killGenericBoss(cfg) {
        const s = this.scene;
        const b = s[cfg.bossRef];
        const exp = Math.floor(b.stats.exp * (1 + ((s.setBonuses && s.setBonuses.expPercent) || 0) / 100));
        playBossDeath(); recordKill(cfg.recordKey); recordSoulCollect(cfg.recordKey); onKill(cfg.recordKey);
        s._updateQuestIcons();
        if (s.particles) s.particles.spawnBossDeath(b.x, b.y);
        b.body.setVelocity(0); b.setTint(0xff0000);

        s.physics.world.timeScale = 0.3;
        const zoneKey = cfg.bossRef === 'boss' ? 'arena' : cfg.bossRef === 'mineBoss' ? 'mine' : cfg.bossRef === 'caveBoss' ? 'cave' : null;
        const alreadyDefeated = zoneKey && s.zones && s.zones[zoneKey] && s.zones[zoneKey].bossDefeated;
        if (!alreadyDefeated) {
            s.time.delayedCall(1500, () => {
                s.physics.world.timeScale = 1;
            });
        } else {
            s.time.delayedCall(100, () => { s.physics.world.timeScale = 1; });
        }

        CombatLoot.spawnDeathEcho(s, b.x, b.y, b.texture.key, {
            scale: b.scaleX, tint: 0xffffff, duration: 700, drop: 24
        });
        s.tweens.add({ targets: b, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 800, onComplete: () => { if (b.hpBg) b.hpBg.destroy(); if (b.hpFill) b.hpFill.destroy(); b.destroy(); s[cfg.bossRef] = null; } });
        if (b.aoeRing) { b.aoeRing.destroy(); b.aoeRing = null; }
        if (b.aoeRing2) { b.aoeRing2.destroy(); b.aoeRing2 = null; }
        if (b.telegraph) { b.telegraph.destroy(); b.telegraph = null; }
        if (s[cfg.nameTextKey]) { s[cfg.nameTextKey].destroy(); s[cfg.nameTextKey] = null; }

        const bossGold = rollBossGold(s.zone || 'forest');
        const bossGoldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0) / 100);
        const finalGold = Math.floor(bossGold * bossGoldBonus);

        const bossCrystals = rollBossCrystals(s.zone || 'forest', s.difficulty);

        const lootItems = [];
        if (Math.random() < BOSS_DROP_CHANCE) { const item = rollEquip(); if (item) lootItems.push({ kind: 'equip', item, x: cfg.textX, y: cfg.textY + 100 + lootItems.length * 24, rarity: item.rarity }); }
        if (Math.random() < cfg.secondDropChance) { const item2 = rollEquip(); if (item2) lootItems.push({ kind: 'equip', item: item2, x: cfg.textX, y: cfg.textY + 100 + lootItems.length * 24, rarity: item2.rarity }); }
        if (Math.random() < BOSS_DROP_CHANCE) { const accItem = rollAccountEquip(); if (accItem) lootItems.push({ kind: 'accountEquip', item: { ...accItem, name: accItem.name + ' [ACCOUNT]' }, x: cfg.textX, y: cfg.textY + 100 + lootItems.length * 24, rarity: accItem.rarity }); }

        // Prestige boss drops
        const prestige = s.prestigeLevel || 0;
        if (prestige >= 1) {
            const prestigeBossItems = [
                { name: 'Prestige Crown', rarity: 'legendary', stats: { allStats: 3 } },
                { name: 'Eternity Fragment', rarity: 'legendary', stats: { dmgPercent: 8, hpPercent: 8 } }
            ];
            const dropChance = 0.2 + prestige * 0.1;
            if (Math.random() < dropChance) {
                const pItem = prestigeBossItems[Math.floor(Math.random() * prestigeBossItems.length)];
                lootItems.push({ kind: 'material', item: pItem, x: cfg.textX, y: cfg.textY + 100 + lootItems.length * 24, rarity: pItem.rarity });
            }
        }

        const zoneFlags = {};
        if (cfg.extraLoot) {
            const extra = cfg.extraLoot();
            if (extra) {
                if (extra.items) {
                    extra.items.forEach(it => {
                        const kind = it._kind || 'accountEquip';
                        lootItems.push({ kind, item: it, x: cfg.textX, y: cfg.textY + 100 + lootItems.length * 24, rarity: it.rarity });
                    });
                }
                if (extra.zoneFlags) Object.assign(zoneFlags, extra.zoneFlags);
            }
        }
        if (cfg.onPostKill) cfg.onPostKill();

        const lootItemTexts = lootItems.map((li, i) => ({
            name: li.item.name, rarity: li.rarity,
            x: cfg.textX, y: cfg.textY + 100 + i * 24
        }));

        if (s.multiplayer && s.mpSync && b.mpId) {
            s.mpSync.notifyBossKilled(b.mpId);
        }

        return {
            source: 'boss',
            exp, killsDelta: 1,
            gold: finalGold, goldX: cfg.textX, goldY: cfg.textY + 20,
            crystals: bossCrystals, crystalsX: cfg.textX, crystalsY: cfg.textY + 40,
            items: lootItems,
            defeatedText: cfg.defeatedText, defeatedColor: cfg.defeatedColor,
            textX: cfg.textX, textY: cfg.textY,
            lootItemTexts,
            zoneFlags
        };
    }

    static celebrateBossKill(scene, opts = {}) {
        const s = scene;
        const duration = opts.duration || 1500;
        const slowScale = opts.slowScale || 0.3;

        s.physics.world.timeScale = slowScale;
        s.time.delayedCall(duration, () => {
            s.physics.world.timeScale = 1;
        });
    }

    breakChest(ch) {
        const s = this.scene;
        if (ch.broken) return { items: [], gold: 0 };

        // Cooperative chest: need 2 players nearby
        if (ch.cooperative && s.multiplayer && s.mpManager) {
            const rpm = s.mpManager.remotePlayers;
            let nearbyCount = 1;
            for (const id in rpm) {
                const rp = rpm[id];
                if (!rp || !rp.sprite || !rp.sprite.active) continue;
                const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, rp.sprite.x, rp.sprite.y);
                if (dist < 100) nearbyCount++;
            }
            if (nearbyCount < 2) {
                s.floatingText(ch.x, ch.y - 20, 'Need 2 players!', '#e74c3c');
                return { items: [], gold: 0 };
            }
            s.floatingText(ch.x, ch.y - 20, 'COOPERATIVE CHEST!', '#f1c40f');
        }

        ch.broken = true; ch.body.enable = false;
        if (ch.isForestChest) { ch.setAlpha(0.4); ch.setTint(0x886633); }
        else { ch.setTexture(ch.isCaveChest ? CAVE_CHEST_OPEN_KEY : 'mine_chest_broken'); }
        ch.hpBg.destroy(); ch.hpBg = null; ch.hpFill.destroy(); ch.hpFill = null;
        if (ch.hintText) ch.hintText.setText('');
        if (ch.glow) { ch.glow.destroy(); ch.glow = null; }
        if (ch.arrow) { ch.arrow.destroy(); ch.arrow = null; }
        playBreak(); onCollect(ch.isForestChest ? 'treasure_chest' : 'mine_chest');
        s._updateQuestIcons();

        const chestGold = rollChestGold(s.zone || 'mine');
        const goldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0) / 100);
        const finalGold = Math.floor(chestGold * goldBonus);

        const items = [];
        if (ch.loot.length > 0) {
            ch.loot.forEach((item, i) => {
                items.push({ kind: 'equip', item, x: ch.x + (i * 20 - 10), y: ch.y - 35, rarity: item.rarity });
            });
        } else {
            for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
                const item = rollZoneMaterial(s.zone);
                if (item) items.push({ kind: 'material', item, x: ch.x + (i * 18 - 9), y: ch.y - 35, rarity: item.rarity });
            }
        }
        s.time.delayedCall(12000, () => {
            if (ch.active && !ch.isCaveChest) {
                ch.setTexture('mine_chest'); ch.broken = false; ch.body.enable = true;
                ch.stats.hp = ch.stats.maxHp;
                ch.hpBg = s.add.rectangle(ch.x, ch.y - 18, 28, 3, 0x333333).setOrigin(0.5).setDepth(11);
                ch.hpFill = s.add.rectangle(ch.x, ch.y - 18, 28, 3, 0xf39c12).setOrigin(0.5).setDepth(11);
                ch.loot = [];
                for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
                    if (Math.random() < MINE_CHEST_DROP_CHANCE) ch.loot.push(rollZoneEquip('mine'));
                }
            }
        });
        return { source: 'chest', gold: finalGold, goldX: ch.x, goldY: ch.y - 35, items };
    }

    breakStump(stump) {
        const s = this.scene;
        const items = [];
        for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
            const item = rollMaterial(s.zone);
            if (item) items.push({ kind: 'material', item, x: stump.x + (i * 20 - 10), y: stump.y - 15, rarity: item.rarity });
        }
        stump.hpBg.destroy(); stump.hpBg = null; stump.hpFill.destroy(); stump.hpFill = null; stump.setTexture('stump_broken');
        s.time.delayedCall(8000, () => { if (stump.active) stump.setTexture('stump'); stump.stats.hp = stump.stats.maxHp; });
        return { source: 'stump', items, stumpsBrokenDelta: 1 };
    }

    breakVillageChest(ch) {
        const s = this.scene;
        if (!ch || ch.broken) return { items: [], gold: 0 };
        ch.broken = true; ch.setTexture(VILLAGE_CHEST_OPEN_KEY);
        ch.hpBg.destroy(); ch.hpBg = null; ch.hpFill.destroy(); ch.hpFill = null; playBreak();
        const vGold = rollChestGold(s.zone || 'village');
        const goldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0) / 100);
        const finalGold = Math.floor(vGold * goldBonus);

        const items = [];
        ch.loot.forEach((item, i) => {
            const kind = item.type === 'accountEquip' ? 'accountEquip' : 'equip';
            items.push({ kind, item, x: ch.x, y: ch.y - 20 - i * 16, rarity: item.rarity });
        });
        s.time.delayedCall(2500, () => { if (ch.active) ch.destroy(); });
        return { source: 'village_chest', gold: finalGold, goldX: ch.x, goldY: ch.y - 20, items };
    }
}
