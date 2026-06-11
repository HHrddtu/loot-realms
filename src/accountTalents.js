export const ACCOUNT_BRANCHES = [
    { key: 'combat',   name: 'Combat',   nameRu: 'Боевая',   nameDe: 'Kampf',     color: 0xe74c3c },
    { key: 'survival', name: 'Survival', nameRu: 'Защитная', nameDe: 'Überleben', color: 0x2ecc71 },
    { key: 'economy',  name: 'Economy',  nameRu: 'Экономика', nameDe: 'Ökonomie',  color: 0xf1c40f },
    { key: 'utility',  name: 'Utility',  nameRu: 'Utility',   nameDe: 'Nützlich',  color: 0x3498db }
];

export const ACCOUNT_TALENTS = [
    // === COMBAT BRANCH ===
    { id: 'ac_combat_1', branch: 'combat', row: 0, col: 0, name: 'Battle Hardened', nameRu: 'Закалённый в бою', description: '+3% DMG. Experience from every fight.', requires: [], effects: { damagePercent: 3 } },
    { id: 'ac_combat_2', branch: 'combat', row: 1, col: 0, name: 'Sharp Blade', nameRu: 'Острый Клинок', description: '+3% Crit Chance. A keen edge finds the mark.', requires: ['ac_combat_1'], effects: { critChance: 3 } },
    { id: 'ac_combat_3', branch: 'combat', row: 1, col: 1, name: 'Brutal Force', nameRu: 'Грубая Сила', description: '+5% Crit Damage. When you hit, you hit hard.', requires: ['ac_combat_1'], effects: { critDamagePercent: 5 } },
    { id: 'ac_combat_4', branch: 'combat', row: 2, col: 0, name: 'Frenzy', nameRu: 'Безумие', description: '+5% DMG. Rage fuels the blade.', requires: ['ac_combat_2'], effects: { damagePercent: 5 } },
    { id: 'ac_combat_5', branch: 'combat', row: 2, col: 1, name: 'Executioner', nameRu: 'Палач', description: '+8% DMG vs Bosses. Strong prey demands stronger arms.', requires: ['ac_combat_3'], effects: { bossDamagePercent: 8 } },
    { id: 'ac_combat_6', branch: 'combat', row: 3, col: 0, name: 'Life Steal', nameRu: 'Вампиризм', description: '2% Life Steal. Take what you kill.', requires: ['ac_combat_4'], effects: { lifeSteal: 2 } },
    { id: 'ac_combat_7', branch: 'combat', row: 3, col: 1, name: 'Cleave', nameRu: 'Рассечение', description: '5% AoE. Strikes echo to nearby foes.', requires: ['ac_combat_5'], effects: { areaDamage: 5 } },
    { id: 'ac_combat_8', branch: 'combat', row: 4, col: 0, name: 'Warlord', nameRu: 'Полководец', description: '+8% DMG, +2% Crit. Command the battlefield.', requires: ['ac_combat_6', 'ac_combat_7'], effects: { damagePercent: 8, critChance: 2 } },
    { id: 'ac_combat_9', branch: 'combat', row: 5, col: 0, name: 'Berserker', nameRu: 'Берсерк', description: '+10% DMG when HP < 30%. Pain is power.', requires: ['ac_combat_8'], effects: { damagePercentLowHp: 10 } },
    { id: 'ac_combat_10', branch: 'combat', row: 6, col: 0, name: 'Annihilator', nameRu: 'Уничтожитель', description: '+10% DMG. Nothing survives.', requires: ['ac_combat_9'], effects: { damagePercent: 10 } },
    { id: 'ac_combat_11', branch: 'combat', row: 7, col: 0, name: 'Conqueror', nameRu: 'Завоеватель', description: '+12% DMG, +5% Crit, +3% Life Steal.', requires: ['ac_combat_10'], effects: { damagePercent: 12, critChance: 5, lifeSteal: 3 } },
    { id: 'ac_combat_12', branch: 'combat', row: 8, col: 0, name: 'Critical Mastery', nameRu: 'Мастер Крита', description: '+8% Crit, +10% Crit DMG.致命一击.', requires: ['ac_combat_11'], effects: { critChance: 8, critDamagePercent: 10 } },
    { id: 'ac_combat_13', branch: 'combat', row: 8, col: 1, name: 'War Cry', nameRu: 'Боевой Клич', description: '+8% DMG, +5% AoE. The battle cry echoes.', requires: ['ac_combat_11'], effects: { damagePercent: 8, areaDamage: 5 } },
    { id: 'ac_combat_14', branch: 'combat', row: 9, col: 0, name: 'Warlord Supreme', nameRu: 'Верховный Полководец', description: '+15% DMG, +10% Crit, +5% LS, +8% AoE.', requires: ['ac_combat_12', 'ac_combat_13'], effects: { damagePercent: 15, critChance: 10, lifeSteal: 5, areaDamage: 8 } },
    { id: 'ac_combat_15', branch: 'combat', row: 10, col: 0, name: 'Strike', nameRu: 'Удар', description: '+3% DMG. The blade cuts deeper.', requires: ['ac_combat_14'], effects: { damagePercent: 3 } },
    { id: 'ac_combat_16', branch: 'combat', row: 10, col: 1, name: 'Aim', nameRu: 'Прицел', description: '+2% Crit. Precision kills.', requires: ['ac_combat_14'], effects: { critChance: 2 } },
    { id: 'ac_combat_17', branch: 'combat', row: 11, col: 0, name: 'Power', nameRu: 'Сила', description: '+4% DMG, +1% Crit.', requires: ['ac_combat_15'], effects: { damagePercent: 4, critChance: 1 } },
    { id: 'ac_combat_18', branch: 'combat', row: 11, col: 1, name: 'Sweep', nameRu: 'Рассечь', description: '+3% AoE, +2% DMG.', requires: ['ac_combat_16'], effects: { areaDamage: 3, damagePercent: 2 } },
    { id: 'ac_combat_19', branch: 'combat', row: 12, col: 0, name: 'Might', nameRu: 'Мощь', description: '+5% DMG, +3% Crit.', requires: ['ac_combat_17', 'ac_combat_18'], effects: { damagePercent: 5, critChance: 3 } },
    { id: 'ac_combat_20', branch: 'combat', row: 12, col: 1, name: 'Fury', nameRu: 'Ярость', description: '+4% DMG, +3% AoE.', requires: ['ac_combat_17'], effects: { damagePercent: 4, areaDamage: 3 } },
    { id: 'ac_combat_21', branch: 'combat', row: 13, col: 0, name: 'Devastate', nameRu: 'Опустошить', description: '+4% DMG, +3% Crit, +2% LS.', requires: ['ac_combat_19'], effects: { damagePercent: 4, critChance: 3, lifeSteal: 2 } },
    { id: 'ac_combat_22', branch: 'combat', row: 13, col: 1, name: 'Rampage', nameRu: 'Бесчинство', description: '+5% DMG, +3% AoE.', requires: ['ac_combat_20'], effects: { damagePercent: 5, areaDamage: 3 } },
    { id: 'ac_combat_23', branch: 'combat', row: 14, col: 0, name: 'Obliterate', nameRu: 'Уничтожить', description: '+5% DMG, +4% Crit, +3% LS.', requires: ['ac_combat_21', 'ac_combat_22'], effects: { damagePercent: 5, critChance: 4, lifeSteal: 3 } },
    { id: 'ac_combat_24', branch: 'combat', row: 14, col: 1, name: 'Slaughter', nameRu: 'Резня', description: '+6% DMG, +4% AoE.', requires: ['ac_combat_21'], effects: { damagePercent: 6, areaDamage: 4 } },

    // === SURVIVAL BRANCH ===
    { id: 'ac_surv_1', branch: 'survival', row: 0, col: 0, name: 'Thick Skin', nameRu: 'Плотная Кожа', description: '+5% HP. The body learns to endure.', requires: [], effects: { hpPercent: 5 } },
    { id: 'ac_surv_2', branch: 'survival', row: 1, col: 0, name: 'Regeneration', nameRu: 'Регенерация', description: '+1% HP/sec. Wounds close faster.', requires: ['ac_surv_1'], effects: { regenPercent: 1 } },
    { id: 'ac_surv_3', branch: 'survival', row: 1, col: 1, name: 'Dodge', nameRu: 'Уклонение', description: '+3% Dodge. Never where they strike.', requires: ['ac_surv_1'], effects: { dodgePercent: 3 } },
    { id: 'ac_surv_4', branch: 'survival', row: 2, col: 0, name: 'Armor Plating', nameRu: 'Бронепластина', description: '3% Damage Reduction. Let them break upon you.', requires: ['ac_surv_2'], effects: { damageReduction: 3 } },
    { id: 'ac_surv_5', branch: 'survival', row: 2, col: 1, name: 'Second Wind', nameRu: 'Второе Дыхание', description: '+8% HP. The fight is not over.', requires: ['ac_surv_3'], effects: { hpPercent: 8 } },
    { id: 'ac_surv_6', branch: 'survival', row: 3, col: 0, name: 'Retribution', nameRu: 'Возмездие', description: '3% Damage Reflect. Hurt me and you bleed.', requires: ['ac_surv_4'], effects: { damageReflection: 3 } },
    { id: 'ac_surv_7', branch: 'survival', row: 3, col: 1, name: 'Fortitude', nameRu: 'Стойкость', description: '+5% Dodge. Bend, never break.', requires: ['ac_surv_5'], effects: { dodgePercent: 5 } },
    { id: 'ac_surv_8', branch: 'survival', row: 4, col: 0, name: 'Bulwark', nameRu: 'Бастион', description: '+10% HP, +1% Regen. A living fortress.', requires: ['ac_surv_6', 'ac_surv_7'], effects: { hpPercent: 10, regenPercent: 1 } },
    { id: 'ac_surv_9', branch: 'survival', row: 5, col: 0, name: 'Unyielding', nameRu: 'Непреклонный', description: '+8% Dodge. They cannot touch you.', requires: ['ac_surv_8'], effects: { dodgePercent: 8 } },
    { id: 'ac_surv_10', branch: 'survival', row: 6, col: 0, name: 'Iron Will', nameRu: 'Железная Воля', description: '+12% HP, +3% DR. Steel within.', requires: ['ac_surv_9'], effects: { hpPercent: 12, damageReduction: 3 } },
    { id: 'ac_surv_11', branch: 'survival', row: 7, col: 0, name: 'Immortal', nameRu: 'Бессмертный', description: '+15% HP, +8% Dodge, +2% Regen.', requires: ['ac_surv_10'], effects: { hpPercent: 15, dodgePercent: 8, regenPercent: 2 } },
    { id: 'ac_surv_12', branch: 'survival', row: 8, col: 0, name: 'Steel Skin', nameRu: 'Стальная Кожа', description: '+8% DR, +5% HP. Hardened beyond measure.', requires: ['ac_surv_11'], effects: { damageReduction: 8, hpPercent: 5 } },
    { id: 'ac_surv_13', branch: 'survival', row: 8, col: 1, name: 'Phantom Step', nameRu: 'Шаг Призрака', description: '+8% Dodge, +5% Move Speed. Impossible to pin down.', requires: ['ac_surv_11'], effects: { dodgePercent: 8, moveSpeedPercent: 5 } },
    { id: 'ac_surv_14', branch: 'survival', row: 9, col: 0, name: 'Undying', nameRu: 'Несмертный', description: '+20% HP, +12% Dodge, +5% DR, +3% Regen.', requires: ['ac_surv_12', 'ac_surv_13'], effects: { hpPercent: 20, dodgePercent: 12, damageReduction: 5, regenPercent: 3 } },
    { id: 'ac_surv_15', branch: 'survival', row: 10, col: 0, name: 'Endure', nameRu: 'Терпеть', description: '+3% HP. The body persists.', requires: ['ac_surv_14'], effects: { hpPercent: 3 } },
    { id: 'ac_surv_16', branch: 'survival', row: 10, col: 1, name: 'Nimble', nameRu: ' проворный', description: '+2% Dodge. Never where they strike.', requires: ['ac_surv_14'], effects: { dodgePercent: 2 } },
    { id: 'ac_surv_17', branch: 'survival', row: 11, col: 0, name: 'Tough', nameRu: 'Крепкий', description: '+4% HP, +1% DR.', requires: ['ac_surv_15'], effects: { hpPercent: 4, damageReduction: 1 } },
    { id: 'ac_surv_18', branch: 'survival', row: 11, col: 1, name: 'Evade', nameRu: 'Уклоняться', description: '+3% Dodge, +1% Regen.', requires: ['ac_surv_16'], effects: { dodgePercent: 3, regenPercent: 1 } },
    { id: 'ac_surv_19', branch: 'survival', row: 12, col: 0, name: 'Resilient', nameRu: 'Стойкий', description: '+5% HP, +2% DR, +1% Regen.', requires: ['ac_surv_17', 'ac_surv_18'], effects: { hpPercent: 5, damageReduction: 2, regenPercent: 1 } },
    { id: 'ac_surv_20', branch: 'survival', row: 12, col: 1, name: 'Deflect', nameRu: 'Отклонить', description: '+4% Dodge, +2% DR.', requires: ['ac_surv_17'], effects: { dodgePercent: 4, damageReduction: 2 } },
    { id: 'ac_surv_21', branch: 'survival', row: 13, col: 0, name: 'Stalwart', nameRu: 'Верный', description: '+4% HP, +3% Dodge, +2% Regen.', requires: ['ac_surv_19'], effects: { hpPercent: 4, dodgePercent: 3, regenPercent: 2 } },
    { id: 'ac_surv_22', branch: 'survival', row: 13, col: 1, name: 'Unbreakable', nameRu: 'Несокрушимый', description: '+5% DR, +3% HP.', requires: ['ac_surv_20'], effects: { damageReduction: 5, hpPercent: 3 } },
    { id: 'ac_surv_23', branch: 'survival', row: 14, col: 0, name: 'Indomitable', nameRu: 'Неукротимый', description: '+6% HP, +4% Dodge, +3% DR.', requires: ['ac_surv_21', 'ac_surv_22'], effects: { hpPercent: 6, dodgePercent: 4, damageReduction: 3 } },
    { id: 'ac_surv_24', branch: 'survival', row: 14, col: 1, name: 'Persevere', nameRu: 'Преодолеть', description: '+4% HP, +3% Regen.', requires: ['ac_surv_21'], effects: { hpPercent: 4, regenPercent: 3 } },

    // === ECONOMY BRANCH ===
    { id: 'ac_econ_1', branch: 'economy', row: 0, col: 0, name: 'Quick Learner', nameRu: 'Быстрый Ученик', description: '+5% EXP. Knowledge is power.', requires: [], effects: { expPercent: 5 } },
    { id: 'ac_econ_2', branch: 'economy', row: 1, col: 0, name: 'Gold Sense', nameRu: 'Чутьё на Золото', description: '+5% Gold. Coins call to those who listen.', requires: ['ac_econ_1'], effects: { goldPercent: 5 } },
    { id: 'ac_econ_3', branch: 'economy', row: 1, col: 1, name: 'Scavenger', nameRu: 'Собиратель', description: '+3% Loot Chance. Fortune favors the prepared.', requires: ['ac_econ_1'], effects: { lootPercent: 3 } },
    { id: 'ac_econ_4', branch: 'economy', row: 2, col: 0, name: 'Hoarder', nameRu: 'Скопидом', description: '+8% EXP. Study every kill.', requires: ['ac_econ_2'], effects: { expPercent: 8 } },
    { id: 'ac_econ_5', branch: 'economy', row: 2, col: 1, name: 'Treasure Hunter', nameRu: 'Охотник за Сокровищами', description: '+5% Rare Luck. Seek the extraordinary.', requires: ['ac_econ_3'], effects: { rareLuckPercent: 5 } },
    { id: 'ac_econ_6', branch: 'economy', row: 3, col: 0, name: 'Merchant', nameRu: 'Торговец', description: '+8% Gold. Everything has a price.', requires: ['ac_econ_4'], effects: { goldPercent: 8 } },
    { id: 'ac_econ_7', branch: 'economy', row: 3, col: 1, name: 'Pack Rat', nameRu: 'Крыса', description: '+2 Inventory Slots. Always room for more.', requires: ['ac_econ_5'], effects: { inventorySlots: 2 } },
    { id: 'ac_econ_8', branch: 'economy', row: 4, col: 0, name: 'Veteran', nameRu: 'Ветеран', description: '+10% EXP, +5% Gold. A life of acquisition.', requires: ['ac_econ_6', 'ac_econ_7'], effects: { expPercent: 10, goldPercent: 5 } },
    { id: 'ac_econ_9', branch: 'economy', row: 5, col: 0, name: 'Lucky Find', nameRu: 'Удачная Находка', description: '+8% Loot Chance. Luck is earned.', requires: ['ac_econ_8'], effects: { lootPercent: 8 } },
    { id: 'ac_econ_10', branch: 'economy', row: 6, col: 0, name: 'Wealthy', nameRu: 'Богатей', description: '+12% Gold, +5% Rare Luck. Gold opens all doors.', requires: ['ac_econ_9'], effects: { goldPercent: 12, rareLuckPercent: 5 } },
    { id: 'ac_econ_11', branch: 'economy', row: 7, col: 0, name: "Fortune's Child", nameRu: 'Дитя Удачи', description: '+15% EXP, +12% Gold, +8% Loot, +3% Rare Luck.', requires: ['ac_econ_10'], effects: { expPercent: 15, goldPercent: 12, lootPercent: 8, rareLuckPercent: 3 } },
    { id: 'ac_econ_12', branch: 'economy', row: 8, col: 0, name: 'Gold Rush', nameRu: 'Золотая Лихорадка', description: '+10% Gold, +5% Rare Luck. Gold flows like river.', requires: ['ac_econ_11'], effects: { goldPercent: 10, rareLuckPercent: 5 } },
    { id: 'ac_econ_13', branch: 'economy', row: 8, col: 1, name: 'Master Scout', nameRu: 'Мастер Разведчик', description: '+10% EXP, +5% Loot. Knowledge and fortune.', requires: ['ac_econ_11'], effects: { expPercent: 10, lootPercent: 5 } },
    { id: 'ac_econ_14', branch: 'economy', row: 9, col: 0, name: 'Treasure Lord', nameRu: 'Повелитель Сокровищ', description: '+20% EXP, +15% Gold, +10% Loot, +8% Rare.', requires: ['ac_econ_12', 'ac_econ_13'], effects: { expPercent: 20, goldPercent: 15, lootPercent: 10, rareLuckPercent: 8 } },
    { id: 'ac_econ_15', branch: 'economy', row: 10, col: 0, name: 'Coin', nameRu: 'Монета', description: '+3% Gold. Every coin counts.', requires: ['ac_econ_14'], effects: { goldPercent: 3 } },
    { id: 'ac_econ_16', branch: 'economy', row: 10, col: 1, name: 'Scout', nameRu: 'Разведчик', description: '+3% EXP. Knowledge grows.', requires: ['ac_econ_14'], effects: { expPercent: 3 } },
    { id: 'ac_econ_17', branch: 'economy', row: 11, col: 0, name: 'Loot', nameRu: 'Добыча', description: '+3% Loot, +1% Rare.', requires: ['ac_econ_15'], effects: { lootPercent: 3, rareLuckPercent: 1 } },
    { id: 'ac_econ_18', branch: 'economy', row: 11, col: 1, name: 'Study', nameRu: 'Учёба', description: '+4% EXP, +2% Gold.', requires: ['ac_econ_16'], effects: { expPercent: 4, goldPercent: 2 } },
    { id: 'ac_econ_19', branch: 'economy', row: 12, col: 0, name: 'Fortune', nameRu: 'Удача', description: '+4% Loot, +3% Rare, +2% Gold.', requires: ['ac_econ_17', 'ac_econ_18'], effects: { lootPercent: 4, rareLuckPercent: 3, goldPercent: 2 } },
    { id: 'ac_econ_20', branch: 'economy', row: 12, col: 1, name: 'Harvest', nameRu: 'Жатва', description: '+5% EXP, +3% Gold.', requires: ['ac_econ_17'], effects: { expPercent: 5, goldPercent: 3 } },
    { id: 'ac_econ_21', branch: 'economy', row: 13, col: 0, name: 'Plunder', nameRu: 'Добыча', description: '+4% Gold, +3% Loot, +2% Rare.', requires: ['ac_econ_19'], effects: { goldPercent: 4, lootPercent: 3, rareLuckPercent: 2 } },
    { id: 'ac_econ_22', branch: 'economy', row: 13, col: 1, name: 'Mastery', nameRu: 'Мастерство', description: '+5% EXP, +3% Rare.', requires: ['ac_econ_20'], effects: { expPercent: 5, rareLuckPercent: 3 } },
    { id: 'ac_econ_23', branch: 'economy', row: 14, col: 0, name: 'Abundance', nameRu: 'Изобилие', description: '+5% Gold, +4% Loot, +3% Rare.', requires: ['ac_econ_21', 'ac_econ_22'], effects: { goldPercent: 5, lootPercent: 4, rareLuckPercent: 3 } },
    { id: 'ac_econ_24', branch: 'economy', row: 14, col: 1, name: 'Prosperity', nameRu: 'Процветание', description: '+6% EXP, +4% Gold.', requires: ['ac_econ_21'], effects: { expPercent: 6, goldPercent: 4 } },

    // === UTILITY BRANCH ===
    { id: 'ac_util_1', branch: 'utility', row: 0, col: 0, name: 'Swift Feet', nameRu: 'Быстрые Ноги', description: '+5% Move Speed. Know when to run.', requires: [], effects: { moveSpeedPercent: 5 } },
    { id: 'ac_util_2', branch: 'utility', row: 1, col: 0, name: 'Keen Eye', nameRu: 'Острый Глаз', description: '+5% Move Speed. Awareness is survival.', requires: ['ac_util_1'], effects: { moveSpeedPercent: 5 } },
    { id: 'ac_util_3', branch: 'utility', row: 1, col: 1, name: 'Pack Mule', nameRu: 'Вьючное Животное', description: '+1 Inventory Slot. Carry more, worry less.', requires: ['ac_util_1'], effects: { inventorySlots: 1 } },
    { id: 'ac_util_4', branch: 'utility', row: 2, col: 0, name: 'Haste', nameRu: 'Спешка', description: '+8% Move Speed. Time is precious.', requires: ['ac_util_2'], effects: { moveSpeedPercent: 8 } },
    { id: 'ac_util_5', branch: 'utility', row: 2, col: 1, name: 'Quick Hands', nameRu: 'Быстрые Руки', description: '3% Cooldown Reduction. Strike faster.', requires: ['ac_util_3'], effects: { cooldownReduction: 3 } },
    { id: 'ac_util_6', branch: 'utility', row: 3, col: 0, name: 'Evasion', nameRu: 'Ускользание', description: '+3% Dodge. A moving target is hard to hit.', requires: ['ac_util_4'], effects: { dodgePercent: 3 } },
    { id: 'ac_util_7', branch: 'utility', row: 3, col: 1, name: 'Momentum', nameRu: 'Импульс', description: '+5% DMG at full HP. First strike wins.', requires: ['ac_util_5'], effects: { damagePercentFullHp: 5 } },
    { id: 'ac_util_8', branch: 'utility', row: 4, col: 0, name: 'Fleet Footed', nameRu: 'Стремительный', description: '+10% Move Speed. Never caught off guard.', requires: ['ac_util_6', 'ac_util_7'], effects: { moveSpeedPercent: 10 } },
    { id: 'ac_util_9', branch: 'utility', row: 5, col: 0, name: 'Time Warp', nameRu: 'Искажение Времени', description: '5% Cooldown Reduction. Bend time itself.', requires: ['ac_util_8'], effects: { cooldownReduction: 5 } },
    { id: 'ac_util_10', branch: 'utility', row: 6, col: 0, name: 'Phase Walk', nameRu: 'Фазовый Шаг', description: '+5% Dodge, +8% Move Speed. Between dimensions.', requires: ['ac_util_9'], effects: { dodgePercent: 5, moveSpeedPercent: 8 } },
    { id: 'ac_util_11', branch: 'utility', row: 7, col: 0, name: 'Velocity', nameRu: 'Скорость', description: '+12% Move Speed, +8% CDR, +5% Dodge.', requires: ['ac_util_10'], effects: { moveSpeedPercent: 12, cooldownReduction: 8, dodgePercent: 5 } },
    { id: 'ac_util_12', branch: 'utility', row: 8, col: 0, name: 'Time Master', nameRu: 'Мастер Времени', description: '+8% CDR, +5% Dodge. Time bends to your will.', requires: ['ac_util_11'], effects: { cooldownReduction: 8, dodgePercent: 5 } },
    { id: 'ac_util_13', branch: 'utility', row: 8, col: 1, name: 'Wind Runner', nameRu: 'Бегун Ветра', description: '+10% Move Speed, +5% Dodge. Faster than wind.', requires: ['ac_util_11'], effects: { moveSpeedPercent: 10, dodgePercent: 5 } },
    { id: 'ac_util_14', branch: 'utility', row: 9, col: 0, name: 'Transcendence', nameRu: 'Трансценденция', description: '+15% Speed, +12% CDR, +8% Dodge, +5 slots.', requires: ['ac_util_12', 'ac_util_13'], effects: { moveSpeedPercent: 15, cooldownReduction: 12, dodgePercent: 8, inventorySlots: 5 } },
    { id: 'ac_util_15', branch: 'utility', row: 10, col: 0, name: 'Quick', nameRu: 'Быстрый', description: '+3% Move Speed. Swift feet.', requires: ['ac_util_14'], effects: { moveSpeedPercent: 3 } },
    { id: 'ac_util_16', branch: 'utility', row: 10, col: 1, name: 'Haste', nameRu: 'Спешка', description: '+2% CDR. Strike faster.', requires: ['ac_util_14'], effects: { cooldownReduction: 2 } },
    { id: 'ac_util_17', branch: 'utility', row: 11, col: 0, name: 'Fleet', nameRu: 'Стремительный', description: '+4% Move Speed, +1% Dodge.', requires: ['ac_util_15'], effects: { moveSpeedPercent: 4, dodgePercent: 1 } },
    { id: 'ac_util_18', branch: 'utility', row: 11, col: 1, name: 'Rush', nameRu: 'Рывок', description: '+3% CDR, +2% Dodge.', requires: ['ac_util_16'], effects: { cooldownReduction: 3, dodgePercent: 2 } },
    { id: 'ac_util_19', branch: 'utility', row: 12, col: 0, name: 'Surge', nameRu: 'Всплеск', description: '+5% Move Speed, +2% CDR.', requires: ['ac_util_17', 'ac_util_18'], effects: { moveSpeedPercent: 5, cooldownReduction: 2 } },
    { id: 'ac_util_20', branch: 'utility', row: 12, col: 1, name: 'Accelerate', nameRu: 'Ускорить', description: '+4% CDR, +3% Dodge.', requires: ['ac_util_17'], effects: { cooldownReduction: 4, dodgePercent: 3 } },
    { id: 'ac_util_21', branch: 'utility', row: 13, col: 0, name: 'Bolt', nameRu: 'Болт', description: '+4% Move Speed, +3% CDR, +2% Dodge.', requires: ['ac_util_19'], effects: { moveSpeedPercent: 4, cooldownReduction: 3, dodgePercent: 2 } },
    { id: 'ac_util_22', branch: 'utility', row: 13, col: 1, name: 'Warp', nameRu: 'Искажение', description: '+5% CDR, +3% Dodge.', requires: ['ac_util_20'], effects: { cooldownReduction: 5, dodgePercent: 3 } },
    { id: 'ac_util_23', branch: 'utility', row: 14, col: 0, name: 'Infinity', nameRu: 'Бесконечность', description: '+5% Move Speed, +4% CDR, +3% Dodge.', requires: ['ac_util_21', 'ac_util_22'], effects: { moveSpeedPercent: 5, cooldownReduction: 4, dodgePercent: 3 } },
    { id: 'ac_util_24', branch: 'utility', row: 14, col: 1, name: 'Beyond', nameRu: 'За Гранью', description: '+4% CDR, +4% Dodge, +2 slots.', requires: ['ac_util_21'], effects: { cooldownReduction: 4, dodgePercent: 4, inventorySlots: 2 } }
];

export function getAccountTalent(id) {
    return ACCOUNT_TALENTS.find(t => t.id === id);
}

export function canUnlockAccountTalent(id, unlockedIds) {
    const talent = getAccountTalent(id);
    if (!talent) return false;
    if (unlockedIds.includes(id)) return false;
    return talent.requires.every(req => unlockedIds.includes(req));
}

export function getAccountTalentsByBranch(branch) {
    return ACCOUNT_TALENTS.filter(t => t.branch === branch);
}

export function getAccountTalentEffects(unlockedIds) {
    const effects = {
        damagePercent: 0,
        hpPercent: 0,
        speedPercent: 0,
        expPercent: 0,
        critChance: 0,
        critDamagePercent: 0,
        lifeSteal: 0,
        areaDamage: 0,
        bossDamagePercent: 0,
        damagePercentLowHp: 0,
        damagePercentFullHp: 0,
        regenPercent: 0,
        dodgePercent: 0,
        damageReduction: 0,
        damageReflection: 0,
        goldPercent: 0,
        lootPercent: 0,
        rareLuckPercent: 0,
        inventorySlots: 0,
        moveSpeedPercent: 0,
        cooldownReduction: 0
    };

    unlockedIds.forEach(id => {
        const t = getAccountTalent(id);
        if (!t) return;
        const e = t.effects;
        for (const key in e) {
            if (effects[key] !== undefined) effects[key] += e[key];
        }
    });

    return effects;
}
