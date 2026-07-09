export function drawExpansionTextures(mk, textures) {
    // ===== SECRET KEY =====
    mk('item_key', 16, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 2, 4, 8);
        c.fillRect(4, 4, 8, 4);
        c.fillStyle = '#e67e22';
        c.fillRect(7, 3, 2, 6);
        c.fillStyle = '#f39c12';
        c.fillRect(4, 10, 8, 2);
        c.fillRect(2, 10, 2, 4);
        c.fillRect(12, 10, 2, 2);
    });

    // ===== CART DRIVER NPC =====
    mk('npc_cart_driver', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5d4e37';
        c.fillRect(8, 12, 16, 20);
        c.fillStyle = '#4a3b2a';
        c.fillRect(6, 14, 20, 18);
        c.fillRect(4, 20, 24, 10);
        c.fillStyle = '#f5cba7';
        c.fillRect(10, 2, 12, 10);
        c.fillRect(8, 4, 16, 8);
        c.fillStyle = '#2c3e50';
        c.fillRect(12, 6, 3, 3);
        c.fillRect(18, 6, 3, 3);
        c.fillStyle = '#5d4e37';
        c.fillRect(6, 0, 20, 4);
        c.fillRect(4, 2, 24, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 1, 2, 2);
        c.fillStyle = '#5d4e37';
        c.fillRect(10, 32, 5, 14);
        c.fillRect(17, 32, 5, 14);
        c.fillStyle = '#3d2e1a';
        c.fillRect(8, 44, 8, 4);
        c.fillRect(16, 44, 8, 4);
        c.fillStyle = '#5d4e37';
        c.fillRect(2, 16, 6, 12);
        c.fillRect(24, 16, 6, 12);
        c.fillStyle = '#f5cba7';
        c.fillRect(0, 26, 6, 6);
        c.fillRect(26, 26, 6, 6);
    });

    // ===== MEADOW GROUND =====
    mk('meadow_ground', 800, 600, (c) => {
        c.fillStyle = '#2d5a1e';
        c.fillRect(0, 0, 800, 600);
        c.fillStyle = '#3a7a28';
        for (let i = 0; i < 400; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 600, 4, 3);
        }
        c.fillStyle = '#1e4a12';
        for (let i = 0; i < 150; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 600, 3, 5);
        }
        c.fillStyle = '#4a8a35';
        for (let i = 0; i < 80; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 600, 6, 4);
        }
    });

    // ===== MINE GATE =====
    mk('mine_gate', 64, 80, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#555555';
        c.fillRect(0, 0, 64, 80);
        c.fillStyle = '#444444';
        c.fillRect(4, 4, 56, 72);
        c.fillStyle = '#333333';
        c.fillRect(8, 8, 48, 64);
        c.fillStyle = '#666666';
        c.fillRect(0, 0, 4, 80);
        c.fillRect(60, 0, 4, 80);
        c.fillRect(0, 0, 64, 4);
        c.fillRect(0, 76, 64, 4);
        c.fillStyle = '#888888';
        c.fillRect(28, 20, 8, 40);
        c.fillRect(20, 30, 24, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(30, 40, 4, 8);
    });

    // ===== CART RIDE OVERLAY =====
    mk('cart_ride', 800, 600, (c) => {
        c.fillStyle = '#1a0e05';
        c.fillRect(0, 0, 800, 600);
        c.fillStyle = '#2a1a0a';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 800, Math.random() * 600, 3, 2);
        }
    });

    // ===== MINE CART =====
    mk('mine_cart', 36, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8b6914';
        c.fillRect(4, 8, 28, 12);
        c.fillStyle = '#a07818';
        c.fillRect(6, 6, 24, 2);
        c.fillRect(2, 10, 32, 8);
        c.fillStyle = '#6b4f12';
        c.fillRect(4, 18, 28, 4);
        c.fillStyle = '#555';
        c.fillRect(8, 22, 6, 4);
        c.fillRect(22, 22, 6, 4);
        c.fillStyle = '#888';
        c.fillRect(9, 23, 4, 2);
        c.fillRect(23, 23, 4, 2);
        c.fillStyle = '#7a5c10';
        c.fillRect(10, 10, 16, 6);
        c.fillStyle = '#c0a030';
        c.fillRect(12, 11, 4, 4);
        c.fillRect(20, 11, 4, 4);
    });

    // ===== CAVE GROUND =====
    mk('cave_ground', 500, 1200, (c) => {
        c.fillStyle = '#1a1a1a';
        c.fillRect(0, 0, 500, 1200);
        c.fillStyle = '#222222';
        for (let i = 0; i < 600; i++) {
            c.fillRect(Math.random() * 500, Math.random() * 1200, 3, 2);
        }
        c.fillStyle = '#111111';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 500, Math.random() * 1200, 4, 3);
        }
        c.fillStyle = '#2a2a2a';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 500, Math.random() * 1200, 2, 5);
        }
    });

    // ===== CAVE CHEST =====
    mk('cave_chest', 20, 18, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5d4e37';
        c.fillRect(2, 6, 16, 10);
        c.fillStyle = '#4a3b2a';
        c.fillRect(3, 7, 14, 8);
        c.fillStyle = '#8b6914';
        c.fillRect(2, 4, 16, 3);
        c.fillRect(1, 3, 18, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(8, 8, 4, 4);
        c.fillStyle = '#c8a82e';
        c.fillRect(9, 9, 2, 2);
        c.fillStyle = '#3d2e1a';
        c.fillRect(4, 16, 4, 2);
        c.fillRect(12, 16, 4, 2);
    });
    mk('cave_chest_open', 20, 18, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5d4e37';
        c.fillRect(2, 8, 16, 8);
        c.fillStyle = '#4a3b2a';
        c.fillRect(3, 9, 14, 6);
        c.fillStyle = '#8b6914';
        c.fillRect(2, 2, 16, 6);
        c.fillRect(1, 1, 18, 2);
        c.fillStyle = '#2c1810';
        c.fillRect(4, 10, 12, 4);
        c.fillStyle = '#3d2e1a';
        c.fillRect(4, 16, 4, 2);
        c.fillRect(12, 16, 4, 2);
    });

    // ===== CAVE SPIDER =====
    mk('cave_spider', 16, 14, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#4a2d6e';
        c.fillRect(4, 4, 8, 6);
        c.fillStyle = '#3a1d5e';
        c.fillRect(3, 3, 10, 8);
        c.fillStyle = '#e74c3c';
        c.fillRect(5, 5, 2, 2);
        c.fillRect(9, 5, 2, 2);
        c.fillStyle = '#2d1b4e';
        c.fillRect(1, 2, 3, 2);
        c.fillRect(12, 2, 3, 2);
        c.fillRect(1, 8, 3, 2);
        c.fillRect(12, 8, 3, 2);
        c.fillRect(3, 10, 2, 4);
        c.fillRect(6, 10, 2, 4);
        c.fillRect(8, 10, 2, 4);
        c.fillRect(11, 10, 2, 4);
    });
    // Cave spider walk spritesheet (4 frames)
    (() => {
        const fw = 16, fh = 14, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const lo = (f % 2 === 0) ? 0 : 1;
            ctx.fillStyle = '#4a2d6e';
            ctx.fillRect(ox + 4, 4, 8, 6);
            ctx.fillStyle = '#3a1d5e';
            ctx.fillRect(ox + 3, 3, 10, 8);
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(ox + 5, 5, 2, 2);
            ctx.fillRect(ox + 9, 5, 2, 2);
            ctx.fillStyle = '#2d1b4e';
            ctx.fillRect(ox + 1, 2, 3, 2);
            ctx.fillRect(ox + 12, 2, 3, 2);
            ctx.fillRect(ox + 1, 8, 3, 2);
            ctx.fillRect(ox + 12, 8, 3, 2);
            ctx.fillRect(ox + 3, 10 - lo, 2, 4 + lo);
            ctx.fillRect(ox + 6, 10 - lo, 2, 4 + lo);
            ctx.fillRect(ox + 8, 10 - lo, 2, 4 + lo);
            ctx.fillRect(ox + 11, 10 - lo, 2, 4 + lo);
        }
        textures.addSpriteSheet('cave_spider_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    // ===== CAVE BAT =====
    mk('cave_bat', 14, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2c2c3e';
        c.fillRect(5, 3, 4, 5);
        c.fillStyle = '#1c1c2e';
        c.fillRect(4, 2, 6, 7);
        c.fillStyle = '#e74c3c';
        c.fillRect(5, 3, 1, 1);
        c.fillRect(8, 3, 1, 1);
        c.fillStyle = '#3c3c4e';
        c.fillRect(0, 2, 4, 6);
        c.fillRect(10, 2, 4, 6);
        c.fillStyle = '#4c4c5e';
        c.fillRect(1, 1, 2, 4);
        c.fillRect(11, 1, 2, 4);
        c.fillStyle = '#f5cba7';
        c.fillRect(6, 8, 2, 3);
        c.fillRect(7, 9, 2, 2);
    });
    // Cave bat walk spritesheet (4 frames)
    (() => {
        const fw = 14, fh = 12, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = (f % 2 === 0);
            ctx.fillStyle = '#2c2c3e';
            ctx.fillRect(ox + 5, 3, 4, 5);
            ctx.fillStyle = '#1c1c2e';
            ctx.fillRect(ox + 4, 2, 6, 7);
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(ox + 5, 3, 1, 1);
            ctx.fillRect(ox + 8, 3, 1, 1);
            ctx.fillStyle = '#3c3c4e';
            ctx.fillRect(ox + 0, wUp ? 0 : 2, 4, 6);
            ctx.fillRect(ox + 10, wUp ? 0 : 2, 4, 6);
            ctx.fillStyle = '#4c4c5e';
            ctx.fillRect(ox + 1, wUp ? 0 : 1, 2, 4);
            ctx.fillRect(ox + 11, wUp ? 0 : 1, 2, 4);
            ctx.fillStyle = '#f5cba7';
            ctx.fillRect(ox + 6, 8, 2, 3);
            ctx.fillRect(ox + 7, 9, 2, 2);
        }
        textures.addSpriteSheet('cave_bat_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    // ===== STONE GOLEM (Tank) =====
    mk('stone_golem', 22, 26, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#666666';
        c.fillRect(6, 0, 10, 10);
        c.fillStyle = '#777777';
        c.fillRect(7, 1, 8, 8);
        c.fillStyle = '#ff4444';
        c.fillRect(8, 3, 2, 2);
        c.fillRect(12, 3, 2, 2);
        c.fillStyle = '#555555';
        c.fillRect(4, 10, 14, 12);
        c.fillStyle = '#666666';
        c.fillRect(5, 11, 12, 10);
        c.fillStyle = '#444444';
        c.fillRect(0, 12, 4, 8);
        c.fillRect(18, 12, 4, 8);
        c.fillStyle = '#777777';
        c.fillRect(1, 14, 2, 4);
        c.fillRect(19, 14, 2, 4);
        c.fillStyle = '#555555';
        c.fillRect(6, 22, 4, 4);
        c.fillRect(12, 22, 4, 4);
    });
    // Stone golem walk spritesheet (4 frames)
    (() => {
        const fw = 22, fh = 26, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const step = (f % 2 === 0) ? 0 : 2;
            ctx.fillStyle = '#666666';
            ctx.fillRect(ox + 6, 0, 10, 10);
            ctx.fillStyle = '#777777';
            ctx.fillRect(ox + 7, 1, 8, 8);
            ctx.fillStyle = '#ff4444';
            ctx.fillRect(ox + 8, 3, 2, 2);
            ctx.fillRect(ox + 12, 3, 2, 2);
            ctx.fillStyle = '#555555';
            ctx.fillRect(ox + 4, 10, 14, 12);
            ctx.fillStyle = '#666666';
            ctx.fillRect(ox + 5, 11, 12, 10);
            ctx.fillStyle = '#444444';
            ctx.fillRect(ox + 0, 12 - step, 4, 8);
            ctx.fillRect(ox + 18, 12 - step, 4, 8);
            ctx.fillStyle = '#777777';
            ctx.fillRect(ox + 1, 14 - step, 2, 4);
            ctx.fillRect(ox + 19, 14 - step, 2, 4);
            ctx.fillStyle = '#555555';
            ctx.fillRect(ox + 6, 22 + step, 4, 4);
            ctx.fillRect(ox + 12, 22 + step, 4, 4);
        }
        textures.addSpriteSheet('stone_golem_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    // ===== EARTH WORM (Tank) =====
    mk('earth_worm', 24, 18, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a7a3a';
        c.fillRect(4, 4, 16, 10);
        c.fillStyle = '#6a8a4a';
        c.fillRect(6, 5, 12, 8);
        c.fillStyle = '#ffcc00';
        c.fillRect(7, 6, 2, 2);
        c.fillRect(15, 6, 2, 2);
        c.fillStyle = '#4a6a2a';
        c.fillRect(2, 6, 2, 6);
        c.fillRect(20, 6, 2, 6);
        c.fillStyle = '#3a5a1a';
        c.fillRect(0, 8, 3, 4);
        c.fillRect(21, 8, 3, 4);
        c.fillStyle = '#7a9a5a';
        c.fillRect(8, 14, 8, 4);
        c.fillRect(10, 16, 4, 2);
    });
    // Earth worm walk spritesheet (4 frames)
    (() => {
        const fw = 24, fh = 18, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const w = (f % 2 === 0) ? 0 : 1;
            ctx.fillStyle = '#5a7a3a';
            ctx.fillRect(ox + 4, 4 - w, 16, 10);
            ctx.fillStyle = '#6a8a4a';
            ctx.fillRect(ox + 6, 5 - w, 12, 8);
            ctx.fillStyle = '#ffcc00';
            ctx.fillRect(ox + 7, 6 - w, 2, 2);
            ctx.fillRect(ox + 15, 6 - w, 2, 2);
            ctx.fillStyle = '#4a6a2a';
            ctx.fillRect(ox + 2, 6, 2, 6);
            ctx.fillRect(ox + 20, 6, 2, 6);
            ctx.fillStyle = '#3a5a1a';
            ctx.fillRect(ox + 0, 8, 3, 4);
            ctx.fillRect(ox + 21, 8, 3, 4);
            ctx.fillStyle = '#7a9a5a';
            ctx.fillRect(ox + 8, 14 + w, 8, 4);
            ctx.fillRect(ox + 10, 16 + w, 4, 2);
        }
        textures.addSpriteSheet('earth_worm_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    // ===== GIANT BAT (Boss) =====
    mk('giant_bat', 48, 36, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2c1a3e';
        c.fillRect(16, 10, 16, 14);
        c.fillStyle = '#3c2a4e';
        c.fillRect(18, 12, 12, 10);
        c.fillStyle = '#ff0000';
        c.fillRect(20, 14, 3, 3);
        c.fillRect(27, 14, 3, 3);
        c.fillStyle = '#cc0000';
        c.fillRect(22, 19, 6, 2);
        c.fillStyle = '#1a0a2e';
        c.fillRect(20, 8, 8, 4);
        c.fillRect(22, 6, 4, 2);
        c.fillStyle = '#4c3a5e';
        c.fillRect(0, 8, 16, 16);
        c.fillRect(32, 8, 16, 16);
        c.fillStyle = '#5c4a6e';
        c.fillRect(2, 10, 12, 12);
        c.fillRect(34, 10, 12, 12);
        c.fillStyle = '#3c2a4e';
        c.fillRect(0, 12, 2, 8);
        c.fillRect(46, 12, 2, 8);
        c.fillStyle = '#6c5a7e';
        c.fillRect(1, 14, 1, 4);
        c.fillRect(47, 14, 1, 4);
        c.fillStyle = '#1a0a2e';
        c.fillRect(18, 24, 12, 8);
        c.fillStyle = '#f5cba7';
        c.fillRect(22, 28, 2, 3);
        c.fillRect(26, 28, 2, 3);
    });
    // Giant bat walk spritesheet (4 frames)
    (() => {
        const fw = 48, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = (f % 2 === 0);
            ctx.fillStyle = '#2c1a3e';
            ctx.fillRect(ox + 16, 10, 16, 14);
            ctx.fillStyle = '#3c2a4e';
            ctx.fillRect(ox + 18, 12, 12, 10);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(ox + 20, 14, 3, 3);
            ctx.fillRect(ox + 27, 14, 3, 3);
            ctx.fillStyle = '#cc0000';
            ctx.fillRect(ox + 22, 19, 6, 2);
            ctx.fillStyle = '#1a0a2e';
            ctx.fillRect(ox + 20, 8, 8, 4);
            ctx.fillRect(ox + 22, 6, 4, 2);
            ctx.fillStyle = '#4c3a5e';
            ctx.fillRect(ox + 0, wUp ? 4 : 8, 16, 16);
            ctx.fillRect(ox + 32, wUp ? 4 : 8, 16, 16);
            ctx.fillStyle = '#5c4a6e';
            ctx.fillRect(ox + 2, wUp ? 6 : 10, 12, 12);
            ctx.fillRect(ox + 34, wUp ? 6 : 10, 12, 12);
            ctx.fillStyle = '#3c2a4e';
            ctx.fillRect(ox + 0, wUp ? 10 : 12, 2, 8);
            ctx.fillRect(ox + 46, wUp ? 10 : 12, 2, 8);
            ctx.fillStyle = '#1a0a2e';
            ctx.fillRect(ox + 18, 24, 12, 8);
            ctx.fillStyle = '#f5cba7';
            ctx.fillRect(ox + 22, 28, 2, 3);
            ctx.fillRect(ox + 26, 28, 2, 3);
        }
        textures.addSpriteSheet('giant_bat_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    // ===== SMALL BAT (Summoned Add) =====
    mk('small_bat', 18, 14, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#3c1a4e';
        c.fillRect(6, 4, 6, 6);
        c.fillStyle = '#4c2a5e';
        c.fillRect(7, 5, 4, 4);
        c.fillStyle = '#ff4444';
        c.fillRect(8, 5, 1, 1);
        c.fillRect(10, 5, 1, 1);
        c.fillStyle = '#5c3a6e';
        c.fillRect(0, 3, 6, 7);
        c.fillRect(12, 3, 6, 7);
        c.fillStyle = '#6c4a7e';
        c.fillRect(1, 4, 4, 5);
        c.fillRect(13, 4, 4, 5);
        c.fillStyle = '#3c1a4e';
        c.fillRect(8, 10, 4, 4);
    });
    // Small bat walk spritesheet (4 frames)
    (() => {
        const fw = 18, fh = 14, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = (f % 2 === 0);
            ctx.fillStyle = '#3c1a4e';
            ctx.fillRect(ox + 6, 4, 6, 6);
            ctx.fillStyle = '#4c2a5e';
            ctx.fillRect(ox + 7, 5, 4, 4);
            ctx.fillStyle = '#ff4444';
            ctx.fillRect(ox + 8, 5, 1, 1);
            ctx.fillRect(ox + 10, 5, 1, 1);
            ctx.fillStyle = '#5c3a6e';
            ctx.fillRect(ox + 0, wUp ? 1 : 3, 6, 7);
            ctx.fillRect(ox + 12, wUp ? 1 : 3, 6, 7);
            ctx.fillStyle = '#6c4a7e';
            ctx.fillRect(ox + 1, wUp ? 2 : 4, 4, 5);
            ctx.fillRect(ox + 13, wUp ? 2 : 4, 4, 5);
            ctx.fillStyle = '#3c1a4e';
            ctx.fillRect(ox + 8, 10, 4, 4);
        }
        textures.addSpriteSheet('small_bat_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    // ===== CAVE STAIRS =====
    mk('cave_stairs', 32, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#555555';
        c.fillRect(2, 0, 28, 24);
        c.fillStyle = '#666666';
        c.fillRect(4, 2, 24, 4);
        c.fillRect(6, 8, 20, 4);
        c.fillRect(8, 14, 16, 4);
        c.fillRect(10, 20, 12, 4);
        c.fillStyle = '#777777';
        c.fillRect(5, 3, 22, 2);
        c.fillRect(7, 9, 18, 2);
        c.fillRect(9, 15, 14, 2);
        c.fillRect(11, 21, 10, 2);
    });

    // ===== VILLAGE =====
    mk('village_ground', 700, 2500, (c) => {
        c.fillStyle = '#2a1f14';
        c.fillRect(0, 0, 700, 2000);
        c.fillStyle = '#352a1e';
        for (let i = 0; i < 800; i++) {
            c.fillRect(Math.random() * 700, Math.random() * 2000, 3, 2);
        }
        c.fillStyle = '#1f170f';
        for (let i = 0; i < 300; i++) {
            c.fillRect(Math.random() * 700, Math.random() * 2000, 4, 3);
        }
        c.fillStyle = '#4a3d2e';
        for (let i = 0; i < 150; i++) {
            c.fillRect(Math.random() * 700, Math.random() * 2000, 2, 4);
        }
        c.fillStyle = '#3a3530';
        c.fillRect(0, 2000, 700, 500);
        c.fillStyle = '#2a2520';
        for (let i = 0; i < 200; i++) {
            c.fillRect(Math.random() * 700, 2000 + Math.random() * 500, 3, 2);
        }
        c.fillStyle = '#4a4540';
        for (let i = 0; i < 100; i++) {
            c.fillRect(Math.random() * 700, 2000 + Math.random() * 500, 2, 3);
        }
        c.fillStyle = '#555';
        for (let y = 1950; y < 2010; y += 4) {
            c.fillRect(300, y, 100, 2);
        }
    });

    mk('village_house', 60, 50, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5c3a1e';
        c.fillRect(5, 18, 50, 30);
        c.fillStyle = '#7a4f2e';
        c.fillRect(8, 20, 44, 26);
        c.fillStyle = '#8b4513';
        c.beginPath();
        c.moveTo(0, 18);
        c.lineTo(30, 0);
        c.lineTo(60, 18);
        c.fill();
        c.fillStyle = '#4a2a10';
        c.fillRect(24, 32, 12, 16);
        c.fillStyle = '#6b8cff';
        c.fillRect(10, 24, 10, 10);
        c.fillRect(40, 24, 10, 10);
        c.fillStyle = '#88ccff';
        c.fillRect(12, 26, 6, 6);
        c.fillRect(42, 26, 6, 6);
    });

    mk('village_barrel', 18, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b4226';
        c.fillRect(3, 4, 12, 16);
        c.fillStyle = '#8b5a2b';
        c.fillRect(4, 5, 10, 14);
        c.fillStyle = '#555';
        c.fillRect(2, 6, 14, 2);
        c.fillRect(2, 14, 14, 2);
        c.fillStyle = '#444';
        c.fillRect(3, 7, 12, 1);
        c.fillRect(3, 15, 12, 1);
    });

    mk('village_barrel_open', 18, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b4226';
        c.fillRect(3, 4, 12, 16);
        c.fillStyle = '#8b5a2b';
        c.fillRect(4, 5, 10, 14);
        c.fillStyle = '#555';
        c.fillRect(2, 6, 14, 2);
        c.fillRect(2, 14, 14, 2);
        c.fillStyle = '#3a2a10';
        c.fillRect(5, 2, 8, 4);
    });

    mk('village_corpse', 16, 10, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#7a5a3a';
        c.fillRect(2, 2, 12, 6);
        c.fillStyle = '#5a3a1a';
        c.fillRect(4, 0, 4, 4);
        c.fillStyle = '#8b0000';
        c.fillRect(6, 5, 4, 3);
    });

    mk('village_garden', 30, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#3a2a10';
        c.fillRect(0, 0, 30, 20);
        c.fillStyle = '#2d5a1e';
        for (let i = 0; i < 5; i++) {
            c.fillRect(3 + i * 6, 4, 4, 12);
        }
        c.fillStyle = '#4a8a2e';
        for (let i = 0; i < 5; i++) {
            c.fillRect(4 + i * 6, 6, 2, 4);
        }
    });

    mk('village_fence', 40, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b5a3a';
        c.fillRect(0, 4, 40, 3);
        c.fillStyle = '#7a6a4a';
        c.fillRect(2, 0, 3, 12);
        c.fillRect(18, 0, 3, 12);
        c.fillRect(35, 0, 3, 12);
    });

    mk('village_road', 200, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8b7355';
        c.fillRect(0, 0, 200, 20);
        c.fillStyle = '#9a8265';
        c.fillRect(10, 4, 180, 12);
        c.fillStyle = '#a89070';
        c.fillRect(20, 7, 160, 6);
    });

    mk('child_npc', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Head
        c.fillStyle = '#ffcc88';
        c.fillRect(8, 2, 8, 8);
        c.fillRect(6, 4, 12, 4);
        // Eyes
        c.fillStyle = '#2c3e50';
        c.fillRect(9, 5, 2, 2);
        c.fillRect(13, 5, 2, 2);
        // Mouth
        c.fillStyle = '#c0392b';
        c.fillRect(10, 8, 4, 1);
        // Body (shirt)
        c.fillStyle = '#e74c3c';
        c.fillRect(7, 10, 10, 10);
        c.fillRect(5, 12, 14, 6);
        // Arms
        c.fillStyle = '#ffcc88';
        c.fillRect(4, 11, 3, 6);
        c.fillRect(17, 11, 3, 6);
        // Legs
        c.fillStyle = '#2980b9';
        c.fillRect(7, 20, 4, 6);
        c.fillRect(13, 20, 4, 6);
        // Shoes
        c.fillStyle = '#2c3e50';
        c.fillRect(6, 24, 5, 3);
        c.fillRect(13, 24, 5, 3);
    });

    // Village enemy spritesheets
    const villageEnemyDefs = [
        { key: 'village_brute', w: 20, bh: 22, body: '#6b2020', head: '#8b3030', detail: '#4a1010', eyes: '#ff0000' },
        { key: 'village_stalker', w: 14, bh: 14, body: '#2a2a4a', head: '#3a3a5a', detail: '#1a1a3a', eyes: '#ff4444' },
        { key: 'village_spitter', w: 16, bh: 16, body: '#3a5a2a', head: '#4a6a3a', detail: '#2a4a1a', eyes: '#ffff00' },
        { key: 'village_curser', w: 14, bh: 18, body: '#5a2a5a', head: '#6a3a6a', detail: '#3a1a3a', eyes: '#ff00ff' }
    ];

    villageEnemyDefs.forEach(def => {
        (() => {
            const fw = def.w, fh = def.bh, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                ctx.fillStyle = def.body;
                ctx.fillRect(ox + 3, wUp ? 4 : 5, fw - 6, fh - 8);
                ctx.fillStyle = def.head;
                ctx.fillRect(ox + 4, wUp ? 1 : 2, fw - 8, 6);
                ctx.fillStyle = def.eyes;
                ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
                ctx.fillRect(ox + fw - 7, wUp ? 2 : 3, 2, 2);
                ctx.fillStyle = def.detail;
                ctx.fillRect(ox + 2, wUp ? 2 : 3, 3, 4);
                ctx.fillRect(ox + fw - 5, wUp ? 2 : 3, 3, 4);
                ctx.fillStyle = def.body;
                ctx.fillRect(ox + 4, fh - 4, 3, 4);
                ctx.fillRect(ox + fw - 7, fh - 4, 3, 4);
            }
            textures.addSpriteSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        mk(def.key, def.w, def.bh, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = def.body;
            c.fillRect(3, 4, def.w - 6, def.bh - 8);
            c.fillStyle = def.head;
            c.fillRect(4, 1, def.w - 8, 6);
            c.fillStyle = def.eyes;
            c.fillRect(5, 2, 2, 2);
            c.fillRect(def.w - 7, 2, 2, 2);
            c.fillStyle = def.detail;
            c.fillRect(2, 2, 3, 4);
            c.fillRect(def.w - 5, 2, 3, 4);
        });
    });

    // Zombie minion spritesheet
    (() => {
        const fw = 14, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = f % 2 === 0;
            ctx.fillStyle = '#4a5a3a';
            ctx.fillRect(ox + 3, wUp ? 4 : 5, 8, 10);
            ctx.fillStyle = '#5a6a4a';
            ctx.fillRect(ox + 4, wUp ? 1 : 2, 6, 5);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
            ctx.fillRect(ox + 7, wUp ? 2 : 3, 2, 2);
            ctx.fillStyle = '#3a4a2a';
            ctx.fillRect(ox + 4, fh - 4, 3, 4);
            ctx.fillRect(ox + 7, fh - 4, 3, 4);
        }
        textures.addSpriteSheet('zombie_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();
    mk('zombie', 14, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#4a5a3a';
        c.fillRect(3, 4, 8, 10);
        c.fillStyle = '#5a6a4a';
        c.fillRect(4, 1, 6, 5);
        c.fillStyle = '#ff0000';
        c.fillRect(5, 2, 2, 2);
        c.fillRect(7, 2, 2, 2);
    });

    // Purple Demon spritesheet
    (() => {
        const fw = 40, fh = 44, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = f % 2 === 0;
            ctx.fillStyle = '#6a2080';
            ctx.fillRect(ox + 10, wUp ? 10 : 12, 20, 28);
            ctx.fillStyle = '#8a30a0';
            ctx.fillRect(ox + 12, wUp ? 4 : 6, 16, 12);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(ox + 14, wUp ? 6 : 8, 4, 4);
            ctx.fillRect(ox + 22, wUp ? 6 : 8, 4, 4);
            ctx.fillStyle = '#aa40c0';
            ctx.fillRect(ox + 16, wUp ? 0 : 2, 4, 6);
            ctx.fillRect(ox + 20, wUp ? 0 : 2, 4, 6);
            ctx.fillRect(ox + 24, wUp ? 1 : 3, 3, 5);
            ctx.fillStyle = '#5a1070';
            ctx.fillRect(ox + 8, wUp ? 14 : 16, 4, 14);
            ctx.fillRect(ox + 28, wUp ? 14 : 16, 4, 14);
            ctx.fillStyle = '#7a2090';
            ctx.fillRect(ox + 6, wUp ? 16 : 18, 4, 10);
            ctx.fillRect(ox + 30, wUp ? 16 : 18, 4, 10);
            ctx.fillStyle = '#4a1060';
            ctx.fillRect(ox + 14, fh - 6, 5, 6);
            ctx.fillRect(ox + 21, fh - 6, 5, 6);
        }
        textures.addSpriteSheet('purple_demon_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();
    mk('purple_demon', 40, 44, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6a2080';
        c.fillRect(10, 10, 20, 28);
        c.fillStyle = '#8a30a0';
        c.fillRect(12, 4, 16, 12);
        c.fillStyle = '#ff0000';
        c.fillRect(14, 6, 4, 4);
        c.fillRect(22, 6, 4, 4);
        c.fillStyle = '#aa40c0';
        c.fillRect(16, 0, 4, 6);
        c.fillRect(20, 0, 4, 6);
        c.fillRect(24, 1, 3, 5);
        c.fillStyle = '#5a1070';
        c.fillRect(8, 14, 4, 14);
        c.fillRect(28, 14, 4, 14);
        c.fillStyle = '#7a2090';
        c.fillRect(6, 16, 4, 10);
        c.fillRect(30, 16, 4, 10);
        c.fillStyle = '#4a1060';
        c.fillRect(14, 38, 5, 6);
        c.fillRect(21, 38, 5, 6);
    });

    mk('meteor_vfx', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#ff4400';
        c.beginPath();
        c.arc(10, 10, 8, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffaa00';
        c.beginPath();
        c.arc(10, 10, 5, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffff00';
        c.beginPath();
        c.arc(10, 10, 2, 0, Math.PI * 2);
        c.fill();
    });

    mk('cemetery_entrance', 100, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#555';
        c.fillRect(0, 0, 100, 16);
        c.fillStyle = '#666';
        c.fillRect(10, 0, 6, 16);
        c.fillRect(44, 0, 12, 16);
        c.fillRect(84, 0, 6, 16);
        c.fillStyle = '#777';
        c.fillRect(11, 1, 4, 14);
        c.fillRect(45, 1, 10, 14);
        c.fillRect(85, 1, 4, 14);
    });

    // === HELL ZONE TEXTURES ===

    // Hell ground tile (lava + dark rock)
    mk('hell_ground', 64, 64, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#1a0500';
        c.fillRect(0, 0, 64, 64);
        c.fillStyle = '#330800';
        c.fillRect(0, 0, 32, 32);
        c.fillRect(32, 32, 32, 32);
        c.fillStyle = '#ff2200';
        c.fillRect(8, 8, 4, 4);
        c.fillRect(40, 20, 6, 3);
        c.fillRect(20, 44, 5, 5);
        c.fillRect(50, 50, 3, 3);
        c.fillStyle = '#cc1100';
        c.fillRect(10, 10, 2, 2);
        c.fillRect(42, 22, 3, 2);
        c.fillStyle = '#220600';
        c.fillRect(0, 28, 64, 8);
        c.fillRect(28, 0, 8, 64);
    });

    // Hell lava circle (for hazard zones)
    mk('hell_lava_circle', 80, 80, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#ff3300';
        c.beginPath();
        c.arc(40, 40, 36, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ff6600';
        c.beginPath();
        c.arc(40, 40, 28, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffaa00';
        c.beginPath();
        c.arc(40, 40, 18, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffdd44';
        c.beginPath();
        c.arc(40, 40, 8, 0, Math.PI * 2);
        c.fill();
    });

    // Hell portal (fiery rift)
    mk('hell_portal', 60, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Outer dark burned edges
        c.fillStyle = '#1a0a0a';
        c.fillRect(0, 0, 60, 28);
        c.fillStyle = '#2a0a00';
        c.fillRect(2, 2, 56, 24);
        // Cracked stone rim
        c.fillStyle = '#3a1500';
        c.fillRect(4, 3, 8, 4);
        c.fillRect(48, 3, 8, 4);
        c.fillRect(3, 10, 4, 8);
        c.fillRect(53, 10, 4, 8);
        c.fillRect(6, 20, 8, 4);
        c.fillRect(46, 20, 8, 4);
        // Deep fiery void
        c.fillStyle = '#ff2200';
        c.fillRect(8, 6, 44, 16);
        c.fillStyle = '#ff4400';
        c.fillRect(10, 7, 40, 14);
        c.fillStyle = '#ff6600';
        c.fillRect(12, 8, 36, 12);
        c.fillStyle = '#ff8800';
        c.fillRect(14, 9, 32, 10);
        c.fillStyle = '#ffaa00';
        c.fillRect(16, 10, 28, 8);
        c.fillStyle = '#ffcc00';
        c.fillRect(18, 11, 24, 6);
        c.fillStyle = '#ffdd44';
        c.fillRect(20, 12, 20, 4);
        c.fillStyle = '#ffee88';
        c.fillRect(22, 13, 16, 2);
        c.fillStyle = '#ffffff';
        c.fillRect(24, 13, 12, 2);
        // Lava drip effect
        c.fillStyle = '#ff4400';
        c.fillRect(14, 18, 3, 4);
        c.fillRect(42, 19, 3, 3);
        c.fillStyle = '#ff6600';
        c.fillRect(30, 20, 4, 3);
        // Outer glow hints
        c.fillStyle = '#ff3300';
        c.fillRect(2, 6, 2, 2);
        c.fillRect(56, 6, 2, 2);
        c.fillRect(2, 18, 2, 2);
        c.fillRect(56, 18, 2, 2);
    });

    // Hell enemy spritesheets
    const hellEnemyDefs = [
        { key: 'hell_guard',   w: 22, bh: 24, body: '#8b1a1a', head: '#a02020', detail: '#601010', eyes: '#ff4400' },
        { key: 'hell_stalker', w: 14, bh: 14, body: '#2a1a3a', head: '#3a2a4a', detail: '#1a0a2a', eyes: '#ff00ff' },
        { key: 'hell_archer',  w: 16, bh: 16, body: '#5a3a1a', head: '#6a4a2a', detail: '#4a2a0a', eyes: '#ffff00' },
        { key: 'hell_mage',    w: 14, bh: 18, body: '#4a1a5a', head: '#5a2a6a', detail: '#3a0a4a', eyes: '#ff00ff' },
        { key: 'hell_priest',  w: 14, bh: 18, body: '#6a2a2a', head: '#7a3a3a', detail: '#5a1a1a', eyes: '#ffffff' }
    ];

    hellEnemyDefs.forEach(def => {
        (() => {
            const fw = def.w, fh = def.bh, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                ctx.fillStyle = def.body;
                ctx.fillRect(ox + 3, wUp ? 4 : 5, fw - 6, fh - 8);
                ctx.fillStyle = def.head;
                ctx.fillRect(ox + 4, wUp ? 1 : 2, fw - 8, 6);
                ctx.fillStyle = def.eyes;
                ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
                ctx.fillRect(ox + fw - 7, wUp ? 2 : 3, 2, 2);
                ctx.fillStyle = def.detail;
                ctx.fillRect(ox + 2, wUp ? 2 : 3, 3, 4);
                ctx.fillRect(ox + fw - 5, wUp ? 2 : 3, 3, 4);
                ctx.fillStyle = def.body;
                ctx.fillRect(ox + 4, fh - 4, 3, 4);
                ctx.fillRect(ox + fw - 7, fh - 4, 3, 4);
            }
            textures.addSpriteSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        mk(def.key, def.w, def.bh, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = def.body;
            c.fillRect(3, 4, def.w - 6, def.bh - 8);
            c.fillStyle = def.head;
            c.fillRect(4, 1, def.w - 8, 6);
            c.fillStyle = def.eyes;
            c.fillRect(5, 2, 2, 2);
            c.fillRect(def.w - 7, 2, 2, 2);
            c.fillStyle = def.detail;
            c.fillRect(2, 2, 3, 4);
            c.fillRect(def.w - 5, 2, 3, 4);
        });
    });

    // Hell Imp minion spritesheet
    (() => {
        const fw = 12, fh = 14, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = f % 2 === 0;
            ctx.fillStyle = '#aa2200';
            ctx.fillRect(ox + 2, wUp ? 3 : 4, 8, 8);
            ctx.fillStyle = '#cc3300';
            ctx.fillRect(ox + 3, wUp ? 1 : 2, 6, 4);
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(ox + 4, wUp ? 2 : 3, 1, 1);
            ctx.fillRect(ox + 7, wUp ? 2 : 3, 1, 1);
            ctx.fillStyle = '#881100';
            ctx.fillRect(ox + 3, fh - 3, 2, 3);
            ctx.fillRect(ox + 7, fh - 3, 2, 3);
        }
        textures.addSpriteSheet('hell_imp_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();
    mk('hell_imp', 12, 14, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#aa2200';
        c.fillRect(2, 3, 8, 8);
        c.fillStyle = '#cc3300';
        c.fillRect(3, 1, 6, 4);
        c.fillStyle = '#ffff00';
        c.fillRect(4, 2, 1, 1);
        c.fillRect(7, 2, 1, 1);
    });

    // Red Demon boss spritesheet
    (() => {
        const fw = 44, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = f % 2 === 0;
            // Body
            ctx.fillStyle = '#991111';
            ctx.fillRect(ox + 12, wUp ? 12 : 14, 20, 28);
            // Head
            ctx.fillStyle = '#bb2222';
            ctx.fillRect(ox + 14, wUp ? 4 : 6, 16, 12);
            // Eyes
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(ox + 16, wUp ? 6 : 8, 4, 4);
            ctx.fillRect(ox + 24, wUp ? 6 : 8, 4, 4);
            // Horns
            ctx.fillStyle = '#dd3333';
            ctx.fillRect(ox + 18, wUp ? 0 : 2, 4, 6);
            ctx.fillRect(ox + 22, wUp ? 0 : 2, 4, 6);
            ctx.fillRect(ox + 26, wUp ? 1 : 3, 3, 5);
            // Arms
            ctx.fillStyle = '#770000';
            ctx.fillRect(ox + 8, wUp ? 14 : 16, 4, 14);
            ctx.fillRect(ox + 32, wUp ? 14 : 16, 4, 14);
            // Hands
            ctx.fillStyle = '#aa1111';
            ctx.fillRect(ox + 6, wUp ? 16 : 18, 4, 10);
            ctx.fillRect(ox + 34, wUp ? 16 : 18, 4, 10);
            // Legs
            ctx.fillStyle = '#660000';
            ctx.fillRect(ox + 16, fh - 6, 5, 6);
            ctx.fillRect(ox + 23, fh - 6, 5, 6);
        }
        textures.addSpriteSheet('red_demon_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();
    mk('red_demon', 44, 48, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#991111';
        c.fillRect(12, 12, 20, 28);
        c.fillStyle = '#bb2222';
        c.fillRect(14, 4, 16, 12);
        c.fillStyle = '#ffff00';
        c.fillRect(16, 6, 4, 4);
        c.fillRect(24, 6, 4, 4);
        c.fillStyle = '#dd3333';
        c.fillRect(18, 0, 4, 6);
        c.fillRect(22, 0, 4, 6);
        c.fillRect(26, 1, 3, 5);
        c.fillStyle = '#770000';
        c.fillRect(8, 14, 4, 14);
        c.fillRect(32, 14, 4, 14);
        c.fillStyle = '#aa1111';
        c.fillRect(6, 16, 4, 10);
        c.fillRect(34, 16, 4, 10);
        c.fillStyle = '#660000';
        c.fillRect(16, 42, 5, 6);
        c.fillRect(23, 42, 5, 6);
    });

    // Fire wave VFX
    mk('fire_wave_vfx', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#ff4400';
        c.beginPath();
        c.arc(12, 12, 10, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ff8800';
        c.beginPath();
        c.arc(12, 12, 6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffcc00';
        c.beginPath();
        c.arc(12, 12, 3, 0, Math.PI * 2);
        c.fill();
    });

    // ===== TRAP: SPIKES =====
    mk('trap_spikes', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = 'rgba(80, 60, 50, 0.6)';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = '#3a2a1a';
        c.fillRect(2, 16, 4, 8);
        c.fillRect(8, 12, 4, 12);
        c.fillRect(14, 10, 4, 14);
        c.fillRect(20, 14, 4, 10);
        c.fillStyle = '#5a4a3a';
        c.fillRect(3, 14, 2, 2);
        c.fillRect(9, 10, 2, 2);
        c.fillRect(15, 8, 2, 2);
        c.fillRect(21, 12, 2, 2);
        c.fillStyle = '#2a1a0a';
        c.fillRect(0, 20, 24, 4);
        c.fillStyle = '#4a3a2a';
        c.fillRect(4, 18, 2, 2);
        c.fillRect(10, 16, 2, 2);
        c.fillRect(16, 14, 2, 2);
    });

    // ===== TRAP: POISON =====
    mk('trap_poison', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = 'rgba(30, 80, 30, 0.4)';
        c.fillRect(0, 0, 24, 24);
        c.fillStyle = 'rgba(40, 120, 40, 0.6)';
        c.beginPath();
        c.ellipse(12, 14, 10, 7, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(60, 160, 60, 0.5)';
        c.beginPath();
        c.ellipse(10, 12, 5, 4, 0, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(80, 200, 80, 0.7)';
        c.beginPath();
        c.arc(8, 11, 2, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(14, 13, 1.5, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(11, 9, 1, 0, Math.PI * 2);
        c.fill();
    });

    // ===== GOLD PILE =====
    mk('gold_pile', 12, 10, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#b8860b';
        c.fillRect(1, 4, 10, 6);
        c.fillStyle = '#daa520';
        c.fillRect(2, 3, 8, 5);
        c.fillStyle = '#ffd700';
        c.fillRect(3, 2, 6, 4);
        c.fillRect(4, 1, 4, 3);
        c.fillStyle = '#ffec8b';
        c.fillRect(5, 2, 2, 2);
        c.fillRect(3, 3, 1, 1);
        c.fillRect(7, 3, 1, 1);
        c.fillStyle = '#b8860b';
        c.fillRect(2, 7, 8, 2);
    });

    // ===== TREASURE CHEST =====
    mk('treasure_chest', 24, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b4226';
        c.fillRect(2, 8, 20, 10);
        c.fillStyle = '#8b5a2b';
        c.fillRect(3, 9, 18, 8);
        c.fillStyle = '#a0722a';
        c.fillRect(2, 4, 20, 5);
        c.fillRect(1, 3, 22, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 10, 4, 4);
        c.fillStyle = '#c8a82e';
        c.fillRect(11, 11, 2, 2);
        c.fillStyle = '#4a2a10';
        c.fillRect(4, 17, 4, 3);
        c.fillRect(16, 17, 4, 3);
        c.fillStyle = '#555';
        c.fillRect(11, 5, 2, 4);
    });

    // ===== DEAD VILLAGE TEXTURES =====

    mk('village_house_dead', 60, 50, (c) => {
        c.imageSmoothingEnabled = false;
        // Broken walls
        c.fillStyle = '#3a2510';
        c.fillRect(5, 18, 50, 30);
        c.fillStyle = '#4a3018';
        c.fillRect(8, 20, 44, 26);
        // Damaged roof with hole
        c.fillStyle = '#5a3520';
        c.beginPath();
        c.moveTo(0, 18);
        c.lineTo(30, 0);
        c.lineTo(60, 18);
        c.fill();
        c.fillStyle = '#2a1a0a';
        c.fillRect(22, 6, 16, 12); // hole in roof
        // Broken door
        c.fillStyle = '#2a1a0a';
        c.fillRect(24, 32, 12, 16);
        c.fillRect(28, 34, 4, 12); // crack
        // Dark windows (no glow)
        c.fillStyle = '#1a1020';
        c.fillRect(10, 24, 10, 10);
        c.fillRect(40, 24, 10, 10);
        // Cracks
        c.fillStyle = '#2a1508';
        c.fillRect(15, 22, 2, 18);
        c.fillRect(42, 28, 2, 14);
        // Cobwebs
        c.fillStyle = 'rgba(200,200,200,0.3)';
        c.fillRect(6, 18, 8, 6);
        c.fillRect(46, 18, 8, 6);
    });

    mk('dead_tree', 20, 40, (c) => {
        c.imageSmoothingEnabled = false;
        // Trunk
        c.fillStyle = '#3a2a1a';
        c.fillRect(8, 10, 4, 30);
        c.fillStyle = '#4a3a2a';
        c.fillRect(9, 12, 2, 26);
        // Bare branches
        c.fillStyle = '#3a2a1a';
        c.fillRect(2, 8, 8, 2);
        c.fillRect(10, 6, 8, 2);
        c.fillRect(4, 4, 4, 2);
        c.fillRect(12, 2, 6, 2);
        c.fillRect(0, 12, 6, 2);
        c.fillRect(14, 10, 6, 2);
        // Broken branch
        c.fillRect(6, 0, 2, 4);
        c.fillRect(16, 0, 2, 3);
    });

    mk('village_corpse', 16, 10, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3a1a';
        c.fillRect(2, 2, 12, 6);
        c.fillStyle = '#4a2a10';
        c.fillRect(4, 0, 4, 4);
        c.fillStyle = '#6a1a1a';
        c.fillRect(2, 6, 12, 4);
        c.fillStyle = '#4a0a0a';
        c.fillRect(4, 7, 8, 3);
    });

    mk('broken_fence', 40, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#4a3a2a';
        c.fillRect(2, 4, 36, 3);
        c.fillStyle = '#5a4a3a';
        c.fillRect(4, 2, 2, 10);
        c.fillRect(18, 3, 2, 9);
        c.fillRect(32, 1, 2, 11);
        // Broken parts
        c.fillStyle = '#3a2a1a';
        c.fillRect(10, 0, 2, 5);
        c.fillRect(26, 0, 2, 4);
        c.fillRect(36, 2, 4, 3);
    });

    mk('village_garden_dead', 30, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2a1a10';
        c.fillRect(0, 0, 30, 20);
        c.fillStyle = '#3a2a18';
        c.fillRect(2, 2, 26, 16);
        // Dead withered crops
        c.fillStyle = '#4a3a20';
        c.fillRect(4, 6, 2, 10);
        c.fillRect(10, 4, 2, 12);
        c.fillRect(16, 8, 2, 8);
        c.fillRect(22, 5, 2, 11);
        c.fillRect(28, 7, 2, 9);
    });

    // ===== RESTORED VILLAGE TEXTURES =====

    mk('village_house_red', 60, 50, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b3a2a';
        c.fillRect(5, 18, 50, 30);
        c.fillStyle = '#8b5a3a';
        c.fillRect(8, 20, 44, 26);
        // Red roof
        c.fillStyle = '#c0392b';
        c.beginPath();
        c.moveTo(0, 18);
        c.lineTo(30, 0);
        c.lineTo(60, 18);
        c.fill();
        c.fillStyle = '#e74c3c';
        c.fillRect(10, 12, 40, 4);
        c.fillRect(18, 6, 24, 4);
        // Door
        c.fillStyle = '#4a2a10';
        c.fillRect(24, 32, 12, 16);
        c.fillStyle = '#f1c40f';
        c.fillRect(33, 40, 2, 2); // doorknob
        // Windows with warm glow
        c.fillStyle = '#f39c12';
        c.fillRect(10, 24, 10, 10);
        c.fillRect(40, 24, 10, 10);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 26, 6, 6);
        c.fillRect(42, 26, 6, 6);
    });

    mk('village_house_green', 60, 50, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2a4a2a';
        c.fillRect(5, 18, 50, 30);
        c.fillStyle = '#3a5a3a';
        c.fillRect(8, 20, 44, 26);
        // Green roof
        c.fillStyle = '#27ae60';
        c.beginPath();
        c.moveTo(0, 18);
        c.lineTo(30, 0);
        c.lineTo(60, 18);
        c.fill();
        c.fillStyle = '#2ecc71';
        c.fillRect(10, 12, 40, 4);
        c.fillRect(18, 6, 24, 4);
        // Door
        c.fillStyle = '#3a2a10';
        c.fillRect(24, 32, 12, 16);
        c.fillStyle = '#f1c40f';
        c.fillRect(33, 40, 2, 2);
        // Windows
        c.fillStyle = '#f39c12';
        c.fillRect(10, 24, 10, 10);
        c.fillRect(40, 24, 10, 10);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 26, 6, 6);
        c.fillRect(42, 26, 6, 6);
    });

    mk('village_house_blue', 60, 50, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2a3a5a';
        c.fillRect(5, 18, 50, 30);
        c.fillStyle = '#3a4a6a';
        c.fillRect(8, 20, 44, 26);
        // Blue roof
        c.fillStyle = '#2980b9';
        c.beginPath();
        c.moveTo(0, 18);
        c.lineTo(30, 0);
        c.lineTo(60, 18);
        c.fill();
        c.fillStyle = '#3498db';
        c.fillRect(10, 12, 40, 4);
        c.fillRect(18, 6, 24, 4);
        // Door
        c.fillStyle = '#2a2a3a';
        c.fillRect(24, 32, 12, 16);
        c.fillStyle = '#f1c40f';
        c.fillRect(33, 40, 2, 2);
        // Windows
        c.fillStyle = '#f39c12';
        c.fillRect(10, 24, 10, 10);
        c.fillRect(40, 24, 10, 10);
        c.fillStyle = '#f1c40f';
        c.fillRect(12, 26, 6, 6);
        c.fillRect(42, 26, 6, 6);
    });

    mk('village_fountain', 40, 36, (c) => {
        c.imageSmoothingEnabled = false;
        // Base pool
        c.fillStyle = '#7f8c8d';
        c.fillRect(2, 26, 36, 10);
        c.fillStyle = '#95a5a6';
        c.fillRect(4, 28, 32, 6);
        // Water
        c.fillStyle = '#3498db';
        c.fillRect(6, 28, 28, 4);
        c.fillStyle = '#5dade2';
        c.fillRect(8, 29, 24, 2);
        // Pillar
        c.fillStyle = '#bdc3c7';
        c.fillRect(17, 8, 6, 20);
        c.fillStyle = '#d5dbdb';
        c.fillRect(18, 10, 4, 16);
        // Top bowl
        c.fillStyle = '#95a5a6';
        c.fillRect(12, 6, 16, 4);
        c.fillStyle = '#bdc3c7';
        c.fillRect(14, 4, 12, 4);
        // Water spout
        c.fillStyle = '#85c1e9';
        c.fillRect(18, 0, 4, 6);
        c.fillStyle = '#aed6f1';
        c.fillRect(19, 1, 2, 4);
    });

    mk('village_path', 200, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8b7355';
        c.fillRect(0, 2, 200, 20);
        c.fillStyle = '#9a8265';
        c.fillRect(0, 4, 200, 16);
        c.fillStyle = '#a89070';
        c.fillRect(0, 6, 200, 12);
        // Stones
        c.fillStyle = '#7a6a55';
        for (let i = 0; i < 8; i++) {
            c.fillRect(10 + i * 24, 10 + Math.random() * 6, 4, 3);
        }
    });

    mk('village_lantern', 10, 20, (c) => {
        c.imageSmoothingEnabled = false;
        // Post
        c.fillStyle = '#5a4a3a';
        c.fillRect(4, 8, 2, 12);
        // Lamp housing
        c.fillStyle = '#4a3a2a';
        c.fillRect(1, 4, 8, 6);
        c.fillStyle = '#5a4a3a';
        c.fillRect(2, 2, 6, 2);
        // Light
        c.fillStyle = '#f39c12';
        c.fillRect(3, 5, 4, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(4, 6, 2, 2);
    });

    mk('village_crop', 20, 16, (c) => {
        c.imageSmoothingEnabled = false;
        // Soil
        c.fillStyle = '#5a4a30';
        c.fillRect(0, 10, 20, 6);
        c.fillStyle = '#6a5a40';
        c.fillRect(1, 11, 18, 4);
        // Carrots
        c.fillStyle = '#e67e22';
        c.fillRect(3, 6, 3, 8);
        c.fillRect(10, 4, 3, 10);
        c.fillRect(17, 7, 3, 7);
        // Green tops
        c.fillStyle = '#27ae60';
        c.fillRect(2, 2, 5, 5);
        c.fillRect(9, 0, 5, 5);
        c.fillRect(16, 3, 5, 5);
        c.fillStyle = '#2ecc71';
        c.fillRect(3, 1, 3, 4);
        c.fillRect(10, 0, 3, 3);
        c.fillRect(17, 2, 3, 4);
    });

    mk('villager_dancer', 14, 18, (c) => {
        c.imageSmoothingEnabled = false;
        // Head
        c.fillStyle = '#f5cba7';
        c.fillRect(4, 0, 6, 6);
        c.fillStyle = '#5d4037';
        c.fillRect(4, 0, 6, 2); // hair
        c.fillStyle = '#2c3e50';
        c.fillRect(5, 2, 2, 2); // eyes
        c.fillRect(7, 2, 2, 2);
        // Body
        c.fillStyle = '#e74c3c';
        c.fillRect(3, 6, 8, 6);
        c.fillStyle = '#c0392b';
        c.fillRect(4, 7, 6, 4);
        // Arms (dancing pose)
        c.fillStyle = '#f5cba7';
        c.fillRect(0, 5, 3, 2);
        c.fillRect(11, 5, 3, 2);
        // Legs
        c.fillStyle = '#2980b9';
        c.fillRect(4, 12, 3, 6);
        c.fillRect(8, 12, 3, 6);
        c.fillStyle = '#2c3e50';
        c.fillRect(4, 16, 3, 2);
        c.fillRect(8, 16, 3, 2);
    });
}
