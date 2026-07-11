export function drawNpcTextures(mk) {
    // Village Elder — детализированный старейшина
    mk('npc_elder', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Голова
        c.fillStyle = '#f5cba7';
        c.fillRect(10, 2, 12, 10);
        c.fillRect(8, 4, 16, 8);
        // Морщины
        c.fillStyle = '#d4b896';
        c.fillRect(11, 5, 2, 1);
        c.fillRect(17, 5, 2, 1);
        c.fillRect(12, 10, 8, 1);
        // Глаза
        c.fillStyle = '#2c3e50';
        c.fillRect(12, 6, 2, 2);
        c.fillRect(18, 6, 2, 2);
        c.fillStyle = '#34495e';
        c.fillRect(12, 6, 1, 1);
        c.fillRect(18, 6, 1, 1);
        // Брови (седые)
        c.fillStyle = '#9e9e9e';
        c.fillRect(12, 5, 2, 1);
        c.fillRect(18, 5, 2, 1);
        // Борода (с прядями)
        c.fillStyle = '#ecf0f1';
        c.fillRect(12, 10, 8, 3);
        c.fillRect(11, 12, 10, 2);
        c.fillRect(10, 14, 12, 2);
        c.fillRect(11, 16, 10, 2);
        c.fillRect(12, 18, 8, 1);
        // Пряди бороды
        c.fillStyle = '#d5dbdb';
        c.fillRect(10, 13, 2, 4);
        c.fillRect(20, 13, 2, 4);
        // Роба (пурпурная с узорами)
        c.fillStyle = '#6c3483';
        c.fillRect(6, 14, 20, 18);
        c.fillRect(4, 20, 24, 10);
        c.fillStyle = '#8e44ad';
        c.fillRect(8, 16, 16, 14);
        // Узор на робе
        c.fillStyle = '#9b59b6';
        c.fillRect(10, 18, 12, 2);
        c.fillRect(10, 22, 12, 1);
        c.fillRect(14, 16, 4, 6);
        // Золотая кайма
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 14, 20, 2);
        c.fillRect(6, 28, 20, 1);
        // Руки
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 16, 4, 8);
        c.fillRect(26, 16, 4, 8);
        // Посох с орнаментом
        c.fillStyle = '#8b4513';
        c.fillRect(0, 8, 2, 34);
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 8, 1, 30);
        c.fillStyle = '#f1c40f';
        c.fillRect(0, 6, 2, 3);
        c.fillRect(0, 4, 1, 3);
        // Наконечник
        c.fillStyle = '#d4ac0d';
        c.fillRect(0, 2, 2, 3);
        // Ноги
        c.fillStyle = '#4a2d10';
        c.fillRect(10, 32, 5, 12);
        c.fillRect(17, 32, 5, 12);
        // Сапоги с застёжками
        c.fillStyle = '#3e2723';
        c.fillRect(9, 42, 6, 4);
        c.fillRect(17, 42, 6, 4);
        c.fillStyle = '#5a3d1a';
        c.fillRect(9, 43, 6, 1);
        c.fillRect(17, 43, 6, 1);
    });

    // Merchant — торговец с товарами
    mk('npc_merchant', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Голова
        c.fillStyle = '#f5cba7';
        c.fillRect(10, 2, 12, 10);
        c.fillRect(8, 4, 16, 8);
        // Шляпа торговца
        c.fillStyle = '#d4ac0d';
        c.fillRect(8, 0, 16, 4);
        c.fillRect(6, 2, 20, 3);
        c.fillStyle = '#b7950b';
        c.fillRect(10, 1, 12, 2);
        // Глаза (хитрые)
        c.fillStyle = '#2c3e50';
        c.fillRect(12, 6, 2, 2);
        c.fillRect(18, 6, 2, 2);
        c.fillStyle = '#34495e';
        c.fillRect(12, 6, 1, 1);
        c.fillRect(18, 6, 1, 1);
        // Улыбка
        c.fillStyle = '#c0392b';
        c.fillRect(13, 10, 6, 1);
        // Усы
        c.fillStyle = '#5d4037';
        c.fillRect(12, 9, 2, 1);
        c.fillRect(18, 9, 2, 1);
        // Роба торговца
        c.fillStyle = '#b7950b';
        c.fillRect(6, 14, 20, 18);
        c.fillRect(4, 20, 24, 10);
        c.fillStyle = '#d4ac0d';
        c.fillRect(8, 16, 16, 14);
        // Карманы с товарами
        c.fillStyle = '#8b4513';
        c.fillRect(6, 18, 4, 4);
        c.fillRect(22, 18, 4, 4);
        // Мешочки
        c.fillStyle = '#6d4c2a';
        c.fillRect(7, 19, 2, 3);
        c.fillRect(23, 19, 2, 3);
        // Золотая монета
        c.fillStyle = '#f1c40f';
        c.fillRect(8, 20, 2, 2);
        c.fillRect(22, 20, 2, 2);
        // Пояс
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 24, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 24, 4, 2);
        // Руки
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 16, 4, 8);
        c.fillRect(26, 16, 4, 8);
        // Ноги
        c.fillStyle = '#5d4037';
        c.fillRect(10, 32, 5, 12);
        c.fillRect(17, 32, 5, 12);
        // Сапоги
        c.fillStyle = '#3e2723';
        c.fillRect(9, 42, 6, 4);
        c.fillRect(17, 42, 6, 4);
    });

    // Child NPC — детализированный мальчик
    mk('child_npc_boy', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Голова (больше пропорционально)
        c.fillStyle = '#f5cba7';
        c.fillRect(7, 0, 10, 9);
        c.fillRect(5, 2, 14, 7);
        // Волосы (косматые, коричневые)
        c.fillStyle = '#8b4513';
        c.fillRect(6, 0, 12, 3);
        c.fillRect(6, 1, 2, 4);
        c.fillRect(16, 1, 2, 3);
        c.fillStyle = '#a0522d';
        c.fillRect(7, 1, 10, 2);
        // Глаза (большие, восторженные)
        c.fillStyle = '#2c3e50';
        c.fillRect(9, 4, 2, 3);
        c.fillRect(13, 4, 2, 3);
        c.fillStyle = '#ecf0f1';
        c.fillRect(9, 4, 1, 1);
        c.fillRect(13, 4, 1, 1);
        // Румянец
        c.fillStyle = '#e8a0a0';
        c.fillRect(8, 6, 2, 1);
        c.fillRect(14, 6, 2, 1);
        // Улыбка
        c.fillStyle = '#c0392b';
        c.fillRect(10, 7, 4, 1);
        // Рубашка (зелёная туника)
        c.fillStyle = '#27ae60';
        c.fillRect(6, 9, 12, 9);
        c.fillStyle = '#229954';
        c.fillRect(8, 9, 8, 9);
        // Пояс
        c.fillStyle = '#8b4513';
        c.fillRect(6, 13, 12, 1);
        // Руки
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 10, 4, 6);
        c.fillRect(18, 10, 4, 6);
        // Ноги
        c.fillStyle = '#5d4037';
        c.fillRect(7, 18, 3, 5);
        c.fillRect(14, 18, 3, 5);
        // Сапоги
        c.fillStyle = '#3e2723';
        c.fillRect(6, 22, 5, 3);
        c.fillRect(13, 22, 5, 3);
    });

    // Forest Guard — страж с копьём
    mk('forest_guard', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Шлем
        c.fillStyle = '#5a6a7a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 4);
        c.fillStyle = '#6a7a8a';
        c.fillRect(11, 1, 10, 4);
        // Гребень
        c.fillStyle = '#27ae60';
        c.fillRect(14, 0, 4, 2);
        c.fillRect(12, 0, 2, 3);
        c.fillRect(18, 0, 2, 3);
        // Забрало
        c.fillStyle = '#3a4a5a';
        c.fillRect(10, 4, 12, 4);
        c.fillStyle = '#4a5a6a';
        c.fillRect(11, 5, 10, 2);
        // Глаза
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 6, 2, 2);
        c.fillRect(17, 6, 2, 2);
        // Доспех
        c.fillStyle = '#5a6a7a';
        c.fillRect(6, 12, 20, 14);
        c.fillStyle = '#6a7a8a';
        c.fillRect(8, 14, 16, 10);
        // Плетёная кольчуга
        c.fillStyle = '#7a8a9a';
        c.fillRect(10, 14, 12, 2);
        c.fillRect(10, 18, 12, 2);
        c.fillRect(10, 22, 12, 2);
        // Наплечники
        c.fillStyle = '#4a5a6a';
        c.fillRect(2, 12, 4, 6);
        c.fillRect(26, 12, 4, 6);
        c.fillStyle = '#5a6a7a';
        c.fillRect(3, 13, 2, 4);
        c.fillRect(27, 13, 2, 4);
        // Руки
        c.fillStyle = '#5a6a7a';
        c.fillRect(2, 18, 4, 8);
        c.fillRect(26, 18, 4, 8);
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 26, 4, 4);
        c.fillRect(26, 26, 4, 4);
        // Копьё
        c.fillStyle = '#8b4513';
        c.fillRect(0, 8, 2, 32);
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 8, 1, 28);
        c.fillStyle = '#95a5a6';
        c.fillRect(0, 4, 2, 6);
        c.fillStyle = '#bdc3c7';
        c.fillRect(0, 4, 1, 4);
        // Пояс
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 26, 4, 2);
        // Ноги
        c.fillStyle = '#4a5a6a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        // Сапоги
        c.fillStyle = '#3a2a1a';
        c.fillRect(7, 40, 7, 6);
        c.fillRect(18, 40, 7, 6);
        c.fillStyle = '#4a3a2a';
        c.fillRect(7, 42, 7, 4);
        c.fillRect(18, 42, 7, 4);
    });

    // Old Hunter — старый охотник
    mk('old_hunter', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Капюшон
        c.fillStyle = '#5a4a3a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 6);
        c.fillStyle = '#6a5a4a';
        c.fillRect(11, 1, 10, 4);
        // Лицо (обветренное)
        c.fillStyle = '#c49a6a';
        c.fillRect(11, 6, 10, 6);
        c.fillStyle = '#b88a5a';
        c.fillRect(12, 7, 8, 4);
        // Глаза
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        c.fillStyle = '#34495e';
        c.fillRect(13, 8, 1, 1);
        c.fillRect(17, 8, 1, 1);
        // Шрам на глазу
        c.fillStyle = '#a0522d';
        c.fillRect(12, 7, 3, 1);
        // Седая борода
        c.fillStyle = '#9e9e9e';
        c.fillRect(12, 10, 8, 2);
        c.fillRect(13, 12, 6, 2);
        c.fillRect(14, 14, 4, 1);
        // Кожаный доспех
        c.fillStyle = '#8b4513';
        c.fillRect(6, 14, 20, 12);
        c.fillStyle = '#a0522d';
        c.fillRect(8, 16, 16, 8);
        // Строчка
        c.fillStyle = '#6d4c2a';
        c.fillRect(8, 18, 16, 1);
        c.fillRect(8, 22, 16, 1);
        c.fillRect(14, 14, 2, 12);
        // Руки
        c.fillStyle = '#8b4513';
        c.fillRect(2, 16, 4, 8);
        c.fillRect(26, 16, 4, 8);
        c.fillStyle = '#c49a6a';
        c.fillRect(2, 24, 4, 4);
        c.fillRect(26, 24, 4, 4);
        // Лук
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 10, 2, 24);
        c.fillStyle = '#8b4513';
        c.fillRect(0, 10, 1, 24);
        // Тетива
        c.fillStyle = '#d5c4a1';
        c.fillRect(0, 12, 2, 1);
        c.fillRect(0, 20, 2, 1);
        c.fillRect(0, 28, 2, 1);
        // Колчан
        c.fillStyle = '#6d4c2a';
        c.fillRect(24, 12, 4, 12);
        c.fillStyle = '#95a5a6';
        c.fillRect(25, 10, 2, 4);
        c.fillRect(27, 10, 2, 4);
        // Ноги
        c.fillStyle = '#5a4a3a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        // Сапоги
        c.fillStyle = '#3e2723';
        c.fillRect(7, 40, 7, 6);
        c.fillRect(18, 40, 7, 6);
        c.fillStyle = '#4e342e';
        c.fillRect(7, 42, 7, 4);
        c.fillRect(18, 42, 7, 4);
    });

    // Priestess — жрица со свечением
    mk('priestess', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Волосы (золотые)
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(11, 1, 10, 4);
        c.fillRect(8, 4, 2, 8);
        c.fillRect(22, 4, 2, 8);
        // Лицо
        c.fillStyle = '#f5cba7';
        c.fillRect(11, 4, 10, 8);
        c.fillStyle = '#edbb99';
        c.fillRect(12, 5, 8, 6);
        // Глаза (голубые)
        c.fillStyle = '#5dade2';
        c.fillRect(13, 6, 2, 2);
        c.fillRect(17, 6, 2, 2);
        c.fillStyle = '#85c1e9';
        c.fillRect(13, 6, 1, 1);
        c.fillRect(17, 6, 1, 1);
        // Святой символ
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 12, 4, 2);
        c.fillRect(15, 11, 2, 4);
        // Белая роба
        c.fillStyle = '#ecf0f1';
        c.fillRect(6, 14, 20, 14);
        c.fillRect(4, 20, 24, 10);
        c.fillStyle = '#fff';
        c.fillRect(8, 16, 16, 10);
        // Золотая кайма
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 14, 20, 2);
        c.fillRect(6, 26, 20, 2);
        c.fillRect(6, 14, 2, 14);
        c.fillRect(24, 14, 2, 14);
        // Узоры
        c.fillStyle = '#d4ac0d';
        c.fillRect(10, 18, 12, 1);
        c.fillRect(14, 16, 4, 4);
        // Руки
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 16, 4, 8);
        c.fillRect(26, 16, 4, 8);
        // Посох со светящимся шаром
        c.fillStyle = '#8b4513';
        c.fillRect(0, 8, 2, 34);
        c.fillStyle = '#3498db';
        c.fillRect(0, 4, 2, 4);
        c.fillStyle = '#5dade2';
        c.fillRect(0, 4, 1, 4);
        // Свечение
        c.fillStyle = 'rgba(52,152,219,0.2)';
        c.fillRect(0, 2, 2, 6);
        // Ноги
        c.fillStyle = '#d5dbdb';
        c.fillRect(10, 32, 5, 12);
        c.fillRect(17, 32, 5, 12);
        // Сапоги
        c.fillStyle = '#f5cba7';
        c.fillRect(9, 42, 6, 4);
        c.fillRect(17, 42, 6, 4);
    });

    // Quest icon
    mk('quest_icon', 12, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f1c40f';
        c.fillRect(3, 0, 6, 10);
        c.fillRect(1, 2, 10, 6);
        c.fillStyle = '#0a0a1a';
        c.fillRect(5, 2, 2, 5);
        c.fillRect(4, 7, 4, 2);
        c.fillRect(4, 9, 2, 1);
    });

    // Rescued villager variations (for castle attic)
    const villagerColors = [
        { shirt: '#3498db', shirtDark: '#2980b9', hair: '#8b6914', skin: '#f5cba7', pants: '#6d4c2a', shoe: '#4a2d10' },
        { shirt: '#e74c3c', shirtDark: '#c0392b', hair: '#2c3e50', skin: '#f0c89a', pants: '#5d4037', shoe: '#3e2723' },
        { shirt: '#27ae60', shirtDark: '#229954', hair: '#a0522d', skin: '#f5cba7', pants: '#4e342e', shoe: '#3e2723' },
        { shirt: '#8e44ad', shirtDark: '#7d3c98', hair: '#1a1a2e', skin: '#edbb99', pants: '#566573', shoe: '#2c3e50' },
        { shirt: '#f39c12', shirtDark: '#d68910', hair: '#935116', skin: '#f5cba7', pants: '#6d4c2a', shoe: '#4a2d10' }
    ];

    villagerColors.forEach((vc, i) => {
        mk('villager_rescued_' + i, 28, 32, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = vc.skin;
            c.fillRect(9, 0, 10, 8);
            c.fillStyle = vc.hair;
            c.fillRect(8, 0, 12, 3);
            c.fillStyle = '#2c3e50';
            c.fillRect(11, 4, 2, 2);
            c.fillRect(15, 4, 2, 2);
            c.fillStyle = '#ecf0f1';
            c.fillRect(11, 4, 1, 1);
            c.fillRect(15, 4, 1, 1);
            c.fillStyle = '#c0392b';
            c.fillRect(12, 7, 4, 1);
            c.fillStyle = vc.shirt;
            c.fillRect(7, 8, 14, 12);
            c.fillStyle = vc.shirtDark;
            c.fillRect(9, 8, 10, 12);
            c.fillStyle = '#8b4513';
            c.fillRect(7, 14, 14, 2);
            c.fillStyle = vc.skin;
            c.fillRect(3, 10, 4, 8);
            c.fillRect(21, 10, 4, 8);
            c.fillStyle = vc.pants;
            c.fillRect(8, 20, 4, 6);
            c.fillRect(16, 20, 4, 6);
            c.fillStyle = vc.shoe;
            c.fillRect(7, 24, 6, 4);
            c.fillRect(15, 24, 6, 4);
        });
    });

    // Elder villager (old man with beard and staff)
    mk('villager_elder', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Head
        c.fillStyle = '#f5cba7';
        c.fillRect(10, 0, 12, 10);
        // White hair
        c.fillStyle = '#ecf0f1';
        c.fillRect(9, 0, 14, 3);
        c.fillRect(8, 2, 2, 6);
        c.fillRect(22, 2, 2, 6);
        // Beard
        c.fillStyle = '#ecf0f1';
        c.fillRect(11, 8, 10, 6);
        c.fillRect(12, 12, 8, 4);
        // Eyes
        c.fillStyle = '#2c3e50';
        c.fillRect(12, 4, 2, 2);
        c.fillRect(18, 4, 2, 2);
        // Robe (purple/gold elder)
        c.fillStyle = '#6c3483';
        c.fillRect(7, 14, 18, 16);
        c.fillStyle = '#8e44ad';
        c.fillRect(9, 14, 14, 14);
        // Gold trim
        c.fillStyle = '#f1c40f';
        c.fillRect(7, 14, 18, 2);
        c.fillRect(7, 28, 18, 2);
        // Staff
        c.fillStyle = '#8b4513';
        c.fillRect(2, 8, 3, 30);
        c.fillStyle = '#f1c40f';
        c.fillRect(1, 6, 5, 4);
        c.fillRect(2, 4, 3, 3);
        // Arms
        c.fillStyle = '#f5cba7';
        c.fillRect(3, 16, 4, 8);
        c.fillRect(25, 16, 4, 8);
        // Legs
        c.fillStyle = '#4a2d10';
        c.fillRect(9, 30, 5, 12);
        c.fillRect(18, 30, 5, 12);
        // Shoes
        c.fillStyle = '#2c1810';
        c.fillRect(8, 40, 7, 4);
        c.fillRect(17, 40, 7, 4);
    });

    // Young boy NPC (for village thanks scene)
    mk('child_npc_boy', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Head (bigger proportionally)
        c.fillStyle = '#f5cba7';
        c.fillRect(7, 0, 10, 9);
        // Hair (messy brown)
        c.fillStyle = '#8b4513';
        c.fillRect(6, 0, 12, 3);
        c.fillRect(6, 1, 2, 4);
        c.fillRect(16, 1, 2, 3);
        // Eyes (big, excited)
        c.fillStyle = '#2c3e50';
        c.fillRect(9, 4, 2, 3);
        c.fillRect(13, 4, 2, 3);
        c.fillStyle = '#ecf0f1';
        c.fillRect(9, 4, 1, 1);
        c.fillRect(13, 4, 1, 1);
        // Smile
        c.fillStyle = '#c0392b';
        c.fillRect(10, 7, 4, 1);
        // Shirt (green tunic)
        c.fillStyle = '#27ae60';
        c.fillRect(6, 9, 12, 9);
        c.fillStyle = '#229954';
        c.fillRect(8, 9, 8, 9);
        // Belt
        c.fillStyle = '#8b4513';
        c.fillRect(6, 13, 12, 1);
        // Arms
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 10, 4, 6);
        c.fillRect(18, 10, 4, 6);
        // Legs
        c.fillStyle = '#5d4037';
        c.fillRect(7, 18, 3, 5);
        c.fillRect(14, 18, 3, 5);
        // Shoes
        c.fillStyle = '#3e2723';
        c.fillRect(6, 22, 5, 3);
        c.fillRect(13, 22, 5, 3);
    });

    // Thriving village building (blacksmith/shop)
    mk('village_shop', 60, 50, (c) => {
        c.imageSmoothingEnabled = false;
        // Roof
        c.fillStyle = '#c0392b';
        c.fillRect(4, 0, 52, 12);
        c.fillStyle = '#e74c3c';
        c.fillRect(6, 2, 48, 8);
        c.fillStyle = '#922b21';
        c.fillRect(2, 8, 56, 4);
        // Walls
        c.fillStyle = '#d5a6e6';
        c.fillRect(6, 12, 48, 30);
        c.fillStyle = '#bb6bd9';
        c.fillRect(8, 14, 44, 26);
        // Door
        c.fillStyle = '#5a3d1a';
        c.fillRect(24, 24, 12, 18);
        c.fillStyle = '#4a2d10';
        c.fillRect(26, 26, 8, 14);
        c.fillStyle = '#f1c40f';
        c.fillRect(32, 34, 2, 2);
        // Window
        c.fillStyle = '#f39c12';
        c.fillRect(12, 20, 8, 8);
        c.fillRect(40, 20, 8, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(13, 21, 3, 3);
        c.fillRect(17, 21, 3, 3);
        c.fillRect(41, 21, 3, 3);
        c.fillRect(45, 21, 3, 3);
        c.fillStyle = '#2c3e50';
        c.fillRect(15, 20, 2, 8);
        c.fillRect(12, 23, 8, 2);
        c.fillRect(43, 20, 2, 8);
        c.fillRect(40, 23, 8, 2);
        // Sign
        c.fillStyle = '#8b4513';
        c.fillRect(22, 8, 16, 6);
        c.fillStyle = '#f1c40f';
        c.fillRect(24, 9, 12, 4);
        // Chimney
        c.fillStyle = '#7f8c8d';
        c.fillRect(44, -4, 8, 8);
        c.fillStyle = '#95a5a6';
        c.fillRect(45, -2, 6, 4);
    });

    mk('villager_merchant', 28, 36, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f5cba7';
        c.fillRect(9, 0, 10, 8);
        c.fillStyle = '#5d4037';
        c.fillRect(8, 0, 12, 3);
        c.fillRect(8, 1, 2, 4);
        c.fillRect(18, 1, 2, 3);
        c.fillStyle = '#2c3e50';
        c.fillRect(11, 3, 2, 2);
        c.fillRect(15, 3, 2, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(12, 6, 4, 1);
        c.fillStyle = '#d4ac0d';
        c.fillRect(6, 8, 16, 12);
        c.fillStyle = '#b7950b';
        c.fillRect(8, 8, 12, 12);
        c.fillStyle = '#8b4513';
        c.fillRect(6, 14, 16, 2);
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 10, 4, 8);
        c.fillRect(22, 10, 4, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(2, 16, 4, 3);
        c.fillRect(22, 16, 4, 3);
        c.fillStyle = '#5d4037';
        c.fillRect(7, 20, 4, 8);
        c.fillRect(17, 20, 4, 8);
        c.fillStyle = '#3e2723';
        c.fillRect(6, 26, 6, 4);
        c.fillRect(16, 26, 6, 4);
    });

    mk('village_bed', 32, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3d1a';
        c.fillRect(0, 0, 32, 4);
        c.fillRect(0, 16, 32, 4);
        c.fillRect(0, 0, 4, 20);
        c.fillStyle = '#ecf0f1';
        c.fillRect(4, 4, 10, 12);
        c.fillStyle = '#f1c40f';
        c.fillRect(4, 4, 10, 2);
        c.fillStyle = '#2980b9';
        c.fillRect(14, 4, 18, 12);
        c.fillStyle = '#2471a3';
        c.fillRect(16, 6, 14, 8);
    });

    mk('village_anvil', 24, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#7f8c8d';
        c.fillRect(4, 14, 16, 6);
        c.fillStyle = '#566573';
        c.fillRect(8, 6, 8, 10);
        c.fillStyle = '#95a5a6';
        c.fillRect(6, 4, 12, 4);
        c.fillStyle = '#bdc3c7';
        c.fillRect(7, 5, 4, 2);
    });

    // Elder on deathbed — lying down, pale, weak (32x20)
    mk('npc_elder_dying', 32, 20, (c) => {
        c.imageSmoothingEnabled = false;
        // Bed/pillow
        c.fillStyle = '#5a3d1a';
        c.fillRect(0, 12, 32, 8);
        c.fillStyle = '#ecf0f1';
        c.fillRect(0, 10, 10, 6);
        c.fillStyle = '#d5dbdb';
        c.fillRect(1, 11, 8, 4);
        // Blanket
        c.fillStyle = '#6c3483';
        c.fillRect(8, 10, 24, 8);
        c.fillStyle = '#8e44ad';
        c.fillRect(10, 11, 20, 6);
        // Elder's head (pale, weak)
        c.fillStyle = '#d5c4a1';
        c.fillRect(2, 2, 8, 8);
        c.fillStyle = '#c4b494';
        c.fillRect(3, 3, 6, 6);
        // White hair (thin, wispy)
        c.fillStyle = '#ecf0f1';
        c.fillRect(1, 1, 10, 3);
        c.fillRect(1, 3, 2, 4);
        c.fillRect(9, 3, 2, 4);
        // Closed/sunken eyes
        c.fillStyle = '#2c3e50';
        c.fillRect(3, 5, 2, 1);
        c.fillRect(7, 5, 2, 1);
        // Pale lips
        c.fillStyle = '#bdc3c7';
        c.fillRect(5, 8, 3, 1);
        // Beard (white, thin)
        c.fillStyle = '#ecf0f1';
        c.fillRect(3, 8, 6, 3);
        c.fillRect(4, 10, 4, 2);
        // Staff beside bed
        c.fillStyle = '#8b4513';
        c.fillRect(14, 2, 2, 10);
        c.fillStyle = '#f1c40f';
        c.fillRect(13, 1, 4, 2);
        c.fillRect(14, 0, 2, 2);
    });

    // Grown child — now a leader, taller, confident (28x36)
    mk('npc_child_grown', 28, 36, (c) => {
        c.imageSmoothingEnabled = false;
        // Head
        c.fillStyle = '#f5cba7';
        c.fillRect(8, 0, 12, 10);
        c.fillStyle = '#edbb99';
        c.fillRect(9, 1, 10, 8);
        // Hair (longer, darker brown)
        c.fillStyle = '#5a3d1a';
        c.fillRect(7, 0, 14, 4);
        c.fillRect(7, 1, 3, 6);
        c.fillRect(18, 1, 3, 6);
        c.fillStyle = '#6b4423';
        c.fillRect(8, 1, 12, 2);
        // Eyes (determined)
        c.fillStyle = '#2c3e50';
        c.fillRect(10, 4, 2, 2);
        c.fillRect(16, 4, 2, 2);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 4, 1, 1);
        c.fillRect(16, 4, 1, 1);
        // Confident smile
        c.fillStyle = '#c0392b';
        c.fillRect(12, 7, 4, 1);
        // Leadership tunic (rich green with gold trim)
        c.fillStyle = '#1a7a3a';
        c.fillRect(6, 10, 16, 12);
        c.fillStyle = '#229954';
        c.fillRect(8, 10, 12, 10);
        // Gold trim
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 10, 16, 2);
        c.fillRect(6, 20, 16, 2);
        // Belt with buckle
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 16, 16, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 16, 4, 2);
        // Arms (stronger)
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 12, 4, 8);
        c.fillRect(22, 12, 4, 8);
        // Leadership cape
        c.fillStyle = '#1a5c2a';
        c.fillRect(4, 12, 4, 14);
        c.fillRect(20, 12, 4, 14);
        c.fillStyle = '#155723';
        c.fillRect(5, 14, 2, 10);
        c.fillRect(21, 14, 2, 10);
        // Legs
        c.fillStyle = '#5d4037';
        c.fillRect(8, 22, 4, 8);
        c.fillRect(16, 22, 4, 8);
        c.fillStyle = '#4e342e';
        c.fillRect(8, 22, 2, 8);
        c.fillRect(18, 22, 2, 8);
        // Leadership boots
        c.fillStyle = '#3e2723';
        c.fillRect(7, 28, 6, 4);
        c.fillRect(15, 28, 6, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(7, 28, 6, 1);
        c.fillRect(15, 28, 6, 1);
    });

    // Forest Guard — armored guard with spear (32x48)
    mk('forest_guard', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Helmet
        c.fillStyle = '#5a6a7a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 4);
        c.fillStyle = '#6a7a8a';
        c.fillRect(11, 1, 10, 4);
        // Visor
        c.fillStyle = '#3a4a5a';
        c.fillRect(10, 4, 12, 4);
        c.fillStyle = '#4a5a6a';
        c.fillRect(11, 5, 10, 2);
        // Plume
        c.fillStyle = '#27ae60';
        c.fillRect(14, 0, 4, 2);
        c.fillRect(12, 0, 2, 3);
        c.fillRect(18, 0, 2, 3);
        // Face
        c.fillStyle = '#d5c4a1';
        c.fillRect(11, 6, 10, 6);
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        // Armor
        c.fillStyle = '#5a6a7a';
        c.fillRect(6, 12, 20, 14);
        c.fillStyle = '#6a7a8a';
        c.fillRect(8, 14, 16, 10);
        // Chainmail detail
        c.fillStyle = '#7a8a9a';
        c.fillRect(10, 14, 12, 2);
        c.fillRect(10, 18, 12, 2);
        c.fillRect(10, 22, 12, 2);
        // Shoulder guards
        c.fillStyle = '#4a5a6a';
        c.fillRect(2, 12, 4, 6);
        c.fillRect(26, 12, 4, 6);
        c.fillStyle = '#5a6a7a';
        c.fillRect(3, 13, 2, 4);
        c.fillRect(27, 13, 2, 4);
        // Arms
        c.fillStyle = '#5a6a7a';
        c.fillRect(2, 18, 4, 8);
        c.fillRect(26, 18, 4, 8);
        c.fillStyle = '#d5c4a1';
        c.fillRect(2, 26, 4, 4);
        c.fillRect(26, 26, 4, 4);
        // Spear
        c.fillStyle = '#8b4513';
        c.fillRect(0, 8, 2, 32);
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 8, 1, 28);
        c.fillStyle = '#95a5a6';
        c.fillRect(0, 4, 2, 6);
        c.fillStyle = '#bdc3c7';
        c.fillRect(0, 4, 1, 4);
        // Belt
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 26, 4, 2);
        // Legs
        c.fillStyle = '#4a5a6a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#3a4a5a';
        c.fillRect(8, 28, 2, 14);
        c.fillRect(21, 28, 2, 14);
        // Boots
        c.fillStyle = '#3a2a1a';
        c.fillRect(7, 40, 7, 6);
        c.fillRect(18, 40, 7, 6);
        c.fillStyle = '#4a3a2a';
        c.fillRect(7, 42, 7, 4);
        c.fillRect(18, 42, 7, 4);
    });

    // Old Hunter — weathered hunter with bow (32x48)
    mk('old_hunter', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Hood
        c.fillStyle = '#5a4a3a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 6);
        c.fillStyle = '#6a5a4a';
        c.fillRect(11, 1, 10, 4);
        // Face
        c.fillStyle = '#c49a6a';
        c.fillRect(11, 6, 10, 6);
        c.fillStyle = '#b88a5a';
        c.fillRect(12, 7, 8, 4);
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        // Grey beard
        c.fillStyle = '#9e9e9e';
        c.fillRect(12, 10, 8, 2);
        c.fillRect(13, 12, 6, 2);
        c.fillRect(14, 14, 4, 1);
        // Leather armor
        c.fillStyle = '#8b4513';
        c.fillRect(6, 14, 20, 12);
        c.fillStyle = '#a0522d';
        c.fillRect(8, 16, 16, 8);
        // Stitching
        c.fillStyle = '#6d4c2a';
        c.fillRect(8, 18, 16, 1);
        c.fillRect(8, 22, 16, 1);
        c.fillRect(14, 14, 2, 12);
        // Arms
        c.fillStyle = '#8b4513';
        c.fillRect(2, 16, 4, 8);
        c.fillRect(26, 16, 4, 8);
        c.fillStyle = '#c49a6a';
        c.fillRect(2, 24, 4, 4);
        c.fillRect(26, 24, 4, 4);
        // Bow
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 10, 2, 24);
        c.fillStyle = '#8b4513';
        c.fillRect(0, 10, 1, 24);
        // Bowstring
        c.fillStyle = '#d5c4a1';
        c.fillRect(0, 12, 2, 1);
        c.fillRect(0, 20, 2, 1);
        c.fillRect(0, 28, 2, 1);
        // Arrow
        c.fillStyle = '#95a5a6';
        c.fillRect(28, 14, 2, 16);
        c.fillStyle = '#bdc3c7';
        c.fillRect(28, 14, 1, 4);
        c.fillStyle = '#e74c3c';
        c.fillRect(28, 14, 2, 2);
        // Belt
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 26, 20, 2);
        // Quiver on back
        c.fillStyle = '#6d4c2a';
        c.fillRect(24, 12, 4, 12);
        c.fillStyle = '#8b4513';
        c.fillRect(25, 13, 2, 10);
        c.fillStyle = '#95a5a6';
        c.fillRect(25, 10, 2, 4);
        c.fillRect(27, 10, 2, 4);
        // Legs
        c.fillStyle = '#5a4a3a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#4a3a2a';
        c.fillRect(8, 32, 5, 4);
        c.fillRect(19, 32, 5, 4);
        // Boots
        c.fillStyle = '#3e2723';
        c.fillRect(7, 40, 7, 6);
        c.fillRect(18, 40, 7, 6);
        c.fillStyle = '#4e342e';
        c.fillRect(7, 42, 7, 4);
        c.fillRect(18, 42, 7, 4);
    });

    // Priestess — temple priestess with staff (32x48)
    mk('priestess', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Hair
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(11, 1, 10, 4);
        c.fillRect(8, 4, 2, 8);
        c.fillRect(22, 4, 2, 8);
        // Face
        c.fillStyle = '#f5cba7';
        c.fillRect(11, 4, 10, 8);
        c.fillStyle = '#5dade2';
        c.fillRect(13, 6, 2, 2);
        c.fillRect(17, 6, 2, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(14, 10, 4, 1);
        // Holy symbol
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 12, 4, 2);
        c.fillRect(15, 11, 2, 4);
        // White robe
        c.fillStyle = '#ecf0f1';
        c.fillRect(6, 14, 20, 14);
        c.fillStyle = '#fff';
        c.fillRect(8, 16, 16, 10);
        // Gold trim
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 14, 20, 2);
        c.fillRect(6, 26, 20, 2);
        c.fillRect(6, 14, 2, 14);
        c.fillRect(24, 14, 2, 14);
        // Arms
        c.fillStyle = '#ecf0f1';
        c.fillRect(2, 16, 4, 10);
        c.fillRect(26, 16, 4, 10);
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 26, 4, 4);
        c.fillRect(26, 26, 4, 4);
        // Staff
        c.fillStyle = '#8b4513';
        c.fillRect(0, 8, 2, 34);
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 8, 1, 30);
        // Staff orb
        c.fillStyle = '#3498db';
        c.fillRect(0, 4, 2, 4);
        c.fillRect(0, 4, 1, 4);
        c.fillStyle = '#5dade2';
        c.fillRect(0, 5, 1, 2);
        // Belt
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 28, 20, 2);
        // Lower robe
        c.fillStyle = '#ecf0f1';
        c.fillRect(6, 30, 20, 12);
        c.fillStyle = '#d5dbdb';
        c.fillRect(8, 32, 16, 10);
        // Hem
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 40, 20, 2);
        // Feet
        c.fillStyle = '#f5cba7';
        c.fillRect(8, 42, 6, 4);
        c.fillRect(18, 42, 6, 4);
    });

    // Captured Knight — bound knight in chains (32x48)
    mk('captured_knight', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Dented helmet
        c.fillStyle = '#7f8c8d';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 4);
        c.fillStyle = '#95a5a6';
        c.fillRect(11, 1, 10, 4);
        c.fillStyle = '#6c7a89';
        c.fillRect(12, 0, 2, 2);
        c.fillRect(18, 0, 2, 2);
        // Visor (damaged)
        c.fillStyle = '#5a6a7a';
        c.fillRect(10, 4, 12, 4);
        c.fillStyle = '#6a7a8a';
        c.fillRect(11, 5, 10, 2);
        c.fillStyle = '#4a5a6a';
        c.fillRect(14, 5, 2, 1);
        c.fillRect(20, 5, 2, 1);
        // Face (weary)
        c.fillStyle = '#d5c4a1';
        c.fillRect(11, 6, 10, 6);
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(14, 10, 4, 1);
        // Damaged armor
        c.fillStyle = '#7f8c8d';
        c.fillRect(6, 12, 20, 14);
        c.fillStyle = '#95a5a6';
        c.fillRect(8, 14, 16, 10);
        c.fillStyle = '#6c7a89';
        c.fillRect(10, 14, 4, 3);
        c.fillRect(18, 18, 4, 3);
        c.fillRect(12, 22, 6, 2);
        // Chains
        c.fillStyle = '#95a5a6';
        c.fillRect(2, 20, 4, 2);
        c.fillRect(26, 20, 4, 2);
        c.fillRect(2, 24, 4, 2);
        c.fillRect(26, 24, 4, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(3, 21, 2, 1);
        c.fillRect(27, 21, 2, 1);
        c.fillRect(3, 25, 2, 1);
        c.fillRect(27, 25, 2, 1);
        // Arms (bound)
        c.fillStyle = '#7f8c8d';
        c.fillRect(2, 16, 4, 10);
        c.fillRect(26, 16, 4, 10);
        c.fillStyle = '#d5c4a1';
        c.fillRect(2, 26, 4, 4);
        c.fillRect(26, 26, 4, 4);
        // Belt
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 26, 20, 2);
        // Legs
        c.fillStyle = '#6c7a89';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#5a6a7a';
        c.fillRect(8, 28, 2, 14);
        c.fillRect(21, 28, 2, 14);
        // Boots
        c.fillStyle = '#4a3a2a';
        c.fillRect(7, 40, 7, 6);
        c.fillRect(18, 40, 7, 6);
        c.fillStyle = '#3a2a1a';
        c.fillRect(7, 42, 7, 4);
        c.fillRect(18, 42, 7, 4);
        // Dragged weapon on ground
        c.fillStyle = '#7f8c8d';
        c.fillRect(28, 44, 4, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(30, 42, 2, 4);
    });

    // === SHADOW DISTRICT NPCs ===

    // Fallen Angel — corrupted celestial, broken wings (32x48)
    mk('fallen_angel', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Broken halo
        c.fillStyle = 'rgba(200,200,100,0.4)';
        c.fillRect(10, -2, 12, 2);
        c.fillRect(8, 0, 16, 1);
        c.fillStyle = 'rgba(200,200,100,0.2)';
        c.fillRect(12, -3, 8, 1);
        // Hair (dark, matted)
        c.fillStyle = '#2a2a3a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 4);
        c.fillStyle = '#1a1a2a';
        c.fillRect(11, 1, 10, 4);
        c.fillRect(8, 4, 2, 6);
        c.fillRect(22, 4, 2, 6);
        // Face (pale, sorrowful)
        c.fillStyle = '#c4b494';
        c.fillRect(11, 4, 10, 8);
        c.fillStyle = '#b4a484';
        c.fillRect(12, 5, 8, 6);
        // Eyes (hollow, sad)
        c.fillStyle = '#5a7a9a';
        c.fillRect(13, 6, 2, 3);
        c.fillRect(17, 6, 2, 3);
        c.fillStyle = '#8ab4d4';
        c.fillRect(13, 6, 1, 2);
        c.fillRect(17, 6, 1, 2);
        // Tear tracks
        c.fillStyle = 'rgba(100,150,200,0.3)';
        c.fillRect(13, 9, 1, 2);
        c.fillRect(18, 9, 1, 2);
        // Mouth
        c.fillStyle = '#8a7a6a';
        c.fillRect(14, 10, 4, 1);
        // Corrupted robes (dark grey/purple)
        c.fillStyle = '#2a2a3a';
        c.fillRect(6, 12, 20, 14);
        c.fillRect(4, 16, 24, 10);
        c.fillStyle = '#3a3a4a';
        c.fillRect(8, 14, 16, 10);
        // Corruption veins
        c.fillStyle = '#4a2a6a';
        c.fillRect(8, 16, 2, 8);
        c.fillRect(22, 16, 2, 8);
        c.fillRect(14, 14, 4, 2);
        c.fillRect(12, 20, 8, 1);
        // Broken wings (left)
        c.fillStyle = 'rgba(80,80,120,0.5)';
        c.fillRect(0, 10, 6, 16);
        c.fillRect(0, 8, 4, 12);
        c.fillStyle = 'rgba(100,100,140,0.4)';
        c.fillRect(1, 12, 3, 10);
        c.fillRect(0, 10, 2, 8);
        // Broken wings (right)
        c.fillStyle = 'rgba(80,80,120,0.5)';
        c.fillRect(26, 10, 6, 16);
        c.fillRect(28, 8, 4, 12);
        c.fillStyle = 'rgba(100,100,140,0.4)';
        c.fillRect(28, 12, 3, 10);
        c.fillRect(30, 10, 2, 8);
        // Broken feather tips
        c.fillStyle = 'rgba(60,60,100,0.3)';
        c.fillRect(0, 22, 2, 4);
        c.fillRect(4, 24, 2, 2);
        c.fillRect(26, 24, 2, 2);
        c.fillRect(30, 22, 2, 4);
        // Arms
        c.fillStyle = '#2a2a3a';
        c.fillRect(2, 16, 4, 10);
        c.fillRect(26, 16, 4, 10);
        c.fillStyle = '#c4b494';
        c.fillRect(2, 26, 4, 4);
        c.fillRect(26, 26, 4, 4);
        // Chained wrists
        c.fillStyle = '#5a5a6a';
        c.fillRect(1, 26, 2, 2);
        c.fillRect(29, 26, 2, 2);
        // Legs
        c.fillStyle = '#2a2a3a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#3a3a4a';
        c.fillRect(9, 30, 3, 10);
        c.fillRect(20, 30, 3, 10);
        // Tattered hem
        c.fillStyle = '#1a1a2a';
        c.fillRect(6, 40, 8, 4);
        c.fillRect(18, 40, 8, 4);
        c.fillRect(8, 42, 4, 2);
        c.fillRect(20, 42, 4, 2);
        // Feet
        c.fillStyle = '#8a7a6a';
        c.fillRect(7, 44, 6, 4);
        c.fillRect(19, 44, 6, 4);
        c.fillStyle = '#7a6a5a';
        c.fillRect(8, 46, 4, 2);
        c.fillRect(20, 46, 4, 2);
    });

    // Trapped Soul — ghostly figure in chains (24x36)
    mk('trapped_soul', 24, 36, (c) => {
        c.imageSmoothingEnabled = false;
        // Ethereal head
        c.fillStyle = 'rgba(150,180,220,0.4)';
        c.fillRect(8, 0, 8, 8);
        c.fillRect(6, 2, 12, 6);
        c.fillStyle = 'rgba(180,210,240,0.5)';
        c.fillRect(9, 1, 6, 6);
        c.fillRect(7, 3, 10, 4);
        // Eyes (haunted)
        c.fillStyle = '#aaccff';
        c.fillRect(9, 3, 2, 2);
        c.fillRect(13, 3, 2, 2);
        c.fillStyle = '#ccddff';
        c.fillRect(9, 3, 1, 1);
        c.fillRect(13, 3, 1, 1);
        // Mouth (screaming)
        c.fillStyle = 'rgba(100,130,180,0.5)';
        c.fillRect(10, 6, 4, 2);
        c.fillStyle = 'rgba(80,110,160,0.4)';
        c.fillRect(11, 7, 2, 1);
        // Ghostly body
        c.fillStyle = 'rgba(120,150,200,0.3)';
        c.fillRect(6, 8, 12, 14);
        c.fillRect(4, 12, 16, 10);
        c.fillStyle = 'rgba(150,180,220,0.4)';
        c.fillRect(7, 10, 10, 12);
        c.fillRect(5, 14, 14, 8);
        c.fillStyle = 'rgba(180,210,240,0.5)';
        c.fillRect(8, 12, 8, 8);
        // Chains (ethereal)
        c.fillStyle = 'rgba(100,120,160,0.5)';
        c.fillRect(2, 10, 4, 2);
        c.fillRect(18, 10, 4, 2);
        c.fillRect(1, 14, 3, 2);
        c.fillRect(20, 14, 3, 2);
        c.fillRect(0, 18, 4, 2);
        c.fillRect(20, 18, 4, 2);
        c.fillStyle = 'rgba(130,150,190,0.6)';
        c.fillRect(3, 11, 2, 1);
        c.fillRect(19, 11, 2, 1);
        c.fillRect(2, 15, 1, 1);
        c.fillRect(21, 15, 1, 1);
        // Arms (reaching)
        c.fillStyle = 'rgba(120,150,200,0.3)';
        c.fillRect(2, 12, 4, 8);
        c.fillRect(18, 12, 4, 8);
        c.fillStyle = 'rgba(150,180,220,0.4)';
        c.fillRect(2, 16, 3, 6);
        c.fillRect(19, 16, 3, 6);
        // Hands (clawing)
        c.fillStyle = 'rgba(180,210,240,0.5)';
        c.fillRect(1, 18, 3, 4);
        c.fillRect(20, 18, 3, 4);
        c.fillStyle = 'rgba(200,230,255,0.6)';
        c.fillRect(1, 20, 2, 2);
        c.fillRect(21, 20, 2, 2);
        // Lower body (fading)
        c.fillStyle = 'rgba(100,130,180,0.2)';
        c.fillRect(6, 22, 12, 8);
        c.fillRect(8, 28, 8, 6);
        c.fillRect(10, 32, 4, 4);
        c.fillStyle = 'rgba(80,110,160,0.15)';
        c.fillRect(8, 30, 8, 4);
        c.fillRect(10, 34, 4, 2);
        // Ethereal wisps
        c.fillStyle = 'rgba(150,180,220,0.15)';
        c.fillRect(4, 6, 2, 4);
        c.fillRect(18, 6, 2, 4);
        c.fillRect(6, 30, 2, 4);
        c.fillRect(16, 30, 2, 4);
    });

    // Rift Scout — hooded explorer with portal staff (32x48)
    mk('rift_scout', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Hood
        c.fillStyle = '#1a2a3a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 6);
        c.fillStyle = '#2a3a4a';
        c.fillRect(11, 1, 10, 4);
        // Face (weathered, scarred)
        c.fillStyle = '#c49a6a';
        c.fillRect(11, 6, 10, 8);
        c.fillStyle = '#b88a5a';
        c.fillRect(12, 7, 8, 6);
        // Eyes (sharp, alert)
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        c.fillStyle = '#34495e';
        c.fillRect(13, 8, 1, 1);
        c.fillRect(17, 8, 1, 1);
        // Scar across eye
        c.fillStyle = '#a0522d';
        c.fillRect(12, 7, 2, 1);
        c.fillRect(19, 8, 2, 1);
        // Beard (short, dark)
        c.fillStyle = '#3a3a3a';
        c.fillRect(12, 12, 8, 2);
        c.fillRect(13, 14, 6, 1);
        // Leather armor
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 14, 20, 12);
        c.fillStyle = '#6d4c2a';
        c.fillRect(8, 16, 16, 8);
        // Stitching
        c.fillStyle = '#4a2d10';
        c.fillRect(8, 18, 16, 1);
        c.fillRect(8, 22, 16, 1);
        c.fillRect(14, 14, 2, 12);
        // Shoulder guards
        c.fillStyle = '#4a3a2a';
        c.fillRect(3, 14, 4, 5);
        c.fillRect(25, 14, 4, 5);
        c.fillStyle = '#5a4a3a';
        c.fillRect(4, 15, 2, 3);
        c.fillRect(26, 15, 2, 3);
        // Arms
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 19, 4, 8);
        c.fillRect(26, 19, 4, 8);
        c.fillStyle = '#c49a6a';
        c.fillRect(2, 27, 4, 4);
        c.fillRect(26, 27, 4, 4);
        // Portal staff
        c.fillStyle = '#2a3a4a';
        c.fillRect(0, 6, 2, 34);
        c.fillStyle = '#3a4a5a';
        c.fillRect(0, 6, 1, 30);
        // Staff orb (portal energy)
        c.fillStyle = '#4a2a8a';
        c.fillRect(0, 2, 2, 4);
        c.fillStyle = '#6a4aaa';
        c.fillRect(0, 2, 1, 4);
        c.fillStyle = '#8a6acc';
        c.fillRect(0, 3, 1, 2);
        // Glow
        c.fillStyle = 'rgba(100,60,160,0.2)';
        c.beginPath();
        c.arc(1, 4, 4, 0, Math.PI * 2);
        c.fill();
        // Belt
        c.fillStyle = '#3a2a1a';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#5a5a6a';
        c.fillRect(14, 26, 4, 2);
        // Pouches
        c.fillStyle = '#4a3a2a';
        c.fillRect(6, 24, 4, 4);
        c.fillRect(22, 24, 4, 4);
        // Legs
        c.fillStyle = '#3a3a2a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#4a4a3a';
        c.fillRect(9, 30, 3, 10);
        c.fillRect(20, 30, 3, 10);
        // Knee pads
        c.fillStyle = '#5a3d1a';
        c.fillRect(8, 32, 5, 3);
        c.fillRect(19, 32, 5, 3);
        // Boots
        c.fillStyle = '#3a2a1a';
        c.fillRect(7, 42, 6, 4);
        c.fillRect(19, 42, 6, 4);
        c.fillStyle = '#4a3a2a';
        c.fillRect(7, 44, 6, 2);
        c.fillRect(19, 44, 6, 2);
        // Boots straps
        c.fillStyle = '#5a3d1a';
        c.fillRect(7, 43, 6, 1);
        c.fillRect(19, 43, 6, 1);
    });

    // === TOWER OF THE FALLEN KING NPCs ===

    // Ghost Advisor — призрачный советник, полупрозрачный (32x48)
    mk('ghost_advisor', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Ethereal hood
        c.fillStyle = 'rgba(60,60,100,0.3)';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 6);
        c.fillStyle = 'rgba(80,80,120,0.4)';
        c.fillRect(11, 1, 10, 4);
        // Face (ghostly)
        c.fillStyle = 'rgba(150,170,200,0.4)';
        c.fillRect(11, 6, 10, 8);
        c.fillStyle = 'rgba(180,200,230,0.5)';
        c.fillRect(12, 7, 8, 6);
        // Eyes (hollow, glowing)
        c.fillStyle = 'rgba(100,150,255,0.6)';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        c.fillStyle = 'rgba(130,180,255,0.8)';
        c.fillRect(13, 8, 1, 1);
        c.fillRect(17, 8, 1, 1);
        // Ghostly robes
        c.fillStyle = 'rgba(50,50,90,0.3)';
        c.fillRect(6, 14, 20, 14);
        c.fillRect(4, 18, 24, 10);
        c.fillStyle = 'rgba(70,70,110,0.4)';
        c.fillRect(8, 16, 16, 10);
        c.fillRect(6, 20, 20, 6);
        // Ghostly glow
        c.fillStyle = 'rgba(100,100,160,0.2)';
        c.fillRect(10, 18, 12, 6);
        // Ghostly arms
        c.fillStyle = 'rgba(60,60,100,0.25)';
        c.fillRect(2, 16, 4, 10);
        c.fillRect(26, 16, 4, 10);
        c.fillStyle = 'rgba(80,80,120,0.35)';
        c.fillRect(3, 20, 2, 8);
        c.fillRect(27, 20, 2, 8);
        // Ethereal scroll
        c.fillStyle = 'rgba(200,180,140,0.3)';
        c.fillRect(2, 24, 6, 10);
        c.fillStyle = 'rgba(220,200,160,0.4)';
        c.fillRect(3, 25, 4, 8);
        c.fillStyle = 'rgba(100,100,80,0.3)';
        c.fillRect(4, 27, 2, 1);
        c.fillRect(4, 30, 2, 1);
        // Lower body (fading)
        c.fillStyle = 'rgba(50,50,90,0.2)';
        c.fillRect(8, 28, 16, 10);
        c.fillRect(6, 32, 20, 8);
        c.fillStyle = 'rgba(70,70,110,0.15)';
        c.fillRect(10, 36, 12, 8);
        c.fillRect(12, 42, 8, 6);
        // Distortion lines
        c.fillStyle = 'rgba(100,100,180,0.08)';
        c.fillRect(4, 12, 24, 1);
        c.fillRect(4, 24, 24, 1);
        c.fillRect(4, 36, 24, 1);
    });

    // Trapped Prince — пленный принц в оковах (32x48)
    mk('trapped_prince', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Torn crown
        c.fillStyle = '#aa8822';
        c.fillRect(10, 0, 12, 3);
        c.fillRect(10, 0, 2, 5);
        c.fillRect(20, 0, 2, 5);
        c.fillRect(14, 0, 4, 4);
        c.fillStyle = '#880000';
        c.fillRect(11, 1, 1, 1);
        c.fillRect(19, 1, 1, 1);
        c.fillRect(15, 0, 1, 1);
        // Hair (messy, dark)
        c.fillStyle = '#2a1a0a';
        c.fillRect(10, 3, 12, 4);
        c.fillRect(8, 5, 16, 4);
        c.fillStyle = '#1a0a00';
        c.fillRect(11, 4, 10, 2);
        c.fillRect(8, 6, 2, 4);
        c.fillRect(22, 6, 2, 4);
        // Face (pale, bruised)
        c.fillStyle = '#c4a882';
        c.fillRect(11, 5, 10, 8);
        c.fillStyle = '#b49872';
        c.fillRect(12, 6, 8, 6);
        // Eyes (tired, dark circles)
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        c.fillStyle = '#34495e';
        c.fillRect(13, 8, 1, 1);
        c.fillRect(17, 8, 1, 1);
        // Dark circles
        c.fillStyle = 'rgba(40,30,50,0.3)';
        c.fillRect(12, 7, 4, 1);
        c.fillRect(16, 7, 4, 1);
        // Bruise
        c.fillStyle = 'rgba(80,40,80,0.4)';
        c.fillRect(18, 6, 3, 2);
        // Torn royal clothes
        c.fillStyle = '#2a1a4a';
        c.fillRect(6, 13, 20, 14);
        c.fillRect(4, 17, 24, 10);
        c.fillStyle = '#3a2a5a';
        c.fillRect(8, 15, 16, 10);
        c.fillRect(6, 19, 20, 6);
        // Torn patches
        c.fillStyle = '#1a0a2a';
        c.fillRect(8, 16, 4, 3);
        c.fillRect(18, 18, 4, 3);
        c.fillRect(10, 22, 6, 2);
        // Chains on wrists
        c.fillStyle = '#5a5a6a';
        c.fillRect(2, 20, 4, 2);
        c.fillRect(26, 20, 4, 2);
        c.fillRect(1, 22, 3, 2);
        c.fillRect(28, 22, 3, 2);
        c.fillStyle = '#7a7a8a';
        c.fillRect(3, 21, 2, 1);
        c.fillRect(27, 21, 2, 1);
        // Arms (bound)
        c.fillStyle = '#2a1a4a';
        c.fillRect(2, 16, 4, 10);
        c.fillRect(26, 16, 4, 10);
        c.fillStyle = '#c4a882';
        c.fillRect(2, 24, 4, 4);
        c.fillRect(26, 24, 4, 4);
        // Legs
        c.fillStyle = '#2a1a4a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#3a2a5a';
        c.fillRect(9, 30, 3, 10);
        c.fillRect(20, 30, 3, 10);
        // Torn hem
        c.fillStyle = '#1a0a2a';
        c.fillRect(7, 40, 6, 4);
        c.fillRect(19, 40, 6, 4);
        c.fillRect(9, 42, 3, 2);
        c.fillRect(20, 42, 3, 2);
        // Boots (worn)
        c.fillStyle = '#3a2a1a';
        c.fillRect(7, 44, 6, 4);
        c.fillRect(19, 44, 6, 4);
        c.fillStyle = '#4a3a2a';
        c.fillRect(7, 46, 6, 2);
        c.fillRect(19, 46, 6, 2);
    });

    // Tower Sage — мудрец башни, с посохом (32x48)
    mk('tower_sage', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Hood (ancient)
        c.fillStyle = '#2a2a3a';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(8, 2, 16, 6);
        c.fillStyle = '#3a3a4a';
        c.fillRect(11, 1, 10, 4);
        // Face (old, wise)
        c.fillStyle = '#c4a882';
        c.fillRect(11, 6, 10, 8);
        c.fillStyle = '#b49872';
        c.fillRect(12, 7, 8, 6);
        // Eyes (piercing blue)
        c.fillStyle = '#3498db';
        c.fillRect(13, 8, 2, 2);
        c.fillRect(17, 8, 2, 2);
        c.fillStyle = '#5dade2';
        c.fillRect(13, 8, 1, 1);
        c.fillRect(17, 8, 1, 1);
        // White beard
        c.fillStyle = '#d5dbdb';
        c.fillRect(12, 12, 8, 2);
        c.fillRect(11, 14, 10, 2);
        c.fillRect(10, 16, 12, 2);
        c.fillRect(11, 18, 10, 2);
        c.fillRect(12, 20, 8, 1);
        // Sage robes (dark blue/grey)
        c.fillStyle = '#2c3e50';
        c.fillRect(6, 14, 20, 14);
        c.fillRect(4, 18, 24, 10);
        c.fillStyle = '#34495e';
        c.fillRect(8, 16, 16, 10);
        c.fillRect(6, 20, 20, 6);
        // Gold runes on robe
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 18, 6, 2);
        c.fillRect(16, 20, 6, 2);
        c.fillRect(12, 22, 8, 1);
        // Arms
        c.fillStyle = '#2c3e50';
        c.fillRect(2, 16, 4, 10);
        c.fillRect(26, 16, 4, 10);
        c.fillStyle = '#c4a882';
        c.fillRect(2, 26, 4, 4);
        c.fillRect(26, 26, 4, 4);
        // Ancient staff
        c.fillStyle = '#5a3d1a';
        c.fillRect(0, 6, 2, 36);
        c.fillStyle = '#6d4c2a';
        c.fillRect(0, 6, 1, 32);
        // Staff orb (ancient magic)
        c.fillStyle = '#3498db';
        c.fillRect(0, 2, 2, 4);
        c.fillStyle = '#5dade2';
        c.fillRect(0, 2, 1, 4);
        c.fillStyle = '#85c1e9';
        c.fillRect(0, 3, 1, 2);
        // Glow
        c.fillStyle = 'rgba(52,152,219,0.15)';
        c.beginPath();
        c.arc(1, 4, 4, 0, Math.PI * 2);
        c.fill();
        // Belt
        c.fillStyle = '#1a1a2a';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 26, 4, 2);
        // Pouches
        c.fillStyle = '#3a2a1a';
        c.fillRect(6, 24, 4, 4);
        c.fillRect(22, 24, 4, 4);
        // Legs
        c.fillStyle = '#1a1a2a';
        c.fillRect(8, 28, 5, 14);
        c.fillRect(19, 28, 5, 14);
        c.fillStyle = '#2a2a3a';
        c.fillRect(9, 30, 3, 10);
        c.fillRect(20, 30, 3, 10);
        // Boots
        c.fillStyle = '#3a2a1a';
        c.fillRect(7, 42, 6, 4);
        c.fillRect(19, 42, 6, 4);
        c.fillStyle = '#4a3a2a';
        c.fillRect(7, 44, 6, 2);
        c.fillRect(19, 44, 6, 2);
        // Ancient glow
        c.fillStyle = 'rgba(52,152,219,0.08)';
        c.fillRect(6, 14, 20, 28);
    });
}
