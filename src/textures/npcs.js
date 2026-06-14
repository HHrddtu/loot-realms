export function drawNpcTextures(mk) {
    const npcs = [
        { key: 'npc_elder',    bodyColor: '#8e44ad', robeColor: '#6c3483', detail: '#f1c40f' },
        { key: 'npc_merchant', bodyColor: '#d4ac0d', robeColor: '#b7950b', detail: '#e67e22' },
        { key: 'npc_miner',    bodyColor: '#7f8c8d', robeColor: '#566573', detail: '#f39c12' },
        { key: 'npc_ghost',    bodyColor: '#5dade2', robeColor: '#3498db', detail: '#ecf0f1' }
    ];

    npcs.forEach(npc => {
        mk(npc.key, 32, 48, (c) => {
            c.imageSmoothingEnabled = false;

            c.fillStyle = npc.bodyColor;
            c.fillRect(8, 12, 16, 20);

            c.fillStyle = npc.robeColor;
            c.fillRect(6, 14, 20, 18);
            c.fillRect(4, 20, 24, 10);

            c.fillStyle = '#f5cba7';
            c.fillRect(10, 2, 12, 10);
            c.fillRect(8, 4, 16, 8);

            c.fillStyle = '#2c3e50';
            c.fillRect(12, 6, 3, 3);
            c.fillRect(18, 6, 3, 3);

            c.fillStyle = npc.detail;
            c.fillRect(13, 0, 6, 4);
            c.fillRect(10, 0, 12, 2);

            c.fillStyle = npc.robeColor;
            c.fillRect(10, 32, 5, 14);
            c.fillRect(17, 32, 5, 14);

            c.fillStyle = '#2c3e50';
            c.fillRect(8, 44, 8, 4);
            c.fillRect(16, 44, 8, 4);

            c.fillStyle = npc.bodyColor;
            c.fillRect(2, 16, 6, 12);
            c.fillRect(24, 16, 6, 12);

            c.fillStyle = '#f5cba7';
            c.fillRect(0, 26, 6, 6);
            c.fillRect(26, 26, 6, 6);
        });
    });

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
}
