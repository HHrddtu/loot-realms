import { RARITY_COLORS } from '../config/index.js';
import { sendInventoryUpdate, getMyId } from '../network.js';

export class LootDistributor {
    constructor(scene) {
        this.scene = scene;
    }

    applyLoot(lootData) {
        if (!lootData) return;
        const s = this.scene;
        if (lootData.exp) {
            s.playerExp = (s.playerExp || 0) + lootData.exp;
            const expBonus = 1 + (s.accountEffects ? (s.accountEffects.expPercent || 0) / 100 : 0);
            s.accountExp = (s.accountExp || 0) + Math.floor(lootData.exp * expBonus);
        }
        if (lootData.killsDelta) {
            s.kills = (s.kills || 0) + lootData.killsDelta;
        }
        if (lootData.stumpsBrokenDelta) {
            s.stumpsBroken = (s.stumpsBroken || 0) + lootData.stumpsBrokenDelta;
        }
        if (lootData.gold) {
            s.gold = (s.gold || 0) + lootData.gold;
            if (s.floatingText) s.floatingText(lootData.goldX || 0, lootData.goldY || 0, '+' + lootData.gold + ' gold', '#f1c40f');
        }
        if (lootData.crystals && s.awardCrystals) {
            const granted = s.awardCrystals(lootData.crystals, lootData.crystalsX || 0, lootData.crystalsY || 0);
            if (granted > 0 && s.floatingText) s.floatingText(lootData.crystalsX || 0, lootData.crystalsY || 0, '+' + granted + ' \u{1F48E}', '#3498db');
        }
        if (lootData.items && lootData.items.length > 0) {
            lootData.items.forEach(({ kind, item, x, y, rarity }) => {
                let added = false;
                if (kind === 'equip' && s.addEquip) added = s.addEquip(item);
                else if (kind === 'material' && s.addMaterial) added = s.addMaterial(item);
                else if (kind === 'accountEquip' && s.addAccountEquip) added = s.addAccountEquip(item);
                if (added) {
                    if (s.floatingText) {
                        const color = rarity !== undefined && RARITY_COLORS && RARITY_COLORS[rarity] !== undefined
                            ? '#' + RARITY_COLORS[rarity].toString(16).padStart(6, '0')
                            : '#ffffff';
                        s.floatingText(x, y, '+' + item.name, color);
                    }
                    if (s.particles && s.particles.spawnLootPickup) s.particles.spawnLootPickup(x, y, rarity);
                    if (s.playLoot) s.playLoot();
                } else if (s.floatingText) {
                    s.floatingText(x, y, 'Bag full!', '#e74c3c');
                }
            });
        }
        if (lootData.defeatedText) {
            const lt = s.add.text(lootData.textX, lootData.textY + 50, lootData.defeatedText, { fontSize: '28px', fill: lootData.defeatedColor || '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedText = lt;
            s.tweens.add({ targets: lt, alpha: 0, duration: 5000, onComplete: () => { if (lt.active) lt.destroy(); if (s.defeatedText === lt) s.defeatedText = null; } });
        }
        if (lootData.lootItemTexts && lootData.lootItemTexts.length > 0) {
            if (!s.defeatedLoot) s.defeatedLoot = [];
            lootData.lootItemTexts.forEach(({ name, rarity, x, y }) => {
                const color = rarity !== undefined && RARITY_COLORS && RARITY_COLORS[rarity] !== undefined
                    ? '#' + RARITY_COLORS[rarity].toString(16).padStart(6, '0')
                    : '#ffffff';
                const lt = s.add.text(x, y, '+' + name, { fontSize: '16px', fill: color, fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setScrollFactor(0);
                s.defeatedLoot.push(lt);
                s.tweens.add({ targets: lt, alpha: 0, duration: 5000, onComplete: () => { if (lt.active) lt.destroy(); } });
            });
        } else if (lootData.defeatedText) {
            if (!s.defeatedLoot) s.defeatedLoot = [];
            const noLoot = s.add.text(lootData.textX, lootData.textY + 100, 'No drops...', { fontSize: '14px', fill: '#95a5a6', fontFamily: 'Arial', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5).setScrollFactor(0);
            s.defeatedLoot.push(noLoot);
            s.tweens.add({ targets: noLoot, alpha: 0, duration: 5000, onComplete: () => { if (noLoot.active) noLoot.destroy(); } });
        }
        if (lootData.zoneFlags) {
            Object.keys(lootData.zoneFlags).forEach(path => {
                const parts = path.split('.');
                if (parts.length === 2 && s.zones && s.zones[parts[0]]) {
                    s.zones[parts[0]][parts[1]] = lootData.zoneFlags[path];
                }
            });
        }
        if (s.checkLevelUp) s.checkLevelUp();
        if (s._checkAccountLevelUp) s._checkAccountLevelUp();
        if (s.updateUI) s.updateUI();
    }

    distributeLoot(lootData, targetPeerId) {
        const s = this.scene;
        const target = targetPeerId || getMyId();
        if (!s.multiplayer || target === getMyId()) {
            this.applyLoot(lootData);
            return;
        }
        sendInventoryUpdate(target, this._lootDataToPayload(lootData));
    }

    _lootDataToPayload(lootData) {
        if (!lootData) return {};
        return {
            source: lootData.source,
            items: lootData.items || [],
            gold: lootData.gold || 0,
            goldX: lootData.goldX || 0,
            goldY: lootData.goldY || 0,
            exp: lootData.exp || 0,
            crystals: lootData.crystals || 0,
            crystalsX: lootData.crystalsX || 0,
            crystalsY: lootData.crystalsY || 0,
            killsDelta: lootData.killsDelta || 0,
            stumpsBrokenDelta: lootData.stumpsBrokenDelta || 0,
            defeatedText: lootData.defeatedText || null,
            defeatedColor: lootData.defeatedColor || null,
            textX: lootData.textX || 0,
            textY: lootData.textY || 0,
            lootItemTexts: lootData.lootItemTexts || [],
            zoneFlags: lootData.zoneFlags || null
        };
    }
}
