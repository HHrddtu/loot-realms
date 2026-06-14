export function drawBossTextures(mk) {
    mk('treant_boss', 64, 80, (c) => {
        c.imageSmoothingEnabled = false;
        // Roots / legs
        c.fillStyle = '#3d2b1f';
        c.fillRect(8, 68, 8, 12);
        c.fillRect(48, 68, 8, 12);
        c.fillRect(20, 70, 8, 10);
        c.fillRect(36, 70, 8, 10);
        c.fillStyle = '#2c1e14';
        c.fillRect(6, 76, 12, 4);
        c.fillRect(46, 76, 12, 4);
        c.fillRect(18, 78, 12, 2);
        c.fillRect(34, 78, 12, 2);
        // Trunk / body
        c.fillStyle = '#5c3a1e';
        c.fillRect(18, 28, 28, 42);
        c.fillStyle = '#4a2e16';
        c.fillRect(20, 30, 24, 38);
        c.fillStyle = '#6b4423';
        c.fillRect(22, 35, 4, 8);
        c.fillRect(38, 40, 4, 6);
        c.fillRect(24, 50, 3, 5);
        // Arms (branches)
        c.fillStyle = '#5c3a1e';
        c.fillRect(2, 38, 16, 6);
        c.fillRect(46, 38, 16, 6);
        c.fillStyle = '#4a2e16';
        c.fillRect(0, 40, 6, 4);
        c.fillRect(58, 40, 6, 4);
        c.fillRect(6, 34, 4, 6);
        c.fillRect(54, 34, 4, 6);
        // Hands / claws
        c.fillStyle = '#3d2b1f';
        c.fillRect(0, 36, 4, 6);
        c.fillRect(60, 36, 4, 6);
        c.fillRect(4, 32, 4, 4);
        c.fillRect(56, 32, 4, 4);
        // Crown (foliage)
        c.fillStyle = '#1a5c2a';
        c.fillRect(12, 4, 40, 26);
        c.fillStyle = '#1e6b31';
        c.fillRect(14, 2, 36, 22);
        c.fillStyle = '#155723';
        c.fillRect(8, 8, 12, 14);
        c.fillRect(44, 8, 12, 14);
        c.fillStyle = '#0f4a1c';
        c.fillRect(10, 0, 8, 10);
        c.fillRect(46, 0, 8, 10);
        c.fillRect(26, 0, 12, 6);
        // Eyes (glowing red)
        c.fillStyle = '#ff2222';
        c.fillRect(22, 18, 6, 4);
        c.fillRect(36, 18, 6, 4);
        c.fillStyle = '#ff6644';
        c.fillRect(23, 19, 2, 2);
        c.fillRect(37, 19, 2, 2);
        // Mouth
        c.fillStyle = '#1a0a00';
        c.fillRect(26, 24, 12, 3);
        c.fillStyle = '#ff2222';
        c.fillRect(28, 24, 2, 2);
        c.fillRect(34, 24, 2, 2);
    });

    mk('tree_hole', 64, 80, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer trunk
        c.fillStyle = '#5c3a1e';
        c.fillRect(0, 0, 64, 80);
        c.fillStyle = '#4a2e16';
        c.fillRect(4, 0, 56, 80);
        // Bark lines
        c.fillStyle = '#6b4423';
        c.fillRect(8, 5, 3, 12);
        c.fillRect(50, 10, 3, 8);
        c.fillRect(10, 30, 2, 10);
        c.fillRect(52, 40, 2, 12);
        c.fillRect(14, 55, 3, 8);
        c.fillRect(46, 60, 3, 10);
        // Foliage top
        c.fillStyle = '#1a5c2a';
        c.fillRect(0, 0, 64, 16);
        c.fillStyle = '#1e6b31';
        c.fillRect(4, 0, 56, 10);
        c.fillStyle = '#155723';
        c.fillRect(10, 0, 44, 6);
        // The hole (dark)
        c.fillStyle = '#0a0500';
        c.fillRect(18, 28, 28, 36);
        c.fillStyle = '#120a02';
        c.fillRect(20, 30, 24, 32);
        // Inner glow hint
        c.fillStyle = '#1a0e05';
        c.fillRect(22, 34, 20, 24);
        // Roots at base
        c.fillStyle = '#3d2b1f';
        c.fillRect(4, 72, 12, 8);
        c.fillRect(48, 72, 12, 8);
        c.fillRect(22, 74, 8, 6);
        c.fillRect(34, 74, 8, 6);
    });

    mk('boss_ground', 800, 600, (c) => {
        c.fillStyle = '#0d0d1a';
        c.fillRect(0, 0, 800, 600);
        c.fillStyle = '#111122';
        for (let i = 0; i < 300; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 600, 2, 2);
        }
        c.fillStyle = '#0a0a15';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 600, 3, 1);
        }
        c.fillStyle = '#151530';
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 800, y = Math.random() * 600;
            c.fillRect(x, y, 6, 3);
        }
        // Fog wisps
        c.fillStyle = 'rgba(80,80,120,0.08)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 800, y = Math.random() * 600;
            c.beginPath();
            c.ellipse(x, y, 30 + Math.random() * 40, 8 + Math.random() * 10, 0, 0, Math.PI * 2);
            c.fill();
        }
    });

    mk('boss_aoe', 128, 128, (c) => {
        c.strokeStyle = 'rgba(180,60,20,0.8)';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(64, 64, 50, 0, Math.PI * 2);
        c.stroke();
        c.strokeStyle = 'rgba(255,80,30,0.5)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(64, 64, 35, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = 'rgba(180,40,10,0.1)';
        c.beginPath();
        c.arc(64, 64, 50, 0, Math.PI * 2);
        c.fill();
    });

    mk('boss_portal', 64, 80, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#3d2b1f';
        c.fillRect(0, 0, 64, 80);
        c.fillStyle = '#2c1e14';
        c.fillRect(4, 0, 56, 80);
        c.fillStyle = '#4a2e16';
        c.fillRect(8, 0, 48, 10);
        c.fillStyle = '#1a5c2a';
        c.fillRect(0, 0, 64, 8);
        c.fillStyle = '#1e6b31';
        c.fillRect(4, 0, 56, 4);
        c.fillStyle = '#3a1050';
        c.fillRect(18, 28, 28, 36);
        c.fillStyle = '#5a2080';
        c.fillRect(20, 30, 24, 32);
        c.fillStyle = '#7a30aa';
        c.fillRect(24, 36, 16, 20);
        c.fillStyle = '#aa50ee';
        c.fillRect(28, 40, 8, 12);
        c.fillStyle = '#3d2b1f';
        c.fillRect(4, 72, 12, 8);
        c.fillRect(48, 72, 12, 8);
    });

    // Bandit Leader boss
    mk('bandit_leader', 50, 64, (c) => {
        c.imageSmoothingEnabled = false;
        // Head (scarred, bandana)
        c.fillStyle = '#8b6914';
        c.fillRect(18, 0, 14, 10);
        c.fillStyle = '#c0392b';
        c.fillRect(17, 2, 16, 4);
        c.fillStyle = '#e74c3c';
        c.fillRect(18, 1, 14, 2);
        // Eyes (angry)
        c.fillStyle = '#fff';
        c.fillRect(20, 5, 3, 3);
        c.fillRect(27, 5, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(21, 6, 1, 1);
        c.fillRect(28, 6, 1, 1);
        c.fillStyle = '#c0392b';
        c.fillRect(20, 4, 3, 1);
        c.fillRect(27, 4, 3, 1);
        // Scar
        c.fillStyle = '#a0522d';
        c.fillRect(24, 3, 2, 6);
        // Mouth
        c.fillStyle = '#000';
        c.fillRect(22, 9, 6, 1);
        // Body (heavy leather + chain)
        c.fillStyle = '#4a2d10';
        c.fillRect(12, 10, 26, 18);
        c.fillStyle = '#5a3d1a';
        c.fillRect(14, 10, 22, 18);
        // Chain mail
        c.fillStyle = '#7f8c8d';
        c.fillRect(16, 12, 18, 2);
        c.fillRect(16, 16, 18, 2);
        c.fillRect(16, 20, 18, 2);
        // Belt
        c.fillStyle = '#2c1e14';
        c.fillRect(12, 24, 26, 3);
        c.fillStyle = '#f1c40f';
        c.fillRect(23, 24, 4, 3);
        // Arms (muscular)
        c.fillStyle = '#8b6914';
        c.fillRect(4, 12, 8, 10);
        c.fillRect(38, 12, 8, 10);
        c.fillStyle = '#a07828';
        c.fillRect(6, 14, 4, 6);
        c.fillRect(40, 14, 4, 6);
        // Machete (right hand - big!)
        c.fillStyle = '#95a5a6';
        c.fillRect(42, 2, 3, 16);
        c.fillStyle = '#bdc3c7';
        c.fillRect(43, 0, 2, 6);
        c.fillStyle = '#7f8c8d';
        c.fillRect(41, 16, 6, 3);
        c.fillStyle = '#8b4513';
        c.fillRect(40, 18, 8, 3);
        // Left hand (fist)
        c.fillStyle = '#8b6914';
        c.fillRect(2, 18, 6, 4);
        // Legs
        c.fillStyle = '#3d2b1f';
        c.fillRect(14, 28, 8, 18);
        c.fillRect(28, 28, 8, 18);
        c.fillStyle = '#4a2d10';
        c.fillRect(16, 28, 4, 16);
        c.fillRect(30, 28, 4, 16);
        // Boots (heavy)
        c.fillStyle = '#2c1e14';
        c.fillRect(12, 42, 12, 8);
        c.fillRect(26, 42, 12, 8);
        c.fillStyle = '#1a1408';
        c.fillRect(12, 46, 12, 4);
        c.fillRect(26, 46, 12, 4);
        // Armor plate (chest)
        c.fillStyle = '#566573';
        c.fillRect(18, 12, 14, 4);
        c.fillStyle = '#7f8c8d';
        c.fillRect(20, 13, 10, 2);
    });
}
