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
}
