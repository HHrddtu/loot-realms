export const NPC_DB = {
    elder: {
        name: 'Village Elder',
        nameRu: 'Старейшина',
        nameDe: 'Dorfältester',
        texKey: 'npc_elder',
        biome: 'forest',
        x: 680, y: 800,
        greeting: 'Brave adventurer, our village needs your help!',
        greetingRu: 'Храбрый странник, нашей деревне нужна твоя помощь!',
        greetingDe: 'Mutiger Abenteuerer, unser Dorf braucht deine Hilfe!',
        quests: ['kill_goblins', 'kill_rats', 'treant_boss']
    },
    miner: {
        name: 'Old Miner',
        nameRu: 'Старый Шахтёр',
        nameDe: 'Alter Bergmann',
        texKey: 'npc_miner',
        biome: 'mine',
        x: 400, y: 160,
        greeting: 'The mines hold treasure... and danger.',
        greetingRu: 'Шахты хранят сокровища... и опасность.',
        greetingDe: 'Die Minen bergen Schätze... und Gefahren.',
        quests: ['kill_skeletons', 'mine_chests', 'skeleton_lord_boss'],
        hideName: true
    }
};

export const QUEST_DB = {
    kill_goblins: {
        name: 'Goblin Trouble',
        nameRu: 'Проблемы с Гоблинами',
        nameDe: 'Goblin-Ärger',
        type: 'kill',
        target: 'goblin',
        count: 10,
        biome: 'forest',
        description: 'The goblins have been raiding our supplies. Put an end to their mischief.',
        descriptionRu: 'Гоблины грабят наши запасы. Положите конец их шалостям.',
        descriptionDe: 'Die Goblinen plündern unsere Vorräte. Mach ihren Machenschaften ein Ende.',
        rewards: { exp: 80, accountExp: 30 },
        rewardItems: ['iron_sword', 'leather_armor'],
        prerequisite: null
    },
    kill_rats: {
        name: 'Rat Pack',
        nameRu: 'Крысиная Стая',
        nameDe: 'Rattenhorde',
        type: 'kill',
        target: 'rat',
        count: 15,
        biome: 'forest',
        description: 'A swarm of rats has infested the forest. They must be stopped.',
        descriptionRu: 'Стая крыс захлестнула лес. Их нужно остановить.',
        descriptionDe: 'Eine Rattenschwärme hat den Wald befallen. Sie müssen aufgehalten werden.',
        rewards: { exp: 100, accountExp: 40 },
        rewardItems: ['ruby_ring'],
        prerequisite: null
    },
    treant_boss: {
        name: 'The Ancient One',
        nameRu: 'Древнее Существо',
        nameDe: 'Das Uralte',
        type: 'kill',
        target: 'ancient_treant',
        count: 1,
        biome: 'arena',
        description: 'The Ancient Treant guards the path forward. Only by defeating it can you reach the mines.',
        descriptionRu: 'Древний Трент охраняет путь вперёд. Только победив его вы доберётесь до шахт.',
        descriptionDe: 'Der Uralte Treant bewacht den Weg nach vorn. Nur durch seinen Besieg gelangst du zu den Minen.',
        rewards: { exp: 300, accountExp: 100, talentPoints: 1 },
        rewardItems: ['flame_blade'],
        prerequisite: null
    },
    kill_skeletons: {
        name: 'Bone Patrol',
        nameRu: 'Костяной Патруль',
        nameDe: 'Knochenpatrouille',
        type: 'kill',
        target: 'skeleton_warrior',
        count: 10,
        biome: 'mine',
        description: 'The skeleton warriors guard the deepest mines. Break through their ranks.',
        descriptionRu: 'Скелеты-воины охраняют глубочайшие шахты. Прорвитесь сквозь их ряды.',
        descriptionDe: 'Die Skelettkrieger bewachen die tiefsten Minen. Brich durch ihre Reihen.',
        rewards: { exp: 120, accountExp: 50 },
        rewardItems: ['iron_armor'],
        prerequisite: 'treant_boss'
    },
    mine_chests: {
        name: 'Treasure Hunter',
        nameRu: 'Охотник за Сокровищами',
        nameDe: 'Schatzjäger',
        type: 'collect',
        target: 'mine_chest',
        count: 5,
        biome: 'mine',
        description: 'The old miners left hidden chests throughout the mines. Find 5 of them.',
        descriptionRu: 'Старые шахтёры спрятали сундуки по всей шахте. Найдите 5 из них.',
        descriptionDe: 'Die alten Bergleute haben versteckte Truhen in den Minen hinterlassen. Finde 5 davon.',
        rewards: { exp: 150, accountExp: 60 },
        rewardItems: ['dragon_scale'],
        prerequisite: 'treant_boss'
    },
    skeleton_lord_boss: {
        name: 'The Bone King',
        nameRu: 'Костяной Король',
        nameDe: 'Der Knochenkönig',
        type: 'kill',
        target: 'skeleton_lord',
        count: 1,
        biome: 'mine_boss',
        description: 'The Skeleton Lord rules the dead. End his eternal reign.',
        descriptionRu: 'Повелитель Скелетов правит мёртвыми. Положите конец его вечному правлению.',
        descriptionDe: 'Der Skelett-Lord herrscht über die Toten. Beende seine ewige Herrschaft.',
        rewards: { exp: 500, accountExp: 200, talentPoints: 2 },
        rewardItems: ['crown'],
        prerequisite: 'treant_boss'
    }
};

export const CART_DRIVER_NPC = {
    cart_driver: {
        name: 'Mysterious Cart Driver',
        nameRu: 'Загадочный Извозчик',
        nameDe: 'Geheimnisvoller Kutscher',
        texKey: 'npc_cart_driver',
        biome: 'forest',
        x: 250, y: 80,
        greeting: 'That key... I know where it leads. Hop in.',
        greetingRu: 'Этот ключ... я знаю куда он ведёт. Запрыгивай.',
        greetingDe: 'Dieser Schlüssel... ich weiß wohin er führt. Steig ein.',
        requiresItem: 'secret_key',
        isCartDriver: true
    }
};
