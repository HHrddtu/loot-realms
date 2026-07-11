export function drawPlayerTextures(mk) {
    mk('player', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f39c12';
        c.fillRect(8, 0, 16, 4);
        c.fillStyle = '#f5cba7';
        c.fillRect(12, 4, 8, 8);
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 6, 2, 2);
        c.fillRect(17, 6, 2, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(6, 12, 20, 16);
        c.fillStyle = '#7d3c98';
        c.fillRect(8, 14, 16, 12);
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 14, 4, 12);
        c.fillRect(26, 14, 4, 12);
        c.fillStyle = '#7d3c98';
        c.fillRect(26, 14, 4, 3);
        c.fillStyle = '#c0392b';
        c.fillRect(10, 28, 5, 12);
        c.fillRect(17, 28, 5, 12);
        c.fillStyle = '#5d4e37';
        c.fillRect(9, 40, 6, 6);
        c.fillRect(17, 40, 6, 6);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 18, 12, 2);
        c.fillRect(10, 22, 12, 2);
    });

    mk('player_sage', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Шляпа (детализированная)
        c.fillStyle = '#2d1b4e';
        c.fillRect(10, 0, 12, 4);
        c.fillRect(8, 4, 16, 4);
        c.fillRect(6, 8, 20, 4);
        // Узоры на шляпе
        c.fillStyle = '#3d2b5e';
        c.fillRect(4, 12, 24, 2);
        c.fillRect(12, 2, 8, 2);
        c.fillRect(10, 6, 12, 2);
        // Звезда на шляпе
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 1, 4, 2);
        c.fillRect(12, 2, 2, 2);
        c.fillRect(18, 2, 2, 2);
        // Лицо (старое, бледное)
        c.fillStyle = '#d5c4a1';
        c.fillRect(10, 14, 12, 8);
        c.fillRect(8, 16, 16, 6);
        // Морщины
        c.fillStyle = '#c4b494';
        c.fillRect(11, 17, 2, 1);
        c.fillRect(17, 17, 2, 1);
        c.fillRect(12, 20, 8, 1);
        // Глаза (мудрые, светящиеся)
        c.fillStyle = '#7b68ee';
        c.fillRect(12, 16, 2, 2);
        c.fillRect(18, 16, 2, 2);
        c.fillStyle = '#9b8bff';
        c.fillRect(12, 16, 1, 1);
        c.fillRect(18, 16, 1, 1);
        // Борода (длинная, серая, с прядями)
        c.fillStyle = '#9e9e9e';
        c.fillRect(12, 20, 8, 4);
        c.fillRect(10, 22, 12, 4);
        c.fillRect(12, 26, 8, 2);
        // Пряди бороды
        c.fillStyle = '#bdbdbd';
        c.fillRect(10, 23, 2, 3);
        c.fillRect(20, 23, 2, 3);
        c.fillRect(12, 27, 2, 2);
        c.fillRect(18, 27, 2, 2);
        // Роба (тёмно-фиолетовая с узорами)
        c.fillStyle = '#2d1b4e';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#3d2b5e';
        c.fillRect(8, 16, 16, 12);
        // Узоры на робе
        c.fillStyle = '#4a3a6a';
        c.fillRect(10, 18, 12, 2);
        c.fillRect(14, 16, 4, 6);
        // Кайма
        c.fillStyle = '#6a3d9a';
        c.fillRect(6, 28, 20, 2);
        // Руки
        c.fillStyle = '#2d1b4e';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        // Перчатки
        c.fillStyle = '#d5c4a1';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        // Книга (детализированная)
        c.fillStyle = '#5a3d1a';
        c.fillRect(0, 26, 6, 8);
        c.fillStyle = '#f5f5dc';
        c.fillRect(1, 27, 4, 6);
        c.fillStyle = '#2d1b4e';
        c.fillRect(1, 27, 4, 1);
        c.fillRect(1, 31, 4, 1);
        // Посох с кристаллом
        c.fillStyle = '#8b6914';
        c.fillRect(28, 10, 2, 28);
        c.fillStyle = '#6a3d9a';
        c.fillRect(27, 8, 4, 4);
        c.fillStyle = '#9b59b6';
        c.fillRect(28, 9, 2, 2);
        // Сияние кристалла
        c.fillStyle = 'rgba(155,89,182,0.2)';
        c.fillRect(26, 6, 6, 6);
        // Ноги/ботинки
        c.fillStyle = '#1a0e2e';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        c.fillStyle = '#3d2b1f';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
    });

    mk('player_alchemist', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Шляпа (детализированная)
        c.fillStyle = '#5a3d1a';
        c.fillRect(8, 0, 16, 4);
        c.fillRect(6, 4, 20, 4);
        c.fillRect(4, 8, 24, 4);
        // Узоры на шляпе
        c.fillStyle = '#6b4423';
        c.fillRect(10, 1, 12, 2);
        c.fillRect(8, 5, 16, 2);
        // Кайма
        c.fillStyle = '#8b6914';
        c.fillRect(2, 12, 28, 2);
        // Очки (детализированные)
        c.fillStyle = '#f39c12';
        c.fillRect(10, 14, 5, 4);
        c.fillRect(17, 14, 5, 4);
        c.fillStyle = '#2c3e50';
        c.fillRect(11, 15, 3, 2);
        c.fillRect(18, 15, 3, 2);
        // Стекло
        c.fillStyle = '#5dade2';
        c.fillRect(11, 15, 1, 1);
        c.fillRect(18, 15, 1, 1);
        // Мостик очков
        c.fillStyle = '#f39c12';
        c.fillRect(15, 15, 2, 2);
        // Лицо (обветренное)
        c.fillStyle = '#c4956a';
        c.fillRect(10, 14, 12, 8);
        c.fillStyle = '#b4855a';
        c.fillRect(11, 15, 10, 6);
        // Морщины
        c.fillStyle = '#a4754a';
        c.fillRect(11, 17, 2, 1);
        c.fillRect(17, 17, 2, 1);
        // Борода (кустистая, коричневая)
        c.fillStyle = '#6b4423';
        c.fillRect(10, 20, 12, 4);
        c.fillRect(8, 22, 16, 4);
        c.fillRect(10, 26, 12, 2);
        // Пряди бороды
        c.fillStyle = '#7a5a33';
        c.fillRect(8, 23, 2, 3);
        c.fillRect(22, 23, 2, 3);
        c.fillRect(10, 27, 2, 2);
        c.fillRect(20, 27, 2, 2);
        // Плащ (кожаный)
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#6b4423';
        c.fillRect(8, 16, 16, 12);
        // Кайма
        c.fillStyle = '#8b6914';
        c.fillRect(6, 28, 20, 2);
        // Пояс с пряжкой
        c.fillStyle = '#3d2b1f';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 25, 4, 4);
        // Руки
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        // Перчатки
        c.fillStyle = '#c4956a';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        // Флакон (зелёная жидкость)
        c.fillStyle = '#27ae60';
        c.fillRect(0, 24, 6, 8);
        c.fillStyle = '#2ecc71';
        c.fillRect(1, 25, 4, 5);
        c.fillStyle = '#5a3d1a';
        c.fillRect(1, 23, 4, 2);
        // Сияние жидкости
        c.fillStyle = 'rgba(39,174,96,0.2)';
        c.fillRect(0, 22, 6, 8);
        // Ноги/ботинки
        c.fillStyle = '#3d2b1f';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        c.fillStyle = '#2c1e14';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
        // Флаконы на поясе
        c.fillStyle = '#e74c3c';
        c.fillRect(26, 22, 3, 5);
        c.fillStyle = '#3498db';
        c.fillRect(27, 20, 3, 5);
        // Сияние фляжек
        c.fillStyle = 'rgba(231,76,60,0.2)';
        c.fillRect(26, 21, 3, 6);
    });

    mk('player_angel', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Волосы (золотые, длинные)
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 0, 12, 4);
        c.fillRect(8, 2, 16, 6);
        c.fillRect(6, 6, 20, 4);
        // Пряди волос
        c.fillStyle = '#d4ac0d';
        c.fillRect(8, 4, 2, 6);
        c.fillRect(22, 4, 2, 6);
        // Лицо (нежное, божественное)
        c.fillStyle = '#fdebd0';
        c.fillRect(10, 8, 12, 8);
        c.fillStyle = '#f5cba7';
        c.fillRect(11, 9, 10, 6);
        // Глаза (голубые, божественные)
        c.fillStyle = '#5dade2';
        c.fillRect(12, 10, 2, 2);
        c.fillRect(18, 10, 2, 2);
        c.fillStyle = '#85c1e9';
        c.fillRect(12, 10, 1, 1);
        c.fillRect(18, 10, 1, 1);
        // Ресницы
        c.fillStyle = '#34495e';
        c.fillRect(12, 9, 2, 1);
        c.fillRect(18, 9, 2, 1);
        // Рот
        c.fillStyle = '#e8a0a0';
        c.fillRect(14, 14, 4, 1);
        // Нимб
        c.fillStyle = 'rgba(241,196,15,0.3)';
        c.fillRect(10, 0, 12, 2);
        c.fillRect(8, 1, 16, 1);
        // Крылья (детализированные)
        c.fillStyle = '#ecf0f1';
        c.fillRect(0, 10, 6, 8);
        c.fillRect(26, 10, 6, 8);
        c.fillStyle = '#ffffff';
        c.fillRect(1, 11, 4, 6);
        c.fillRect(27, 11, 4, 6);
        // Слои перьев
        c.fillStyle = '#d5dbdb';
        c.fillRect(0, 12, 2, 4);
        c.fillRect(30, 12, 2, 4);
        c.fillRect(1, 14, 1, 3);
        c.fillRect(30, 14, 1, 3);
        // Сияние крыльев
        c.fillStyle = 'rgba(241,196,15,0.1)';
        c.fillRect(0, 8, 6, 10);
        c.fillRect(26, 8, 6, 10);
        // Белая роба
        c.fillStyle = '#ecf0f1';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#ffffff';
        c.fillRect(8, 16, 16, 12);
        // Золотая кайма
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 28, 20, 2);
        // Святой символ (крест)
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 18, 4, 6);
        c.fillRect(12, 20, 8, 2);
        // Руки
        c.fillStyle = '#ecf0f1';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        // Руки (нежные)
        c.fillStyle = '#fdebd0';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        // Скрипка
        c.fillStyle = '#8b4513';
        c.fillRect(27, 18, 2, 14);
        c.fillStyle = '#a0522d';
        c.fillRect(25, 20, 6, 8);
        c.fillStyle = '#f5f5dc';
        c.fillRect(26, 21, 4, 6);
        c.fillStyle = '#8b4513';
        c.fillRect(28, 16, 2, 4);
        // Ноги/ботинки (белые)
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        // Ботинки (золотые)
        c.fillStyle = '#f1c40f';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
    });

    mk('icon_sage', 32, 32, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a1a2e';
        c.fillRect(0, 0, 32, 32);
        c.fillStyle = '#7d3c98';
        c.fillRect(8, 4, 16, 4);
        c.fillRect(6, 8, 20, 18);
        c.fillStyle = '#f5f5dc';
        c.fillRect(10, 12, 12, 10);
        c.fillStyle = '#5b2c6f';
        c.fillRect(12, 14, 8, 2);
        c.fillRect(12, 18, 8, 2);
        c.fillStyle = '#9b59b6';
        c.fillRect(14, 26, 4, 4);
    });

    mk('icon_alchemist', 32, 32, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a1a2e';
        c.fillRect(0, 0, 32, 32);
        c.fillStyle = '#922b21';
        c.fillRect(10, 6, 12, 20);
        c.fillRect(8, 10, 16, 12);
        c.fillStyle = '#cb4335';
        c.fillRect(12, 8, 8, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(13, 14, 6, 6);
        c.fillStyle = '#e74c3c';
        c.fillRect(14, 16, 4, 2);
        c.fillStyle = '#784212';
        c.fillRect(11, 26, 4, 4);
        c.fillRect(17, 26, 4, 4);
    });

    mk('icon_angel', 32, 32, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a1a2e';
        c.fillRect(0, 0, 32, 32);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 2, 8, 4);
        c.fillRect(10, 6, 12, 18);
        c.fillStyle = '#f5f5dc';
        c.fillRect(14, 8, 4, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(12, 14, 8, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 16, 4, 4);
        c.fillRect(4, 10, 6, 3);
        c.fillRect(22, 10, 6, 3);
        c.fillRect(6, 14, 4, 2);
        c.fillRect(22, 14, 4, 2);
    });
}
