# Multiplayer System

#system #multiplayer

P2P мультиплеер на PeerJS (v0.15.0).

## Архитектура
- PeerJS (WebRTC P2P)
- Host authoritative
- 2-4 игрока

## Компоненты
| Модуль | Функция |
|--------|---------|
| `src/network.js` | PeerJS wrapper |
| `src/multiplayer.js` | Логика комнат |
| [[07-scenes/LobbyScene\|LobbyScene]] | UI лобби |

## Синхронизация
| Данные | Направление | Частота |
|--------|-------------|---------|
| Позиция игрока | Guest → Host | 20/с |
| Атака/спелл | Guest → Host | По событию |
| Позиции игроков | Host → Guest | 20/с |
| HP/позиция мобов | Host → Guest | 10/с |
| Лут | Host → Guest | По событию |

## Статус
- Базовая реализация: ✅
- Тестирование полного цикла: ❌
- Известные баги:
  - Баг ника (race condition onAuthStateChanged)
  - HTML инпуты нестабильны при resize

---

> См. также: [[07-scenes/LobbyScene|LobbyScene]], [[01-tech/TECH_STACK|Tech Stack]]
