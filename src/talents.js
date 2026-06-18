export const TALENT_SCOPE = {
    ACCOUNT: 'account',
    CLASS: 'class'
};

export const CLASS_BRANCHES = {
    sage: [
        { key: 'fire',       name: 'Fire',       nameRu: 'Огонь',      nameDe: 'Feuer',     color: 0xe74c3c },
        { key: 'protection', name: 'Protection',  nameRu: 'Защита',     nameDe: 'Schutz',    color: 0x3498db },
        { key: 'knowledge',  name: 'Knowledge',   nameRu: 'Знание',     nameDe: 'Wissen',    color: 0x9b59b6 }
    ],
    alchemist: [
        { key: 'acid',    name: 'Acid',    nameRu: 'Кислота',  nameDe: 'Säure',   color: 0x27ae60 },
        { key: 'iron',    name: 'Iron',    nameRu: 'Железо',   nameDe: 'Eisen',   color: 0x95a5a6 },
        { key: 'potions', name: 'Potions', nameRu: 'Зелья',    nameDe: 'Tränke',  color: 0xe67e22 }
    ],
    angel: [
        { key: 'strike', name: 'Strike',  nameRu: 'Удар',     nameDe: 'Schlag',  color: 0xecf0f1 },
        { key: 'link',   name: 'Link',    nameRu: 'Связь',    nameDe: 'Bindung', color: 0xf1c40f },
        { key: 'purify', name: 'Purify',  nameRu: 'Очищение', nameDe: 'Reinigung', color: 0x9b59b6 }
    ]
};

export const SAGE_TALENTS = [
    // === FIRE BRANCH ===
    { id: 's_fire_1', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Ember', nameRu: 'Угольки', description: '+5% Fireball DMG. A small flame, a great beginning.', requires: [], effects: { spellDamage: 5, spellKey: 'fireball' } },
    { id: 's_fire_2', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Inferno', nameRu: 'Инферно', description: '+8% Fireball DMG. Flames grow hungry.', requires: ['s_fire_1'], effects: { spellDamage: 8, spellKey: 'fireball' } },
    { id: 's_fire_3', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Ignite', nameRu: 'Воспламенение', description: 'Fireball DoT +2. The fire lingers.', requires: ['s_fire_1'], effects: { dotPower: 2, spellKey: 'fireball' } },
    { id: 's_fire_4', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Firestorm', nameRu: 'Огненный Шторм', description: 'Fireball AoE +10%. Heat radiates outward.', requires: ['s_fire_2'], effects: { areaDamage: 10, spellKey: 'fireball' } },
    { id: 's_fire_5', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Combustion', nameRu: 'Горение', description: '+8% Spell DMG. All magic burns brighter.', requires: ['s_fire_3'], effects: { spellDamage: 8 } },
    { id: 's_fire_6', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Pyroblast', nameRu: 'Пиробласт', description: '+10% Fireball DMG, +3% Crit. Devastation incarnate.', requires: ['s_fire_4', 's_fire_5'], effects: { spellDamage: 10, critChance: 3, spellKey: 'fireball' } },
    { id: 's_fire_7', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Phoenix', nameRu: 'Феникс', description: 'Fireball pierces through targets.', requires: ['s_fire_6'], effects: { spellPierce: true, spellKey: 'fireball' } },
    { id: 's_fire_8', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 4, col: 1, name: 'Blaze', nameRu: 'Пламя', description: 'DoT duration +1s. Burns eternally.', requires: ['s_fire_6'], effects: { dotDuration: 1 } },
    { id: 's_fire_9', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Hellfire', nameRu: 'Адское Пламя', description: '+12% Fireball DMG. The underworld answers.', requires: ['s_fire_7', 's_fire_8'], effects: { spellDamage: 12, spellKey: 'fireball' } },
    { id: 's_fire_10', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Conflagration', nameRu: 'Пожар', description: 'Fireball applies burn to nearby enemies.', requires: ['s_fire_9'], effects: { spellSplashBurn: true, spellKey: 'fireball' } },
    { id: 's_fire_11', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Inferno Lord', nameRu: 'Повелитель Огня', description: '+15% Fireball, +8% Crit, DoT AoE.', requires: ['s_fire_10'], effects: { spellDamage: 15, critChance: 8, dotPower: 5, spellKey: 'fireball' } },
    { id: 's_fire_12', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Firelord', nameRu: 'Повелитель Пламени', description: '+18% Fireball DMG, +5% Spell Crit. The flame obeys.', requires: ['s_fire_11'], effects: { spellDamage: 18, critChance: 5, spellKey: 'fireball' } },
    { id: 's_fire_13', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Wildfire', nameRu: 'Дикий Огонь', description: 'Fireball DoT spreads to 1 nearby enemy.', requires: ['s_fire_11'], effects: { spellSplashBurn: true, dotPower: 3, spellKey: 'fireball' } },
    { id: 's_fire_14', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Eternal Flame', nameRu: 'Вечное Пламя', description: '+25% Fireball, +10% Crit, DoT +2s. Immortal fire.', requires: ['s_fire_12', 's_fire_13'], effects: { spellDamage: 25, critChance: 10, dotDuration: 2, spellKey: 'fireball' } },
    { id: 's_fire_15', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Cinder', nameRu: 'Зола', description: '+3% Spell DMG. Embers never truly die.', requires: ['s_fire_14'], effects: { spellDamage: 3 } },
    { id: 's_fire_16', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Scorch', nameRu: 'Ожог', description: '+2% Crit. Heat sharpens the senses.', requires: ['s_fire_14'], effects: { critChance: 2 } },
    { id: 's_fire_17', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Ash Cloud', nameRu: 'Пепельное Облако', description: '+4% Spell DMG, +1% Crit.', requires: ['s_fire_15'], effects: { spellDamage: 4, critChance: 1 } },
    { id: 's_fire_18', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Ember Shield', nameRu: 'Щит из Угля', description: '+3% DR. Heat protects.', requires: ['s_fire_16'], effects: { damageReduction: 3 } },
    { id: 's_fire_19', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Flame Core', nameRu: 'Огненное Ядро', description: '+5% Spell DMG, +2% Crit.', requires: ['s_fire_17', 's_fire_18'], effects: { spellDamage: 5, critChance: 2 } },
    { id: 's_fire_20', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Heat Wave', nameRu: 'Волна Жара', description: '+3% AoE, +2% Spell DMG.', requires: ['s_fire_17'], effects: { areaDamage: 3, spellDamage: 2 } },
    { id: 's_fire_21', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Searing Touch', nameRu: 'Жгучее Касание', description: '+4% Crit, +3% Crit DMG.', requires: ['s_fire_19'], effects: { critChance: 4, critDamagePercent: 3 } },
    { id: 's_fire_22', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Melt', nameRu: 'Плавление', description: '+3% Spell DMG, -2% enemy armor.', requires: ['s_fire_20'], effects: { spellDamage: 3, armorReduction: 2 } },
    { id: 's_fire_23', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Inferno Core', nameRu: 'Ядро Инферно', description: '+6% Spell DMG, +3% Crit, +2% CDR.', requires: ['s_fire_21', 's_fire_22'], effects: { spellDamage: 6, critChance: 3, cooldownReduction: 2 } },
    { id: 's_fire_24', branch: 'fire', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Everburn', nameRu: 'Вечное Горение', description: '+4% Spell DMG, DoT +1s.', requires: ['s_fire_21'], effects: { spellDamage: 4, dotDuration: 1 } },

    // === PROTECTION BRANCH ===
    { id: 's_prot_1', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Arcane Ward', nameRu: 'Тайная Защита', description: '+8% Shield absorption. Magic guards the worthy.', requires: [], effects: { shieldPercent: 8, spellKey: 'shield' } },
    { id: 's_prot_2', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Thorns', nameRu: 'Шипы', description: 'Shield reflects 3%. They hurt themselves.', requires: ['s_prot_1'], effects: { shieldReflect: 3 } },
    { id: 's_prot_3', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Stability', nameRu: 'Стабильность', description: 'Shield duration +0.5s. The ward holds.', requires: ['s_prot_1'], effects: { shieldDuration: 0.5, spellKey: 'shield' } },
    { id: 's_prot_4', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Reflective Shield', nameRu: 'Отражающий Щит', description: 'Shield reflects 5%. Pain returned.', requires: ['s_prot_2'], effects: { shieldReflect: 5 } },
    { id: 's_prot_5', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Absorption', nameRu: 'Поглощение', description: '+10% Shield. The barrier thickens.', requires: ['s_prot_3'], effects: { shieldPercent: 10, spellKey: 'shield' } },
    { id: 's_prot_6', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Mana Shield', nameRu: 'Щит Маны', description: 'Shield absorbs corruption damage.', requires: ['s_prot_4', 's_prot_5'], effects: { shieldAbsorbsCorruption: true } },
    { id: 's_prot_7', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Fortress', nameRu: 'Крепость', description: '+15% Shield, +1% Regen. An immovable wall.', requires: ['s_prot_6'], effects: { shieldPercent: 15, regenPercent: 1 } },
    { id: 's_prot_8', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Retribution', nameRu: 'Возмездие', description: 'Shield reflects 8%. Divine punishment.', requires: ['s_prot_7'], effects: { shieldReflect: 8 } },
    { id: 's_prot_9', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Aegis', nameRu: 'Эгида', description: '+20% Shield, +3% DR. The unbreakable guard.', requires: ['s_prot_8'], effects: { shieldPercent: 20, damageReduction: 3 } },
    { id: 's_prot_10', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Arcane Bulwark', nameRu: 'Тайный Бастион', description: '+25% Shield, +10% Reflect, +5% DR.', requires: ['s_prot_9'], effects: { shieldPercent: 25, shieldReflect: 10, damageReduction: 5 } },
    { id: 's_prot_11', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Shield Burst', nameRu: 'Взрыв Щита', description: 'Shield reflects 12%. Devastation on contact.', requires: ['s_prot_10'], effects: { shieldReflect: 12, shieldPercent: 15 } },
    { id: 's_prot_12', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Mana Barrier', nameRu: 'Барьер Маны', description: '+10% Shield, +5% DR. Magic reinforces magic.', requires: ['s_prot_10'], effects: { shieldPercent: 10, damageReduction: 5 } },
    { id: 's_prot_13', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Immutable Shield', nameRu: 'Несокрушимый Щит', description: '+30% Shield, +15% Reflect, +8% DR. Impenetrable.', requires: ['s_prot_11', 's_prot_12'], effects: { shieldPercent: 30, shieldReflect: 15, damageReduction: 8 } },
    { id: 's_prot_14', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Ward', nameRu: 'Страж', description: '+4% Shield. The ward strengthens.', requires: ['s_prot_13'], effects: { shieldPercent: 4 } },
    { id: 's_prot_15', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: '_spike', nameRu: 'Шип', description: '+2% Reflect. Small thorns, big pain.', requires: ['s_prot_13'], effects: { shieldReflect: 2 } },
    { id: 's_prot_16', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Barrier', nameRu: 'Барьер', description: '+5% Shield, +1% DR.', requires: ['s_prot_14'], effects: { shieldPercent: 5, damageReduction: 1 } },
    { id: 's_prot_17', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Bounce', nameRu: 'Отскок', description: '+3% Reflect, +1% Regen.', requires: ['s_prot_15'], effects: { shieldReflect: 3, regenPercent: 1 } },
    { id: 's_prot_18', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Stone Wall', nameRu: 'Каменная Стена', description: '+6% Shield, +2% DR.', requires: ['s_prot_16', 's_prot_17'], effects: { shieldPercent: 6, damageReduction: 2 } },
    { id: 's_prot_19', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Thorn Aura', nameRu: 'Аура Шипов', description: '+4% Reflect. Pain radiates.', requires: ['s_prot_16'], effects: { shieldReflect: 4 } },
    { id: 's_prot_20', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Fortify', nameRu: 'Укрепить', description: '+5% Shield, +3% DR, +1% Regen.', requires: ['s_prot_18'], effects: { shieldPercent: 5, damageReduction: 3, regenPercent: 1 } },
    { id: 's_prot_21', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Reflect All', nameRu: 'Отразить Всё', description: '+5% Reflect, +2% DR.', requires: ['s_prot_19'], effects: { shieldReflect: 5, damageReduction: 2 } },
    { id: 's_prot_22', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Eternal Guard', nameRu: 'Вечная Стража', description: '+8% Shield, +4% Reflect, +3% DR.', requires: ['s_prot_20', 's_prot_21'], effects: { shieldPercent: 8, shieldReflect: 4, damageReduction: 3 } },
    { id: 's_prot_23', branch: 'protection', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Regen Shield', nameRu: 'Реген Щит', description: '+5% Shield, +2% Regen.', requires: ['s_prot_20'], effects: { shieldPercent: 5, regenPercent: 2 } },

    // === KNOWLEDGE BRANCH ===
    { id: 's_know_1', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Scholar', nameRu: 'Учёный', description: '+3% Spell DMG. Knowledge empowers.', requires: [], effects: { spellDamage: 3 } },
    { id: 's_know_2', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Insight', nameRu: 'Прозрение', description: '+5% Crit. The wise see weakness.', requires: ['s_know_1'], effects: { critChance: 5 } },
    { id: 's_know_3', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Focus', nameRu: 'Фокусировка', description: '+5% Spell DMG. Concentrated power.', requires: ['s_know_1'], effects: { spellDamage: 5 } },
    { id: 's_know_4', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Arcane Mastery', nameRu: 'Владение Тайной', description: '+8% Spell DMG. The arcane bends to your will.', requires: ['s_know_2'], effects: { spellDamage: 8 } },
    { id: 's_know_5', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Weakness Analysis', nameRu: 'Анализ Слабостей', description: '+5% DMG vs all enemies. Knowledge is the ultimate weapon.', requires: ['s_know_3'], effects: { damagePercent: 5 } },
    { id: 's_know_6', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Enlightenment', nameRu: 'Просвещение', description: '+5% Crit, +3% CDR. Time slows for the enlightened.', requires: ['s_know_4', 's_know_5'], effects: { critChance: 5, cooldownReduction: 3 } },
    { id: 's_know_7', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Grandmaster', nameRu: 'Грандмастер', description: '+10% Spell DMG. Master of all schools.', requires: ['s_know_6'], effects: { spellDamage: 10 } },
    { id: 's_know_8', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Corruption Control', nameRu: 'Контроль Коррупции', description: '+15 Corruption Max. Embrace the darkness safely.', requires: ['s_know_7'], effects: { corruptionMax: 15 } },
    { id: 's_know_9', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Transcendence', nameRu: 'Трансценденция', description: '+12% Spell DMG, +8% Crit. Beyond mortal limits.', requires: ['s_know_8'], effects: { spellDamage: 12, critChance: 8 } },
    { id: 's_know_10', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Archmage', nameRu: 'Архимаг', description: '+15% Spell, +10% Crit, +5% CDR.', requires: ['s_know_9'], effects: { spellDamage: 15, critChance: 10, cooldownReduction: 5 } },
    { id: 's_know_11', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Arcane Overflow', nameRu: 'Тайное Изобилие', description: '+15% Spell DMG, +5% CDR. Magic overflows.', requires: ['s_know_10'], effects: { spellDamage: 15, cooldownReduction: 5 } },
    { id: 's_know_12', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Critical Mind', nameRu: 'Критический Разум', description: '+12% Crit, +10% Crit DMG. Sharper than any blade.', requires: ['s_know_10'], effects: { critChance: 12, critDamagePercent: 10 } },
    { id: 's_know_13', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Omniscient', nameRu: 'Всеведущий', description: '+20% Spell, +15% Crit, +8% CDR, +20 Cor Max.', requires: ['s_know_11', 's_know_12'], effects: { spellDamage: 20, critChance: 15, cooldownReduction: 8, corruptionMax: 20 } },
    { id: 's_know_14', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Lore', nameRu: 'Знание', description: '+3% Spell DMG. Knowledge is power.', requires: ['s_know_13'], effects: { spellDamage: 3 } },
    { id: 's_know_15', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Study', nameRu: 'Исследование', description: '+2% Crit. The mind sharpens.', requires: ['s_know_13'], effects: { critChance: 2 } },
    { id: 's_know_16', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Wisdom', nameRu: 'Мудрость', description: '+4% Spell DMG, +1% CDR.', requires: ['s_know_14'], effects: { spellDamage: 4, cooldownReduction: 1 } },
    { id: 's_know_17', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Perception', nameRu: 'Восприятие', description: '+3% Crit, +2% Crit DMG.', requires: ['s_know_15'], effects: { critChance: 3, critDamagePercent: 2 } },
    { id: 's_know_18', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Mind Over Matter', nameRu: 'Разум Важнее', description: '+5% Spell DMG, +2% CDR.', requires: ['s_know_16', 's_know_17'], effects: { spellDamage: 5, cooldownReduction: 2 } },
    { id: 's_know_19', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Deep Thought', nameRu: 'Глубокая Мысль', description: '+3% Crit, +3% Spell DMG.', requires: ['s_know_16'], effects: { critChance: 3, spellDamage: 3 } },
    { id: 's_know_20', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Enigma', nameRu: 'Загадка', description: '+4% Spell DMG, +3% Crit, +2% CDR.', requires: ['s_know_18'], effects: { spellDamage: 4, critChance: 3, cooldownReduction: 2 } },
    { id: 's_know_21', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Rune Master', nameRu: 'Мастер Рун', description: '+5% Spell DMG, +5 Cor Max.', requires: ['s_know_19'], effects: { spellDamage: 5, corruptionMax: 5 } },
    { id: 's_know_22', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Final Theory', nameRu: 'Финальная Теория', description: '+6% Spell DMG, +4% Crit, +3% CDR.', requires: ['s_know_20', 's_know_21'], effects: { spellDamage: 6, critChance: 4, cooldownReduction: 3 } },
    { id: 's_know_23', branch: 'knowledge', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Arcane Endurance', nameRu: 'Тайная Выносливость', description: '+4% Spell DMG, +10 Cor Max.', requires: ['s_know_20'], effects: { spellDamage: 4, corruptionMax: 10 } }
];

export const ALCHEMIST_TALENTS = [
    // === ACID BRANCH ===
    { id: 'a_acid_1', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Corrosive', nameRu: 'Коррозия', description: '+5% Acid Flask DMG. Dissolve all.', requires: [], effects: { spellDamage: 5, spellKey: 'acid_flask' } },
    { id: 'a_acid_2', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Dissolve', nameRu: 'Растворение', description: '+8% Acid Flask DMG. Flesh melts.', requires: ['a_acid_1'], effects: { spellDamage: 8, spellKey: 'acid_flask' } },
    { id: 'a_acid_3', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Poison', nameRu: 'Яд', description: 'Acid DoT +3. The burn never stops.', requires: ['a_acid_1'], effects: { dotPower: 3, spellKey: 'acid_flask' } },
    { id: 'a_acid_4', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Acid Rain', nameRu: 'Кислотный Дождь', description: 'Acid Flask AoE +10%. Corrosion from above.', requires: ['a_acid_2'], effects: { areaDamage: 10, spellKey: 'acid_flask' } },
    { id: 'a_acid_5', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Corrosion', nameRu: 'Ржавчина', description: '-3% enemy armor. Weaken the defense.', requires: ['a_acid_3'], effects: { armorReduction: 3 } },
    { id: 'a_acid_6', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Melting Point', nameRu: 'Точка Плавления', description: '+10% Acid Flask DMG. Everything melts.', requires: ['a_acid_4', 'a_acid_5'], effects: { spellDamage: 10, spellKey: 'acid_flask' } },
    { id: 'a_acid_7', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Pandemic', nameRu: 'Пандемия', description: 'Acid spreads on kill. Contagion.', requires: ['a_acid_6'], effects: { spellSpreadOnKill: true, spellKey: 'acid_flask' } },
    { id: 'a_acid_8', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 4, col: 1, name: 'Noxious', nameRu: 'Токсичный', description: 'DoT duration +1s. Prolonged suffering.', requires: ['a_acid_6'], effects: { dotDuration: 1 } },
    { id: 'a_acid_9', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Corrosive Storm', nameRu: 'Коррозийный Шторм', description: '+12% Acid Flask DMG. Acid fills the air.', requires: ['a_acid_7', 'a_acid_8'], effects: { spellDamage: 12, spellKey: 'acid_flask' } },
    { id: 'a_acid_10', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Dissolution', nameRu: 'Растворение', description: '-5% enemy armor. Nothing holds.', requires: ['a_acid_9'], effects: { armorReduction: 5 } },
    { id: 'a_acid_11', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Acid Master', nameRu: 'Мастер Кислот', description: '+15% Acid, DoT AoE, -8% enemy armor.', requires: ['a_acid_10'], effects: { spellDamage: 15, dotPower: 5, armorReduction: 8, spellKey: 'acid_flask' } },
    { id: 'a_acid_12', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Corrosive Haze', nameRu: 'Коррозийная Дымка', description: '+15% Acid DMG, -5% enemy armor. The air dissolves.', requires: ['a_acid_11'], effects: { spellDamage: 15, armorReduction: 5, spellKey: 'acid_flask' } },
    { id: 'a_acid_13', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Necrosis', nameRu: 'Некроз', description: 'DoT duration +2s, +5 DoT power. Tissue dies.', requires: ['a_acid_11'], effects: { dotDuration: 2, dotPower: 5 } },
    { id: 'a_acid_14', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Dissolving World', nameRu: 'Растворяющий Мир', description: '+20% Acid, -10% armor, DoT AoE. Everything dissolves.', requires: ['a_acid_12', 'a_acid_13'], effects: { spellDamage: 20, armorReduction: 10, dotPower: 8, spellKey: 'acid_flask' } },
    { id: 'a_acid_15', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Fumes', nameRu: 'Испарения', description: '+3% Acid DMG. The air corrodes.', requires: ['a_acid_14'], effects: { spellDamage: 3, spellKey: 'acid_flask' } },
    { id: 'a_acid_16', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Taint', nameRu: 'Зараза', description: '+2 DoT power. Slow decay.', requires: ['a_acid_14'], effects: { dotPower: 2 } },
    { id: 'a_acid_17', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Caustic', nameRu: 'Едкий', description: '+4% Acid DMG, -2% armor.', requires: ['a_acid_15'], effects: { spellDamage: 4, armorReduction: 2, spellKey: 'acid_flask' } },
    { id: 'a_acid_18', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Blister', nameRu: 'Пузырь', description: '+3 DoT, +1s DoT duration.', requires: ['a_acid_16'], effects: { dotPower: 3, dotDuration: 1 } },
    { id: 'a_acid_19', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Corrode All', nameRu: 'Кorrode Всё', description: '+5% Acid DMG, -3% armor.', requires: ['a_acid_17', 'a_acid_18'], effects: { spellDamage: 5, armorReduction: 3, spellKey: 'acid_flask' } },
    { id: 'a_acid_20', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Toxic Cloud', nameRu: 'Токсичное Облако', description: '+3% AoE, +2 DoT.', requires: ['a_acid_17'], effects: { areaDamage: 3, dotPower: 2 } },
    { id: 'a_acid_21', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Miasma', nameRu: 'Миазм', description: '+4% Acid DMG, DoT +1s, -2% armor.', requires: ['a_acid_19'], effects: { spellDamage: 4, dotDuration: 1, armorReduction: 2, spellKey: 'acid_flask' } },
    { id: 'a_acid_22', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Blight', nameRu: 'Болезнь', description: '+4 DoT, +3% Spell DMG.', requires: ['a_acid_20'], effects: { dotPower: 4, spellDamage: 3 } },
    { id: 'a_acid_23', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Plague Wind', nameRu: 'Моровой Ветер', description: '+6% Acid DMG, -4% armor, +3 DoT.', requires: ['a_acid_21', 'a_acid_22'], effects: { spellDamage: 6, armorReduction: 4, dotPower: 3, spellKey: 'acid_flask' } },
    { id: 'a_acid_24', branch: 'acid', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Acid Rain', nameRu: 'Кислотный Дождь', description: '+5% Acid DMG, +5% AoE.', requires: ['a_acid_21'], effects: { spellDamage: 5, areaDamage: 5, spellKey: 'acid_flask' } },

    // === IRON BRANCH ===
    { id: 'a_iron_1', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Hardened', nameRu: 'Закалённый', description: '+8% Iron Skin DR. Steel body, iron will.', requires: [], effects: { shieldPercent: 8, spellKey: 'iron_skin' } },
    { id: 'a_iron_2', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Thorns', nameRu: 'Шипы', description: 'Iron Skin reflects 3%. They break upon you.', requires: ['a_iron_1'], effects: { shieldReflect: 3 } },
    { id: 'a_iron_3', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Fortify', nameRu: 'Укрепление', description: 'Iron Skin duration +0.5s. Lasting protection.', requires: ['a_iron_1'], effects: { shieldDuration: 0.5, spellKey: 'iron_skin' } },
    { id: 'a_iron_4', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Steel Plating', nameRu: 'Стальная Пластина', description: '+10% Iron Skin DR. Heavier armor.', requires: ['a_iron_2'], effects: { shieldPercent: 10, spellKey: 'iron_skin' } },
    { id: 'a_iron_5', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Reflection', nameRu: 'Отражение', description: 'Iron Skin reflects 5%. Mirror image.', requires: ['a_iron_3'], effects: { shieldReflect: 5 } },
    { id: 'a_iron_6', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Iron Maiden', nameRu: 'Железная Дева', description: '+12% Iron Skin DR. The cage tightens.', requires: ['a_iron_4', 'a_iron_5'], effects: { shieldPercent: 12, spellKey: 'iron_skin' } },
    { id: 'a_iron_7', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Bastion', nameRu: 'Бастион', description: '+15% DR, +1% Regen. An unbreakable wall.', requires: ['a_iron_6'], effects: { damageReduction: 15, regenPercent: 1 } },
    { id: 'a_iron_8', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Retribution', nameRu: 'Возмездие', description: 'Iron Skin reflects 8%. Blood for blood.', requires: ['a_iron_7'], effects: { shieldReflect: 8 } },
    { id: 'a_iron_9', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Titan', nameRu: 'Титан', description: '+20% DR, +3% Regen. Colossal defense.', requires: ['a_iron_8'], effects: { damageReduction: 20, regenPercent: 3 } },
    { id: 'a_iron_10', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Iron Titan', nameRu: 'Железный Титан', description: '+25% DR, +10% Reflect, +5% Regen.', requires: ['a_iron_9'], effects: { damageReduction: 25, shieldReflect: 10, regenPercent: 5 } },
    { id: 'a_iron_11', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Thorns Aura', nameRu: 'Аура Шипов', description: '+12% Reflect, +5% DR. Pain radiates.', requires: ['a_iron_10'], effects: { shieldReflect: 12, damageReduction: 5 } },
    { id: 'a_iron_12', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Adamantine', nameRu: 'Адамантин', description: '+10% DR, +3% Regen. Harder than steel.', requires: ['a_iron_10'], effects: { damageReduction: 10, regenPercent: 3 } },
    { id: 'a_iron_13', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Living Fortress', nameRu: 'Живая Крепость', description: '+30% DR, +15% Reflect, +8% Regen. Unbreakable.', requires: ['a_iron_11', 'a_iron_12'], effects: { damageReduction: 30, shieldReflect: 15, regenPercent: 8 } },
    { id: 'a_iron_14', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Plate', nameRu: 'Пластина', description: '+3% DR. Steel upon steel.', requires: ['a_iron_13'], effects: { damageReduction: 3 } },
    { id: 'a_iron_15', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Barb', nameRu: 'Шип', description: '+2% Reflect. Small barbs draw blood.', requires: ['a_iron_13'], effects: { shieldReflect: 2 } },
    { id: 'a_iron_16', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Iron Skin', nameRu: 'Железная Кожа', description: '+4% DR, +1% Regen.', requires: ['a_iron_14'], effects: { damageReduction: 4, regenPercent: 1 } },
    { id: 'a_iron_17', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Razor', nameRu: 'Бритва', description: '+3% Reflect, +1% DR.', requires: ['a_iron_15'], effects: { shieldReflect: 3, damageReduction: 1 } },
    { id: 'a_iron_18', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Bulwark', nameRu: 'Бастион', description: '+5% DR, +2% Reflect, +1% Regen.', requires: ['a_iron_16', 'a_iron_17'], effects: { damageReduction: 5, shieldReflect: 2, regenPercent: 1 } },
    { id: 'a_iron_19', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Core', nameRu: 'Ядро', description: '+4% DR, +2% Regen.', requires: ['a_iron_16'], effects: { damageReduction: 4, regenPercent: 2 } },
    { id: 'a_iron_20', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Steel Heart', nameRu: 'Стальное Сердце', description: '+4% DR, +3% Reflect, +2% Regen.', requires: ['a_iron_18'], effects: { damageReduction: 4, shieldReflect: 3, regenPercent: 2 } },
    { id: 'a_iron_21', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Pain Return', nameRu: 'Возврат Боли', description: '+5% Reflect, +2% DR.', requires: ['a_iron_19'], effects: { shieldReflect: 5, damageReduction: 2 } },
    { id: 'a_iron_22', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Colossus', nameRu: 'Колосс', description: '+6% DR, +4% Reflect, +3% Regen.', requires: ['a_iron_20', 'a_iron_21'], effects: { damageReduction: 6, shieldReflect: 4, regenPercent: 3 } },
    { id: 'a_iron_23', branch: 'iron', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Endurance', nameRu: 'Выносливость', description: '+5% DR, +3% Regen.', requires: ['a_iron_20'], effects: { damageReduction: 5, regenPercent: 3 } },

    // === POTIONS BRANCH ===
    { id: 'a_pot_1', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Apothecary', nameRu: 'Аптекарь', description: '+8% Heal Power. Better brews, better results.', requires: [], effects: { healPower: 8 } },
    { id: 'a_pot_2', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Regenerative', nameRu: 'Регенеративный', description: '+1% HP/sec. The body heals itself.', requires: ['a_pot_1'], effects: { regenPercent: 1 } },
    { id: 'a_pot_3', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Potent', nameRu: 'Мощный', description: '+10% Heal Power. Stronger concoctions.', requires: ['a_pot_1'], effects: { healPower: 10 } },
    { id: 'a_pot_4', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Elixir', nameRu: 'Эликсир', description: 'Heal +5% max HP. True restoration.', requires: ['a_pot_2'], effects: { healBonusHp: 5 } },
    { id: 'a_pot_5', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Longevity', nameRu: 'Долголетие', description: '+5% HP. A healthy body endures.', requires: ['a_pot_3'], effects: { hpPercent: 5 } },
    { id: 'a_pot_6', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Rejuvenation', nameRu: 'Омоложение', description: '+2% HP/sec. Age reverses.', requires: ['a_pot_4', 'a_pot_5'], effects: { regenPercent: 2 } },
    { id: 'a_pot_7', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Master Brewer', nameRu: 'Мастер Пивовар', description: '+15% Heal Power. Perfection in every drop.', requires: ['a_pot_6'], effects: { healPower: 15 } },
    { id: 'a_pot_8', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Vitality', nameRu: 'Живучесть', description: '+10% HP, +3% Regen. Life finds a way.', requires: ['a_pot_7'], effects: { hpPercent: 10, regenPercent: 3 } },
    { id: 'a_pot_9', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Eternal Youth', nameRu: 'Вечная Молодость', description: '+20% Heal Power, +5% Regen. Defy time.', requires: ['a_pot_8'], effects: { healPower: 20, regenPercent: 5 } },
    { id: 'a_pot_10', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Immortal Alchemist', nameRu: 'Бессмертный Алхимик', description: '+25% Heal, +8% Regen. Cheat death once per run.', requires: ['a_pot_9'], effects: { healPower: 25, regenPercent: 8, cheatDeath: true } },
    { id: 'a_pot_11', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Potion Amplify', nameRu: 'Усиление Зелий', description: '+15% Heal Power, +3% Regen. Potent brews.', requires: ['a_pot_10'], effects: { healPower: 15, regenPercent: 3 } },
    { id: 'a_pot_12', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Vital Surge', nameRu: 'Прилив Жизни', description: '+12% HP, +5% Heal Power. Life surges within.', requires: ['a_pot_10'], effects: { hpPercent: 12, healPower: 5 } },
    { id: 'a_pot_13', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Philosopher Stone', nameRu: 'Философский Камень', description: '+30% Heal, +10% Regen, +15% HP. True immortality.', requires: ['a_pot_11', 'a_pot_12'], effects: { healPower: 30, regenPercent: 10, hpPercent: 15 } },
    { id: 'a_pot_14', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Brew', nameRu: 'Варка', description: '+3% Heal Power. Better recipes.', requires: ['a_pot_13'], effects: { healPower: 3 } },
    { id: 'a_pot_15', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Spring', nameRu: 'Источник', description: '+1% Regen. Water heals.', requires: ['a_pot_13'], effects: { regenPercent: 1 } },
    { id: 'a_pot_16', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Herbalism', nameRu: 'Травничество', description: '+4% Heal Power, +1% HP.', requires: ['a_pot_14'], effects: { healPower: 4, hpPercent: 1 } },
    { id: 'a_pot_17', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Vigor', nameRu: 'Бодрость', description: '+2% Regen, +2% HP.', requires: ['a_pot_15'], effects: { regenPercent: 2, hpPercent: 2 } },
    { id: 'a_pot_18', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Restoration', nameRu: 'Восстановление', description: '+5% Heal Power, +2% Regen.', requires: ['a_pot_16', 'a_pot_17'], effects: { healPower: 5, regenPercent: 2 } },
    { id: 'a_pot_19', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Health Boost', nameRu: 'Прилив Здоровья', description: '+4% HP, +2% Heal Power.', requires: ['a_pot_16'], effects: { hpPercent: 4, healPower: 2 } },
    { id: 'a_pot_20', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Transfusion', nameRu: 'Переливание', description: '+4% Heal Power, +3% Regen, +2% HP.', requires: ['a_pot_18'], effects: { healPower: 4, regenPercent: 3, hpPercent: 2 } },
    { id: 'a_pot_21', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Fortitude', nameRu: 'Стойкость', description: '+5% HP, +2% Regen.', requires: ['a_pot_19'], effects: { hpPercent: 5, regenPercent: 2 } },
    { id: 'a_pot_22', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Elixir Master', nameRu: 'Мастер Эликсиров', description: '+6% Heal Power, +4% Regen, +3% HP.', requires: ['a_pot_20', 'a_pot_21'], effects: { healPower: 6, regenPercent: 4, hpPercent: 3 } },
    { id: 'a_pot_23', branch: 'potions', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Vital Essence', nameRu: 'Жизненная Сила', description: '+5% HP, +3% Heal Power.', requires: ['a_pot_20'], effects: { hpPercent: 5, healPower: 3 } }
];

export const ANGEL_TALENTS = [
    // === STRIKE BRANCH ===
    { id: 'g_strike_1', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Smite', nameRu: 'Кара', description: '+5% Soul Strike DMG. Judgment falls.', requires: [], effects: { spellDamage: 5, spellKey: 'soul_strike' } },
    { id: 'g_strike_2', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Divine Wrath', nameRu: 'Божественный Гнев', description: '+8% Soul Strike DMG. Heaven strikes.', requires: ['g_strike_1'], effects: { spellDamage: 8, spellKey: 'soul_strike' } },
    { id: 'g_strike_3', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Velocity', nameRu: 'Скорость', description: 'Soul Strike speed +10%. Faster than thought.', requires: ['g_strike_1'], effects: { spellSpeed: 10, spellKey: 'soul_strike' } },
    { id: 'g_strike_4', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Piercing Light', nameRu: 'Пронзающий Свет', description: 'Soul Strike pierces. Light penetrates all.', requires: ['g_strike_2'], effects: { spellPierce: true, spellKey: 'soul_strike' } },
    { id: 'g_strike_5', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Haste', nameRu: 'Спешка', description: '+5% Crit. Swift and precise.', requires: ['g_strike_3'], effects: { critChance: 5 } },
    { id: 'g_strike_6', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Judgement', nameRu: 'Суд', description: '+10% Soul Strike DMG. The verdict is death.', requires: ['g_strike_4', 'g_strike_5'], effects: { spellDamage: 10, spellKey: 'soul_strike' } },
    { id: 'g_strike_7', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Holy Nova', nameRu: 'Святой Взрыв', description: 'Soul Strike AoE on hit. Light explodes.', requires: ['g_strike_6'], effects: { areaDamage: 10, spellKey: 'soul_strike' } },
    { id: 'g_strike_8', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 4, col: 1, name: 'Blinding', nameRu: 'Ослепление', description: '+8% Crit. They cannot see it coming.', requires: ['g_strike_6'], effects: { critChance: 8 } },
    { id: 'g_strike_9', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Wrath', nameRu: 'Гнев', description: '+12% Soul Strike DMG. Fury of the divine.', requires: ['g_strike_7', 'g_strike_8'], effects: { spellDamage: 12, spellKey: 'soul_strike' } },
    { id: 'g_strike_10', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Annihilation', nameRu: 'Аннигиляция', description: 'Soul Strike chains to 1 target. Judgment multiplies.', requires: ['g_strike_9'], effects: { spellChain: 1, spellKey: 'soul_strike' } },
    { id: 'g_strike_11', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Archangel', nameRu: 'Архангел', description: '+15% Soul Strike, +8% Crit, chain 2.', requires: ['g_strike_10'], effects: { spellDamage: 15, critChance: 8, spellChain: 2, spellKey: 'soul_strike' } },
    { id: 'g_strike_12', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Radiance', nameRu: 'Сияние', description: '+15% Soul Strike, +5% Crit. Light blinds.', requires: ['g_strike_11'], effects: { spellDamage: 15, critChance: 5, spellKey: 'soul_strike' } },
    { id: 'g_strike_13', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Holy Speed', nameRu: 'Святая Скорость', description: 'Soul Strike speed +15%, +5% Crit. Faster than light.', requires: ['g_strike_11'], effects: { spellSpeed: 15, critChance: 5, spellKey: 'soul_strike' } },
    { id: 'g_strike_14', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: "Angel's Decree", nameRu: 'Приказ Ангела', description: '+20% Soul Strike, +10% Crit, chain 3. Divine judgment.', requires: ['g_strike_12', 'g_strike_13'], effects: { spellDamage: 20, critChance: 10, spellChain: 3, spellKey: 'soul_strike' } },
    { id: 'g_strike_15', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Focus', nameRu: 'Фокус', description: '+3% Soul Strike DMG. Sharpen the blade.', requires: ['g_strike_14'], effects: { spellDamage: 3, spellKey: 'soul_strike' } },
    { id: 'g_strike_16', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Agility', nameRu: 'Ловкость', description: '+2% Crit. Swift strikes.', requires: ['g_strike_14'], effects: { critChance: 2 } },
    { id: 'g_strike_17', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Precision', nameRu: 'Точность', description: '+4% Soul Strike DMG, +1% Crit.', requires: ['g_strike_15'], effects: { spellDamage: 4, critChance: 1, spellKey: 'soul_strike' } },
    { id: 'g_strike_18', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Swiftness', nameRu: 'Быстрота', description: '+3% Crit, +5% Spell Speed.', requires: ['g_strike_16'], effects: { critChance: 3, spellSpeed: 5 } },
    { id: 'g_strike_19', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Divine Aim', nameRu: 'Божественный Прицел', description: '+5% Soul Strike DMG, +2% Crit.', requires: ['g_strike_17', 'g_strike_18'], effects: { spellDamage: 5, critChance: 2, spellKey: 'soul_strike' } },
    { id: 'g_strike_20', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Rapid Strike', nameRu: 'Быстрый Удар', description: '+8% Spell Speed, +2% Crit.', requires: ['g_strike_17'], effects: { spellSpeed: 8, critChance: 2 } },
    { id: 'g_strike_21', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Holy Edge', nameRu: 'Святой Клинок', description: '+4% Soul Strike DMG, +3% Crit, +3% Crit DMG.', requires: ['g_strike_19'], effects: { spellDamage: 4, critChance: 3, critDamagePercent: 3, spellKey: 'soul_strike' } },
    { id: 'g_strike_22', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Blitz', nameRu: 'Молния', description: '+5% Spell Speed, +3% Crit.', requires: ['g_strike_20'], effects: { spellSpeed: 5, critChance: 3 } },
    { id: 'g_strike_23', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Final Judgment', nameRu: 'Последний Суд', description: '+6% Soul Strike DMG, +4% Crit, +5% Crit DMG.', requires: ['g_strike_21', 'g_strike_22'], effects: { spellDamage: 6, critChance: 4, critDamagePercent: 5, spellKey: 'soul_strike' } },
    { id: 'g_strike_24', branch: 'strike', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Divine Speed', nameRu: 'Божественная Скорость', description: '+8% Spell Speed, +3% Crit.', requires: ['g_strike_21'], effects: { spellSpeed: 8, critChance: 3 } },

    // === LINK BRANCH ===
    { id: 'g_link_1', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Bond', nameRu: 'Связь', description: '+8% Life Link heal/sec. The connection deepens.', requires: [], effects: { shieldPercent: 8, spellKey: 'life_link' } },
    { id: 'g_link_2', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Empathy', nameRu: 'Эмпатия', description: '+10% Life Link heal/sec. Feel their pain.', requires: ['g_link_1'], effects: { shieldPercent: 10, spellKey: 'life_link' } },
    { id: 'g_link_3', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Vampirism', nameRu: 'Вампиризм', description: '2% Life Steal. Take life to give life.', requires: ['g_link_1'], effects: { lifeSteal: 2 } },
    { id: 'g_link_4', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Siphon', nameRu: 'Выкачивание', description: 'Life Link steals 3% enemy DMG. Drain the living.', requires: ['g_link_2'], effects: { shieldStealPercent: 3 } },
    { id: 'g_link_5', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Regeneration', nameRu: 'Регенерация', description: '+1% HP/sec. Constant renewal.', requires: ['g_link_3'], effects: { regenPercent: 1 } },
    { id: 'g_link_6', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Parasite', nameRu: 'Паразит', description: '+12% Life Link heal/sec. Feed on the enemy.', requires: ['g_link_4', 'g_link_5'], effects: { shieldPercent: 12, spellKey: 'life_link' } },
    { id: 'g_link_7', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Life Tap', nameRu: 'Кран Жизни', description: '5% Life Steal. All life is yours.', requires: ['g_link_6'], effects: { lifeSteal: 5 } },
    { id: 'g_link_8', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 4, col: 1, name: 'Fortitude', nameRu: 'Стойкость', description: '+8% HP. The vessel grows stronger.', requires: ['g_link_6'], effects: { hpPercent: 8 } },
    { id: 'g_link_9', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Devour', nameRu: 'Пожирание', description: '+15% Life Link, +3% Life Steal. Consume all.', requires: ['g_link_7', 'g_link_8'], effects: { shieldPercent: 15, lifeSteal: 3 } },
    { id: 'g_link_10', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Essence Drain', nameRu: 'Выкачивание Сущности', description: '+5% Life Steal, +3% Regen. Feed endlessly.', requires: ['g_link_9'], effects: { lifeSteal: 5, regenPercent: 3 } },
    { id: 'g_link_11', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Life Warden', nameRu: 'Хранитель Жизни', description: '+20% Life Link, +8% Life Steal, +5% Regen.', requires: ['g_link_10'], effects: { shieldPercent: 20, lifeSteal: 8, regenPercent: 5 } },
    { id: 'g_link_12', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Soul Harvest', nameRu: 'Жатва Душ', description: '+8% Life Steal, +3% Regen. Harvest the living.', requires: ['g_link_11'], effects: { lifeSteal: 8, regenPercent: 3 } },
    { id: 'g_link_13', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Vitality Bond', nameRu: 'Узы Жизни', description: '+15% Life Link, +8% HP. The bond strengthens.', requires: ['g_link_11'], effects: { shieldPercent: 15, hpPercent: 8 } },
    { id: 'g_link_14', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Life Eternal', nameRu: 'Вечная Жизнь', description: '+25% Life Link, +12% Steal, +8% Regen.', requires: ['g_link_12', 'g_link_13'], effects: { shieldPercent: 25, lifeSteal: 12, regenPercent: 8 } },
    { id: 'g_link_15', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Drain', nameRu: 'Сток', description: '+3% Life Steal. Take more.', requires: ['g_link_14'], effects: { lifeSteal: 3 } },
    { id: 'g_link_16', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Mend', nameRu: 'Исцеление', description: '+2% Regen. Heal faster.', requires: ['g_link_14'], effects: { regenPercent: 2 } },
    { id: 'g_link_17', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Leech', nameRu: 'Пиявка', description: '+4% Life Steal, +2% HP.', requires: ['g_link_15'], effects: { lifeSteal: 4, hpPercent: 2 } },
    { id: 'g_link_18', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Rejuvenate', nameRu: 'Омоложение', description: '+3% Regen, +3% HP.', requires: ['g_link_16'], effects: { regenPercent: 3, hpPercent: 3 } },
    { id: 'g_link_19', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Life Tap Plus', nameRu: 'Кран Жизни+', description: '+5% Life Steal, +3% Regen.', requires: ['g_link_17', 'g_link_18'], effects: { lifeSteal: 5, regenPercent: 3 } },
    { id: 'g_link_20', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Blood Bond', nameRu: 'Кровавая Связь', description: '+10% Life Link, +3% HP.', requires: ['g_link_17'], effects: { shieldPercent: 10, hpPercent: 3 } },
    { id: 'g_link_21', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Siphon Soul', nameRu: 'Выкачивание Души', description: '+4% Life Steal, +4% Regen, +2% HP.', requires: ['g_link_19'], effects: { lifeSteal: 4, regenPercent: 4, hpPercent: 2 } },
    { id: 'g_link_22', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Vital Surge', nameRu: 'Прилив Жизни', description: '+8% Life Link, +4% HP.', requires: ['g_link_20'], effects: { shieldPercent: 8, hpPercent: 4 } },
    { id: 'g_link_23', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Endless Life', nameRu: 'Бесконечная Жизнь', description: '+6% Life Steal, +5% Regen, +3% HP.', requires: ['g_link_21', 'g_link_22'], effects: { lifeSteal: 6, regenPercent: 5, hpPercent: 3 } },
    { id: 'g_link_24', branch: 'link', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Eternal Bond', nameRu: 'Вечная Связь', description: '+12% Life Link, +5% HP.', requires: ['g_link_21'], effects: { shieldPercent: 12, hpPercent: 5 } },

    // === PURIFY BRANCH ===
    { id: 'g_pur_1', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 0, col: 0, name: 'Cleansing', nameRu: 'Очищение', description: '+5 heal on Purify. The light cleanses.', requires: [], effects: { purifyHeal: 5 } },
    { id: 'g_pur_2', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 1, col: 0, name: 'Purifying Flame', nameRu: 'Очищающее Пламя', description: '+8 heal on Purify. Sacred fire burns.', requires: ['g_pur_1'], effects: { purifyHeal: 8 } },
    { id: 'g_pur_3', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 1, col: 1, name: 'Catharsis', nameRu: 'Катарсис', description: 'Purify -5 extra COR. Release the corruption.', requires: ['g_pur_1'], effects: { purifyCorReduce: 5 } },
    { id: 'g_pur_4', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 2, col: 0, name: 'Sanctuary', nameRu: 'Святилище', description: 'Purify grants 2s regen. A moment of peace.', requires: ['g_pur_2'], effects: { purifyRegenDuration: 2 } },
    { id: 'g_pur_5', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 2, col: 1, name: 'Redemption', nameRu: 'Искупление', description: '+8% Heal Power. Healing flows freely.', requires: ['g_pur_3'], effects: { healPower: 8 } },
    { id: 'g_pur_6', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 3, col: 0, name: 'Absolution', nameRu: 'Прощение', description: '+10 heal, -8 COR. Forgiveness costs nothing.', requires: ['g_pur_4', 'g_pur_5'], effects: { purifyHeal: 10, purifyCorReduce: 8 } },
    { id: 'g_pur_7', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 4, col: 0, name: 'Divine Grace', nameRu: 'Божественная Благодать', description: 'Purify grants 3s regen. Extended sanctuary.', requires: ['g_pur_6'], effects: { purifyRegenDuration: 3 } },
    { id: 'g_pur_8', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 4, col: 1, name: 'Mercy', nameRu: 'Милосердие', description: '+10% HP. Compassion strengthens.', requires: ['g_pur_6'], effects: { hpPercent: 10 } },
    { id: 'g_pur_9', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 5, col: 0, name: 'Grace', nameRu: 'Благодать', description: '+12 heal, -10 COR. Divine favor.', requires: ['g_pur_7', 'g_pur_8'], effects: { purifyHeal: 12, purifyCorReduce: 10 } },
    { id: 'g_pur_10', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 6, col: 0, name: 'Redemption', nameRu: 'Исход', description: 'Purify grants small shield. Light protects.', requires: ['g_pur_9'], effects: { purifyShield: true } },
    { id: 'g_pur_11', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 7, col: 0, name: 'Holy Cleanser', nameRu: 'Святой Очиститель', description: '+15 heal, -15 COR, regen + shield.', requires: ['g_pur_10'], effects: { purifyHeal: 15, purifyCorReduce: 15, purifyShield: true, purifyRegenDuration: 3 } },
    { id: 'g_pur_12', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 8, col: 0, name: 'Divine Shield', nameRu: 'Божественный Щит', description: '+12% heal, -12 COR. Light endures.', requires: ['g_pur_11'], effects: { purifyHeal: 12, purifyCorReduce: 12 } },
    { id: 'g_pur_13', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 8, col: 1, name: 'Consecration', nameRu: 'Освящение', description: 'Purify grants 4s regen, +10% HP. Sacred ground.', requires: ['g_pur_11'], effects: { purifyRegenDuration: 4, hpPercent: 10 } },
    { id: 'g_pur_14', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 9, col: 0, name: 'Divine Arbiter', nameRu: 'Божественный Арбитр', description: '+20 heal, -20 COR, regen + shield + 15% HP.', requires: ['g_pur_12', 'g_pur_13'], effects: { purifyHeal: 20, purifyCorReduce: 20, purifyShield: true, purifyRegenDuration: 4, hpPercent: 15 } },
    { id: 'g_pur_15', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 10, col: 0, name: 'Light Touch', nameRu: 'Касание Света', description: '+3 heal on Purify. Gentle light.', requires: ['g_pur_14'], effects: { purifyHeal: 3 } },
    { id: 'g_pur_16', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 10, col: 1, name: 'Cleanse', nameRu: 'Очищение', description: '-3 COR on Purify. Release the taint.', requires: ['g_pur_14'], effects: { purifyCorReduce: 3 } },
    { id: 'g_pur_17', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 11, col: 0, name: 'Holy Light', nameRu: 'Свет Святой', description: '+4 heal, +1% HP.', requires: ['g_pur_15'], effects: { purifyHeal: 4, hpPercent: 1 } },
    { id: 'g_pur_18', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 11, col: 1, name: 'Purify+', nameRu: 'Очищение+', description: '-4 COR, +1s regen duration.', requires: ['g_pur_16'], effects: { purifyCorReduce: 4, purifyRegenDuration: 1 } },
    { id: 'g_pur_19', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 12, col: 0, name: 'Radiance', nameRu: 'Сияние', description: '+5 heal, -5 COR, +2% HP.', requires: ['g_pur_17', 'g_pur_18'], effects: { purifyHeal: 5, purifyCorReduce: 5, hpPercent: 2 } },
    { id: 'g_pur_20', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 12, col: 1, name: 'Sanctify', nameRu: 'Освятить', description: '+3% Heal Power, +1s regen.', requires: ['g_pur_17'], effects: { healPower: 3, purifyRegenDuration: 1 } },
    { id: 'g_pur_21', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 13, col: 0, name: 'Divine Touch', nameRu: 'Божественное Касание', description: '+6 heal, -6 COR, +3% HP.', requires: ['g_pur_19'], effects: { purifyHeal: 6, purifyCorReduce: 6, hpPercent: 3 } },
    { id: 'g_pur_22', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 13, col: 1, name: 'Absolution+', nameRu: 'Прощение+', description: '+5% Heal Power, -5 COR.', requires: ['g_pur_20'], effects: { healPower: 5, purifyCorReduce: 5 } },
    { id: 'g_pur_23', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 14, col: 0, name: 'Celestial Grace', nameRu: 'Небесная Благодать', description: '+8 heal, -8 COR, +4% HP, +2s regen.', requires: ['g_pur_21', 'g_pur_22'], effects: { purifyHeal: 8, purifyCorReduce: 8, hpPercent: 4, purifyRegenDuration: 2 } },
    { id: 'g_pur_24', branch: 'purify', scope: TALENT_SCOPE.CLASS, row: 14, col: 1, name: 'Eternal Light', nameRu: 'Вечный Свет', description: '+6% Heal Power, +5 heal, -5 COR.', requires: ['g_pur_21'], effects: { healPower: 5, purifyHeal: 6, purifyCorReduce: 5 } }
];

export const CLASS_TALENTS = {
    sage: SAGE_TALENTS,
    alchemist: ALCHEMIST_TALENTS,
    angel: ANGEL_TALENTS
};

export function getTalentsForClass(classKey) {
    return CLASS_TALENTS[classKey] || SAGE_TALENTS;
}

export function getClassBranches(classKey) {
    return CLASS_BRANCHES[classKey] || CLASS_BRANCHES.sage;
}

export function getTalent(id) {
    for (const key in CLASS_TALENTS) {
        const found = CLASS_TALENTS[key].find(t => t.id === id);
        if (found) return found;
    }
    return null;
}

export function canUnlock(talentId, unlockedIds) {
    const talent = getTalent(talentId);
    if (!talent) return false;
    if (unlockedIds.includes(talentId)) return false;
    return talent.requires.every(req => unlockedIds.includes(req));
}

export function getTalentCost(row) {
    if (row <= 2) return 1;
    if (row <= 5) return 2;
    if (row <= 8) return 3;
    if (row <= 11) return 5;
    return 8;
}

export function getTalentEffects(unlockedIds) {
    const effects = {
        damagePercent: 0,
        damagePercentVs: {},
        critChance: 0,
        critDamagePercent: 0,
        corruptionMax: 0,
        spellDamage: 0,
        hpPercent: 0,
        healPower: 0,
        speedPercent: 0,
        revealHp: false,
        lifeSteal: 0,
        areaDamage: 0,
        bossDamagePercent: 0,
        damagePercentLowHp: 0,
        damagePercentFullHp: 0,
        regenPercent: 0,
        dodgePercent: 0,
        damageReduction: 0,
        damageReflection: 0,
        cooldownReduction: 0,
        moveSpeedPercent: 0,
        shieldPercent: 0,
        shieldReflect: 0,
        shieldDuration: 0,
        shieldAbsorbsCorruption: false,
        dotPower: 0,
        dotDuration: 0,
        spellPierce: false,
        spellChain: 0,
        spellSpeed: 0,
        spellSplashBurn: false,
        spellSpreadOnKill: false,
        armorReduction: 0,
        purifyHeal: 0,
        purifyCorReduce: 0,
        purifyRegenDuration: 0,
        purifyShield: false,
        healBonusHp: 0,
        shieldStealPercent: 0,
        cheatDeath: false,
        inventorySlots: 0
    };

    unlockedIds.forEach(id => {
        const t = getTalent(id);
        if (!t) return;
        const e = t.effects;
        for (const key in e) {
            if (effects[key] !== undefined) {
                if (typeof effects[key] === 'boolean') {
                    effects[key] = effects[key] || e[key];
                } else if (typeof effects[key] === 'number') {
                    effects[key] += e[key];
                } else if (typeof effects[key] === 'object') {
                    for (const k in e[key]) {
                        effects[key][k] = (effects[key][k] || 0) + e[key][k];
                    }
                }
            }
        }
    });

    return effects;
}
