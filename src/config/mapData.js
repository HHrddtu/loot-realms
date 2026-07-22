export const MAP_CHAPTERS = [
    {
        id: 'ch1',
        name: 'The Beginning',
        nameRu: 'Начало',
        nameDe: 'Der Anfang',
        color: 0x27ae60,
        zones: [
            { key: 'meadow', name: 'Meadow', nameRu: 'Луг', nameDe: 'Wiese', x: 0, y: 0 },
            { key: 'forest', name: 'Forest', nameRu: 'Лес', nameDe: 'Wald', x: 1, y: 0 },
            { key: 'arena', name: 'Arena', nameRu: 'Арена', nameDe: 'Arena', x: 2, y: 0 },
            { key: 'mine', name: 'Mine', nameRu: 'Шахта', nameDe: 'Mine', x: 3, y: 0 },
            { key: 'cave', name: 'Cave', nameRu: 'Пещера', nameDe: 'Höhle', x: 4, y: 0 }
        ]
    },
    {
        id: 'ch2',
        name: 'The Village',
        nameRu: 'Деревня',
        nameDe: 'Das Dorf',
        color: 0xe67e22,
        zones: [
            { key: 'village', name: 'Village', nameRu: 'Деревня', nameDe: 'Dorf', x: 0, y: 0 },
            { key: 'cemetery', name: 'Cemetery', nameRu: 'Кладбище', nameDe: 'Friedhof', x: 1, y: 0 }
        ]
    },
    {
        id: 'ch3',
        name: 'Fire and Ice',
        nameRu: 'Огонь и Лёд',
        nameDe: 'Feuer und Eis',
        color: 0xe74c3c,
        requireItem: 'magma_armor',
        zones: [
            { key: 'hell', name: 'Hell', nameRu: 'Ад', nameDe: 'Hölle', x: 0, y: 0 },
            { key: 'snowy', name: 'Snowy Village', nameRu: 'Замёрзшая Деревня', nameDe: 'Gefrorenes Dorf', x: 1, y: 0 }
        ]
    },
    {
        id: 'ch4',
        name: 'The Fortress',
        nameRu: 'Крепость',
        nameDe: 'Die Festung',
        color: 0x9b59b6,
        requireItem: 'warmth_core',
        zones: [
            { key: 'castle', name: 'Castle', nameRu: 'Замок', nameDe: 'Burg', x: 0, y: 0 },
            { key: 'depths', name: 'Depths', nameRu: 'Глубины', nameDe: 'Tiefen', x: 1, y: 0 }
        ]
    },
    {
        id: 'ch5',
        name: 'Darkness and Eternity',
        nameRu: 'Тьма и Вечность',
        nameDe: 'Dunkelheit und Ewigkeit',
        color: 0x2c3e50,
        requireItem: 'castle_key',
        zones: [
            { key: 'cursed', name: 'Cursed Lands', nameRu: 'Проклятые Земли', nameDe: 'Verfluchte Lande', x: 0, y: 0 },
            { key: 'shadow', name: 'Shadow Realm', nameRu: 'Теневой Мир', nameDe: 'Schattenreich', x: 1, y: 0 },
            { key: 'tower', name: 'Tower', nameRu: 'Башня', nameDe: 'Turm', x: 2, y: 0 },
            { key: 'throne', name: 'Throne', nameRu: 'Трон', nameDe: 'Thron', x: 3, y: 0 }
        ]
    }
];

export const ZONE_CHAPTER_MAP = {};
MAP_CHAPTERS.forEach(ch => {
    ch.zones.forEach(z => { ZONE_CHAPTER_MAP[z.key] = ch.id; });
});
