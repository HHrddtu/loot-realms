export function drawEffectTextures(mk) {
    mk('slash', 40, 40, (c) => {
        c.fillStyle = 'rgba(255,255,255,0.3)';
        c.beginPath();
        c.arc(20, 20, 18, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(255,255,255,0.7)';
        c.beginPath();
        c.arc(20, 20, 10, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = 'rgba(200,220,255,0.9)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(20, 20, 14, -0.8, 1.2);
        c.stroke();
    });

    mk('corruption_full', 8, 8, (c) => {
        c.fillStyle = '#1a0a00';
        c.fillRect(0, 0, 8, 8);
        c.fillStyle = '#3d0a0a';
        for (let i = 0; i < 8; i++) {
            c.fillRect(Math.random() * 8, Math.random() * 8, 2, 2);
        }
    });

    mk('talent_node', 24, 24, (c) => {
        c.fillStyle = '#1a1a2e';
        c.beginPath();
        c.arc(12, 12, 11, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = '#444466';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(12, 12, 11, 0, Math.PI * 2);
        c.stroke();
    });

    mk('talent_node_active', 24, 24, (c) => {
        c.fillStyle = '#1a1a3e';
        c.beginPath();
        c.arc(12, 12, 11, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = '#f1c40f';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(12, 12, 11, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = '#f1c40f';
        c.beginPath();
        c.arc(12, 12, 5, 0, Math.PI * 2);
        c.fill();
    });

    mk('talent_node_unlocked', 24, 24, (c) => {
        c.fillStyle = '#2d1b4e';
        c.beginPath();
        c.arc(12, 12, 11, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = '#9b59b6';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(12, 12, 11, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = '#9b59b6';
        c.beginPath();
        c.arc(12, 12, 5, 0, Math.PI * 2);
        c.fill();
    });

    mk('coin', 8, 8, (c) => {
        c.fillStyle = '#f1c40f';
        c.beginPath();
        c.arc(4, 4, 3, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#f39c12';
        c.beginPath();
        c.arc(4, 4, 2, 0, Math.PI * 2);
        c.fill();
    });

    // Parchment background for UI
    mk('parchment_bg', 600, 500, (c) => {
        c.imageSmoothingEnabled = false;
        // Base parchment color
        c.fillStyle = '#f4e4c1';
        c.fillRect(0, 0, 600, 500);
        // Texture noise
        c.fillStyle = '#e8d5a3';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 600, Math.random() * 500, 2 + Math.random() * 3, 1 + Math.random() * 2);
        }
        c.fillStyle = '#dcc89a';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 600, Math.random() * 500, 3 + Math.random() * 4, 1);
        }
        // Dark edges (vignette)
        const grd = c.createRadialGradient(300, 250, 200, 300, 250, 350);
        grd.addColorStop(0, 'rgba(0,0,0,0)');
        grd.addColorStop(1, 'rgba(0,0,0,0.3)');
        c.fillStyle = grd;
        c.fillRect(0, 0, 600, 500);
        // Border burn marks
        c.fillStyle = 'rgba(139,69,19,0.4)';
        c.fillRect(0, 0, 600, 8);
        c.fillRect(0, 492, 600, 8);
        c.fillRect(0, 0, 8, 500);
        c.fillRect(592, 0, 8, 500);
    });

    // Ornate border for panels
    mk('ornate_border', 600, 500, (c) => {
        c.imageSmoothingEnabled = false;
        c.strokeStyle = '#8b4513';
        c.lineWidth = 3;
        c.strokeRect(5, 5, 590, 490);
        c.strokeStyle = '#a0522d';
        c.lineWidth = 1;
        c.strokeRect(10, 10, 580, 480);
        // Corner ornaments
        c.fillStyle = '#8b4513';
        c.fillRect(5, 5, 20, 20);
        c.fillRect(575, 5, 20, 20);
        c.fillRect(5, 475, 20, 20);
        c.fillRect(575, 475, 20, 20);
        c.fillStyle = '#a0522d';
        c.fillRect(10, 10, 12, 12);
        c.fillRect(578, 10, 12, 12);
        c.fillRect(10, 478, 12, 12);
        c.fillRect(578, 478, 12, 12);
    });

    // Scroll vertical
    mk('scroll_v', 40, 600, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d4a574';
        c.fillRect(10, 0, 20, 600);
        c.fillStyle = '#c49464';
        c.fillRect(12, 0, 16, 600);
        // Top roll
        c.fillStyle = '#8b4513';
        c.fillRect(5, 0, 30, 15);
        c.fillStyle = '#a0522d';
        c.fillRect(8, 2, 24, 11);
        // Bottom roll
        c.fillStyle = '#8b4513';
        c.fillRect(5, 585, 30, 15);
        c.fillStyle = '#a0522d';
        c.fillRect(8, 587, 24, 11);
    });

    // === SHADOW DISTRICT EFFECTS ===

    // Screen distortion overlay — glitchy mirror effect (full screen)
    mk('shadow_distortion', 400, 300, (c) => {
        c.imageSmoothingEnabled = false;
        // Base transparency
        c.fillStyle = 'rgba(10,10,30,0.15)';
        c.fillRect(0, 0, 400, 300);
        // Horizontal glitch lines
        c.fillStyle = 'rgba(40,20,80,0.12)';
        c.fillRect(0, 20, 400, 1);
        c.fillRect(0, 45, 400, 1);
        c.fillRect(0, 80, 400, 1);
        c.fillRect(0, 110, 400, 1);
        c.fillRect(0, 150, 400, 1);
        c.fillRect(0, 180, 400, 1);
        c.fillRect(0, 220, 400, 1);
        c.fillRect(0, 260, 400, 1);
        // Vertical distortion bands
        c.fillStyle = 'rgba(30,30,70,0.08)';
        c.fillRect(50, 0, 2, 300);
        c.fillRect(120, 0, 3, 300);
        c.fillRect(200, 0, 2, 300);
        c.fillRect(280, 0, 3, 300);
        c.fillRect(350, 0, 2, 300);
        // Random pixel noise blocks
        c.fillStyle = 'rgba(60,30,120,0.06)';
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 400;
            const y = Math.random() * 300;
            const w = 2 + Math.random() * 8;
            const h = 1 + Math.random() * 3;
            c.fillRect(x, y, w, h);
        }
        // Mirror shard reflections
        c.fillStyle = 'rgba(80,80,140,0.04)';
        c.fillRect(30, 40, 20, 8);
        c.fillRect(150, 100, 25, 6);
        c.fillRect(280, 180, 18, 10);
        c.fillRect(80, 240, 22, 7);
        // Void energy ripples
        c.fillStyle = 'rgba(100,50,180,0.03)';
        c.beginPath();
        c.ellipse(200, 150, 120, 80, 0, 0, Math.PI * 2);
        c.fill();
        // Chromatic aberration hint
        c.fillStyle = 'rgba(255,0,0,0.02)';
        c.fillRect(0, 0, 400, 300);
        c.fillStyle = 'rgba(0,0,255,0.02)';
        c.fillRect(2, 0, 398, 300);
    });

    // Portal trap — swirling void gateway (64x64)
    mk('portal_trap', 64, 64, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer ring (obsidian)
        c.fillStyle = '#0a0a14';
        c.beginPath();
        c.arc(32, 32, 30, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#141422';
        c.beginPath();
        c.arc(32, 32, 28, 0, Math.PI * 2);
        c.fill();
        // Void energy ring
        c.fillStyle = '#2a1a4a';
        c.beginPath();
        c.arc(32, 32, 24, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#3a2a6a';
        c.beginPath();
        c.arc(32, 32, 20, 0, Math.PI * 2);
        c.fill();
        // Inner void
        c.fillStyle = '#050510';
        c.beginPath();
        c.arc(32, 32, 16, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#0a0a1a';
        c.beginPath();
        c.arc(32, 32, 12, 0, Math.PI * 2);
        c.fill();
        // Swirl energy lines
        c.fillStyle = '#4a2a8a';
        c.fillRect(20, 30, 8, 2);
        c.fillRect(36, 32, 8, 2);
        c.fillRect(30, 20, 2, 8);
        c.fillRect(32, 36, 2, 8);
        c.fillStyle = '#6a4aaa';
        c.fillRect(22, 28, 4, 1);
        c.fillRect(38, 33, 4, 1);
        c.fillRect(31, 22, 1, 4);
        c.fillRect(33, 38, 1, 4);
        // Center pull
        c.fillStyle = '#8a6acc';
        c.fillRect(30, 30, 4, 4);
        c.fillStyle = '#aa8aee';
        c.fillRect(31, 31, 2, 2);
        // Rune markers on ring
        c.fillStyle = '#cc22ff';
        c.fillRect(30, 2, 4, 2);
        c.fillRect(30, 60, 4, 2);
        c.fillRect(2, 30, 2, 4);
        c.fillRect(60, 30, 2, 4);
        c.fillStyle = '#ee44ff';
        c.fillRect(31, 2, 2, 1);
        c.fillRect(31, 61, 2, 1);
        c.fillRect(2, 31, 1, 2);
        c.fillRect(61, 31, 1, 2);
        // Diagonal runes
        c.fillStyle = '#cc22ff';
        c.fillRect(10, 10, 3, 3);
        c.fillRect(51, 10, 3, 3);
        c.fillRect(10, 51, 3, 3);
        c.fillRect(51, 51, 3, 3);
        c.fillStyle = '#ee44ff';
        c.fillRect(11, 11, 1, 1);
        c.fillRect(52, 11, 1, 1);
        c.fillRect(11, 52, 1, 1);
        c.fillRect(52, 52, 1, 1);
        // Glow effect
        c.fillStyle = 'rgba(80,40,160,0.15)';
        c.beginPath();
        c.arc(32, 32, 26, 0, Math.PI * 2);
        c.fill();
    });

    // Portal trap active — pulsing version (64x64)
    mk('portal_trap_active', 64, 64, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer ring (brighter)
        c.fillStyle = '#141422';
        c.beginPath();
        c.arc(32, 32, 30, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#1a1a28';
        c.beginPath();
        c.arc(32, 32, 28, 0, Math.PI * 2);
        c.fill();
        // Void energy ring (pulsing)
        c.fillStyle = '#3a2a6a';
        c.beginPath();
        c.arc(32, 32, 24, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#4a3a8a';
        c.beginPath();
        c.arc(32, 32, 20, 0, Math.PI * 2);
        c.fill();
        // Inner void (darker)
        c.fillStyle = '#050510';
        c.beginPath();
        c.arc(32, 32, 16, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#080818';
        c.beginPath();
        c.arc(32, 32, 12, 0, Math.PI * 2);
        c.fill();
        // Active swirl lines (more visible)
        c.fillStyle = '#6a4aaa';
        c.fillRect(18, 30, 12, 2);
        c.fillRect(34, 32, 12, 2);
        c.fillRect(30, 18, 2, 12);
        c.fillRect(32, 34, 2, 12);
        c.fillStyle = '#8a6acc';
        c.fillRect(20, 28, 6, 1);
        c.fillRect(38, 33, 6, 1);
        c.fillRect(31, 20, 1, 6);
        c.fillRect(33, 38, 1, 6);
        // Center pull (brighter)
        c.fillStyle = '#aa8aee';
        c.fillRect(28, 28, 8, 8);
        c.fillStyle = '#ccaaff';
        c.fillRect(30, 30, 4, 4);
        c.fillStyle = '#eeccff';
        c.fillRect(31, 31, 2, 2);
        // Rune markers (glowing)
        c.fillStyle = '#ee44ff';
        c.fillRect(30, 2, 4, 2);
        c.fillRect(30, 60, 4, 2);
        c.fillRect(2, 30, 2, 4);
        c.fillRect(60, 30, 2, 4);
        c.fillStyle = '#ff66ff';
        c.fillRect(31, 2, 2, 1);
        c.fillRect(31, 61, 2, 1);
        c.fillRect(2, 31, 1, 2);
        c.fillRect(61, 31, 1, 2);
        // Diagonal runes (brighter)
        c.fillStyle = '#ee44ff';
        c.fillRect(10, 10, 3, 3);
        c.fillRect(51, 10, 3, 3);
        c.fillRect(10, 51, 3, 3);
        c.fillRect(51, 51, 3, 3);
        c.fillStyle = '#ff66ff';
        c.fillRect(11, 11, 1, 1);
        c.fillRect(52, 11, 1, 1);
        c.fillRect(11, 52, 1, 1);
        c.fillRect(52, 52, 1, 1);
        // Stronger glow
        c.fillStyle = 'rgba(100,50,200,0.2)';
        c.beginPath();
        c.arc(32, 32, 26, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(120,60,220,0.1)';
        c.beginPath();
        c.arc(32, 32, 30, 0, Math.PI * 2);
        c.fill();
    });

    // Shadow clone effect — dark duplicate shimmer (20x28)
    mk('shadow_clone_effect', 20, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Ghostly outline
        c.fillStyle = 'rgba(20,20,50,0.3)';
        c.fillRect(6, 0, 8, 8);
        c.fillRect(4, 4, 12, 6);
        c.fillStyle = 'rgba(30,30,60,0.4)';
        c.fillRect(7, 1, 6, 6);
        c.fillRect(5, 5, 10, 4);
        // Eyes (dim)
        c.fillStyle = 'rgba(200,200,100,0.3)';
        c.fillRect(8, 3, 2, 2);
        c.fillRect(12, 3, 2, 2);
        // Body outline
        c.fillStyle = 'rgba(20,20,50,0.2)';
        c.fillRect(4, 10, 12, 10);
        c.fillRect(2, 14, 16, 6);
        c.fillStyle = 'rgba(30,30,60,0.3)';
        c.fillRect(5, 12, 10, 8);
        c.fillRect(3, 16, 14, 4);
        // Arms
        c.fillStyle = 'rgba(20,20,50,0.15)';
        c.fillRect(1, 12, 3, 8);
        c.fillRect(16, 12, 3, 8);
        // Legs
        c.fillStyle = 'rgba(20,20,50,0.2)';
        c.fillRect(5, 20, 4, 6);
        c.fillRect(11, 20, 4, 6);
        // Distortion lines
        c.fillStyle = 'rgba(40,40,100,0.1)';
        c.fillRect(2, 8, 16, 1);
        c.fillRect(2, 16, 16, 1);
        c.fillRect(2, 24, 16, 1);
    });

    // Void corruption puddle — dark sticky trap (32x16)
    mk('void_puddle', 32, 16, (c) => {
        c.imageSmoothingEnabled = false;
        // Puddle shape
        c.fillStyle = 'rgba(10,5,30,0.6)';
        c.beginPath();
        c.ellipse(16, 8, 14, 6, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(20,10,50,0.5)';
        c.beginPath();
        c.ellipse(16, 8, 10, 4, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(30,15,70,0.4)';
        c.beginPath();
        c.ellipse(16, 8, 6, 3, 0, 0, Math.PI * 2);
        c.fill();
        // Swirl energy
        c.fillStyle = 'rgba(60,30,120,0.3)';
        c.fillRect(10, 6, 6, 2);
        c.fillRect(16, 8, 6, 2);
        c.fillRect(12, 8, 4, 2);
        c.fillRect(18, 6, 4, 2);
        // Center glow
        c.fillStyle = 'rgba(80,40,160,0.2)';
        c.fillRect(14, 7, 4, 2);
        c.fillStyle = 'rgba(100,50,200,0.15)';
        c.fillRect(15, 7, 2, 2);
    });

    // Mirror trap — reflective surface that spawns dark copies (48x48)
    mk('mirror_trap', 48, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Frame (obsidian)
        c.fillStyle = '#0a0a14';
        c.fillRect(0, 0, 48, 48);
        c.fillRect(2, 2, 44, 44);
        c.fillStyle = '#141422';
        c.fillRect(4, 4, 40, 40);
        // Mirror surface
        c.fillStyle = '#1a1a28';
        c.fillRect(6, 6, 36, 36);
        c.fillStyle = '#222236';
        c.fillRect(8, 8, 32, 32);
        // Reflection distortion
        c.fillStyle = 'rgba(40,40,80,0.15)';
        c.fillRect(10, 12, 12, 8);
        c.fillRect(26, 18, 10, 10);
        c.fillRect(14, 28, 14, 8);
        c.fillStyle = 'rgba(50,50,100,0.1)';
        c.fillRect(12, 14, 8, 4);
        c.fillRect(28, 20, 6, 6);
        c.fillRect(16, 30, 10, 4);
        // Crack lines
        c.fillStyle = '#2a2a4a';
        c.fillRect(20, 8, 1, 12);
        c.fillRect(20, 24, 1, 12);
        c.fillRect(8, 22, 12, 1);
        c.fillRect(28, 22, 12, 1);
        c.fillRect(20, 22, 1, 1);
        // Corner runes
        c.fillStyle = '#4a2a8a';
        c.fillRect(6, 6, 4, 4);
        c.fillRect(38, 6, 4, 4);
        c.fillRect(6, 38, 4, 4);
        c.fillRect(38, 38, 4, 4);
        c.fillStyle = '#6a4aaa';
        c.fillRect(7, 7, 2, 2);
        c.fillRect(39, 7, 2, 2);
        c.fillRect(7, 39, 2, 2);
        c.fillRect(39, 39, 2, 2);
        // Edge runes
        c.fillStyle = '#4a2a8a';
        c.fillRect(22, 6, 4, 2);
        c.fillRect(22, 40, 4, 2);
        c.fillRect(6, 22, 2, 4);
        c.fillRect(40, 22, 2, 4);
        // Glow
        c.fillStyle = 'rgba(60,30,120,0.1)';
        c.fillRect(8, 8, 32, 32);
    });

    // === THRONE OF ETERNITY — CUTSCENE & UI ===

    // King child — мальчик в короне (32x48)
    mk('king_child', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Golden crown
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 0, 12, 3);
        c.fillRect(10, 0, 2, 5);
        c.fillRect(20, 0, 2, 5);
        c.fillRect(14, 0, 4, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(11, 1, 10, 1);
        c.fillStyle = '#e74c3c';
        c.fillRect(10, 0, 2, 1);
        c.fillRect(20, 0, 2, 1);
        c.fillRect(15, 0, 2, 1);
        // Hair (brown, neat)
        c.fillStyle = '#8b4513';
        c.fillRect(10, 3, 12, 4);
        c.fillRect(8, 5, 16, 4);
        c.fillStyle = '#a0522d';
        c.fillRect(11, 4, 10, 2);
        // Face (young, confident)
        c.fillStyle = '#f5cba7';
        c.fillRect(11, 5, 10, 8);
        c.fillStyle = '#edbb99';
        c.fillRect(12, 6, 8, 6);
        // Eyes (bright, determined)
        c.fillStyle = '#2c3e50';
        c.fillRect(13, 7, 2, 2);
        c.fillRect(17, 7, 2, 2);
        c.fillStyle = '#34495e';
        c.fillRect(13, 7, 1, 1);
        c.fillRect(17, 7, 1, 1);
        // Smile
        c.fillStyle = '#c0392b';
        c.fillRect(14, 10, 4, 1);
        // Royal tunic (rich green with gold)
        c.fillStyle = '#1a7a3a';
        c.fillRect(6, 13, 20, 14);
        c.fillStyle = '#229954';
        c.fillRect(8, 15, 16, 10);
        // Gold trim
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 13, 20, 2);
        c.fillRect(6, 25, 20, 2);
        // Crown emblem
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 18, 4, 4);
        c.fillRect(12, 20, 8, 2);
        // Belt
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 23, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 23, 4, 2);
        // Arms
        c.fillStyle = '#f5cba7';
        c.fillRect(2, 15, 4, 8);
        c.fillRect(26, 15, 4, 8);
        // Cape (royal)
        c.fillStyle = '#1a5c2a';
        c.fillRect(4, 15, 4, 14);
        c.fillRect(24, 15, 4, 14);
        c.fillStyle = '#155723';
        c.fillRect(5, 17, 2, 10);
        c.fillRect(25, 17, 2, 10);
        // Legs
        c.fillStyle = '#5d4037';
        c.fillRect(8, 27, 4, 10);
        c.fillRect(20, 27, 4, 10);
        c.fillStyle = '#4e342e';
        c.fillRect(8, 27, 2, 10);
        c.fillRect(22, 27, 2, 10);
        // Royal boots
        c.fillStyle = '#3e2723';
        c.fillRect(7, 35, 6, 4);
        c.fillRect(19, 35, 6, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(7, 35, 6, 1);
        c.fillRect(19, 35, 6, 1);
        // Scepter (right hand)
        c.fillStyle = '#d4ac0d';
        c.fillRect(28, 8, 2, 20);
        c.fillStyle = '#f1c40f';
        c.fillRect(28, 8, 1, 16);
        // Scepter orb
        c.fillStyle = '#e74c3c';
        c.fillRect(27, 4, 4, 4);
        c.fillStyle = '#ff4444';
        c.fillRect(28, 5, 2, 2);
    });

    // Crowd — толпа жителей (group sprite, 80x30)
    mk('crowd', 80, 30, (c) => {
        c.imageSmoothingEnabled = false;
        // Row of villagers (simplified)
        const colors = ['#3498db', '#e74c3c', '#27ae60', '#8e44ad', '#f39c12', '#e67e22', '#1abc9c', '#c0392b'];
        for (let i = 0; i < 8; i++) {
            const x = i * 10;
            const y = 10;
            // Head
            c.fillStyle = '#f5cba7';
            c.fillRect(x + 3, y, 4, 4);
            // Hair
            c.fillStyle = i % 2 === 0 ? '#8b4513' : '#2c3e50';
            c.fillRect(x + 2, y, 6, 2);
            // Body
            c.fillStyle = colors[i];
            c.fillRect(x + 2, y + 4, 6, 8);
            // Arms raised
            c.fillStyle = colors[i];
            c.fillRect(x + 1, y + 4, 2, 4);
            c.fillRect(x + 7, y + 4, 2, 4);
            // Hands up
            c.fillStyle = '#f5cba7';
            c.fillRect(x + 1, y + 2, 2, 3);
            c.fillRect(x + 7, y + 2, 2, 3);
            // Legs
            c.fillStyle = '#5d4037';
            c.fillRect(x + 3, y + 12, 2, 6);
            c.fillRect(x + 5, y + 12, 2, 6);
        }
    });

    // Firework burst — фейерверк (24x24)
    mk('firework', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        const colors = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#9b59b6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Center burst
        c.fillStyle = color;
        c.fillRect(10, 10, 4, 4);
        c.fillRect(8, 8, 8, 8);
        // Rays
        c.fillStyle = color;
        c.fillRect(11, 2, 2, 8);
        c.fillRect(11, 14, 2, 8);
        c.fillRect(2, 11, 8, 2);
        c.fillRect(14, 11, 8, 2);
        // Diagonal rays
        c.fillRect(4, 4, 4, 4);
        c.fillRect(16, 4, 4, 4);
        c.fillRect(4, 16, 4, 4);
        c.fillRect(16, 16, 4, 4);
        // Sparks
        c.fillStyle = '#fff';
        c.fillRect(11, 2, 2, 2);
        c.fillRect(11, 20, 2, 2);
        c.fillRect(2, 11, 2, 2);
        c.fillRect(20, 11, 2, 2);
        c.fillRect(4, 4, 2, 2);
        c.fillRect(18, 4, 2, 2);
        c.fillRect(4, 18, 2, 2);
        c.fillRect(18, 18, 2, 2);
    });

    // Prestige button — кнопка престижа (120x40)
    mk('prestige_button', 120, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Button background
        c.fillStyle = '#1a1a2a';
        c.fillRect(0, 0, 120, 40);
        c.fillRect(2, 2, 116, 36);
        c.fillStyle = '#2a2a3a';
        c.fillRect(4, 4, 112, 32);
        // Gold border
        c.fillStyle = '#d4ac0d';
        c.fillRect(0, 0, 120, 2);
        c.fillRect(0, 38, 120, 2);
        c.fillRect(0, 0, 2, 40);
        c.fillRect(118, 0, 2, 40);
        c.fillStyle = '#f1c40f';
        c.fillRect(0, 0, 120, 1);
        c.fillRect(0, 39, 120, 1);
        c.fillRect(1, 0, 1, 40);
        c.fillRect(119, 0, 1, 40);
        // Text "PRESTIGE"
        c.fillStyle = '#f1c40f';
        c.fillRect(30, 12, 60, 2);
        c.fillRect(30, 16, 60, 2);
        c.fillRect(30, 20, 60, 2);
        c.fillRect(30, 24, 60, 2);
        c.fillRect(30, 28, 60, 2);
        // Star decorations
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 16, 4, 4);
        c.fillRect(106, 16, 4, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(11, 17, 2, 2);
        c.fillRect(107, 17, 2, 2);
        // Glow
        c.fillStyle = 'rgba(241,196,15,0.1)';
        c.fillRect(4, 4, 112, 32);
    });

    // Prestige confirmation — окно подтверждения (200x150)
    mk('prestige_confirm', 200, 150, (c) => {
        c.imageSmoothingEnabled = false;
        // Background
        c.fillStyle = 'rgba(0,0,0,0.8)';
        c.fillRect(0, 0, 200, 150);
        // Panel
        c.fillStyle = '#1a1a2a';
        c.fillRect(10, 10, 180, 130);
        c.fillStyle = '#2a2a3a';
        c.fillRect(12, 12, 176, 126);
        // Gold border
        c.fillStyle = '#d4ac0d';
        c.fillRect(10, 10, 180, 2);
        c.fillRect(10, 138, 180, 2);
        c.fillRect(10, 10, 2, 130);
        c.fillRect(188, 10, 2, 130);
        // Title area
        c.fillStyle = '#1a1a2a';
        c.fillRect(20, 20, 160, 30);
        c.fillStyle = '#d4ac0d';
        c.fillRect(20, 20, 160, 2);
        c.fillRect(20, 48, 160, 2);
        // Warning icon
        c.fillStyle = '#f1c40f';
        c.fillRect(90, 26, 20, 4);
        c.fillRect(96, 22, 8, 12);
        c.fillRect(96, 38, 8, 4);
        // Buttons
        c.fillStyle = '#27ae60';
        c.fillRect(30, 100, 60, 30);
        c.fillStyle = '#2ecc71';
        c.fillRect(32, 102, 56, 26);
        c.fillStyle = '#c0392b';
        c.fillRect(110, 100, 60, 30);
        c.fillStyle = '#e74c3c';
        c.fillRect(112, 102, 56, 26);
        // Glow
        c.fillStyle = 'rgba(241,196,15,0.05)';
        c.fillRect(12, 12, 176, 126);
    });

    // === MAP ICONS (40x40) ===

    // Village map icon — домик с дымком
    mk('map_village', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Дом
        c.fillStyle = '#8b4513';
        c.fillRect(10, 18, 20, 16);
        c.fillStyle = '#a0522d';
        c.fillRect(12, 20, 16, 12);
        // Крыша
        c.fillStyle = '#c0392b';
        c.fillRect(8, 10, 24, 10);
        c.fillStyle = '#e74c3c';
        c.fillRect(10, 12, 20, 6);
        // Дверь
        c.fillStyle = '#5a3d1a';
        c.fillRect(17, 22, 6, 8);
        c.fillStyle = '#f1c40f';
        c.fillRect(21, 26, 1, 1);
        // Окно
        c.fillStyle = '#f39c12';
        c.fillRect(12, 22, 4, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(13, 23, 2, 2);
        // Дым
        c.fillStyle = 'rgba(150,150,150,0.4)';
        c.fillRect(24, 4, 3, 3);
        c.fillRect(22, 2, 3, 3);
        c.fillRect(26, 1, 2, 2);
        // Трава
        c.fillStyle = '#27ae60';
        c.fillRect(0, 34, 40, 6);
        c.fillStyle = '#2ecc71';
        c.fillRect(2, 35, 4, 3);
        c.fillRect(10, 36, 6, 2);
        c.fillRect(20, 35, 8, 3);
        c.fillRect(32, 36, 6, 2);
    });

    // Depths map icon — череп в темноте
    mk('map_depths', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Тёмный фон
        c.fillStyle = '#0e0e14';
        c.fillRect(0, 0, 40, 40);
        c.fillStyle = '#121218';
        c.fillRect(2, 2, 36, 36);
        // Череп
        c.fillStyle = '#d4c4a4';
        c.fillRect(12, 8, 16, 12);
        c.fillRect(10, 10, 20, 8);
        c.fillStyle = '#e4d4b4';
        c.fillRect(14, 10, 12, 6);
        // Глаза
        c.fillStyle = '#0a0a0f';
        c.fillRect(13, 11, 4, 4);
        c.fillRect(21, 11, 4, 4);
        c.fillStyle = '#ff2200';
        c.fillRect(14, 12, 2, 2);
        c.fillRect(22, 12, 2, 2);
        // Нос
        c.fillStyle = '#0a0a0f';
        c.fillRect(17, 14, 4, 2);
        // Челюсть
        c.fillStyle = '#c4b494';
        c.fillRect(12, 18, 16, 4);
        c.fillStyle = '#0a0a0f';
        c.fillRect(14, 18, 2, 2);
        c.fillRect(18, 18, 2, 2);
        c.fillRect(22, 18, 2, 2);
        // Кости
        c.fillStyle = '#b8a888';
        c.fillRect(6, 28, 8, 2);
        c.fillRect(4, 26, 2, 6);
        c.fillRect(12, 26, 2, 6);
        c.fillRect(26, 28, 8, 2);
        c.fillRect(26, 26, 2, 6);
        c.fillRect(34, 26, 2, 6);
        // Тёмное свечение
        c.fillStyle = 'rgba(255,30,0,0.1)';
        c.beginPath();
        c.arc(20, 14, 15, 0, Math.PI * 2);
        c.fill();
    });

    // Cursed Lands map icon — проклятая земля
    mk('map_cursed', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Тёмная земля
        c.fillStyle = '#0a1a0a';
        c.fillRect(0, 0, 40, 40);
        // Искажённые деревья
        c.fillStyle = '#1a3a1a';
        c.fillRect(8, 10, 4, 20);
        c.fillRect(28, 12, 4, 18);
        c.fillStyle = '#0a2a0a';
        c.fillRect(6, 6, 8, 8);
        c.fillRect(26, 8, 8, 8);
        c.fillRect(10, 4, 4, 4);
        c.fillRect(30, 6, 4, 4);
        // Проклятые цветы
        c.fillStyle = '#cc2244';
        c.fillRect(16, 20, 4, 4);
        c.fillRect(14, 18, 8, 4);
        c.fillStyle = '#ff4466';
        c.fillRect(17, 19, 2, 2);
        // Ядовитые лужи
        c.fillStyle = 'rgba(100,180,60,0.3)';
        c.beginPath();
        c.ellipse(10, 34, 8, 4, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(30, 32, 6, 3, 0, 0, Math.PI * 2);
        c.fill();
        // Фиолетовое свечение
        c.fillStyle = 'rgba(80,20,120,0.15)';
        c.beginPath();
        c.ellipse(20, 20, 18, 18, 0, 0, Math.PI * 2);
        c.fill();
    });

    // Shadow District map icon — зеркальное отражение
    mk('map_shadow', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Тёмный фон
        c.fillStyle = '#050010';
        c.fillRect(0, 0, 40, 40);
        // Зеркало
        c.fillStyle = '#1a1a28';
        c.fillRect(10, 4, 20, 32);
        c.fillStyle = '#222236';
        c.fillRect(12, 6, 16, 28);
        // Отражение ( искажённое)
        c.fillStyle = 'rgba(40,40,80,0.3)';
        c.fillRect(14, 10, 6, 8);
        c.fillRect(20, 14, 4, 10);
        // Трещины
        c.fillStyle = '#2a2a4a';
        c.fillRect(20, 6, 1, 12);
        c.fillRect(14, 18, 8, 1);
        // Руны
        c.fillStyle = '#4a2a8a';
        c.fillRect(12, 6, 3, 3);
        c.fillRect(25, 6, 3, 3);
        c.fillRect(12, 30, 3, 3);
        c.fillRect(25, 30, 3, 3);
        c.fillStyle = '#6a4aaa';
        c.fillRect(13, 7, 1, 1);
        c.fillRect(26, 7, 1, 1);
        // Портал
        c.fillStyle = '#0a0015';
        c.fillRect(16, 16, 8, 12);
        c.fillStyle = '#1a0035';
        c.fillRect(17, 17, 6, 10);
        c.fillStyle = '#3a0068';
        c.fillRect(18, 18, 4, 8);
        // Свечение
        c.fillStyle = 'rgba(100,50,200,0.15)';
        c.beginPath();
        c.arc(20, 20, 16, 0, Math.PI * 2);
        c.fill();
    });

    // Tower map icon — башня
    mk('map_tower', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Башня
        c.fillStyle = '#4a4a52';
        c.fillRect(14, 4, 12, 32);
        c.fillRect(12, 8, 16, 28);
        c.fillStyle = '#5a5a62';
        c.fillRect(16, 6, 8, 30);
        // Окна
        c.fillStyle = '#ff6600';
        c.fillRect(17, 10, 2, 3);
        c.fillRect(21, 10, 2, 3);
        c.fillRect(17, 18, 2, 3);
        c.fillRect(21, 18, 2, 3);
        c.fillRect(17, 26, 2, 3);
        c.fillRect(21, 26, 2, 3);
        // Знамя
        c.fillStyle = '#8b0000';
        c.fillRect(18, 0, 4, 6);
        c.fillRect(16, 0, 8, 3);
        c.fillStyle = '#cc2222';
        c.fillRect(19, 1, 2, 4);
        // Факелы
        c.fillStyle = '#ff6600';
        c.fillRect(10, 14, 2, 3);
        c.fillRect(28, 14, 2, 3);
        c.fillStyle = '#ffaa00';
        c.fillRect(10, 13, 2, 2);
        c.fillRect(28, 13, 2, 2);
        // Основание
        c.fillStyle = '#3a3a42';
        c.fillRect(10, 34, 20, 6);
        c.fillStyle = '#4a4a52';
        c.fillRect(12, 35, 16, 4);
    });

    // Throne map icon — трон
    mk('map_throne', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Золотой фон
        c.fillStyle = 'rgba(200,150,0,0.1)';
        c.fillRect(0, 0, 40, 40);
        // Трон
        c.fillStyle = '#aa8822';
        c.fillRect(10, 8, 20, 24);
        c.fillRect(8, 12, 24, 20);
        c.fillStyle = '#ccaa44';
        c.fillRect(12, 10, 16, 20);
        // Спинка
        c.fillStyle = '#aa8822';
        c.fillRect(12, 4, 16, 8);
        c.fillRect(10, 6, 20, 4);
        c.fillStyle = '#ccaa44';
        c.fillRect(14, 6, 12, 4);
        // Подушки
        c.fillStyle = '#8b0000';
        c.fillRect(12, 14, 16, 6);
        c.fillStyle = '#aa2222';
        c.fillRect(14, 16, 12, 4);
        // Подлокотники
        c.fillStyle = '#aa8822';
        c.fillRect(6, 12, 4, 16);
        c.fillRect(30, 12, 4, 16);
        c.fillStyle = '#ccaa44';
        c.fillRect(7, 14, 2, 12);
        c.fillRect(31, 14, 2, 12);
        // Ножки
        c.fillStyle = '#aa8822';
        c.fillRect(10, 32, 4, 6);
        c.fillRect(26, 32, 4, 6);
        // Свечение
        c.fillStyle = 'rgba(241,196,15,0.15)';
        c.beginPath();
        c.arc(20, 20, 18, 0, Math.PI * 2);
        c.fill();
    });

    // Forest map icon — лес
    mk('map_forest', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Трава
        c.fillStyle = '#1a472a';
        c.fillRect(0, 20, 40, 20);
        c.fillStyle = '#1e5631';
        c.fillRect(0, 22, 40, 18);
        // Деревья
        c.fillStyle = '#3d2b1f';
        c.fillRect(8, 12, 4, 16);
        c.fillRect(28, 14, 4, 14);
        c.fillRect(18, 16, 3, 12);
        c.fillStyle = '#2a5a1a';
        c.fillRect(4, 4, 12, 12);
        c.fillRect(24, 6, 12, 10);
        c.fillRect(14, 8, 10, 10);
        c.fillStyle = '#1e6b31';
        c.fillRect(6, 2, 8, 8);
        c.fillRect(26, 4, 8, 8);
        c.fillRect(16, 6, 6, 6);
        // Листва
        c.fillStyle = '#27ae60';
        c.fillRect(6, 6, 4, 4);
        c.fillRect(28, 8, 4, 4);
        c.fillRect(16, 10, 4, 4);
        // Грибы
        c.fillStyle = '#e74c3c';
        c.fillRect(34, 28, 4, 3);
        c.fillRect(33, 26, 6, 4);
        c.fillStyle = '#fff';
        c.fillRect(35, 27, 2, 1);
    });

    // Castle map icon — замок
    mk('map_castle', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Стены
        c.fillStyle = '#5a5a62';
        c.fillRect(6, 12, 28, 24);
        c.fillRect(4, 16, 32, 20);
        c.fillStyle = '#6a6a72';
        c.fillRect(8, 14, 24, 20);
        // Башни
        c.fillStyle = '#4a4a52';
        c.fillRect(2, 6, 8, 20);
        c.fillRect(30, 6, 8, 20);
        c.fillStyle = '#5a5a62';
        c.fillRect(4, 8, 4, 16);
        c.fillRect(32, 8, 4, 16);
        // Зубцы
        c.fillStyle = '#4a4a52';
        c.fillRect(2, 4, 3, 4);
        c.fillRect(8, 4, 3, 4);
        c.fillRect(30, 4, 3, 4);
        c.fillRect(36, 4, 3, 4);
        // Ворота
        c.fillStyle = '#3a2a1a';
        c.fillRect(15, 22, 10, 14);
        c.fillStyle = '#5a3d1a';
        c.fillRect(16, 24, 8, 10);
        // Флаг
        c.fillStyle = '#2980b9';
        c.fillRect(18, 0, 2, 6);
        c.fillRect(14, 0, 6, 4);
        c.fillStyle = '#3498db';
        c.fillRect(15, 1, 4, 2);
    });

    // === SET ICONS (24x24) ===

    // Bone set icon — череп
    mk('set_bone', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a1a1a';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = '#d4c4a4';
        c.fillRect(6, 4, 12, 8);
        c.fillRect(4, 6, 16, 6);
        c.fillStyle = '#e4d4b4';
        c.fillRect(7, 5, 10, 6);
        c.fillStyle = '#0a0a0f';
        c.fillRect(7, 7, 3, 3);
        c.fillRect(14, 7, 3, 3);
        c.fillStyle = '#ff4400';
        c.fillRect(8, 8, 1, 1);
        c.fillRect(15, 8, 1, 1);
        c.fillStyle = '#0a0a0f';
        c.fillRect(11, 9, 2, 2);
        c.fillStyle = '#c4b494';
        c.fillRect(6, 12, 12, 3);
        c.fillStyle = '#0a0a0f';
        c.fillRect(7, 12, 2, 1);
        c.fillRect(11, 12, 2, 1);
        c.fillRect(15, 12, 2, 1);
        c.fillStyle = '#b8a888';
        c.fillRect(4, 16, 16, 2);
        c.fillRect(10, 14, 2, 6);
        c.fillRect(14, 14, 2, 6);
    });

    // Cursed set icon — проклятый символ
    mk('set_cursed', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a0a0a';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = '#4a0a2a';
        c.beginPath();
        c.arc(12, 12, 10, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#6a1a3a';
        c.beginPath();
        c.arc(12, 12, 8, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#cc2244';
        c.fillRect(10, 6, 4, 12);
        c.fillRect(6, 10, 12, 4);
        c.fillStyle = '#ff4466';
        c.fillRect(11, 7, 2, 10);
        c.fillRect(7, 11, 10, 2);
        c.fillStyle = 'rgba(200,30,60,0.3)';
        c.beginPath();
        c.arc(12, 12, 6, 0, Math.PI * 2);
        c.fill();
    });

    // Shadow set icon — теневое око
    mk('set_shadow', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#0a0a18';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = '#1a1a2a';
        c.fillRect(4, 8, 16, 8);
        c.fillRect(6, 6, 12, 12);
        c.fillStyle = '#2a2a3a';
        c.fillRect(6, 8, 12, 8);
        c.fillRect(8, 6, 8, 12);
        c.fillStyle = '#6a4aaa';
        c.fillRect(9, 9, 6, 6);
        c.fillStyle = '#8a6acc';
        c.fillRect(10, 10, 4, 4);
        c.fillStyle = '#aa8aee';
        c.fillRect(11, 11, 2, 2);
        c.fillStyle = 'rgba(20,10,40,0.5)';
        c.fillRect(2, 10, 4, 4);
        c.fillRect(18, 10, 4, 4);
        c.fillRect(10, 2, 4, 4);
        c.fillRect(10, 18, 4, 4);
    });

    // Tower set icon — силуэт башни
    mk('set_tower', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a1a1a';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = '#5a5a62';
        c.fillRect(8, 4, 8, 16);
        c.fillRect(6, 8, 12, 12);
        c.fillStyle = '#6a6a72';
        c.fillRect(9, 6, 6, 14);
        c.fillStyle = '#ff6600';
        c.fillRect(10, 8, 2, 2);
        c.fillRect(14, 8, 2, 2);
        c.fillRect(10, 14, 2, 2);
        c.fillRect(14, 14, 2, 2);
        c.fillStyle = '#4a4a52';
        c.fillRect(8, 2, 3, 3);
        c.fillRect(13, 2, 3, 3);
        c.fillRect(6, 20, 12, 3);
        c.fillStyle = 'rgba(255,100,0,0.2)';
        c.beginPath();
        c.arc(12, 12, 10, 0, Math.PI * 2);
        c.fill();
    });

    // Eternal set icon — венец вечности
    mk('set_eternal', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#0a0a14';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = '#d4ac0d';
        c.fillRect(6, 8, 12, 4);
        c.fillRect(4, 10, 16, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(8, 6, 8, 4);
        c.fillRect(6, 8, 12, 2);
        c.fillStyle = '#d4ac0d';
        c.fillRect(6, 4, 2, 4);
        c.fillRect(11, 4, 2, 4);
        c.fillRect(16, 4, 2, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(7, 5, 1, 2);
        c.fillRect(12, 5, 1, 2);
        c.fillRect(17, 5, 1, 2);
        c.fillStyle = '#e74c3c';
        c.fillRect(7, 10, 2, 2);
        c.fillRect(11, 10, 2, 2);
        c.fillRect(15, 10, 2, 2);
        c.fillStyle = 'rgba(241,196,15,0.2)';
        c.beginPath();
        c.arc(12, 12, 10, 0, Math.PI * 2);
        c.fill();
    });

    // === ATTACK ANIMATIONS ===

    // Slash — удар мечом (48x48)
    mk('attack_slash', 48, 48, (c) => {
        c.imageSmoothingEnabled = false;
        // Дуга разреза
        c.strokeStyle = 'rgba(255,255,255,0.8)';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(24, 24, 20, -0.8, 1.2);
        c.stroke();
        // Яркий след
        c.strokeStyle = 'rgba(200,220,255,0.9)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(24, 24, 18, -0.6, 1.0);
        c.stroke();
        // Внутренняя дуга
        c.strokeStyle = 'rgba(255,255,255,0.4)';
        c.lineWidth = 1;
        c.beginPath();
        c.arc(24, 24, 14, -0.4, 0.8);
        c.stroke();
        // Частицы
        c.fillStyle = 'rgba(255,255,255,0.6)';
        c.fillRect(30, 8, 2, 2);
        c.fillRect(34, 12, 2, 2);
        c.fillRect(8, 30, 2, 2);
        c.fillRect(36, 20, 2, 2);
    });

    // Arrow — выстрел стрелы (32x8)
    mk('attack_arrow', 32, 8, (c) => {
        c.imageSmoothingEnabled = false;
        // Наконечник
        c.fillStyle = '#95a5a6';
        c.fillRect(24, 2, 6, 4);
        c.fillStyle = '#bdc3c7';
        c.fillRect(26, 3, 4, 2);
        // Стержень
        c.fillStyle = '#8b4513';
        c.fillRect(4, 3, 20, 2);
        c.fillStyle = '#a0522d';
        c.fillRect(4, 3, 18, 1);
        // Оперение
        c.fillStyle = '#e74c3c';
        c.fillRect(0, 2, 4, 2);
        c.fillRect(0, 4, 4, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(1, 3, 2, 1);
        // Хвост
        c.fillStyle = 'rgba(139,69,19,0.4)';
        c.fillRect(0, 3, 6, 2);
    });

    // Spell — заклинание (40x40)
    mk('attack_spell', 40, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Центральная сфера
        c.fillStyle = 'rgba(155,89,182,0.6)';
        c.beginPath();
        c.arc(20, 20, 12, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(186,104,204,0.5)';
        c.beginPath();
        c.arc(20, 20, 8, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(200,150,255,0.7)';
        c.beginPath();
        c.arc(20, 20, 4, 0, Math.PI * 2);
        c.fill();
        // Частицы
        c.fillStyle = 'rgba(186,104,204,0.5)';
        c.fillRect(8, 8, 3, 3);
        c.fillRect(28, 8, 3, 3);
        c.fillRect(8, 28, 3, 3);
        c.fillRect(28, 28, 3, 3);
        c.fillRect(4, 18, 2, 2);
        c.fillRect(34, 18, 2, 2);
        c.fillRect(18, 4, 2, 2);
        c.fillRect(18, 34, 2, 2);
        // Диагональные частицы
        c.fillStyle = 'rgba(200,150,255,0.4)';
        c.fillRect(6, 6, 2, 2);
        c.fillRect(32, 6, 2, 2);
        c.fillRect(6, 32, 2, 2);
        c.fillRect(32, 32, 2, 2);
    });

    // Heal — лечение (32x32)
    mk('attack_heal', 32, 32, (c) => {
        c.imageSmoothingEnabled = false;
        // Частицы вверх
        c.fillStyle = 'rgba(46,204,113,0.5)';
        c.fillRect(12, 4, 3, 3);
        c.fillRect(18, 6, 3, 3);
        c.fillRect(8, 10, 3, 3);
        c.fillRect(22, 8, 3, 3);
        c.fillRect(14, 14, 3, 3);
        c.fillRect(20, 12, 3, 3);
        c.fillStyle = 'rgba(39,174,96,0.6)';
        c.fillRect(14, 2, 4, 4);
        c.fillRect(10, 8, 4, 4);
        c.fillRect(18, 6, 4, 4);
        // Ядро
        c.fillStyle = 'rgba(46,204,113,0.8)';
        c.beginPath();
        c.arc(16, 16, 6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(39,174,96,0.9)';
        c.beginPath();
        c.arc(16, 16, 3, 0, Math.PI * 2);
        c.fill();
        // Крест
        c.fillStyle = 'rgba(255,255,255,0.7)';
        c.fillRect(15, 12, 2, 8);
        c.fillRect(13, 14, 6, 2);
    });

    // Bash — удар щитом (48x24)
    mk('attack_bash', 48, 24, (c) => {
        c.imageSmoothingEnabled = false;
        // Волна от щита
        c.fillStyle = 'rgba(189,195,199,0.4)';
        c.beginPath();
        c.ellipse(24, 12, 20, 8, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(189,195,199,0.6)';
        c.beginPath();
        c.ellipse(24, 12, 14, 6, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(236,240,241,0.7)';
        c.beginPath();
        c.ellipse(24, 12, 8, 4, 0, 0, Math.PI * 2);
        c.fill();
        // Линии волны
        c.strokeStyle = 'rgba(189,195,199,0.5)';
        c.lineWidth = 2;
        c.beginPath();
        c.arc(24, 12, 18, -0.5, 0.5);
        c.stroke();
        c.beginPath();
        c.arc(24, 12, 12, -0.3, 0.3);
        c.stroke();
    });
}
