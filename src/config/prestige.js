export const PRESTIGE_CONFIG = {
    maxLevel: 3,
    enemyHpMultiplier: 1.5,
    enemyDmgMultiplier: 1.3,
    lootBonusPerLevel: 0.1,
    expBonusPerLevel: 0.15,
    modifiers: [
        { level: 1, name: 'Glass Cannon', nameRu: 'Хрупкий Кannon', nameDe: 'Glaskanone', description: 'x2 damage, x0.5 max HP', descriptionRu: 'x2 урона, x0.5 макс. HP', descriptionDe: 'x2 Schaden, x0.5 max. HP', effect: { dmgMult: 2.0, hpMult: 0.5 } },
        { level: 2, name: 'Speed Demon', nameRu: 'Демон Скорости', nameDe: 'Geschwindigkeitsdämon', description: '+30% movement speed', descriptionRu: '+30% скорость движения', descriptionDe: '+30% Bewegungsgeschwindigkeit', effect: { speedBonus: 0.3 } },
        { level: 3, name: 'Ascended', nameRu: 'Вознесённый', nameDe: 'Aufgestiegen', description: '+50% all stats', descriptionRu: '+50% ко всем характеристикам', descriptionDe: '+50% alle Werte', effect: { allStatsBonus: 0.5 } }
    ]
};
