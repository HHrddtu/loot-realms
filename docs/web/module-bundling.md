# Module Bundling — Loot Realms

#docs #tech

> [!INFO] Связанные заметки
> - [[TECH_STACK]] — технологический стек
> - [[TECHNICAL_DESIGN]] — архитектура
> - [[BENCHMARKS]] — метрики производительности
> - [[README]] — карта содержимого

## Сборка

Проект использует **Vite** для сборки:

```bash
npm run build    # production-сборка в dist/
npm run dev      # dev-сервер с HMR
```

## Конфигурация

`vite.config.js`:
- `base: './'` — для GitHub Pages деплоя
- `outDir: 'dist'` — выходная директория

## Размер бандла

Текущий размер: **2.3 MB** (Phaser + весь код).
Цель: < 1.5 MB через code splitting.

## Структура импортов

```
main.js
  ├── config/      (данные)
  ├── textures/    (процедурные текстуры)
  ├── scenes/      (Phaser сцены)
  ├── systems/     (игровые системы)
  └── zones/       (зоны)
```
