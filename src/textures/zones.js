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
}
