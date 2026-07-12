export const MATERIAL_DB = [
    { id: 'wood',      name: 'Wood',      nameRu: 'Древесина',  nameDe: 'Holz',      rarity: 'common',   texKey: 'item_stick',  chance: 0.30, stats: { hp: 5 } },
    { id: 'stone',     name: 'Stone',     nameRu: 'Камень',     nameDe: 'Stein',     rarity: 'common',   texKey: 'item_stone',  chance: 0.28, stats: { dmg: 2 } },
    { id: 'leaf',      name: 'Leaf',      nameRu: 'Лист',       nameDe: 'Blatt',     rarity: 'common',   texKey: 'item_leaf',   chance: 0.22, stats: { speed: 10 } },
    { id: 'mushroom',  name: 'Mushroom',  nameRu: 'Гриб',       nameDe: 'Pilz',      rarity: 'uncommon', texKey: 'item_mush',   chance: 0.12, stats: { hp: 12, regen: 1 } },
    { id: 'herb',      name: 'Herb',      nameRu: 'Трава',      nameDe: 'Kraut',     rarity: 'uncommon', texKey: 'item_herb',   chance: 0.06, stats: { hp: 8, dmg: 3 } },
    { id: 'gem_shard', name: 'Gem Shard', nameRu: 'Осколок',    nameDe: 'Edelstein', rarity: 'rare',     texKey: 'item_ruby',   chance: 0.02, stats: { dmg: 5, hp: 10 } },
    { id: 'cave_silk',   name: 'Cave Silk',   nameRu: 'Пещерный Шёлк',   nameDe: 'Höhlenseide',      rarity: 'common',   texKey: 'item_leaf',   chance: 0.00, stats: { hp: 8 } },
    { id: 'cave_moss',   name: 'Cave Moss',   nameRu: 'Пещерный Мох',    nameDe: 'Höhlenmoos',       rarity: 'common',   texKey: 'item_mush',   chance: 0.00, stats: { regen: 2 } },
    { id: 'bat_wing',    name: 'Bat Wing',    nameRu: 'Крыло Летучей',   nameDe: 'Fledermausflügel', rarity: 'uncommon', texKey: 'item_leaf',   chance: 0.00, stats: { speed: 8 } },
    { id: 'dark_crystal', name: 'Dark Crystal', nameRu: 'Тёмный Кристалл', nameDe: 'Dunkler Kristall', rarity: 'rare',     texKey: 'item_ruby',   chance: 0.00, stats: { dmg: 8, hp: 15 } }
];

export const CAVE_MATERIALS = [
    { id: 'cave_silk',     name: 'Cave Silk',     nameRu: 'Пещерный Шёлк',      nameDe: 'Höhlenseide',      rarity: 'common',   texKey: 'item_leaf',   chance: 0.30, stats: { hp: 8 } },
    { id: 'cave_moss',     name: 'Cave Moss',     nameRu: 'Пещерный Мох',       nameDe: 'Höhlenmoos',       rarity: 'common',   texKey: 'item_mush',  chance: 0.25, stats: { regen: 2 } },
    { id: 'bat_wing',      name: 'Bat Wing',      nameRu: 'Крыло Летучей',      nameDe: 'Fledermausflügel', rarity: 'uncommon', texKey: 'item_leaf',   chance: 0.15, stats: { speed: 8 } },
    { id: 'dark_crystal',  name: 'Dark Crystal',  nameRu: 'Тёмный Кристалл',    nameDe: 'Dunkler Kristall', rarity: 'rare',     texKey: 'item_ruby',   chance: 0.05, stats: { dmg: 8, hp: 15 } }
];

export const VILLAGE_MATERIALS = [
    { id: 'village_wood',     name: 'Corrupted Wood',  nameRu: 'Заражённое Древо',   nameDe: 'Verdorbenes Holz',   rarity: 'common',   texKey: 'item_stick', chance: 0.30, stats: { hp: 10 } },
    { id: 'village_bone',     name: 'Village Bone',    nameRu: 'Кость Жителя',       nameDe: 'Dorfknochen',        rarity: 'common',   texKey: 'item_stone', chance: 0.25, stats: { dmg: 4 } },
    { id: 'village_essence',  name: 'Hell Essence',    nameRu: 'Адская Эссенция',    nameDe: 'Höllen-Essenz',      rarity: 'uncommon', texKey: 'item_ruby',  chance: 0.12, stats: { dmg: 6, hp: 10 } },
    { id: 'village_soul',     name: 'Cursed Soul',     nameRu: 'Проклятая Душа',     nameDe: 'Verfluchte Seele',   rarity: 'rare',     texKey: 'item_ruby',  chance: 0.04, stats: { hp: 20, dmg: 10 } }
];

export const EQUIP_DB = [
    { id: 'rusty_sword',    name: 'Rusty Sword',     nameRu: 'Ржавый Меч',      nameDe: 'Rostiges Schwert',   rarity: 'common',    slot: 'weapon',    texKey: 'item_stick',  chance: 0.30, stats: { dmg: 3 } },
    { id: 'iron_sword',     name: 'Iron Sword',      nameRu: 'Железный Меч',    nameDe: 'Eisenschwert',       rarity: 'uncommon',  slot: 'weapon',    texKey: 'item_iron',   chance: 0.18, stats: { dmg: 6 } },
    { id: 'leather_armor',  name: 'Leather Armor',   nameRu: 'Кожаная Броня',   nameDe: 'Lederpanzer',        rarity: 'common',    slot: 'armor',     texKey: 'item_leather',chance: 0.25, stats: { hp: 8 } },
    { id: 'iron_armor',     name: 'Iron Armor',      nameRu: 'Железная Броня',  nameDe: 'Eisenpanzer',        rarity: 'uncommon',  slot: 'armor',     texKey: 'item_stone',  chance: 0.15, stats: { hp: 15 } },
    { id: 'wood_ring',      name: 'Wood Ring',       nameRu: 'Деревянное Кольцо', nameDe: 'Holzring',         rarity: 'common',    slot: 'accessory', texKey: 'item_leaf',   chance: 0.22, stats: { hp: 5, speed: 2 } },
    { id: 'ruby_ring',      name: 'Ruby Ring',       nameRu: 'Рубиновое Кольцо', nameDe: 'Rubinring',        rarity: 'rare',      slot: 'accessory', texKey: 'item_ruby',   chance: 0.08, stats: { hp: 10, dmg: 5 } },
    { id: 'flame_blade',    name: 'Flame Blade',     nameRu: 'Пламенный Клинок', nameDe: 'Flammenklinge',     rarity: 'epic',      slot: 'weapon',    texKey: 'item_flame',  chance: 0.04, stats: { dmg: 12, crit: 3 } },
    { id: 'dragon_scale',   name: 'Dragon Scale',    nameRu: 'Чешуя Дракона',   nameDe: 'Drachenschuppe',     rarity: 'epic',      slot: 'armor',     texKey: 'item_dscale', chance: 0.03, stats: { hp: 25, dmg: 5 } },
    { id: 'sapphire_ring',  name: 'Sapphire Ring',   nameRu: 'Сапфировое Кольцо', nameDe: 'Saphirring',      rarity: 'rare',      slot: 'accessory', texKey: 'item_sapph',  chance: 0.06, stats: { hp: 8, dmg: 8, speed: 5 } },
    { id: 'crown',          name: 'Ancient Crown',   nameRu: 'Древняя Корона',  nameDe: 'Alte Krone',         rarity: 'legendary', slot: 'accessory', texKey: 'item_crown',  chance: 0.01, stats: { hp: 15, dmg: 10, speed: 10 } }
];

export const ACCOUNT_EQUIP_DB = [
    // === SAGE RARE ===
    { id: 'sage_hat',     name: 'Wise Cap',         nameRu: 'Мудрая Шапка',      nameDe: 'Weise Mütze',         rarity: 'rare',      slot: 'hat',      texKey: 'sage_hat',      chance: 0.30, stats: { hpPercent: 8, regenPercent: 3, dodgePercent: 2 } },
    { id: 'sage_mantle',  name: 'Arcane Mantle',    nameRu: 'Тайная Мантия',     nameDe: 'Geheimnisumantel',    rarity: 'rare',      slot: 'mantle',   texKey: 'sage_mantle',   chance: 0.25, stats: { spellPercent: 10, corruptionMax: 10 } },
    { id: 'sage_legs',    name: 'Traveler Leggings',nameRu: 'Штаны Путника',     nameDe: 'Wanderhose',          rarity: 'rare',      slot: 'legs',     texKey: 'sage_legs',     chance: 0.25, stats: { speedPercent: 8, dodgePercent: 5 } },
    { id: 'sage_ring',    name: 'Scholar Ring',      nameRu: 'Кольцо Учёного',     nameDe: 'Gelehrtenring',       rarity: 'rare',      slot: 'ring',     texKey: 'sage_ring',     chance: 0.30, stats: { spellPercent: 5, critPercent: 3 } },
    { id: 'sage_charm',   name: 'Tome Fragment',     nameRu: 'Фрагмент Тома',      nameDe: 'Tomb fragment',       rarity: 'rare',      slot: 'charm',    texKey: 'sage_charm',    chance: 0.30, stats: { hpPercent: 5, corruptionMax: 8, spellPercent: 3 } },

    // === SAGE EPIC ===
    { id: 'sage_book',    name: 'Grimoire of Shadows', nameRu: 'Гримуар Теней',  nameDe: 'Grimuar der Schatten', rarity: 'epic',   slot: 'weapon',   texKey: 'sage_book',     chance: 0.12, stats: { damagePercent: 15, critPercent: 5 }, effect: 'aoe_on_crit' },
    { id: 'sage_amulet',  name: 'Amulet of Foresight', nameRu: 'Амулет Предвидения', nameDe: 'Amulett der Vorschau', rarity: 'epic', slot: 'accessory', texKey: 'sage_amulet', chance: 0.08, stats: { expPercent: 8, lootPercent: 8, hpPercent: 8 }, effect: 'bonus_on_kill' },
    { id: 'sage_hat_e',   name: 'Mystic Crown',     nameRu: 'Мистическая Корона', nameDe: 'Mystische Krone',   rarity: 'epic',      slot: 'hat',      texKey: 'sage_hat',      chance: 0.08, stats: { hpPercent: 12, regenPercent: 5, dodgePercent: 3 } },
    { id: 'sage_mantle_e',name: 'Void Shroud',      nameRu: 'Покров Пустоты',   nameDe: 'Leere Schleier',      rarity: 'epic',      slot: 'mantle',   texKey: 'sage_mantle',   chance: 0.07, stats: { spellPercent: 15, corruptionMax: 20 } },
    { id: 'sage_legs_e',  name: 'Phase Walkers',    nameRu: 'Фазовые Шаги',     nameDe: 'Phasenläufer',        rarity: 'epic',      slot: 'legs',     texKey: 'sage_legs',     chance: 0.07, stats: { speedPercent: 12, dodgePercent: 8 } },
    { id: 'sage_ring_e',  name: 'Ring of Insight',   nameRu: 'Кольцо Прозрения',   nameDe: 'Ring der Einsicht',   rarity: 'epic',      slot: 'ring',     texKey: 'sage_ring',     chance: 0.08, stats: { spellPercent: 10, critPercent: 8 }, effect: 'crit_boost' },
    { id: 'sage_charm_e', name: 'Soul Cipher',       nameRu: 'Шифр Души',          nameDe: 'Seelencipher',        rarity: 'epic',      slot: 'charm',    texKey: 'sage_charm',    chance: 0.08, stats: { hpPercent: 10, corruptionMax: 15, spellPercent: 5 } },

    // === SAGE LEGENDARY ===
    { id: 'sage_book_l',  name: 'Tome of Eternal Wisdom', nameRu: 'Том Вечной Мудрости', nameDe: 'Buch der Ewigen Weisheit', rarity: 'legendary', slot: 'weapon', texKey: 'sage_book', chance: 0.03, stats: { damagePercent: 25, critPercent: 10 }, effect: 'triple_strike' },
    { id: 'sage_amulet_l',name: 'Necklace of the Sage', nameRu: 'Ожерелье Мудреца', nameDe: 'Halskette des Weisen',    rarity: 'legendary', slot: 'accessory', texKey: 'sage_amulet', chance: 0.02, stats: { expPercent: 12, lootPercent: 12, hpPercent: 10 }, effect: 'resurrection' },

    // === ALCHEMIST RARE ===
    { id: 'alch_hat',     name: "Alchemist's Hood",  nameRu: 'Капюшон Алхимика',   nameDe: 'Alchemistenhut',      rarity: 'rare',      slot: 'hat',      texKey: 'alch_hat',      chance: 0.30, stats: { hpPercent: 10, damageReduction: 5 } },
    { id: 'alch_mantle',  name: 'Transmutation Robe',nameRu: 'Мантия Трансмутации', nameDe: 'Transmutationsrobe', rarity: 'rare',      slot: 'mantle',   texKey: 'alch_mantle',   chance: 0.25, stats: { spellPercent: 8, hpPercent: 8 } },
    { id: 'alch_legs',    name: 'Boots of Endurance',nameRu: 'Сапоги Выносливости', nameDe: 'Ausdauerstiefel',   rarity: 'rare',      slot: 'legs',     texKey: 'alch_legs',     chance: 0.25, stats: { speedPercent: 6, hpPercent: 10 } },
    { id: 'alch_ring',    name: 'Alchemist Band',    nameRu: 'Кольцо Алхимика',    nameDe: 'Alchemistenband',     rarity: 'rare',      slot: 'ring',     texKey: 'alch_ring',     chance: 0.30, stats: { damagePercent: 5, hpPercent: 5 } },
    { id: 'alch_charm',   name: 'Reagent Pouch',     nameRu: 'Мешочек с Реагентом', nameDe: 'Reagenztasche',     rarity: 'rare',      slot: 'charm',    texKey: 'alch_charm',    chance: 0.30, stats: { hpPercent: 8, damagePercent: 5, regenPercent: 2 } },

    // === ALCHEMIST EPIC ===
    { id: 'alch_wand',    name: 'Corrosive Wand',    nameRu: 'Коррозийная Палочка', nameDe: 'Korrosionsstab',    rarity: 'epic',      slot: 'weapon',   texKey: 'alch_wand',     chance: 0.12, stats: { damagePercent: 12, critPercent: 5 }, effect: 'armor_shred' },
    { id: 'alch_amulet',  name: "Philosopher's Stone", nameRu: 'Камень Философа',  nameDe: 'Stein der Weisen',   rarity: 'epic',      slot: 'accessory', texKey: 'alch_amulet',  chance: 0.08, stats: { damagePercent: 8, spellPercent: 8, hpPercent: 5 }, effect: 'transmute_on_kill' },
    { id: 'alch_hat_e',   name: 'Crown of Potency',  nameRu: 'Корона Мощи',        nameDe: 'Krone der Macht',    rarity: 'epic',      slot: 'hat',      texKey: 'alch_hat',      chance: 0.08, stats: { hpPercent: 15, damageReduction: 8 } },
    { id: 'alch_mantle_e',name: 'Volatile Shroud',   nameRu: 'Нестабильный Покров', nameDe: 'Instabiler Schleier', rarity: 'epic',     slot: 'mantle',   texKey: 'alch_mantle',   chance: 0.07, stats: { spellPercent: 12, hpPercent: 10 } },
    { id: 'alch_legs_e',  name: 'Greaves of the Forge', nameRu: 'Поножи Горнила',  nameDe: 'Schienbein des Ofens', rarity: 'epic',    slot: 'legs',     texKey: 'alch_legs',     chance: 0.07, stats: { speedPercent: 10, hpPercent: 12 } },
    { id: 'alch_ring_e',  name: 'Transmutation Ring', nameRu: 'Кольцо Трансмутации', nameDe: 'Transmutationsring', rarity: 'epic',    slot: 'ring',     texKey: 'alch_ring',     chance: 0.08, stats: { damagePercent: 10, spellPercent: 5 }, effect: 'dot_on_hit' },
    { id: 'alch_charm_e', name: 'Volatile Essence',   nameRu: 'Нестабильная Эссенция', nameDe: 'Flüchtige Essenz', rarity: 'epic', slot: 'charm',    texKey: 'alch_charm',    chance: 0.08, stats: { hpPercent: 12, damagePercent: 8 } },

    // === ALCHEMIST LEGENDARY ===
    { id: 'alch_wand_l',  name: 'Alembic of Eternity', nameRu: 'Аламбик Вечности', nameDe: 'Alembik der Ewigkeit', rarity: 'legendary', slot: 'weapon', texKey: 'alch_wand', chance: 0.03, stats: { damagePercent: 20, critPercent: 8, spellPercent: 8 }, effect: 'poison_explosion' },
    { id: 'alch_amulet_l',name: 'Blessing of the Flask', nameRu: 'Благословение Фляги', nameDe: 'Segen der Flasche', rarity: 'legendary', slot: 'accessory', texKey: 'alch_amulet', chance: 0.02, stats: { hpPercent: 15, damagePercent: 12, spellPercent: 8 }, effect: 'heal_on_kill' },

    // === ANGEL RARE ===
    { id: 'angel_hat',    name: 'Halo of Grace',     nameRu: 'Нимб Благодати',     nameDe: 'Halo der Gnade',      rarity: 'rare',      slot: 'hat',      texKey: 'angel_hat',      chance: 0.30, stats: { hpPercent: 8, regenPercent: 5, dodgePercent: 3 } },
    { id: 'angel_mantle', name: 'Wings of Light',    nameRu: 'Крылья Света',       nameDe: 'Flügel des Lichts',   rarity: 'rare',      slot: 'mantle',   texKey: 'angel_mantle',   chance: 0.25, stats: { speedPercent: 8, dodgePercent: 8 } },
    { id: 'angel_legs',   name: 'Swift Sandals',     nameRu: 'Лёгкие Сандалии',    nameDe: 'Schnelle Sandalen',   rarity: 'rare',      slot: 'legs',     texKey: 'angel_legs',     chance: 0.25, stats: { speedPercent: 10, dodgePercent: 5 } },
    { id: 'angel_ring',   name: 'Ring of Devotion',  nameRu: 'Кольцо Преданности', nameDe: 'Ring der Hingabe',    rarity: 'rare',      slot: 'ring',     texKey: 'angel_ring',    chance: 0.30, stats: { hpPercent: 5, regenPercent: 3, dodgePercent: 3 } },
    { id: 'angel_charm',  name: 'Holy Symbol',        nameRu: 'Священный Символ',   nameDe: 'Heiliges Symbol',     rarity: 'rare',      slot: 'charm',    texKey: 'angel_charm',   chance: 0.30, stats: { hpPercent: 5, dodgePercent: 5, regenPercent: 2 } },

    // === ANGEL EPIC ===
    { id: 'angel_staff',  name: 'Smite Staff',       nameRu: 'Посох Карателя',     nameDe: 'Bestrafungsstab',     rarity: 'epic',      slot: 'weapon',   texKey: 'angel_staff',    chance: 0.12, stats: { damagePercent: 12, spellPercent: 10 }, effect: 'holy_damage' },
    { id: 'angel_amulet', name: 'Soul Pendant',      nameRu: 'Подвеска Души',      nameDe: 'Seelenanhänger',      rarity: 'epic',      slot: 'accessory', texKey: 'angel_amulet',  chance: 0.08, stats: { hpPercent: 10, corruptionMax: 15, spellPercent: 5 }, effect: 'heal_on_hit' },
    { id: 'angel_hat_e',  name: 'Crown of Devotion', nameRu: 'Корона Преданности', nameDe: 'Krone der Hingabe',   rarity: 'epic',      slot: 'hat',      texKey: 'angel_hat',      chance: 0.08, stats: { hpPercent: 12, regenPercent: 8, dodgePercent: 5 } },
    { id: 'angel_mantle_e',name: 'Aegis Shroud',     nameRu: 'Покров Щита',       nameDe: 'Schildschleier',      rarity: 'epic',      slot: 'mantle',   texKey: 'angel_mantle',   chance: 0.07, stats: { speedPercent: 10, dodgePercent: 10 }, effect: 'dodge_heal' },
    { id: 'angel_legs_e', name: 'Boots of Ascension', nameRu: 'Сапоги Вознесения', nameDe: 'Stiefel der Himmelfahrt', rarity: 'epic', slot: 'legs', texKey: 'angel_legs', chance: 0.07, stats: { speedPercent: 15, dodgePercent: 8 } },
    { id: 'angel_ring_e', name: 'Covenant Ring',     nameRu: 'Кольцо Завета',      nameDe: 'Bundesring',          rarity: 'epic',      slot: 'ring',     texKey: 'angel_ring',    chance: 0.08, stats: { hpPercent: 10, regenPercent: 8 }, effect: 'regen_on_low' },
    { id: 'angel_charm_e',name: 'Ward of Grace',     nameRu: 'Оберег Благодати',   nameDe: 'Wächter der Gnade',   rarity: 'epic',      slot: 'charm',    texKey: 'angel_charm',    chance: 0.08, stats: { hpPercent: 12, dodgePercent: 10 } },

    // === ANGEL LEGENDARY ===
    { id: 'angel_staff_l',name: 'Judgment Scepter',  nameRu: 'Жезл Суда',          nameDe: 'Urteilszepter',       rarity: 'legendary', slot: 'weapon',   texKey: 'angel_staff',    chance: 0.03, stats: { damagePercent: 18, spellPercent: 15, critPercent: 8 }, effect: 'smite_chain' },
    { id: 'angel_amulet_l',name: 'Tear of the Angel', nameRu: 'Слеза Ангела',      nameDe: 'Träne des Engels',    rarity: 'legendary', slot: 'accessory', texKey: 'angel_amulet',  chance: 0.02, stats: { hpPercent: 15, regenPercent: 10, corruptionMax: 20 }, effect: 'divine_shield_proc' }
];

export const ACCOUNT_EQUIP_DB_CAVE = [
    { id: 'relic_cave_sage',     name: 'Relic of Depths',       nameRu: 'Реликвия Глубин',      nameDe: 'Reliktiefe',          rarity: 'legendary', slot: 'relic', texKey: 'relic_sage',   chance: 0.33, stats: {}, effect: 'fireball_chain', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_cave_alchemist', name: 'Relic of Fermentation', nameRu: 'Реликвия Брожения',   nameDe: 'Reliktgärung',        rarity: 'legendary', slot: 'relic', texKey: 'relic_alchemist',   chance: 0.33, stats: {}, effect: 'craft_bonus',   classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_cave_angel',    name: 'Relic of Grace',        nameRu: 'Реликвия Благодати',   nameDe: 'Reliktder Gnade',     rarity: 'legendary', slot: 'relic', texKey: 'relic_angel', chance: 0.34, stats: {}, effect: 'purify_heal',  classes: ['angel'], locked: true, relic: true }
];
export const CAVE_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const DEPTHS_MATERIALS = [
    { id: 'bone_dust',       name: 'Bone Dust',       nameRu: 'Костяная Пыль',      nameDe: 'Knochenstaub',       rarity: 'common',   texKey: 'item_stone',  chance: 0.28, stats: { hp: 10 } },
    { id: 'grave_moss',      name: 'Grave Moss',      nameRu: 'Могильный Мох',      nameDe: 'Grabmoos',           rarity: 'common',   texKey: 'item_mush',  chance: 0.24, stats: { regen: 3 } },
    { id: 'shadow_essence',  name: 'Shadow Essence',  nameRu: 'Теневая Эссенция',   nameDe: 'Schattenessenz',     rarity: 'uncommon', texKey: 'item_ruby',  chance: 0.14, stats: { speed: 10 } },
    { id: 'cursed_iron',     name: 'Cursed Iron',     nameRu: 'Проклятое Железо',   nameDe: 'Verfluchtes Eisen',  rarity: 'uncommon', texKey: 'item_stone', chance: 0.12, stats: { dmg: 6, hp: 8 } },
    { id: 'necrotic_flesh',  name: 'Necrotic Flesh',  nameRu: 'Некротическая Плоть', nameDe: 'Nekrotisches Fleisch', rarity: 'uncommon', texKey: 'item_mush', chance: 0.10, stats: { hp: 12, dmg: 4 } },
    { id: 'spectral_silk',   name: 'Spectral Silk',   nameRu: 'Спектральный Шёлк',  nameDe: 'Spektralseide',      rarity: 'uncommon', texKey: 'item_leaf',  chance: 0.08, stats: { speed: 8, dodge: 2 } },
    { id: 'dark_rune',       name: 'Dark Rune',       nameRu: 'Тёмная Руна',        nameDe: 'Dunkle Rune',        rarity: 'rare',     texKey: 'item_ruby',  chance: 0.05, stats: { dmg: 8, spellPercent: 3 } },
    { id: 'death_cap',       name: 'Death Cap',       nameRu: 'Шляпка Смерти',      nameDe: 'Todespilz',          rarity: 'uncommon', texKey: 'item_mush',  chance: 0.08, stats: { hp: 10, regen: 2 } },
    { id: 'soul_shard',      name: 'Soul Shard',      nameRu: 'Осколок Души',       nameDe: 'Seelescherbe',       rarity: 'rare',     texKey: 'item_ruby',  chance: 0.04, stats: { dmg: 10, hp: 15 } },
    { id: 'blood_crystal',   name: 'Blood Crystal',   nameRu: 'Кровавый Кристалл',  nameDe: 'Blutkristall',       rarity: 'rare',     texKey: 'item_ruby',  chance: 0.03, stats: { hp: 18, dmg: 8 } },
    { id: 'void_essence',    name: 'Void Essence',    nameRu: 'Эссенция Пустоты',   nameDe: 'Leereessenz',        rarity: 'rare',     texKey: 'item_ruby',  chance: 0.02, stats: { dmg: 12, speed: 5 } }
];

export const ACCOUNT_EQUIP_DB_DEPTHS = [
    { id: 'relic_depths_sage',      name: 'Relic of the Void',    nameRu: 'Реликвия Пустоты',    nameDe: 'Relikt der Leere',     rarity: 'legendary', slot: 'relic', texKey: 'relic_sage',   chance: 0.33, stats: {}, effect: 'chain_shadow', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_depths_alchemist', name: 'Relic of Decay',       nameRu: 'Реликвия Разложения', nameDe: 'Relikt des Verfalls',  rarity: 'legendary', slot: 'relic', texKey: 'relic_alchemist',   chance: 0.33, stats: {}, effect: 'necro_craft',   classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_depths_angel',     name: 'Relic of Judgment',    nameRu: 'Реликвия Суда',       nameDe: 'Relikt des Urteils',   rarity: 'legendary', slot: 'relic', texKey: 'relic_angel', chance: 0.34, stats: {}, effect: 'purify_mass',  classes: ['angel'], locked: true, relic: true }
];
export const DEPTHS_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const DEPTHS_CHEST_DROP_ITEMS = [
    { id: 'depths_ring',   name: 'Catacomb Signet',   nameRu: 'Печать Катакомб',   nameDe: 'Katakombensignet',   rarity: 'uncommon', slot: 'accessory', texKey: 'item_crown',  chance: 0.40, stats: { hpPercent: 4, damagePercent: 3 } },
    { id: 'depths_amulet', name: 'Lich\'s Pendant',   nameRu: 'Подвеска Лича',      nameDe: 'Lich-Anhänger',      rarity: 'rare',     slot: 'accessory', texKey: 'item_ruby',   chance: 0.35, stats: { spellPercent: 6, critPercent: 4 } },
    { id: 'depths_cloak',  name: 'Shadow Wraps',      nameRu: 'Теневые Покровы',    nameDe: 'Schattenhüllen',     rarity: 'uncommon', slot: 'armor',     texKey: 'item_dscale', chance: 0.25, stats: { hpPercent: 6, speedPercent: 3 } }
];

export const CURSED_MATERIALS = [
    { id: 'swamp_moss',     name: 'Swamp Moss',     nameRu: 'Болотный Мох',       nameDe: 'Sumpfmoos',         rarity: 'common',   texKey: 'item_mush',  chance: 0.26, stats: { regen: 3 } },
    { id: 'poison_sac',     name: 'Poison Sac',     nameRu: 'Ядовитый Мешок',     nameDe: 'Giftsack',          rarity: 'common',   texKey: 'item_mush',  chance: 0.22, stats: { dmg: 5 } },
    { id: 'bog_iron',       name: 'Bog Iron',       nameRu: 'Болотная Руда',      nameDe: 'Moorerz',           rarity: 'uncommon', texKey: 'item_stone', chance: 0.14, stats: { hp: 12, dmg: 4 } },
    { id: 'venom_sac',      name: 'Venom Sac',      nameRu: 'Ядовитая Железа',    nameDe: 'Giftsack',          rarity: 'uncommon', texKey: 'item_mush',  chance: 0.12, stats: { dmg: 8 } },
    { id: 'thorn_wood',     name: 'Thorn Wood',     nameRu: 'Терновое Древо',     nameDe: 'Dornholz',          rarity: 'uncommon', texKey: 'item_stick', chance: 0.10, stats: { hp: 10, speed: 5 } },
    { id: 'cursed_sap',     name: 'Cursed Sap',     nameRu: 'Проклятый Сок',      nameDe: 'Verfluchter Saft',  rarity: 'uncommon', texKey: 'item_mush',  chance: 0.08, stats: { hp: 15, regen: 2 } },
    { id: 'death_dust',     name: 'Death Dust',     nameRu: 'Пыль Смерти',        nameDe: 'Todesstaub',        rarity: 'rare',     texKey: 'item_ruby',  chance: 0.05, stats: { dmg: 10, spellPercent: 3 } },
    { id: 'grave_iron',     name: 'Grave Iron',     nameRu: 'Могильное Железо',   nameDe: 'Grabeseisen',       rarity: 'rare',     texKey: 'item_stone', chance: 0.04, stats: { hp: 18, damageReduction: 2 } },
    { id: 'soul_essence',   name: 'Soul Essence',   nameRu: 'Эссенция Души',      nameDe: 'Seelessenz',        rarity: 'rare',     texKey: 'item_ruby',  chance: 0.03, stats: { dmg: 12, hp: 12 } },
    { id: 'holy_shard',     name: 'Holy Shard',     nameRu: 'Священный Осколок',  nameDe: 'Heiliger Splitter', rarity: 'rare',     texKey: 'item_ruby',  chance: 0.03, stats: { hp: 20, regenPercent: 2 } },
    { id: 'corrupt_essence', name: 'Corrupt Essence', nameRu: 'Тёмная Эссенция',  nameDe: 'Dunkle Essenz',     rarity: 'rare',     texKey: 'item_ruby',  chance: 0.02, stats: { dmg: 14, spellPercent: 4 } },
    { id: 'ancient_idol',   name: 'Ancient Idol',   nameRu: 'Древний Идол',       nameDe: 'Uraltes Idol',      rarity: 'rare',     texKey: 'item_ruby',  chance: 0.02, stats: { hp: 25, dmg: 10, speed: 5 } }
];

export const ACCOUNT_EQUIP_DB_CURSED = [
    { id: 'relic_cursed_sage',      name: 'Relic of Decay',      nameRu: 'Реликвия Разложения',  nameDe: 'Relikt des Verfalls',   rarity: 'legendary', slot: 'relic', texKey: 'relic_sage',   chance: 0.33, stats: {}, effect: 'chain_poison', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_cursed_alchemist', name: 'Relic of Plague',     nameRu: 'Реликвия Чумы',        nameDe: 'Relikt der Pest',       rarity: 'legendary', slot: 'relic', texKey: 'relic_alchemist',   chance: 0.33, stats: {}, effect: 'poison_craft', classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_cursed_angel',     name: 'Relic of Purification', nameRu: 'Реликвия Очищения',   nameDe: 'Relikt der Läuterung',  rarity: 'legendary', slot: 'relic', texKey: 'relic_angel', chance: 0.34, stats: {}, effect: 'cleanse_aoe', classes: ['angel'], locked: true, relic: true }
];
export const CURSED_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const CURSED_CHEST_DROP_ITEMS = [
    { id: 'cursed_ring',   name: 'Swamp Signet',     nameRu: 'Болотная Печать',    nameDe: 'Sumpfsignet',       rarity: 'uncommon', slot: 'accessory', texKey: 'item_crown',  chance: 0.40, stats: { hpPercent: 5, damagePercent: 3 } },
    { id: 'cursed_amulet', name: 'Corrupt Amulet',   nameRu: 'Проклятый Амулет',   nameDe: 'Verfluchtes Amulett', rarity: 'rare',    slot: 'accessory', texKey: 'item_ruby',   chance: 0.35, stats: { spellPercent: 7, critPercent: 4 } },
    { id: 'cursed_cloak',  name: 'Mire Cloak',       nameRu: 'Плащ Болота',        nameDe: 'Sumpfumhang',        rarity: 'uncommon', slot: 'armor',     texKey: 'item_dscale', chance: 0.25, stats: { hpPercent: 7, speedPercent: 3 } }
];

export const SHADOW_MATERIALS = [
    { id: 'void_dust',       name: 'Void Dust',       nameRu: 'Пыль Пустоты',      nameDe: 'Leerenstaub',        rarity: 'common',   texKey: 'item_stone',  chance: 0.24, stats: { dmg: 5 } },
    { id: 'shadow_essence',  name: 'Shadow Essence',  nameRu: 'Теневая Эссенция',  nameDe: 'Schattenessenz',     rarity: 'common',   texKey: 'item_ruby',  chance: 0.20, stats: { speed: 8 } },
    { id: 'abyss_shard',     name: 'Abyss Shard',     nameRu: 'Осколок Бездны',    nameDe: 'Abgrundsplitter',    rarity: 'uncommon', texKey: 'item_ruby',  chance: 0.14, stats: { dmg: 8, hp: 10 } },
    { id: 'dark_ink',        name: 'Dark Ink',        nameRu: 'Чёрнила Тьмы',      nameDe: 'Dunkle Tinte',       rarity: 'uncommon', texKey: 'item_stone', chance: 0.12, stats: { spellPercent: 3 } },
    { id: 'forbidden_page',  name: 'Forbidden Page',  nameRu: 'Запретная Страница', nameDe: 'Verbotene Seite',   rarity: 'uncommon', texKey: 'item_leaf',  chance: 0.10, stats: { spellPercent: 4, critPercent: 2 } },
    { id: 'shadow_crystal',  name: 'Shadow Crystal',  nameRu: 'Теневой Кристалл',  nameDe: 'Schattenkristall',   rarity: 'uncommon', texKey: 'item_ruby',  chance: 0.08, stats: { hp: 15, dmg: 6 } },
    { id: 'mirror_fragment', name: 'Mirror Fragment', nameRu: 'Осколок Зеркала',   nameDe: 'Spiegelscherbe',     rarity: 'rare',     texKey: 'item_ruby',  chance: 0.05, stats: { dodgePercent: 3, speed: 5 } },
    { id: 'shade_essence',   name: 'Shade Essence',   nameRu: 'Эссенция Призрака', nameDe: 'Schattenessenz',     rarity: 'rare',     texKey: 'item_ruby',  chance: 0.04, stats: { dmg: 10, spellPercent: 4 } },
    { id: 'cracked_gem',     name: 'Cracked Gem',     nameRu: 'Треснувший Самоцвет', nameDe: 'Rissiger Edelstein', rarity: 'rare',  texKey: 'item_ruby',  chance: 0.03, stats: { hp: 20, dmg: 8 } },
    { id: 'rift_core',       name: 'Rift Core',       nameRu: 'Ядро Разлома',      nameDe: 'Risskern',           rarity: 'rare',     texKey: 'item_ruby',  chance: 0.03, stats: { dmg: 12, speed: 8 } },
    { id: 'portal_stone',    name: 'Portal Stone',    nameRu: 'Камень Портала',    nameDe: 'Portalstein',        rarity: 'rare',     texKey: 'item_ruby',  chance: 0.02, stats: { hp: 25, spellPercent: 5 } },
    { id: 'dimension_essence', name: 'Dimension Essence', nameRu: 'Эссенция Измерения', nameDe: 'Dimensionsessenz', rarity: 'rare', texKey: 'item_ruby', chance: 0.02, stats: { hp: 30, dmg: 12, speed: 5 } }
];

export const ACCOUNT_EQUIP_DB_SHADOW = [
    { id: 'relic_shadow_sage',      name: 'Relic of Shadows',    nameRu: 'Реликвия Теней',      nameDe: 'Relikt der Schatten',   rarity: 'legendary', slot: 'relic', texKey: 'relic_sage',   chance: 0.33, stats: {}, effect: 'shadow_chain', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_shadow_alchemist', name: 'Relic of Reflection', nameRu: 'Реликвия Отражения',  nameDe: 'Relikt der Reflexion',  rarity: 'legendary', slot: 'relic', texKey: 'relic_alchemist',   chance: 0.33, stats: {}, effect: 'mirror_craft', classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_shadow_angel',     name: 'Relic of Light',      nameRu: 'Реликвия Света',      nameDe: 'Relikt des Lichts',     rarity: 'legendary', slot: 'relic', texKey: 'relic_angel', chance: 0.34, stats: {}, effect: 'holy_shatter', classes: ['angel'], locked: true, relic: true }
];
export const SHADOW_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const SHADOW_CHEST_DROP_ITEMS = [
    { id: 'shadow_ring',   name: 'Void Signet',     nameRu: 'Печать Пустоты',    nameDe: 'Leerensignet',       rarity: 'uncommon', slot: 'accessory', texKey: 'item_crown',  chance: 0.40, stats: { hpPercent: 6, damagePercent: 4 } },
    { id: 'shadow_amulet', name: 'Shadow Pendant',  nameRu: 'Теневая Подвеска',  nameDe: 'Schattenanhänger',   rarity: 'rare',     slot: 'accessory', texKey: 'item_ruby',   chance: 0.35, stats: { spellPercent: 8, critPercent: 5 } },
    { id: 'shadow_cloak',  name: 'Void Wrap',       nameRu: 'Покров Пустоты',   nameDe: 'Leerenschleier',     rarity: 'uncommon', slot: 'armor',     texKey: 'item_dscale', chance: 0.25, stats: { hpPercent: 8, speedPercent: 4 } }
];

export const TOWER_MATERIALS = [
    { id: 'ancient_steel',      name: 'Ancient Steel',      nameRu: 'Древняя Сталь',       nameDe: 'Uralter Stahl',       rarity: 'common',   texKey: 'item_stone',  chance: 0.22, stats: { hp: 8, dmg: 4 } },
    { id: 'royal_dust',         name: 'Royal Dust',         nameRu: 'Королевская Пыль',    nameDe: 'Königlicher Staub',   rarity: 'common',   texKey: 'item_stone',  chance: 0.18, stats: { dmg: 6 } },
    { id: 'crown_jewel',        name: 'Crown Jewel',        nameRu: 'Корона Самоцвет',     nameDe: 'Kronjuwel',           rarity: 'uncommon', texKey: 'item_ruby',   chance: 0.14, stats: { hp: 12, spellPercent: 3 } },
    { id: 'tower_rune',         name: 'Tower Rune',         nameRu: 'Башенная Руна',      nameDe: 'Turmrune',            rarity: 'uncommon', texKey: 'item_ruby',   chance: 0.12, stats: { spellPercent: 4, critPercent: 2 } },
    { id: 'dark_counsel_ink',   name: 'Dark Counsel Ink',   nameRu: 'Чёрнила Тёмного Совета', nameDe: 'Dunkle Ratstinte',  rarity: 'uncommon', texKey: 'item_stone', chance: 0.10, stats: { spellPercent: 5 } },
    { id: 'noble_blood',        name: 'Noble Blood',        nameRu: 'Кровь Аристократа',   nameDe: 'Adelsblut',           rarity: 'uncommon', texKey: 'item_ruby',   chance: 0.08, stats: { hp: 15, regenPercent: 2 } },
    { id: 'shadow_advisor_essence', name: 'Shadow Advisor Essence', nameRu: 'Эссенция Тень-Советника', nameDe: 'Schattenratsessenz', rarity: 'rare', texKey: 'item_ruby', chance: 0.05, stats: { dmg: 10, spellPercent: 4 } },
    { id: 'paladin_oath',       name: 'Paladin Oath',       nameRu: 'Клятва Паладина',    nameDe: 'Paladin Eid',          rarity: 'rare',     texKey: 'item_ruby',   chance: 0.04, stats: { hp: 20, damageReduction: 3 } },
    { id: 'kings_tear',         name: 'King\'s Tear',       nameRu: 'Слеза Короля',       nameDe: 'Träne des Königs',    rarity: 'rare',     texKey: 'item_ruby',   chance: 0.03, stats: { hp: 25, dmg: 10, regenPercent: 3 } },
    { id: 'tower_heart',        name: 'Tower Heart',        nameRu: 'Сердце Башни',       nameDe: 'Turmherz',            rarity: 'rare',     texKey: 'item_ruby',   chance: 0.02, stats: { hp: 30, dmg: 12, spellPercent: 5 } }
];

export const ACCOUNT_EQUIP_DB_TOWER = [
    { id: 'relic_tower_sage',      name: 'Relic of the Crown',   nameRu: 'Реликвия Короны',     nameDe: 'Relikt der Krone',    rarity: 'legendary', slot: 'relic', texKey: 'relic_sage',   chance: 0.33, stats: {}, effect: 'arcane_crown', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_tower_alchemist', name: 'Relic of the Forge',   nameRu: 'Реликвия Горнила',    nameDe: 'Relikt des Schmieds', rarity: 'legendary', slot: 'relic', texKey: 'relic_alchemist',   chance: 0.33, stats: {}, effect: 'tower_craft', classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_tower_angel',     name: 'Relic of the Oath',    nameRu: 'Реликвия Клятвы',     nameDe: 'Relikt des Eids',     rarity: 'legendary', slot: 'relic', texKey: 'relic_angel', chance: 0.34, stats: {}, effect: 'holy_oath', classes: ['angel'], locked: true, relic: true }
];
export const TOWER_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const ACCOUNT_EQUIP_DB_THRONE = [
    { id: 'relic_throne_sage',      name: 'Relic of Eternity',    nameRu: 'Реликвия Вечности',   nameDe: 'Relikt der Ewigkeit',  rarity: 'legendary', slot: 'relic', texKey: 'relic_sage',   chance: 0.33, stats: {}, effect: 'eternal_wisdom', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_throne_alchemist', name: 'Relic of Transmutation', nameRu: 'Реликвия Трансмутации', nameDe: 'Relikt der Transmutation', rarity: 'legendary', slot: 'relic', texKey: 'relic_alchemist',   chance: 0.33, stats: {}, effect: 'eternal_craft', classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_throne_angel',     name: 'Relic of Grace',       nameRu: 'Реликвия Благодати',  nameDe: 'Relikt der Gnade',    rarity: 'legendary', slot: 'relic', texKey: 'relic_angel', chance: 0.34, stats: {}, effect: 'eternal_grace', classes: ['angel'], locked: true, relic: true }
];
export const THRONE_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const TOWER_CHEST_DROP_ITEMS = [
    { id: 'tower_ring',   name: 'Royal Signet',    nameRu: 'Королевская Печать',  nameDe: 'Königssignet',     rarity: 'uncommon', slot: 'accessory', texKey: 'item_crown',  chance: 0.40, stats: { hpPercent: 7, damagePercent: 5 } },
    { id: 'tower_amulet', name: 'King\'s Pendant', nameRu: 'Подвеска Короля',    nameDe: 'Königsanhänger',   rarity: 'rare',     slot: 'accessory', texKey: 'item_ruby',   chance: 0.35, stats: { spellPercent: 9, critPercent: 6 } },
    { id: 'tower_cloak',  name: 'Royal Mantle',    nameRu: 'Королевская Мантия', nameDe: 'Königsumhang',     rarity: 'uncommon', slot: 'armor',     texKey: 'item_dscale', chance: 0.25, stats: { hpPercent: 9, speedPercent: 5 } }
];

// Throne of Eternity unique loot
export const CROWN_OF_ETERNITY = {
    id: 'crown_of_eternity', name: 'Crown of Eternity', nameRu: 'Корона Вечности', nameDe: 'Krone der Ewigkeit',
    rarity: 'legendary', slot: 'accessory', texKey: 'item_crown',
    stats: { hpPercent: 10, damagePercent: 8, spellPercent: 5 },
    locked: true,
    description: 'A crown that transcends time. Grants immense power.',
    descriptionRu: 'Корона, превосходящая время. Дарует огромную силу.',
    descriptionDe: 'Eine Krone, die die Zeit überwindet. Verleiht immense Macht.'
};
export const SWORD_OF_ETERNITY = {
    id: 'sword_of_eternity', name: 'Sword of Eternity', nameRu: 'Меч Вечности', nameDe: 'Schwert der Ewigkeit',
    rarity: 'legendary', slot: 'weapon', texKey: 'item_flame',
    stats: { damagePercent: 12, critPercent: 6 },
    locked: true,
    description: 'A blade forged in the space between moments. Cuts through reality.',
    descriptionRu: 'Клинок, выкованный в пространстве между мгновениями. Разрезает реальность.',
    descriptionDe: 'Eine Klinge, geschmieden im Raum zwischen Momenten. Schneidet durch die Realität.'
};
export const AMULET_OF_ETERNITY = {
    id: 'amulet_of_eternity', name: 'Amulet of Eternity', nameRu: 'Амулет Вечности', nameDe: 'Amulett der Ewigkeit',
    rarity: 'legendary', slot: 'accessory', texKey: 'item_ruby',
    stats: { hpPercent: 8, regenPercent: 5, spellPercent: 4 },
    locked: true,
    description: 'An amulet that pulses with the heartbeat of eternity. Enhances all attributes.',
    descriptionRu: 'Амулет, пульсирующий с сердцебиением вечности. Усиливает все характеристики.',
    descriptionDe: 'Ein Amulett, das mit dem Herzschlag der Ewigkeit pulsiert. Verstärkt alle Attribute.'
};

// === NEW ZONE ITEMS (30 total) ===

// Depths items (12: 4 rare + 4 epic + 4 legendary)
export const DEPTHS_NEW_ITEMS = [
    // Rare
    { id: 'bone_cleaver', name: 'Bone Cleaver', nameRu: 'Костяной Тесак', nameDe: 'Knochenhauer', rarity: 'rare', slot: 'weapon', texKey: 'bone_cleaver', chance: 0.15, stats: { damagePercent: 8, critPercent: 2 } },
    { id: 'crypt_plate', name: 'Crypt Plate', nameRu: 'Криптовая Пластина', nameDe: 'Kryptoplatte', rarity: 'rare', slot: 'armor', texKey: 'bone_armor', chance: 0.12, stats: { hpPercent: 10, damageReduction: 3 } },
    { id: 'bone_hat', name: 'Skull Cap', nameRu: 'Черепной Шлем', nameDe: 'Schädelhelm', rarity: 'rare', slot: 'hat', texKey: 'bone_hat', chance: 0.12, stats: { hpPercent: 5, damageReduction: 2 } },
    { id: 'bone_ring', name: 'Death Ring', nameRu: 'Кольцо Смерти', nameDe: 'Todesring', rarity: 'rare', slot: 'ring', texKey: 'bone_ring', chance: 0.10, stats: { damagePercent: 5, critPercent: 2 } },
    // Epic
    { id: 'bone_staff', name: 'Bone Staff', nameRu: 'Костяной Посох', nameDe: 'Knochenstab', rarity: 'epic', slot: 'weapon', texKey: 'bone_staff', chance: 0.08, stats: { spellPercent: 12, critPercent: 4 } },
    { id: 'bone_shield', name: 'Bone Shield', nameRu: 'Костяной Щит', nameDe: 'Knochenschild', rarity: 'epic', slot: 'armor', texKey: 'bone_shield', chance: 0.07, stats: { hpPercent: 15, damageReduction: 6 } },
    { id: 'bone_mantle', name: 'Bone Mantle', nameRu: 'Костяная Мантия', nameDe: 'Knochenmantel', rarity: 'epic', slot: 'mantle', texKey: 'bone_mantle', chance: 0.07, stats: { hpPercent: 8, spellPercent: 5 } },
    { id: 'bone_legs', name: 'Bone Greaves', nameRu: 'Костяные Поножи', nameDe: 'Knochenschienen', rarity: 'epic', slot: 'legs', texKey: 'bone_legs', chance: 0.07, stats: { speedPercent: 4, dodgePercent: 3 } },
    // Legendary
    { id: 'bone_amulet', name: 'Bone Amulet', nameRu: 'Костяной Амулет', nameDe: 'Knochenamulett', rarity: 'legendary', slot: 'accessory', texKey: 'bone_amulet', chance: 0.04, stats: { hpPercent: 12, regenPercent: 4 } },
    { id: 'bone_hat_l', name: 'Crown of Bones', nameRu: 'Корона Костей', nameDe: 'Knochenkrone', rarity: 'legendary', slot: 'hat', texKey: 'bone_hat', chance: 0.03, stats: { hpPercent: 8, damagePercent: 5 } },
    { id: 'bone_mantle_l', name: 'Death Shroud', nameRu: 'Покров Смерти', nameDe: 'Todesschleier', rarity: 'legendary', slot: 'mantle', texKey: 'bone_mantle', chance: 0.03, stats: { spellPercent: 10, corruptionMax: 8 } },
    { id: 'bone_legs_l', name: 'Phantom Stride', nameRu: 'Призрачный Шаг', nameDe: 'Phantomschritt', rarity: 'legendary', slot: 'legs', texKey: 'bone_legs', chance: 0.03, stats: { speedPercent: 6, dodgePercent: 5 } }
];

// Cursed items (12: 4 rare + 4 epic + 4 legendary)
export const CURSED_NEW_ITEMS = [
    // Rare
    { id: 'venom_dagger', name: 'Venom Dagger', nameRu: 'Ядовитый Кинжал', nameDe: 'Giftdolch', rarity: 'rare', slot: 'weapon', texKey: 'cursed_blade', chance: 0.15, stats: { damagePercent: 10, critPercent: 3 } },
    { id: 'swamp_armor', name: 'Swamp Armor', nameRu: 'Болотная Броня', nameDe: 'Sumpfrüstung', rarity: 'rare', slot: 'armor', texKey: 'cursed_armor', chance: 0.12, stats: { hpPercent: 12, damageReduction: 3 } },
    { id: 'cursed_hat', name: 'Witch Hat', nameRu: 'Шляпа Ведьмы', nameDe: 'Hexenhut', rarity: 'rare', slot: 'hat', texKey: 'cursed_hat', chance: 0.12, stats: { hpPercent: 4, spellPercent: 3 } },
    { id: 'cursed_ring', name: 'Swamp Signet', nameRu: 'Болотная Печать', nameDe: 'Sumpfsignet', rarity: 'rare', slot: 'ring', texKey: 'cursed_ring', chance: 0.10, stats: { damagePercent: 6, lifeStealPercent: 2 } },
    // Epic
    { id: 'curse_wand', name: 'Curse Wand', nameRu: 'Палочка Проклятия', nameDe: 'Fluchstab', rarity: 'epic', slot: 'weapon', texKey: 'cursed_wand', chance: 0.08, stats: { spellPercent: 14, critPercent: 4 } },
    { id: 'plague_robe', name: 'Plague Robe', nameRu: 'Мантия Чумы', nameDe: 'Pestrobe', rarity: 'epic', slot: 'armor', texKey: 'cursed_cloak', chance: 0.07, stats: { hpPercent: 12, spellPercent: 6 } },
    { id: 'cursed_mantle', name: 'Curse Mantle', nameRu: 'Мантия Проклятия', nameDe: 'Fluchmantel', rarity: 'epic', slot: 'mantle', texKey: 'cursed_mantle', chance: 0.07, stats: { spellPercent: 8, corruptionMax: 6 } },
    { id: 'cursed_legs', name: 'Swamp Walkers', nameRu: 'Болотные Странники', nameDe: 'Sumpfwanderer', rarity: 'epic', slot: 'legs', texKey: 'cursed_legs', chance: 0.07, stats: { speedPercent: 5, dodgePercent: 3 } },
    // Legendary
    { id: 'plague_amulet', name: 'Plague Amulet', nameRu: 'Амулет Чумы', nameDe: 'Pestamulett', rarity: 'legendary', slot: 'accessory', texKey: 'cursed_charm', chance: 0.04, stats: { hpPercent: 14, regenPercent: 3 } },
    { id: 'cursed_hat_l', name: 'Crown of Plagues', nameRu: 'Корона Чум', nameDe: 'Pestkrone', rarity: 'legendary', slot: 'hat', texKey: 'cursed_hat', chance: 0.03, stats: { spellPercent: 8, corruptionMax: 10 } },
    { id: 'cursed_mantle_l', name: 'Plague Shroud', nameRu: 'Чумной Покров', nameDe: 'Pestschleier', rarity: 'legendary', slot: 'mantle', texKey: 'cursed_mantle', chance: 0.03, stats: { spellPercent: 10, lifeStealPercent: 5 } },
    { id: 'cursed_legs_l', name: 'Mire Striders', nameRu: 'Болотные Ступни', nameDe: 'Sumpfschreiter', rarity: 'legendary', slot: 'legs', texKey: 'cursed_legs', chance: 0.03, stats: { speedPercent: 6, dodgePercent: 4 } }
];

// Shadow items (12: 4 rare + 4 epic + 4 legendary)
export const SHADOW_NEW_ITEMS = [
    // Rare
    { id: 'void_dagger', name: 'Void Dagger', nameRu: 'Кинжал Пустоты', nameDe: 'Leerendolch', rarity: 'rare', slot: 'weapon', texKey: 'shadow_blade', chance: 0.12, stats: { damagePercent: 10, critPercent: 4 } },
    { id: 'shadow_plate', name: 'Shadow Plate', nameRu: 'Теневая Пластина', nameDe: 'Schattenplatte', rarity: 'rare', slot: 'armor', texKey: 'shadow_armor', chance: 0.10, stats: { hpPercent: 12, damageReduction: 4 } },
    { id: 'shadow_hat', name: 'Void Hood', nameRu: 'Капюшон Пустоты', nameDe: 'Leerenkapuze', rarity: 'rare', slot: 'hat', texKey: 'shadow_hat', chance: 0.10, stats: { hpPercent: 5, dodgePercent: 3 } },
    { id: 'shadow_ring', name: 'Void Signet', nameRu: 'Печать Пустоты', nameDe: 'Leerensignet', rarity: 'rare', slot: 'ring', texKey: 'shadow_ring', chance: 0.08, stats: { damagePercent: 6, spellPercent: 3 } },
    // Epic
    { id: 'void_blade', name: 'Void Blade', nameRu: 'Клинок Пустоты', nameDe: 'Leerenklinge', rarity: 'epic', slot: 'weapon', texKey: 'shadow_blade', chance: 0.06, stats: { damagePercent: 16, critPercent: 6 } },
    { id: 'shadow_cloak', name: 'Shadow Cloak', nameRu: 'Теневой Плащ', nameDe: 'Schattenumhang', rarity: 'epic', slot: 'armor', texKey: 'shadow_cloak', chance: 0.05, stats: { hpPercent: 14, dodgePercent: 5 } },
    { id: 'shadow_mantle', name: 'Void Mantle', nameRu: 'Мантия Пустоты', nameDe: 'Leerenmantel', rarity: 'epic', slot: 'mantle', texKey: 'shadow_mantle', chance: 0.05, stats: { spellPercent: 8, corruptionMax: 8 } },
    { id: 'shadow_legs', name: 'Shadow Walkers', nameRu: 'Теневые Странники', nameDe: 'Schattenwanderer', rarity: 'epic', slot: 'legs', texKey: 'shadow_legs', chance: 0.05, stats: { speedPercent: 6, dodgePercent: 4 } },
    // Legendary
    { id: 'shadow_amulet', name: 'Shadow Amulet', nameRu: 'Теневой Амулет', nameDe: 'Schattenamulett', rarity: 'legendary', slot: 'accessory', texKey: 'shadow_amulet', chance: 0.03, stats: { hpPercent: 15, critPercent: 6 } },
    { id: 'shadow_hat_l', name: 'Crown of Shadows', nameRu: 'Корона Теней', nameDe: 'Schattenkrone', rarity: 'legendary', slot: 'hat', texKey: 'shadow_hat', chance: 0.02, stats: { dodgePercent: 6, spellPercent: 5 } },
    { id: 'shadow_mantle_l', name: 'Void Shroud', nameRu: 'Покров Пустоты', nameDe: 'Leerenschleier', rarity: 'legendary', slot: 'mantle', texKey: 'shadow_mantle', chance: 0.02, stats: { spellPercent: 12, corruptionMax: 12 } },
    { id: 'shadow_legs_l', name: 'Phase Striders', nameRu: 'Фазовые Ступни', nameDe: 'Phasenläufer', rarity: 'legendary', slot: 'legs', texKey: 'shadow_legs', chance: 0.02, stats: { speedPercent: 8, dodgePercent: 6 } }
];

// Tower items (12: 4 rare + 4 epic + 4 legendary)
export const TOWER_NEW_ITEMS = [
    // Rare
    { id: 'tower_sword', name: 'Tower Sword', nameRu: 'Башенный Меч', nameDe: 'Turmschwert', rarity: 'rare', slot: 'weapon', texKey: 'tower_blade', chance: 0.10, stats: { damagePercent: 12, critPercent: 4 } },
    { id: 'tower_plate', name: 'Tower Plate', nameRu: 'Башенная Пластина', nameDe: 'Turmplatte', rarity: 'rare', slot: 'armor', texKey: 'tower_armor', chance: 0.08, stats: { hpPercent: 14, damageReduction: 5 } },
    { id: 'tower_hat', name: 'Crown of Stone', nameRu: 'Каменная Корона', nameDe: 'Steinkrone', rarity: 'rare', slot: 'hat', texKey: 'tower_hat', chance: 0.08, stats: { hpPercent: 6, damageReduction: 3 } },
    { id: 'tower_ring', name: 'Royal Signet', nameRu: 'Королевская Печать', nameDe: 'Königssignet', rarity: 'rare', slot: 'ring', texKey: 'tower_ring', chance: 0.07, stats: { damagePercent: 7, spellPercent: 4 } },
    // Epic
    { id: 'royal_blade', name: 'Royal Blade', nameRu: 'Королевский Клинок', nameDe: 'Königliche Klinge', rarity: 'epic', slot: 'weapon', texKey: 'tower_blade', chance: 0.06, stats: { damagePercent: 18, critPercent: 6 } },
    { id: 'royal_mantle', name: 'Royal Mantle', nameRu: 'Королевская Мантия', nameDe: 'Königsumhang', rarity: 'epic', slot: 'armor', texKey: 'tower_helm', chance: 0.05, stats: { hpPercent: 16, spellPercent: 8 } },
    { id: 'tower_mantle', name: 'Tower Mantle', nameRu: 'Башенная Мантия', nameDe: 'Turmmantel', rarity: 'epic', slot: 'mantle', texKey: 'tower_mantle', chance: 0.05, stats: { spellPercent: 10, corruptionMax: 8 } },
    { id: 'tower_legs', name: 'Tower Greaves', nameRu: 'Башенные Поножи', nameDe: 'Turmschienen', rarity: 'epic', slot: 'legs', texKey: 'tower_legs', chance: 0.05, stats: { speedPercent: 5, damageReduction: 5 } },
    // Legendary
    { id: 'tower_amulet', name: 'Tower Amulet', nameRu: 'Башенный Амулет', nameDe: 'Turmamulett', rarity: 'legendary', slot: 'accessory', texKey: 'tower_amulet', chance: 0.03, stats: { hpPercent: 18, regenPercent: 4 } },
    { id: 'tower_hat_l', name: 'Crown of the Fallen', nameRu: 'Корона Павших', nameDe: 'Krone der Gefallenen', rarity: 'legendary', slot: 'hat', texKey: 'tower_hat', chance: 0.02, stats: { hpPercent: 10, damagePercent: 6 } },
    { id: 'tower_mantle_l', name: 'Fallen Mantle', nameRu: 'Мантия Павших', nameDe: 'Gefallenenmantel', rarity: 'legendary', slot: 'mantle', texKey: 'tower_mantle', chance: 0.02, stats: { spellPercent: 12, corruptionMax: 10 } },
    { id: 'tower_legs_l', name: 'Eternal Striders', nameRu: 'Вечные Ступни', nameDe: 'Ewige Schreiter', rarity: 'legendary', slot: 'legs', texKey: 'tower_legs', chance: 0.02, stats: { speedPercent: 7, damageReduction: 6 } }
];

// Throne items (12: 4 rare + 4 epic + 4 legendary)
export const THRONE_NEW_ITEMS = [
    // Rare
    { id: 'eternity_sword', name: 'Eternity Sword', nameRu: 'Меч Вечности', nameDe: 'Ewigkeitsschwert', rarity: 'rare', slot: 'weapon', texKey: 'eternal_blade', chance: 0.08, stats: { damagePercent: 14, critPercent: 5 } },
    { id: 'eternity_plate', name: 'Eternity Plate', nameRu: 'Пластина Вечности', nameDe: 'Ewigkeitsplatte', rarity: 'rare', slot: 'armor', texKey: 'eternal_armor', chance: 0.06, stats: { hpPercent: 16, damageReduction: 6 } },
    { id: 'eternal_hat', name: 'Crown of Eternity', nameRu: 'Корона Вечности', nameDe: 'Ewigkeitskrone', rarity: 'rare', slot: 'hat', texKey: 'eternal_hat', chance: 0.06, stats: { hpPercent: 7, damagePercent: 4 } },
    { id: 'eternal_ring', name: 'Eternity Ring', nameRu: 'Кольцо Вечности', nameDe: 'Ewigkeitsring', rarity: 'rare', slot: 'ring', texKey: 'eternal_ring', chance: 0.05, stats: { damagePercent: 8, spellPercent: 4 } },
    // Epic
    { id: 'eternity_blade', name: 'Eternity Blade', nameRu: 'Клинок Вечности', nameDe: 'Ewigkeitsklinge', rarity: 'epic', slot: 'weapon', texKey: 'eternal_blade', chance: 0.05, stats: { damagePercent: 20, critPercent: 8 } },
    { id: 'eternity_mantle', name: 'Eternity Mantle', nameRu: 'Мантия Вечности', nameDe: 'Ewigkeitsumhang', rarity: 'epic', slot: 'armor', texKey: 'eternal_crown', chance: 0.04, stats: { hpPercent: 18, spellPercent: 10 } },
    { id: 'eternal_mantle', name: 'Eternal Mantle', nameRu: 'Вечная Мантия', nameDe: 'Ewiger Mantel', rarity: 'epic', slot: 'mantle', texKey: 'eternal_mantle', chance: 0.04, stats: { spellPercent: 12, corruptionMax: 10 } },
    { id: 'eternal_legs', name: 'Eternal Striders', nameRu: 'Вечные Ступни', nameDe: 'Ewige Schreiter', rarity: 'epic', slot: 'legs', texKey: 'eternal_legs', chance: 0.04, stats: { speedPercent: 7, dodgePercent: 5 } },
    // Legendary
    { id: 'eternity_amulet', name: 'Eternity Amulet', nameRu: 'Амулет Вечности', nameDe: 'Ewigkeitsamulett', rarity: 'legendary', slot: 'accessory', texKey: 'eternal_amulet', chance: 0.02, stats: { hpPercent: 20, regenPercent: 5 } },
    { id: 'eternal_hat_l', name: 'Crown of the Eternal', nameRu: 'Корона Вечных', nameDe: 'Krone der Ewigen', rarity: 'legendary', slot: 'hat', texKey: 'eternal_hat', chance: 0.015, stats: { hpPercent: 10, damagePercent: 8 } },
    { id: 'eternal_mantle_l', name: 'Eternal Shroud', nameRu: 'Вечный Покров', nameDe: 'Ewiger Schleier', rarity: 'legendary', slot: 'mantle', texKey: 'eternal_mantle', chance: 0.015, stats: { spellPercent: 15, corruptionMax: 15 } },
    { id: 'eternal_legs_l', name: 'Chrono Striders', nameRu: 'Хроно Ступни', nameDe: 'Chrono Schreiter', rarity: 'legendary', slot: 'legs', texKey: 'eternal_legs', chance: 0.015, stats: { speedPercent: 10, dodgePercent: 8 } }
];

export const ACCOUNT_EQUIP_DB_VILLAGE = [
    { id: 'relic_village_sage',      name: 'Tome of Flames',     nameRu: 'Том Пламени',       nameDe: 'Flammenschaft',    rarity: 'legendary', slot: 'accessory', texKey: 'relic_sage', chance: 0.34, stats: { spellPercent: 8, critPercent: 5 } },
    { id: 'relic_village_alchemist', name: 'Alchemist Belt',     nameRu: 'Пояс Алхимика',     nameDe: 'Alchemistengürtel', rarity: 'legendary', slot: 'accessory', texKey: 'relic_alchemist', chance: 0.33, stats: { hpPercent: 10, damagePercent: 6 } },
    { id: 'relic_village_angel',     name: 'Angel Feather',      nameRu: 'Перо Ангела',       nameDe: 'Engelsfeder',      rarity: 'legendary', slot: 'accessory', texKey: 'relic_angel', chance: 0.33, stats: { regenPercent: 5, dodgePercent: 4 } }
];

export const VILLAGE_CHEST_DROP_ITEMS = [
    { id: 'village_ring',  name: 'Village Signet',  nameRu: 'Печать Деревни',  nameDe: 'Dorfsignet',  rarity: 'uncommon', slot: 'accessory', texKey: 'item_crown',  chance: 0.40, stats: { hpPercent: 3, damagePercent: 2 } },
    { id: 'village_amulet', name: 'Damned Amulet', nameRu: 'Проклятый Амулет', nameDe: 'Verfluchtes Amulett', rarity: 'rare', slot: 'accessory', texKey: 'item_ruby', chance: 0.35, stats: { spellPercent: 5, critPercent: 3 } },
    { id: 'village_cloak',  name: 'Torn Cloak',    nameRu: 'Рваный Плащ',      nameDe: 'Zerrissener Umhang', rarity: 'uncommon', slot: 'armor', texKey: 'item_dscale', chance: 0.25, stats: { hpPercent: 5, speedPercent: 2 } }
];

// Special items
export const SECRET_KEY_ITEM = {
    id: 'secret_key',
    name: 'Ancient Key',
    nameRu: 'Древний Ключ',
    nameDe: 'Alter Schlüssel',
    texKey: 'item_key',
    rarity: 'legendary',
    type: 'material',
    locked: true,
    questItem: true,
    description: 'A mysterious key that hums with dark energy. The old cart driver might know what it opens.',
    descriptionRu: 'Загадочный ключ, гудящий тёмной энергией. Старый извозчик знает, что он открывает.',
    descriptionDe: 'Ein geheimnisvoller Schlüssel, der von dunkler Energie summt. Der alte Kutscher weiß vielleicht, was er öffnet.',
    dropDifficulty: 'Hard'
};

export const MAGMA_ARMOR = {
    id: 'magma_armor', name: 'Magma Armor', nameRu: 'Магма Броня', nameDe: 'Magma-Rüstung',
    rarity: 'legendary', slot: 'armor', texKey: 'acc_book',
    stats: { hp: 80, dmg: 25, speed: 15 },
    locked: true,
    description: 'Legendary armor forged in hellfire'
};

export const HEAT_CRYSTAL = {
    id: 'heat_crystal', name: 'Heat Crystal', nameRu: 'Жила Тепла', nameDe: 'Wärmekristall',
    rarity: 'legendary', slot: 'accessory', texKey: 'item_ruby',
    stats: { hp: 50, dmg: 20, speed: 10 },
    locked: true,
    description: 'A crystal forged in the heart of hell. Radiates intense heat.'
};

export const WARMTH_CORE = {
    id: 'warmth_core', name: 'Warmth Core', nameRu: 'Жизнь Тепла', nameDe: 'Kern der Wärme',
    rarity: 'legendary', slot: 'accessory', texKey: 'warmth_core',
    stats: { hp: 60, dmg: 25, speed: 12, regenPercent: 3 },
    locked: true, questItem: true,
    description: 'A warm soul extracted from the Ice Spirit. Place it in the campfire to restore the village.'
};

export const CASTLE_KEY = {
    id: 'castle_key', name: 'Castle Key', nameRu: 'Ключ от Замка', nameDe: 'Schlossschlüssel',
    rarity: 'legendary', slot: 'accessory', texKey: 'item_key',
    stats: { hp: 40, dmg: 20, speed: 8 },
    locked: true, questItem: true,
    description: 'A heavy iron key taken from the Bandit Leader. It unlocks the attic where the villagers are held.',
    descriptionRu: 'Тяжёлый железный ключ, отнятый у Лидера Бандитов. Открывает чердак, где заключены жители.',
    descriptionDe: 'Ein schwerer eiserner Schlüssel, dem Banditenanführer abgenommen. Er öffnet den Dachboden, auf dem die Dorfbewohner gefangen sind.'
};

// Material book
export const MATERIAL_BOOK_LEVELS = [
    { level: 0, countRequired: 0,   hpBonus: 0, dmgBonus: 0, speedBonus: 0, info: 'description' },
    { level: 1, countRequired: 5,   hpBonus: 3, dmgBonus: 1, speedBonus: 0,  info: 'stats' },
    { level: 2, countRequired: 15,  hpBonus: 6, dmgBonus: 2, speedBonus: 5,  info: 'properties' },
    { level: 3, countRequired: 30,  hpBonus: 10, dmgBonus: 4, speedBonus: 10, info: 'recipe' },
    { level: 4, countRequired: 60,  hpBonus: 15, dmgBonus: 6, speedBonus: 15, info: 'mastery' },
    { level: 5, countRequired: 100, hpBonus: 22, dmgBonus: 9, speedBonus: 20, info: 'lore' }
];

export const MATERIAL_BOOK_ENTRIES = {
    wood:      { name: 'Wood',      rarity: 'common',   texKey: 'item_stick',  biome: 'forest',
        description: 'Sturdy timber harvested from the ancient trees of the forest. Light yet resilient, it forms the backbone of most tools and weapons.',
        properties: 'Burns slowly and evenly. Absorbs moisture from the air, becoming stronger over time.',
        recipe: 'Combine with oil for treated wood. Mix with iron ore for reinforced handles.',
        lore: 'The forests of the old world produced wood so dense it could deflect arrows. Loggers who knew the ancient techniques could shape it without metal tools.' },
    stone:     { name: 'Stone',     rarity: 'common',   texKey: 'item_stone',  biome: 'forest',
        description: 'River-smoothed stone, hard enough to crack bone. A reliable material for crushing and forging.',
        properties: 'Dense and heavy. Conducts cold well — stones from the deep mines are always cool to the touch.',
        recipe: 'Grind into powder for abrasive compounds. Heat to extreme temperatures for volcanic glass.',
        lore: 'Dwarven smiths believed certain stones held the memory of the earth. They would listen to the rock before forging, choosing only those that sang.' },
    leaf:      { name: 'Leaf',      rarity: 'common',   texKey: 'item_leaf',   biome: 'forest',
        description: 'A broad, emerald leaf from the canopy trees. Lightweight and flexible, with a faint herbal scent.',
        properties: 'Contains natural antiseptic compounds. Wilt quickly when separated from the branch.',
        recipe: 'Dry and grind into poultice powder. Steep in hot water for a restorative tea.',
        lore: 'Elven healers could read the health of a forest by the leaves alone. A curled leaf meant sickness; a vibrant one meant the roots ran deep and strong.' },
    mushroom:  { name: 'Mushroom',  rarity: 'uncommon', texKey: 'item_mush',   biome: 'forest',
        description: 'A plump, purple-capped mushroom that grows in dark, damp hollows. Its flesh is surprisingly nutritious.',
        properties: 'Bioluminescent when fresh. Releases spores that can irritate the lungs if handled carelessly.',
        recipe: 'Slice thin and dehydrate for preserved rations. Ferment into a potent healing draught.',
        lore: 'Alchemists prize the deep-forest mushrooms for their transformative properties. A single rare specimen can be the difference between a healing salve and a deadly poison.' },
    herb:      { name: 'Herb',      rarity: 'uncommon', texKey: 'item_herb',   biome: 'forest',
        description: 'Aromatic herbs with silver-veined leaves. Used in medicine and alchemy for centuries.',
        properties: 'Releases a sharp, invigorating aroma when crushed. The oils in the leaves promote rapid cell regeneration.',
        recipe: 'Infuse in alcohol for a tincture. Combine with mushroom extract for enhanced potency.',
        lore: 'The Silvervein herb grows only where ancient magic once flowed. Alchemists say it remembers the spells of old, whispering secrets to those who listen.' },
    gem_shard: { name: 'Gem Shard', rarity: 'rare',     texKey: 'item_ruby',   biome: 'mine',
        description: 'A crystalline fragment that pulses with inner light. Extremely dense with magical energy.',
        properties: 'Emits a faint hum when held near corruption. Can absorb and store small amounts of ambient magic.',
        recipe: 'Dissolve in acid for a magic-reactive solution. Grind into dust for enchanting inks.',
        lore: 'Gem shards are fragments of the World Crystal, shattered during the First Corruption. Each one still carries a fragment of the original purity — and a warning.' },
    cave_silk:  { name: 'Cave Silk',  rarity: 'common',   texKey: 'item_leaf',   biome: 'cave',
        description: 'Gossamer threads harvested from cave spider webs. Surprisingly strong and flexible.',
        properties: 'Absorbs light, making it nearly invisible in darkness. Conducts sound when stretched.',
        recipe: 'Weave into armor lining for stealth bonuses. Dissolve in solvent for adhesive compounds.',
        lore: 'Cave silk was once used by shadow assassins. Its natural light-absorbing properties made it perfect for moving unseen through lit corridors.' },
    cave_moss:  { name: 'Cave Moss',  rarity: 'common',   texKey: 'item_mush',   biome: 'cave',
        description: 'Luminescent moss that grows on cave walls. Emits a faint green glow.',
        properties: 'Generates light in darkness. Releases spores that promote natural healing.',
        recipe: 'Grind into poultice for rapid wound healing. Dry and burn for medicinal smoke.',
        lore: 'Cave moss grows where corruption seeps through the walls. It transforms the corruption into light — a natural counterbalance to the darkness.' },
    bat_wing:   { name: 'Bat Wing',   rarity: 'uncommon', texKey: 'item_leaf',   biome: 'cave',
        description: 'Translucent wing membrane from cave bats. Thin but remarkably durable.',
        properties: 'Amplifies sound when held. Can be shaped into hearing devices.',
        recipe: 'Combine with silk for enhanced stealth gear. Grind into powder for echolocation potions.',
        lore: 'Bat wings are woven with natural sonar threads. They capture and redirect sound waves, making them invaluable for navigation in darkness.' },
    dark_crystal: { name: 'Dark Crystal', rarity: 'rare', texKey: 'item_ruby', biome: 'cave',
        description: 'A shard of concentrated cave corruption. It pulses with dark energy.',
        properties: 'Amplifies magical power but increases corruption. Can store and release dark energy.',
        recipe: 'Dissolve in holy water for purification. Grind into dust for enchanting inks.',
        lore: 'Dark crystals are the cave\'s tears — condensed corruption that has solidified over centuries. They are both beautiful and deadly.' },
    hell_ash:       { name: 'Hell Ash',       rarity: 'common',   texKey: 'item_stone',  biome: 'hell',
        description: 'Fine, powdery ash from the floors of hell. It burns to the touch and never fully cools.',
        properties: 'Absorbs heat and moisture. Can be used to create heat-resistant compounds.',
        recipe: 'Mix with oil for a fireproof coating. Combine with metal ore for heat-treated alloys.',
        lore: 'Hell ash is the residue of burned souls. Alchemists prize it for its heat-resistant properties, but handling it requires extreme caution.' },
    infernal_ore:   { name: 'Infernal Ore',   rarity: 'uncommon', texKey: 'item_ruby',   biome: 'hell',
        description: 'A glowing ore that pulses with infernal energy. It radiates heat and cannot be touched with bare hands.',
        properties: 'Conducts heat and magical energy. Strengthens when exposed to fire.',
        recipe: 'Smelt in extreme heat for infernal ingots. Grind into powder for explosive compounds.',
        lore: 'Infernal ore forms in the deepest circles of hell, where reality bends under the weight of eternal fire. It remembers the souls that fueled its creation.' },
    demon_scale:    { name: 'Demon Scale',    rarity: 'rare',     texKey: 'item_ruby',   biome: 'hell',
        description: 'A hardened scale from a demon\'s hide. It shimmers with an inner fire and is nearly indestructible.',
        properties: 'Resists physical and magical damage. Absorbs fire damage to strengthen the wielder.',
        recipe: 'Forge with infernal ore for demonsteel. Grind into powder for protection elixirs.',
        lore: 'Demon scales are shed duringmolting — a rare moment of vulnerability. Collecting them requires either great skill or great recklessness.' },
    hellfire_crystal: { name: 'Hellfire Crystal', rarity: 'rare', texKey: 'item_ruby',  biome: 'hell',
        description: 'A crystal forged in the heart of hellfire. It burns with an eternal flame that never extinguishes.',
        properties: 'Radiates intense heat. Enhances fire-based attacks and spells.',
        recipe: 'Combine with weapon for fire enchantment. Dissolve in potion for fire resistance.',
        lore: 'Hellfire crystals are the tears of the first demon, shed when it was cast into the deepest circle. They burn with a rage that time cannot diminish.' },
    bone_dust:          { name: 'Bone Dust',          rarity: 'common',   texKey: 'item_stone',  biome: 'depths',
        description: 'Fine powder ground from ancient bones. It hums with residual life energy.',
        properties: 'Absorbs moisture and light. Can be used to create necrotic compounds.',
        recipe: 'Mix with oil for a preservation coating. Combine with dark rune for enchantment.',
        lore: 'Bone dust is the residue of the Lich King\'s subjects. Alchemists prize it for its necrotic properties, but handling it requires extreme caution.' },
    shadow_essence:     { name: 'Shadow Essence',     rarity: 'uncommon', texKey: 'item_ruby',   biome: 'depths',
        description: 'A liquid shadow collected from the darkest corners of the catacombs. It writhes and pulses.',
        properties: 'Enhances stealth and evasion. Can store and release dark energy.',
        recipe: 'Combine with silk for shadow-thread armor. Dissolve in potion for invisibility.',
        lore: 'Shadow essence is condensed darkness, harvested from the spaces between tombstones. It remembers the souls that once walked there.' },
    cursed_iron:        { name: 'Cursed Iron',        rarity: 'uncommon', texKey: 'item_stone',  biome: 'depths',
        description: 'A chunk of iron corrupted by centuries of dark magic. It glows with a sickly light.',
        properties: 'Resists physical damage. Strengthens when exposed to darkness.',
        recipe: 'Smelt in extreme heat for cursed ingots. Grind into powder for protective elixirs.',
        lore: 'Cursed iron forms where the Lich King\'s power seeps into the earth. It remembers the souls that fueled its creation.' },
    soul_shard:         { name: 'Soul Shard',         rarity: 'rare',     texKey: 'item_ruby',   biome: 'depths',
        description: 'A crystallized fragment of a soul, trapped between life and death. It pulses with inner light.',
        properties: 'Amplifies magical power but increases corruption. Can store and release soul energy.',
        recipe: 'Dissolve in holy water for purification. Grind into dust for enchanting inks.',
        lore: 'Soul shards are the Lich King\'s tears — condensed agony that has solidified over centuries. They are both beautiful and deadly.' },
    grave_moss:         { name: 'Grave Moss',         rarity: 'common',   texKey: 'item_mush',   biome: 'depths',
        description: 'Luminescent moss that grows on tombstones. Emits a faint green glow.',
        properties: 'Generates light in darkness. Releases spores that promote unnatural healing.',
        recipe: 'Grind into poultice for rapid wound healing. Dry and burn for medicinal smoke.',
        lore: 'Grave moss grows where corruption seeps through the stone. It transforms the corruption into light — a natural counterbalance to the darkness.' },
    necrotic_flesh:     { name: 'Necrotic Flesh',     rarity: 'uncommon', texKey: 'item_mush',   biome: 'depths',
        description: 'Preserved flesh from the undead. It writhes with residual life force.',
        properties: 'Enhances necromantic abilities. Can be used to create undead servants.',
        recipe: 'Combine with bone dust for zombie summoning scrolls. Dissolve in potion for life steal.',
        lore: 'Necrotic flesh is the Lich King\'s failed experiments. Each piece still carries a fragment of the soul it once housed.' },
    dark_rune:          { name: 'Dark Rune',          rarity: 'rare',     texKey: 'item_ruby',   biome: 'depths',
        description: 'An ancient symbol carved in cursed iron. It pulses with dark energy.',
        properties: 'Amplifies dark magic. Can be used to enchant weapons and armor.',
        recipe: 'Combine with weapon for dark enchantment. Grind into dust for warding sigils.',
        lore: 'Dark runes are the Lich King\'s signature — his mark of ownership over the dead. Each one still carries his will.' },
    spectral_silk:      { name: 'Spectral Silk',      rarity: 'uncommon', texKey: 'item_leaf',   biome: 'depths',
        description: 'Gossamer threads harvested from wraith webs. Nearly invisible in darkness.',
        properties: 'Absorbs light, making it nearly invisible. Conducts soul energy when stretched.',
        recipe: 'Weave into armor lining for stealth bonuses. Dissolve in solvent for adhesive compounds.',
        lore: 'Spectral silk was once used by shadow assassins. Its natural light-absorbing properties made it perfect for moving unseen through lit corridors.' },
    blood_crystal:      { name: 'Blood Crystal',      rarity: 'rare',     texKey: 'item_ruby',   biome: 'depths',
        description: 'A crystal of solidified blood, pulsing with life force. It glows with a deep crimson light.',
        properties: 'Enhances life-stealing attacks. Can store and release life energy.',
        recipe: 'Combine with weapon for life-steal enchantment. Dissolve in potion for healing.',
        lore: 'Blood crystals are the Lich King\'s harvest — condensed life force extracted from his victims. They are both precious and terrifying.' },
    death_cap:          { name: 'Death Cap',          rarity: 'uncommon', texKey: 'item_mush',   biome: 'depths',
        description: 'A toxic mushroom that grows on corpses. Its spores can kill or reanimate.',
        properties: 'Produces lethal spores. Can be used to create poison or resurrection potions.',
        recipe: 'Grind into poison for weapon coating. Dissolve in potion for resurrection draught.',
        lore: 'Death caps are the Lich King\'s garden — his way of recycling the dead. Each one carries a fragment of the soul it grew from.' },
    void_essence:       { name: 'Void Essence',       rarity: 'rare',     texKey: 'item_ruby',   biome: 'depths',
        description: 'A substance extracted from the space between worlds. It warps reality around it.',
        properties: 'Bends space and time. Can be used to create portals or dimensional anchors.',
        recipe: 'Combine with rune for portal stone. Dissolve in potion for teleportation draught.',
        lore: 'Void essence is the Lich King\'s deepest secret — the substance of the void between life and death. It is both creation and destruction.' }
};
