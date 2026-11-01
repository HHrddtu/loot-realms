export const TALENT_SCOPE = {
    ACCOUNT: 'account',
    CLASS: 'class'
};

export const CLASS_BRANCHES = {
    sage: [
        { key: 'fire',       name: 'Fire',       nameRu: 'Огонь',      nameDe: 'Feuer',     color: 0xe74c3c },
        { key: 'protection', name: 'Protection', nameRu: 'Защита',     nameDe: 'Schutz',    color: 0x3498db },
        { key: 'knowledge',  name: 'Knowledge',  nameRu: 'Знание',     nameDe: 'Wissen',    color: 0x9b59b6 }
    ],
    alchemist: [
        { key: 'acid',    name: 'Acid',    nameRu: 'Кислота', nameDe: 'Säure',  color: 0x27ae60 },
        { key: 'iron',    name: 'Iron',    nameRu: 'Железо',  nameDe: 'Eisen',  color: 0x95a5a6 },
        { key: 'potions', name: 'Potions', nameRu: 'Зелья',   nameDe: 'Tränke', color: 0xe67e22 }
    ],
    angel: [
        { key: 'strike', name: 'Strike', nameRu: 'Удар',    nameDe: 'Schlag',    color: 0xecf0f1 },
        { key: 'link',   name: 'Link',   nameRu: 'Связь',   nameDe: 'Bindung',   color: 0xf1c40f },
        { key: 'purify', name: 'Purify', nameRu: 'Очищение', nameDe: 'Reinigung', color: 0x9b59b6 }
    ]
};

// Compact talent tree: 10 nodes per branch. Every node is a noticeable step.
// Layout: trunk rows 0-2, quality effects at rows 2/4/7, capstones at rows 6/7.
// Costs come from getTalentCost(row): rows 0-2 = 1, rows 3-5 = 2, rows 6-8 = 3, rows 9+ = 5.
function node(branch, row, col, id, name, nameRu, description, effects, requires = []) {
    return {
        id,
        branch,
        scope: TALENT_SCOPE.CLASS,
        row,
        col,
        name,
        nameRu,
        description,
        requires,
        effects
    };
}

export const SAGE_TALENTS = [
    node('fire', 0, 0, 's_fire_1', 'Ember', 'Угольки', '+15% Spell DMG. Every flame starts small.', { spellDamage: 15 }),
    node('fire', 1, 0, 's_fire_2', 'Inferno', 'Инферно', '+15% Spell DMG, +3% Crit.', { spellDamage: 15, critChance: 3 }, ['s_fire_1']),
    node('fire', 1, 1, 's_fire_3', 'Ignite', 'Воспламенение', 'DoT +6, DoT duration +2s.', { dotPower: 6, dotDuration: 2 }, ['s_fire_1']),
    node('fire', 2, 0, 's_fire_4', 'Firestorm', 'Огненный Шторм', '+15% AoE DMG. Fireballs splash burn nearby enemies.', { areaDamage: 15, spellSplashBurn: true }, ['s_fire_2']),
    node('fire', 3, 0, 's_fire_5', 'Hellfire', 'Адское Пламя', '+20% Spell DMG, +5% Crit.', { spellDamage: 20, critChance: 5 }, ['s_fire_4']),
    node('fire', 3, 1, 's_fire_6', 'Searing Touch', 'Жгучее Касание', '+8% Crit, +10% Crit DMG, -5% enemy armor.', { critChance: 8, critDamagePercent: 10, armorReduction: 5 }, ['s_fire_3']),
    node('fire', 4, 0, 's_fire_7', 'Phoenix', 'Феникс', 'Spell projectiles pierce through targets.', { spellPierce: true, spellDamage: 10 }, ['s_fire_5']),
    node('fire', 5, 0, 's_fire_8', 'Inferno Lord', 'Повелитель Огня', '+20% Spell DMG, +8% Crit, +4 DoT.', { spellDamage: 20, critChance: 8, dotPower: 4 }, ['s_fire_7']),
    node('fire', 6, 0, 's_fire_9', 'Eternal Flame', 'Вечное Пламя', '+25% Spell DMG, +10% Crit, +2s DoT duration.', { spellDamage: 25, critChance: 10, dotDuration: 2 }, ['s_fire_8']),
    node('fire', 7, 0, 's_fire_10', 'Firelord', 'Повелитель Пламени', '+30% Spell DMG, +12% Crit, +3% DR.', { spellDamage: 30, critChance: 12, damageReduction: 3 }, ['s_fire_9']),

    node('protection', 0, 0, 's_prot_1', 'Arcane Ward', 'Тайная Защита', '+20% Shield absorption, +2% DR.', { shieldPercent: 20, damageReduction: 2 }),
    node('protection', 1, 0, 's_prot_2', 'Thorns', 'Шипы', 'Shield reflects 8% of blocked damage.', { shieldReflect: 8 }, ['s_prot_1']),
    node('protection', 1, 1, 's_prot_3', 'Stability', 'Стабильность', 'Shield duration +2s.', { shieldDuration: 2 }, ['s_prot_1']),
    node('protection', 2, 0, 's_prot_4', 'Reflective Shield', 'Отражающий Щит', '+12% Reflect, +5% Shield.', { shieldReflect: 12, shieldPercent: 5 }, ['s_prot_2']),
    node('protection', 3, 0, 's_prot_5', 'Aegis', 'Эгида', '+25% Shield, +5% DR.', { shieldPercent: 25, damageReduction: 5 }, ['s_prot_4']),
    node('protection', 3, 1, 's_prot_6', 'Mana Shield', 'Щит Маны', 'While shielded, spell corruption cost is halved.', { shieldAbsorbsCorruption: true, shieldPercent: 10 }, ['s_prot_3']),
    node('protection', 4, 0, 's_prot_7', 'Fortress', 'Крепость', '+25% Shield, +3% Regen.', { shieldPercent: 25, regenPercent: 3 }, ['s_prot_5']),
    node('protection', 5, 0, 's_prot_8', 'Immutable Shield', 'Несокрушимый Щит', '+35% Shield, +20% Reflect, +8% DR.', { shieldPercent: 35, shieldReflect: 20, damageReduction: 8 }, ['s_prot_7']),
    node('protection', 6, 0, 's_prot_9', 'Bulwark', 'Бастион', '+25% Shield, +15% Reflect, +10% DR.', { shieldPercent: 25, shieldReflect: 15, damageReduction: 10 }, ['s_prot_8']),
    node('protection', 7, 0, 's_prot_10', 'Eternal Guard', 'Вечная Стража', '+30% Shield, +16% Reflect, +7% DR, +2% Regen.', { shieldPercent: 30, shieldReflect: 16, damageReduction: 7, regenPercent: 2 }, ['s_prot_9']),

    node('knowledge', 0, 0, 's_know_1', 'Scholar', 'Учёный', '+15% Spell DMG.', { spellDamage: 15 }),
    node('knowledge', 1, 0, 's_know_2', 'Insight', 'Прозрение', '+10% Crit chance.', { critChance: 10 }, ['s_know_1']),
    node('knowledge', 1, 1, 's_know_3', 'Focus', 'Фокусировка', '+5% all DMG, +3% CDR.', { damagePercent: 5, cooldownReduction: 3 }, ['s_know_1']),
    node('knowledge', 2, 0, 's_know_4', 'Arcane Mastery', 'Владение Тайной', '+20% Spell DMG, +10% Crit.', { spellDamage: 20, critChance: 10 }, ['s_know_2']),
    node('knowledge', 3, 0, 's_know_5', 'Grandmaster', 'Грандмастер', '+20% Spell DMG.', { spellDamage: 20 }, ['s_know_4']),
    node('knowledge', 3, 1, 's_know_6', 'Enlightenment', 'Просвещение', '+10% Crit, +8% CDR.', { critChance: 10, cooldownReduction: 8 }, ['s_know_3']),
    node('knowledge', 4, 0, 's_know_7', 'Corruption Control', 'Контроль Коррупции', '+20 Corruption Max, +5% CDR.', { corruptionMax: 20, cooldownReduction: 5 }, ['s_know_5']),
    node('knowledge', 5, 0, 's_know_8', 'Omniscient', 'Всеведущий', '+25% Spell DMG, +15% Crit, +10% Crit DMG.', { spellDamage: 25, critChance: 15, critDamagePercent: 10 }, ['s_know_7']),
    node('knowledge', 6, 0, 's_know_9', 'Archmage', 'Архимаг', '+25% Spell DMG, +15% Crit, +8% CDR.', { spellDamage: 25, critChance: 15, cooldownReduction: 8 }, ['s_know_8']),
    node('knowledge', 7, 0, 's_know_10', 'Final Theory', 'Финальная Теория', '+30% Spell DMG, +20% Crit, +30 Corruption Max, +5% CDR.', { spellDamage: 30, critChance: 20, corruptionMax: 30, cooldownReduction: 5 }, ['s_know_9'])
];

export const ALCHEMIST_TALENTS = [
    node('acid', 0, 0, 'a_acid_1', 'Corrosive', 'Коррозия', '+15% Spell DMG, +4 DoT.', { spellDamage: 15, dotPower: 4 }),
    node('acid', 1, 0, 'a_acid_2', 'Dissolve', 'Растворение', '+15% Spell DMG.', { spellDamage: 15 }, ['a_acid_1']),
    node('acid', 1, 1, 'a_acid_3', 'Poison', 'Яд', 'DoT +6, DoT duration +2s.', { dotPower: 6, dotDuration: 2 }, ['a_acid_1']),
    node('acid', 2, 0, 'a_acid_4', 'Acid Rain', 'Кислотный Дождь', '+15% AoE DMG, -8% enemy armor.', { areaDamage: 15, armorReduction: 8 }, ['a_acid_2']),
    node('acid', 3, 0, 'a_acid_5', 'Melting Point', 'Точка Плавления', '+18% Spell DMG, +5 DoT.', { spellDamage: 18, dotPower: 5 }, ['a_acid_4']),
    node('acid', 3, 1, 'a_acid_6', 'Corrosion', 'Ржавчина', '-10% enemy armor, +3 DoT.', { armorReduction: 10, dotPower: 3 }, ['a_acid_3']),
    node('acid', 4, 0, 'a_acid_7', 'Pandemic', 'Пандемия', 'DoT spreads to a nearby enemy on kill.', { spellSpreadOnKill: true, spellDamage: 10 }, ['a_acid_5']),
    node('acid', 5, 0, 'a_acid_8', 'Corrosive Storm', 'Коррозийный Шторм', '+20% Spell DMG, +6 DoT, -8% armor.', { spellDamage: 20, dotPower: 6, armorReduction: 8 }, ['a_acid_7']),
    node('acid', 6, 0, 'a_acid_9', 'Dissolution', 'Растворение', '+20% Spell DMG, -12% armor, +6 DoT.', { spellDamage: 20, armorReduction: 12, dotPower: 6 }, ['a_acid_8']),
    node('acid', 7, 0, 'a_acid_10', 'Dissolving World', 'Растворяющий Мир', '+22% Spell DMG, +8 DoT, +3s DoT, -8% armor.', { spellDamage: 22, dotPower: 8, dotDuration: 3, armorReduction: 8 }, ['a_acid_9']),

    node('iron', 0, 0, 'a_iron_1', 'Hardened', 'Закалённый', '+10% DR, +10% Shield.', { damageReduction: 10, shieldPercent: 10 }),
    node('iron', 1, 0, 'a_iron_2', 'Thorns', 'Шипы', 'Shield reflects 10% of blocked damage.', { shieldReflect: 10 }, ['a_iron_1']),
    node('iron', 1, 1, 'a_iron_3', 'Fortify', 'Укрепление', 'Shield duration +3s.', { shieldDuration: 3 }, ['a_iron_1']),
    node('iron', 2, 0, 'a_iron_4', 'Steel Plating', 'Стальная Пластина', '+15% DR, +5% Shield.', { damageReduction: 15, shieldPercent: 5 }, ['a_iron_2']),
    node('iron', 3, 0, 'a_iron_5', 'Bastion', 'Бастион', '+20% DR, +5% Regen.', { damageReduction: 20, regenPercent: 5 }, ['a_iron_4']),
    node('iron', 3, 1, 'a_iron_6', 'Reflection', 'Отражение', '+15% Reflect, +5% DR.', { shieldReflect: 15, damageReduction: 5 }, ['a_iron_3']),
    node('iron', 4, 0, 'a_iron_7', 'Titan', 'Титан', '+25% DR, +8% Regen.', { damageReduction: 25, regenPercent: 8 }, ['a_iron_5']),
    node('iron', 5, 0, 'a_iron_8', 'Iron Titan', 'Железный Титан', '+25% DR, +15% Reflect, +7% Regen.', { damageReduction: 25, shieldReflect: 15, regenPercent: 7 }, ['a_iron_7']),
    node('iron', 6, 0, 'a_iron_9', 'Living Fortress', 'Живая Крепость', '+25% DR, +16% Reflect, +7% Regen.', { damageReduction: 25, shieldReflect: 16, regenPercent: 7 }, ['a_iron_8']),
    node('iron', 7, 0, 'a_iron_10', 'Colossus', 'Колосс', '+25% DR, +16% Reflect, +5% Regen, +15% Shield.', { damageReduction: 25, shieldReflect: 16, regenPercent: 5, shieldPercent: 15 }, ['a_iron_9']),

    node('potions', 0, 0, 'a_pot_1', 'Apothecary', 'Аптекарь', '+20% Heal Power, +2% Regen.', { healPower: 20, regenPercent: 2 }),
    node('potions', 1, 0, 'a_pot_2', 'Regenerative', 'Регенеративный', '+3% Regen, +5% HP.', { regenPercent: 3, hpPercent: 5 }, ['a_pot_1']),
    node('potions', 1, 1, 'a_pot_3', 'Potent', 'Мощный', '+20% Heal Power, heals restore +5% max HP.', { healPower: 20, healBonusHp: 5 }, ['a_pot_1']),
    node('potions', 2, 0, 'a_pot_4', 'Elixir', 'Эликсир', '+10% HP, +5% Heal Power.', { hpPercent: 10, healPower: 5 }, ['a_pot_2']),
    node('potions', 3, 0, 'a_pot_5', 'Master Brewer', 'Мастер Пивовар', '+25% Heal Power, +5% Regen.', { healPower: 25, regenPercent: 5 }, ['a_pot_4']),
    node('potions', 3, 1, 'a_pot_6', 'Vitality', 'Живучесть', '+12% HP, +5% Regen.', { hpPercent: 12, regenPercent: 5 }, ['a_pot_3']),
    node('potions', 4, 0, 'a_pot_7', 'Immortal Alchemist', 'Бессмертный Алхимик', 'Cheat death once per run. +10% Heal Power.', { cheatDeath: true, healPower: 10 }, ['a_pot_5']),
    node('potions', 5, 0, 'a_pot_8', 'Philosopher Stone', 'Философский Камень', '+30% Heal Power, +10% Regen, +15% HP.', { healPower: 30, regenPercent: 10, hpPercent: 15 }, ['a_pot_7']),
    node('potions', 6, 0, 'a_pot_9', 'Elixir Master', 'Мастер Эликсиров', '+25% Heal Power, +10% HP, +8% Regen.', { healPower: 25, hpPercent: 10, regenPercent: 8 }, ['a_pot_8']),
    node('potions', 7, 0, 'a_pot_10', 'Eternal Youth', 'Вечная Молодость', '+20% Heal Power, +15% HP, +8% Regen.', { healPower: 20, hpPercent: 15, regenPercent: 8 }, ['a_pot_9'])
];

export const ANGEL_TALENTS = [
    node('strike', 0, 0, 'g_strike_1', 'Smite', 'Кара', '+15% Spell DMG.', { spellDamage: 15 }),
    node('strike', 1, 0, 'g_strike_2', 'Divine Wrath', 'Божественный Гнев', '+15% Spell DMG, +8% Spell Speed.', { spellDamage: 15, spellSpeed: 8 }, ['g_strike_1']),
    node('strike', 1, 1, 'g_strike_3', 'Velocity', 'Скорость', '+12% Spell Speed, +5% Crit.', { spellSpeed: 12, critChance: 5 }, ['g_strike_1']),
    node('strike', 2, 0, 'g_strike_4', 'Piercing Light', 'Пронзающий Свет', 'Spell projectiles pierce through targets. +10% Spell DMG.', { spellPierce: true, spellDamage: 10 }, ['g_strike_2']),
    node('strike', 3, 0, 'g_strike_5', 'Judgement', 'Суд', '+20% Spell DMG, +8% Crit.', { spellDamage: 20, critChance: 8 }, ['g_strike_4']),
    node('strike', 3, 1, 'g_strike_6', 'Haste', 'Спешка', '+10% Crit, +8% Crit DMG.', { critChance: 10, critDamagePercent: 8 }, ['g_strike_3']),
    node('strike', 4, 0, 'g_strike_7', 'Holy Nova', 'Святой Взрыв', '+15% AoE DMG, +5% Spell Speed.', { areaDamage: 15, spellSpeed: 5 }, ['g_strike_5']),
    node('strike', 5, 0, 'g_strike_8', 'Annihilation', 'Аннигиляция', 'Spell hits echo to 1 nearby enemy. +10% Spell DMG.', { spellChain: 1, spellDamage: 10 }, ['g_strike_7']),
    node('strike', 6, 0, 'g_strike_9', 'Archangel', 'Архангел', '+25% Spell DMG, +15% Crit, +10% Spell Speed.', { spellDamage: 25, critChance: 15, spellSpeed: 10 }, ['g_strike_8']),
    node('strike', 7, 0, 'g_strike_10', 'Divine Decree', 'Божественный Приказ', '+30% Spell DMG, +20% Crit, +5% Crit DMG, +8% Spell Speed.', { spellDamage: 30, critChance: 20, critDamagePercent: 5, spellSpeed: 8 }, ['g_strike_9']),

    node('link', 0, 0, 'g_link_1', 'Bond', 'Связь', '+20% Life Link heal, +2% Regen.', { shieldPercent: 20, regenPercent: 2 }),
    node('link', 1, 0, 'g_link_2', 'Empathy', 'Эмпатия', '+20% Shield, +10% Life Steal.', { shieldPercent: 20, lifeSteal: 10 }, ['g_link_1']),
    node('link', 1, 1, 'g_link_3', 'Vampirism', 'Вампиризм', '+8% Life Steal, +5% HP.', { lifeSteal: 8, hpPercent: 5 }, ['g_link_1']),
    node('link', 2, 0, 'g_link_4', 'Siphon', 'Выкачивание', 'Shield absorbs 5% of blocked damage as healing. +10% Shield.', { shieldStealPercent: 5, shieldPercent: 10 }, ['g_link_2']),
    node('link', 3, 0, 'g_link_5', 'Parasite', 'Паразит', '+25% Shield, +10% Life Steal.', { shieldPercent: 25, lifeSteal: 10 }, ['g_link_4']),
    node('link', 3, 1, 'g_link_6', 'Regeneration', 'Регенерация', '+8% Regen, +8% HP.', { regenPercent: 8, hpPercent: 8 }, ['g_link_3']),
    node('link', 4, 0, 'g_link_7', 'Life Tap', 'Кран Жизни', '+10% Life Steal, +5% Regen.', { lifeSteal: 10, regenPercent: 5 }, ['g_link_5']),
    node('link', 5, 0, 'g_link_8', 'Life Warden', 'Хранитель Жизни', '+25% Shield, +12% Life Steal, +8% Regen.', { shieldPercent: 25, lifeSteal: 12, regenPercent: 8 }, ['g_link_7']),
    node('link', 6, 0, 'g_link_9', 'Life Eternal', 'Вечная Жизнь', '+25% Shield, +12% Life Steal, +10% Regen, +10% HP.', { shieldPercent: 25, lifeSteal: 12, regenPercent: 10, hpPercent: 10 }, ['g_link_8']),
    node('link', 7, 0, 'g_link_10', 'Eternal Bond', 'Вечная Связь', '+25% Shield, +20% HP, +8% Life Steal, +8% Regen.', { shieldPercent: 25, hpPercent: 20, lifeSteal: 8, regenPercent: 8 }, ['g_link_9']),

    node('purify', 0, 0, 'g_pur_1', 'Cleansing', 'Очищение', '+15 Purify heal, -12 Corruption.', { purifyHeal: 15, purifyCorReduce: 12 }),
    node('purify', 1, 0, 'g_pur_2', 'Purifying Flame', 'Очищающее Пламя', '+15 Purify heal, +8% Heal Power.', { purifyHeal: 15, healPower: 8 }, ['g_pur_1']),
    node('purify', 1, 1, 'g_pur_3', 'Catharsis', 'Катарсис', '-15 Corruption, Purify regen lasts +2s.', { purifyCorReduce: 15, purifyRegenDuration: 2 }, ['g_pur_1']),
    node('purify', 2, 0, 'g_pur_4', 'Sanctuary', 'Святилище', 'Purify regen lasts +3s, +8% HP.', { purifyRegenDuration: 3, hpPercent: 8 }, ['g_pur_2']),
    node('purify', 3, 0, 'g_pur_5', 'Sanctity', 'Святость', '+15 Purify heal, -15 Corruption.', { purifyHeal: 15, purifyCorReduce: 15 }, ['g_pur_4']),
    node('purify', 3, 1, 'g_pur_6', 'Mercy', 'Милосердие', '+10% HP, +8% Heal Power.', { hpPercent: 10, healPower: 8 }, ['g_pur_3']),
    node('purify', 4, 0, 'g_pur_7', 'Redemption', 'Искупление', 'Purify also grants a shield. +10 heal, -10 Corruption.', { purifyShield: true, purifyHeal: 10, purifyCorReduce: 10 }, ['g_pur_5']),
    node('purify', 5, 0, 'g_pur_8', 'Devotion', 'Преданность', '+20 Purify heal, -18 Corruption, +4s regen.', { purifyHeal: 20, purifyCorReduce: 18, purifyRegenDuration: 4 }, ['g_pur_7']),
    node('purify', 6, 0, 'g_pur_9', 'Holy Cleanser', 'Святой Очиститель', '+25 Purify heal, -22 Corruption, +5s regen, +12% HP.', { purifyHeal: 25, purifyCorReduce: 22, purifyRegenDuration: 5, hpPercent: 12 }, ['g_pur_8']),
    node('purify', 7, 0, 'g_pur_10', 'Divine Arbiter', 'Божественный Арбитр', '+30 Purify heal, -25 Corruption, +6s regen, +15% HP, +5% Heal Power.', { purifyHeal: 30, purifyCorReduce: 25, purifyRegenDuration: 6, hpPercent: 15, healPower: 5 }, ['g_pur_9'])
];

export const CLASS_TALENTS = {
    sage: SAGE_TALENTS,
    alchemist: ALCHEMIST_TALENTS,
    angel: ANGEL_TALENTS
};
