export const SYSTEM_QUESTS = [
    {
        id: 'sys_depths_key',
        name: 'Obtain the Key',
        nameRu: 'Получи ключ',
        nameDe: 'Erhalte den Schlüssel',
        description: 'Defeat the Lich King in the Depths to obtain the key to Cursed Lands.',
        descriptionRu: 'Победи Короля Лича в Подземелье, чтобы получить ключ в Проклятые Земли.',
        descriptionDe: 'Besiege den Lichkönig in den Tiefen, um den Schlüssel zu den Verfluchten Landen zu erhalten.',
        target: 'depthsBossDefeated',
        zone: 'depths',
        reward: 'Unlocks Cursed Lands'
    },
    {
        id: 'sys_cursed_village',
        name: 'Find the Village',
        nameRu: 'Найди деревню',
        nameDe: 'Finde das Dorf',
        description: 'Discover the hidden village in Cursed Lands.',
        descriptionRu: 'Найди скрытую деревню в Проклятых Землях.',
        descriptionDe: 'Entdecke das versteckte Dorf in den Verfluchten Landen.',
        target: 'cursedBossDefeated',
        zone: 'cursed',
        reward: 'Unlocks Shadow District'
    },
    {
        id: 'sys_shadow_clear',
        name: 'Clear the Shadow District',
        nameRu: 'Очисти Теневой Район',
        nameDe: 'Säubere den Schattenbezirk',
        description: 'Defeat the Shadow King to open the path to the Tower.',
        descriptionRu: 'Победи Короля Теней, чтобы открыть путь к Башне.',
        descriptionDe: 'Besiege den Schattenkönig, um den Weg zum Turm zu öffnen.',
        target: 'shadowBossDefeated',
        zone: 'shadow',
        reward: 'Unlocks Tower'
    },
    {
        id: 'sys_tower_king',
        name: 'Free the Fallen King',
        nameRu: 'Освободи Павшего Короля',
        nameDe: 'Befreie den Gefallenen König',
        description: 'Defeat the Fallen King to open the path to the Throne.',
        descriptionRu: 'Победи Павшего Короля, чтобы открыть путь к Трону.',
        descriptionDe: 'Besiege den Gefallenen König, um den Weg zum Thron zu öffnen.',
        target: 'towerBossDefeated',
        zone: 'tower',
        reward: 'Unlocks Throne of Eternity'
    },
    {
        id: 'sys_throne_final',
        name: 'Defeat the Eternity Lord',
        nameRu: 'Победи Повелителя Вечности',
        nameDe: 'Besiege den Herrn der Ewigkeit',
        description: 'Defeat the final boss to unlock Prestige mode.',
        descriptionRu: 'Победи финального босса, чтобы открыть режим Престижа.',
        descriptionDe: 'Besiege den Endboss, um den Prestige-Modus freizuschalten.',
        target: 'throneBossDefeated',
        zone: 'throne',
        reward: 'Unlocks Prestige'
    }
];
