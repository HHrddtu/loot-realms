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
}
