export function drawSnowyTextures(mk, textures) {
    const addSheet = (key, canvas, config) => {
        if (!textures.exists(key)) textures.addSpriteSheet(key, canvas, config);
    };
    mk('snow_ground', 64, 64, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#c8d8e8';
        c.fillRect(0, 0, 64, 64);
        c.fillStyle = '#b0c4d8';
        for (let i = 0; i < 40; i++) {
            c.fillRect(Math.random() * 64, Math.random() * 64, 3, 2);
        }
        c.fillStyle = '#dde8f0';
        for (let i = 0; i < 20; i++) {
            c.fillRect(Math.random() * 64, Math.random() * 64, 2, 3);
        }
        c.fillStyle = '#a0b8cc';
        for (let i = 0; i < 15; i++) {
            c.fillRect(Math.random() * 64, Math.random() * 64, 4, 1);
        }
    });

    mk('snow_house', 60, 50, (c) => {
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
        // Snow on roof
        c.fillStyle = '#e8f0f8';
        c.fillRect(2, 16, 56, 4);
        c.fillRect(8, 12, 44, 4);
        c.fillRect(14, 8, 32, 4);
        c.fillRect(20, 4, 20, 4);
        c.fillStyle = '#ffffff';
        c.fillRect(4, 14, 52, 2);
        c.fillRect(10, 10, 40, 2);
        c.fillRect(16, 6, 28, 2);
        // Windows and door
        c.fillStyle = '#4a2a10';
        c.fillRect(24, 32, 12, 16);
        c.fillStyle = '#88ccff';
        c.fillRect(10, 24, 10, 10);
        c.fillRect(40, 24, 10, 10);
        c.fillStyle = '#aaddff';
        c.fillRect(12, 26, 6, 6);
        c.fillRect(42, 26, 6, 6);
    });

    mk('snowy_barrel', 18, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b4a2a';
        c.fillRect(3, 4, 12, 16);
        c.fillStyle = '#8b6a3a';
        c.fillRect(4, 5, 10, 14);
        c.fillStyle = '#555';
        c.fillRect(2, 8, 14, 2);
        c.fillRect(2, 14, 14, 2);
        // Snow on top
        c.fillStyle = '#e8f0f8';
        c.fillRect(2, 2, 14, 4);
        c.fillStyle = '#fff';
        c.fillRect(4, 1, 10, 2);
    });

    mk('snowy_barrel_open', 18, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6b4a2a';
        c.fillRect(3, 6, 12, 14);
        c.fillStyle = '#8b6a3a';
        c.fillRect(4, 7, 10, 12);
        c.fillStyle = '#555';
        c.fillRect(2, 10, 14, 2);
        c.fillRect(2, 15, 14, 2);
        c.fillStyle = '#4a3a20';
        c.fillRect(3, 6, 12, 2);
    });

    mk('campfire', 24, 30, (c) => {
        c.imageSmoothingEnabled = false;
        // Stones
        c.fillStyle = '#666';
        c.fillRect(2, 22, 20, 8);
        c.fillStyle = '#888';
        c.fillRect(4, 20, 16, 4);
        // Logs
        c.fillStyle = '#5c3a1e';
        c.fillRect(6, 16, 12, 6);
        c.fillRect(8, 14, 8, 4);
        // Ice on top
        c.fillStyle = '#a0d0f0';
        c.fillRect(8, 10, 8, 6);
        c.fillStyle = '#c0e0ff';
        c.fillRect(10, 8, 4, 4);
    });

    mk('campfire_active', 24, 30, (c) => {
        c.imageSmoothingEnabled = false;
        // Stones
        c.fillStyle = '#666';
        c.fillRect(2, 22, 20, 8);
        c.fillStyle = '#888';
        c.fillRect(4, 20, 16, 4);
        // Logs
        c.fillStyle = '#5c3a1e';
        c.fillRect(6, 16, 12, 6);
        c.fillRect(8, 14, 8, 4);
        // Flames
        c.fillStyle = '#ff4400';
        c.fillRect(8, 6, 8, 10);
        c.fillStyle = '#ff8800';
        c.fillRect(9, 4, 6, 8);
        c.fillStyle = '#ffcc00';
        c.fillRect(10, 2, 4, 6);
        c.fillStyle = '#ffff88';
        c.fillRect(11, 0, 2, 4);
    });

    mk('warmth_core', 14, 14, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#ff6600';
        c.beginPath();
        c.arc(7, 7, 6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffaa00';
        c.beginPath();
        c.arc(7, 7, 4, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#ffdd44';
        c.beginPath();
        c.arc(7, 7, 2, 0, Math.PI * 2);
        c.fill();
    });

    mk('ice_shard', 10, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#80c0e0';
        c.fillRect(2, 0, 6, 12);
        c.fillStyle = '#a0d8f0';
        c.fillRect(3, 1, 4, 10);
        c.fillStyle = '#c0eaff';
        c.fillRect(4, 2, 2, 8);
    });

    // Ice Shard walk spritesheet (4 frames)
    (() => {
        const fw = 10, fh = 12, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wUp = f % 2 === 0;
            ctx.fillStyle = '#80c0e0';
            ctx.fillRect(ox + 2, wUp ? 0 : 1, 6, 11);
            ctx.fillStyle = '#a0d8f0';
            ctx.fillRect(ox + 3, wUp ? 1 : 2, 4, 9);
            ctx.fillStyle = '#c0eaff';
            ctx.fillRect(ox + 4, wUp ? 2 : 3, 2, 7);
        }
        addSheet('ice_shard_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    mk('frost_wave_vfx', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#4488cc';
        c.beginPath();
        c.arc(12, 12, 10, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#66aaee';
        c.beginPath();
        c.arc(12, 12, 6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#88ccff';
        c.beginPath();
        c.arc(12, 12, 3, 0, Math.PI * 2);
        c.fill();
    });

    mk('blizzard_vfx', 32, 32, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = 'rgba(100,180,255,0.3)';
        c.beginPath();
        c.arc(16, 16, 14, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(150,210,255,0.4)';
        c.beginPath();
        c.arc(16, 16, 10, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = 'rgba(200,230,255,0.5)';
        c.beginPath();
        c.arc(16, 16, 5, 0, Math.PI * 2);
        c.fill();
    });

    // Winter enemy spritesheets — 5 types
    const winterEnemyDefs = [
        { key: 'ice_golem',    w: 44, bh: 48, body: '#4488aa', head: '#5599bb', detail: '#336688', eyes: '#00ffff', accent: '#66bbdd' },
        { key: 'frost_wraith', w: 28, bh: 32, body: '#334466', head: '#445577', detail: '#223355', eyes: '#88ccff', accent: '#556688' },
        { key: 'snow_wolf',    w: 36, bh: 32, body: '#ccdde8', head: '#ddeeff', detail: '#aabbcc', eyes: '#4488cc', accent: '#eeffff' },
        { key: 'ice_elemental', w: 28, bh: 36, body: '#2266aa', head: '#3377bb', detail: '#115599', eyes: '#00ddff', accent: '#4488cc' },
        { key: 'frost_mage',   w: 28, bh: 36, body: '#2a3a5a', head: '#3a4a6a', detail: '#1a2a4a', eyes: '#88ccff', accent: '#4a5a7a' }
    ];

    winterEnemyDefs.forEach(def => {
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
                const bob = wUp ? 0 : 2;
                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(ox + fw/2 - 8, fh - 4, 16, 4);
                // Legs
                ctx.fillStyle = def.detail;
                ctx.fillRect(ox + fw/2 - 8, fh - 10 + bob, 6, 10);
                ctx.fillRect(ox + fw/2 + 2, fh - 10 + bob, 6, 10);
                // Body
                ctx.fillStyle = def.body;
                ctx.fillRect(ox + 6, 14 + bob, fw - 12, fh - 26);
                ctx.fillStyle = def.accent;
                ctx.fillRect(ox + 8, 16 + bob, fw - 16, fh - 30);
                // Arms
                ctx.fillStyle = def.body;
                ctx.fillRect(ox + 2, 16 + bob, 6, 14);
                ctx.fillRect(ox + fw - 8, 16 + bob, 6, 14);
                // Head
                ctx.fillStyle = def.head;
                ctx.fillRect(ox + fw/2 - 7, 2 + bob, 14, 12);
                ctx.fillStyle = def.accent;
                ctx.fillRect(ox + fw/2 - 5, 4 + bob, 10, 8);
                // Eyes
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(ox + fw/2 - 5, 5 + bob, 4, 4);
                ctx.fillRect(ox + fw/2 + 1, 5 + bob, 4, 4);
                ctx.fillStyle = def.eyes;
                ctx.fillRect(ox + fw/2 - 4, 6 + bob, 2, 2);
                ctx.fillRect(ox + fw/2 + 2, 6 + bob, 2, 2);
                // Mouth
                ctx.fillStyle = def.detail;
                ctx.fillRect(ox + fw/2 - 2, 10 + bob, 4, 2);
            }
            addSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        mk(def.key, def.w, def.bh, (c) => {
            c.imageSmoothingEnabled = false;
            // Shadow
            c.fillStyle = 'rgba(0,0,0,0.3)';
            c.fillRect(def.w/2 - 8, def.bh - 4, 16, 4);
            // Legs
            c.fillStyle = def.detail;
            c.fillRect(def.w/2 - 8, def.bh - 10, 6, 10);
            c.fillRect(def.w/2 + 2, def.bh - 10, 6, 10);
            // Body
            c.fillStyle = def.body;
            c.fillRect(6, 14, def.w - 12, def.bh - 26);
            c.fillStyle = def.accent;
            c.fillRect(8, 16, def.w - 16, def.bh - 30);
            // Arms
            c.fillStyle = def.body;
            c.fillRect(2, 16, 6, 14);
            c.fillRect(def.w - 8, 16, 6, 14);
            // Head
            c.fillStyle = def.head;
            c.fillRect(def.w/2 - 7, 2, 14, 12);
            c.fillStyle = def.accent;
            c.fillRect(def.w/2 - 5, 4, 10, 8);
            // Eyes
            c.fillStyle = '#ffffff';
            c.fillRect(def.w/2 - 5, 5, 4, 4);
            c.fillRect(def.w/2 + 1, 5, 4, 4);
            c.fillStyle = def.eyes;
            c.fillRect(def.w/2 - 4, 6, 2, 2);
            c.fillRect(def.w/2 + 2, 6, 2, 2);
        });
    });

    // Ice Spirit boss — 40x44 spritesheet
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
            // Body
            ctx.fillStyle = '#2266aa';
            ctx.fillRect(ox + 10, wUp ? 12 : 14, 20, 24);
            ctx.fillStyle = '#3388cc';
            ctx.fillRect(ox + 12, wUp ? 14 : 16, 16, 20);
            // Head
            ctx.fillStyle = '#44aaee';
            ctx.fillRect(ox + 12, wUp ? 2 : 4, 16, 12);
            ctx.fillStyle = '#66ccff';
            ctx.fillRect(ox + 14, wUp ? 4 : 6, 12, 8);
            // Eyes
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ox + 15, wUp ? 5 : 6, 4, 4);
            ctx.fillRect(ox + 23, wUp ? 5 : 6, 4, 4);
            ctx.fillStyle = '#00aaff';
            ctx.fillRect(ox + 16, wUp ? 6 : 7, 2, 2);
            ctx.fillRect(ox + 24, wUp ? 6 : 7, 2, 2);
            // Crown/icicles
            ctx.fillStyle = '#88ddff';
            ctx.fillRect(ox + 14, wUp ? 0 : 1, 3, 4);
            ctx.fillRect(ox + 19, wUp ? 0 : 1, 2, 3);
            ctx.fillRect(ox + 23, wUp ? 0 : 1, 3, 4);
            // Arms
            ctx.fillStyle = '#2266aa';
            ctx.fillRect(ox + 4, wUp ? 16 : 18, 6, 18);
            ctx.fillRect(ox + 30, wUp ? 16 : 18, 6, 18);
            // Hands
            ctx.fillStyle = '#44aaee';
            ctx.fillRect(ox + 2, wUp ? 18 : 20, 4, 10);
            ctx.fillRect(ox + 34, wUp ? 18 : 20, 4, 10);
            // Legs
            ctx.fillStyle = '#115599';
            ctx.fillRect(ox + 14, fh - 6, 5, 6);
            ctx.fillRect(ox + 21, fh - 6, 5, 6);
        }
        addSheet('ice_spirit_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();

    mk('ice_spirit', 40, 44, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2266aa';
        c.fillRect(10, 12, 20, 24);
        c.fillStyle = '#3388cc';
        c.fillRect(12, 14, 16, 20);
        c.fillStyle = '#44aaee';
        c.fillRect(12, 2, 16, 12);
        c.fillStyle = '#66ccff';
        c.fillRect(14, 4, 12, 8);
        c.fillStyle = '#ffffff';
        c.fillRect(15, 5, 4, 4);
        c.fillRect(23, 5, 4, 4);
        c.fillStyle = '#00aaff';
        c.fillRect(16, 6, 2, 2);
        c.fillRect(24, 6, 2, 2);
        c.fillStyle = '#88ddff';
        c.fillRect(14, 0, 3, 4);
        c.fillRect(19, 0, 2, 3);
        c.fillRect(23, 0, 3, 4);
        c.fillStyle = '#2266aa';
        c.fillRect(4, 16, 6, 18);
        c.fillRect(30, 16, 6, 18);
        c.fillStyle = '#44aaee';
        c.fillRect(2, 18, 4, 10);
        c.fillRect(34, 18, 4, 10);
        c.fillStyle = '#115599';
        c.fillRect(14, 38, 5, 6);
        c.fillRect(21, 38, 5, 6);
    });
}
