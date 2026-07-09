# TECH STACK — Технологический стек

#tech #stack

| Компонент | Технология | Причина |
|-----------|-----------|---------|
| **Engine** | Phaser 3.80 | 2D game framework, physics, particles |
| **Build** | Vite 8.x | Быстрая сборка, HMR |
| **Auth** | Firebase 12.x | Email/password, облачные сохранения |
| **Multiplayer** | PeerJS 1.5.x | P2P WebRTC, без сервера |
| **Audio** | Web Audio API | Осцилляторы, без файлов |
| **Save** | localStorage + Firebase | Локально + облачно |
| **Language** | JavaScript ES6 | Нативно в браузере |
| **i18n** | Самописный | EN/RU/DE (700+ ключей) |
| **Rendering** | Canvas 2D / WebGL | Phaser выбирает автоматически |

## Ключевые конфиги
- `package.json` — зависимости
- `vite.config.js` — base: './', outDir: 'dist'
- `.github/workflows/deploy.yml` — GitHub Pages

## Скрипты
```bash
npm run dev    # Dev server
npm run build  # Production build → dist/
npm test       # Vitest (planned)
```

---

> См. также: [[01-tech/ARCHITECTURE|Architecture]], [[01-tech/FILE_TREE|File Tree]]
