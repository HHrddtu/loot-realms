export function drawMineTextures(mk) {
    mk('mine_ground', 800, 200, (c) => {
        c.fillStyle = '#1a1a1a';
        c.fillRect(0, 0, 800, 200);
        c.fillStyle = '#222222';
        for (let i = 0; i < 250; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
        }
        c.fillStyle = '#151515';
        for (let i = 0; i < 80; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
        }
        c.fillStyle = '#2a2a2a';
        for (let i = 0; i < 50; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 200, 4, 2);
        }
        // Rail tracks
        c.fillStyle = '#555555';
        c.fillRect(0, 95, 800, 2);
        c.fillRect(0, 105, 800, 2);
        c.fillStyle = '#444444';
        for (let i = 0; i < 20; i++) {
            c.fillRect(i * 42, 93, 4, 16);
        }
    });

    mk('skeleton_warrior', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Skull
        c.fillStyle = '#d4c5a9';
        c.fillRect(8, 0, 8, 8);
        c.fillRect(6, 2, 12, 4);
        // Eyes
        c.fillStyle = '#1a0a00';
        c.fillRect(8, 3, 2, 2);
        c.fillRect(13, 3, 2, 2);
        // Jaw
        c.fillStyle = '#c4b599';
        c.fillRect(8, 6, 8, 2);
        c.fillStyle = '#1a0a00';
        c.fillRect(9, 7, 1, 1);
        c.fillRect(11, 7, 1, 1);
        c.fillRect(13, 7, 1, 1);
        // Body (ribcage)
        c.fillStyle = '#d4c5a9';
        c.fillRect(9, 8, 6, 2);
        c.fillRect(8, 10, 8, 2);
        c.fillRect(9, 12, 6, 2);
        c.fillRect(8, 14, 8, 2);
        c.fillStyle = '#1a0a00';
        c.fillRect(10, 10, 1, 2);
        c.fillRect(12, 10, 1, 2);
        c.fillRect(10, 14, 1, 2);
        c.fillRect(12, 14, 1, 2);
        // Arms + shield
        c.fillStyle = '#d4c5a9';
        c.fillRect(4, 9, 4, 2);
        c.fillRect(16, 9, 4, 2);
        c.fillRect(4, 12, 2, 4);
        c.fillRect(18, 12, 2, 4);
        // Shield (left)
        c.fillStyle = '#7f8c8d';
        c.fillRect(1, 8, 6, 8);
        c.fillStyle = '#95a5a6';
        c.fillRect(2, 9, 4, 6);
        // Sword (right)
        c.fillStyle = '#bdc3c7';
        c.fillRect(19, 6, 2, 10);
        c.fillStyle = '#7f8c8d';
        c.fillRect(18, 14, 4, 2);
        // Legs
        c.fillStyle = '#d4c5a9';
        c.fillRect(8, 16, 3, 6);
        c.fillRect(13, 16, 3, 6);
        c.fillRect(8, 22, 3, 2);
        c.fillRect(13, 22, 3, 2);
        // Feet
        c.fillStyle = '#555';
        c.fillRect(7, 24, 4, 3);
        c.fillRect(13, 24, 4, 3);
        // Helmet
        c.fillStyle = '#7f8c8d';
        c.fillRect(6, 0, 12, 2);
        c.fillRect(5, 1, 14, 2);
        c.fillStyle = '#95a5a6';
        c.fillRect(7, 0, 10, 1);
    });

    mk('skeleton_archer', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Skull
        c.fillStyle = '#d4c5a9';
        c.fillRect(8, 0, 8, 8);
        c.fillRect(6, 2, 12, 4);
        // Eyes (green glow)
        c.fillStyle = '#1a3a0a';
        c.fillRect(8, 3, 2, 2);
        c.fillRect(13, 3, 2, 2);
        // Jaw
        c.fillStyle = '#c4b599';
        c.fillRect(8, 6, 8, 2);
        // Body
        c.fillStyle = '#d4c5a9';
        c.fillRect(9, 8, 6, 2);
        c.fillRect(8, 10, 8, 2);
        c.fillRect(9, 12, 6, 2);
        c.fillRect(8, 14, 8, 2);
        c.fillStyle = '#1a0a00';
        c.fillRect(10, 10, 1, 2);
        c.fillRect(12, 10, 1, 2);
        c.fillRect(10, 14, 1, 2);
        c.fillRect(12, 14, 1, 2);
        // Arms + bow
        c.fillStyle = '#d4c5a9';
        c.fillRect(4, 9, 4, 2);
        c.fillRect(16, 9, 4, 2);
        c.fillRect(4, 11, 2, 3);
        c.fillRect(18, 11, 2, 3);
        // Bow (right hand)
        c.fillStyle = '#5a3d1a';
        c.fillRect(20, 6, 2, 14);
        c.fillRect(19, 7, 1, 12);
        c.fillStyle = '#8b6914';
        c.fillRect(21, 8, 1, 10);
        // Quiver on back
        c.fillStyle = '#5a3d1a';
        c.fillRect(5, 10, 2, 6);
        c.fillStyle = '#d4c5a9';
        c.fillRect(5, 8, 2, 3);
        c.fillRect(5, 11, 1, 2);
        c.fillRect(6, 11, 1, 2);
        // Legs
        c.fillStyle = '#d4c5a9';
        c.fillRect(8, 16, 3, 6);
        c.fillRect(13, 16, 3, 6);
        c.fillRect(8, 22, 3, 2);
        c.fillRect(13, 22, 3, 2);
        // Feet
        c.fillStyle = '#555';
        c.fillRect(7, 24, 4, 3);
        c.fillRect(13, 24, 4, 3);
        // Hood
        c.fillStyle = '#4a3728';
        c.fillRect(6, 0, 12, 3);
        c.fillRect(5, 1, 14, 3);
        c.fillRect(4, 3, 16, 2);
    });

    mk('skeleton_shaman', 24, 30, (c) => {
        c.imageSmoothingEnabled = false;
        // Skull (slightly larger)
        c.fillStyle = '#d4c5a9';
        c.fillRect(7, 0, 10, 8);
        c.fillRect(5, 2, 14, 4);
        // Eyes (purple glow)
        c.fillStyle = '#3a0a3a';
        c.fillRect(8, 3, 2, 2);
        c.fillRect(14, 3, 2, 2);
        // Jaw
        c.fillStyle = '#c4b599';
        c.fillRect(8, 6, 8, 2);
        // Body (robes)
        c.fillStyle = '#2d1b4e';
        c.fillRect(6, 8, 12, 10);
        c.fillStyle = '#3d2b5e';
        c.fillRect(8, 10, 8, 6);
        // Rune on chest
        c.fillStyle = '#9b59b6';
        c.fillRect(10, 11, 1, 3);
        c.fillRect(9, 12, 3, 1);
        c.fillRect(13, 11, 1, 3);
        c.fillRect(12, 12, 3, 1);
        // Arms
        c.fillStyle = '#d4c5a9';
        c.fillRect(4, 9, 3, 2);
        c.fillRect(17, 9, 3, 2);
        c.fillRect(4, 11, 2, 4);
        c.fillRect(18, 11, 2, 4);
        // Staff (left hand)
        c.fillStyle = '#5a3d1a';
        c.fillRect(1, 2, 2, 22);
        c.fillStyle = '#9b59b6';
        c.fillRect(0, 0, 4, 4);
        c.fillStyle = '#7b4aaa';
        c.fillRect(1, 1, 2, 2);
        // Legs (under robes)
        c.fillStyle = '#2d1b4e';
        c.fillRect(7, 18, 4, 6);
        c.fillRect(13, 18, 4, 6);
        // Feet
        c.fillStyle = '#3d2b1f';
        c.fillRect(6, 24, 5, 3);
        c.fillRect(13, 24, 5, 3);
        // Hood
        c.fillStyle = '#2d1b4e';
        c.fillRect(5, 0, 14, 3);
        c.fillRect(4, 1, 16, 4);
        c.fillRect(3, 3, 18, 2);
        // Glowing tip on staff
        c.fillStyle = '#bf77f6';
        c.fillRect(1, 0, 2, 2);
    });

    mk('skeleton_lord', 56, 72, (c) => {
        c.imageSmoothingEnabled = false;
        // Crown
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 0, 28, 4);
        c.fillRect(12, 2, 4, 6);
        c.fillRect(26, 0, 4, 6);
        c.fillRect(40, 2, 4, 6);
        c.fillStyle = '#e74c3c';
        c.fillRect(15, 2, 2, 2);
        c.fillRect(27, 1, 2, 2);
        c.fillRect(41, 2, 2, 2);
        // Skull (large)
        c.fillStyle = '#d4c5a9';
        c.fillRect(14, 4, 28, 14);
        c.fillRect(12, 6, 32, 10);
        // Eyes (red glow)
        c.fillStyle = '#ff2222';
        c.fillRect(16, 8, 6, 4);
        c.fillRect(34, 8, 6, 4);
        c.fillStyle = '#ff6644';
        c.fillRect(17, 9, 2, 2);
        c.fillRect(35, 9, 2, 2);
        // Nose
        c.fillStyle = '#1a0a00';
        c.fillRect(26, 11, 4, 3);
        // Jaw / teeth
        c.fillStyle = '#c4b599';
        c.fillRect(16, 14, 24, 4);
        c.fillStyle = '#1a0a00';
        c.fillRect(18, 15, 2, 2);
        c.fillRect(22, 15, 2, 2);
        c.fillRect(26, 15, 2, 2);
        c.fillRect(30, 15, 2, 2);
        c.fillRect(34, 15, 2, 2);
        // Neck
        c.fillStyle = '#d4c5a9';
        c.fillRect(22, 18, 12, 4);
        // Armor (dark steel)
        c.fillStyle = '#4a4a5a';
        c.fillRect(10, 22, 36, 18);
        c.fillStyle = '#3a3a4a';
        c.fillRect(12, 24, 32, 14);
        c.fillStyle = '#5a5a6a';
        c.fillRect(14, 26, 28, 2);
        c.fillRect(14, 30, 28, 2);
        // Armor spikes
        c.fillStyle = '#6a6a7a';
        c.fillRect(10, 22, 4, 4);
        c.fillRect(42, 22, 4, 4);
        c.fillStyle = '#7a7a8a';
        c.fillRect(11, 22, 2, 2);
        c.fillRect(43, 22, 2, 2);
        // Dark crystal on chest
        c.fillStyle = '#9b59b6';
        c.fillRect(24, 28, 8, 6);
        c.fillStyle = '#bf77f6';
        c.fillRect(26, 29, 4, 4);
        // Arms
        c.fillStyle = '#4a4a5a';
        c.fillRect(2, 24, 8, 14);
        c.fillRect(46, 24, 8, 14);
        c.fillStyle = '#3a3a4a';
        c.fillRect(4, 26, 4, 10);
        c.fillRect(48, 26, 4, 10);
        // Hands
        c.fillStyle = '#d4c5a9';
        c.fillRect(2, 38, 6, 4);
        c.fillRect(48, 38, 6, 4);
        // Great sword (right)
        c.fillStyle = '#7f8c8d';
        c.fillRect(50, 10, 4, 30);
        c.fillStyle = '#95a5a6';
        c.fillRect(51, 12, 2, 26);
        c.fillStyle = '#bdc3c7';
        c.fillRect(51, 10, 2, 4);
        // Shield (left)
        c.fillStyle = '#4a4a5a';
        c.fillRect(0, 26, 8, 12);
        c.fillStyle = '#5a5a6a';
        c.fillRect(1, 27, 6, 10);
        c.fillStyle = '#f1c40f';
        c.fillRect(3, 30, 2, 4);
        // Legs
        c.fillStyle = '#4a4a5a';
        c.fillRect(14, 40, 8, 16);
        c.fillRect(34, 40, 8, 16);
        c.fillStyle = '#3a3a4a';
        c.fillRect(16, 42, 4, 12);
        c.fillRect(36, 42, 4, 12);
        // Boots
        c.fillStyle = '#2a2a3a';
        c.fillRect(12, 54, 10, 8);
        c.fillRect(34, 54, 10, 8);
        c.fillStyle = '#3a3a4a';
        c.fillRect(13, 54, 8, 2);
        c.fillRect(35, 54, 8, 2);
        // Cape
        c.fillStyle = '#2d1b4e';
        c.fillRect(12, 22, 4, 34);
        c.fillRect(40, 22, 4, 34);
        c.fillStyle = '#3d2b5e';
        c.fillRect(14, 24, 2, 30);
        c.fillRect(42, 24, 2, 30);
    });

    mk('mine_rock', 32, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#3a3a3a';
        c.fillRect(4, 8, 24, 16);
        c.fillRect(8, 4, 16, 20);
        c.fillRect(6, 6, 20, 18);
        c.fillStyle = '#4a4a4a';
        c.fillRect(8, 6, 16, 14);
        c.fillStyle = '#555555';
        c.fillRect(10, 8, 4, 4);
        c.fillRect(18, 10, 3, 3);
        c.fillStyle = '#2a2a2a';
        c.fillRect(6, 20, 20, 4);
        c.fillRect(4, 22, 24, 4);
    });

    mk('mine_rails', 800, 12, (c) => {
        c.fillStyle = '#555555';
        c.fillRect(0, 2, 800, 2);
        c.fillRect(0, 8, 800, 2);
        c.fillStyle = '#444444';
        for (let i = 0; i < 20; i++) {
            c.fillRect(i * 42, 0, 4, 12);
        }
    });

    mk('mine_crystal', 16, 20, (c) => {
        c.fillStyle = '#9b59b6';
        c.fillRect(6, 0, 4, 4);
        c.fillRect(4, 4, 8, 4);
        c.fillRect(2, 8, 12, 4);
        c.fillRect(4, 12, 8, 4);
        c.fillRect(6, 16, 4, 4);
        c.fillStyle = '#bf77f6';
        c.fillRect(6, 2, 4, 2);
        c.fillRect(4, 6, 2, 2);
        c.fillRect(8, 6, 2, 2);
        c.fillStyle = '#7b4aaa';
        c.fillRect(4, 10, 8, 2);
    });

    mk('mine_ladder', 32, 60, (c) => {
        c.fillStyle = '#5a3d1a';
        c.fillRect(4, 0, 4, 60);
        c.fillRect(24, 0, 4, 60);
        c.fillStyle = '#8b6914';
        c.fillRect(4, 6, 24, 3);
        c.fillRect(4, 16, 24, 3);
        c.fillRect(4, 26, 24, 3);
        c.fillRect(4, 36, 24, 3);
        c.fillRect(4, 46, 24, 3);
    });

    mk('skeleton_lord_aoe', 128, 128, (c) => {
        c.strokeStyle = 'rgba(100,50,150,0.8)';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(64, 64, 50, 0, Math.PI * 2);
        c.stroke();
        c.strokeStyle = 'rgba(150,70,200,0.5)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(64, 64, 35, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = 'rgba(100,30,130,0.12)';
        c.beginPath();
        c.arc(64, 64, 50, 0, Math.PI * 2);
        c.fill();
    });

    mk('mine_chest', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 8, 24, 14);
        c.fillStyle = '#8b6914';
        c.fillRect(4, 6, 20, 4);
        c.fillStyle = '#4a2d10';
        c.fillRect(4, 12, 20, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 10, 4, 4);
        c.fillStyle = '#e67e22';
        c.fillRect(13, 11, 2, 2);
        c.fillStyle = '#6b4423';
        c.fillRect(2, 8, 24, 2);
        c.fillRect(2, 20, 24, 2);
    });

    mk('mine_chest_open', 28, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 6, 24, 12);
        c.fillStyle = '#8b6914';
        c.fillRect(4, 4, 20, 4);
        c.fillStyle = '#4a2d10';
        c.fillRect(4, 8, 20, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 8, 4, 2);
        c.fillStyle = '#3d2b1f';
        c.fillRect(4, 2, 20, 4);
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 0, 16, 4);
        c.fillStyle = '#2a1a0a';
        c.fillRect(6, 10, 16, 4);
    });

    mk('mine_chest_broken', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#3d2b1f';
        c.fillRect(2, 10, 12, 12);
        c.fillRect(14, 12, 10, 10);
        c.fillStyle = '#5a3d1a';
        c.fillRect(4, 8, 8, 4);
        c.fillRect(16, 10, 6, 4);
        c.fillStyle = '#2a1a0a';
        c.fillRect(6, 14, 4, 6);
    });

    mk('mine_boss_portal', 48, 64, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2a2a2a';
        c.fillRect(4, 0, 40, 64);
        c.fillStyle = '#3a3a3a';
        c.fillRect(8, 0, 32, 64);
        c.fillStyle = '#1a1a1a';
        c.fillRect(12, 20, 24, 36);
        c.fillStyle = '#2d1b4e';
        c.fillRect(14, 22, 20, 32);
        c.fillStyle = '#4a2080';
        c.fillRect(16, 26, 16, 24);
        c.fillStyle = '#7a30aa';
        c.fillRect(20, 30, 8, 16);
        c.fillStyle = '#3a3a3a';
        c.fillRect(0, 0, 8, 10);
        c.fillRect(40, 0, 8, 10);
        c.fillStyle = '#4a4a4a';
        c.fillRect(2, 2, 4, 6);
        c.fillRect(42, 2, 4, 6);
    });

    mk('torch', 12, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3d1a';
        c.fillRect(4, 8, 4, 16);
        c.fillStyle = '#4a2d10';
        c.fillRect(5, 10, 2, 14);
        c.fillStyle = '#e67e22';
        c.fillRect(3, 2, 6, 8);
        c.fillRect(2, 4, 8, 4);
        c.fillStyle = '#f39c12';
        c.fillRect(4, 0, 4, 6);
        c.fillRect(3, 2, 6, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(4, 1, 4, 3);
        c.fillStyle = '#fff3e0';
        c.fillRect(5, 1, 2, 2);
    });

    mk('torch_glow', 128, 128, (c) => {
        const grd = c.createRadialGradient(64, 64, 0, 64, 64, 64);
        grd.addColorStop(0, 'rgba(255,160,50,0.35)');
        grd.addColorStop(0.3, 'rgba(255,120,20,0.18)');
        grd.addColorStop(0.6, 'rgba(255,80,10,0.06)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 128, 128);
    });

    mk('mine_darkness', 800, 900, (c) => {
        c.fillStyle = 'rgba(0,0,0,0.55)';
        c.fillRect(0, 0, 800, 900);
        for (let i = 0; i < 100; i++) {
            c.fillStyle = `rgba(0,0,0,${0.3 + Math.random() * 0.4})`;
            c.fillRect(Math.random() * 800, Math.random() * 900, 4 + Math.random() * 8, 2 + Math.random() * 4);
        }
    });

    mk('fireball', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer glow
        const grd1 = c.createRadialGradient(10, 10, 0, 10, 10, 10);
        grd1.addColorStop(0, 'rgba(255,255,200,0.3)');
        grd1.addColorStop(0.5, 'rgba(255,150,50,0.15)');
        grd1.addColorStop(1, 'rgba(255,100,0,0)');
        c.fillStyle = grd1;
        c.fillRect(0, 0, 20, 20);
        // Inner fire
        const grd2 = c.createRadialGradient(10, 10, 0, 10, 10, 8);
        grd2.addColorStop(0, '#ffffff');
        grd2.addColorStop(0.3, '#ffcc00');
        grd2.addColorStop(0.6, '#ff6600');
        grd2.addColorStop(0.8, '#cc0000');
        grd2.addColorStop(1, 'rgba(100,0,0,0)');
        c.fillStyle = grd2;
        c.fillRect(2, 2, 16, 16);
        // Flame tips
        c.fillStyle = '#ff9900';
        c.fillRect(6, 0, 2, 4);
        c.fillRect(12, 1, 2, 3);
        c.fillStyle = '#ffcc00';
        c.fillRect(9, 0, 3, 5);
    });

    mk('enemy_arrow', 12, 6, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8B4513';
        c.fillRect(2, 2, 8, 2);
        c.fillStyle = '#a0522d';
        c.fillRect(10, 1, 2, 4);
        c.fillStyle = '#ccc';
        c.fillRect(0, 2, 2, 2);
    });

    mk('enemy_magic', 10, 10, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(5, 5, 0, 5, 5, 5);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.3, '#9b59b6');
        grd.addColorStop(0.7, '#6c3483');
        grd.addColorStop(1, 'rgba(60,0,80,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 10, 10);
    });

    mk('enemy_heal', 8, 8, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(4, 4, 0, 4, 4, 4);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.3, '#2ecc71');
        grd.addColorStop(0.7, '#27ae60');
        grd.addColorStop(1, 'rgba(0,80,0,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 8, 8);
    });

    mk('acid_flask', 12, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#555';
        c.fillRect(4, 0, 4, 3);
        c.fillStyle = '#444';
        c.fillRect(3, 3, 6, 2);
        c.fillStyle = '#2ecc71';
        c.fillRect(2, 5, 8, 10);
        c.fillStyle = '#27ae60';
        c.fillRect(3, 6, 6, 8);
        c.fillStyle = '#1abc9c';
        c.fillRect(4, 8, 4, 4);
    });

    mk('soul_strike', 12, 12, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(6, 6, 0, 6, 6, 6);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(0.3, '#ecf0f1');
        grd.addColorStop(0.6, '#bdc3c7');
        grd.addColorStop(1, 'rgba(189,195,199,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 12, 12);
    });

    mk('shield_vfx', 56, 56, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer glow ring
        c.strokeStyle = 'rgba(52,152,219,0.3)';
        c.lineWidth = 8;
        c.beginPath();
        c.arc(28, 28, 26, 0, Math.PI * 2);
        c.stroke();
        // Main ring
        c.strokeStyle = 'rgba(52,152,219,0.9)';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(28, 28, 22, 0, Math.PI * 2);
        c.stroke();
        // Inner ring
        c.strokeStyle = 'rgba(100,200,255,0.6)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(28, 28, 18, 0, Math.PI * 2);
        c.stroke();
        // Rune marks
        c.fillStyle = 'rgba(100,200,255,0.8)';
        c.fillRect(26, 2, 4, 6);
        c.fillRect(26, 48, 4, 6);
        c.fillRect(2, 26, 6, 4);
        c.fillRect(48, 26, 6, 4);
        // Center glow
        const grd = c.createRadialGradient(28, 28, 0, 28, 28, 12);
        grd.addColorStop(0, 'rgba(100,200,255,0.4)');
        grd.addColorStop(1, 'rgba(52,152,219,0)');
        c.fillStyle = grd;
        c.fillRect(16, 16, 24, 24);
    });

    mk('heal_vfx', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer glow
        const grd1 = c.createRadialGradient(20, 20, 0, 20, 20, 20);
        grd1.addColorStop(0, 'rgba(46,204,113,0.2)');
        grd1.addColorStop(0.5, 'rgba(46,204,113,0.1)');
        grd1.addColorStop(1, 'rgba(46,204,113,0)');
        c.fillStyle = grd1;
        c.fillRect(0, 0, 40, 40);
        // Inner glow
        const grd2 = c.createRadialGradient(20, 20, 0, 20, 20, 14);
        grd2.addColorStop(0, 'rgba(200,255,200,0.8)');
        grd2.addColorStop(0.4, 'rgba(46,204,113,0.6)');
        grd2.addColorStop(0.7, 'rgba(46,204,113,0.3)');
        grd2.addColorStop(1, 'rgba(46,204,113,0)');
        c.fillStyle = grd2;
        c.fillRect(6, 6, 28, 28);
        // Cross symbol
        c.fillStyle = 'rgba(255,255,255,0.9)';
        c.fillRect(18, 12, 4, 16);
        c.fillRect(12, 18, 16, 4);
        // Sparkles
        c.fillStyle = 'rgba(255,255,200,0.8)';
        c.fillRect(8, 8, 2, 2);
        c.fillRect(30, 10, 2, 2);
        c.fillRect(10, 30, 2, 2);
        c.fillRect(28, 28, 2, 2);
    });

    mk('mine_barrel', 20, 24, (c) => {
        c.fillStyle = '#6b4423';
        c.fillRect(3, 2, 14, 20);
        c.fillStyle = '#8b6914';
        c.fillRect(3, 2, 14, 2);
        c.fillRect(3, 20, 14, 2);
        c.fillRect(3, 10, 14, 2);
        c.fillStyle = '#5a3d1a';
        c.fillRect(5, 4, 10, 16);
        c.fillStyle = '#3d2b1f';
        c.fillRect(2, 4, 2, 16);
        c.fillRect(16, 4, 2, 16);
    });

    mk('mine_crate', 22, 22, (c) => {
        c.fillStyle = '#8b6914';
        c.fillRect(2, 2, 18, 18);
        c.fillStyle = '#6b4423';
        c.fillRect(2, 2, 18, 2);
        c.fillRect(2, 18, 18, 2);
        c.fillRect(10, 2, 2, 18);
        c.fillRect(2, 10, 18, 2);
        c.fillStyle = '#5a3d1a';
        c.fillRect(4, 4, 6, 6);
        c.fillRect(12, 4, 6, 6);
        c.fillRect(4, 12, 6, 6);
        c.fillRect(12, 12, 6, 6);
    });

    mk('mine_beam', 12, 60, (c) => {
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 0, 8, 60);
        c.fillStyle = '#6b4423';
        c.fillRect(0, 0, 12, 6);
        c.fillRect(0, 54, 12, 6);
        c.fillStyle = '#4a2e10';
        c.fillRect(4, 8, 4, 44);
    });

    mk('mine_sign', 24, 20, (c) => {
        c.fillStyle = '#6b4423';
        c.fillRect(10, 12, 4, 8);
        c.fillStyle = '#8b6914';
        c.fillRect(2, 2, 20, 12);
        c.fillStyle = '#6b4423';
        c.fillRect(2, 2, 20, 2);
        c.fillRect(2, 12, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 5, 2, 2);
        c.fillRect(10, 5, 6, 2);
        c.fillRect(16, 5, 2, 2);
    });

    mk('mine_skull', 14, 14, (c) => {
        c.fillStyle = '#ecf0f1';
        c.fillRect(3, 2, 8, 6);
        c.fillRect(2, 4, 10, 4);
        c.fillStyle = '#bdc3c7';
        c.fillRect(4, 4, 2, 2);
        c.fillRect(8, 4, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(5, 5, 1, 1);
        c.fillRect(9, 5, 1, 1);
        c.fillStyle = '#ecf0f1';
        c.fillRect(4, 8, 6, 2);
        c.fillStyle = '#000';
        c.fillRect(5, 8, 1, 1);
        c.fillRect(7, 8, 1, 1);
    });

    mk('mine_torch_flame', 8, 12, (c) => {
        c.fillStyle = '#ff6600';
        c.fillRect(2, 2, 4, 8);
        c.fillStyle = '#ffaa00';
        c.fillRect(3, 1, 2, 6);
        c.fillStyle = '#ffcc44';
        c.fillRect(3, 3, 2, 3);
    });

    mk('mine_skeleton_deco', 20, 24, (c) => {
        c.fillStyle = '#d4c5a9';
        c.fillRect(6, 0, 8, 6);
        c.fillRect(4, 2, 12, 4);
        c.fillStyle = '#000';
        c.fillRect(7, 2, 2, 2);
        c.fillRect(11, 2, 2, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(7, 6, 6, 2);
        c.fillRect(6, 8, 8, 6);
        c.fillRect(4, 10, 2, 4);
        c.fillRect(14, 10, 2, 4);
        c.fillStyle = '#95a5a6';
        c.fillRect(7, 14, 6, 6);
        c.fillRect(5, 20, 4, 3);
        c.fillRect(11, 20, 4, 3);
    });

    mk('mine_ore_vein', 18, 12, (c) => {
        c.fillStyle = '#555555';
        c.fillRect(0, 2, 18, 8);
        c.fillStyle = '#777777';
        c.fillRect(2, 4, 4, 3);
        c.fillRect(10, 3, 3, 4);
        c.fillStyle = '#f39c12';
        c.fillRect(3, 5, 2, 1);
        c.fillRect(11, 4, 1, 2);
        c.fillRect(8, 6, 1, 1);
    });

    mk('mine_bucket', 14, 16, (c) => {
        c.fillStyle = '#7f8c8d';
        c.fillRect(2, 4, 10, 10);
        c.fillStyle = '#95a5a6';
        c.fillRect(3, 6, 8, 6);
        c.fillStyle = '#5d6d7e';
        c.fillRect(1, 4, 12, 2);
        c.fillStyle = '#3498db';
        c.fillRect(4, 8, 6, 4);
    });

    mk('icon_fireball', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(10, 10, 0, 10, 10, 9);
        grd.addColorStop(0, '#fff8e1');
        grd.addColorStop(0.3, '#ff9800');
        grd.addColorStop(0.6, '#f44336');
        grd.addColorStop(1, 'rgba(180,20,20,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 20, 20);
    });

    mk('icon_shield', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2980b9';
        c.beginPath();
        c.moveTo(10, 2);
        c.lineTo(17, 6);
        c.lineTo(17, 12);
        c.lineTo(10, 18);
        c.lineTo(3, 12);
        c.lineTo(3, 6);
        c.closePath();
        c.fill();
        c.fillStyle = '#5dade2';
        c.beginPath();
        c.moveTo(10, 4);
        c.lineTo(15, 7);
        c.lineTo(15, 11);
        c.lineTo(10, 16);
        c.lineTo(5, 11);
        c.lineTo(5, 7);
        c.closePath();
        c.fill();
    });

    mk('icon_heal', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2ecc71';
        c.fillRect(7, 3, 6, 14);
        c.fillRect(3, 7, 14, 6);
        c.fillStyle = '#27ae60';
        c.fillRect(8, 4, 4, 12);
        c.fillRect(4, 8, 12, 4);
    });

    mk('icon_acid_flask', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#666';
        c.fillRect(8, 1, 4, 4);
        c.fillStyle = '#555';
        c.fillRect(7, 5, 6, 2);
        c.fillStyle = '#2ecc71';
        c.fillRect(5, 7, 10, 11);
        c.fillStyle = '#1abc9c';
        c.fillRect(7, 9, 6, 6);
    });

    mk('icon_toxic_puddle', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a5e1a';
        c.beginPath();
        c.ellipse(10, 12, 8, 5, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#3ddc3d';
        c.beginPath();
        c.arc(7, 10, 2, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(13, 11, 1.5, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#0d3d0d';
        c.beginPath();
        c.arc(10, 13, 1, 0, Math.PI * 2);
        c.fill();
    });

    mk('icon_burrow', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8B4513';
        c.fillRect(2, 10, 16, 8);
        c.fillStyle = '#654321';
        c.fillRect(4, 12, 12, 4);
        c.fillStyle = '#A0522D';
        c.fillRect(8, 6, 4, 6);
        c.fillStyle = '#D2691E';
        c.fillRect(9, 7, 2, 4);
        c.fillStyle = '#555';
        c.fillRect(6, 8, 2, 3);
        c.fillRect(12, 7, 2, 3);
    });

    mk('icon_soul_strike', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(10, 10, 0, 10, 10, 9);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.3, '#f1c40f');
        grd.addColorStop(0.6, '#f39c12');
        grd.addColorStop(1, 'rgba(243,156,18,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 20, 20);
        c.fillStyle = '#fff';
        c.fillRect(9, 3, 2, 14);
        c.fillRect(6, 7, 8, 2);
    });

    mk('icon_holy_shield', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f1c40f';
        c.beginPath();
        c.moveTo(10, 2);
        c.lineTo(17, 6);
        c.lineTo(17, 12);
        c.lineTo(10, 18);
        c.lineTo(3, 12);
        c.lineTo(3, 6);
        c.closePath();
        c.fill();
        c.fillStyle = '#f9e547';
        c.beginPath();
        c.moveTo(10, 4);
        c.lineTo(15, 7);
        c.lineTo(15, 11);
        c.lineTo(10, 16);
        c.lineTo(5, 11);
        c.lineTo(5, 7);
        c.closePath();
        c.fill();
    });

    mk('icon_holy_nova', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(10, 10, 0, 10, 10, 9);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.2, '#f1c40f');
        grd.addColorStop(0.5, '#f39c12');
        grd.addColorStop(0.8, 'rgba(241,196,15,0.3)');
        grd.addColorStop(1, 'rgba(241,196,15,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 20, 20);
        c.fillStyle = '#fff';
        for (let a = 0; a < 8; a++) {
            const angle = (Math.PI * 2 / 8) * a;
            c.fillRect(10 + Math.cos(angle) * 4 - 1, 10 + Math.sin(angle) * 4 - 1, 2, 2);
        }
    });

    mk('icon_meteor', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#e74c3c';
        c.beginPath();
        c.moveTo(10, 2);
        c.lineTo(14, 8);
        c.lineTo(12, 7);
        c.lineTo(16, 14);
        c.lineTo(14, 13);
        c.lineTo(18, 18);
        c.lineTo(8, 16);
        c.lineTo(10, 14);
        c.lineTo(4, 18);
        c.lineTo(6, 12);
        c.lineTo(3, 13);
        c.lineTo(7, 6);
        c.lineTo(5, 7);
        c.closePath();
        c.fill();
        c.fillStyle = '#ff6b3d';
        c.beginPath();
        c.arc(10, 11, 4, 0, Math.PI * 2);
        c.fill();
    });

    mk('icon_chemical_cloud', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#27ae60';
        c.beginPath();
        c.arc(7, 10, 5, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(13, 9, 6, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(10, 13, 4, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#1abc9c';
        c.beginPath();
        c.arc(10, 10, 3, 0, Math.PI * 2);
        c.fill();
    });

    mk('icon_divine_blessing', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        const grd = c.createRadialGradient(10, 10, 0, 10, 10, 9);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.3, '#f1c40f');
        grd.addColorStop(0.7, 'rgba(241,196,15,0.4)');
        grd.addColorStop(1, 'rgba(241,196,15,0)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 20, 20);
        c.fillStyle = '#fff';
        c.fillRect(9, 4, 2, 12);
        c.fillRect(4, 9, 12, 2);
    });

    mk('nav_book', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8B4513';
        c.fillRect(2, 1, 12, 14);
        c.fillStyle = '#D2691E';
        c.fillRect(3, 2, 10, 12);
        c.fillStyle = '#f1c40f';
        c.fillRect(5, 4, 6, 1);
        c.fillRect(5, 6, 6, 1);
        c.fillRect(5, 8, 4, 1);
    });

    mk('nav_scroll', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f5deb3';
        c.fillRect(3, 2, 10, 12);
        c.fillStyle = '#deb887';
        c.fillRect(3, 2, 10, 2);
        c.fillRect(3, 12, 10, 2);
        c.fillStyle = '#8B4513';
        c.fillRect(5, 5, 6, 1);
        c.fillRect(5, 7, 6, 1);
        c.fillRect(5, 9, 4, 1);
    });

    mk('nav_hammer', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8B4513';
        c.fillRect(7, 6, 2, 8);
        c.fillStyle = '#888';
        c.fillRect(4, 2, 8, 5);
        c.fillStyle = '#aaa';
        c.fillRect(5, 3, 6, 3);
    });

    mk('nav_star', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f1c40f';
        c.beginPath();
        c.moveTo(8, 1);
        c.lineTo(9.5, 5.5);
        c.lineTo(14, 6);
        c.lineTo(10.5, 9);
        c.lineTo(12, 14);
        c.lineTo(8, 11);
        c.lineTo(4, 14);
        c.lineTo(5.5, 9);
        c.lineTo(2, 6);
        c.lineTo(6.5, 5.5);
        c.closePath();
        c.fill();
    });

    mk('nav_paw', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d4a574';
        c.beginPath();
        c.arc(8, 10, 4, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(4, 5, 2, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(8, 3, 2, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(12, 5, 2, 0, Math.PI * 2);
        c.fill();
    });

    mk('nav_sound', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2ecc71';
        c.fillRect(2, 5, 3, 6);
        c.beginPath();
        c.moveTo(5, 5);
        c.lineTo(9, 2);
        c.lineTo(9, 14);
        c.lineTo(5, 11);
        c.closePath();
        c.fill();
        c.strokeStyle = '#2ecc71';
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(11, 8, 2, -Math.PI * 0.4, Math.PI * 0.4);
        c.stroke();
        c.beginPath();
        c.arc(11, 8, 4, -Math.PI * 0.3, Math.PI * 0.3);
        c.stroke();
    });

    mk('nav_quest', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f5deb3';
        c.fillRect(2, 1, 12, 14);
        c.fillStyle = '#deb887';
        c.fillRect(2, 1, 12, 2);
        c.fillStyle = '#2ecc71';
        c.fillRect(4, 5, 2, 2);
        c.fillRect(8, 5, 2, 2);
        c.fillStyle = '#8B4513';
        c.fillRect(4, 8, 8, 1);
        c.fillRect(4, 10, 6, 1);
        c.fillRect(4, 12, 7, 1);
    });
}
