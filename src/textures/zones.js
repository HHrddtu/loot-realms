export function drawZoneTextures(mk) {
    mk('ground', 800, 200, (c) => {
        c.fillStyle = '#1a472a';
        c.fillRect(0, 0, 800, 200);
        c.fillStyle = '#1e5631';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        c.fillStyle = '#145a28';
        for (let i = 0; i < 60; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 50, 4, 2);
        }
        c.fillStyle = '#0d3318';
        for (let i = 0; i < 40; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
    });

    mk('stump', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6d4c2a';
        c.fillRect(4, 8, 20, 14);
        c.fillStyle = '#8b6914';
        c.fillRect(6, 6, 16, 4);
        c.fillStyle = '#5a3d1a';
        c.fillRect(8, 12, 12, 8);
        c.fillStyle = '#a07828';
        c.fillRect(10, 8, 3, 3);
        c.fillRect(17, 10, 2, 2);
        c.fillStyle = '#4a2d10';
        c.fillRect(4, 20, 20, 4);
        c.fillStyle = '#7a5a30';
        c.fillRect(6, 22, 4, 2);
        c.fillRect(18, 22, 4, 2);
    });

    mk('stump_broken', 28, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 4, 24, 6);
        c.fillStyle = '#4a2d10';
        c.fillRect(0, 8, 28, 4);
        c.fillStyle = '#8b6914';
        c.fillRect(6, 2, 4, 4);
        c.fillRect(18, 2, 4, 4);
        c.fillStyle = '#a07828';
        c.fillRect(10, 4, 3, 2);
    });

    // Castle textures
    mk('castle_ground', 600, 550, (c) => {
        c.fillStyle = '#3a3a3a';
        c.fillRect(0, 0, 600, 550);
        c.strokeStyle = '#4a4a4a';
        c.lineWidth = 1;
        const bw = 40, bh = 20;
        for (let row = 0; row < 30; row++) {
            const offset = (row % 2) * (bw / 2);
            for (let col = -1; col < 17; col++) {
                const x = col * bw + offset;
                const y = row * bh;
                c.fillStyle = row % 3 === 0 ? '#444444' : row % 3 === 1 ? '#3c3c3c' : '#383838';
                c.fillRect(x + 1, y + 1, bw - 2, bh - 2);
                c.strokeRect(x, y, bw, bh);
            }
        }
        c.fillStyle = '#2a2a2a';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 600, Math.random() * 550, 2, 2);
        }
    });

    mk('castle_door', 40, 50, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#555555';
        c.fillRect(2, 0, 36, 50);
        c.fillStyle = '#444444';
        c.fillRect(4, 2, 32, 46);
        c.fillStyle = '#666666';
        c.fillRect(6, 4, 28, 42);
        c.fillStyle = '#333333';
        c.fillRect(4, 0, 32, 4);
        c.fillRect(4, 46, 32, 4);
        c.fillStyle = '#777777';
        c.fillRect(8, 6, 24, 2);
        c.fillRect(8, 42, 24, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(30, 24, 4, 4);
        c.fillStyle = '#e67e22';
        c.fillRect(31, 25, 2, 2);
    });

    mk('castle_bars', 40, 50, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#7f8c8d';
        c.fillRect(0, 0, 4, 50);
        c.fillRect(8, 0, 4, 50);
        c.fillRect(16, 0, 4, 50);
        c.fillRect(24, 0, 4, 50);
        c.fillRect(32, 0, 4, 50);
        c.fillRect(36, 0, 4, 50);
        c.fillStyle = '#566573';
        c.fillRect(0, 0, 40, 4);
        c.fillRect(0, 46, 40, 4);
        c.fillStyle = '#95a5a6';
        c.fillRect(2, 2, 2, 2);
        c.fillRect(10, 2, 2, 2);
        c.fillRect(18, 2, 2, 2);
        c.fillRect(26, 2, 2, 2);
        c.fillRect(34, 2, 2, 2);
    });

    mk('castle_stairs', 40, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#566573';
        c.fillRect(0, 0, 40, 20);
        c.fillStyle = '#7f8c8d';
        c.fillRect(2, 2, 36, 4);
        c.fillRect(2, 8, 36, 4);
        c.fillRect(2, 14, 36, 4);
        c.fillStyle = '#95a5a6';
        c.fillRect(4, 3, 32, 2);
        c.fillRect(4, 9, 32, 2);
        c.fillRect(4, 15, 32, 2);
    });

    // Depths floor — dark stone with cracks, bones, skulls (tileable 800x200)
    mk('depths_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;

        // Base dark stone
        c.fillStyle = '#0e0e14';
        c.fillRect(0, 0, 800, 200);

        // Stone texture noise
        c.fillStyle = '#121218';
        for (let i = 0; i < 400; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        c.fillStyle = '#0a0a0f';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
        c.fillStyle = '#16161e';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 1, 3);
        }

        // Stone tile grid (subtle)
        c.fillStyle = '#1a1a24';
        const bw = 80, bh = 50;
        for (let row = 0; row < 5; row++) {
            const offset = (row % 2) * (bw / 2);
            for (let col = -1; col < 12; col++) {
                const x = col * bw + offset;
                const y = row * bh;
                c.fillRect(x, y, bw, 1);
                c.fillRect(x, y, 1, bh);
            }
        }

        // Cracks
        c.fillStyle = '#06060a';
        // Horizontal cracks
        c.fillRect(120, 45, 60, 1);
        c.fillRect(125, 46, 30, 1);
        c.fillRect(350, 120, 80, 1);
        c.fillRect(360, 121, 40, 1);
        c.fillRect(600, 70, 50, 1);
        c.fillRect(610, 71, 25, 1);
        // Diagonal cracks
        c.fillRect(200, 80, 2, 2);
        c.fillRect(202, 82, 2, 2);
        c.fillRect(204, 84, 2, 2);
        c.fillRect(206, 86, 2, 2);
        c.fillRect(500, 30, 2, 2);
        c.fillRect(502, 32, 2, 2);
        c.fillRect(504, 34, 2, 2);
        c.fillRect(700, 150, 2, 2);
        c.fillRect(702, 152, 2, 2);
        c.fillRect(704, 148, 2, 2);
        c.fillRect(706, 150, 2, 2);

        // Scattered bones (small white fragments)
        c.fillStyle = '#c8b898';
        c.fillRect(50, 30, 8, 2);
        c.fillRect(48, 28, 2, 6);
        c.fillRect(56, 28, 2, 6);
        c.fillRect(250, 160, 6, 2);
        c.fillRect(248, 158, 2, 6);
        c.fillRect(254, 158, 2, 6);
        c.fillRect(450, 50, 10, 2);
        c.fillRect(448, 48, 2, 6);
        c.fillRect(458, 48, 2, 6);
        c.fillRect(650, 180, 8, 2);
        c.fillRect(648, 178, 2, 6);
        c.fillRect(656, 178, 2, 6);
        // Rib bones
        c.fillStyle = '#b8a888';
        c.fillRect(150, 100, 2, 8);
        c.fillRect(154, 102, 2, 8);
        c.fillRect(158, 100, 2, 8);
        c.fillRect(152, 100, 6, 2);
        c.fillRect(550, 20, 2, 8);
        c.fillRect(554, 22, 2, 8);
        c.fillRect(558, 20, 2, 8);
        c.fillRect(552, 20, 6, 2);

        // Skulls
        // Skull 1
        c.fillStyle = '#d4c4a4';
        c.fillRect(320, 80, 10, 8);
        c.fillRect(318, 82, 14, 4);
        c.fillStyle = '#0a0a0f';
        c.fillRect(321, 83, 3, 3);
        c.fillRect(326, 83, 3, 3);
        c.fillRect(323, 87, 4, 2);
        // Skull 2
        c.fillStyle = '#c8b898';
        c.fillRect(700, 100, 8, 6);
        c.fillRect(698, 102, 12, 3);
        c.fillStyle = '#0a0a0f';
        c.fillRect(701, 103, 2, 2);
        c.fillRect(705, 103, 2, 2);
        c.fillRect(702, 106, 3, 1);
        // Skull 3
        c.fillStyle = '#b8a888';
        c.fillRect(100, 170, 8, 6);
        c.fillRect(98, 172, 12, 3);
        c.fillStyle = '#0a0a0f';
        c.fillRect(101, 173, 2, 2);
        c.fillRect(105, 173, 2, 2);

        // Dark puddles
        c.fillStyle = 'rgba(10,5,20,0.4)';
        c.beginPath();
        c.ellipse(180, 140, 30, 8, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(520, 60, 25, 6, 0.3, 0, Math.PI * 2);
        c.fill();

        // Subtle purple glow spots (magic ambiance)
        c.fillStyle = 'rgba(80,40,120,0.06)';
        c.beginPath();
        c.ellipse(300, 50, 40, 20, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(600, 160, 35, 15, 0.5, 0, Math.PI * 2);
        c.fill();
    });

    // Depths bone chest — 28x24
    mk('depths_chest', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        // Chest base (bone)
        c.fillStyle = '#c8b898';
        c.fillRect(2, 8, 24, 14);
        c.fillStyle = '#d4c4a4';
        c.fillRect(4, 10, 20, 10);
        // Lid (bone, slightly curved)
        c.fillStyle = '#c8b898';
        c.fillRect(0, 2, 28, 8);
        c.fillStyle = '#d4c4a4';
        c.fillRect(2, 3, 24, 6);
        c.fillStyle = '#e4d4b4';
        c.fillRect(4, 4, 20, 4);
        // Bone decorations (ribs on sides)
        c.fillStyle = '#b8a888';
        c.fillRect(0, 4, 2, 10);
        c.fillRect(26, 4, 2, 10);
        c.fillRect(1, 6, 1, 6);
        c.fillRect(26, 6, 1, 6);
        // Skull clasp
        c.fillStyle = '#d4c4a4';
        c.fillRect(10, 8, 8, 6);
        c.fillRect(9, 9, 10, 4);
        c.fillStyle = '#0a0a0f';
        c.fillRect(11, 10, 2, 2);
        c.fillRect(15, 10, 2, 2);
        c.fillRect(12, 13, 4, 1);
        // Bone trim
        c.fillStyle = '#b8a888';
        c.fillRect(2, 14, 24, 2);
        c.fillRect(2, 20, 24, 2);
        // Bottom bone
        c.fillStyle = '#c8b898';
        c.fillRect(4, 22, 20, 2);
        // Dark interior hint
        c.fillStyle = '#2a1a0a';
        c.fillRect(6, 12, 16, 6);
        c.fillStyle = '#1a0a00';
        c.fillRect(8, 14, 12, 4);
        // Glow from inside (gold)
        c.fillStyle = 'rgba(241,196,15,0.3)';
        c.fillRect(10, 14, 8, 3);
        c.fillStyle = 'rgba(241,196,15,0.15)';
        c.fillRect(8, 12, 12, 6);
    });

    // Portal — stone frame with purple void (64x80)
    mk('portal', 64, 80, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer glow
        c.fillStyle = 'rgba(155,89,182,0.2)';
        c.fillRect(0, 0, 64, 80);
        // Outer stone frame
        c.fillStyle = '#3a3a4a';
        c.fillRect(4, 4, 56, 72);
        c.fillStyle = '#4a4a5a';
        c.fillRect(6, 6, 52, 68);
        c.fillStyle = '#2a2a3a';
        c.fillRect(8, 8, 48, 64);
        // Stone details
        c.fillStyle = '#5a5a6a';
        c.fillRect(8, 8, 48, 6);
        c.fillRect(8, 66, 48, 6);
        c.fillRect(8, 8, 6, 64);
        c.fillRect(50, 8, 6, 64);
        // Stone highlights
        c.fillStyle = '#6a6a7a';
        c.fillRect(10, 10, 44, 2);
        c.fillRect(10, 68, 44, 2);
        c.fillRect(10, 10, 2, 60);
        c.fillRect(52, 10, 2, 60);
        // Purple void (concentric)
        c.fillStyle = '#0a0020';
        c.fillRect(14, 14, 36, 52);
        c.fillStyle = '#1a0035';
        c.fillRect(16, 16, 32, 48);
        c.fillStyle = '#2a0050';
        c.fillRect(18, 18, 28, 44);
        c.fillStyle = '#3a0068';
        c.fillRect(20, 20, 24, 40);
        c.fillStyle = '#4a1080';
        c.fillRect(22, 22, 20, 36);
        c.fillStyle = '#5a2098';
        c.fillRect(24, 24, 16, 32);
        c.fillStyle = '#6a30b0';
        c.fillRect(26, 26, 12, 28);
        c.fillStyle = '#7a40c8';
        c.fillRect(28, 28, 8, 24);
        c.fillStyle = '#8a50e0';
        c.fillRect(30, 30, 4, 20);
        // Glowing center
        c.fillStyle = 'rgba(155,89,182,0.5)';
        c.fillRect(26, 32, 12, 16);
        c.fillStyle = 'rgba(186,104,204,0.4)';
        c.fillRect(24, 30, 16, 20);
        c.fillStyle = 'rgba(220,130,255,0.3)';
        c.fillRect(28, 34, 8, 12);
        // Magical runes on frame
        c.fillStyle = '#9b59b6';
        c.fillRect(10, 10, 4, 4);
        c.fillRect(50, 10, 4, 4);
        c.fillRect(10, 66, 4, 4);
        c.fillRect(50, 66, 4, 4);
        c.fillStyle = '#aa66cc';
        c.fillRect(30, 10, 4, 4);
        c.fillRect(30, 66, 4, 4);
        c.fillRect(10, 38, 4, 4);
        c.fillRect(50, 38, 4, 4);
        // Rune glow
        c.fillStyle = 'rgba(155,89,182,0.6)';
        c.fillRect(11, 11, 2, 2);
        c.fillRect(51, 11, 2, 2);
        c.fillRect(11, 67, 2, 2);
        c.fillRect(51, 67, 2, 2);
        // Energy particles
        c.fillStyle = '#bb77dd';
        c.fillRect(30, 20, 2, 2);
        c.fillRect(32, 58, 2, 2);
        c.fillRect(20, 40, 2, 2);
        c.fillRect(44, 40, 2, 2);
        c.fillStyle = '#cc88ee';
        c.fillRect(31, 26, 1, 1);
        c.fillRect(33, 52, 1, 1);
        c.fillRect(22, 38, 1, 1);
        c.fillRect(42, 38, 1, 1);
        c.fillStyle = '#ddaaff';
        c.fillRect(30, 36, 2, 2);
        c.fillRect(34, 42, 2, 2);
        c.fillRect(28, 32, 1, 1);
    });

    // Swamp ground — murky water, mud, lily pads (800x200)
    mk('swamp_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Dark murky water base
        c.fillStyle = '#1a2e1a';
        c.fillRect(0, 0, 800, 200);
        // Water ripples
        c.fillStyle = '#1e3820';
        for (let i = 0; i < 300; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
        c.fillStyle = '#162e18';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        // Mud patches
        c.fillStyle = '#3d2b1a';
        c.fillRect(50, 40, 80, 30);
        c.fillRect(300, 100, 60, 25);
        c.fillRect(550, 60, 70, 35);
        c.fillRect(700, 150, 50, 20);
        c.fillStyle = '#4a3520';
        c.fillRect(55, 45, 70, 20);
        c.fillRect(305, 105, 50, 15);
        c.fillRect(555, 65, 60, 25);
        c.fillRect(705, 155, 40, 12);
        // Lily pads
        c.fillStyle = '#2e7d32';
        c.fillRect(120, 80, 10, 6);
        c.fillRect(118, 78, 14, 10);
        c.fillStyle = '#388e3c';
        c.fillRect(121, 79, 6, 4);
        c.fillStyle = '#2e7d32';
        c.fillRect(400, 30, 8, 5);
        c.fillRect(398, 28, 12, 9);
        c.fillStyle = '#388e3c';
        c.fillRect(401, 29, 4, 3);
        c.fillStyle = '#2e7d32';
        c.fillRect(650, 120, 12, 7);
        c.fillRect(648, 118, 16, 11);
        c.fillStyle = '#388e3c';
        c.fillRect(651, 119, 8, 5);
        // Cattails
        c.fillStyle = '#5d4037';
        c.fillRect(200, 20, 2, 60);
        c.fillRect(200, 20, 4, 10);
        c.fillStyle = '#6d4c41';
        c.fillRect(201, 22, 2, 8);
        c.fillStyle = '#4e342e';
        c.fillRect(500, 40, 2, 50);
        c.fillRect(500, 40, 4, 10);
        c.fillStyle = '#5d4037';
        c.fillRect(501, 42, 2, 8);
        // Toxic bubbles
        c.fillStyle = 'rgba(100,180,60,0.3)';
        c.beginPath();
        c.ellipse(180, 140, 8, 6, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(520, 90, 6, 4, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(700, 50, 5, 5, 0, 0, Math.PI * 2);
        c.fill();
        // Subtle glow
        c.fillStyle = 'rgba(80,160,50,0.05)';
        c.beginPath();
        c.ellipse(300, 100, 60, 30, 0, 0, Math.PI * 2);
        c.fill();
    });

    // Poison forest ground — sickly green/brown, mushrooms, toxic (800x200)
    mk('poison_forest_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Sickly base
        c.fillStyle = '#2a3a1a';
        c.fillRect(0, 0, 800, 200);
        // Dead leaves
        c.fillStyle = '#4a5a2a';
        for (let i = 0; i < 250; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        c.fillStyle = '#3a4a1a';
        for (let i = 0; i < 150; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 2);
        }
        // Brown patches (decay)
        c.fillStyle = '#3a2a1a';
        c.fillRect(80, 50, 50, 40);
        c.fillRect(350, 120, 70, 30);
        c.fillRect(600, 80, 55, 35);
        c.fillStyle = '#4a3520';
        c.fillRect(85, 55, 40, 30);
        c.fillRect(355, 125, 60, 20);
        c.fillRect(605, 85, 45, 25);
        // Mushrooms (toxic red)
        c.fillStyle = '#c0392b';
        c.fillRect(150, 70, 6, 4);
        c.fillRect(148, 68, 10, 4);
        c.fillStyle = '#e74c3c';
        c.fillRect(150, 66, 6, 4);
        c.fillRect(148, 65, 10, 3);
        c.fillStyle = '#fff';
        c.fillRect(151, 67, 2, 1);
        c.fillRect(154, 66, 2, 1);
        c.fillStyle = '#8b4513';
        c.fillRect(152, 72, 2, 4);
        c.fillStyle = '#c0392b';
        c.fillRect(450, 40, 8, 5);
        c.fillRect(448, 38, 12, 5);
        c.fillStyle = '#e74c3c';
        c.fillRect(450, 36, 8, 5);
        c.fillRect(448, 35, 12, 4);
        c.fillStyle = '#fff';
        c.fillRect(451, 37, 2, 1);
        c.fillRect(455, 36, 2, 1);
        c.fillStyle = '#8b4513';
        c.fillRect(452, 43, 2, 5);
        c.fillStyle = '#c0392b';
        c.fillRect(680, 130, 5, 3);
        c.fillRect(678, 128, 9, 4);
        c.fillStyle = '#e74c3c';
        c.fillRect(680, 127, 5, 3);
        c.fillStyle = '#8b4513';
        c.fillRect(681, 131, 2, 3);
        // Toxic puddles
        c.fillStyle = 'rgba(120,180,40,0.25)';
        c.beginPath();
        c.ellipse(250, 140, 25, 10, 0.2, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(550, 160, 20, 8, 0, 0, Math.PI * 2);
        c.fill();
        // Spore particles
        c.fillStyle = 'rgba(160,200,60,0.15)';
        for (let i = 0; i < 30; i++) {
            c.beginPath();
            c.ellipse(Math.random() * 800, Math.random() * 200, 2, 2, 0, 0, Math.PI * 2);
            c.fill();
        }
    });

    // Dead field ground — cracked earth, dead grass, bones (800x200)
    mk('dead_field_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Dry cracked earth
        c.fillStyle = '#5a4a3a';
        c.fillRect(0, 0, 800, 200);
        // Cracks
        c.fillStyle = '#3a2a1a';
        c.fillRect(100, 40, 80, 1);
        c.fillRect(110, 41, 40, 1);
        c.fillRect(300, 100, 100, 1);
        c.fillRect(310, 101, 50, 1);
        c.fillRect(500, 60, 70, 1);
        c.fillRect(510, 61, 35, 1);
        c.fillRect(650, 140, 90, 1);
        c.fillRect(660, 141, 45, 1);
        // Diagonal cracks
        c.fillRect(200, 80, 2, 2);
        c.fillRect(202, 82, 2, 2);
        c.fillRect(204, 84, 2, 2);
        c.fillRect(400, 30, 2, 2);
        c.fillRect(402, 32, 2, 2);
        c.fillRect(404, 34, 2, 2);
        c.fillRect(600, 160, 2, 2);
        c.fillRect(602, 162, 2, 2);
        c.fillRect(604, 164, 2, 2);
        // Dead grass tufts
        c.fillStyle = '#7a6a3a';
        c.fillRect(60, 60, 2, 8);
        c.fillRect(63, 58, 2, 10);
        c.fillRect(66, 62, 2, 6);
        c.fillStyle = '#8a7a4a';
        c.fillRect(250, 140, 2, 8);
        c.fillRect(253, 138, 2, 10);
        c.fillRect(256, 142, 2, 6);
        c.fillStyle = '#7a6a3a';
        c.fillRect(480, 90, 2, 8);
        c.fillRect(483, 88, 2, 10);
        c.fillRect(486, 92, 2, 6);
        c.fillStyle = '#8a7a4a';
        c.fillRect(720, 110, 2, 8);
        c.fillRect(723, 108, 2, 10);
        c.fillRect(726, 112, 2, 6);
        // Scattered bones
        c.fillStyle = '#d4c4a4';
        c.fillRect(160, 120, 6, 2);
        c.fillRect(158, 118, 2, 6);
        c.fillRect(164, 118, 2, 6);
        c.fillStyle = '#c4b494';
        c.fillRect(420, 160, 8, 2);
        c.fillRect(418, 158, 2, 6);
        c.fillRect(426, 158, 2, 6);
        // Dust particles
        c.fillStyle = 'rgba(100,80,60,0.15)';
        for (let i = 0; i < 40; i++) {
            c.beginPath();
            c.ellipse(Math.random() * 800, Math.random() * 200, 3, 1, 0, 0, Math.PI * 2);
            c.fill();
        }
        // Heat haze
        c.fillStyle = 'rgba(120,100,80,0.08)';
        c.beginPath();
        c.ellipse(400, 50, 100, 20, 0, 0, Math.PI * 2);
        c.fill();
    });

    // Temple ground — stone tiles, moss, carvings (800x200)
    mk('temple_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Stone base
        c.fillStyle = '#4a4a5a';
        c.fillRect(0, 0, 800, 200);
        // Tile grid
        c.strokeStyle = '#3a3a4a';
        c.lineWidth = 1;
        const bw = 60, bh = 40;
        for (let row = 0; row < 6; row++) {
            const offset = (row % 2) * (bw / 2);
            for (let col = -1; col < 16; col++) {
                const x = col * bw + offset;
                const y = row * bh;
                c.fillStyle = row % 2 === 0 ? '#505060' : '#484858';
                c.fillRect(x + 1, y + 1, bw - 2, bh - 2);
                c.strokeRect(x, y, bw, bh);
            }
        }
        // Stone noise
        c.fillStyle = '#5a5a6a';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        // Moss patches
        c.fillStyle = 'rgba(60,100,50,0.3)';
        c.fillRect(100, 80, 40, 20);
        c.fillRect(350, 40, 30, 15);
        c.fillRect(600, 120, 35, 18);
        c.fillStyle = 'rgba(70,120,55,0.2)';
        c.fillRect(105, 82, 30, 14);
        c.fillRect(355, 42, 22, 10);
        c.fillRect(605, 122, 25, 12);
        // Ancient carvings (simple runes)
        c.fillStyle = '#5a5a6a';
        // Rune 1
        c.fillRect(180, 95, 2, 10);
        c.fillRect(176, 95, 10, 2);
        c.fillRect(180, 100, 2, 5);
        // Rune 2
        c.fillRect(450, 75, 2, 10);
        c.fillRect(446, 80, 10, 2);
        c.fillRect(450, 75, 2, 2);
        // Rune 3
        c.fillRect(680, 145, 2, 10);
        c.fillRect(676, 150, 10, 2);
        c.fillRect(680, 155, 2, 2);
        // Cracks in tiles
        c.fillStyle = '#3a3a4a';
        c.fillRect(250, 60, 30, 1);
        c.fillRect(550, 100, 25, 1);
        c.fillRect(750, 30, 20, 1);
    });

    // Heart ground — pulsing red/fleshy, veins, organic (800x200)
    mk('heart_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Fleshy base
        c.fillStyle = '#5a1a2a';
        c.fillRect(0, 0, 800, 200);
        // Tissue texture
        c.fillStyle = '#6a2a3a';
        for (let i = 0; i < 300; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 2);
        }
        c.fillStyle = '#4a0a1a';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 3);
        }
        // Veins (branching)
        c.fillStyle = '#8a2a3a';
        // Main vein 1
        c.fillRect(100, 50, 2, 60);
        c.fillRect(100, 50, 40, 2);
        c.fillRect(140, 50, 2, 20);
        c.fillRect(100, 90, 30, 2);
        c.fillRect(130, 90, 2, 15);
        // Main vein 2
        c.fillRect(400, 30, 2, 80);
        c.fillRect(400, 30, 50, 2);
        c.fillRect(450, 30, 2, 30);
        c.fillRect(400, 70, 40, 2);
        c.fillRect(440, 70, 2, 20);
        // Main vein 3
        c.fillRect(650, 80, 2, 70);
        c.fillRect(650, 80, 40, 2);
        c.fillRect(690, 80, 2, 25);
        c.fillRect(650, 120, 35, 2);
        c.fillRect(685, 120, 2, 15);
        // Smaller veins
        c.fillStyle = '#7a1a2a';
        c.fillRect(200, 100, 20, 1);
        c.fillRect(300, 60, 15, 1);
        c.fillRect(500, 140, 25, 1);
        c.fillRect(580, 50, 18, 1);
        c.fillRect(750, 100, 12, 1);
        // Pulsing glow spots
        c.fillStyle = 'rgba(180,40,60,0.2)';
        c.beginPath();
        c.ellipse(200, 100, 30, 15, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(500, 80, 25, 12, 0.3, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(700, 140, 35, 18, 0, 0, Math.PI * 2);
        c.fill();
        // Bright spots (arteries)
        c.fillStyle = 'rgba(220,60,80,0.15)';
        c.beginPath();
        c.ellipse(105, 70, 10, 8, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(405, 55, 12, 10, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(655, 105, 8, 6, 0, 0, Math.PI * 2);
        c.fill();
    });

    // Cursed ground — dark swamp with corrupted vegetation (800x200 tileable)
    mk('cursed_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Base dark swamp
        c.fillStyle = '#0a1a0a';
        c.fillRect(0, 0, 800, 200);
        // Swamp texture noise
        c.fillStyle = '#0e200e';
        for (let i = 0; i < 400; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        c.fillStyle = '#061206';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
        c.fillStyle = '#122612';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 1, 3);
        }
        // Swamp pools
        c.fillStyle = 'rgba(10,30,10,0.5)';
        c.beginPath();
        c.ellipse(180, 140, 40, 12, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(520, 60, 35, 10, 0.3, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(700, 160, 30, 8, 0, 0, Math.PI * 2);
        c.fill();
        // Corrupted vegetation (dead trees, thorns)
        c.fillStyle = '#1a3a1a';
        c.fillRect(100, 80, 4, 20);
        c.fillRect(98, 70, 8, 4);
        c.fillRect(96, 60, 4, 4);
        c.fillRect(104, 65, 4, 4);
        c.fillStyle = '#2a4a2a';
        c.fillRect(400, 100, 4, 16);
        c.fillRect(398, 92, 8, 4);
        c.fillRect(396, 84, 4, 4);
        c.fillRect(404, 88, 4, 4);
        c.fillStyle = '#1a3a1a';
        c.fillRect(650, 140, 4, 18);
        c.fillRect(648, 130, 8, 4);
        c.fillRect(646, 122, 4, 4);
        c.fillRect(654, 126, 4, 4);
        // Bones and skulls
        c.fillStyle = '#c8b898';
        c.fillRect(250, 50, 8, 2);
        c.fillRect(248, 48, 2, 6);
        c.fillRect(256, 48, 2, 6);
        c.fillRect(550, 170, 6, 2);
        c.fillRect(548, 168, 2, 6);
        c.fillRect(554, 168, 2, 6);
        // Skull
        c.fillStyle = '#d4c4a4';
        c.fillRect(320, 120, 10, 8);
        c.fillRect(318, 122, 14, 4);
        c.fillStyle = '#0a0a0f';
        c.fillRect(321, 123, 3, 3);
        c.fillRect(326, 123, 3, 3);
        c.fillRect(323, 127, 4, 2);
        // Purple corruption glow
        c.fillStyle = 'rgba(80,20,120,0.08)';
        c.beginPath();
        c.ellipse(300, 50, 50, 20, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(600, 160, 45, 18, 0.5, 0, Math.PI * 2);
        c.fill();
    });

    // Cursed chest — dark wood with purple runes (28x24)
    mk('cursed_chest', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        // Chest base (dark wood)
        c.fillStyle = '#2a1a2a';
        c.fillRect(2, 8, 24, 14);
        c.fillStyle = '#3a2a3a';
        c.fillRect(4, 10, 20, 10);
        // Lid (dark wood, slightly curved)
        c.fillStyle = '#2a1a2a';
        c.fillRect(0, 2, 28, 8);
        c.fillStyle = '#3a2a3a';
        c.fillRect(2, 3, 24, 6);
        c.fillStyle = '#4a3a4a';
        c.fillRect(4, 4, 20, 4);
        // Purple rune trim
        c.fillStyle = '#6a2a8a';
        c.fillRect(2, 8, 24, 2);
        c.fillRect(2, 18, 24, 2);
        // Rune glow
        c.fillStyle = '#9a4aba';
        c.fillRect(4, 8, 4, 1);
        c.fillRect(12, 8, 4, 1);
        c.fillRect(20, 8, 4, 1);
        c.fillRect(4, 19, 4, 1);
        c.fillRect(12, 19, 4, 1);
        c.fillRect(20, 19, 4, 1);
        // Dark clasp
        c.fillStyle = '#1a0a1a';
        c.fillRect(10, 8, 8, 4);
        c.fillRect(9, 9, 10, 2);
        c.fillStyle = '#cc22ff';
        c.fillRect(12, 9, 4, 1);
        c.fillStyle = '#aa1add';
        c.fillRect(13, 10, 2, 1);
        // Side details
        c.fillStyle = '#1a0a1a';
        c.fillRect(0, 4, 2, 10);
        c.fillRect(26, 4, 2, 10);
        c.fillRect(1, 6, 1, 6);
        c.fillRect(26, 6, 1, 6);
        // Bottom
        c.fillStyle = '#1a0a1a';
        c.fillRect(4, 22, 20, 2);
        // Dark interior hint
        c.fillStyle = '#0a000a';
        c.fillRect(6, 12, 16, 6);
        c.fillStyle = '#1a0a1a';
        c.fillRect(8, 14, 12, 4);
        // Cursed glow from inside
        c.fillStyle = 'rgba(150,30,200,0.25)';
        c.fillRect(10, 14, 8, 3);
        c.fillStyle = 'rgba(150,30,200,0.12)';
        c.fillRect(8, 12, 12, 6);
        // Purple mist
        c.fillStyle = 'rgba(100,20,160,0.15)';
        c.fillRect(6, 6, 16, 4);
        c.fillRect(8, 4, 12, 6);
    });

    // Shadow District ground — distorted mirror, dark reflections (800x200)
    mk('shadow_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Dark mirror base
        c.fillStyle = '#0a0a14';
        c.fillRect(0, 0, 800, 200);
        // Mirror shards / reflective fragments
        c.fillStyle = '#12121e';
        for (let i = 0; i < 300; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
        c.fillStyle = '#1a1a28';
        for (let i = 0; i < 150; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 1, 3);
        }
        // Cracked mirror patterns
        c.fillStyle = '#222236';
        c.fillRect(100, 40, 60, 1);
        c.fillRect(105, 42, 30, 1);
        c.fillRect(102, 44, 45, 1);
        c.fillRect(300, 100, 80, 1);
        c.fillRect(305, 102, 40, 1);
        c.fillRect(303, 104, 55, 1);
        c.fillRect(550, 60, 70, 1);
        c.fillRect(555, 62, 35, 1);
        c.fillRect(553, 64, 50, 1);
        c.fillRect(700, 150, 50, 1);
        c.fillRect(705, 152, 25, 1);
        // Diagonal cracks (mirror breaks)
        c.fillRect(200, 70, 1, 2);
        c.fillRect(202, 72, 1, 2);
        c.fillRect(204, 74, 1, 2);
        c.fillRect(206, 76, 1, 2);
        c.fillRect(450, 30, 1, 2);
        c.fillRect(452, 32, 1, 2);
        c.fillRect(454, 34, 1, 2);
        c.fillRect(456, 36, 1, 2);
        c.fillRect(650, 130, 1, 2);
        c.fillRect(652, 132, 1, 2);
        c.fillRect(654, 134, 1, 2);
        c.fillRect(656, 136, 1, 2);
        // Distorted reflection shards (bright highlights)
        c.fillStyle = 'rgba(40,40,80,0.3)';
        c.fillRect(150, 80, 20, 8);
        c.fillRect(152, 82, 16, 4);
        c.fillStyle = 'rgba(50,50,100,0.25)';
        c.fillRect(400, 50, 25, 10);
        c.fillRect(402, 52, 20, 6);
        c.fillStyle = 'rgba(45,45,90,0.28)';
        c.fillRect(600, 120, 22, 9);
        c.fillRect(602, 122, 18, 5);
        // Glitch streaks (horizontal distortion)
        c.fillStyle = 'rgba(80,20,120,0.15)';
        c.fillRect(0, 45, 800, 1);
        c.fillRect(0, 95, 800, 1);
        c.fillRect(0, 145, 800, 1);
        c.fillStyle = 'rgba(20,60,100,0.1)';
        c.fillRect(0, 65, 800, 1);
        c.fillRect(0, 115, 800, 1);
        c.fillRect(0, 165, 800, 1);
        // Shadow void pools
        c.fillStyle = 'rgba(5,5,15,0.5)';
        c.beginPath();
        c.ellipse(180, 120, 30, 10, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(520, 80, 25, 8, 0.3, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(700, 160, 20, 7, 0, 0, Math.PI * 2);
        c.fill();
        // Subtle purple/void glow
        c.fillStyle = 'rgba(60,20,100,0.06)';
        c.beginPath();
        c.ellipse(300, 60, 60, 25, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(30,30,80,0.08)';
        c.beginPath();
        c.ellipse(600, 140, 50, 20, 0.4, 0, Math.PI * 2);
        c.fill();
    });

    // Shadow chest — obsidian with void energy (28x24)
    mk('shadow_chest', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        // Chest base (obsidian)
        c.fillStyle = '#0a0a14';
        c.fillRect(2, 8, 24, 14);
        c.fillStyle = '#12121e';
        c.fillRect(4, 10, 20, 10);
        // Lid (obsidian, cracked)
        c.fillStyle = '#0a0a14';
        c.fillRect(0, 2, 28, 8);
        c.fillStyle = '#12121e';
        c.fillRect(2, 3, 24, 6);
        c.fillStyle = '#1a1a28';
        c.fillRect(4, 4, 20, 4);
        // Void energy trim
        c.fillStyle = '#2a1a4a';
        c.fillRect(2, 8, 24, 2);
        c.fillRect(2, 18, 24, 2);
        // Energy pulse
        c.fillStyle = '#4a2a8a';
        c.fillRect(4, 8, 4, 1);
        c.fillRect(12, 8, 4, 1);
        c.fillRect(20, 8, 4, 1);
        c.fillRect(4, 19, 4, 1);
        c.fillRect(12, 19, 4, 1);
        c.fillRect(20, 19, 4, 1);
        // Mirror clasp
        c.fillStyle = '#0a0a14';
        c.fillRect(10, 8, 8, 4);
        c.fillRect(9, 9, 10, 2);
        c.fillStyle = '#6644aa';
        c.fillRect(12, 9, 4, 1);
        c.fillStyle = '#8866cc';
        c.fillRect(13, 10, 2, 1);
        // Side details
        c.fillStyle = '#0a0a14';
        c.fillRect(0, 4, 2, 10);
        c.fillRect(26, 4, 2, 10);
        // Interior darkness
        c.fillStyle = '#050508';
        c.fillRect(6, 12, 16, 6);
        c.fillStyle = '#0a0a14';
        c.fillRect(8, 14, 12, 4);
        // Void glow from inside
        c.fillStyle = 'rgba(60,30,120,0.25)';
        c.fillRect(10, 14, 8, 3);
        c.fillStyle = 'rgba(60,30,120,0.12)';
        c.fillRect(8, 12, 12, 6);
        // Mirror reflection hint
        c.fillStyle = 'rgba(80,80,140,0.1)';
        c.fillRect(6, 5, 16, 2);
    });

    // Tower ground — stone walls, torches, banners (800x200)
    mk('tower_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // Dark stone base
        c.fillStyle = '#2a2a30';
        c.fillRect(0, 0, 800, 200);
        // Stone blocks pattern
        c.fillStyle = '#33333a';
        const bw = 50, bh = 30;
        for (let row = 0; row < 8; row++) {
            const offset = (row % 2) * (bw / 2);
            for (let col = -1; col < 18; col++) {
                const x = col * bw + offset;
                const y = row * bh;
                c.fillStyle = row % 3 === 0 ? '#38383f' : row % 3 === 1 ? '#30303a' : '#2c2c34';
                c.fillRect(x + 1, y + 1, bw - 2, bh - 2);
                c.fillStyle = '#22222a';
                c.fillRect(x, y, bw, 1);
                c.fillRect(x, y, 1, bh);
            }
        }
        // Stone noise
        c.fillStyle = '#3a3a42';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        c.fillStyle = '#252530';
        for (let i = 0; i < 150; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
        // Cracks
        c.fillStyle = '#1a1a22';
        c.fillRect(100, 50, 40, 1);
        c.fillRect(105, 52, 20, 1);
        c.fillRect(300, 100, 50, 1);
        c.fillRect(310, 101, 25, 1);
        c.fillRect(500, 70, 35, 1);
        c.fillRect(650, 140, 45, 1);
        // Torches
        c.fillStyle = '#8b4513';
        c.fillRect(150, 30, 3, 12);
        c.fillRect(150, 30, 5, 4);
        c.fillStyle = '#ff6600';
        c.fillRect(151, 26, 3, 5);
        c.fillStyle = '#ffaa00';
        c.fillRect(152, 27, 1, 3);
        c.fillStyle = 'rgba(255,100,0,0.15)';
        c.beginPath();
        c.arc(152, 30, 20, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#8b4513';
        c.fillRect(400, 40, 3, 12);
        c.fillRect(400, 40, 5, 4);
        c.fillStyle = '#ff6600';
        c.fillRect(401, 36, 3, 5);
        c.fillStyle = '#ffaa00';
        c.fillRect(402, 37, 1, 3);
        c.fillStyle = 'rgba(255,100,0,0.15)';
        c.beginPath();
        c.arc(402, 40, 20, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#8b4513';
        c.fillRect(650, 35, 3, 12);
        c.fillRect(650, 35, 5, 4);
        c.fillStyle = '#ff6600';
        c.fillRect(651, 31, 3, 5);
        c.fillStyle = '#ffaa00';
        c.fillRect(652, 32, 1, 3);
        c.fillStyle = 'rgba(255,100,0,0.15)';
        c.beginPath();
        c.arc(652, 35, 20, 0, Math.PI * 2);
        c.fill();
        // Banners
        c.fillStyle = '#8b0000';
        c.fillRect(250, 20, 12, 30);
        c.fillRect(248, 20, 16, 6);
        c.fillStyle = '#a00000';
        c.fillRect(251, 22, 10, 26);
        c.fillStyle = '#660000';
        c.fillRect(252, 44, 8, 6);
        c.fillRect(254, 48, 4, 2);
        c.fillStyle = '#ccaa00';
        c.fillRect(253, 28, 6, 2);
        c.fillRect(255, 26, 2, 6);
        c.fillStyle = '#1a3366';
        c.fillRect(550, 25, 12, 28);
        c.fillRect(548, 25, 16, 6);
        c.fillStyle = '#224488';
        c.fillRect(551, 27, 10, 24);
        c.fillStyle = '#112244';
        c.fillRect(552, 49, 8, 4);
        c.fillRect(554, 51, 4, 2);
        c.fillStyle = '#88aacc';
        c.fillRect(553, 32, 6, 2);
        c.fillRect(555, 30, 2, 6);
        // Moss patches
        c.fillStyle = 'rgba(40,60,30,0.2)';
        c.fillRect(100, 150, 30, 10);
        c.fillRect(350, 80, 25, 8);
        c.fillRect(600, 160, 35, 12);
        // Dust particles
        c.fillStyle = 'rgba(80,70,60,0.1)';
        for (let i = 0; i < 30; i++) {
            c.beginPath();
            c.ellipse(Math.random() * 800, Math.random() * 200, 2, 1, 0, 0, Math.PI * 2);
            c.fill();
        }
        // Warm torch ambient
        c.fillStyle = 'rgba(255,120,0,0.03)';
        c.beginPath();
        c.ellipse(152, 100, 80, 40, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(402, 100, 80, 40, 0, 0, Math.PI * 2);
        c.fill();
    });

    // Tower chest — iron-bound wood (28x24)
    mk('tower_chest', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#3a2a1a';
        c.fillRect(2, 8, 24, 14);
        c.fillStyle = '#4a3a2a';
        c.fillRect(4, 10, 20, 10);
        c.fillStyle = '#3a2a1a';
        c.fillRect(0, 2, 28, 8);
        c.fillStyle = '#4a3a2a';
        c.fillRect(2, 3, 24, 6);
        c.fillStyle = '#5a4a3a';
        c.fillRect(4, 4, 20, 4);
        c.fillStyle = '#5a5a6a';
        c.fillRect(2, 8, 24, 2);
        c.fillRect(2, 18, 24, 2);
        c.fillStyle = '#7a7a8a';
        c.fillRect(4, 8, 2, 2);
        c.fillRect(12, 8, 2, 2);
        c.fillRect(22, 8, 2, 2);
        c.fillRect(4, 18, 2, 2);
        c.fillRect(12, 18, 2, 2);
        c.fillRect(22, 18, 2, 2);
        c.fillStyle = '#3a3a4a';
        c.fillRect(10, 8, 8, 4);
        c.fillRect(9, 9, 10, 2);
        c.fillStyle = '#5a5a6a';
        c.fillRect(12, 9, 4, 1);
        c.fillStyle = '#2a1a0a';
        c.fillRect(6, 12, 16, 1);
        c.fillRect(6, 15, 16, 1);
        c.fillRect(6, 18, 16, 1);
        c.fillStyle = '#5a5a6a';
        c.fillRect(12, 2, 4, 2);
        c.fillStyle = '#2a1a0a';
        c.fillRect(4, 22, 20, 2);
    });

    // Throne ground — golden throne, marble columns (800x200)
    mk('throne_ground', 800, 200, (c) => {
        c.imageSmoothingEnabled = false;
        // White marble base
        c.fillStyle = '#e8e0d4';
        c.fillRect(0, 0, 800, 200);
        // Marble tile pattern
        c.fillStyle = '#ddd5c8';
        const bw = 80, bh = 50;
        for (let row = 0; row < 5; row++) {
            const offset = (row % 2) * (bw / 2);
            for (let col = -1; col < 12; col++) {
                const x = col * bw + offset;
                const y = row * bh;
                c.fillStyle = row % 2 === 0 ? '#e0d8cc' : '#d8d0c4';
                c.fillRect(x + 1, y + 1, bw - 2, bh - 2);
                c.fillStyle = '#ccc4b8';
                c.fillRect(x, y, bw, 1);
                c.fillRect(x, y, 1, bh);
            }
        }
        // Marble veins
        c.fillStyle = '#c8c0b4';
        c.fillRect(100, 30, 60, 1);
        c.fillRect(120, 32, 30, 1);
        c.fillRect(300, 80, 80, 1);
        c.fillRect(330, 82, 40, 1);
        c.fillRect(500, 50, 70, 1);
        c.fillRect(520, 52, 35, 1);
        c.fillRect(650, 120, 50, 1);
        // Golden trim line
        c.fillStyle = '#d4ac0d';
        c.fillRect(0, 0, 800, 2);
        c.fillRect(0, 198, 800, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(0, 0, 800, 1);
        c.fillRect(0, 199, 800, 1);
        // Columns (white marble with gold)
        c.fillStyle = '#d5cfc4';
        c.fillRect(150, 0, 20, 200);
        c.fillRect(152, 0, 16, 200);
        c.fillStyle = '#e8e0d4';
        c.fillRect(154, 0, 12, 200);
        c.fillStyle = '#f1c40f';
        c.fillRect(148, 0, 24, 6);
        c.fillRect(148, 194, 24, 6);
        c.fillStyle = '#d4ac0d';
        c.fillRect(150, 0, 20, 4);
        c.fillRect(150, 196, 20, 4);
        // Another column
        c.fillStyle = '#d5cfc4';
        c.fillRect(400, 0, 20, 200);
        c.fillRect(402, 0, 16, 200);
        c.fillStyle = '#e8e0d4';
        c.fillRect(404, 0, 12, 200);
        c.fillStyle = '#f1c40f';
        c.fillRect(398, 0, 24, 6);
        c.fillRect(398, 194, 24, 6);
        c.fillStyle = '#d4ac0d';
        c.fillRect(400, 0, 20, 4);
        c.fillRect(400, 196, 20, 4);
        // Column 3
        c.fillStyle = '#d5cfc4';
        c.fillRect(650, 0, 20, 200);
        c.fillRect(652, 0, 16, 200);
        c.fillStyle = '#e8e0d4';
        c.fillRect(654, 0, 12, 200);
        c.fillStyle = '#f1c40f';
        c.fillRect(648, 0, 24, 6);
        c.fillRect(648, 194, 24, 6);
        c.fillStyle = '#d4ac0d';
        c.fillRect(650, 0, 20, 4);
        c.fillRect(650, 196, 20, 4);
        // Window light beams
        c.fillStyle = 'rgba(255,240,200,0.08)';
        c.fillRect(200, 0, 60, 200);
        c.fillRect(450, 0, 60, 200);
        c.fillRect(700, 0, 50, 200);
        // Golden carpet runner
        c.fillStyle = 'rgba(180,140,0,0.15)';
        c.fillRect(350, 0, 100, 200);
        c.fillStyle = 'rgba(200,160,0,0.1)';
        c.fillRect(360, 0, 80, 200);
        // Marble dust particles
        c.fillStyle = 'rgba(200,190,170,0.15)';
        for (let i = 0; i < 30; i++) {
            c.beginPath();
            c.ellipse(Math.random() * 800, Math.random() * 200, 2, 1, 0, 0, Math.PI * 2);
            c.fill();
        }
        // Warm ambient glow
        c.fillStyle = 'rgba(255,220,150,0.04)';
        c.beginPath();
        c.ellipse(400, 100, 200, 80, 0, 0, Math.PI * 2);
        c.fill();
    });

    // Throne chest — ornate gold (28x24)
    mk('throne_chest', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d4ac0d';
        c.fillRect(2, 8, 24, 14);
        c.fillStyle = '#f1c40f';
        c.fillRect(4, 10, 20, 10);
        c.fillStyle = '#d4ac0d';
        c.fillRect(0, 2, 28, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(2, 3, 24, 6);
        c.fillStyle = '#f9e547';
        c.fillRect(4, 4, 20, 4);
        c.fillStyle = '#b8960d';
        c.fillRect(2, 8, 24, 2);
        c.fillRect(2, 18, 24, 2);
        c.fillStyle = '#d4ac0d';
        c.fillRect(4, 18, 2, 2);
        c.fillRect(12, 18, 2, 2);
        c.fillRect(22, 18, 2, 2);
        c.fillRect(4, 8, 2, 2);
        c.fillRect(12, 8, 2, 2);
        c.fillRect(22, 8, 2, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(12, 9, 4, 3);
        c.fillStyle = '#e74c3c';
        c.fillRect(13, 10, 2, 1);
        c.fillStyle = '#8b6914';
        c.fillRect(6, 12, 16, 1);
        c.fillRect(6, 15, 16, 1);
        c.fillRect(6, 18, 16, 1);
        c.fillStyle = '#b8960d';
        c.fillRect(4, 22, 20, 2);
    });
}
