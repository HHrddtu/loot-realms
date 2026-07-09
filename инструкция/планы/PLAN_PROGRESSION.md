# PLAN: Прогрессия и Сложность (Option D)

#plan #progression #design

> [!INFO] Связанные заметки
> - [[GAME_DESIGN]] — механики прогрессии
> - [[PROJECT_STATE]] — текущий статус
> - [[PLAN_ROADMAP]] — дорожная карта
> - [[README]] — карта содержимого

## Текущее состояние

### Сложности (6 штук)
| Сложность | HP | DMG | EXP | Условие открытия |
|-----------|-----|-----|-----|------------------|
| Normal | ×1.0 | ×1.0 | ×1.0 | Доступна сразу |
| Hard | ×1.5 | ×1.3 | ×1.5 | Победа Treant |
| Expert | ×2.5 | ×2.0 | ×2.5 | Победа Skeleton Lord |
| Nightmare | ×4.0 | ×3.0 | ×4.0 | ? |
| Hell | ×7.0 | ×5.0 | ×7.0 | ? |
| Abyss | ×12.0 | ×8.0 | ×12.0 | ? |

### Что уже есть
- Account level (1+, EXP, level up req)
- Account talents (5 штук)
- Class talents (30 штук, 3 ветки по 10)
- 3 Книги Знаний (Bestiary/Material/Soul — бонусы за изучение)
- Account Equipment (5 слотов, per-class)

---

## Предлагаемая система: 3 уровня прогрессии

### Уровень 1: Стандартная прогрессия (Normal → Abyss)

**Как сейчас:** игрок проходит 6 сложностей последовательно.

**Что добавить:**
- **Hardcoded unlock:** каждая следующая сложность открывается после победы финального босса текущей
  - Normal → Hard: победить Treant
  - Hard → Expert: победить Skeleton Lord
  - Expert → Nightmare: победить Skeleton Lord на Expert
  - Nightmare → Hell: победить Skeleton Lord на Nightmare
  - Hell → Abyss: победить Skeleton Lord на Hell
- **Reward за каждую сложность:** разблокировка следующей + уникальный account reward

### Уровень 2: Prestige System (сброс прогресса за вечные бонусы)

**Когда открывается:** после первого прохождения Abyss (победа Skeleton Lord на Abyss).

**Как работает:**
1. Игрок нажимает "PRESTIGE" в меню аккаунта
2. **Сбрасывается:** уровень класса, таланты класса
3. **Сохраняется:** account level, account talents, account equipment, книги знаний, prestige-очки, максимальная сложность
4. **Новый ран** начинается с последней доступной сложности (не с Normal)
5. **Prestige Level** (P1, P2, P3...): каждый сброс даёт +1 prestige level
6. **Prestige Bonuses:** постоянные множители

**Prestige Rewards:**
| Prestige | Бонус |
|----------|-------|
| P1 | +10% ко всему EXP |
| P2 | +5% к DMG |
| P3 | +10% к HP |
| P4 | +5% к скорости |
| P5 | +10% к EXP, +5% DMG, +5% HP |
| P6-P10 | Повтор P1-P5 с уменьшенными бонусами |
| P10+ | +1% к EXP за каждый уровень |

**Визуально:** Prestige Level отображается в Account overlay рядом с Account Level.

### Уровень 3: Mastery System (пер-классовый прогресс)

**Что это:** помимо account-level прогрессии, каждый класс имеет свой "Mastery Level" который растёт за прохождение сложностей.

**Как работает:**
- **Mastery XP** начисляется за:
  - Убийство босса: +100 mastery XP
  - Прохождение сложности: +500 mastery XP
  - Prestige: +1000 mastery XP
- **Mastery Level** (1-100): каждый уровень даёт небольшой permanent бонус этому классу

**Mastery Rewards (каждые 10 уровней):**
| Mastery | Бонус |
|---------|-------|
| 10 | +5% DMG для этого класса |
| 20 | +5% HP для этого класса |
| 30 | +5% Speed для этого класса |
| 40 | +10% EXP для этого класса |
| 50 | +10% DMG для этого класса |
| 60 | +10% HP для этого класса |
| 70 | +10% Speed для этого класса |
| 80 | +15% EXP для этого класса |
| 90 | +15% DMG для этого класса |
| 100 | +20% ко всему + уникальный титул |

**Визуально:** Mastery Level отображается на карточке класса в ClassSelectScene.

---

## Ответы на вопросы (от игрока)

1. **Prestige reset (B):** Сбрасывается только уровень класса и таланты класса. Account Equipment, Account Talents, книги знаний, prestige-очки — сохраняются.

2. **Difficulty unlock (постепенно):** После победы над боссом открывается только следующая сложность (Normal→Hard→Expert→Nightmare→Hell→Abyss). Не больше одной за раз.

3. **Mastery cap: 100.** Бесконечность — потом, если будет интересно.

4. **Новый престиж-ран:** Начинается с последней доступной сложности (не с Normal). Если открыта Expert — престиж-ран начинается с Expert.

---

## Реализация: что нужно сделать

### Файлы для изменения

| Файл | Изменения |
|------|-----------|
| `config.js` | Difficulty unlock conditions, prestige bonuses, mastery rewards |
| `save.js` | prestigeLevel, prestigeCount, masteryXP per class, prestigeBonuses |
| `accountTalents.js` | Новые таланты связанные с prestige/mastery |
| `MenuScene.js` | Prestige button в Account overlay, prestige info |
| `ClassSelectScene.js` | Mastery Level на карточках |
| `GameScene.js` | Mastery XP начисление, prestige check |
| `i18n.js` | Новые ключи для prestige/mastery |

### Новые данные

```javascript
// config.js
export const PRESTIGE_BONUSES = [
    { level: 1, expBonus: 0.10 },
    { level: 2, dmgBonus: 0.05 },
    { level: 3, hpBonus: 0.10 },
    { level: 4, speedBonus: 0.05 },
    { level: 5, expBonus: 0.10, dmgBonus: 0.05, hpBonus: 0.05 },
    // ... до P10
];

export const MASTERY_REWARDS = [
    { level: 10, dmgBonus: 0.05 },
    { level: 20, hpBonus: 0.05 },
    { level: 30, speedBonus: 0.05 },
    { level: 40, expBonus: 0.10 },
    // ... до 100
];

export const DIFFICULTY_UNLOCK = {
    Hard: 'treant_boss',
    Expert: 'skeleton_lord_boss',
    Nightmare: 'skeleton_lord_boss',
    Hell: 'skeleton_lord_boss',
    Abyss: 'skeleton_lord_boss'
};
```

```javascript
// save.js — new account fields
{
    prestigeLevel: 0,        // P0, P1, P2...
    prestigeCount: 0,        // сколько раз prestige был сделан
    masteryXP: {             // per-class mastery
        sage: 0,
        alchemist: 0,
        angel: 0
    },
    unlockedDifficulties: ['Normal'],  // какие сложности доступны
    maxDifficultyUnlocked: 'Normal'    // последняя разблокированная сложность (для престиж-рана)
}
```

### UI изменения

**MenuScene → Account overlay:**
```
ACCOUNT
Account Level: 15 (2400/3000 EXP)
Prestige: P3 (+10% EXP, +5% DMG)
[PRESTIGE] кнопка (если доступно)
```

**ClassSelectScene → карточка класса:**
```
Sage
Mastery: Lv.47 (+18% DMG, +9% HP)
HP: 100 | DMG: 20 | SPD: 180
```

**GameScene → после победы над боссом:**
```
+100 Mastery XP (Sage)
```

**Advanced Settings → Difficulty selector:**
- Показывает только разблокированные сложности
- Заблокированные серые с текстом "Defeat [boss] on [difficulty] to unlock"
- Постепенная разблокировка: только следующая после текущей

---

## Порядок реализации

### Фаза 1: Difficulty Unlock (базовая)
1. Добавить `unlockedDifficulties` в save.js
2. Разблокировка сложностей после победы над боссом
3. UI: показать заблокированные сложности в настройках

### Фаза 2: Prestige System (основная механика)
1. Добавить prestigeLevel/prestigeCount в save.js
2. Prestige button в Account overlay
3. Сброс прогресса при prestige
4. Prestige bonuses (exp, dmg, hp, speed)
5. UI: показать prestige level

### Фаза 3: Mastery System (пер-классовый)
1. Добавить masteryXP per class в save.js
2. Mastery XP начисление (боссы, прохождение сложностей)
3. Mastery Level calculation
4. Mastery bonuses (per-class)
5. UI: mastery level на карточках классов

### Фаза 4: Polish
1. Анимации prestige
2. Звуки prestige
3. Локализация (EN/RU/DE)
4. Achievement-подобные уведомления

---

## Вопросы для обсуждения

1. **Prestige reset:** что именно сбрасывать? (класс/таланты/экипировка/квесты — да; account/книги — нет)
2. **Mastery cap:** 100 или бесконечность?
3. **Difficulty unlock:** по одному боссу или все сложности сразу после первого прохождения?
4. **Баланс:** не сделать ли prestige bonuses слишком сильными?
5. **UI:** где показывать prestige/mastery 정보?

---

## Оценка трудозатрат

| Фаза | Время |
|------|-------|
| Фаза 1: Difficulty Unlock | 1-2 часа |
| Фаза 2: Prestige System | 2-3 часа |
| Фаза 3: Mastery System | 2-3 часа |
| Фаза 4: Polish | 1-2 часа |
| **Итого** | **6-10 часов** |
