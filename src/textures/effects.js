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
}
