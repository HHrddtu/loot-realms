# Multiplayer — Мультиплеер

#mechanics #multiplayer

## Статус: базовая реализация (v0.15.0)

### PeerJS P2P
- 2-4 игрока
- Host authoritative
- WebRTC

### Sync
| Данные | Частота |
|--------|---------|
| Позиция игрока | 20/с |
| Атака/спелл | По событию |
| HP мобов | 10/с |
| Лут | По событию |

### UI
- [[07-scenes/LobbyScene|LobbyScene]] — Create/Join комната
- Кнопка Multiplayer в [[07-scenes/MenuScene|MenuScene]]

### Известные баги
- Баг ника (race condition)
- HTML инпуты нестабильны
- Нет offline fallback

---

> См. также: [[04-systems/MultiplayerSystem|MultiplayerSystem]], [[07-scenes/LobbyScene|LobbyScene]]
