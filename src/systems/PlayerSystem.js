import {
    DIFF_MULT, MATERIAL_SLOTS, EQUIP_BAG_SLOTS, ACCOUNT_EQUIP_BAG_SLOTS, EMPTY_ACCOUNT_EQUIPMENT,
    SHOP_EQUIP_PRICES, SELL_PRICE_RATIO
} from '../config/index.js';
import { getClassData, getClassStats } from '../classes.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { getAllBestiaryBonuses } from '../bestiary.js';
import { getMaterialBonuses } from '../materialBook.js';
import { getSoulBonuses } from '../soulBook.js';
import { getSetBonuses } from '../config/sets.js';
import { recordMaterialCollect } from '../materialBook.js';
import { onCollect } from '../quests.js';
import { playLevelUp } from '../sound.js';
import { getAccountLevelUpReq, loadAccount } from '../save.js';
import { getPetStats } from '../config/pets.js';

export class PlayerSystem {
    constructor(scene) {
        this.scene = scene;
        this._statsRecalcedThisFrame = false;
    }

    _createPlayer() {
        const cls = getClassData(this.scene.classKey);
        const walkKey = cls.walkTexKey || 'player_sage_walk';
        const animKey = cls.walkAnim || 'sage_walk_right';
        this.scene.player = this.scene.add.sprite(400, 400, walkKey).setDepth(10);
        this.scene.physics.add.existing(this.scene.player, false);
        this.scene.player.body.setSize(18, 38);
        this.scene.player.body.setOffset(7, 8);
        this.scene.player.body.setCollideWorldBounds(true);
        this.scene.player.play(animKey);
    }

    recalcStats() {
        // Guard removed: recalcStats must run every time it's called
        // (e.g., after equipping items, level up, etc.)
        const hpRatio = this.scene.playerMaxHP > 0 ? this.scene.playerHP / this.scene.playerMaxHP : 1;
        const cls = this.scene.classData || getClassData(this.scene.classKey);
        const growth = cls.growth;
        let bonusHP = 0, bonusDmg = 0, bonusSpeed = 0;

        this.scene.materials.forEach(m => {
            if (m.stats) {
                bonusHP += m.stats.hp || 0;
                bonusDmg += m.stats.dmg || 0;
                bonusSpeed += m.stats.speed || 0;
            }
        });

        const diffMult = DIFF_MULT[this.scene.difficulty] || DIFF_MULT.Normal;
        [this.scene.equipment.weapon, this.scene.equipment.armor, this.scene.equipment.accessory].forEach(item => {
            if (item && item.stats) {
                bonusHP += (item.stats.hp || 0) * diffMult.hp;
                bonusDmg += (item.stats.dmg || 0) * diffMult.dmg;
                bonusSpeed += (item.stats.speed || 0) * diffMult.hp;
            }
        });

        const lvl = this.scene.playerLevel || 1;
        const te = this.scene.talentEffects || getTalentEffects(this.scene.unlockedTalents || []);
        const ae = this.scene.accountEffects || {};

        let accHpPercent = (ae.hpPercent || 0);
        let accDmgPercent = (ae.damagePercent || 0);
        let accSpdPercent = (ae.speedPercent || 0);
        let accSpellPercent = (ae.spellPercent || 0);
        let accCritPercent = (ae.critPercent || 0);
        let accDodgePercent = (ae.dodgePercent || 0);
        let accCorruptionMax = 0;

        const accScale = 1; // Account equipment bonuses are flat, not scaled by level
        const accDiffMult = diffMult.hp;

        Object.values(this.scene.accountEquipment).forEach(item => {
            if (item && item.stats) {
                accHpPercent += (item.stats.hpPercent || 0) * accScale * accDiffMult;
                accDmgPercent += (item.stats.damagePercent || 0) * accScale * accDiffMult;
                accSpdPercent += (item.stats.speedPercent || 0) * accScale * accDiffMult;
                accSpellPercent += (item.stats.spellPercent || 0) * accScale * accDiffMult;
                accCritPercent += (item.stats.critPercent || 0) * accScale * accDiffMult;
                accDodgePercent += (item.stats.dodgePercent || 0) * accScale * accDiffMult;
                accCorruptionMax += (item.stats.corruptionMax || 0) * accScale * accDiffMult;
            }
        });

        const petStats = getPetStats(this.scene.equippedPet, (this.scene.petLevels || {})[this.scene.equippedPet] || 1);
        if (petStats.hpPercent) accHpPercent += petStats.hpPercent;
        if (petStats.damagePercent) accDmgPercent += petStats.damagePercent;
        if (petStats.speedPercent) accSpdPercent += petStats.speedPercent;
        if (petStats.spellPercent) accSpellPercent += petStats.spellPercent;
        if (petStats.critPercent) accCritPercent += petStats.critPercent;

        // Apply equipment set bonuses
        const setBonuses = getSetBonuses(this.scene.equipment, this.scene.accountEquipment);
        if (setBonuses.hpPercent) accHpPercent += setBonuses.hpPercent;
        if (setBonuses.damagePercent) accDmgPercent += setBonuses.damagePercent;
        if (setBonuses.speedPercent) accSpdPercent += setBonuses.speedPercent;
        if (setBonuses.spellPercent) accSpellPercent += setBonuses.spellPercent;
        if (setBonuses.critPercent) accCritPercent += setBonuses.critPercent;
        if (setBonuses.dodgePercent) accDodgePercent += setBonuses.dodgePercent;
        if (setBonuses.damageReduction) accDmgPercent += setBonuses.damageReduction;
        if (setBonuses.regenFlat) { /* handled below */ }
        if (setBonuses.regenPercent) { /* handled below */ }
        if (setBonuses.corruptionMax) accCorruptionMax += setBonuses.corruptionMax;

        const upgradeLevels = this.scene.upgradeLevels || {};
        const upgHp = (upgradeLevels.upg_hp || 0) * 5;
        const upgDmg = (upgradeLevels.upg_dmg || 0) * 5;
        const upgSpd = (upgradeLevels.upg_spd || 0) * 5;
        const upgCrit = (upgradeLevels.upg_crit || 0) * 3;
        const upgRegen = (upgradeLevels.upg_regen || 0) * 2;
        accHpPercent += upgHp;
        accDmgPercent += upgDmg;
        accSpdPercent += upgSpd;
        accCritPercent += upgCrit;

        const activeBoosts = this.scene.activeBoosts || {};
        const boostDmgPct = activeBoosts.damage_percent || 0;
        const boostDefPct = activeBoosts.defense_percent || 0;
        const boostRegenFlat = activeBoosts.regen_flat || 0;

        const divineDmgBuff = (this.scene._divineBlessingDmgBuff || 0) / 100;
        const divineDefBuff = (this.scene._divineBlessingDefBuff || 0) / 100;

        const hpMult = 1 + (te.hpPercent || 0) / 100 + accHpPercent / 100;
        const dmgMult = 1 + (te.damagePercent || 0) / 100 + accDmgPercent / 100 + boostDmgPct / 100 + divineDmgBuff;
        const moveSpeedBonus = (ae.moveSpeedPercent || 0) + (te.moveSpeedPercent || 0) + ((this.scene._consumableBonusSpd || 0) * 100);
        const spdMult = 1 + accSpdPercent / 100 + moveSpeedBonus / 100;

        // Account level flat bonus: +2 HP, +1 DMG, +1 SPD per account level
        const accLvl = this.scene.accountLevel || 1;
        const accFlatHp = accLvl * 2;
        const accFlatDmg = accLvl * 1;
        const accFlatSpd = accLvl * 1;

        this.scene.playerMaxHP = Math.floor((cls.stats.hp + (lvl - 1) * growth.hpPerLevel + bonusHP + accFlatHp) * hpMult);
        this.scene.playerDamage = Math.floor((cls.stats.damage + (lvl - 1) * growth.dmgPerLevel + bonusDmg + accFlatDmg) * dmgMult);
        this.scene.playerSpeed = Math.floor((cls.stats.speed + (lvl - 1) * growth.speedPerLevel + bonusSpeed + accFlatSpd) * spdMult);

        this.scene.corruptionMax = cls.stats.corruptionMax + (te.corruptionMax || 0) + accCorruptionMax;

        this.scene.bestiaryBonuses = getAllBestiaryBonuses(this.scene.difficulty);
        this.scene.materialBonuses = getMaterialBonuses(this.scene.difficulty);
        this.scene.soulBonuses = getSoulBonuses(this.scene.difficulty);

        this.scene.playerMaxHP += (this.scene.materialBonuses.hp || 0) + (this.scene.soulBonuses.hp || 0);
        this.scene.playerDamage += (this.scene.materialBonuses.dmg || 0) + (this.scene.soulBonuses.dmg || 0);
        this.scene.playerSpeed += (this.scene.materialBonuses.speed || 0);
        this.scene.corruptionDecay = (this.scene.classData.decay || 0.08) + (this.scene.soulBonuses.corDecay || 0);
        this.scene.playerHP = Math.min(this.scene.playerMaxHP, Math.max(1, Math.floor(hpRatio * this.scene.playerMaxHP)));

        this.scene.computedCritChance = (te.critChance || 0) + accCritPercent;
        this.scene.computedCritDamage = 1.5 + (te.critDamagePercent || 0) / 100;
        this.scene.computedDodgePercent = (te.dodgePercent || 0) + accDodgePercent;
        this.scene.computedLifeSteal = (te.lifeSteal || 0) + (ae.lifeSteal || 0);
        this.scene.computedDamageReduction = (te.damageReduction || 0) + (ae.damageReduction || 0) + (petStats.damageReduction || 0) + boostDefPct + divineDefBuff * 100 + ((this.scene._consumableBonusDef || 0) * 100);
        this.scene.computedDamageReflection = (te.damageReflection || 0) + (ae.damageReflection || 0);
        this.scene.computedCooldownReduction = (te.cooldownReduction || 0) + (ae.cooldownReduction || 0);
        this.scene.computedAreaDamage = (te.areaDamage || 0) + (ae.areaDamage || 0);
        this.scene.computedBossDamage = (te.bossDamagePercent || 0) + (ae.bossDamagePercent || 0);
        this.scene.computedSpellDamage = (te.spellDamage || 0) + accSpellPercent;
        this.scene.computedRegenFlat = (te.regenFlat || 0) + boostRegenFlat + upgRegen + (setBonuses.regenFlat || 0);

        this.scene.relicEffects = {};
        Object.values(this.scene.accountEquipment).forEach(item => {
            if (item && item.effect) {
                this.scene.relicEffects[item.effect] = true;
            }
        });
        this.scene.computedHealPower = (te.healPower || 0) + (ae.healPower || 0);
        this.scene.computedRegenPercent = (te.regenPercent || 0) + (ae.regenPercent || 0) + (petStats.regenPercent || 0) + (setBonuses.regenPercent || 0);
        this.scene.computedDotPower = te.dotPower || 0;
        this.scene.computedDotDuration = te.dotDuration || 0;
        this.scene.computedShieldPercent = te.shieldPercent || 0;
        this.scene.computedShieldReflect = te.shieldReflect || 0;
        this.scene.computedShieldDuration = te.shieldDuration || 0;
        this.scene.computedArmorReduction = te.armorReduction || 0;
        this.scene.computedSpellSpeed = te.spellSpeed || 0;

        this.scene.computedInventorySlots = (te.inventorySlots || 0) + (ae.inventorySlots || 0);
        this.scene.maxMaterials = MATERIAL_SLOTS + this.scene.computedInventorySlots;
        this.scene.maxEquipBag = EQUIP_BAG_SLOTS + Math.floor(this.scene.computedInventorySlots / 2);

        this.scene.computedAccCritPercent = accCritPercent;
        this.scene.computedAccDodgePercent = accDodgePercent;
        this.scene.computedAccSpellPercent = accSpellPercent;
    }

    resetStatsRecalcFlag() {
        this._statsRecalcedThisFrame = false;
    }

    _initInventory() {
        this.scene.materials = [];
        this.scene.maxMaterials = MATERIAL_SLOTS;
        this.scene.equipBag = [];
        this.scene.maxEquipBag = EQUIP_BAG_SLOTS;
        this.scene.equipment = { weapon: null, armor: null, accessory: null };
        this.scene.consumable = null;
        this.scene.accountEquipment = { ...EMPTY_ACCOUNT_EQUIPMENT };
        this.scene.accountEquipBag = [];
        this.scene.maxAccountEquipBag = ACCOUNT_EQUIP_BAG_SLOTS;
    }

    addMaterial(item) {
        if (this.scene.materials.length >= this.scene.maxMaterials) return false;
        const copy = { ...item };
        if (copy.locked === undefined) copy.locked = false;
        this.scene.materials.push(copy);
        if (copy.id) recordMaterialCollect(copy.id);
        if (copy.id) onCollect(copy.id);
        this.recalcStats();
        return true;
    }

    addEquip(item) {
        if (this.scene.equipBag.length >= this.scene.maxEquipBag) return false;
        const copy = { ...item };
        if (copy.locked === undefined) {
            copy.locked = (copy.rarity === 'legendary' || copy.rarity === 'epic' || copy.locked);
        }
        this.scene.equipBag.push(copy);
        return true;
    }

    addConsumable(item) {
        this.scene.consumable = item;
        return true;
    }

    useConsumable() {
        if (!this.scene.consumable) return false;
        const c = this.scene.consumable;
        if (c.effect === 'heal') {
            const healAmt = Math.floor(this.scene.playerMaxHP * c.value);
            this.scene.playerHP = Math.min(this.scene.playerMaxHP, this.scene.playerHP + healAmt);
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + healAmt + ' HP', '#2ecc71');
        } else if (c.effect === 'damage_boost') {
            this.scene._consumableBonusDmg = c.value;
            this.scene._consumableBonusDmgTimer = c.duration || 60000;
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + Math.floor(c.value * 100) + '% DMG', '#e74c3c');
        } else if (c.effect === 'speed_boost') {
            this.scene._consumableBonusSpd = c.value;
            this.scene._consumableBonusSpdTimer = c.duration || 60000;
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + Math.floor(c.value * 100) + '% SPD', '#3498db');
        } else if (c.effect === 'defense_boost') {
            this.scene._consumableBonusDef = c.value;
            this.scene._consumableBonusDefTimer = c.duration || 60000;
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + Math.floor(c.value * 100) + '% DEF', '#f39c12');
        } else if (c.effect === 'crit_boost') {
            this.scene._consumableBonusCrit = c.value;
            this.scene._consumableBonusCritTimer = c.duration || 60000;
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, '+' + c.value + '% Crit', '#9b59b6');
        } else if (c.effect === 'lifesteal') {
            this.scene._consumableBonusLifesteal = c.value;
            this.scene._consumableBonusLifestealTimer = c.duration || 45000;
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, Math.floor(c.value * 100) + '% Lifesteal', '#c0392b');
        }
        this.scene.consumable = null;
        this.scene.updateUI();
        return true;
    }

    equipFromBag(idx) {
        const item = this.scene.equipBag[idx];
        if (!item) return;
        const old = this.scene.equipment[item.slot];
        this.scene.equipment[item.slot] = item;
        this.scene.equipBag.splice(idx, 1);
        if (old) this.scene.equipBag.push(old);
    }

    unequipItem(slot) {
        if (!this.scene.equipment[slot]) return;
        if (this.scene.equipBag.length >= this.scene.maxEquipBag) return;
        this.scene.equipBag.push(this.scene.equipment[slot]);
        this.scene.equipment[slot] = null;
        this.recalcStats();
    }

    getMaterialStatsText() {
        let hp = 0, dmg = 0, spd = 0;
        this.scene.materials.forEach(m => {
            if (m.stats) {
                hp += m.stats.hp || 0;
                dmg += m.stats.dmg || 0;
                spd += m.stats.speed || 0;
            }
        });
        const parts = [];
        if (hp > 0) parts.push('+' + hp + ' HP');
        if (dmg > 0) parts.push('+' + dmg + ' DMG');
        if (spd > 0) parts.push('+' + spd + ' SPD');
        return parts.length > 0 ? parts.join('  ') : 'No bonuses';
    }

    addAccountEquip(item) {
        if (!item || item.type !== 'accountEquip') return false;
        const slot = item.slot;
        if (!this.scene.accountEquipment[slot]) {
            this.scene.accountEquipment[slot] = item;
        } else {
            const old = this.scene.accountEquipment[slot];
            this.scene.accountEquipment[slot] = item;
            this._returnToAccountEquipBag(old);
        }
        this.recalcStats();
        return true;
    }

    _returnToAccountEquipBag(item) {
        if (this.scene.accountEquipBag.length < this.scene.maxAccountEquipBag) {
            this.scene.accountEquipBag.push({ ...item });
        } else if (this.scene.player) {
            this.scene.floatingText(this.scene.player.x, this.scene.player.y - 30, 'Bag full! ' + item.name + ' lost', '#e74c3c');
        }
    }

    unequipAccountItem(slot) {
        if (!this.scene.accountEquipment[slot]) return;
        if (this.scene.accountEquipBag.length >= this.scene.maxAccountEquipBag) return;
        this.scene.accountEquipBag.push({ ...this.scene.accountEquipment[slot] });
        this.scene.accountEquipment[slot] = null;
        this.recalcStats();
    }

    deleteItem(type, idx) {
        let item = null;
        let expGain = 0;
        const rarityMult = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
        const lvl = this.scene.playerLevel || 1;

        if (type === 'material') {
            item = this.scene.materials[idx];
            if (!item) return 0;
            if (item.locked) return -1;
            this.scene.materials.splice(idx, 1);
        } else if (type === 'equip') {
            item = this.scene.equipBag[idx];
            if (!item) return 0;
            if (item.locked) return -1;
            this.scene.equipBag.splice(idx, 1);
        } else if (type === 'accountEquip') {
            const slot = idx;
            item = this.scene.accountEquipment[slot];
            if (!item) return 0;
            if (item.locked) return -1;
            this.scene.accountEquipment[slot] = null;
        } else if (type === 'accountEquipBag') {
            item = this.scene.accountEquipBag[idx];
            if (!item) return 0;
            if (item.locked) return -1;
            this.scene.accountEquipBag.splice(idx, 1);
        } else {
            return 0;
        }

        const rm = rarityMult[item.rarity] || 1;
        expGain = Math.floor(10 * rm * (1 + lvl * 0.05));
        if (type === 'accountEquipBag') {
            this.scene.accountExp += expGain;
            this._checkAccountLevelUp();
        } else {
            this.scene.playerExp += expGain;
            this.scene.accountExp += Math.floor(expGain * 0.5);
        }
        this.recalcStats();
        return expGain;
    }

    sellItem(type, idx) {
        let item = null;
        if (type === 'equip') {
            item = this.scene.equipBag[idx];
            if (!item) return 0;
            if (item.locked) return -1;
            const sellPrice = Math.floor((SHOP_EQUIP_PRICES[item.rarity] || SHOP_EQUIP_PRICES.uncommon) * SELL_PRICE_RATIO);
            this.scene.equipBag.splice(idx, 1);
            this.scene.gold = (this.scene.gold || 0) + sellPrice;
            return sellPrice;
        } else if (type === 'accountEquipBag') {
            item = this.scene.accountEquipBag[idx];
            if (!item) return 0;
            if (item.locked) return -1;
            const sellPrice = Math.floor((SHOP_EQUIP_PRICES[item.rarity] || SHOP_EQUIP_PRICES.uncommon) * SELL_PRICE_RATIO);
            this.scene.accountEquipBag.splice(idx, 1);
            this.scene.gold = (this.scene.gold || 0) + sellPrice;
            return sellPrice;
        }
        return 0;
    }

    toggleLock(type, idx) {
        let item = null;
        if (type === 'material') {
            item = this.scene.materials[idx];
        } else if (type === 'equip') {
            item = this.scene.equipBag[idx];
        } else if (type === 'accountEquipBag') {
            item = this.scene.accountEquipBag[idx];
        } else if (type === 'accountEquip') {
            item = this.scene.accountEquipment[idx];
        }
        if (!item) return false;
        item.locked = !item.locked;
        return item.locked;
    }

    getAccountEquipStatsText() {
        const ae = this.scene.accountEffects || {};
        const parts = [];
        if (ae.hpPercent) parts.push('+' + ae.hpPercent.toFixed(1) + '% HP');
        if (ae.damagePercent) parts.push('+' + ae.damagePercent.toFixed(1) + '% DMG');
        if (ae.speedPercent) parts.push('+' + ae.speedPercent.toFixed(1) + '% SPD');
        if (ae.spellPercent) parts.push('+' + ae.spellPercent.toFixed(1) + '% Spell');
        if (ae.critPercent) parts.push('+' + ae.critPercent.toFixed(1) + '% Crit');
        if (ae.dodgePercent) parts.push('+' + ae.dodgePercent.toFixed(1) + '% Dodge');
        if (ae.expPercent) parts.push('+' + ae.expPercent.toFixed(1) + '% EXP');
        if (ae.lootPercent) parts.push('+' + ae.lootPercent.toFixed(1) + '% Loot');
        if (ae.regenPercent) parts.push('+' + ae.regenPercent.toFixed(1) + '% Regen');
        if (ae.corruptionMax) parts.push('+' + ae.corruptionMax + ' Corr Max');
        return parts.length > 0 ? parts.join('  ') : 'No bonuses';
    }

    checkLevelUp() {
        const req = Math.floor(300 * Math.pow(this.scene.playerLevel, 1.6));
        if (this.scene.playerExp >= req) {
            this.scene.playerExp -= req;
            this.scene.playerLevel++;
            this.scene.talentPoints++;
            this.scene.classStats = getClassStats(this.scene.classKey, this.scene.playerLevel);
            this.recalcStats();
            this.scene.playerHP = this.scene.playerMaxHP;
            playLevelUp();
            this.scene.cameras.main.flash(300, 241, 196, 15);
            if (this.scene.particles) this.scene.particles.spawnLevelUp(this.scene.player.x, this.scene.player.y);
            const lt = this.scene.add.text(400, 250, 'LEVEL UP! Lv.' + this.scene.playerLevel + ' [+1 Talent]', {
                fontSize: '24px', fill: '#f1c40f', fontFamily: 'Arial',
                fontStyle: 'bold', stroke: '#000', strokeThickness: 3
            }).setOrigin(0.5);
            this.scene.tweens.add({
                targets: lt, y: lt.y - 50, alpha: 0, duration: 1500,
                onComplete: () => lt.destroy()
            });
        }
    }

    _checkAccountLevelUp() {
        const req = getAccountLevelUpReq(this.scene.accountLevel);
        if (this.scene.accountExp >= req) {
            this.scene.accountExp -= req;
            this.scene.accountLevel++;
            this.scene.accountTalentPoints++;
            this.scene.cameras.main.flash(300, 155, 89, 182);
            const lt = this.scene.add.text(400, 220, 'ACCOUNT LEVEL UP! Lv.' + this.scene.accountLevel + ' [+1 Talent]', {
                fontSize: '20px', fill: '#e67e22', fontFamily: 'Arial',
                fontStyle: 'bold', stroke: '#000', strokeThickness: 3
            }).setOrigin(0.5);
            this.scene.tweens.add({
                targets: lt, y: lt.y - 50, alpha: 0, duration: 2000,
                onComplete: () => lt.destroy()
            });
        }
    }
}
