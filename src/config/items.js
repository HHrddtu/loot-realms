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
    { id: 'sage_hat',     name: 'Wise Cap',         nameRu: 'Мудрая Шапка',      nameDe: 'Weise Mütze',         rarity: 'rare',      slot: 'hat',      texKey: 'sage_hat',      chance: 0.30, stats: { hpPercent: 3, regenPercent: 1 } },
    { id: 'sage_mantle',  name: 'Arcane Mantle',    nameRu: 'Тайная Мантия',     nameDe: 'Geheimnisumantel',    rarity: 'rare',      slot: 'mantle',   texKey: 'sage_mantle',   chance: 0.25, stats: { spellPercent: 4, corruptionMax: 5 } },
    { id: 'sage_legs',    name: 'Traveler Leggings',nameRu: 'Штаны Путника',     nameDe: 'Wanderhose',          rarity: 'rare',      slot: 'legs',     texKey: 'sage_legs',     chance: 0.25, stats: { speedPercent: 3, dodgePercent: 2 } },
    { id: 'sage_book',    name: 'Grimoire of Shadows', nameRu: 'Гримуар Теней',  nameDe: 'Grimuar der Schatten', rarity: 'epic',   slot: 'weapon',   texKey: 'sage_book',     chance: 0.12, stats: { damagePercent: 5, critPercent: 2 }, effect: 'slow_dark_stun' },
    { id: 'sage_amulet',  name: 'Amulet of Foresight', rarity: 'epic',          nameRu: 'Амулет Предвидения', nameDe: 'Amulett der Vorschau', slot: 'accessory', texKey: 'sage_amulet', chance: 0.08, stats: { expPercent: 2, lootPercent: 2, hpPercent: 3 } },
    { id: 'sage_hat_e',   name: 'Mystic Crown',     nameRu: 'Мистическая Корона', nameDe: 'Mystische Krone',   rarity: 'epic',      slot: 'hat',      texKey: 'sage_hat',      chance: 0.08, stats: { hpPercent: 5, regenPercent: 2 } },
    { id: 'sage_mantle_e',name: 'Void Shroud',      nameRu: 'Покров Пустоты',   nameDe: 'Leere Schleier',      rarity: 'epic',      slot: 'mantle',   texKey: 'sage_mantle',   chance: 0.07, stats: { spellPercent: 7, corruptionMax: 10 } },
    { id: 'sage_legs_e',  name: 'Phase Walkers',    nameRu: 'Фазовые Шаги',     nameDe: 'Phasenläufer',        rarity: 'epic',      slot: 'legs',     texKey: 'sage_legs',     chance: 0.07, stats: { speedPercent: 5, dodgePercent: 3 } },
    { id: 'sage_book_l',  name: 'Tome of Eternal Wisdom', nameRu: 'Том Вечной Мудрости', nameDe: 'Buch der Ewigen Weisheit', rarity: 'legendary', slot: 'weapon', texKey: 'sage_book', chance: 0.03, stats: { damagePercent: 8, critPercent: 4 }, effect: 'slow_dark_stun' },
    { id: 'sage_amulet_l',name: 'Necklace of the Sage', nameRu: 'Ожерелье Мудреца', nameDe: 'Halskette des Weisen', rarity: 'legendary', slot: 'accessory', texKey: 'sage_amulet', chance: 0.02, stats: { expPercent: 4, lootPercent: 4, hpPercent: 5 } },

    { id: 'alch_hat',     name: "Alchemist's Hood",  nameRu: 'Капюшон Алхимика',   nameDe: 'Alchemistenhut',      rarity: 'rare',      slot: 'hat',      texKey: 'alch_hat',      chance: 0.30, stats: { hpPercent: 4, damageReduction: 2 } },
    { id: 'alch_mantle',  name: 'Transmutation Robe',nameRu: 'Мантия Трансмутации', nameDe: 'Transmutationsrobe', rarity: 'rare',      slot: 'mantle',   texKey: 'alch_mantle',   chance: 0.25, stats: { spellPercent: 3, hpPercent: 3 } },
    { id: 'alch_legs',    name: 'Boots of Endurance',nameRu: 'Сапоги Выносливости', nameDe: 'Ausdauerstiefel',   rarity: 'rare',      slot: 'legs',     texKey: 'alch_legs',     chance: 0.25, stats: { speedPercent: 2, hpPercent: 4 } },
    { id: 'alch_wand',    name: 'Corrosive Wand',    nameRu: 'Коррозийная Палочка', nameDe: 'Korrosionsstab',    rarity: 'epic',      slot: 'weapon',   texKey: 'alch_wand',     chance: 0.12, stats: { damagePercent: 4, critPercent: 3 } },
    { id: 'alch_amulet',  name: "Philosopher's Stone", nameRu: 'Камень Философа',  nameDe: 'Stein der Weisen',   rarity: 'epic',      slot: 'accessory', texKey: 'alch_amulet',  chance: 0.08, stats: { damagePercent: 3, spellPercent: 3, hpPercent: 2 } },
    { id: 'alch_hat_e',   name: 'Crown of Potency',  nameRu: 'Корона Мощи',        nameDe: 'Krone der Macht',    rarity: 'epic',      slot: 'hat',      texKey: 'alch_hat',      chance: 0.08, stats: { hpPercent: 6, damageReduction: 4 } },
    { id: 'alch_mantle_e',name: 'Volatile Shroud',   nameRu: 'Нестабильный Покров', nameDe: 'Instabiler Schleier', rarity: 'epic',     slot: 'mantle',   texKey: 'alch_mantle',   chance: 0.07, stats: { spellPercent: 6, hpPercent: 5 } },
    { id: 'alch_legs_e',  name: 'Greaves of the Forge', nameRu: 'Поножи Горнила',  nameDe: 'Schienbein des Ofens', rarity: 'epic',    slot: 'legs',     texKey: 'alch_legs',     chance: 0.07, stats: { speedPercent: 4, hpPercent: 6 } },
    { id: 'alch_wand_l',  name: 'Alembic of Eternity', nameRu: 'Аламбик Вечности', nameDe: 'Alembik der Ewigkeit', rarity: 'legendary', slot: 'weapon', texKey: 'alch_wand', chance: 0.03, stats: { damagePercent: 7, critPercent: 5, spellPercent: 3 } },
    { id: 'alch_amulet_l',name: 'Blessing of the Flask', nameRu: 'Благословение Фляги', nameDe: 'Segen der Flasche', rarity: 'legendary', slot: 'accessory', texKey: 'alch_amulet', chance: 0.02, stats: { hpPercent: 8, damagePercent: 5, spellPercent: 3 } },

    { id: 'angel_hat',    name: 'Halo of Grace',     nameRu: 'Нимб Благодати',     nameDe: 'Halo der Gnade',      rarity: 'rare',      slot: 'hat',      texKey: 'angel_hat',      chance: 0.30, stats: { hpPercent: 3, regenPercent: 2 } },
    { id: 'angel_mantle', name: 'Wings of Light',    nameRu: 'Крылья Света',       nameDe: 'Flügel des Lichts',   rarity: 'rare',      slot: 'mantle',   texKey: 'angel_mantle',   chance: 0.25, stats: { speedPercent: 3, dodgePercent: 3 } },
    { id: 'angel_legs',   name: 'Swift Sandals',     nameRu: 'Лёгкие Сандалии',    nameDe: 'Schnelle Sandalen',   rarity: 'rare',      slot: 'legs',     texKey: 'angel_legs',     chance: 0.25, stats: { speedPercent: 4, dodgePercent: 2 } },
    { id: 'angel_staff',  name: 'Smite Staff',       nameRu: 'Посох Карателя',     nameDe: 'Bestrafungsstab',     rarity: 'epic',      slot: 'weapon',   texKey: 'angel_staff',    chance: 0.12, stats: { damagePercent: 4, spellPercent: 4 } },
    { id: 'angel_amulet', name: 'Soul Pendant',      nameRu: 'Подвеска Души',      nameDe: 'Seelenanhänger',      rarity: 'epic',      slot: 'accessory', texKey: 'angel_amulet',  chance: 0.08, stats: { hpPercent: 4, corruptionMax: 8, spellPercent: 2 } },
    { id: 'angel_hat_e',  name: 'Crown of Devotion', nameRu: 'Корона Преданности', nameDe: 'Krone der Hingabe',   rarity: 'epic',      slot: 'hat',      texKey: 'angel_hat',      chance: 0.08, stats: { hpPercent: 5, regenPercent: 3 } },
    { id: 'angel_mantle_e',name: 'Aegis Shroud',     nameRu: 'Покров Щита',       nameDe: 'Schildschleier',      rarity: 'epic',      slot: 'mantle',   texKey: 'angel_mantle',   chance: 0.07, stats: { speedPercent: 5, dodgePercent: 4 } },
    { id: 'angel_legs_e', name: 'Boots of Ascension', nameRu: 'Сапоги Вознесения', nameDe: 'Stiefel der Himmelfahrt', rarity: 'epic', slot: 'legs', texKey: 'angel_legs', chance: 0.07, stats: { speedPercent: 6, dodgePercent: 3 } },
    { id: 'angel_staff_l',name: 'Judgment Scepter',  nameRu: 'Жезл Суда',          nameDe: 'Urteilszepter',       rarity: 'legendary', slot: 'weapon',   texKey: 'angel_staff',    chance: 0.03, stats: { damagePercent: 6, spellPercent: 6, critPercent: 3 } },
    { id: 'angel_amulet_l',name: 'Tear of the Angel', nameRu: 'Слеза Ангела',      nameDe: 'Träne des Engels',    rarity: 'legendary', slot: 'accessory', texKey: 'angel_amulet',  chance: 0.02, stats: { hpPercent: 6, regenPercent: 4, corruptionMax: 12 } },

    { id: 'sage_ring',    name: 'Scholar Ring',      nameRu: 'Кольцо Учёного',     nameDe: 'Gelehrtenring',       rarity: 'rare',      slot: 'ring',     texKey: 'sage_ring',     chance: 0.30, stats: { spellPercent: 2, critPercent: 1 } },
    { id: 'sage_charm',   name: 'Tome Fragment',     nameRu: 'Фрагмент Тома',      nameDe: 'Tomb fragment',       rarity: 'rare',      slot: 'charm',    texKey: 'sage_charm',    chance: 0.30, stats: { hpPercent: 2, corruptionMax: 3 } },
    { id: 'sage_ring_e',  name: 'Ring of Insight',   nameRu: 'Кольцо Прозрения',   nameDe: 'Ring der Einsicht',   rarity: 'epic',      slot: 'ring',     texKey: 'sage_ring',     chance: 0.08, stats: { spellPercent: 4, critPercent: 3 } },
    { id: 'sage_charm_e', name: 'Soul Cipher',       nameRu: 'Шифр Души',          nameDe: 'Seelencipher',        rarity: 'epic',      slot: 'charm',    texKey: 'sage_charm',    chance: 0.08, stats: { hpPercent: 4, corruptionMax: 8 } },

    { id: 'alch_ring',    name: 'Alchemist Band',    nameRu: 'Кольцо Алхимика',    nameDe: 'Alchemistenband',     rarity: 'rare',      slot: 'ring',     texKey: 'alch_ring',     chance: 0.30, stats: { damagePercent: 2, hpPercent: 2 } },
    { id: 'alch_charm',   name: 'Reagent Pouch',     nameRu: 'Мешочек с Реагентом', nameDe: 'Reagenztasche',     rarity: 'rare',      slot: 'charm',    texKey: 'alch_charm',    chance: 0.30, stats: { hpPercent: 3, damagePercent: 1 } },
    { id: 'alch_ring_e',  name: 'Transmutation Ring', nameRu: 'Кольцо Трансмутации', nameDe: 'Transmutationsring', rarity: 'epic',    slot: 'ring',     texKey: 'alch_ring',     chance: 0.08, stats: { damagePercent: 4, spellPercent: 2 } },
    { id: 'alch_charm_e', name: 'Volatile Essence',   nameRu: 'Нестабильная Эссенция', nameDe: 'Flüchtige Essenz', rarity: 'epic', slot: 'charm',    texKey: 'alch_charm',    chance: 0.08, stats: { hpPercent: 5, damagePercent: 3 } },

    { id: 'angel_ring',   name: 'Ring of Devotion',  nameRu: 'Кольцо Преданности', nameDe: 'Ring der Hingabe',    rarity: 'rare',      slot: 'ring',     texKey: 'angel_ring',    chance: 0.30, stats: { hpPercent: 2, regenPercent: 1 } },
    { id: 'angel_charm',  name: 'Holy Symbol',        nameRu: 'Священный Символ',   nameDe: 'Heiliges Symbol',     rarity: 'rare',      slot: 'charm',    texKey: 'angel_charm',   chance: 0.30, stats: { hpPercent: 2, dodgePercent: 2 } },
    { id: 'angel_ring_e', name: 'Covenant Ring',     nameRu: 'Кольцо Завета',      nameDe: 'Bundesring',          rarity: 'epic',      slot: 'ring',     texKey: 'angel_ring',    chance: 0.08, stats: { hpPercent: 4, regenPercent: 3 } },
    { id: 'angel_charm_e',name: 'Ward of Grace',     nameRu: 'Оберег Благодати',   nameDe: 'Wächter der Gnade',   rarity: 'epic',      slot: 'charm',    texKey: 'angel_charm',   chance: 0.08, stats: { hpPercent: 5, dodgePercent: 4 } }
];

export const ACCOUNT_EQUIP_DB_CAVE = [
    { id: 'relic_cave_sage',     name: 'Relic of Depths',       nameRu: 'Реликвия Глубин',      nameDe: 'Reliktiefe',          rarity: 'legendary', slot: 'relic', texKey: 'sage_book',   chance: 0.33, stats: {}, effect: 'fireball_chain', classes: ['sage'], locked: true, relic: true },
    { id: 'relic_cave_alchemist', name: 'Relic of Fermentation', nameRu: 'Реликвия Брожения',   nameDe: 'Reliktgärung',        rarity: 'legendary', slot: 'relic', texKey: 'alch_wand',   chance: 0.33, stats: {}, effect: 'craft_bonus',   classes: ['alchemist'], locked: true, relic: true },
    { id: 'relic_cave_angel',    name: 'Relic of Grace',        nameRu: 'Реликвия Благодати',   nameDe: 'Reliktder Gnade',     rarity: 'legendary', slot: 'relic', texKey: 'angel_staff', chance: 0.34, stats: {}, effect: 'purify_heal',  classes: ['angel'], locked: true, relic: true }
];
export const CAVE_RELIC_CLASSES = ['sage', 'alchemist', 'angel'];

export const ACCOUNT_EQUIP_DB_VILLAGE = [
    { id: 'relic_village_sage',      name: 'Tome of Flames',     nameRu: 'Том Пламени',       nameDe: 'Flammenschaft',    rarity: 'legendary', slot: 'accessory', texKey: 'sage_book', chance: 0.50, stats: { spellPercent: 8, critPercent: 5 } },
    { id: 'relic_village_alchemist', name: 'Alchemist Belt',     nameRu: 'Пояс Алхимика',     nameDe: 'Alchemistengürtel', rarity: 'legendary', slot: 'accessory', texKey: 'alch_ring', chance: 0.50, stats: { hpPercent: 10, damagePercent: 6 } }
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
        lore: 'Hellfire crystals are the tears of the first demon, shed when it was cast into the deepest circle. They burn with a rage that time cannot diminish.' }
};
