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
        // Hat (pointed wizard hat, dark purple)
        c.fillStyle = '#2d1b4e';
        c.fillRect(10, 0, 12, 4);
        c.fillRect(8, 4, 16, 4);
        c.fillRect(6, 8, 20, 4);
        // Hat brim
        c.fillStyle = '#3d2b5e';
        c.fillRect(4, 12, 24, 2);
        // Hat tip star
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 1, 4, 2);
        // Face (old, pale)
        c.fillStyle = '#d5c4a1';
        c.fillRect(10, 14, 12, 8);
        // Eyes (wise, glowing slightly)
        c.fillStyle = '#7b68ee';
        c.fillRect(12, 16, 2, 2);
        c.fillRect(18, 16, 2, 2);
        // Beard (long, grey)
        c.fillStyle = '#9e9e9e';
        c.fillRect(12, 20, 8, 4);
        c.fillRect(10, 22, 12, 4);
        c.fillRect(12, 26, 8, 2);
        // Robe (dark purple)
        c.fillStyle = '#2d1b4e';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#3d2b5e';
        c.fillRect(8, 16, 16, 12);
        // Robe trim
        c.fillStyle = '#6a3d9a';
        c.fillRect(6, 28, 20, 2);
        // Arms
        c.fillStyle = '#2d1b4e';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        // Hands (pale)
        c.fillStyle = '#d5c4a1';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        // Book in left hand
        c.fillStyle = '#5a3d1a';
        c.fillRect(0, 26, 6, 8);
        c.fillStyle = '#f5f5dc';
        c.fillRect(1, 27, 4, 6);
        c.fillStyle = '#2d1b4e';
        c.fillRect(1, 27, 4, 1);
        // Legs/boots
        c.fillStyle = '#1a0e2e';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        // Boots
        c.fillStyle = '#3d2b1f';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
        // Staff in right hand
        c.fillStyle = '#8b6914';
        c.fillRect(28, 10, 2, 28);
        c.fillStyle = '#6a3d9a';
        c.fillRect(27, 8, 4, 4);
        c.fillStyle = '#9b59b6';
        c.fillRect(28, 9, 2, 2);
    });

    mk('player_alchemist', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Hat (round alchemist hat, brown)
        c.fillStyle = '#5a3d1a';
        c.fillRect(8, 0, 16, 4);
        c.fillRect(6, 4, 20, 4);
        c.fillRect(4, 8, 24, 4);
        // Hat brim
        c.fillStyle = '#6b4423';
        c.fillRect(2, 12, 28, 2);
        // Goggles
        c.fillStyle = '#f39c12';
        c.fillRect(10, 14, 5, 4);
        c.fillRect(17, 14, 5, 4);
        c.fillStyle = '#2c3e50';
        c.fillRect(11, 15, 3, 2);
        c.fillRect(18, 15, 3, 2);
        // Bridge of goggles
        c.fillStyle = '#f39c12';
        c.fillRect(15, 15, 2, 2);
        // Face (weathered)
        c.fillStyle = '#c4956a';
        c.fillRect(10, 14, 12, 8);
        // Beard (brown, bushy)
        c.fillStyle = '#6b4423';
        c.fillRect(10, 20, 12, 4);
        c.fillRect(8, 22, 16, 4);
        c.fillRect(10, 26, 12, 2);
        // Coat (brown leather)
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#6b4423';
        c.fillRect(8, 16, 16, 12);
        // Coat trim
        c.fillStyle = '#8b6914';
        c.fillRect(6, 28, 20, 2);
        // Belt
        c.fillStyle = '#3d2b1f';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 25, 4, 4);
        // Arms
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        // Hands
        c.fillStyle = '#c4956a';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        // Flask in left hand (green liquid)
        c.fillStyle = '#27ae60';
        c.fillRect(0, 24, 6, 8);
        c.fillStyle = '#2ecc71';
        c.fillRect(1, 25, 4, 5);
        c.fillStyle = '#5a3d1a';
        c.fillRect(1, 23, 4, 2);
        // Legs/boots
        c.fillStyle = '#3d2b1f';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        // Boots
        c.fillStyle = '#2c1e14';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
        // Vials on belt
        c.fillStyle = '#e74c3c';
        c.fillRect(26, 22, 3, 5);
        c.fillStyle = '#3498db';
        c.fillRect(27, 20, 3, 5);
    });

    mk('player_angel', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Hair (blonde)
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 0, 12, 4);
        c.fillRect(8, 2, 16, 6);
        c.fillRect(6, 6, 20, 4);
        // Face (pale, youthful)
        c.fillStyle = '#fdebd0';
        c.fillRect(10, 8, 12, 8);
        // Eyes (blue, divine)
        c.fillStyle = '#5dade2';
        c.fillRect(12, 10, 2, 2);
        c.fillRect(18, 10, 2, 2);
        // Mouth
        c.fillStyle = '#e8a0a0';
        c.fillRect(14, 14, 4, 1);
        // Small white wings
        c.fillStyle = '#ecf0f1';
        c.fillRect(0, 10, 6, 8);
        c.fillRect(26, 10, 6, 8);
        c.fillStyle = '#ffffff';
        c.fillRect(1, 11, 4, 6);
        c.fillRect(27, 11, 4, 6);
        // Wing feathers
        c.fillStyle = '#d5dbdb';
        c.fillRect(0, 12, 2, 4);
        c.fillRect(30, 12, 2, 4);
        // White robe
        c.fillStyle = '#ecf0f1';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#ffffff';
        c.fillRect(8, 16, 16, 12);
        // Robe trim (golden)
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 28, 20, 2);
        // Holy symbol on chest
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 18, 4, 6);
        c.fillRect(12, 20, 8, 2);
        // Arms
        c.fillStyle = '#ecf0f1';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        // Hands
        c.fillStyle = '#fdebd0';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        // Violin in right hand
        c.fillStyle = '#8b4513';
        c.fillRect(27, 18, 2, 14);
        c.fillStyle = '#a0522d';
        c.fillRect(25, 20, 6, 8);
        c.fillStyle = '#f5f5dc';
        c.fillRect(26, 21, 4, 6);
        c.fillStyle = '#8b4513';
        c.fillRect(28, 16, 2, 4);
        // Legs/boots (white)
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        // Boots (golden)
        c.fillStyle = '#f1c40f';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
    });
}
