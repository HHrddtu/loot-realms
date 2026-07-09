# TECHNICAL DESIGN

#design #tech

> [!INFO] TECHNICAL_DESIGN — исторический документ.
> **Актуальная архитектура разнесена по специализированным заметкам.**
> Используй [[index|MOC]] для навигации.

## Ссылки

| Раздел | Где находится |
|--------|--------------|
| **Архитектура** (обзор) | [[01-tech/ARCHITECTURE\|Architecture]] |
| **Структура файлов** | [[01-tech/FILE_TREE\|File Tree]] |
| **Технологии** | [[01-tech/TECH_STACK\|Tech Stack]] |
| **Формат сохранений** | [[01-tech/SAVE_FORMAT\|Save Format]] |
| **Зоны** | [[02-zones/_zones_index\|Все зоны]] |
| **Системы** | [[04-systems/_systems_index\|Все системы]] |
| **Сцены** | [[07-scenes/_scenes_index\|Все сцены]] |
| **GameScene** (ключевая сцена) | [[07-scenes/GameScene\|GameScene]] |

---

## Событийная система

```javascript
const EVENTS = {
  ENEMY_KILLED: 'enemy_killed',
  BOSS_KILLED: 'boss_killed',
  LEVEL_UP: 'level_up',
  ITEM_PICKUP: 'item_pickup',
  ITEM_EQUIP: 'item_equip',
  BIOME_COMPLETE: 'biome_complete',
  PLAYER_DEATH: 'player_death',
  SAVE_GAME: 'save_game',
  LOAD_GAME: 'load_game'
};
```

## Оптимизации
1. Object pooling для снарядов и врагов
2. Spatial hashing для коллизий
3. Texture atlas для спрайтов
4. Max 100 врагов, 50 снарядов на экране

## Тестирование
- Unit-тесты: combat calculations (планируется Vitest)
- Integration-тесты: взаимодействие систем
- Manual-тесты: геймплей

## Безопасность
1. Валидация данных из JSON
2. Защита от читерства — нет серверной проверки (клиентская)
3. XSS — нет пользовательского ввода

---

> 🔗 **Актуальная архитектура:** [[01-tech/ARCHITECTURE|Architecture]]
