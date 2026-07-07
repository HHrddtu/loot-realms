import Phaser from 'phaser';
import { DIFF_MULT, ENEMY_TYPES, RARITY_COLORS, EQUIP_DROP_CHANCE, ACCOUNT_EQUIP_DROP_CHANCE, BOSS_DROP_CHANCE,
         MINE_ENEMY_TYPES, MINE_CHEST_DROP_CHANCE, SECRET_KEY_ITEM, VILLAGE_CHEST_OPEN_KEY,
         CAVE_CHEST_OPEN_KEY, CAVE_WIDTH, VILLAGE_BOSS_TYPE, CAVE_HEIGHT } from '../config/index.js';
import { rollZoneEquip, rollZoneMaterial, rollEquip, rollMaterial, rollAccountEquip, rollCaveRelic } from '../utils.js';
import { rollGold, rollBossGold, rollChestGold } from '../config/gold.js';
import { rollBossCrystals, getPetStats } from '../config/pets.js';
import { playBossDeath, playEnemyDeath, playLoot, playBreak } from '../sound.js';
import { recordKill } from '../bestiary.js';
import { recordSoulCollect } from '../soulBook.js';
import { onKill, onCollect } from '../quests.js';

export class CombatLoot {
    constructor(scene) {
        this.scene = scene;
    }

    handleEnemyDeath(enemy) {
        const s = this.scene;
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
        else if (enemy === s.snowyIceSpirit) { s.zones.village.boss.iceSpiritDied(); }
        else if (enemy === s.castleBoss) { /* handled by CastleZone._updateBoss */ }
        else if (enemy.stats && enemy.stats.isBossClone) { s.zones.village.boss.killBossClone(enemy); }
        else { this.killEnemy(enemy); }
    }

    killEnemy(enemy) {
        const s = this.scene;
        const exp = enemy.stats.exp;
        const expBonus = 1 + (s.accountEffects ? (s.accountEffects.expPercent || 0) / 100 : 0);
        s.playerExp += exp; s.accountExp += Math.floor(exp * expBonus);
        s.kills++; playEnemyDeath();
        if (s.particles) s.particles.spawnEnemyDeath(enemy.x, enemy.y);
        if (enemy.stats.key) { recordKill(enemy.stats.key); recordSoulCollect(enemy.stats.key); onKill(enemy.stats.key); s._updateQuestIcons(); }

        for (let i = 0; i < 3; i++) {
            const c = s.add.sprite(enemy.x + Phaser.Math.Between(-12, 12), enemy.y + Phaser.Math.Between(-8, 8), 'coin');
            s.tweens.add({ targets: c, y: c.y - 25, alpha: 0, duration: 500 + i * 100, delay: i * 80, onComplete: () => c.destroy() });
        }

        const goldAmount = rollGold(s.zone || 'forest');
        const petStats = getPetStats(s.equippedPet, (s.petLevels || {})[s.equippedPet] || 1);
        const lootBonus = (petStats.lootPercent || 0) / 100;
        const goldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0)) / 100 + lootBonus;
        const finalGold = Math.floor(goldAmount * goldBonus);
        s.gold = (s.gold || 0) + finalGold;
        s.floatingText(enemy.x, enemy.y - 30, '+' + exp + ' EXP', '#f1c40f');
        s.floatingText(enemy.x, enemy.y - 45, '+' + finalGold + ' gold', '#f1c40f');

        if (Math.random() < EQUIP_DROP_CHANCE + lootBonus * 0.5) {
            const item = rollEquip();
            if (s.addEquip(item)) {
                s.floatingText(enemy.x, enemy.y - 45, '+' + item.name, '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0'));
                if (s.particles) s.particles.spawnLootPickup(enemy.x, enemy.y, item.rarity);
                playLoot();
            }
        }
        if (Math.random() < ACCOUNT_EQUIP_DROP_CHANCE) {
            const accItem = rollAccountEquip();
            if (s.addAccountEquip(accItem)) {
                s.floatingText(enemy.x, enemy.y - 60, '+' + accItem.name + ' [ACCOUNT]', '#' + RARITY_COLORS[accItem.rarity].toString(16).padStart(6, '0'));
                if (s.particles) s.particles.spawnLootPickup(enemy.x, enemy.y, accItem.rarity);
                playLoot();
            }
        }

        s.checkLevelUp(); s._checkAccountLevelUp(); s.updateUI();
        if (enemy.hpBg) enemy.hpBg.destroy();
        if (enemy.hpFill) enemy.hpFill.destroy();
        enemy.destroy();

        s.time.delayedCall(3000, () => {
            if (s.zone === 'forest') { const t = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)]; s.combat.makeEnemy(t, 80 + Math.random() * 640, 350 + Math.random() * 400); }
            else if (s.zone === 'mine') { const t = MINE_ENEMY_TYPES[Math.floor(Math.random() * MINE_ENEMY_TYPES.length)]; s.zones.mine.makeMineEnemy(t, 80 + Math.random() * 640, 200 + Math.random() * 500); }
        });
    }

    killBoss() {
        const s = this.scene;
        this.killGenericBoss({
            bossRef: 'boss',
            nameTextKey: 'bossNameText', recordKey: 'ancient_treant',
            defeatedText: 'BOSS DEFEATED!', defeatedColor: '#f1c40f', secondDropChance: 0.5,
            textX: 400, textY: 200,
            onPostKill: () => { s.zones.mine.isUnlocked = true; s.exitPortal.setTexture('mine_ladder'); s.exitPortal.setScale(1); s.exitHint.setText('SPACE to enter the Mine'); }
        });
        s.zones.arena.bossDefeated = true;
        s.zones.arena.bossAlive = false;
    }

    killMineBoss() {
        const s = this.scene;
        this.killGenericBoss({
            bossRef: 'mineBoss',
            nameTextKey: 'mineBossNameText', recordKey: 'skeleton_lord',
            defeatedText: 'SKELETON LORD DEFEATED!', defeatedColor: '#bf77f6', secondDropChance: 0.6,
            textX: 400, textY: 200,
            extraLoot: () => {
                if (!s.zones.mine.hasSecretKey) {
                    s.zones.mine.hasSecretKey = true; const keyItem = { ...SECRET_KEY_ITEM };
                    playLoot(); s.floatingText(400, 280, SECRET_KEY_ITEM.name + ' obtained!', '#f1c40f');
                    return [keyItem];
                } return [];
            }
        });
        s.zones.mine.bossDefeated = true;
        s.zones.mine.bossAlive = false;
    }

    killCaveBoss() {
        const s = this.scene;
        const textX = s.caveOffsetX + CAVE_WIDTH / 2;
        this.killGenericBoss({
            bossRef: 'caveBoss',
            nameTextKey: 'caveBossNameText', recordKey: 'giant_bat',
            defeatedText: 'GIANT BAT DEFEATED!', defeatedColor: '#bf77f6', secondDropChance: 0.6,
            textX, textY: 200,
            extraLoot: () => {
                const items = []; const relic = rollCaveRelic(s.classKey);
                if (relic && s.addAccountEquip(relic)) { items.push({ ...relic, name: relic.name + ' [RELIC]' }); playLoot(); s.floatingText(textX, 280, 'Relic obtained!', '#9b59b6'); }
                return items;
            },
            onPostKill: () => {
                s.caveStairs = s.add.sprite(textX, CAVE_HEIGHT - 80, 'cave_stairs').setDepth(1);
                s.caveStairsHint = s.add.text(textX, CAVE_HEIGHT - 55, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(12);
            }
        });
        s.zones.cave.bossDefeated = true;
        s.zones.cave.bossAlive = false;
    }

    killGenericBoss(cfg) {
        const s = this.scene;
        const b = s[cfg.bossRef];
        const exp = b.stats.exp;
        const expBonus = 1 + (s.accountEffects ? (s.accountEffects.expPercent || 0) / 100 : 0);
        s.playerExp += exp; s.accountExp += Math.floor(exp * expBonus);
        s.kills++;
        playBossDeath(); recordKill(cfg.recordKey); recordSoulCollect(cfg.recordKey); onKill(cfg.recordKey);
        s._updateQuestIcons();
        if (s.particles) s.particles.spawnBossDeath(b.x, b.y);
        b.body.setVelocity(0); b.setTint(0xff0000);
        s.tweens.add({ targets: b, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 800, onComplete: () => { if (b.hpBg) b.hpBg.destroy(); if (b.hpFill) b.hpFill.destroy(); b.destroy(); s[cfg.bossRef] = null; } });
        if (b.aoeRing) { b.aoeRing.destroy(); b.aoeRing = null; }
        if (b.aoeRing2) { b.aoeRing2.destroy(); b.aoeRing2 = null; }
        if (s[cfg.nameTextKey]) { s[cfg.nameTextKey].destroy(); s[cfg.nameTextKey] = null; }

        const bossGold = rollBossGold(s.zone || 'forest');
        const bossGoldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0)) / 100;
        s.gold = (s.gold || 0) + Math.floor(bossGold * bossGoldBonus);
        s.floatingText(cfg.textX, cfg.textY, '+' + exp + ' EXP', '#f1c40f');
        s.floatingText(cfg.textX, cfg.textY + 20, '+' + Math.floor(bossGold * bossGoldBonus) + ' gold', '#f1c40f');

        const bossCrystals = rollBossCrystals(s.zone || 'forest', s.difficulty);
        if (bossCrystals > 0) { const granted = s.awardCrystals(bossCrystals, cfg.textX, cfg.textY + 40); if (granted > 0) s.floatingText(cfg.textX, cfg.textY + 40, '+' + granted + ' \u{1F48E}', '#3498db'); }

        s.defeatedText = s.add.text(cfg.textX, cfg.textY + 50, cfg.defeatedText, { fontSize: '28px', fill: cfg.defeatedColor, fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setScrollFactor(0);
        s.tweens.add({ targets: s.defeatedText, alpha: 0, duration: 5000, onComplete: () => { if (s.defeatedText) s.defeatedText.destroy(); s.defeatedText = null; } });

        s.defeatedLoot = []; const lootItems = [];
        if (Math.random() < BOSS_DROP_CHANCE) { const item = rollEquip(); if (s.addEquip(item)) { lootItems.push(item); playLoot(); } }
        if (Math.random() < cfg.secondDropChance) { const item2 = rollEquip(); if (s.addEquip(item2)) { lootItems.push(item2); playLoot(); } }
        if (Math.random() < BOSS_DROP_CHANCE) { const accItem = rollAccountEquip(); if (s.addAccountEquip(accItem)) { lootItems.push({ ...accItem, name: accItem.name + ' [ACCOUNT]' }); playLoot(); } }
        if (cfg.extraLoot) { cfg.extraLoot().forEach(item => lootItems.push(item)); }
        if (cfg.onPostKill) cfg.onPostKill();

        lootItems.forEach((item, i) => {
            const lt = s.add.text(cfg.textX, cfg.textY + 100 + i * 24, '+' + item.name, { fontSize: '16px', fill: '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0'), fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(lt);
            s.tweens.add({ targets: lt, alpha: 0, duration: 5000, onComplete: () => { if (lt.active) lt.destroy(); } });
        });
        if (lootItems.length === 0) {
            const noLoot = s.add.text(cfg.textX, cfg.textY + 100, 'No drops...', { fontSize: '14px', fill: '#95a5a6', fontFamily: 'Arial', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(noLoot);
            s.tweens.add({ targets: noLoot, alpha: 0, duration: 5000, onComplete: () => { if (noLoot.active) noLoot.destroy(); } });
        }
        s.checkLevelUp(); s._checkAccountLevelUp(); s.updateUI();
    }

    breakChest(ch) {
        const s = this.scene;
        if (ch.broken) return; ch.broken = true; ch.body.enable = false;
        if (ch.isForestChest) { ch.setAlpha(0.4); ch.setTint(0x886633); }
        else { ch.setTexture(ch.isCaveChest ? CAVE_CHEST_OPEN_KEY : 'mine_chest_broken'); }
        ch.hpBg.destroy(); ch.hpFill.destroy(); if (ch.hintText) ch.hintText.setText('');
        playBreak(); onCollect(ch.isForestChest ? 'treasure_chest' : 'mine_chest');
        s._updateQuestIcons();

        const chestGold = rollChestGold(s.zone || 'mine');
        const goldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0)) / 100;
        const finalGold = Math.floor(chestGold * goldBonus);
        s.gold = (s.gold || 0) + finalGold; s.floatingText(ch.x, ch.y - 35, '+' + finalGold + ' gold', '#f1c40f');

        if (ch.loot.length > 0) {
            ch.loot.forEach((item, i) => {
                if (s.addEquip(item)) {
                    s.floatingText(ch.x + (i * 20 - 10), ch.y - 35, '+' + item.name, '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0'));
                } else { s.floatingText(ch.x, ch.y - 35, 'Bag full!', '#e74c3c'); }
            });
        } else {
            for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
                const item = rollZoneMaterial(s.zone);
                if (s.addMaterial(item)) { s.floatingText(ch.x + (i * 18 - 9), ch.y - 35, '+' + item.name, '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0')); }
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
    }

    breakStump(stump) {
        const s = this.scene;
        s.stumpsBroken++; playBreak();
        for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
            const item = rollMaterial(s.zone);
            if (s.addMaterial(item)) { s.floatingText(stump.x + (i * 20 - 10), stump.y - 15, '+' + item.name, '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0')); }
            else { s.floatingText(stump.x, stump.y - 15, 'Bag full!', '#e74c3c'); }
        }
        stump.hpBg.destroy(); stump.hpFill.destroy(); stump.setTexture('stump_broken');
        s.time.delayedCall(8000, () => { if (stump.active) stump.setTexture('stump'); stump.stats.hp = stump.stats.maxHp; });
        s.updateUI();
    }

    breakVillageChest(ch) {
        const s = this.scene;
        if (!ch || ch.broken) return;
        ch.broken = true; ch.setTexture(VILLAGE_CHEST_OPEN_KEY);
        ch.hpBg.destroy(); ch.hpFill.destroy(); playBreak();
        const vGold = rollChestGold(s.zone || 'village');
        const goldBonus = 1 + ((s.accountEffects ? s.accountEffects.goldPercent || 0 : 0)) / 100;
        s.gold = (s.gold || 0) + Math.floor(vGold * goldBonus);
        s.floatingText(ch.x, ch.y - 20, '+' + Math.floor(vGold * goldBonus) + ' gold', '#f1c40f');
        ch.loot.forEach((item, i) => {
            const lt = s.add.text(ch.x, ch.y - 20 - i * 16, '+' + item.name, { fontSize: '11px', fill: '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0'), fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setDepth(13);
            s.tweens.add({ targets: lt, y: lt.y - 20, alpha: 0, duration: 2000, onComplete: () => lt.destroy() });
            if (item.type === 'equip') s.addEquip(item);
            else if (item.type === 'accountEquip') s.addAccountEquip(item);
            playLoot();
        });
        s.time.delayedCall(2500, () => { if (ch.active) ch.destroy(); });
    }
}
