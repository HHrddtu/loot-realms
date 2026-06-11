import { CRAFTING_RECIPES, MATERIAL_BOOK_LEVELS, MATERIAL_BOOK_ENTRIES } from './config.js';
import { getMaterialStudyLevel } from './materialBook.js';

export function getAvailableRecipes() {
    return CRAFTING_RECIPES;
}

export function getRecipesByCategory(category) {
    return CRAFTING_RECIPES.filter(r => r.category === category);
}

export function getUnlockedRecipes(materialBookData) {
    return CRAFTING_RECIPES.filter(recipe => {
        const maxLevel = getMaxMaterialLevel(materialBookData);
        return recipe.levelRequired <= maxLevel;
    });
}

function getMaxMaterialLevel(materialBookData) {
    let maxLvl = 0;
    const entries = materialBookData || {};
    Object.keys(entries).forEach(matId => {
        const count = entries[matId]?.collected || 0;
        for (let i = MATERIAL_BOOK_LEVELS.length - 1; i >= 0; i--) {
            if (count >= MATERIAL_BOOK_LEVELS[i].countRequired) {
                if (MATERIAL_BOOK_LEVELS[i].level > maxLvl) {
                    maxLvl = MATERIAL_BOOK_LEVELS[i].level;
                }
                break;
            }
        }
    });
    return maxLvl;
}

export function countMaterials(materials, materialId) {
    let count = 0;
    materials.forEach(m => {
        if (m.id === materialId) count++;
    });
    return count;
}

export function canCraft(recipe, materials, isAlchemist) {
    const required = Object.entries(recipe.materials);
    for (const [matId, amount] of required) {
        if (countMaterials(materials, matId) < amount) return false;
    }
    return true;
}

export function getRecipeStatus(recipe, materials) {
    const result = {};
    const required = Object.entries(recipe.materials);
    for (const [matId, amount] of required) {
        const have = countMaterials(materials, matId);
        result[matId] = { need: amount, have, enough: have >= amount };
    }
    return result;
}

export function craft(recipe, materials, isAlchemist, equipBag, maxEquipBag, hasRelicCraftBonus) {
    if (!canCraft(recipe, materials, isAlchemist)) return { success: false, item: null };

    const removed = {};
    const newMaterials = [...materials];

    Object.entries(recipe.materials).forEach(([matId, amount]) => {
        removed[matId] = 0;
        for (let i = newMaterials.length - 1; i >= 0 && removed[matId] < amount; i--) {
            if (newMaterials[i].id === matId) {
                newMaterials.splice(i, 1);
                removed[matId]++;
            }
        }
    });

    const craftBonusChance = hasRelicCraftBonus ? 0.25 : 0;
    const bonusYield = (isAlchemist && Math.random() < 0.15) || Math.random() < craftBonusChance;
    const craftedItems = [];

    for (let i = 0; i < (bonusYield ? 2 : 1); i++) {
        const item = {
            id: recipe.id,
            name: recipe.name,
            nameRu: recipe.nameRu,
            nameDe: recipe.nameDe,
            rarity: recipe.rarity,
            slot: recipe.slot,
            texKey: recipe.texKey,
            stats: { ...recipe.stats },
            type: 'equip',
            crafted: true
        };
        craftedItems.push(item);
    }

    return {
        success: true,
        materials: newMaterials,
        items: craftedItems,
        bonusYield
    };
}

export function getMaterialName(matId) {
    const entry = MATERIAL_BOOK_ENTRIES[matId];
    return entry ? entry.name : matId;
}
