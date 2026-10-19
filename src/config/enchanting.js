export const ENCHANTMENTS = [
    {
        id: 'ench_fire',
        name: 'Fire Enchant',
        nameRu: 'Огненное Зачарование',
        nameDe: 'Feuerverzauberung',
        cost: 25,
        slots: ['weapon'],
        stats: { damagePercent: 8 },
        texKey: 'item_flame',
        color: 0xff4400,
        description: '+8% DMG. Infuses the weapon with fire.',
        descriptionRu: '+8% УРН. Наполняет оружие огнём.',
        descriptionDe: '+8% SCHD. Durchtränkt die Waffe mit Feuer.'
    },
    {
        id: 'ench_frost',
        name: 'Frost Enchant',
        nameRu: 'Ледяное Зачарование',
        nameDe: 'Frostverzauberung',
        cost: 25,
        slots: ['weapon'],
        stats: { speedPercent: 6, critPercent: 4 },
        texKey: 'ice_shard',
        color: 0x5dade2,
        description: '+6% SPD, +4% Crit. Chills the blade.',
        descriptionRu: '+6% СКР, +4% Крит. Студит лезвие.',
        descriptionDe: '+6% GESCHW, +4% Krit. Kühlt die Klinge.'
    },
    {
        id: 'ench_vital',
        name: 'Vital Enchant',
        nameRu: 'Зачарование Жизни',
        nameDe: 'Lebensverzauberung',
        cost: 25,
        slots: ['armor'],
        stats: { hpPercent: 10, regenPercent: 3 },
        texKey: 'item_herb',
        color: 0x2ecc71,
        description: '+10% HP, +3% Regen. A living ward.',
        descriptionRu: '+10% ЗД, +3% Реген. Живой оберег.',
        descriptionDe: '+10% LP, +3% Regeneration. Ein lebender Schild.'
    },
    {
        id: 'ench_stone',
        name: 'Stone Enchant',
        nameRu: 'Каменное Зачарование',
        nameDe: 'Steinverzauberung',
        cost: 30,
        slots: ['armor'],
        stats: { hpPercent: 6, damageReduction: 8 },
        texKey: 'item_stone',
        color: 0x95a5a6,
        description: '+6% HP, +8% DR. Hard as bedrock.',
        descriptionRu: '+6% ЗД, +8% СЗ. Твёрд как скала.',
        descriptionDe: '+6% LP, +8% VRS. Hart wie Grundgestein.'
    },
    {
        id: 'ench_arcane',
        name: 'Arcane Enchant',
        nameRu: 'Тайное Зачарование',
        nameDe: 'Arkane Verzauberung',
        cost: 30,
        slots: ['weapon', 'accessory'],
        stats: { spellPercent: 10, critPercent: 3 },
        texKey: 'item_ruby',
        color: 0x9b59b6,
        description: '+10% Spell, +3% Crit. Whispers of power.',
        descriptionRu: '+10% Спеллы, +3% Крит. Шёпот силы.',
        descriptionDe: '+10% Zauber, +3% Krit. Flüstern der Macht.'
    },
    {
        id: 'ench_swift',
        name: 'Swift Enchant',
        nameRu: 'Зачарование Скорости',
        nameDe: 'Eilverzauberung',
        cost: 30,
        slots: ['accessory', 'armor'],
        stats: { speedPercent: 8, dodgePercent: 4 },
        texKey: 'item_leaf',
        color: 0x48c9b0,
        description: '+8% SPD, +4% Dodge. Grace of the wind.',
        descriptionRu: '+8% СКР, +4% Уклон. Грация ветра.',
        descriptionDe: '+8% GESCHW, +4% Ausweichen. Anmut des Windes.'
    },
    {
        id: 'ench_lucky',
        name: 'Lucky Enchant',
        nameRu: 'Зачарование Удачи',
        nameDe: 'Glücksverzauberung',
        cost: 40,
        slots: ['accessory'],
        stats: { critPercent: 5, dodgePercent: 5 },
        texKey: 'item_gold',
        color: 0xf1c40f,
        description: '+5% Crit, +5% Dodge. Fortune smiles.',
        descriptionRu: '+5% Крит, +5% Уклон. Фортуна улыбается.',
        descriptionDe: '+5% Krit, +5% Ausweichen. Das Glück lächelt.'
    }
];

export function getEnchantById(id) {
    return ENCHANTMENTS.find(e => e.id === id) || null;
}

export function getEnchantCost(id) {
    const e = getEnchantById(id);
    return e ? e.cost : 0;
}

export function canEnchantItem(item, enchantId) {
    if (!item) return false;
    const e = getEnchantById(enchantId);
    if (!e) return false;
    if (item.enchant && item.enchant.id === enchantId) return false;
    if (e.slots.length && !e.slots.includes(item.slot)) return false;
    return true;
}

export function enrichItem(item, enchantId) {
    const e = getEnchantById(enchantId);
    if (!e) return item;
    return {
        ...item,
        enchant: { id: e.id, name: e.name, nameRu: e.nameRu, nameDe: e.nameDe, stats: { ...e.stats } }
    };
}