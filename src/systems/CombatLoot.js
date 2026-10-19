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

export class CombatLoot {
    constructor(scene) {
        this.scene = scene;
    }

    handleEnemyDeath(enemy) {
        // Guard against multiple calls in same frame
        if (enemy._deathHandled) return;
        enemy._deathHandled = true;

        const s = this.scene;

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

    killEnemy(enemy) {
        const s = this.scene;
        const exp = enemy.stats.exp;
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
        const finalGold = Math.floor(goldAmount * goldBonus);

        const items = [];
        if (Math.random() < EQUIP_DROP_CHANCE + lootBonus * 0.5) {
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
            gold: finalGold, goldX: enemy.x, goldY: enemy.y - 45,
            items
        };
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
        const exp = b.stats.exp;
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
