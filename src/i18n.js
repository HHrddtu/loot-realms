let currentLang = 'en';

const STORAGE_KEY = 'lootrealms_lang';

export function getLang() {
    return currentLang;
}

export function setLang(lang) {
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
}

export function loadLang() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && LOCALES[saved]) currentLang = saved;
    } catch (e) {}
}

export function t(key) {
    const locale = LOCALES[currentLang] || LOCALES.en;
    return locale[key] || LOCALES.en[key] || key;
}

const LOCALES = {
    en: {
        // === MENU ===
        'menu.title': 'LOOT REALMS',
        'menu.subtitle': 'PvE Adventure Loot Game',
        'menu.start': 'START GAME',
        'menu.account': 'ACCOUNT',
        'menu.advanced': 'ADVANCED',
        'menu.version': 'v0.14.0',
        'menu.logout': 'LOGOUT',
        'menu.multiplayer': 'MULTIPLAYER',

        // === MULTIPLAYER ===
        'mp.title': 'MULTIPLAYER',
        'mp.subtitle': 'Play with friends',
        'mp.create': 'CREATE ROOM',
        'mp.join': 'JOIN ROOM',
        'mp.joinRoom': 'JOIN ROOM',
        'mp.code': 'CODE',
        'mp.connect': 'CONNECT',
        'mp.back': 'BACK',
        'mp.youAreHost': 'YOU ARE HOST',
        'mp.connected': 'CONNECTED',
        'mp.roomCode': 'Room Code',
        'mp.shareCode': 'Share this code with your friends',
        'mp.players': 'Players',
        'mp.waiting': 'Waiting for players...',
        'mp.startGame': 'START GAME',
        'mp.leave': 'LEAVE',
        'mp.enterName': 'Enter your name',
        'mp.invalidCode': 'Enter 4-digit code',
        'mp.createError': 'Failed to create room',
        'mp.joinError': 'Could not connect. Check code.',
        'mp.connecting': 'Connecting...',

        // === LOGIN ===
        'login.title': 'LOGIN',
        'login.subtitle': 'Sign in to save your progress',
        'login.login': 'LOGIN',
        'login.register': 'REGISTER',
        'login.guest': 'PLAY AS GUEST',
        'login.hint': 'Guest progress is saved locally.\nRegister to sync across devices.',
        'login.allFields': 'Fill in all fields',
        'login.emptyFields': 'Enter email and password',
        'login.emailInUse': 'Email already in use',
        'login.invalidEmail': 'Invalid email',
        'login.userNotFound': 'User not found',
        'login.wrongPassword': 'Wrong password',
        'login.weakPassword': 'Password must be at least 6 characters',
        'login.tooMany': 'Too many attempts. Try later',
        'login.networkError': 'Network error',
        'login.invalidCredential': 'Invalid email or password',
        'login.genericError': 'Login failed',
        'menu.version': 'v0.9.0',

        // === ADVANCED SETTINGS ===
        'adv.title': 'ADVANCED SETTINGS',
        'adv.difficulty': 'DIFFICULTY',
        'adv.load': 'LOAD GAME',
        'adv.changeClass': 'CHANGE CLASS',
        'adv.talents': 'TALENTS',
        'adv.accountEquip': 'ACCOUNT EQUIP',
        'adv.instructions': 'INSTRUCTIONS',
        'adv.exit': 'EXIT',
        'adv.language': 'LANGUAGE',
        'adv.close': 'CLOSE',

        // === ACCOUNT ===
        'acc.title': 'ACCOUNT',
        'acc.level': 'Account Level',
        'acc.noClasses': 'No classes played yet',
        'acc.stats': 'ACCOUNT STATS',
        'acc.totalKills': 'Total Kills',
        'acc.totalStumps': 'Total Stumps',
        'acc.playTime': 'Play Time',
        'acc.lastSave': 'LAST SAVE',
        'acc.class': 'Class',
        'acc.level2': 'Level',

        // === ACCOUNT EQUIP ===
        'accEquip.title': 'ACCOUNT EQUIPMENT',
        'accEquip.hat': 'Hat',
        'accEquip.mantle': 'Mantle',
        'accEquip.legs': 'Legs',
        'accEquip.weapon': 'Weapon',
        'accEquip.acc': 'Acc',
        'accEquip.ring': 'Ring',
        'accEquip.charm': 'Charm',
        'accEquip.relic': 'Relic',

        // === CLASS SELECT ===
        'class.title': 'CHOOSE YOUR CLASS',
        'class.subtitle': 'Select a class to begin your journey',
        'class.begin': 'BEGIN JOURNEY',
        'class.difficulty': 'Difficulty',

        // === GAME UI ===
        'game.hp': 'HP',
        'game.corruption': 'COR',
        'game.exp': 'EXP',
        'game.level': 'Lv.',
        'game.pause': 'PAUSED',
        'game.resume': 'RESUME',
        'game.menu': 'MENU',
        'game.death': 'YOU DIED',
        'game.death.msg': 'The darkness claims another soul.',
        'game.respawn': 'RESPAWN',
        'game.victory': 'VICTORY!',
        'game.victory.msg': 'The boss has been vanquished!',

        // === PAUSE ===
        'pause.title': 'PAUSED',
        'pause.resume': 'RESUME',
        'pause.inventory': 'INVENTORY',
        'pause.accountEquip': 'ACCOUNT EQUIP',
        'pause.changeClass': 'CHANGE CLASS',
        'pause.save': 'SAVE',
        'pause.restart': 'RESTART',
        'pause.back': 'BACK',
        'pause.menu': 'MENU',

        // === INVENTORY ===
        'inv.title': 'INVENTORY',
        'inv.equipped': 'EQUIPPED',
        'inv.materials': 'MATERIALS',
        'inv.equipBag': 'EQUIP BAG',
        'inv.accountEquip': 'ACCOUNT EQUIP',
        'inv.noItem': '---',
        'inv.hp': 'HP',
        'inv.dmg': 'DMG',
        'inv.spd': 'SPD',
        'inv.empty': 'Empty',

        // === QUEST LOG ===
        'quest.title': 'QUEST LOG',
        'quest.noQuests': 'No active quests.\nTalk to NPCs to get quests!',
        'quest.close': 'CLOSE',
        'quest.kill': 'Kill',
        'quest.collect': 'Collect',
        'quest.rewards': 'Rewards',
        'quest.complete': 'COMPLETE',

        // === QUEST NPC INTERACTION ===
        'quest.npc.talk': 'TALK',
        'quest.npc.giveReward': 'GIVE REWARD',
        'quest.npc.noQuests': 'No quests available.',
        'quest.npc.nextQuest': 'Next quest available',
        'quest.npc.needPrereq': 'Complete prerequisite quest first',
        'quest.npc.questAccepted': 'Quest accepted!',
        'quest.npc.questComplete': 'Quest complete!',

        // === SPELLS ===
        'spell.cast': 'CAST',
        'spell.cooldown': 'CD',
        'spell.cost': 'COR',

        // === BESTIARY ===
        'bestiary.title': 'BESTIARY',
        'bestiary.kills': 'Kills',
        'bestiary.level': 'Level',
        'bestiary.dmgBonus': 'DMG Bonus',
        'bestiary.expBonus': 'EXP Bonus',
        'bestiary.weaknesses': 'Weaknesses',
        'bestiary.resistances': 'Resistances',
        'bestiary.abilities': 'Abilities',
        'bestiary.lore': 'Lore',
        'bestiary.description': 'Description',
        'bestiary.locked': '???',
        'bestiary.nextLevel': 'Next level at',
        'bestiary.kills2': 'kills',
        'bestiary.close': 'CLOSE',
        'bestiary.prev': '<',
        'bestiary.next': '>',

        // === CRAFTING ===
        'craft.title': 'CRAFTING TABLE',
        'craft.craft': 'CRAFT',
        'craft.locked': 'LOCKED',
        'craft.materials': 'Materials',
        'craft.bonus': 'Alchemist Bonus: 15% double yield',
        'craft.success': 'CRAFTED!',
        'craft.double': 'Double Yield!',

        // === MATERIAL BOOK ===
        'matBook.title': 'MATERIAL BOOK',
        'matBook.collected': 'Collected',
        'matBook.level': 'Level',
        'matBook.hpBonus': 'HP Bonus',
        'matBook.dmgBonus': 'DMG Bonus',
        'matBook.spdBonus': 'SPD Bonus',
        'matBook.description': 'Description',
        'matBook.properties': 'Properties',
        'matBook.recipe': 'Recipe',
        'matBook.lore': 'Lore',
        'matBook.locked': '???',
        'matBook.close': 'CLOSE',
        'matBook.prev': '<',
        'matBook.next': '>',
        'matBook.biome': 'Found in',

        // === SOUL BOOK ===
        'soulBook.title': 'SOUL BOOK',
        'soulBook.collected': 'Collected',
        'soulBook.level': 'Level',
        'soulBook.hpBonus': 'HP Bonus',
        'soulBook.dmgBonus': 'DMG Bonus',
        'soulBook.corDecay': 'Corruption Decay',
        'soulBook.description': 'Description',
        'soulBook.weakness': 'Weakness',
        'soulBook.essence': 'Essence',
        'soulBook.purification': 'Purification',
        'soulBook.lore': 'Lore',
        'soulBook.locked': '???',
        'soulBook.close': 'CLOSE',
        'soulBook.prev': '<',
        'soulBook.next': '>',
        'soulBook.biome': 'Found in',

        // === TOOLTIPS ===
        'tip.equipped': 'EQUIPPED',
        'tip.slot': 'Slot',
        'tip.rarity': 'Rarity',
        'tip.effect': 'Effect',
        'tip.pressToEquip': 'Click to equip',
        'tip.pressToUnequip': 'Click to unequip',
        'tip.pressToConsume': 'Click to consume',
        'tip.noEffect': 'No effect',
        'tip.difficulty': 'Difficulty',
        'tip.biome': 'Biome',

        // === INSTRUCTIONS ===
        'instr.title': 'INSTRUCTIONS',
        'instr.controls': 'CONTROLS:',
        'instr.move': 'Arrow keys - Move',
        'instr.attack': 'SPACE - Attack/Break',
        'instr.inventory': 'I - Inventory',
        'instr.pause': 'P - Pause',
        'instr.questLog': 'N - Quest Log',
        'instr.gameplay': 'GAMEPLAY:',
        'instr.killEnemies': 'Kill enemies for EXP + rare gear',
        'instr.breakStumps': 'Break stumps for stat materials',
        'instr.materialSlots': '6 material slots give passive bonuses',
        'instr.levelUp': 'Level up to grow stronger',

        // === EXIT ===
        'exit.title': 'EXIT GAME?',
        'exit.yes': 'YES',
        'exit.no': 'NO',
        'exit.msg': 'Game closed (demo)',

        // === ERRORS ===
        'err.noClass': 'NO CLASS SELECTED',
        'err.noClassMsg': 'Start a new game to choose your class first.',

        // === TALENTS ===
        'talent.title': 'TALENT TREE',
        'talent.points': 'Points',
        'talent.account': 'ACCOUNT TALENTS',
        'talent.accountPoints': 'Account Points',
        'talent.close': 'CLOSE',
        'talent.reset': 'RESPEC',
        'talent.lock': 'LOCK',
        'talent.back': 'BACK',
        'talent.locked': 'Locked',
        'talent.unlocked': 'Unlocked',
        'talent.requires': 'Requires',
        'talent.cost': 'Cost',
        'talent.gold': 'Gold',
        'talent.notEnoughGold': 'Not enough gold!',

        // === ZONE NAMES ===
        'zone.forest': 'Forest',
        'zone.mine': 'Mine',
        'zone.arena': 'Arena',

        // === KEYBINDS ===
        'keybind.title': 'CONTROLS',
        'keybind.hint': 'Click a key to rebind. ESC to cancel.',
        'keybind.pressKey': 'Press a key...',
        'keybind.reset': 'RESET DEFAULT',
        'keybind.done': 'DONE',
        'keybind.controls': 'Controls',
    },

    ru: {
        // === MENU ===
        'menu.title': 'LOOT REALMS',
        'menu.subtitle': 'PvE Игра с Лутом',
        'menu.start': 'НАЧАТЬ ИГРУ',
        'menu.account': 'АККАУНТ',
        'menu.advanced': 'НАСТРОЙКИ',
        'menu.version': 'v0.14.0',
        'menu.logout': 'ВЫЙТИ',
        'menu.multiplayer': 'МУЛЬТИПЛЕЕР',

        // === MULTIPLAYER ===
        'mp.title': 'МУЛЬТИПЛЕЕР',
        'mp.subtitle': 'Играй с друзьями',
        'mp.create': 'СОЗДАТЬ КОМНАТУ',
        'mp.join': 'ВОЙТИ В КОМНАТУ',
        'mp.joinRoom': 'ВОЙТИ В КОМНАТУ',
        'mp.code': 'КОД',
        'mp.connect': 'ПОДКЛЮЧИТЬСЯ',
        'mp.back': 'НАЗАД',
        'mp.youAreHost': 'ВЫ ХОСТ',
        'mp.connected': 'ПОДКЛЮЧЁН',
        'mp.roomCode': 'Код комнаты',
        'mp.shareCode': 'Поделитесь этим кодом с друзьями',
        'mp.players': 'Игроки',
        'mp.waiting': 'Ожидание игроков...',
        'mp.startGame': 'НАЧАТЬ ИГРУ',
        'mp.leave': 'ВЫЙТИ',
        'mp.enterName': 'Введите имя',
        'mp.invalidCode': 'Введите 4-значный код',
        'mp.createError': 'Не удалось создать комнату',
        'mp.joinError': 'Не удалось подключиться. Проверьте код.',
        'mp.connecting': 'Подключение...',

        // === LOGIN ===
        'login.title': 'ВХОД',
        'login.subtitle': 'Войдите, чтобы сохранять прогресс',
        'login.login': 'ВОЙТИ',
        'login.register': 'РЕГИСТРАЦИЯ',
        'login.guest': 'ИГРАТЬ КАК ГОСТЬ',
        'login.hint': 'Прогресс гостя сохраняется локально.\nЗарегистрируйтесь для синхронизации.',
        'login.allFields': 'Заполните все поля',
        'login.emptyFields': 'Введите email и пароль',
        'login.emailInUse': 'Email уже используется',
        'login.invalidEmail': 'Некорректный email',
        'login.userNotFound': 'Пользователь не найден',
        'login.wrongPassword': 'Неверный пароль',
        'login.weakPassword': 'Пароль должен быть не менее 6 символов',
        'login.tooMany': 'Слишком много попыток. Попробуйте позже',
        'login.networkError': 'Ошибка сети',
        'login.invalidCredential': 'Неверный email или пароль',
        'login.genericError': 'Ошибка входа',

        // === ADVANCED SETTINGS ===
        'adv.title': 'РАСШИРЕННЫЕ НАСТРОЙКИ',
        'adv.difficulty': 'СЛОЖНОСТЬ',
        'adv.load': 'ЗАГРУЗИТЬ ИГРУ',
        'adv.changeClass': 'СМЕНИТЬ КЛАСС',
        'adv.talents': 'ТАЛАНТЫ',
        'adv.accountEquip': 'СНАРЯЖЕНИЕ',
        'adv.instructions': 'ИНСТРУКЦИИ',
        'adv.exit': 'ВЫХОД',
        'adv.language': 'ЯЗЫК',
        'adv.close': 'ЗАКРЫТЬ',

        // === ACCOUNT ===
        'acc.title': 'АККАУНТ',
        'acc.level': 'Уровень аккаунта',
        'acc.noClasses': 'Классы ещё не выбраны',
        'acc.stats': 'СТАТИСТИКА',
        'acc.totalKills': 'Всего убийств',
        'acc.totalStumps': 'Всего пней',
        'acc.playTime': 'Время игры',
        'acc.lastSave': 'ПОСЛЕДНЕЕ СОХРАНЕНИЕ',
        'acc.class': 'Класс',
        'acc.level2': 'Уровень',

        // === ACCOUNT EQUIP ===
        'accEquip.title': 'СНАРЯЖЕНИЕ АККАУНТА',
        'accEquip.hat': 'Шляпа',
        'accEquip.mantle': 'Мантия',
        'accEquip.legs': 'Штаны',
        'accEquip.weapon': 'Оружие',
        'accEquip.acc': 'Акс.',
        'accEquip.ring': 'Кольцо',
        'accEquip.charm': 'Талисман',
        'accEquip.relic': 'Реликвия',

        // === CLASS SELECT ===
        'class.title': 'ВЫБЕРИТЕ КЛАСС',
        'class.subtitle': 'Выберите класс для начала путешествия',
        'class.begin': 'НАЧАТЬ ПУТЕШЕСТВИЕ',
        'class.difficulty': 'Сложность',

        // === GAME UI ===
        'game.hp': 'ЗД',
        'game.corruption': 'ПОР',
        'game.exp': 'ОПЫТ',
        'game.level': 'Ур.',
        'game.pause': 'ПАУЗА',
        'game.resume': 'ПРОДОЛЖИТЬ',
        'game.menu': 'МЕНЮ',
        'game.death': 'ВЫ ПОГИБЛИ',
        'game.death.msg': 'Тьма забирает ещё одну душу.',
        'game.respawn': 'ВОЗРОДИТЬСЯ',
        'game.victory': 'ПОБЕДА!',
        'game.victory.msg': 'Босс повержен!',

        // === PAUSE ===
        'pause.title': 'ПАУЗА',
        'pause.resume': 'ПРОДОЛЖИТЬ',
        'pause.inventory': 'ИНВЕНТАРЬ',
        'pause.accountEquip': 'СНАРЯЖЕНИЕ',
        'pause.changeClass': 'СМЕНИТЬ КЛАСС',
        'pause.save': 'СОХРАНИТЬ',
        'pause.restart': 'НАЧАТЬ ЗАНОВО',
        'pause.back': 'НАЗАД',
        'pause.menu': 'МЕНЮ',

        // === INVENTORY ===
        'inv.title': 'ИНВЕНТАРЬ',
        'inv.equipped': 'ЭКИПИРОВАНО',
        'inv.materials': 'МАТЕРИАЛЫ',
        'inv.equipBag': 'СУМКА СНАРЯЖЕНИЯ',
        'inv.accountEquip': 'СНАРЯЖЕНИЕ АККАУНТА',
        'inv.noItem': '---',
        'inv.hp': 'ЗД',
        'inv.dmg': 'УРН',
        'inv.spd': 'СКР',
        'inv.empty': 'Пусто',

        // === QUEST LOG ===
        'quest.title': 'ЖУРНАЛ КВЕСТОВ',
        'quest.noQuests': 'Нет активных квестов.\nПоговорите с NPC чтобы получить квесты!',
        'quest.close': 'ЗАКРЫТЬ',
        'quest.kill': 'Убить',
        'quest.collect': 'Собрать',
        'quest.rewards': 'Награда',
        'quest.complete': 'ВЫПОЛНЕН',

        // === QUEST NPC INTERACTION ===
        'quest.npc.talk': 'ГОВОРИТЬ',
        'quest.npc.giveReward': 'ВЫДАТЬ НАГРАДУ',
        'quest.npc.noQuests': 'Нет доступных квестов.',
        'quest.npc.nextQuest': 'Следующий квест доступен',
        'quest.npc.needPrereq': 'Сначала выполните предыдущий квест',
        'quest.npc.questAccepted': 'Квест принят!',
        'quest.npc.questComplete': 'Квест выполнен!',

        // === SPELLS ===
        'spell.cast': 'ПРИМЕНИТЬ',
        'spell.cooldown': 'ПЕРЕЗ',
        'spell.cost': 'ПОР',

        // === BESTIARY ===
        'bestiary.title': 'БЕСТІАРІЙ',
        'bestiary.kills': 'Убийств',
        'bestiary.level': 'Уровень',
        'bestiary.dmgBonus': 'Бонус Урона',
        'bestiary.expBonus': 'Бонус Опыта',
        'bestiary.weaknesses': 'Слабости',
        'bestiary.resistances': 'Сопротивления',
        'bestiary.abilities': 'Способности',
        'bestiary.lore': 'Лор',
        'bestiary.description': 'Описание',
        'bestiary.locked': '???',
        'bestiary.nextLevel': 'Следующий уровень через',
        'bestiary.kills2': 'убийств',
        'bestiary.close': 'ЗАКРЫТЬ',
        'bestiary.prev': '<',
        'bestiary.next': '>',

        // === CRAFTING ===
        'craft.title': 'МАСТЕРСКАЯ',
        'craft.craft': 'КРАФТ',
        'craft.locked': 'ЗАБЛОКИРОВАНО',
        'craft.materials': 'Материалы',
        'craft.bonus': 'Бонус Алхимика: 15% шанс двойного результата',
        'craft.success': 'СОЗДАНО!',
        'craft.double': 'Двойной результат!',

        // === MATERIAL BOOK ===
        'matBook.title': 'КНИГА МАТЕРИАЛОВ',
        'matBook.collected': 'Собрано',
        'matBook.level': 'Уровень',
        'matBook.hpBonus': 'Бонус ЗД',
        'matBook.dmgBonus': 'Бонус Урона',
        'matBook.spdBonus': 'Бонус Скорости',
        'matBook.description': 'Описание',
        'matBook.properties': 'Свойства',
        'matBook.recipe': 'Рецепт',
        'matBook.lore': 'Лор',
        'matBook.locked': '???',
        'matBook.close': 'ЗАКРЫТЬ',
        'matBook.prev': '<',
        'matBook.next': '>',
        'matBook.biome': 'Найти в',

        // === SOUL BOOK ===
        'soulBook.title': 'КНИГА ДУШ',
        'soulBook.collected': 'Собрано',
        'soulBook.level': 'Уровень',
        'soulBook.hpBonus': 'Бонус ЗД',
        'soulBook.dmgBonus': 'Бонус Урона',
        'soulBook.corDecay': 'Распад Порчи',
        'soulBook.description': 'Описание',
        'soulBook.weakness': 'Слабость',
        'soulBook.essence': 'Эссенция',
        'soulBook.purification': 'Очищение',
        'soulBook.lore': 'Лор',
        'soulBook.locked': '???',
        'soulBook.close': 'ЗАКРЫТЬ',
        'soulBook.prev': '<',
        'soulBook.next': '>',
        'soulBook.biome': 'Найти в',

        // === TOOLTIPS ===
        'tip.equipped': 'ЭКИПИРОВАНО',
        'tip.slot': 'Слот',
        'tip.rarity': 'Редкость',
        'tip.effect': 'Эффект',
        'tip.pressToEquip': 'Нажмите чтобы экипировать',
        'tip.pressToUnequip': 'Нажмите чтобы снять',
        'tip.pressToConsume': 'Нажмите чтобы использовать',
        'tip.noEffect': 'Нет эффекта',
        'tip.difficulty': 'Сложность',
        'tip.biome': 'Биом',

        // === INSTRUCTIONS ===
        'instr.title': 'ИНСТРУКЦИИ',
        'instr.controls': 'УПРАВЛЕНИЕ:',
        'instr.move': 'Стрелки - Движение',
        'instr.attack': 'ПРОБЕЛ - Атака/Ломать',
        'instr.inventory': 'I - Инвентарь',
        'instr.pause': 'P - Пауза',
        'instr.questLog': 'N - Журнал квестов',
        'instr.gameplay': 'ИГРА:',
        'instr.killEnemies': 'Убивайте врагов за опыт и снаряжение',
        'instr.breakStumps': 'Ломайте пни за материалы',
        'instr.materialSlots': '6 слотов материалов дают бонусы',
        'instr.levelUp': 'Повышайте уровень чтобы стать сильнее',

        // === EXIT ===
        'exit.title': 'ВЫЙТИ ИЗ ИГРЫ?',
        'exit.yes': 'ДА',
        'exit.no': 'НЕТ',
        'exit.msg': 'Игра закрыта (демо)',

        // === ERRORS ===
        'err.noClass': 'КЛАСС НЕ ВЫБРАН',
        'err.noClassMsg': 'Начните новую игру чтобы выбрать класс.',

        // === TALENTS ===
        'talent.title': 'ДЕРЕВО ТАЛАНТОВ',
        'talent.points': 'Очки',
        'talent.account': 'ТАЛАНТЫ АККАУНТА',
        'talent.accountPoints': 'Очки аккаунта',
        'talent.close': 'ЗАКРЫТЬ',
        'talent.reset': 'РЕСПЕК',
        'talent.lock': 'ЗАБЛОКИРОВАТЬ',
        'talent.back': 'НАЗАД',
        'talent.locked': 'Заблокирован',
        'talent.unlocked': 'Разблокирован',
        'talent.requires': 'Требуется',
        'talent.cost': 'Стоимость',
        'talent.gold': 'Золото',
        'talent.notEnoughGold': 'Недостаточно золота!',

        // === ZONE NAMES ===
        'zone.forest': 'Лес',
        'zone.mine': 'Шахта',
        'zone.arena': 'Арена',

        // === KEYBINDS ===
        'keybind.title': 'УПРАВЛЕНИЕ',
        'keybind.hint': 'Нажмите на клавишу для переназначения. ESC для отмены.',
        'keybind.pressKey': 'Нажмите клавишу...',
        'keybind.reset': 'СБРОСИТЬ',
        'keybind.done': 'ГОТОВ',
        'keybind.controls': 'Управление',
    },

    de: {
        // === MENU ===
        'menu.title': 'LOOT REALMS',
        'menu.subtitle': 'PvE Abenteuer Loot Spiel',
        'menu.start': 'SPIEL STARTEN',
        'menu.account': 'KONTO',
        'menu.advanced': 'ERWEITERT',
        'menu.version': 'v0.14.0',
        'menu.logout': 'ABMELDEN',
        'menu.multiplayer': 'MEHRSPIELER',

        // === MULTIPLAYER ===
        'mp.title': 'MEHRSPIELER',
        'mp.subtitle': 'Spiele mit Freunden',
        'mp.create': 'RAUM ERSTELLEN',
        'mp.join': 'RAUM BEITRETEN',
        'mp.joinRoom': 'RAUM BEITRETEN',
        'mp.code': 'CODE',
        'mp.connect': 'VERBINDEN',
        'mp.back': 'ZURÜCK',
        'mp.youAreHost': 'DU BIST HOST',
        'mp.connected': 'VERBUNDEN',
        'mp.roomCode': 'Raumcode',
        'mp.shareCode': 'Teile diesen Code mit deinen Freunden',
        'mp.players': 'Spieler',
        'mp.waiting': 'Warte auf Spieler...',
        'mp.startGame': 'SPIEL STARTEN',
        'mp.leave': 'VERLASSEN',
        'mp.enterName': 'Gib deinen Namen ein',
        'mp.invalidCode': 'Gib einen 4-stelligen Code ein',
        'mp.createError': 'Raum konnte nicht erstellt werden',
        'mp.joinError': 'Verbindung fehlgeschlagen. Code prüfen.',
        'mp.connecting': 'Verbindung wird hergestellt...',

        // === LOGIN ===
        'login.title': 'ANMELDUNG',
        'login.subtitle': 'Melde dich an, um Fortschritte zu speichern',
        'login.login': 'ANMELDEN',
        'login.register': 'REGISTRIEREN',
        'login.guest': 'ALS GAST SPIELEN',
        'login.hint': 'Fortschritt wird lokal gespeichert.\nRegistriere dich für Sync.',
        'login.allFields': 'Alle Felder ausfüllen',
        'login.emptyFields': 'E-Mail und Passwort eingeben',
        'login.emailInUse': 'E-Mail bereits verwendet',
        'login.invalidEmail': 'Ungültige E-Mail',
        'login.userNotFound': 'Benutzer nicht gefunden',
        'login.wrongPassword': 'Falsches Passwort',
        'login.weakPassword': 'Passwort muss mindestens 6 Zeichen haben',
        'login.tooMany': 'Zu viele Versuche. Später versuchen',
        'login.networkError': 'Netzwerkfehler',
        'login.invalidCredential': 'Ungültige E-Mail oder Passwort',
        'login.genericError': 'Anmeldung fehlgeschlagen',

        // === ADVANCED SETTINGS ===
        'adv.title': 'ERWEITERTE EINSTELLUNGEN',
        'adv.difficulty': 'SCHWIERIGKEIT',
        'adv.load': 'SPIEL LADEN',
        'adv.changeClass': 'KLASSE WECHSELN',
        'adv.talents': 'TALENTE',
        'adv.accountEquip': 'KONTO-AUSRÜSTUNG',
        'adv.instructions': 'ANLEITUNG',
        'adv.exit': 'BEENDEN',
        'adv.language': 'SPRACHE',
        'adv.close': 'SCHLIESSEN',

        // === ACCOUNT ===
        'acc.title': 'KONTO',
        'acc.level': 'Kontostufe',
        'acc.noClasses': 'Noch keine Klassen gespielt',
        'acc.stats': 'STATISTIKEN',
        'acc.totalKills': 'Gesamte Abschüsse',
        'acc.totalStumps': 'Gesamte Baumstümpfe',
        'acc.playTime': 'Spielzeit',
        'acc.lastSave': 'LETZTER SPEICHERSTAND',
        'acc.class': 'Klasse',
        'acc.level2': 'Stufe',

        // === ACCOUNT EQUIP ===
        'accEquip.title': 'KONTO-AUSRÜSTUNG',
        'accEquip.hat': 'Hut',
        'accEquip.mantle': 'Mantel',
        'accEquip.legs': 'Beine',
        'accEquip.weapon': 'Waffe',
        'accEquip.acc': 'Zub.',
        'accEquip.ring': 'Ring',
        'accEquip.charm': 'Talisman',
        'accEquip.relic': 'Relikt',

        // === CLASS SELECT ===
        'class.title': 'WÄHLE DEINE KLASSE',
        'class.subtitle': 'Wähle eine Klasse um dein Abenteuer zu beginnen',
        'class.begin': 'REISE BEGINNEN',
        'class.difficulty': 'Schwierigkeit',

        // === GAME UI ===
        'game.hp': 'LP',
        'game.corruption': 'KOR',
        'game.exp': 'EP',
        'game.level': 'St.',
        'game.pause': 'PAUSIERT',
        'game.resume': 'FORTSETZEN',
        'game.menu': 'MENÜ',
        'game.death': 'DU BIST GESTORBEN',
        'game.death.msg': 'Die Dunkelheit nimmt eine weitere Seele.',
        'game.respawn': 'WIEDERBELEBEN',
        'game.victory': 'SIEG!',
        'game.victory.msg': 'Der Boss ist besiegt!',

        // === PAUSE ===
        'pause.title': 'PAUSIERT',
        'pause.resume': 'FORTSETZEN',
        'pause.inventory': 'INVENTAR',
        'pause.accountEquip': 'KONTO-AUSRÜSTUNG',
        'pause.changeClass': 'KLASSE WECHSELN',
        'pause.save': 'SPEICHERN',
        'pause.restart': 'NEUSTART',
        'pause.back': 'ZURÜCK',
        'pause.menu': 'MENÜ',

        // === INVENTORY ===
        'inv.title': 'INVENTAR',
        'inv.equipped': 'ANGELEGT',
        'inv.materials': 'MATERIALIEN',
        'inv.equipBag': 'AUSRÜSTUNGSTASCHE',
        'inv.accountEquip': 'KONTO-AUSRÜSTUNG',
        'inv.noItem': '---',
        'inv.hp': 'LP',
        'inv.dmg': 'SCHD',
        'inv.spd': 'GESCHW',
        'inv.empty': 'Leer',

        // === QUEST LOG ===
        'quest.title': 'QUEST-LOG',
        'quest.noQuests': 'Keine aktiven Quests.\nSprich mit NPCs um Quests zu erhalten!',
        'quest.close': 'SCHLIESSEN',
        'quest.kill': 'Töte',
        'quest.collect': 'Sammle',
        'quest.rewards': 'Belohnung',
        'quest.complete': 'ERFÜLLT',

        // === QUEST NPC INTERACTION ===
        'quest.npc.talk': 'SPRECHEN',
        'quest.npc.giveReward': 'BELONUNG GEBEN',
        'quest.npc.noQuests': 'Keine Quests verfügbar.',
        'quest.npc.nextQuest': 'Nächste Quest verfügbar',
        'quest.npc.needPrereq': 'Vorherige Quest zuerst abschließen',
        'quest.npc.questAccepted': 'Quest angenommen!',
        'quest.npc.questComplete': 'Quest abgeschlossen!',

        // === SPELLS ===
        'spell.cast': 'ZAUBERN',
        'spell.cooldown': 'CD',
        'spell.cost': 'KOR',

        // === BESTIARY ===
        'bestiary.title': 'BESTIARIUM',
        'bestiary.kills': 'Abschüsse',
        'bestiary.level': 'Stufe',
        'bestiary.dmgBonus': 'Schadensbonus',
        'bestiary.expBonus': 'EP-Bonus',
        'bestiary.weaknesses': 'Schwächen',
        'bestiary.resistances': 'Resistenzen',
        'bestiary.abilities': 'Fähigkeiten',
        'bestiary.lore': 'Geschichte',
        'bestiary.description': 'Beschreibung',
        'bestiary.locked': '???',
        'bestiary.nextLevel': 'Nächste Stufe bei',
        'bestiary.kills2': 'Abschüssen',
        'bestiary.close': 'SCHLIESSEN',
        'bestiary.prev': '<',
        'bestiary.next': '>',

        // === CRAFTING ===
        'craft.title': 'WERKSTATT',
        'craft.craft': 'HERSTELLEN',
        'craft.locked': 'GESPERRT',
        'craft.materials': 'Materialien',
        'craft.bonus': 'Alchemist Bonus: 15% Doppelte Ausbeute',
        'craft.success': 'HERGESTELLT!',
        'craft.double': 'Doppelte Ausbeute!',

        // === MATERIAL BOOK ===
        'matBook.title': 'MATERIALBUCH',
        'matBook.collected': 'Gesammelt',
        'matBook.level': 'Stufe',
        'matBook.hpBonus': 'LP-Bonus',
        'matBook.dmgBonus': 'Schadensbonus',
        'matBook.spdBonus': 'Geschwindigkeitsbonus',
        'matBook.description': 'Beschreibung',
        'matBook.properties': 'Eigenschaften',
        'matBook.recipe': 'Rezept',
        'matBook.lore': 'Geschichte',
        'matBook.locked': '???',
        'matBook.close': 'SCHLIESSEN',
        'matBook.prev': '<',
        'matBook.next': '>',
        'matBook.biome': 'Gefunden in',

        // === SOUL BOOK ===
        'soulBook.title': 'SEELENBUCH',
        'soulBook.collected': 'Gesammelt',
        'soulBook.level': 'Stufe',
        'soulBook.hpBonus': 'LP-Bonus',
        'soulBook.dmgBonus': 'Schadensbonus',
        'soulBook.corDecay': 'Korruptionsabfall',
        'soulBook.description': 'Beschreibung',
        'soulBook.weakness': 'Schwäche',
        'soulBook.essence': 'Essenz',
        'soulBook.purification': 'Reinigung',
        'soulBook.lore': 'Geschichte',
        'soulBook.locked': '???',
        'soulBook.close': 'SCHLIESSEN',
        'soulBook.prev': '<',
        'soulBook.next': '>',
        'soulBook.biome': 'Gefunden in',

        // === TOOLTIPS ===
        'tip.equipped': 'ANGELEGT',
        'tip.slot': 'Platz',
        'tip.rarity': 'Seltenheit',
        'tip.effect': 'Effekt',
        'tip.pressToEquip': 'Klicken zum Anlegen',
        'tip.pressToUnequip': 'Klicken zum Ablegen',
        'tip.pressToConsume': 'Klicken zum Benutzen',
        'tip.noEffect': 'Kein Effekt',
        'tip.difficulty': 'Schwierigkeit',
        'tip.biome': 'Biom',

        // === INSTRUCTIONS ===
        'instr.title': 'ANLEITUNG',
        'instr.controls': 'STEUERUNG:',
        'instr.move': 'Pfeiltasten - Bewegen',
        'instr.attack': 'LEERTASTE - Angriff/Zerstören',
        'instr.inventory': 'I - Inventar',
        'instr.pause': 'P - Pause',
        'instr.questLog': 'N - Quest-Log',
        'instr.gameplay': 'SPIELABLAUF:',
        'instr.killEnemies': 'Feinde töten für EP + Ausrüstung',
        'instr.breakStumps': 'Baumstümpfe zerstören für Materialien',
        'instr.materialSlots': '6 Materialplätze geben passive Boni',
        'instr.levelUp': 'Aufsteigen um stärker zu werden',

        // === EXIT ===
        'exit.title': 'SPIEL BEENDEN?',
        'exit.yes': 'JA',
        'exit.no': 'NEIN',
        'exit.msg': 'Spiel geschlossen (Demo)',

        // === ERRORS ===
        'err.noClass': 'KEINE KLASSE AUSGEWÄHLT',
        'err.noClassMsg': 'Starte ein neues Spiel um deine Klasse zu wählen.',

        // === TALENTS ===
        'talent.title': 'TALENTBAUM',
        'talent.points': 'Punkte',
        'talent.account': 'KONTO-TALENTE',
        'talent.accountPoints': 'Kontopunkte',
        'talent.close': 'SCHLIESSEN',
        'talent.reset': 'RESPEC',
        'talent.lock': 'SCHLIESSEN',
        'talent.back': 'ZURÜCK',
        'talent.locked': 'Gesperrt',
        'talent.unlocked': 'Freigeschaltet',
        'talent.requires': 'Benötigt',
        'talent.cost': 'Kosten',
        'talent.gold': 'Gold',
        'talent.notEnoughGold': 'Nicht genug Gold!',

        // === ZONE NAMES ===
        'zone.forest': 'Wald',
        'zone.mine': 'Mine',
        'zone.arena': 'Arena',

        // === KEYBINDS ===
        'keybind.title': 'STEUERUNG',
        'keybind.hint': 'Klick auf eine Taste zum Umbelegen. ESC zum Abbrechen.',
        'keybind.pressKey': 'Taste drücken...',
        'keybind.reset': 'ZURÜCKSETZEN',
        'keybind.done': 'FERTIG',
        'keybind.controls': 'Steuerung',
    }
};

// Data translation helpers — used for translating names in config entries
export function translateName(entry) {
    if (currentLang === 'ru' && entry.nameRu) return entry.nameRu;
    if (currentLang === 'de' && entry.nameDe) return entry.nameDe;
    return entry.name;
}

export function translateDesc(entry, field = 'description') {
    if (currentLang === 'ru' && entry[field + 'Ru']) return entry[field + 'Ru'];
    if (currentLang === 'de' && entry[field + 'De']) return entry[field + 'De'];
    return entry[field];
}
