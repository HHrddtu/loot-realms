export function generateAnimations(textures) {
    const addSheet = (key, canvas, config) => {
        if (!textures.exists(key)) textures.addSpriteSheet(key, canvas, config);
    };
    function _genSageWalk() {
        const fw = 32, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Hat (детализированная)
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 4, 16, 4);
            c.fillRect(ox + 6, bob + 8, 20, 4);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 4, bob + 12, 24, 2);
            c.fillRect(ox + 12, bob + 2, 8, 2);
            c.fillRect(ox + 10, bob + 6, 12, 2);
            // Star
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 1, 4, 2);
            c.fillRect(ox + 12, bob + 2, 2, 2);
            c.fillRect(ox + 18, bob + 2, 2, 2);
            // Face
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 10, bob + 14, 12, 8);
            c.fillRect(ox + 8, bob + 16, 16, 6);
            // Wrinkles
            c.fillStyle = '#c4b494';
            c.fillRect(ox + 11, bob + 17, 2, 1);
            c.fillRect(ox + 17, bob + 17, 2, 1);
            c.fillRect(ox + 12, bob + 20, 8, 1);
            // Eyes
            c.fillStyle = '#7b68ee';
            c.fillRect(ox + 12, bob + 16, 2, 2);
            c.fillRect(ox + 18, bob + 16, 2, 2);
            c.fillStyle = '#9b8bff';
            c.fillRect(ox + 12, bob + 16, 1, 1);
            c.fillRect(ox + 18, bob + 16, 1, 1);
            // Beard (with strands)
            c.fillStyle = '#9e9e9e';
            c.fillRect(ox + 12, bob + 20, 8, 4);
            c.fillRect(ox + 10, bob + 22, 12, 4);
            c.fillRect(ox + 12, bob + 26, 8, 2);
            c.fillStyle = '#bdbdbd';
            c.fillRect(ox + 10, bob + 23, 2, 3);
            c.fillRect(ox + 20, bob + 23, 2, 3);
            c.fillRect(ox + 12, bob + 27, 2, 2);
            c.fillRect(ox + 18, bob + 27, 2, 2);
            // Robe (with patterns)
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, bob + 16, 16, 12);
            c.fillStyle = '#4a3a6a';
            c.fillRect(ox + 10, bob + 18, 12, 2);
            c.fillRect(ox + 14, bob + 16, 4, 6);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 6, bob + 28, 20, 2);
            // Arms
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 2, bob + 16, 4, 12);
            c.fillRect(ox + 26, bob + 16, 4, 12);
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 2, bob + 28, 4, 4);
            c.fillRect(ox + 26, bob + 28, 4, 4);
            // Book
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 0, bob + 26, 6, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(ox + 1, bob + 27, 4, 6);
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 1, bob + 27, 4, 1);
            c.fillRect(ox + 1, bob + 31, 4, 1);
            // Staff
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 28, bob + 10, 2, 28);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 27, bob + 8, 4, 4);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 28, bob + 9, 2, 2);
            c.fillStyle = 'rgba(155,89,182,0.2)';
            c.fillRect(ox + 26, bob + 6, 6, 6);
            // Legs
            c.fillStyle = '#1a0e2e';
            if (legPhase === 0) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, 30, 5, 10);
                c.fillRect(ox + 18, 30, 5, 10);
            } else if (legPhase === 2) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else {
                c.fillRect(ox + 11, 30, 5, 10);
                c.fillRect(ox + 16, 30, 5, 10);
            }
            // Boots
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 9, 38, 6, 6);
            c.fillRect(ox + 17, 38, 6, 6);
        }

        const tex = addSheet('player_sage_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSageAttack() {
        const fw = 40, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Hat
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 14, 0, 12, 4);
            c.fillRect(ox + 12, 4, 16, 4);
            c.fillRect(ox + 10, 8, 20, 4);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, 12, 24, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 18, 1, 4, 2);

            // Face
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 14, 14, 12, 8);
            c.fillStyle = '#7b68ee';
            c.fillRect(ox + 16, 16, 2, 2);
            c.fillRect(ox + 22, 16, 2, 2);

            // Beard
            c.fillStyle = '#9e9e9e';
            c.fillRect(ox + 16, 20, 8, 4);
            c.fillRect(ox + 14, 22, 12, 4);
            c.fillRect(ox + 16, 26, 8, 2);

            // Robe
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 10, 14, 20, 16);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 12, 16, 16, 12);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 10, 28, 20, 2);

            // Attack arm animation
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, 16, 4, 12);
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 6, 28, 4, 4);

            // Right arm swings based on frame
            c.fillStyle = '#2d1b4e';
            if (f === 0) {
                c.fillRect(ox + 30, 14, 4, 12);
                c.fillStyle = '#d5c4a1';
                c.fillRect(ox + 30, 26, 4, 4);
                // Staff pointing up
                c.fillStyle = '#8b6914';
                c.fillRect(ox + 32, 4, 2, 22);
                c.fillStyle = '#6a3d9a';
                c.fillRect(ox + 31, 2, 4, 4);
            } else if (f === 1) {
                c.fillRect(ox + 30, 18, 4, 12);
                c.fillStyle = '#d5c4a1';
                c.fillRect(ox + 30, 28, 4, 4);
                // Staff swung forward
                c.fillStyle = '#8b6914';
                c.fillRect(ox + 32, 14, 18, 3);
                c.fillStyle = '#6a3d9a';
                c.fillRect(ox + 48, 12, 4, 4);
            } else {
                c.fillRect(ox + 30, 20, 4, 10);
                c.fillStyle = '#d5c4a1';
                c.fillRect(ox + 30, 28, 4, 4);
                // Staff pointing down
                c.fillStyle = '#8b6914';
                c.fillRect(ox + 32, 20, 2, 18);
                c.fillStyle = '#6a3d9a';
                c.fillRect(ox + 31, 36, 4, 4);
            }

            // Book in left hand
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 4, 26, 6, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(ox + 5, 27, 4, 6);

            // Legs
            c.fillStyle = '#1a0e2e';
            c.fillRect(ox + 14, 30, 5, 10);
            c.fillRect(ox + 21, 30, 5, 10);
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 13, 38, 6, 6);
            c.fillRect(ox + 21, 38, 6, 6);
        }

        addSheet('player_sage_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAlchemistWalk() {
        const fw = 32, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Hat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 8, bob + 0, 16, 4);
            c.fillRect(ox + 6, bob + 4, 20, 4);
            c.fillRect(ox + 4, bob + 8, 24, 4);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 2, bob + 12, 28, 2);

            // Goggles
            c.fillStyle = '#f39c12';
            c.fillRect(ox + 10, bob + 14, 5, 4);
            c.fillRect(ox + 17, bob + 14, 5, 4);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 11, bob + 15, 3, 2);
            c.fillRect(ox + 18, bob + 15, 3, 2);

            // Face
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 10, bob + 14, 12, 8);

            // Beard
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 10, bob + 20, 12, 4);
            c.fillRect(ox + 8, bob + 22, 16, 4);
            c.fillRect(ox + 10, bob + 26, 12, 2);

            // Coat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 8, bob + 16, 16, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 6, bob + 28, 20, 2);

            // Belt
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 6, bob + 26, 20, 2);

            // Arms
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 2, bob + 16, 4, 12);
            c.fillRect(ox + 26, bob + 16, 4, 12);
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 2, bob + 28, 4, 4);
            c.fillRect(ox + 26, bob + 28, 4, 4);

            // Flask
            c.fillStyle = '#27ae60';
            c.fillRect(ox + 0, bob + 24, 6, 8);
            c.fillStyle = '#2ecc71';
            c.fillRect(ox + 1, bob + 25, 4, 5);

            // Legs with walk cycle
            c.fillStyle = '#3d2b1f';
            if (legPhase === 0) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, 30, 5, 10);
                c.fillRect(ox + 18, 30, 5, 10);
            } else if (legPhase === 2) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else {
                c.fillRect(ox + 11, 30, 5, 10);
                c.fillRect(ox + 16, 30, 5, 10);
            }

            c.fillStyle = '#2c1e14';
            c.fillRect(ox + 9, 38, 6, 6);
            c.fillRect(ox + 17, 38, 6, 6);

            // Vials
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 26, bob + 22, 3, 5);
            c.fillStyle = '#3498db';
            c.fillRect(ox + 27, bob + 20, 3, 5);
        }

        addSheet('player_alchemist_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAlchemistAttack() {
        const fw = 40, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Hat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 12, 0, 16, 4);
            c.fillRect(ox + 10, 4, 20, 4);
            c.fillRect(ox + 8, 8, 24, 4);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 6, 12, 28, 2);

            // Goggles
            c.fillStyle = '#f39c12';
            c.fillRect(ox + 14, 14, 5, 4);
            c.fillRect(ox + 21, 14, 5, 4);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 15, 15, 3, 2);
            c.fillRect(ox + 22, 15, 3, 2);

            // Face
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 14, 14, 12, 8);

            // Beard
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 14, 20, 12, 4);
            c.fillRect(ox + 12, 22, 16, 4);

            // Coat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 10, 14, 20, 16);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 12, 16, 16, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 10, 28, 20, 2);

            // Left arm stays
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 6, 16, 4, 12);
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 6, 28, 4, 4);

            // Right arm throws flask
            c.fillStyle = '#5a3d1a';
            if (f === 0) {
                c.fillRect(ox + 30, 16, 4, 12);
                c.fillStyle = '#c4956a';
                c.fillRect(ox + 30, 28, 4, 4);
                c.fillStyle = '#27ae60';
                c.fillRect(ox + 30, 24, 6, 8);
            } else if (f === 1) {
                c.fillRect(ox + 30, 12, 4, 12);
                c.fillStyle = '#c4956a';
                c.fillRect(ox + 30, 22, 4, 4);
                c.fillStyle = '#27ae60';
                c.fillRect(ox + 32, 8, 6, 8);
                c.fillStyle = '#2ecc71';
                c.fillRect(ox + 33, 9, 4, 5);
            } else {
                c.fillRect(ox + 30, 18, 4, 10);
                c.fillStyle = '#c4956a';
                c.fillRect(ox + 30, 26, 4, 4);
            }

            // Legs
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 14, 30, 5, 10);
            c.fillRect(ox + 21, 30, 5, 10);
            c.fillStyle = '#2c1e14';
            c.fillRect(ox + 13, 38, 6, 6);
            c.fillRect(ox + 21, 38, 6, 6);
        }

        addSheet('player_alchemist_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAngelWalk() {
        const fw = 32, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const wingPhase = f % 2;

            // Hair
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 2, 16, 6);
            c.fillRect(ox + 6, bob + 6, 20, 4);

            // Face
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 10, bob + 8, 12, 8);
            c.fillStyle = '#5dade2';
            c.fillRect(ox + 12, bob + 10, 2, 2);
            c.fillRect(ox + 18, bob + 10, 2, 2);
            c.fillStyle = '#e8a0a0';
            c.fillRect(ox + 14, bob + 14, 4, 1);

            // Wings (slight flap)
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 0, bob + 10 - wingPhase, 6, 8);
            c.fillRect(ox + 26, bob + 10 - wingPhase, 6, 8);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 1, bob + 11 - wingPhase, 4, 6);
            c.fillRect(ox + 27, bob + 11 - wingPhase, 4, 6);
            c.fillStyle = '#d5dbdb';
            c.fillRect(ox + 0, bob + 12 - wingPhase, 2, 4);
            c.fillRect(ox + 30, bob + 12 - wingPhase, 2, 4);

            // White robe
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 8, bob + 16, 16, 12);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 6, bob + 28, 20, 2);

            // Holy symbol
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 18, 4, 6);
            c.fillRect(ox + 12, bob + 20, 8, 2);

            // Arms
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 2, bob + 16, 4, 12);
            c.fillRect(ox + 26, bob + 16, 4, 12);
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 2, bob + 28, 4, 4);
            c.fillRect(ox + 26, bob + 28, 4, 4);

            // Violin
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 27, bob + 18, 2, 14);
            c.fillStyle = '#a0522d';
            c.fillRect(ox + 25, bob + 20, 6, 8);

            // Legs with walk cycle
            c.fillStyle = '#ecf0f1';
            if (legPhase === 0) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, 30, 5, 10);
                c.fillRect(ox + 18, 30, 5, 10);
            } else if (legPhase === 2) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else {
                c.fillRect(ox + 11, 30, 5, 10);
                c.fillRect(ox + 16, 30, 5, 10);
            }

            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 9, 38, 6, 6);
            c.fillRect(ox + 17, 38, 6, 6);
        }

        addSheet('player_angel_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAngelAttack() {
        const fw = 40, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Hair
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, 0, 12, 4);
            c.fillRect(ox + 12, 2, 16, 6);
            c.fillRect(ox + 10, 6, 20, 4);

            // Face
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 14, 8, 12, 8);
            c.fillStyle = '#5dade2';
            c.fillRect(ox + 16, 10, 2, 2);
            c.fillRect(ox + 22, 10, 2, 2);

            // Wings spread wider during attack
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 0, 8, 8, 10);
            c.fillRect(ox + 32, 8, 8, 10);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 1, 9, 6, 8);
            c.fillRect(ox + 33, 9, 6, 8);

            // White robe
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 10, 14, 20, 16);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 12, 16, 16, 12);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 10, 28, 20, 2);

            // Holy symbol glows
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 18, 18, 4, 6);
            c.fillRect(ox + 16, 20, 8, 2);

            // Left arm
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 6, 16, 4, 12);
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 6, 28, 4, 4);

            // Right arm swings violin
            c.fillStyle = '#ecf0f1';
            if (f === 0) {
                c.fillRect(ox + 30, 16, 4, 12);
                c.fillStyle = '#fdebd0';
                c.fillRect(ox + 30, 28, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 31, 18, 2, 14);
                c.fillStyle = '#a0522d';
                c.fillRect(ox + 29, 20, 6, 8);
            } else if (f === 1) {
                c.fillRect(ox + 30, 12, 4, 12);
                c.fillStyle = '#fdebd0';
                c.fillRect(ox + 30, 22, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 30, 6, 14, 2);
                c.fillStyle = '#a0522d';
                c.fillRect(ox + 42, 4, 6, 6);
            } else {
                c.fillRect(ox + 30, 20, 4, 10);
                c.fillStyle = '#fdebd0';
                c.fillRect(ox + 30, 28, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 31, 26, 2, 14);
                c.fillStyle = '#a0522d';
                c.fillRect(ox + 29, 36, 6, 6);
            }

            // Legs
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 14, 30, 5, 10);
            c.fillRect(ox + 21, 30, 5, 10);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 13, 38, 6, 6);
            c.fillRect(ox + 21, 38, 6, 6);
        }

        addSheet('player_angel_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genGoblinWalk() {
        const fw = 24, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#27ae60';
            c.fillRect(ox + 8, 0, 8, 4);
            c.fillRect(ox + 4, 4, 16, 8);
            c.fillRect(ox + 6, 12, 12, 4);
            c.fillStyle = '#1e8449';
            c.fillRect(ox + 6, 2, 2, 4);
            c.fillRect(ox + 16, 2, 2, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 9, 6, 2, 2);
            c.fillRect(ox + 13, 6, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 10, 6, 1, 1);
            c.fillRect(ox + 14, 6, 1, 1);
            c.fillStyle = '#c0392b';
            c.fillRect(ox + 10, 10, 4, 1);
            c.fillStyle = '#27ae60';
            c.fillRect(ox + 7 - legOff, 14, 4, 6);
            c.fillRect(ox + 13 + legOff, 14, 4, 6);
            c.fillStyle = '#1e8449';
            c.fillRect(ox + 4 - legOff, 14, 3, 4);
            c.fillRect(ox + 17 + legOff, 14, 3, 4);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 7 - legOff, 20, 4, 4);
            c.fillRect(ox + 13 + legOff, 20, 4, 4);
        }

        addSheet('goblin_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genGoblinAttack() {
        const fw = 28, fh = 24, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            c.fillStyle = '#27ae60';
            c.fillRect(ox + 10, 0, 8, 4);
            c.fillRect(ox + 6, 4, 16, 8);
            c.fillRect(ox + 8, 12, 12, 4);
            c.fillStyle = '#1e8449';
            c.fillRect(ox + 8, 2, 2, 4);
            c.fillRect(ox + 18, 2, 2, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 11, 6, 2, 2);
            c.fillRect(ox + 15, 6, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 12, 6, 1, 1);
            c.fillRect(ox + 16, 6, 1, 1);
            c.fillStyle = '#c0392b';
            c.fillRect(ox + 12, 10, 4, 1);

            // Arm with weapon swings
            c.fillStyle = '#27ae60';
            if (f === 0) {
                c.fillRect(ox + 2, 14, 4, 6);
                c.fillRect(ox + 22, 14, 4, 6);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 22, 8, 2, 8);
            } else if (f === 1) {
                c.fillRect(ox + 2, 14, 4, 6);
                c.fillRect(ox + 22, 10, 4, 6);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 22, 4, 12, 2);
            } else {
                c.fillRect(ox + 2, 14, 4, 6);
                c.fillRect(ox + 22, 16, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 22, 16, 2, 8);
            }

            c.fillStyle = '#27ae60';
            c.fillRect(ox + 9, 14, 4, 6);
            c.fillRect(ox + 15, 14, 4, 6);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 9, 20, 4, 4);
            c.fillRect(ox + 15, 20, 4, 4);
        }

        addSheet('goblin_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSlimeWalk() {
        const fw = 20, fh = 20, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const squish = (f === 1 || f === 3) ? 2 : 0;
            const yOff = squish / 2;

            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 6, 6 + yOff + squish, 8, 4 - squish);
            c.fillRect(ox + 4, 8 + yOff + squish, 12, 4 - squish);
            c.fillRect(ox + 2, 10 + yOff, 16, 4);
            c.fillStyle = '#8e44ad';
            c.fillRect(ox + 4, 14, 12, 4);
            c.fillRect(ox + 6, 16, 8, 2);
            c.fillStyle = '#fff';
            c.fillRect(ox + 7, 8 + yOff + squish, 2, 2);
            c.fillRect(ox + 12, 8 + yOff + squish, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 7, 9 + yOff + squish, 1, 1);
            c.fillRect(ox + 13, 9 + yOff + squish, 1, 1);
        }

        addSheet('slime_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genRatWalk() {
        const fw = 20, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const legL = (legPhase === 0 || legPhase === 2) ? 0 : 2;
            const legR = (legPhase === 0 || legPhase === 2) ? 2 : 0;

            c.fillStyle = '#e67e22';
            c.fillRect(ox + 10, 2, 4, 4);
            c.fillRect(ox + 6, 4, 10, 4);
            c.fillStyle = '#d35400';
            c.fillRect(ox + 8, 4, 8, 6);
            c.fillRect(ox + 4, 6, 14, 4);
            c.fillRect(ox + 2, 8, 16, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 5, 5, 1, 1);
            c.fillRect(ox + 14, 5, 1, 1);
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 9, 8, 1, 1);
            c.fillRect(ox + 12, 8, 1, 1);
            c.fillStyle = '#d35400';
            c.fillRect(ox + 5 - legL, 10, 3, 4);
            c.fillRect(ox + 12 + legR, 10, 3, 4);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 4 - legL, 14, 4, 2);
            c.fillRect(ox + 12 + legR, 14, 4, 2);
        }

        addSheet('rat_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8, 0, 8, 8);
            c.fillRect(ox + 6, 2, 12, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 8, 3, 2, 2);
            c.fillRect(ox + 13, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 8, 6, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 9, 7, 1, 1);
            c.fillRect(ox + 11, 7, 1, 1);
            c.fillRect(ox + 13, 7, 1, 1);

            // Body
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 9, 8, 6, 2);
            c.fillRect(ox + 8, 10, 8, 2);
            c.fillRect(ox + 9, 12, 6, 2);
            c.fillRect(ox + 8, 14, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 10, 10, 1, 2);
            c.fillRect(ox + 12, 10, 1, 2);
            c.fillRect(ox + 10, 14, 1, 2);
            c.fillRect(ox + 12, 14, 1, 2);

            // Arms
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 4, 9, 4, 2);
            c.fillRect(ox + 16, 9, 4, 2);
            c.fillRect(ox + 4, 12, 2, 4);
            c.fillRect(ox + 18, 12, 2, 4);

            // Shield + Sword
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 1, 8, 6, 8);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 2, 9, 4, 6);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 19, 6, 2, 10);
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 18, 14, 4, 2);

            // Legs with walk
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8 - legOff, 16, 3, 6);
            c.fillRect(ox + 13 + legOff, 16, 3, 6);
            c.fillRect(ox + 8 - legOff, 22, 3, 2);
            c.fillRect(ox + 13 + legOff, 22, 3, 2);
            c.fillStyle = '#555';
            c.fillRect(ox + 7 - legOff, 24, 4, 3);
            c.fillRect(ox + 13 + legOff, 24, 4, 3);

            // Helmet
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 6, 0, 12, 2);
            c.fillRect(ox + 5, 1, 14, 2);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 7, 0, 10, 1);
        }

        addSheet('skeleton_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonAttack() {
        const fw = 30, fh = 28, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 9, 0, 8, 8);
            c.fillRect(ox + 7, 2, 12, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 9, 3, 2, 2);
            c.fillRect(ox + 14, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 9, 6, 8, 2);

            // Body
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 10, 8, 6, 2);
            c.fillRect(ox + 9, 10, 8, 2);
            c.fillRect(ox + 10, 12, 6, 2);
            c.fillRect(ox + 9, 14, 8, 2);

            // Shield arm stays
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 5, 9, 4, 2);
            c.fillRect(ox + 5, 12, 2, 4);
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 2, 8, 6, 8);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 3, 9, 4, 6);

            // Sword arm swings
            c.fillStyle = '#d4c5a9';
            if (f === 0) {
                c.fillRect(ox + 20, 9, 4, 2);
                c.fillRect(ox + 22, 12, 2, 4);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 23, 4, 2, 10);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 22, 12, 4, 2);
            } else if (f === 1) {
                c.fillRect(ox + 20, 11, 4, 2);
                c.fillRect(ox + 22, 12, 2, 4);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 23, 8, 12, 2);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 33, 7, 2, 4);
            } else {
                c.fillRect(ox + 20, 13, 4, 2);
                c.fillRect(ox + 22, 14, 2, 4);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 23, 16, 2, 10);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 22, 24, 4, 2);
            }

            // Legs
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 10, 16, 3, 6);
            c.fillRect(ox + 15, 16, 3, 6);
            c.fillRect(ox + 10, 22, 3, 2);
            c.fillRect(ox + 15, 22, 3, 2);
            c.fillStyle = '#555';
            c.fillRect(ox + 9, 24, 4, 3);
            c.fillRect(ox + 15, 24, 4, 3);

            // Helmet
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 7, 0, 12, 2);
            c.fillRect(ox + 6, 1, 14, 2);
        }

        addSheet('skeleton_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonArcherWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8, 0, 8, 8);
            c.fillRect(ox + 6, 2, 12, 4);
            c.fillStyle = '#1a3a0a';
            c.fillRect(ox + 8, 3, 2, 2);
            c.fillRect(ox + 13, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 8, 6, 8, 2);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 9, 8, 6, 2);
            c.fillRect(ox + 8, 10, 8, 2);
            c.fillRect(ox + 9, 12, 6, 2);
            c.fillRect(ox + 8, 14, 8, 2);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 4, 9, 4, 2);
            c.fillRect(ox + 16, 9, 4, 2);
            c.fillRect(ox + 4, 11, 2, 3);
            c.fillRect(ox + 18, 11, 2, 3);

            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 20, 6, 2, 14);
            c.fillRect(ox + 19, 7, 1, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 21, 8, 1, 10);

            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 5, 10, 2, 6);
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 5, 8, 2, 3);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8 - legOff, 16, 3, 6);
            c.fillRect(ox + 13 + legOff, 16, 3, 6);
            c.fillRect(ox + 8 - legOff, 22, 3, 2);
            c.fillRect(ox + 13 + legOff, 22, 3, 2);
            c.fillStyle = '#555';
            c.fillRect(ox + 7 - legOff, 24, 4, 3);
            c.fillRect(ox + 13 + legOff, 24, 4, 3);

            c.fillStyle = '#4a3728';
            c.fillRect(ox + 6, 0, 12, 3);
            c.fillRect(ox + 5, 1, 14, 3);
            c.fillRect(ox + 4, 3, 16, 2);
        }

        addSheet('skeleton_archer_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonShamanWalk() {
        const fw = 24, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 7, 0, 10, 8);
            c.fillRect(ox + 5, 2, 14, 4);
            c.fillStyle = '#3a0a3a';
            c.fillRect(ox + 8, 3, 2, 2);
            c.fillRect(ox + 14, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 8, 6, 8, 2);

            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, 8, 12, 10);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, 10, 8, 6);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 10, 11, 1, 3);
            c.fillRect(ox + 9, 12, 3, 1);
            c.fillRect(ox + 13, 11, 1, 3);
            c.fillRect(ox + 12, 12, 3, 1);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 4, 9, 3, 2);
            c.fillRect(ox + 17, 9, 3, 2);
            c.fillRect(ox + 4, 11, 2, 4);
            c.fillRect(ox + 18, 11, 2, 4);

            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 1, 2, 2, 22);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 0, 0, 4, 4);
            c.fillStyle = '#7b4aaa';
            c.fillRect(ox + 1, 1, 2, 2);

            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 7 - legOff, 18, 4, 6);
            c.fillRect(ox + 13 + legOff, 18, 4, 6);
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 6 - legOff, 24, 5, 3);
            c.fillRect(ox + 13 + legOff, 24, 5, 3);

            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 5, 0, 14, 3);
            c.fillRect(ox + 4, 1, 16, 4);
            c.fillRect(ox + 3, 3, 18, 2);
        }

        addSheet('skeleton_shaman_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTreantWalk() {
        const fw = 64, fh = 80, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legL = (legPhase === 0 || legPhase === 2) ? 0 : 4;
            const legR = (legPhase === 0 || legPhase === 2) ? 4 : 0;

            // Roots / legs
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 8 - legL, 68 + bob, 8, 12);
            c.fillRect(ox + 48 + legR, 68 + bob, 8, 12);
            c.fillRect(ox + 20, 70 + bob, 8, 10);
            c.fillRect(ox + 36, 70 + bob, 8, 10);
            c.fillStyle = '#2c1e14';
            c.fillRect(ox + 6 - legL, 76 + bob, 12, 4);
            c.fillRect(ox + 46 + legR, 76 + bob, 12, 4);
            c.fillRect(ox + 18, 78 + bob, 12, 2);
            c.fillRect(ox + 34, 78 + bob, 12, 2);

            // Trunk
            c.fillStyle = '#5c3a1e';
            c.fillRect(ox + 18, 28 + bob, 28, 42);
            c.fillStyle = '#4a2e16';
            c.fillRect(ox + 20, 30 + bob, 24, 38);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 22, 35 + bob, 4, 8);
            c.fillRect(ox + 38, 40 + bob, 4, 6);

            // Arms sway
            c.fillStyle = '#5c3a1e';
            c.fillRect(ox + 2 - legL, 38 + bob, 16, 6);
            c.fillRect(ox + 46 + legR, 38 + bob, 16, 6);
            c.fillStyle = '#4a2e16';
            c.fillRect(ox + 0 - legL, 40 + bob, 6, 4);
            c.fillRect(ox + 58 + legR, 40 + bob, 6, 4);

            // Hands
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 0 - legL, 36 + bob, 4, 6);
            c.fillRect(ox + 60 + legR, 36 + bob, 4, 6);

            // Crown
            c.fillStyle = '#1a5c2a';
            c.fillRect(ox + 12, 4 + bob, 40, 26);
            c.fillStyle = '#1e6b31';
            c.fillRect(ox + 14, 2 + bob, 36, 22);
            c.fillStyle = '#155723';
            c.fillRect(ox + 8, 8 + bob, 12, 14);
            c.fillRect(ox + 44, 8 + bob, 12, 14);
            c.fillStyle = '#0f4a1c';
            c.fillRect(ox + 10, 0 + bob, 8, 10);
            c.fillRect(ox + 46, 0 + bob, 8, 10);
            c.fillRect(ox + 26, 0 + bob, 12, 6);

            // Eyes
            c.fillStyle = '#ff2222';
            c.fillRect(ox + 22, 18 + bob, 6, 4);
            c.fillRect(ox + 36, 18 + bob, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 23, 19 + bob, 2, 2);
            c.fillRect(ox + 37, 19 + bob, 2, 2);

            // Mouth
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 26, 24 + bob, 12, 3);
        }

        addSheet('treant_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonLordWalk() {
        const fw = 56, fh = 72, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 3;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Crown
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 0, 28, 4);
            c.fillRect(ox + 12, bob + 2, 4, 6);
            c.fillRect(ox + 26, bob + 0, 4, 6);
            c.fillRect(ox + 40, bob + 2, 4, 6);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 15, bob + 2, 2, 2);
            c.fillRect(ox + 27, bob + 1, 2, 2);
            c.fillRect(ox + 41, bob + 2, 2, 2);

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 14, bob + 4, 28, 14);
            c.fillRect(ox + 12, bob + 6, 32, 10);
            c.fillStyle = '#ff2222';
            c.fillRect(ox + 16, bob + 8, 6, 4);
            c.fillRect(ox + 34, bob + 8, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 17, bob + 9, 2, 2);
            c.fillRect(ox + 35, bob + 9, 2, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 26, bob + 11, 4, 3);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 16, bob + 14, 24, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 18, bob + 15, 2, 2);
            c.fillRect(ox + 22, bob + 15, 2, 2);
            c.fillRect(ox + 26, bob + 15, 2, 2);
            c.fillRect(ox + 30, bob + 15, 2, 2);
            c.fillRect(ox + 34, bob + 15, 2, 2);

            // Neck
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 22, bob + 18, 12, 4);

            // Armor
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 10, bob + 22, 36, 18);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 12, bob + 24, 32, 14);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 14, bob + 26, 28, 2);
            c.fillRect(ox + 14, bob + 30, 28, 2);

            // Crystal
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 24, bob + 28, 8, 6);
            c.fillStyle = '#bf77f6';
            c.fillRect(ox + 26, bob + 29, 4, 4);

            // Arms sway
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2 - legOff, bob + 24, 8, 14);
            c.fillRect(ox + 46 + legOff, bob + 24, 8, 14);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 4 - legOff, bob + 26, 4, 10);
            c.fillRect(ox + 48 + legOff, bob + 26, 4, 10);

            // Hands
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 2 - legOff, bob + 38, 6, 4);
            c.fillRect(ox + 48 + legOff, bob + 38, 6, 4);

            // Sword
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 50 + legOff, bob + 10, 4, 30);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 51 + legOff, bob + 12, 2, 26);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 51 + legOff, bob + 10, 2, 4);

            // Shield
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 0 - legOff, bob + 26, 8, 12);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 1 - legOff, bob + 27, 6, 10);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 3 - legOff, bob + 30, 2, 4);

            // Legs
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 14 - legOff, bob + 40, 8, 16);
            c.fillRect(ox + 34 + legOff, bob + 40, 8, 16);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 16 - legOff, bob + 42, 4, 12);
            c.fillRect(ox + 36 + legOff, bob + 42, 4, 12);

            // Boots
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 12 - legOff, bob + 54, 10, 8);
            c.fillRect(ox + 34 + legOff, bob + 54, 10, 8);

            // Cape
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 12, bob + 22, 4, 34);
            c.fillRect(ox + 40, bob + 22, 4, 34);
        }

        addSheet('skeleton_lord_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonLordAttack() {
        const fw = 64, fh = 72, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Crown
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 18, 0, 28, 4);
            c.fillRect(ox + 16, 2, 4, 6);
            c.fillRect(ox + 30, 0, 4, 6);
            c.fillRect(ox + 44, 2, 4, 6);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 19, 2, 2, 2);
            c.fillRect(ox + 31, 1, 2, 2);
            c.fillRect(ox + 45, 2, 2, 2);

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 18, 4, 28, 14);
            c.fillRect(ox + 16, 6, 32, 10);
            c.fillStyle = '#ff2222';
            c.fillRect(ox + 20, 8, 6, 4);
            c.fillRect(ox + 38, 8, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 21, 9, 2, 2);
            c.fillRect(ox + 39, 9, 2, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 30, 11, 4, 3);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 20, 14, 24, 4);

            // Neck
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 26, 18, 12, 4);

            // Armor
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 14, 22, 36, 18);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 16, 24, 32, 14);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 28, 28, 8, 6);
            c.fillStyle = '#bf77f6';
            c.fillRect(ox + 30, 29, 4, 4);

            // Arms - attack animation
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 6, 24, 8, 14);
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 6, 38, 6, 4);

            // Shield
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2, 26, 8, 12);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 3, 27, 6, 10);

            // Sword arm swings
            c.fillStyle = '#4a4a5a';
            if (f === 0) {
                c.fillRect(ox + 50, 24, 8, 14);
                c.fillStyle = '#d4c5a9';
                c.fillRect(ox + 50, 38, 6, 4);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 52, 8, 4, 30);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 53, 8, 2, 4);
            } else if (f === 1) {
                c.fillRect(ox + 50, 20, 8, 14);
                c.fillStyle = '#d4c5a9';
                c.fillRect(ox + 50, 32, 6, 4);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 52, 16, 20, 3);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 70, 14, 4, 6);
            } else {
                c.fillRect(ox + 50, 28, 8, 12);
                c.fillStyle = '#d4c5a9';
                c.fillRect(ox + 50, 38, 6, 4);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 52, 36, 4, 26);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 52, 58, 4, 4);
            }

            // Legs
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 18, 40, 8, 16);
            c.fillRect(ox + 38, 40, 8, 16);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 16, 54, 10, 8);
            c.fillRect(ox + 36, 54, 10, 8);

            // Cape
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 16, 22, 4, 34);
            c.fillRect(ox + 44, 22, 4, 34);
        }

        addSheet('skeleton_lord_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    // === DEPTHS ENEMY WALK ANIMATIONS ===

    function _genWraithWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const sway = (f % 2 === 0) ? 0 : 2;

            // Hood
            c.fillStyle = '#1a0a2e';
            c.fillRect(ox + 8, bob + 0, 8, 4);
            c.fillRect(ox + 6, bob + 2, 12, 6);
            // Eyes
            c.fillStyle = '#7b68ee';
            c.fillRect(ox + 9, bob + 3, 2, 2);
            c.fillRect(ox + 13, bob + 3, 2, 2);
            // Tattered robe
            c.fillStyle = '#1a0a2e';
            c.fillRect(ox + 4, bob + 8, 16, 10);
            c.fillRect(ox + 2 - sway, bob + 12, 4, 8);
            c.fillRect(ox + 18 + sway, bob + 12, 4, 8);
            c.fillStyle = '#0a0020';
            c.fillRect(ox + 2 - sway, bob + 16, 2, 6);
            c.fillRect(ox + 20 + sway, bob + 16, 2, 6);
            // Ghostly wisps
            c.fillStyle = 'rgba(100,80,180,0.4)';
            c.fillRect(ox + 6, bob + 14, 4, 8);
            c.fillRect(ox + 14, bob + 14, 4, 8);
            c.fillRect(ox + 8, bob + 16, 8, 6);
        }

        addSheet('wraith_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSkeletonGhostWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            // Skull
            c.fillStyle = '#a8b8c8';
            c.fillRect(ox + 8, 0, 8, 6);
            c.fillRect(ox + 6, 2, 12, 3);
            c.fillStyle = '#4488cc';
            c.fillRect(ox + 9, 3, 2, 2);
            c.fillRect(ox + 13, 3, 2, 2);
            // Ribcage
            c.fillStyle = 'rgba(168,184,200,0.6)';
            c.fillRect(ox + 9, 6, 6, 2);
            c.fillRect(ox + 8, 8, 8, 2);
            c.fillRect(ox + 9, 10, 6, 2);
            c.fillRect(ox + 8, 12, 8, 2);
            // Arms
            c.fillStyle = 'rgba(168,184,200,0.5)';
            c.fillRect(ox + 2, 7, 6, 2);
            c.fillRect(ox + 16, 7, 6, 2);
            c.fillRect(ox + 2, 9, 2, 4);
            c.fillRect(ox + 20, 9, 2, 4);
            // Ghostly legs
            c.fillStyle = 'rgba(100,140,200,0.3)';
            c.fillRect(ox + 6 - legOff, 14, 4, 10);
            c.fillRect(ox + 14 + legOff, 14, 4, 10);
            c.fillStyle = 'rgba(80,120,180,0.2)';
            c.fillRect(ox + 4 - legOff, 20, 8, 6);
            c.fillRect(ox + 12 + legOff, 20, 8, 6);
        }

        addSheet('skeleton_ghost_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genCursedChildWalk() {
        const fw = 20, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            // Head
            c.fillStyle = '#3a1a3a';
            c.fillRect(ox + 5, 0, 10, 8);
            // Eyes
            c.fillStyle = '#cc2244';
            c.fillRect(ox + 7, 3, 2, 2);
            c.fillRect(ox + 12, 3, 2, 2);
            // Body
            c.fillStyle = '#3a1a3a';
            c.fillRect(ox + 4, 8, 12, 6);
            c.fillStyle = '#5a2a5a';
            c.fillRect(ox + 5, 9, 10, 4);
            // Arms
            c.fillStyle = '#3a1a3a';
            c.fillRect(ox + 0, 9, 4, 5);
            c.fillRect(ox + 16, 9, 4, 5);
            // Legs
            c.fillStyle = '#2a0a2a';
            c.fillRect(ox + 5 - legOff, 14, 3, 6);
            c.fillRect(ox + 12 + legOff, 14, 3, 6);
            c.fillStyle = '#1a001a';
            c.fillRect(ox + 4 - legOff, 18, 4, 4);
            c.fillRect(ox + 12 + legOff, 18, 4, 4);
        }

        addSheet('cursed_child_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genCursedBookWalk() {
        const fw = 16, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const tilt = (f % 2 === 0) ? 0 : 1;

            // Book cover
            c.fillStyle = '#4a1a2a';
            c.fillRect(ox + 2, bob + 2 + tilt, 12, 10);
            c.fillStyle = '#6a2a3a';
            c.fillRect(ox + 3, bob + 3 + tilt, 10, 8);
            // Pages
            c.fillStyle = '#d4c4a4';
            c.fillRect(ox + 4, bob + 4 + tilt, 8, 6);
            // Cursed text
            c.fillStyle = '#cc2244';
            c.fillRect(ox + 5, bob + 5 + tilt, 2, 1);
            c.fillRect(ox + 8, bob + 5 + tilt, 3, 1);
            c.fillRect(ox + 5, bob + 7 + tilt, 4, 1);
            c.fillRect(ox + 10, bob + 7 + tilt, 2, 1);
            // Glowing runes
            c.fillStyle = '#ff4466';
            c.fillRect(ox + 4, bob + 3 + tilt, 2, 2);
            c.fillRect(ox + 11, bob + 3 + tilt, 2, 2);
        }

        addSheet('cursed_book_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genInkElementalWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const squish = (f === 1 || f === 3) ? 2 : 0;
            const spread = (f === 1 || f === 3) ? 2 : 0;

            // Body blob
            c.fillStyle = '#0a0a2a';
            c.fillRect(ox + 6 - spread, 4 + squish / 2, 12 + spread * 2, 8 - squish);
            c.fillRect(ox + 4 - spread, 8, 16 + spread * 2, 10);
            c.fillRect(ox + 6 - spread, 14, 12 + spread * 2, 8);
            c.fillStyle = '#1a1a3a';
            c.fillRect(ox + 7 - spread, 5 + squish / 2, 10, 6 - squish);
            c.fillRect(ox + 5 - spread, 9, 14, 8);
            // Eyes
            c.fillStyle = '#4444cc';
            c.fillRect(ox + 8 - spread, 8, 3, 3);
            c.fillRect(ox + 13 + spread, 8, 3, 3);
            // Tentacles
            c.fillStyle = '#0a0a2a';
            c.fillRect(ox + 2 - spread, 14, 3, 8);
            c.fillRect(ox + 19 + spread, 14, 3, 8);
            c.fillStyle = '#000010';
            c.fillRect(ox + 2 - spread, 18, 2, 6);
            c.fillRect(ox + 20 + spread, 18, 2, 6);
        }

        addSheet('ink_elemental_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genSoulForgerWalk() {
        const fw = 32, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 3;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Helmet
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 10, bob + 0, 12, 6);
            c.fillStyle = '#ff6600';
            c.fillRect(ox + 11, bob + 3, 3, 2);
            c.fillRect(ox + 18, bob + 3, 3, 2);
            // Body armor
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 6, bob + 8, 20, 12);
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 8, bob + 10, 16, 8);
            c.fillStyle = '#ff6600';
            c.fillRect(ox + 10, bob + 11, 12, 3);
            // Arms
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 2 - legOff, bob + 10, 4, 10);
            c.fillRect(ox + 26 + legOff, bob + 10, 4, 10);
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2 - legOff, bob + 20, 3, 3);
            c.fillRect(ox + 27 + legOff, bob + 20, 3, 3);
            // Hammer
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 28 + legOff, bob + 14, 2, 14);
            c.fillStyle = '#ff6600';
            c.fillRect(ox + 26 + legOff, bob + 12, 6, 4);
            // Legs
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 8 - legOff, bob + 20, 6, 10);
            c.fillRect(ox + 18 + legOff, bob + 20, 6, 10);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 7 - legOff, bob + 28, 8, 4);
            c.fillRect(ox + 17 + legOff, bob + 28, 8, 4);
        }

        addSheet('soul_forger_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genMetalGolemWalk() {
        const fw = 40, fh = 44, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 4;
            const bob = (f === 1 || f === 3) ? -2 : 0;

            // Head
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 14, bob + 0, 12, 8);
            c.fillStyle = '#cc4400';
            c.fillRect(ox + 16, bob + 3, 3, 2);
            c.fillRect(ox + 22, bob + 3, 3, 2);
            // Torso
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 8, bob + 10, 24, 14);
            c.fillStyle = '#6a6a7a';
            c.fillRect(ox + 10, bob + 12, 20, 10);
            c.fillStyle = '#ff4400';
            c.fillRect(ox + 14, bob + 14, 12, 4);
            // Arms
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2 - legOff, bob + 12, 6, 14);
            c.fillRect(ox + 32 + legOff, bob + 12, 6, 14);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 2 - legOff, bob + 26, 5, 5);
            c.fillRect(ox + 33 + legOff, bob + 26, 5, 5);
            // Legs
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 8 - legOff, bob + 24, 8, 12);
            c.fillRect(ox + 24 + legOff, bob + 24, 8, 12);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 7 - legOff, bob + 34, 10, 6);
            c.fillRect(ox + 23 + legOff, bob + 34, 10, 6);
        }

        addSheet('metal_golem_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genJudgeWalk() {
        const fw = 28, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Hood
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 8, bob + 0, 12, 4);
            c.fillRect(ox + 6, bob + 2, 16, 6);
            // Eyes
            c.fillStyle = '#ccaa00';
            c.fillRect(ox + 9, bob + 4, 2, 2);
            c.fillRect(ox + 17, bob + 4, 2, 2);
            // Robe
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4, bob + 8, 20, 14);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 6, bob + 10, 16, 10);
            c.fillStyle = '#ccaa00';
            c.fillRect(ox + 4, bob + 8, 20, 2);
            // Gavel
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 22, bob + 6, 2, 14);
            c.fillStyle = '#a07828';
            c.fillRect(ox + 20, bob + 4, 6, 4);
            // Lower robe
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 6 - legOff, bob + 22, 16, 8);
            c.fillStyle = '#ccaa00';
            c.fillRect(ox + 6 - legOff, bob + 28, 16, 2);
        }

        addSheet('judge_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genExecutionerWalk() {
        const fw = 32, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 3;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Hood
            c.fillStyle = '#1a0a0a';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 2, 16, 6);
            // Eyes
            c.fillStyle = '#cc0000';
            c.fillRect(ox + 11, bob + 4, 3, 2);
            c.fillRect(ox + 18, bob + 4, 3, 2);
            // Robe
            c.fillStyle = '#1a0a0a';
            c.fillRect(ox + 4, bob + 8, 24, 14);
            c.fillStyle = '#2a1a1a';
            c.fillRect(ox + 6, bob + 10, 20, 10);
            c.fillStyle = '#4a0000';
            c.fillRect(ox + 8, bob + 12, 4, 4);
            // Arms
            c.fillStyle = '#1a0a0a';
            c.fillRect(ox + 2 - legOff, bob + 10, 4, 10);
            c.fillRect(ox + 26 + legOff, bob + 10, 4, 10);
            // Axe
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 28 + legOff, bob + 4, 2, 20);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 26 + legOff, bob + 2, 8, 6);
            // Lower robe
            c.fillStyle = '#1a0a0a';
            c.fillRect(ox + 6 - legOff, bob + 22, 20, 10);
            c.fillStyle = '#2a1a1a';
            c.fillRect(ox + 8 - legOff, bob + 26, 16, 6);
        }

        addSheet('executioner_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genDoomKnightWalk() {
        const fw = 32, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 3;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Helmet
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 10, bob + 0, 12, 8);
            c.fillStyle = '#6600aa';
            c.fillRect(ox + 11, bob + 4, 10, 2);
            // Plume
            c.fillStyle = '#4a0060';
            c.fillRect(ox + 12, bob + 0, 8, 2);
            // Body armor
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 6, bob + 8, 20, 14);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 8, bob + 10, 16, 10);
            c.fillStyle = '#6600aa';
            c.fillRect(ox + 10, bob + 12, 12, 4);
            // Shoulder pads
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 2, bob + 8, 4, 4);
            c.fillRect(ox + 26, bob + 8, 4, 4);
            // Arms
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 2 - legOff, bob + 12, 4, 10);
            c.fillRect(ox + 26 + legOff, bob + 12, 4, 10);
            // Sword
            c.fillStyle = '#4a0060';
            c.fillRect(ox + 28 + legOff, bob + 4, 2, 18);
            c.fillStyle = '#8822cc';
            c.fillRect(ox + 29 + legOff, bob + 6, 1, 14);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 26 + legOff, bob + 10, 6, 2);
            // Legs
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 8 - legOff, bob + 22, 6, 10);
            c.fillRect(ox + 18 + legOff, bob + 22, 6, 10);
            c.fillStyle = '#0a0a1a';
            c.fillRect(ox + 7 - legOff, bob + 30, 8, 4);
            c.fillRect(ox + 17 + legOff, bob + 30, 8, 4);
        }

        addSheet('doom_knight_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSageWalk();
    _genSageAttack();
    _genAlchemistWalk();
    _genAlchemistAttack();
    _genAngelWalk();
    _genAngelAttack();
    _genGoblinWalk();
    _genGoblinAttack();
    _genSlimeWalk();
    _genRatWalk();
    _genSkeletonWalk();
    _genSkeletonAttack();
    _genSkeletonArcherWalk();
    _genSkeletonShamanWalk();
    _genTreantWalk();
    _genSkeletonLordWalk();
    _genSkeletonLordAttack();
    // Depths enemies
    _genWraithWalk();
    _genSkeletonGhostWalk();
    _genCursedChildWalk();
    _genCursedBookWalk();
    _genInkElementalWalk();
    _genSoulForgerWalk();
    _genMetalGolemWalk();
    _genJudgeWalk();
    _genExecutionerWalk();
    _genDoomKnightWalk();

    // === BOSS ANIMATIONS ===

    function _genShadowChildWalk() {
        const fw = 24, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            // Head
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 7, bob + 0, 10, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 8, bob + 1, 8, 6);
            // Eyes
            c.fillStyle = '#cc0044';
            c.fillRect(ox + 9, bob + 3, 2, 3);
            c.fillRect(ox + 13, bob + 3, 2, 3);
            c.fillStyle = '#ff2266';
            c.fillRect(ox + 9, bob + 3, 1, 2);
            c.fillRect(ox + 13, bob + 3, 1, 2);
            // Dark robe
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 4, bob + 10, 16, 14);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 6, bob + 12, 12, 10);
            c.fillStyle = '#4a0060';
            c.fillRect(ox + 8, bob + 14, 8, 2);
            // Shadow tendrils
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 2 - legOff, bob + 14, 3, 8);
            c.fillRect(ox + 19 + legOff, bob + 14, 3, 8);
            // Arms
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 1 - legOff, bob + 12, 3, 8);
            c.fillRect(ox + 20 + legOff, bob + 12, 3, 8);
            c.fillStyle = '#4a0060';
            c.fillRect(ox + 1 - legOff, bob + 20, 3, 2);
            c.fillRect(ox + 20 + legOff, bob + 20, 3, 2);
            // Lower robe
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 6 - legOff, bob + 24, 12, 8);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 6 - legOff, bob + 28, 12, 6);
        }

        addSheet('shadow_child_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genShadowChildAttack() {
        const fw = 30, fh = 36, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Head
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 9, 0, 12, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 10, 1, 10, 6);
            // Eyes (glow brighter during attack)
            c.fillStyle = '#ff0066';
            c.fillRect(ox + 11, 3, 2, 3);
            c.fillRect(ox + 17, 3, 2, 3);
            c.fillStyle = '#ff4488';
            c.fillRect(ox + 11, 3, 1, 2);
            c.fillRect(ox + 17, 3, 1, 2);
            // Dark robe
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 6, 10, 18, 14);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 8, 12, 14, 10);
            c.fillStyle = '#6600aa';
            c.fillRect(ox + 10, 14, 10, 4);
            // Left arm stays
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 2, 12, 4, 8);
            c.fillStyle = '#4a0060';
            c.fillRect(ox + 2, 20, 4, 2);
            // Right arm attacks (shadow blast)
            c.fillStyle = '#1a0a2a';
            if (f === 0) {
                c.fillRect(ox + 24, 12, 4, 8);
                c.fillStyle = '#4a0060';
                c.fillRect(ox + 24, 20, 4, 2);
            } else if (f === 1) {
                c.fillRect(ox + 24, 8, 4, 10);
                c.fillStyle = '#6600aa';
                c.fillRect(ox + 26, 6, 6, 6);
                c.fillStyle = '#8822cc';
                c.fillRect(ox + 27, 7, 4, 4);
                c.fillStyle = '#aa44ee';
                c.fillRect(ox + 28, 8, 2, 2);
            } else {
                c.fillRect(ox + 24, 14, 4, 6);
                c.fillStyle = '#4a0060';
                c.fillRect(ox + 24, 18, 4, 2);
            }
            // Shadow tendrils spread wider
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 0, 14, 4, 10);
            c.fillRect(ox + 26, 14, 4, 10);
            c.fillStyle = '#1a0020';
            c.fillRect(ox + 0, 20, 2, 6);
            c.fillRect(ox + 28, 20, 2, 6);
            // Lower robe
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 8, 24, 14, 8);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 10, 28, 10, 6);
        }

        addSheet('shadow_child_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genShadowChildWalk();
    _genShadowChildAttack();

    function _genShadowWispPulse() {
        const fw = 14, fh = 14, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const pulse = (f === 1 || f === 3) ? 1 : 0;
            const glowSize = (f === 1 || f === 3) ? 2 : 0;

            // Outer glow (pulses)
            c.fillStyle = 'rgba(100,30,160,0.15)';
            c.fillRect(ox - glowSize, 0 - glowSize, 14 + glowSize * 2, 14 + glowSize * 2);
            // Shadow body
            c.fillStyle = 'rgba(20,0,40,0.6)';
            c.fillRect(ox + 2, 2, 10, 10);
            // Core sphere
            c.fillStyle = '#2a0a4a';
            c.fillRect(ox + 3, 3, 8, 8);
            c.fillStyle = '#3a1a5a';
            c.fillRect(ox + 4, 4, 6, 6);
            // Inner glow (brighter on pulse)
            c.fillStyle = pulse ? '#8822cc' : '#6600aa';
            c.fillRect(ox + 5, 5, 4, 4);
            c.fillStyle = pulse ? '#aa44ee' : '#8822cc';
            c.fillRect(ox + 6, 6, 2, 2);
            // Bright center
            c.fillStyle = pulse ? '#cc66ff' : '#aa44ee';
            c.fillRect(ox + 6, 6, 1, 1);
            // Shadow wisps
            c.fillStyle = 'rgba(20,0,40,0.5)';
            c.fillRect(ox + 1, 5, 2, 4);
            c.fillRect(ox + 11, 5, 2, 4);
            c.fillRect(ox + 5, 1, 4, 2);
            c.fillRect(ox + 5, 11, 4, 2);
        }

        addSheet('shadow_wisp_pulse', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genShadowWispPulse();

    // === SWAMP / POISON / HEART / TEMPLE ENEMY WALK ANIMATIONS ===

    function _genSwampSludgeWalk() {
        const fw = 28, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const squish = (f === 1 || f === 3) ? 2 : 0;
            const yOff = squish / 2;

            c.fillStyle = '#2a5a2a';
            c.fillRect(ox + 6, 8 + yOff + squish, 16, 10 - squish);
            c.fillRect(ox + 4, 10 + yOff + squish, 20, 8 - squish);
            c.fillRect(ox + 8, 6 + yOff + squish, 12, 12 - squish);
            c.fillStyle = '#3a7a3a';
            c.fillRect(ox + 8, 8 + yOff + squish, 12, 8 - squish);
            c.fillRect(ox + 6, 10 + yOff + squish, 16, 6 - squish);
            c.fillStyle = '#4a9a4a';
            c.fillRect(ox + 10, 10 + yOff + squish, 8, 4 - squish);
            c.fillStyle = '#fff';
            c.fillRect(ox + 10, 10 + yOff + squish, 3, 3);
            c.fillRect(ox + 16, 10 + yOff + squish, 3, 3);
            c.fillStyle = '#000';
            c.fillRect(ox + 11, 11 + yOff + squish, 2, 2);
            c.fillRect(ox + 17, 11 + yOff + squish, 2, 2);
            c.fillStyle = '#1a4a1a';
            c.fillRect(ox + 4 - squish, 16 + yOff, 4, 4);
            c.fillRect(ox + 20 + squish, 16 + yOff, 4, 4);
            c.fillRect(ox + 12, 18 + yOff, 4, 3);
        }

        addSheet('swamp_sludge_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVenomSpiderWalk() {
        const fw = 28, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;

            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 8, 6, 12, 10);
            c.fillRect(ox + 6, 8, 16, 6);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 9, 7, 10, 8);
            c.fillStyle = '#44aa44';
            c.fillRect(ox + 10, 8, 3, 3);
            c.fillRect(ox + 15, 8, 3, 3);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 10, 12, 8, 3);
            c.fillStyle = '#1a1a2a';
            if (legPhase === 0) {
                c.fillRect(ox + 4, 8, 4, 2);
                c.fillRect(ox + 20, 8, 4, 2);
                c.fillRect(ox + 2, 6, 4, 2);
                c.fillRect(ox + 22, 6, 4, 2);
                c.fillRect(ox + 2, 12, 4, 2);
                c.fillRect(ox + 22, 12, 4, 2);
                c.fillRect(ox + 4, 14, 4, 2);
                c.fillRect(ox + 20, 14, 4, 2);
            } else if (legPhase === 1) {
                c.fillRect(ox + 4, 7, 4, 2);
                c.fillRect(ox + 20, 7, 4, 2);
                c.fillRect(ox + 2, 8, 4, 2);
                c.fillRect(ox + 22, 8, 4, 2);
                c.fillRect(ox + 2, 12, 4, 2);
                c.fillRect(ox + 22, 12, 4, 2);
                c.fillRect(ox + 4, 13, 4, 2);
                c.fillRect(ox + 20, 13, 4, 2);
            } else if (legPhase === 2) {
                c.fillRect(ox + 4, 9, 4, 2);
                c.fillRect(ox + 20, 9, 4, 2);
                c.fillRect(ox + 2, 6, 4, 2);
                c.fillRect(ox + 22, 6, 4, 2);
                c.fillRect(ox + 2, 12, 4, 2);
                c.fillRect(ox + 22, 12, 4, 2);
                c.fillRect(ox + 4, 15, 4, 2);
                c.fillRect(ox + 20, 15, 4, 2);
            } else {
                c.fillRect(ox + 4, 8, 4, 2);
                c.fillRect(ox + 20, 8, 4, 2);
                c.fillRect(ox + 2, 7, 4, 2);
                c.fillRect(ox + 22, 7, 4, 2);
                c.fillRect(ox + 2, 13, 4, 2);
                c.fillRect(ox + 22, 13, 4, 2);
                c.fillRect(ox + 4, 14, 4, 2);
                c.fillRect(ox + 20, 14, 4, 2);
            }
            c.fillStyle = '#44aa44';
            c.fillRect(ox + 4, 16, 3, 2);
            c.fillRect(ox + 21, 16, 3, 2);
        }

        addSheet('venom_spider_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genCursedTreantWalk() {
        const fw = 36, fh = 44, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 14, 28 + bob, 8, 14);
            c.fillRect(ox + 12, 30 + bob, 12, 12);
            c.fillStyle = '#4a5a2a';
            c.fillRect(ox + 8, 10 + bob, 20, 20);
            c.fillRect(ox + 6, 14 + bob, 24, 14);
            c.fillRect(ox + 10, 6 + bob, 16, 22);
            c.fillStyle = '#3a4a1a';
            c.fillRect(ox + 10, 12 + bob, 16, 16);
            c.fillRect(ox + 8, 16 + bob, 20, 10);
            c.fillStyle = '#5a6a3a';
            c.fillRect(ox + 12, 14 + bob, 12, 12);
            c.fillStyle = '#cc2222';
            c.fillRect(ox + 12, 16 + bob, 4, 3);
            c.fillRect(ox + 20, 16 + bob, 4, 3);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 2 - legOff, 16 + bob, 6, 4);
            c.fillRect(ox + 28 + legOff, 16 + bob, 6, 4);
            c.fillStyle = '#4a5a2a';
            c.fillRect(ox + 0 - legOff, 12 + bob, 6, 6);
            c.fillRect(ox + 30 + legOff, 12 + bob, 6, 6);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox + 8 - legOff, 38 + bob, 6, 4);
            c.fillRect(ox + 22 + legOff, 38 + bob, 6, 4);
        }

        addSheet('cursed_treant_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genPlagueRatWalk() {
        const fw = 24, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;

            c.fillStyle = '#5a4a3a';
            c.fillRect(ox + 4, 4, 16, 8);
            c.fillRect(ox + 2, 6, 20, 4);
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 6, 5, 12, 6);
            c.fillStyle = '#7a6a5a';
            c.fillRect(ox + 8, 6, 8, 4);
            c.fillStyle = '#cc2222';
            c.fillRect(ox + 4, 6, 3, 3);
            c.fillRect(ox + 17, 6, 3, 3);
            c.fillStyle = '#000';
            c.fillRect(ox + 2, 8, 2, 1);
            c.fillStyle = '#5a4a3a';
            c.fillRect(ox + 18, 8, 4, 2);
            c.fillStyle = '#4a3a2a';
            c.fillRect(ox + 20, 9, 2, 1);
            c.fillStyle = '#5a4a3a';
            if (legPhase === 0) {
                c.fillRect(ox + 6, 12, 3, 3);
                c.fillRect(ox + 15, 12, 3, 3);
            } else if (legPhase === 1) {
                c.fillRect(ox + 5, 12, 3, 3);
                c.fillRect(ox + 16, 12, 3, 3);
            } else if (legPhase === 2) {
                c.fillRect(ox + 7, 12, 3, 3);
                c.fillRect(ox + 14, 12, 3, 3);
            } else {
                c.fillRect(ox + 6, 12, 3, 3);
                c.fillRect(ox + 15, 12, 3, 3);
            }
            c.fillStyle = '#5a4a3a';
            c.fillRect(ox + 0, 6, 2, 2);
        }

        addSheet('plague_rat_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genToxinSpriteWalk() {
        const fw = 18, fh = 20, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const wingPhase = f % 2;

            c.fillStyle = '#88cc44';
            c.fillRect(ox + 6, 6 + bob, 6, 6);
            c.fillRect(ox + 5, 8 + bob, 8, 4);
            c.fillStyle = '#aadd55';
            c.fillRect(ox + 7, 7 + bob, 4, 4);
            c.fillStyle = '#fff';
            c.fillRect(ox + 7, 8 + bob, 2, 2);
            c.fillRect(ox + 10, 8 + bob, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 8, 9 + bob, 1, 1);
            c.fillRect(ox + 11, 9 + bob, 1, 1);
            c.fillStyle = '#66aa33';
            c.fillRect(ox + 7, 12 + bob, 4, 3);
            c.fillRect(ox + 8, 15 + bob, 2, 2);
            c.fillStyle = '#88cc44';
            c.fillRect(ox + 2 - wingPhase, 6 + bob, 3, 5);
            c.fillRect(ox + 13 + wingPhase, 6 + bob, 3, 5);
            c.fillStyle = 'rgba(136,204,68,0.4)';
            c.fillRect(ox + 1 - wingPhase, 4 + bob, 4, 4);
            c.fillRect(ox + 13 + wingPhase, 4 + bob, 4, 4);
        }

        addSheet('toxin_sprite_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genBogWitchWalk() {
        const fw = 32, fh = 40, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#4a6a3a';
            c.fillRect(ox + 8, bob + 0, 16, 12);
            c.fillRect(ox + 6, bob + 4, 20, 8);
            c.fillStyle = '#5a7a4a';
            c.fillRect(ox + 10, bob + 2, 12, 8);
            c.fillStyle = '#3a5a2a';
            c.fillRect(ox + 6, bob + 0, 4, 4);
            c.fillRect(ox + 22, bob + 0, 4, 4);
            c.fillStyle = '#8a9a6a';
            c.fillRect(ox + 10, bob + 4, 4, 3);
            c.fillRect(ox + 18, bob + 4, 4, 3);
            c.fillStyle = '#ffcc00';
            c.fillRect(ox + 11, bob + 5, 2, 2);
            c.fillRect(ox + 19, bob + 5, 2, 2);
            c.fillStyle = '#5a3a2a';
            c.fillRect(ox + 12, bob + 10, 8, 3);
            c.fillStyle = '#3a4a2a';
            c.fillRect(ox + 6, bob + 14, 20, 12);
            c.fillRect(ox + 4, bob + 18, 24, 8);
            c.fillStyle = '#4a5a3a';
            c.fillRect(ox + 8, bob + 16, 16, 8);
            c.fillStyle = '#5a7a4a';
            c.fillRect(ox + 2 - legOff, bob + 16, 4, 8);
            c.fillRect(ox + 26 + legOff, bob + 16, 4, 8);
            c.fillStyle = '#8a9a6a';
            c.fillRect(ox + 2 - legOff, bob + 24, 4, 4);
            c.fillRect(ox + 26 + legOff, bob + 24, 4, 4);
            c.fillStyle = '#3a4a2a';
            c.fillRect(ox + 8 - legOff, bob + 26, 6, 8);
            c.fillRect(ox + 18 + legOff, bob + 26, 6, 8);
            c.fillStyle = '#2a3a1a';
            c.fillRect(ox + 8 - legOff, bob + 32, 6, 4);
            c.fillRect(ox + 18 + legOff, bob + 32, 6, 4);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox + 6 - legOff, bob + 34, 8, 4);
            c.fillRect(ox + 18 + legOff, bob + 34, 8, 4);
        }

        addSheet('bog_witch_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genCorruptedDruidWalk() {
        const fw = 32, fh = 40, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 2, 16, 6);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 11, bob + 1, 10, 4);
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 10, bob + 4, 12, 8);
            c.fillStyle = '#cc2244';
            c.fillRect(ox + 12, bob + 6, 3, 3);
            c.fillRect(ox + 17, bob + 6, 3, 3);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 12, bob + 10, 8, 2);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 6, bob + 12, 20, 14);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 8, bob + 14, 16, 10);
            c.fillStyle = '#4a3a5a';
            c.fillRect(ox + 10, bob + 16, 12, 6);
            c.fillStyle = '#9944aa';
            c.fillRect(ox + 14, bob + 18, 4, 3);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 2 - legOff, bob + 14, 4, 10);
            c.fillRect(ox + 26 + legOff, bob + 14, 4, 10);
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 2 - legOff, bob + 24, 4, 4);
            c.fillRect(ox + 26 + legOff, bob + 24, 4, 4);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 8 - legOff, bob + 26, 6, 8);
            c.fillRect(ox + 18 + legOff, bob + 26, 6, 8);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 8 - legOff, bob + 32, 6, 4);
            c.fillRect(ox + 18 + legOff, bob + 32, 6, 4);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 6 - legOff, bob + 34, 8, 4);
            c.fillRect(ox + 18 + legOff, bob + 34, 8, 4);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 0 - legOff, bob + 20, 4, 6);
            c.fillRect(ox + 28 + legOff, bob + 20, 4, 6);
        }

        addSheet('corrupted_druid_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genFleshCrawlerWalk() {
        const fw = 30, fh = 20, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wave = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#8a3a4a';
            c.fillRect(ox + 2, 6 + wave, 26, 8);
            c.fillRect(ox + 4, 4 + wave, 22, 12);
            c.fillRect(ox + 6, 2 + wave, 18, 16);
            c.fillStyle = '#9a4a5a';
            c.fillRect(ox + 6, 6 + wave, 18, 8);
            c.fillRect(ox + 8, 4 + wave, 14, 12);
            c.fillStyle = '#aa5a6a';
            c.fillRect(ox + 10, 6 + wave, 10, 8);
            c.fillStyle = '#cc2244';
            c.fillRect(ox + 6, 8 + wave, 3, 3);
            c.fillRect(ox + 21, 8 + wave, 3, 3);
            c.fillStyle = '#7a2a3a';
            c.fillRect(ox + 2, 10 + wave, 2, 4);
            c.fillRect(ox + 26, 10 + wave, 2, 4);
            c.fillStyle = '#6a1a2a';
            c.fillRect(ox + 4, 14 - wave, 2, 3);
            c.fillRect(ox + 8, 14 - wave, 2, 3);
            c.fillRect(ox + 12, 14 - wave, 2, 3);
            c.fillRect(ox + 16, 14 - wave, 2, 3);
            c.fillRect(ox + 20, 14 - wave, 2, 3);
            c.fillRect(ox + 24, 14 - wave, 2, 3);
        }

        addSheet('flesh_crawler_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVeinHorrorWalk() {
        const fw = 32, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#6a2a3a';
            c.fillRect(ox + 8, bob + 4, 16, 12);
            c.fillRect(ox + 6, bob + 8, 20, 8);
            c.fillStyle = '#7a3a4a';
            c.fillRect(ox + 10, bob + 6, 12, 8);
            c.fillStyle = '#8a4a5a';
            c.fillRect(ox + 12, bob + 8, 8, 4);
            c.fillStyle = '#cc2244';
            c.fillRect(ox + 10, bob + 8, 4, 4);
            c.fillRect(ox + 18, bob + 8, 4, 4);
            c.fillStyle = '#5a1a2a';
            c.fillRect(ox + 12, bob + 12, 8, 3);
            c.fillStyle = '#6a2a3a';
            c.fillRect(ox + 6, bob + 16, 20, 10);
            c.fillRect(ox + 4, bob + 20, 24, 6);
            c.fillStyle = '#7a3a4a';
            c.fillRect(ox + 8, bob + 18, 16, 6);
            c.fillStyle = '#8a4a5a';
            c.fillRect(ox + 10, bob + 20, 12, 4);
            c.fillStyle = '#aa3a4a';
            c.fillRect(ox + 2 - legOff, bob + 18, 4, 8);
            c.fillRect(ox + 26 + legOff, bob + 18, 4, 8);
            c.fillStyle = '#cc4a5a';
            c.fillRect(ox + 2 - legOff, bob + 24, 4, 4);
            c.fillRect(ox + 26 + legOff, bob + 24, 4, 4);
            c.fillStyle = '#5a1a2a';
            c.fillRect(ox + 8 - legOff, bob + 26, 6, 6);
            c.fillRect(ox + 18 + legOff, bob + 26, 6, 6);
            c.fillStyle = '#4a0a1a';
            c.fillRect(ox + 8 - legOff, bob + 30, 6, 4);
            c.fillRect(ox + 18 + legOff, bob + 30, 6, 4);
        }

        addSheet('vein_horror_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTempleGuardianWalk() {
        const fw = 36, fh = 40, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 3;

            c.fillStyle = '#6a6a7a';
            c.fillRect(ox + 10, bob + 0, 16, 10);
            c.fillRect(ox + 8, bob + 4, 20, 8);
            c.fillStyle = '#7a7a8a';
            c.fillRect(ox + 12, bob + 2, 12, 6);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 12, bob + 4, 4, 3);
            c.fillRect(ox + 20, bob + 4, 4, 3);
            c.fillStyle = '#ffaa00';
            c.fillRect(ox + 13, bob + 5, 2, 1);
            c.fillRect(ox + 21, bob + 5, 2, 1);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 6, bob + 12, 24, 12);
            c.fillRect(ox + 4, bob + 16, 28, 8);
            c.fillStyle = '#6a6a7a';
            c.fillRect(ox + 8, bob + 14, 20, 8);
            c.fillStyle = '#7a7a8a';
            c.fillRect(ox + 10, bob + 16, 16, 4);
            c.fillStyle = '#ffaa00';
            c.fillRect(ox + 14, bob + 17, 8, 2);
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2 - legOff, bob + 14, 4, 10);
            c.fillRect(ox + 30 + legOff, bob + 14, 4, 10);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 2 - legOff, bob + 22, 4, 4);
            c.fillRect(ox + 30 + legOff, bob + 22, 4, 4);
            c.fillStyle = '#6a6a7a';
            c.fillRect(ox + 8 - legOff, bob + 24, 8, 8);
            c.fillRect(ox + 20 + legOff, bob + 24, 8, 8);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 8 - legOff, bob + 28, 8, 6);
            c.fillRect(ox + 20 + legOff, bob + 28, 8, 6);
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 6 - legOff, bob + 32, 10, 6);
            c.fillRect(ox + 20 + legOff, bob + 32, 10, 6);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 6 - legOff, bob + 36, 10, 4);
            c.fillRect(ox + 20 + legOff, bob + 36, 10, 4);
        }

        addSheet('temple_guardian_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAncientWardenWalk() {
        const fw = 32, fh = 44, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#8a7a6a';
            c.fillRect(ox + 10, bob + 0, 12, 8);
            c.fillRect(ox + 8, bob + 2, 16, 6);
            c.fillStyle = '#9a8a7a';
            c.fillRect(ox + 11, bob + 1, 10, 4);
            c.fillStyle = '#cc8800';
            c.fillRect(ox + 12, bob + 3, 3, 3);
            c.fillRect(ox + 17, bob + 3, 3, 3);
            c.fillStyle = '#7a6a5a';
            c.fillRect(ox + 12, bob + 7, 8, 2);
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 6, bob + 10, 20, 14);
            c.fillRect(ox + 4, bob + 14, 24, 10);
            c.fillStyle = '#7a6a5a';
            c.fillRect(ox + 8, bob + 12, 16, 10);
            c.fillStyle = '#8a7a6a';
            c.fillRect(ox + 10, bob + 14, 12, 6);
            c.fillStyle = '#cc8800';
            c.fillRect(ox + 12, bob + 16, 8, 2);
            c.fillRect(ox + 12, bob + 20, 8, 2);
            c.fillStyle = '#5a4a3a';
            c.fillRect(ox + 2 - legOff, bob + 12, 4, 10);
            c.fillRect(ox + 26 + legOff, bob + 12, 4, 10);
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 2 - legOff, bob + 20, 4, 4);
            c.fillRect(ox + 26 + legOff, bob + 20, 4, 4);
            c.fillStyle = '#7a6a5a';
            c.fillRect(ox + 8 - legOff, bob + 24, 6, 10);
            c.fillRect(ox + 18 + legOff, bob + 24, 6, 10);
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 8 - legOff, bob + 30, 6, 8);
            c.fillRect(ox + 18 + legOff, bob + 30, 6, 8);
            c.fillStyle = '#5a4a3a';
            c.fillRect(ox + 6 - legOff, bob + 36, 8, 6);
            c.fillRect(ox + 18 + legOff, bob + 36, 8, 6);
            c.fillStyle = '#4a3a2a';
            c.fillRect(ox + 6 - legOff, bob + 40, 8, 4);
            c.fillRect(ox + 18 + legOff, bob + 40, 8, 4);
        }

        addSheet('ancient_warden_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVoidStalkerWalk() {
        const fw = 28, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 8, bob + 4, 12, 10);
            c.fillRect(ox + 6, bob + 8, 16, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 10, bob + 6, 8, 6);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 10, bob + 8, 3, 3);
            c.fillRect(ox + 15, bob + 8, 3, 3);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 12, bob + 12, 4, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 4, bob + 12, 4, 8);
            c.fillRect(ox + 20, bob + 12, 4, 8);
            c.fillRect(ox + 2, bob + 16, 4, 6);
            c.fillRect(ox + 22, bob + 16, 4, 6);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 6, bob + 16, 16, 8);
            c.fillRect(ox + 4, bob + 20, 20, 6);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 8, bob + 18, 12, 6);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 12, bob + 20, 4, 2);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 8 - legOff, bob + 24, 4, 4);
            c.fillRect(ox + 16 + legOff, bob + 24, 4, 4);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 8 - legOff, bob + 28, 4, 4);
            c.fillRect(ox + 16 + legOff, bob + 28, 4, 4);
            c.fillStyle = 'rgba(200,30,255,0.2)';
            c.fillRect(ox + 2, bob + 28, 24, 4);
        }

        addSheet('void_stalker_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSwampSludgeWalk();
    _genVenomSpiderWalk();
    _genCursedTreantWalk();
    _genPlagueRatWalk();
    _genToxinSpriteWalk();
    _genBogWitchWalk();
    _genCorruptedDruidWalk();
    _genFleshCrawlerWalk();
    _genVeinHorrorWalk();
    _genTempleGuardianWalk();
    _genAncientWardenWalk();
    _genVoidStalkerWalk();

    // === BOSS ANCIENT EVIL ANIMATIONS ===

    function _genAncientEvilIdle() {
        const fw = 40, fh = 56, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const pulse = (f === 1 || f === 3) ? 2 : 0;

            // Dark aura
            c.fillStyle = 'rgba(30,0,50,0.3)';
            c.fillRect(ox, 0, 40, 56);
            // Main body
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 10, 8, 20, 30);
            c.fillRect(ox + 8, 14, 24, 20);
            c.fillRect(ox + 6, 20, 28, 14);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 12, 10, 16, 26);
            c.fillRect(ox + 10, 16, 20, 16);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 14, 12, 12, 20);
            // Multiple eyes (pulsing)
            c.fillStyle = pulse ? '#ee44ff' : '#cc22ff';
            c.fillRect(ox + 14, 14, 4, 4);
            c.fillRect(ox + 22, 14, 4, 4);
            c.fillRect(ox + 18, 18, 4, 4);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 15, 15, 2, 2);
            c.fillRect(ox + 23, 15, 2, 2);
            c.fillRect(ox + 19, 19, 2, 2);
            c.fillStyle = '#ff66ff';
            c.fillRect(ox + 16, 16, 1, 1);
            c.fillRect(ox + 24, 16, 1, 1);
            c.fillRect(ox + 20, 20, 1, 1);
            // Crown/horns
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 12, 2, 4, 8);
            c.fillRect(ox + 24, 2, 4, 8);
            c.fillRect(ox + 16, 0, 8, 4);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 13, 3, 2, 6);
            c.fillRect(ox + 25, 3, 2, 6);
            c.fillRect(ox + 17, 1, 6, 2);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 14, 4, 2, 2);
            c.fillRect(ox + 26, 4, 2, 2);
            c.fillRect(ox + 18, 2, 4, 1);
            // Mouth
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 16, 24, 8, 3);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 17, 24, 2, 2);
            c.fillRect(ox + 21, 24, 2, 2);
            // Tentacles (left)
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 2, 18, 6, 4);
            c.fillRect(ox + 0, 20, 4, 6);
            c.fillRect(ox + 0, 24, 2, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 3, 19, 4, 2);
            c.fillRect(ox + 1, 21, 2, 4);
            // Tentacles (right)
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 32, 18, 6, 4);
            c.fillRect(ox + 36, 20, 4, 6);
            c.fillRect(ox + 38, 24, 2, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 33, 19, 4, 2);
            c.fillRect(ox + 37, 21, 2, 4);
            // Lower body/tendrils
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 10, 38, 4, 10);
            c.fillRect(ox + 18, 38, 4, 12);
            c.fillRect(ox + 26, 38, 4, 10);
            c.fillRect(ox + 14, 40, 4, 8);
            c.fillRect(ox + 22, 40, 4, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 11, 44, 2, 6);
            c.fillRect(ox + 19, 46, 2, 8);
            c.fillRect(ox + 27, 44, 2, 6);
            c.fillRect(ox + 15, 44, 2, 4);
            c.fillRect(ox + 23, 44, 2, 4);
            // Glow spots (pulsing)
            c.fillStyle = 'rgba(200,30,255,' + (0.15 + pulse * 0.03) + ')';
            c.fillRect(ox + 8, 12, 24, 20);
        }

        addSheet('ancient_evil_idle', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAncientEvilAttack() {
        const fw = 50, fh = 56, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const glowSize = (f === 2) ? 6 : (f === 3) ? 3 : 0;

            // Attack glow
            if (glowSize > 0) {
                c.fillStyle = 'rgba(200,30,255,0.2)';
                c.fillRect(ox + 10 - glowSize, 10 - glowSize, 30 + glowSize * 2, 36 + glowSize * 2);
            }
            // Dark aura
            c.fillStyle = 'rgba(30,0,50,0.3)';
            c.fillRect(ox + 5, 0, 40, 56);
            // Main body (wider during attack)
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 12, 8, 26, 30);
            c.fillRect(ox + 10, 14, 30, 20);
            c.fillRect(ox + 8, 20, 34, 14);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 14, 10, 22, 26);
            c.fillRect(ox + 12, 16, 26, 16);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 16, 12, 18, 20);
            // Multiple eyes (red during attack)
            c.fillStyle = '#ff2244';
            c.fillRect(ox + 16, 14, 4, 4);
            c.fillRect(ox + 28, 14, 4, 4);
            c.fillRect(ox + 22, 18, 4, 4);
            c.fillStyle = '#ff4466';
            c.fillRect(ox + 17, 15, 2, 2);
            c.fillRect(ox + 29, 15, 2, 2);
            c.fillRect(ox + 23, 19, 2, 2);
            c.fillStyle = '#ff8888';
            c.fillRect(ox + 18, 16, 1, 1);
            c.fillRect(ox + 30, 16, 1, 1);
            c.fillRect(ox + 24, 20, 1, 1);
            // Crown/horns
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 14, 2, 4, 8);
            c.fillRect(ox + 32, 2, 4, 8);
            c.fillRect(ox + 18, 0, 10, 4);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 15, 3, 2, 6);
            c.fillRect(ox + 33, 3, 2, 6);
            c.fillRect(ox + 19, 1, 8, 2);
            c.fillStyle = '#ff2244';
            c.fillRect(ox + 16, 4, 2, 2);
            c.fillRect(ox + 34, 4, 2, 2);
            c.fillRect(ox + 20, 2, 6, 1);
            // Mouth (open wider)
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 18, 24, 10, 5);
            c.fillStyle = '#ff2244';
            c.fillRect(ox + 19, 25, 2, 3);
            c.fillRect(ox + 27, 25, 2, 3);
            // Tentacles (extended)
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 0, 16, 8, 4);
            c.fillRect(ox + 0, 18, 6, 8);
            c.fillRect(ox + 0, 24, 4, 10);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 1, 17, 6, 2);
            c.fillRect(ox + 1, 19, 4, 6);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 42, 16, 8, 4);
            c.fillRect(ox + 44, 18, 6, 8);
            c.fillRect(ox + 46, 24, 4, 10);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 43, 17, 6, 2);
            c.fillRect(ox + 45, 19, 4, 6);
            // Lower body/tendrils
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 12, 38, 4, 10);
            c.fillRect(ox + 20, 38, 4, 12);
            c.fillRect(ox + 28, 38, 4, 10);
            c.fillRect(ox + 16, 40, 4, 8);
            c.fillRect(ox + 24, 40, 4, 8);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 13, 44, 2, 6);
            c.fillRect(ox + 21, 46, 2, 8);
            c.fillRect(ox + 29, 44, 2, 6);
            // Energy blast
            if (f === 2) {
                c.fillStyle = '#cc22ff';
                c.fillRect(ox + 20, 30, 10, 6);
                c.fillStyle = '#ee44ff';
                c.fillRect(ox + 22, 31, 6, 4);
                c.fillStyle = '#ff66ff';
                c.fillRect(ox + 24, 32, 2, 2);
            }
            if (f === 3) {
                c.fillStyle = '#cc22ff';
                c.fillRect(ox + 18, 32, 14, 8);
                c.fillStyle = '#ee44ff';
                c.fillRect(ox + 20, 33, 10, 6);
                c.fillStyle = '#ff66ff';
                c.fillRect(ox + 22, 34, 6, 4);
            }
        }

        addSheet('ancient_evil_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAncientEvilDeath() {
        const fw = 40, fh = 56, frames = 6;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const fade = 1 - (f / (frames - 1));
            const spread = f * 2;

            // Fading aura
            c.fillStyle = 'rgba(30,0,50,' + (0.3 * fade) + ')';
            c.fillRect(ox - spread, 0, 40 + spread * 2, 56);
            // Main body (shrinking/fading)
            c.fillStyle = 'rgba(26,10,42,' + fade + ')';
            c.fillRect(ox + 10 + spread / 2, 8 + spread, 20 - spread, 30 - spread * 2);
            c.fillRect(ox + 8 + spread / 2, 14 + spread / 2, 24 - spread, 20 - spread);
            c.fillStyle = 'rgba(42,26,58,' + fade + ')';
            c.fillRect(ox + 12 + spread / 2, 10 + spread, 16 - spread, 26 - spread * 2);
            // Eyes (flickering)
            if (f < 4) {
                c.fillStyle = 'rgba(204,34,255,' + (fade * 0.8) + ')';
                c.fillRect(ox + 14 + spread / 2, 14 + spread / 2, 4, 4);
                c.fillRect(ox + 22 + spread / 2, 14 + spread / 2, 4, 4);
                c.fillRect(ox + 18 + spread / 2, 18 + spread / 2, 4, 4);
            }
            // Crown/horns (fading)
            if (f < 3) {
                c.fillStyle = 'rgba(42,26,58,' + (fade * 0.6) + ')';
                c.fillRect(ox + 12 + spread / 2, 2 + spread / 2, 4, 8 - spread);
                c.fillRect(ox + 24 + spread / 2, 2 + spread / 2, 4, 8 - spread);
            }
            // Disintegration particles
            if (f >= 2) {
                c.fillStyle = 'rgba(200,30,255,' + (fade * 0.5) + ')';
                for (let i = 0; i < f * 3; i++) {
                    const px = ox + 10 + Math.random() * 20;
                    const py = 10 + Math.random() * 36;
                    c.fillRect(px, py, 2, 2);
                }
            }
            // Final dissolve
            if (f >= 4) {
                c.fillStyle = 'rgba(200,30,255,' + ((5 - f) * 0.1) + ')';
                c.fillRect(ox + 5, 20, 30, 16);
            }
        }

        addSheet('ancient_evil_death', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genAncientEvilIdle();
    _genAncientEvilAttack();
    _genAncientEvilDeath();

    // === POISON FROG WALK ===
    function _genPoisonFrogWalk() {
        const fw = 20, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const squat = (f === 1 || f === 3) ? 2 : 0;

            // Body
            c.fillStyle = '#2a5a1a';
            c.fillRect(ox + 4, 4 + squat, 12, 8 - squat);
            c.fillRect(ox + 2, 6 + squat, 16, 4);
            c.fillRect(ox + 6, 2 + squat, 8, 10 - squat);
            c.fillStyle = '#3a7a2a';
            c.fillRect(ox + 6, 6 + squat, 8, 4);
            c.fillRect(ox + 4, 8 + squat, 12, 2);
            c.fillStyle = '#4a9a3a';
            c.fillRect(ox + 6, 4 + squat, 4, 2);
            c.fillRect(ox + 12, 6 + squat, 2, 2);
            // Eyes
            c.fillStyle = '#ff0000';
            c.fillRect(ox + 4, 2 + squat, 3, 3);
            c.fillRect(ox + 13, 2 + squat, 3, 3);
            c.fillStyle = '#ff4444';
            c.fillRect(ox + 5, 3 + squat, 1, 1);
            c.fillRect(ox + 14, 3 + squat, 1, 1);
            c.fillStyle = '#000';
            c.fillRect(ox + 5, 3 + squat, 1, 1);
            c.fillRect(ox + 14, 3 + squat, 1, 1);
            // Legs with hop cycle
            c.fillStyle = '#2a5a1a';
            if (legPhase === 0) {
                c.fillRect(ox + 2, 10, 4, 3);
                c.fillRect(ox + 14, 10, 4, 3);
                c.fillRect(ox + 0, 12, 4, 2);
                c.fillRect(ox + 16, 12, 4, 2);
            } else if (legPhase === 1) {
                c.fillRect(ox + 0, 8, 4, 4);
                c.fillRect(ox + 16, 8, 4, 4);
                c.fillRect(ox + 0, 12, 4, 2);
                c.fillRect(ox + 16, 12, 4, 2);
            } else if (legPhase === 2) {
                c.fillRect(ox + 1, 9, 4, 4);
                c.fillRect(ox + 15, 9, 4, 4);
                c.fillRect(ox + 0, 13, 4, 1);
                c.fillRect(ox + 16, 13, 4, 1);
            } else {
                c.fillRect(ox + 3, 10, 4, 3);
                c.fillRect(ox + 13, 10, 4, 3);
                c.fillRect(ox + 1, 12, 4, 2);
                c.fillRect(ox + 15, 12, 4, 2);
            }
            c.fillStyle = '#1a4a0a';
            c.fillRect(ox + 0, 14, 3, 2);
            c.fillRect(ox + 17, 14, 3, 2);
            c.fillStyle = '#66cc33';
            c.fillRect(ox + 8, 5 + squat, 2, 2);
            c.fillRect(ox + 10, 8 + squat, 2, 1);
        }

        addSheet('poison_frog_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    // === BOG WRAITH WALK ===
    function _genBogWraithWalk() {
        const fw = 18, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const sway = (f === 1 || f === 3) ? -1 : 1;
            const drift = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = 'rgba(58,74,90,0.3)';
            c.fillRect(ox + 4 + sway, 4 + drift, 10, 20);
            c.fillRect(ox + 2 + sway, 8, 14, 14);
            c.fillRect(ox + 6 + sway, 2 + drift, 6, 22);
            c.fillStyle = 'rgba(78,94,110,0.4)';
            c.fillRect(ox + 5 + sway, 6 + drift, 8, 16);
            c.fillRect(ox + 3 + sway, 10, 12, 10);
            c.fillStyle = 'rgba(98,114,130,0.5)';
            c.fillRect(ox + 6 + sway, 8 + drift, 6, 12);
            c.fillRect(ox + 4 + sway, 12, 10, 6);
            c.fillStyle = 'rgba(58,74,90,0.2)';
            c.fillRect(ox + 2 + sway, 4 + drift, 2, 16);
            c.fillRect(ox + 14 + sway, 4 + drift, 2, 16);
            c.fillRect(ox + sway, 10 + drift, 2, 10);
            c.fillRect(ox + 16 + sway, 10 + drift, 2, 10);
            c.fillStyle = 'rgba(120,160,200,0.7)';
            c.fillRect(ox + 5 + sway, 8 + drift, 2, 2);
            c.fillRect(ox + 11 + sway, 8 + drift, 2, 2);
            c.fillStyle = 'rgba(180,220,255,0.9)';
            c.fillRect(ox + 5 + sway, 8 + drift, 1, 1);
            c.fillRect(ox + 11 + sway, 8 + drift, 1, 1);
            c.fillStyle = 'rgba(30,40,50,0.5)';
            c.fillRect(ox + 7 + sway, 12 + drift, 4, 2);
            c.fillStyle = 'rgba(58,74,90,0.15)';
            c.fillRect(ox + 4 + sway, 24, 10, 4);
            c.fillRect(ox + 2 + sway, 26, 14, 2);
            c.fillRect(ox + 6 + sway, 22 + drift, 6, 6);
            c.fillStyle = 'rgba(58,74,90,0.2)';
            c.fillRect(ox + 2 + sway, 18, 2, 6);
            c.fillRect(ox + 14 + sway, 18, 2, 6);
            c.fillRect(ox + sway, 22, 2, 4);
            c.fillRect(ox + 16 + sway, 22, 2, 4);
        }

        addSheet('bog_wraith_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    // === ZOMBIE KNIGHT WALK ===
    function _genZombieKnightWalk() {
        const fw = 22, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legPhase = f % 4;

            // Helmet
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 6, bob + 0, 10, 6);
            c.fillRect(ox + 5, bob + 2, 12, 4);
            c.fillStyle = '#7a6a5a';
            c.fillRect(ox + 7, bob + 1, 8, 4);
            c.fillStyle = '#4a3a2a';
            c.fillRect(ox + 6, bob + 4, 10, 3);
            c.fillStyle = '#3a6a2a';
            c.fillRect(ox + 7, bob + 5, 8, 5);
            c.fillStyle = '#cc2222';
            c.fillRect(ox + 8, bob + 7, 2, 2);
            c.fillRect(ox + 12, bob + 7, 2, 2);
            c.fillStyle = '#ff4444';
            c.fillRect(ox + 9, bob + 7, 1, 1);
            c.fillRect(ox + 13, bob + 7, 1, 1);
            // Rusted armor
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 4, bob + 10, 14, 10);
            c.fillRect(ox + 3, bob + 14, 16, 6);
            c.fillStyle = '#7a6a5a';
            c.fillRect(ox + 5, bob + 12, 12, 6);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox + 6, bob + 11, 3, 2);
            c.fillRect(ox + 12, bob + 15, 3, 2);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 7, bob + 13, 1, 4);
            c.fillRect(ox + 13, bob + 12, 1, 5);
            // Arms
            c.fillStyle = '#6a5a4a';
            c.fillRect(ox + 1, bob + 12, 3, 8);
            c.fillRect(ox + 18, bob + 12, 3, 8);
            c.fillStyle = '#3a6a2a';
            c.fillRect(ox + 1, bob + 20, 3, 3);
            c.fillRect(ox + 18, bob + 20, 3, 3);
            // Torn cape
            c.fillStyle = 'rgba(60,30,30,0.6)';
            c.fillRect(ox + 3, bob + 16, 2, 10);
            c.fillRect(ox + 17, bob + 16, 2, 10);
            c.fillRect(ox + 2, bob + 22, 2, 6);
            c.fillRect(ox + 18, bob + 22, 2, 6);
            // Legs
            c.fillStyle = '#5a4a3a';
            if (legPhase === 0) {
                c.fillRect(ox + 5, bob + 22, 4, 6);
                c.fillRect(ox + 13, bob + 22, 4, 6);
            } else if (legPhase === 1) {
                c.fillRect(ox + 4, bob + 22, 4, 6);
                c.fillRect(ox + 14, bob + 22, 4, 6);
            } else if (legPhase === 2) {
                c.fillRect(ox + 6, bob + 22, 4, 6);
                c.fillRect(ox + 12, bob + 22, 4, 6);
            } else {
                c.fillRect(ox + 5, bob + 22, 4, 6);
                c.fillRect(ox + 13, bob + 22, 4, 6);
            }
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 4, bob + 28, 5, 3);
            c.fillRect(ox + 13, bob + 28, 5, 3);
        }

        addSheet('zombie_knight_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    // === SHADOW ACOLYTE WALK ===
    function _genShadowAcolyteWalk() {
        const fw = 16, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            // Hood
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4, bob + 0, 8, 6);
            c.fillRect(ox + 3, bob + 2, 10, 4);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 5, bob + 1, 6, 4);
            // Face
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 5, bob + 4, 6, 5);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 5, bob + 4, 6, 3);
            // Eyes
            c.fillStyle = '#aa00ff';
            c.fillRect(ox + 6, bob + 6, 2, 2);
            c.fillRect(ox + 10, bob + 6, 2, 2);
            c.fillStyle = '#cc44ff';
            c.fillRect(ox + 6, bob + 6, 1, 1);
            c.fillRect(ox + 10, bob + 6, 1, 1);
            // Robe
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 3, bob + 9, 10, 10);
            c.fillRect(ox + 2, bob + 12, 12, 7);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 4, bob + 10, 8, 8);
            c.fillRect(ox + 3, bob + 13, 10, 5);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 3, bob + 9, 10, 1);
            c.fillRect(ox + 2, bob + 12, 12, 1);
            // Arms
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 1, bob + 11, 2, 6);
            c.fillRect(ox + 13, bob + 11, 2, 6);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 15, 2, 3);
            c.fillRect(ox + 13, bob + 15, 2, 3);
            // Dark energy
            c.fillStyle = 'rgba(170,0,255,0.2)';
            c.fillRect(ox + 5, bob + 14, 6, 3);
            // Lower robe with walk
            c.fillStyle = '#0a0a1a';
            c.fillRect(ox + 4 - legOff, bob + 19, 8, 3);
            c.fillRect(ox + 3 - legOff, bob + 21, 10, 2);
            c.fillRect(ox + 5 - legOff, bob + 23, 6, 1);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4 - legOff, bob + 22, 3, 2);
            c.fillRect(ox + 9 + legOff, bob + 22, 3, 2);
        }

        addSheet('shadow_acolyte_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genPoisonFrogWalk();
    _genBogWraithWalk();
    _genZombieKnightWalk();
    _genShadowAcolyteWalk();

    // === SHADOW DISTRICT WALK ANIMATIONS ===

    function _genShadowStalkerWalk() {
        const fw = 16, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            // Hood
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4, bob + 0, 8, 6);
            c.fillRect(ox + 3, bob + 2, 10, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5, bob + 1, 6, 4);
            // Eyes
            c.fillStyle = '#cc0022';
            c.fillRect(ox + 6, bob + 5, 2, 2);
            c.fillRect(ox + 10, bob + 5, 2, 2);
            c.fillStyle = '#ff2244';
            c.fillRect(ox + 6, bob + 5, 1, 1);
            c.fillRect(ox + 10, bob + 5, 1, 1);
            // Cloak
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 3, bob + 8, 10, 10);
            c.fillRect(ox + 2, bob + 11, 12, 7);
            c.fillStyle = '#141422';
            c.fillRect(ox + 4, bob + 9, 8, 8);
            c.fillRect(ox + 3, bob + 12, 10, 5);
            // Daggers
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 1, bob + 10, 2, 8);
            c.fillRect(ox + 13, bob + 10, 2, 8);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 1, bob + 10, 1, 3);
            c.fillRect(ox + 14, bob + 10, 1, 3);
            // Legs
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4 - legOff, bob + 18, 3, 4);
            c.fillRect(ox + 9 + legOff, bob + 18, 3, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5 - legOff, bob + 18, 1, 4);
            c.fillRect(ox + 10 + legOff, bob + 18, 1, 4);
            // Boots
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 3 - legOff, bob + 22, 4, 2);
            c.fillRect(ox + 9 + legOff, bob + 22, 4, 2);
        }

        addSheet('shadow_stalker_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVoidWispFloat() {
        const fw = 14, fh = 14, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const pulse = (f === 0 || f === 2) ? 0 : 1;
            const drift = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = 'rgba(60,30,120,0.15)';
            c.beginPath();
            c.arc(ox + 7, 7 + drift, 6 + pulse, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#2a1a4a';
            c.fillRect(ox + 3, 3 + drift, 8, 8);
            c.fillStyle = '#3a2a6a';
            c.fillRect(ox + 4, 4 + drift, 6, 6);
            c.fillStyle = '#4a3a8a';
            c.fillRect(ox + 5, 5 + drift, 4, 4);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 6, 6 + drift, 2, 2);
            c.fillStyle = 'rgba(60,30,120,0.3)';
            c.fillRect(ox + 1, 5 + drift, 2, 4);
            c.fillRect(ox + 11, 5 + drift, 2, 4);
            c.fillRect(ox + 5, 1 + drift, 4, 2);
            c.fillRect(ox + 5, 11 + drift, 4, 2);
        }

        addSheet('void_wisp_float', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genMirrorShardFloat() {
        const fw = 18, fh = 12, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const tilt = (f === 1 || f === 3) ? 1 : 0;
            const shimmer = (f === 2) ? 1 : 0;

            c.fillStyle = '#4a4a6a';
            c.fillRect(ox + 4, 2 + tilt, 10, 8 - tilt);
            c.fillRect(ox + 2, 4, 14, 4);
            c.fillRect(ox + 6, 0, 6, 12 - tilt);
            c.fillStyle = '#6a6a9a';
            c.fillRect(ox + 6, 3 + tilt, 6, 6);
            c.fillRect(ox + 4, 5, 10, 2);
            c.fillStyle = '#8a8aba';
            c.fillRect(ox + 7 + shimmer, 4 + tilt, 3, 3);
            c.fillRect(ox + 5, 6, 2, 1);
            c.fillStyle = '#2a2a4a';
            c.fillRect(ox + 4, 2 + tilt, 2, 1);
            c.fillRect(ox + 12, 2 + tilt, 2, 1);
            c.fillRect(ox + 2, 5, 1, 2);
            c.fillRect(ox + 15, 5, 1, 2);
            c.fillStyle = 'rgba(100,100,180,0.2)';
            c.fillRect(ox + 3, 3, 12, 6);
        }

        addSheet('mirror_shard_float', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genShadowHoundWalk() {
        const fw = 22, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? 1 : 0;

            // Body
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4, 4 + bob, 14, 8);
            c.fillRect(ox + 2, 6, 18, 4);
            c.fillRect(ox + 6, 2 + bob, 10, 10);
            // Head
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 14, 2 + bob, 6, 4);
            c.fillRect(ox + 12, 4, 8, 2);
            c.fillStyle = '#141422';
            c.fillRect(ox + 15, 3 + bob, 4, 2);
            // Eyes
            c.fillStyle = '#aa00ff';
            c.fillRect(ox + 16, 3 + bob, 2, 1);
            c.fillStyle = '#cc44ff';
            c.fillRect(ox + 17, 3 + bob, 1, 1);
            // Snout
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 18, 4, 3, 2);
            // Legs
            c.fillStyle = '#0a0a18';
            if (legPhase === 0) {
                c.fillRect(ox + 4, 10, 3, 4);
                c.fillRect(ox + 10, 10, 3, 4);
                c.fillRect(ox + 15, 10, 3, 4);
            } else if (legPhase === 1) {
                c.fillRect(ox + 3, 10, 3, 5);
                c.fillRect(ox + 10, 10, 3, 4);
                c.fillRect(ox + 16, 10, 3, 3);
            } else if (legPhase === 2) {
                c.fillRect(ox + 5, 10, 3, 4);
                c.fillRect(ox + 9, 10, 3, 5);
                c.fillRect(ox + 14, 10, 3, 4);
            } else {
                c.fillRect(ox + 4, 10, 3, 3);
                c.fillRect(ox + 11, 10, 3, 5);
                c.fillRect(ox + 15, 10, 3, 5);
            }
            // Tail
            c.fillStyle = '#0a0a18';
            c.fillRect(ox, 4 + bob, 4, 2);
            c.fillRect(ox, 2 + bob, 2, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 1, 3 + bob, 2, 2);
            // Shadow trail
            c.fillStyle = 'rgba(10,10,24,0.3)';
            c.fillRect(ox + 2, 12, 18, 2);
        }

        addSheet('shadow_hound_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genDarkReflectionWalk() {
        const fw = 20, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const sway = (f === 1 || f === 3) ? -1 : 1;
            const shift = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = 'rgba(20,20,40,0.6)';
            c.fillRect(ox + 6 + sway, 0, 8, 8);
            c.fillRect(ox + 4 + sway, 4, 12, 6);
            c.fillStyle = 'rgba(30,30,50,0.7)';
            c.fillRect(ox + 7 + sway, 1, 6, 6);
            c.fillRect(ox + 5 + sway, 5, 10, 4);
            // Eyes
            c.fillStyle = '#ffcc00';
            c.fillRect(ox + 8 + sway, 3, 2, 2);
            c.fillRect(ox + 12 + sway, 3, 2, 2);
            c.fillStyle = '#ffee44';
            c.fillRect(ox + 8 + sway, 3, 1, 1);
            c.fillRect(ox + 12 + sway, 3, 1, 1);
            // Body
            c.fillStyle = 'rgba(20,20,40,0.5)';
            c.fillRect(ox + 4 + sway, 10, 12, 10);
            c.fillRect(ox + 2 + sway, 14, 16, 6);
            c.fillStyle = 'rgba(30,30,50,0.6)';
            c.fillRect(ox + 5 + sway, 12, 10, 8);
            c.fillRect(ox + 3 + sway, 16, 14, 4);
            // Arms
            c.fillStyle = 'rgba(20,20,40,0.4)';
            c.fillRect(ox + 1 + sway, 12, 3, 8);
            c.fillRect(ox + 16 + sway, 12, 3, 8);
            c.fillStyle = 'rgba(30,30,50,0.5)';
            c.fillRect(ox + 1 + sway, 16, 2, 6);
            c.fillRect(ox + 17 + sway, 16, 2, 6);
            // Legs
            c.fillStyle = 'rgba(20,20,40,0.5)';
            c.fillRect(ox + 5 - shift, 20, 4, 6);
            c.fillRect(ox + 11 + shift, 20, 4, 6);
            c.fillStyle = 'rgba(30,30,50,0.6)';
            c.fillRect(ox + 6 - shift, 22, 2, 4);
            c.fillRect(ox + 12 + shift, 22, 2, 4);
            // Distortion aura
            c.fillStyle = 'rgba(40,40,80,0.15)';
            c.fillRect(ox + 2 + sway, 8, 16, 18);
        }

        addSheet('dark_reflection_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVoidKnightWalk() {
        const fw = 22, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legPhase = f % 4;

            // Helmet
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 6, bob + 0, 10, 6);
            c.fillRect(ox + 5, bob + 2, 12, 4);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 7, bob + 1, 8, 4);
            // Visor
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 6, bob + 4, 10, 3);
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 7, bob + 5, 8, 1);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 8, bob + 5, 6, 1);
            // Eyes
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 8, bob + 5, 2, 1);
            c.fillRect(ox + 12, bob + 5, 2, 1);
            // Armor
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4, bob + 8, 14, 10);
            c.fillRect(ox + 3, bob + 12, 16, 6);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 5, bob + 10, 12, 6);
            // Armor runes
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 7, bob + 11, 2, 2);
            c.fillRect(ox + 13, bob + 11, 2, 2);
            c.fillRect(ox + 9, bob + 13, 4, 1);
            // Shoulders
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 2, bob + 8, 3, 5);
            c.fillRect(ox + 17, bob + 8, 3, 5);
            // Arms
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 1, bob + 13, 3, 7);
            c.fillRect(ox + 18, bob + 13, 3, 7);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 18, 3, 3);
            c.fillRect(ox + 18, bob + 18, 3, 3);
            // Void blade
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 19, bob + 4, 2, 14);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 19, bob + 4, 1, 10);
            c.fillStyle = '#8a6acc';
            c.fillRect(ox + 19, bob + 5, 1, 4);
            // Legs
            c.fillStyle = '#1a1a2a';
            if (legPhase === 0) {
                c.fillRect(ox + 5, bob + 20, 4, 8);
                c.fillRect(ox + 13, bob + 20, 4, 8);
            } else if (legPhase === 1) {
                c.fillRect(ox + 4, bob + 20, 4, 8);
                c.fillRect(ox + 14, bob + 20, 4, 8);
            } else if (legPhase === 2) {
                c.fillRect(ox + 6, bob + 20, 4, 8);
                c.fillRect(ox + 12, bob + 20, 4, 8);
            } else {
                c.fillRect(ox + 5, bob + 20, 4, 8);
                c.fillRect(ox + 13, bob + 20, 4, 8);
            }
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 6 - (legPhase === 1 ? 1 : 0), bob + 20, 2, 8);
            c.fillRect(ox + 14 + (legPhase === 1 ? 1 : 0), bob + 20, 2, 8);
            // Boots
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 4, bob + 28, 5, 3);
            c.fillRect(ox + 13, bob + 28, 5, 3);
            // Shadow aura
            c.fillStyle = 'rgba(30,10,60,0.2)';
            c.fillRect(ox + 2, bob + 28, 18, 3);
        }

        addSheet('void_knight_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genNightmareMothFly() {
        const fw = 20, fh = 18, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const wingUp = (f === 1 || f === 3);
            const wingY = wingUp ? -2 : 0;
            const bob = (f === 1 || f === 3) ? 1 : 0;

            // Body
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 8, 6 + bob, 4, 8);
            c.fillRect(ox + 7, 8 + bob, 6, 4);
            c.fillStyle = '#3a2a5a';
            c.fillRect(ox + 9, 7 + bob, 2, 6);
            // Head
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 8, 2 + bob, 4, 4);
            c.fillStyle = '#3a2a5a';
            c.fillRect(ox + 9, 3 + bob, 2, 2);
            // Eyes
            c.fillStyle = '#aa00ff';
            c.fillRect(ox + 8, 3 + bob, 1, 2);
            c.fillRect(ox + 11, 3 + bob, 1, 2);
            // Antennae
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 7, 0, 1, 3);
            c.fillRect(ox + 12, 0, 1, 3);
            c.fillStyle = '#4a3a6a';
            c.fillRect(ox + 7, 0, 1, 1);
            c.fillRect(ox + 12, 0, 1, 1);
            // Wings (upper)
            c.fillStyle = 'rgba(40,20,80,0.6)';
            c.fillRect(ox + 1, 4 + wingY, 7, 6);
            c.fillRect(ox + 12, 4 + wingY, 7, 6);
            c.fillStyle = 'rgba(60,30,100,0.5)';
            c.fillRect(ox + 2, 5 + wingY, 5, 4);
            c.fillRect(ox + 13, 5 + wingY, 5, 4);
            c.fillStyle = '#4a2a6a';
            c.fillRect(ox + 3, 6 + wingY, 2, 2);
            c.fillRect(ox + 15, 6 + wingY, 2, 2);
            // Wings (lower)
            c.fillStyle = 'rgba(40,20,80,0.5)';
            c.fillRect(ox + 2, 10, 6, 5);
            c.fillRect(ox + 12, 10, 6, 5);
            c.fillStyle = 'rgba(60,30,100,0.4)';
            c.fillRect(ox + 3, 11, 4, 3);
            c.fillRect(ox + 13, 11, 4, 3);
            // Legs
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 7, 12, 1, 4);
            c.fillRect(ox + 12, 12, 1, 4);
        }

        addSheet('nightmare_moth_fly', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVoidSpawnWalk() {
        const fw = 12, fh = 10, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 2, 2, 8, 6);
            c.fillRect(ox + 1, 4, 10, 2);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 3, 3, 6, 4);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 3, 4, 2, 1);
            c.fillRect(ox + 7, 4, 2, 1);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 3, 4, 1, 1);
            c.fillRect(ox + 7, 4, 1, 1);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 2 - legOff, 8, 2, 2);
            c.fillRect(ox + 8 + legOff, 8, 2, 2);
            c.fillStyle = 'rgba(20,20,42,0.3)';
            c.fillRect(ox + 1, 8, 10, 1);
        }

        addSheet('void_spawn_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genRiftCrawlerWalk() {
        const fw = 24, fh = 18, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;

            // Body
            c.fillStyle = '#141422';
            c.fillRect(ox + 8, 4, 8, 8);
            c.fillRect(ox + 6, 6, 12, 4);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 9, 5, 6, 6);
            c.fillRect(ox + 7, 7, 10, 2);
            // Eyes
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 9, 6, 1, 1);
            c.fillRect(ox + 11, 6, 1, 1);
            c.fillRect(ox + 13, 6, 1, 1);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 10, 6, 1, 1);
            c.fillRect(ox + 12, 6, 1, 1);
            // Legs (animated)
            c.fillStyle = '#141422';
            if (legPhase === 0) {
                c.fillRect(ox + 2, 4, 4, 2);
                c.fillRect(ox + 18, 4, 4, 2);
                c.fillRect(ox + 1, 6, 3, 2);
                c.fillRect(ox + 20, 6, 3, 2);
                c.fillRect(ox + 2, 8, 4, 2);
                c.fillRect(ox + 18, 8, 4, 2);
                c.fillRect(ox + 1, 10, 3, 2);
                c.fillRect(ox + 20, 10, 3, 2);
            } else if (legPhase === 1) {
                c.fillRect(ox + 1, 3, 4, 2);
                c.fillRect(ox + 19, 5, 4, 2);
                c.fillRect(ox + 0, 5, 3, 2);
                c.fillRect(ox + 21, 7, 3, 2);
                c.fillRect(ox + 3, 9, 4, 2);
                c.fillRect(ox + 17, 9, 4, 2);
                c.fillRect(ox + 2, 11, 3, 2);
                c.fillRect(ox + 19, 11, 3, 2);
            } else {
                c.fillRect(ox + 3, 5, 4, 2);
                c.fillRect(ox + 17, 3, 4, 2);
                c.fillRect(ox + 2, 7, 3, 2);
                c.fillRect(ox + 19, 5, 3, 2);
                c.fillRect(ox + 1, 8, 4, 2);
                c.fillRect(ox + 19, 8, 4, 2);
                c.fillRect(ox + 0, 10, 3, 2);
                c.fillRect(ox + 21, 10, 3, 2);
            }
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 2, 5, 1, 1);
            c.fillRect(ox + 21, 5, 1, 1);
            // Fangs
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 10, 10, 1, 3);
            c.fillRect(ox + 13, 10, 1, 3);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 10, 10, 1, 1);
            c.fillRect(ox + 13, 10, 1, 1);
            // Shadow aura
            c.fillStyle = 'rgba(20,10,40,0.2)';
            c.fillRect(ox + 6, 12, 12, 4);
        }

        addSheet('rift_crawler_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genPhantomKnightWalk() {
        const fw = 20, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;
            const fade = (f === 1 || f === 3) ? 0.1 : 0;

            // Helmet
            c.fillStyle = 'rgba(30,30,50,' + (0.7 - fade) + ')';
            c.fillRect(ox + 6, bob + 0, 8, 6);
            c.fillRect(ox + 5, bob + 2, 10, 4);
            c.fillStyle = 'rgba(40,40,60,' + (0.8 - fade) + ')';
            c.fillRect(ox + 7, bob + 1, 6, 4);
            // Eyes
            c.fillStyle = '#00ccff';
            c.fillRect(ox + 7, bob + 3, 2, 1);
            c.fillRect(ox + 11, bob + 3, 2, 1);
            c.fillStyle = '#44eeff';
            c.fillRect(ox + 7, bob + 3, 1, 1);
            c.fillRect(ox + 11, bob + 3, 1, 1);
            // Ghostly armor
            c.fillStyle = 'rgba(30,30,50,' + (0.5 - fade) + ')';
            c.fillRect(ox + 4, bob + 6, 12, 10);
            c.fillRect(ox + 3, bob + 10, 14, 6);
            c.fillStyle = 'rgba(40,40,60,' + (0.6 - fade) + ')';
            c.fillRect(ox + 5, bob + 8, 10, 8);
            // Shield
            c.fillStyle = 'rgba(40,50,80,' + (0.6 - fade) + ')';
            c.fillRect(ox + 1, bob + 8, 4, 8);
            c.fillStyle = 'rgba(50,60,90,' + (0.7 - fade) + ')';
            c.fillRect(ox + 2, bob + 9, 2, 6);
            c.fillStyle = '#00ccff';
            c.fillRect(ox + 2, bob + 11, 2, 2);
            // Ghostly blade
            c.fillStyle = 'rgba(100,200,255,' + (0.4 - fade) + ')';
            c.fillRect(ox + 16, bob + 4, 2, 14);
            c.fillStyle = 'rgba(150,220,255,' + (0.5 - fade) + ')';
            c.fillRect(ox + 16, bob + 6, 1, 10);
            // Legs
            c.fillStyle = 'rgba(30,30,50,' + (0.4 - fade) + ')';
            c.fillRect(ox + 6 - legOff, bob + 16, 3, 10);
            c.fillRect(ox + 11 + legOff, bob + 16, 3, 10);
            c.fillStyle = 'rgba(40,40,60,' + (0.3 - fade) + ')';
            c.fillRect(ox + 7 - legOff, bob + 18, 2, 8);
            c.fillRect(ox + 12 + legOff, bob + 18, 2, 8);
            // Ethereal fade
            c.fillStyle = 'rgba(30,30,50,' + (0.15 - fade * 0.5) + ')';
            c.fillRect(ox + 4, bob + 24, 12, 6);
            c.fillRect(ox + 6, bob + 28, 8, 2);
        }

        addSheet('phantom_knight_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVoidLeechCrawl() {
        const fw = 16, fh = 10, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const stretch = (f === 1 || f === 3) ? 1 : 0;

            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 2, 2 + stretch, 12, 6 - stretch);
            c.fillRect(ox + 1, 4, 14, 2);
            c.fillStyle = '#2a1a4a';
            c.fillRect(ox + 3, 3 + stretch, 10, 4 - stretch);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 12, 4, 3, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 13, 4, 2, 1);
            c.fillStyle = '#aa00ff';
            c.fillRect(ox + 4, 4, 1, 1);
            c.fillRect(ox + 6, 4, 1, 1);
            c.fillStyle = '#2a1a4a';
            c.fillRect(ox + 5, 3 + stretch, 1, 4 - stretch);
            c.fillRect(ox + 8, 3 + stretch, 1, 4 - stretch);
            c.fillRect(ox + 11, 3 + stretch, 1, 4 - stretch);
            c.fillStyle = 'rgba(30,10,60,0.2)';
            c.fillRect(ox, 4, 2, 2);
            c.fillRect(ox + 14, 5, 2, 1);
        }

        addSheet('void_leech_crawl', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genShadowMimicWalk() {
        const fw = 24, fh = 20, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const jawOpen = (f === 1 || f === 3) ? 2 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            // Chest body
            c.fillStyle = '#141422';
            c.fillRect(ox + 2, 6, 20, 12);
            c.fillRect(ox + 1, 8, 22, 8);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 4, 8, 16, 8);
            // Lid (opening)
            c.fillStyle = '#141422';
            c.fillRect(ox + 0, 2 - jawOpen, 24, 6);
            c.fillRect(ox + 2, 1 - jawOpen, 20, 2);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 2, 3 - jawOpen, 20, 4);
            // Void energy
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 4, 6, 16, 2);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 6, 6, 12, 1);
            // Eyes
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 6, 10, 3, 3);
            c.fillRect(ox + 15, 10, 3, 3);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 7, 11, 1, 1);
            c.fillRect(ox + 16, 11, 1, 1);
            // Teeth
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 4, 14, 16, 2);
            c.fillStyle = '#2a1a4a';
            c.fillRect(ox + 6, 14, 2, 1);
            c.fillRect(ox + 10, 14, 2, 1);
            c.fillRect(ox + 14, 14, 2, 1);
            // Legs
            c.fillStyle = '#141422';
            c.fillRect(ox + 3 - legOff, 18, 3, 2);
            c.fillRect(ox + 18 + legOff, 18, 3, 2);
            // Shadow aura
            c.fillStyle = 'rgba(20,10,40,0.2)';
            c.fillRect(ox + 1, 16, 22, 3);
        }

        addSheet('shadow_mimic_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genRiftHorrorWalk() {
        const fw = 28, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const tentacleSwing = (f % 2 === 0) ? 0 : 1;

            // Main mass
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 6, 4 + bob, 16, 16);
            c.fillRect(ox + 4, 8 + bob, 20, 10);
            c.fillRect(ox + 8, 2 + bob, 12, 18);
            c.fillStyle = '#141422';
            c.fillRect(ox + 8, 6 + bob, 12, 12);
            c.fillRect(ox + 6, 10 + bob, 16, 6);
            // Eyes
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 8, 8 + bob, 3, 3);
            c.fillRect(ox + 17, 8 + bob, 3, 3);
            c.fillRect(ox + 12, 10 + bob, 4, 3);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 9, 9 + bob, 1, 1);
            c.fillRect(ox + 18, 9 + bob, 1, 1);
            c.fillRect(ox + 13, 11 + bob, 2, 1);
            // Tentacles
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 2 + tentacleSwing, 10 + bob, 4, 8);
            c.fillRect(ox + 22 - tentacleSwing, 10 + bob, 4, 8);
            c.fillRect(ox + tentacleSwing, 14 + bob, 3, 6);
            c.fillRect(ox + 25 - tentacleSwing, 14 + bob, 3, 6);
            c.fillStyle = '#141422';
            c.fillRect(ox + 2 + tentacleSwing, 12 + bob, 2, 6);
            c.fillRect(ox + 24 - tentacleSwing, 12 + bob, 2, 6);
            // Tentacle tips
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + tentacleSwing, 18 + bob, 2, 3);
            c.fillRect(ox + 26 - tentacleSwing, 18 + bob, 2, 3);
            // Lower body
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 6, 20 + bob, 16, 8);
            c.fillRect(ox + 8, 24 + bob, 12, 6);
            c.fillStyle = '#141422';
            c.fillRect(ox + 8, 22 + bob, 12, 6);
            // Void tendrils
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 8, 28 + bob, 2, 4);
            c.fillRect(ox + 12, 28 + bob, 4, 4);
            c.fillRect(ox + 18, 28 + bob, 2, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 9, 30 + bob, 1, 2);
            c.fillRect(ox + 13, 30 + bob, 2, 2);
            c.fillRect(ox + 19, 30 + bob, 1, 2);
        }

        addSheet('rift_horror_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genShadowKingWalk() {
        const fw = 40, fh = 56, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legPhase = f % 4;

            // Crown
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 12, bob + 0, 16, 4);
            c.fillRect(ox + 10, bob + 2, 20, 4);
            c.fillRect(ox + 8, bob + 4, 24, 2);
            c.fillStyle = '#141422';
            c.fillRect(ox + 14, bob + 0, 4, 2);
            c.fillRect(ox + 22, bob + 0, 4, 2);
            c.fillRect(ox + 18, bob + 0, 4, 3);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 15, bob + 1, 2, 1);
            c.fillRect(ox + 23, bob + 1, 2, 1);
            c.fillRect(ox + 19, bob + 0, 2, 1);
            // Head
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 14, bob + 4, 12, 10);
            c.fillRect(ox + 12, bob + 6, 16, 8);
            c.fillStyle = '#141422';
            c.fillRect(ox + 16, bob + 6, 8, 6);
            // Eyes
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 16, bob + 8, 3, 3);
            c.fillRect(ox + 23, bob + 8, 3, 3);
            c.fillRect(ox + 12, bob + 10, 3, 2);
            c.fillRect(ox + 27, bob + 10, 3, 2);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 17, bob + 9, 1, 1);
            c.fillRect(ox + 24, bob + 9, 1, 1);
            c.fillRect(ox + 13, bob + 10, 1, 1);
            c.fillRect(ox + 28, bob + 10, 1, 1);
            // Mouth
            c.fillStyle = '#050508';
            c.fillRect(ox + 18, bob + 13, 6, 3);
            // Shoulders
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4, bob + 16, 10, 8);
            c.fillRect(ox + 26, bob + 16, 10, 8);
            c.fillRect(ox + 2, bob + 18, 14, 6);
            c.fillRect(ox + 24, bob + 18, 14, 6);
            c.fillStyle = '#141422';
            c.fillRect(ox + 6, bob + 18, 6, 4);
            c.fillRect(ox + 28, bob + 18, 6, 4);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 4, bob + 16, 4, 3);
            c.fillRect(ox + 32, bob + 16, 4, 3);
            // Torso
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 10, bob + 16, 20, 16);
            c.fillRect(ox + 8, bob + 20, 24, 10);
            c.fillStyle = '#141422';
            c.fillRect(ox + 12, bob + 18, 16, 12);
            c.fillRect(ox + 10, bob + 22, 20, 6);
            // Armor rune
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 16, bob + 22, 8, 4);
            c.fillRect(ox + 18, bob + 20, 4, 8);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 18, bob + 23, 4, 2);
            // Arms
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 2, bob + 22, 6, 10);
            c.fillRect(ox + 32, bob + 22, 6, 10);
            c.fillStyle = '#141422';
            c.fillRect(ox + 3, bob + 24, 4, 8);
            c.fillRect(ox + 33, bob + 24, 4, 8);
            // Hands
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 2, bob + 32, 4, 4);
            c.fillRect(ox + 34, bob + 32, 4, 4);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 34, 2, 3);
            c.fillRect(ox + 5, bob + 34, 2, 3);
            c.fillRect(ox + 33, bob + 34, 2, 3);
            c.fillRect(ox + 37, bob + 34, 2, 3);
            // Void blade
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 35, bob + 20, 3, 16);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 36, bob + 20, 1, 12);
            c.fillStyle = '#8a6acc';
            c.fillRect(ox + 36, bob + 22, 1, 6);
            c.fillRect(ox + 35, bob + 24, 1, 4);
            // Shield
            c.fillStyle = '#1a1a28';
            c.fillRect(ox, bob + 24, 5, 10);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 25, 3, 8);
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 2, bob + 28, 1, 2);
            c.fillRect(ox + 1, bob + 27, 3, 1);
            // Legs
            c.fillStyle = '#0a0a18';
            if (legPhase === 0) {
                c.fillRect(ox + 10, bob + 32, 7, 14);
                c.fillRect(ox + 23, bob + 32, 7, 14);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, bob + 32, 7, 14);
                c.fillRect(ox + 24, bob + 32, 7, 14);
            } else if (legPhase === 2) {
                c.fillRect(ox + 11, bob + 32, 7, 14);
                c.fillRect(ox + 22, bob + 32, 7, 14);
            } else {
                c.fillRect(ox + 10, bob + 32, 7, 14);
                c.fillRect(ox + 23, bob + 32, 7, 14);
            }
            c.fillRect(ox + 8, bob + 36, 10, 10);
            c.fillRect(ox + 22, bob + 36, 10, 10);
            c.fillStyle = '#141422';
            c.fillRect(ox + 12, bob + 34, 4, 12);
            c.fillRect(ox + 24, bob + 34, 4, 12);
            // Leg armor
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 10, bob + 32, 4, 3);
            c.fillRect(ox + 26, bob + 32, 4, 3);
            // Boots
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 8, bob + 46, 8, 4);
            c.fillRect(ox + 24, bob + 46, 8, 4);
            c.fillRect(ox + 6, bob + 48, 10, 4);
            c.fillRect(ox + 24, bob + 48, 10, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 8, bob + 48, 6, 2);
            c.fillRect(ox + 26, bob + 48, 6, 2);
            // Cape
            c.fillStyle = 'rgba(10,10,24,0.7)';
            c.fillRect(ox + 8, bob + 16, 2, 30);
            c.fillRect(ox + 30, bob + 16, 2, 30);
            c.fillStyle = 'rgba(14,14,34,0.6)';
            c.fillRect(ox + 6, bob + 20, 2, 24);
            c.fillRect(ox + 32, bob + 20, 2, 24);
            c.fillStyle = 'rgba(20,10,40,0.4)';
            c.fillRect(ox + 4, bob + 26, 2, 16);
            c.fillRect(ox + 34, bob + 26, 2, 16);
            // Shadow aura
            c.fillStyle = 'rgba(40,20,80,0.1)';
            c.fillRect(ox + 0, bob + 4, 40, 48);
        }

        addSheet('shadow_king_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genShadowStalkerWalk();
    _genVoidWispFloat();
    _genMirrorShardFloat();
    _genShadowHoundWalk();
    _genDarkReflectionWalk();
    _genVoidKnightWalk();
    _genNightmareMothFly();
    _genVoidSpawnWalk();
    _genRiftCrawlerWalk();
    _genPhantomKnightWalk();
    _genVoidLeechCrawl();
    _genShadowMimicWalk();
    _genRiftHorrorWalk();
    _genShadowKingWalk();

    // === SHADOW DISTRICT — 7 MISSING ANIMATIONS ===

    function _genMirrorImageWalk() {
        const fw = 16, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const shimmer = (f === 2) ? 0.1 : 0;

            c.fillStyle = `rgba(150,170,200,${0.3 + shimmer})`;
            c.fillRect(ox + 5, bob + 0, 6, 6);
            c.fillRect(ox + 4, bob + 2, 8, 4);
            c.fillStyle = `rgba(180,200,230,${0.4 + shimmer})`;
            c.fillRect(ox + 6, bob + 1, 4, 4);
            c.fillRect(ox + 5, bob + 3, 6, 2);
            c.fillStyle = 'rgba(200,220,255,0.8)';
            c.fillRect(ox + 6, bob + 3, 2, 2);
            c.fillRect(ox + 10, bob + 3, 2, 2);
            c.fillStyle = 'rgba(230,240,255,0.9)';
            c.fillRect(ox + 6, bob + 3, 1, 1);
            c.fillRect(ox + 10, bob + 3, 1, 1);
            c.fillStyle = `rgba(200,220,255,${0.15 + shimmer})`;
            c.fillRect(ox + 4, bob + 6, 8, 4);
            c.fillRect(ox + 3, bob + 10, 10, 4);
            c.fillStyle = `rgba(140,160,190,${0.25 + shimmer})`;
            c.fillRect(ox + 4, bob + 8, 8, 8);
            c.fillRect(ox + 3, bob + 12, 10, 6);
            c.fillStyle = `rgba(170,190,220,${0.35 + shimmer})`;
            c.fillRect(ox + 5, bob + 10, 6, 6);
            c.fillRect(ox + 4, bob + 14, 8, 4);
            c.fillStyle = `rgba(140,160,190,${0.2 + shimmer})`;
            c.fillRect(ox + 1, bob + 10, 3, 6);
            c.fillRect(ox + 12, bob + 10, 3, 6);
            c.fillStyle = `rgba(170,190,220,${0.3 + shimmer})`;
            c.fillRect(ox + 1, bob + 12, 2, 4);
            c.fillRect(ox + 13, bob + 12, 2, 4);
            c.fillStyle = `rgba(140,160,190,${0.2 + shimmer})`;
            c.fillRect(ox + 5, bob + 18, 3, 4);
            c.fillRect(ox + 9, bob + 18, 3, 4);
            c.fillStyle = `rgba(170,190,220,${0.3 + shimmer})`;
            c.fillRect(ox + 5, bob + 18, 2, 4);
            c.fillRect(ox + 10, bob + 18, 2, 4);
            c.fillStyle = 'rgba(200,220,255,0.1)';
            c.fillRect(ox + 2, bob + 4, 12, 1);
            c.fillRect(ox + 2, bob + 12, 12, 1);
            c.fillRect(ox + 2, bob + 20, 12, 1);
        }

        addSheet('mirror_image_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genDoppelgangerWalk() {
        const fw = 18, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 5, bob + 0, 8, 6);
            c.fillRect(ox + 4, bob + 2, 10, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 6, bob + 1, 6, 4);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 6, bob + 4, 6, 5);
            c.fillStyle = '#141422';
            c.fillRect(ox + 7, bob + 5, 4, 3);
            c.fillStyle = '#cc0022';
            c.fillRect(ox + 7, bob + 6, 2, 2);
            c.fillRect(ox + 11, bob + 6, 2, 2);
            c.fillStyle = '#ff2244';
            c.fillRect(ox + 7, bob + 6, 1, 1);
            c.fillRect(ox + 11, bob + 6, 1, 1);
            c.fillStyle = '#050508';
            c.fillRect(ox + 8, bob + 8, 4, 1);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 3, bob + 9, 12, 12);
            c.fillRect(ox + 2, bob + 13, 14, 8);
            c.fillStyle = '#141422';
            c.fillRect(ox + 4, bob + 11, 10, 8);
            c.fillRect(ox + 3, bob + 15, 12, 4);
            c.fillStyle = '#2a0a2a';
            c.fillRect(ox + 5, bob + 12, 2, 6);
            c.fillRect(ox + 11, bob + 12, 2, 6);
            c.fillRect(ox + 7, bob + 14, 4, 2);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 1, bob + 11, 3, 8);
            c.fillRect(ox + 14, bob + 11, 3, 8);
            c.fillStyle = '#141422';
            c.fillRect(ox + 1, bob + 15, 2, 6);
            c.fillRect(ox + 15, bob + 15, 2, 6);
            c.fillStyle = '#2a0a3a';
            c.fillRect(ox + 15, bob + 6, 2, 14);
            c.fillStyle = '#4a1a5a';
            c.fillRect(ox + 15, bob + 6, 1, 10);
            c.fillStyle = '#6a2a7a';
            c.fillRect(ox + 15, bob + 8, 1, 4);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4 - legOff, bob + 21, 4, 10);
            c.fillRect(ox + 10 + legOff, bob + 21, 4, 10);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5 - legOff, bob + 23, 2, 8);
            c.fillRect(ox + 11 + legOff, bob + 23, 2, 8);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 3 - legOff, bob + 31, 5, 4);
            c.fillRect(ox + 10 + legOff, bob + 31, 5, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 4 - legOff, bob + 32, 3, 3);
            c.fillRect(ox + 11 + legOff, bob + 32, 3, 3);
            c.fillStyle = 'rgba(20,5,40,0.2)';
            c.fillRect(ox + 2, bob + 30, 14, 5);
        }

        addSheet('doppelganger_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genVoidElementalFloat() {
        const fw = 22, fh = 22, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const pulse = (f === 1 || f === 3) ? 1 : 0;
            const drift = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4, 4 + drift, 14, 14);
            c.fillRect(ox + 2, 6 + drift, 18, 10);
            c.fillRect(ox + 6, 2 + drift, 10, 18);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5, 5 + drift, 12, 12);
            c.fillRect(ox + 3, 7 + drift, 16, 8);
            c.fillRect(ox + 7, 3 + drift, 8, 16);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 6, 6 + drift, 10, 10);
            c.fillRect(ox + 4, 8 + drift, 14, 6);
            c.fillRect(ox + 8, 4 + drift, 6, 14);
            c.fillStyle = '#2a1a4a';
            c.fillRect(ox + 7, 7 + drift, 8, 8);
            c.fillRect(ox + 5, 9 + drift, 12, 4);
            c.fillRect(ox + 9, 5 + drift, 4, 12);
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 8, 8 + drift, 6, 6);
            c.fillRect(ox + 6, 10 + drift, 10, 2);
            c.fillRect(ox + 10, 6 + drift, 2, 10);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 9, 9 + drift, 4, 4);
            c.fillStyle = '#8a6acc';
            c.fillRect(ox + 10, 10 + drift, 2, 2);
            c.fillStyle = 'rgba(20,10,40,0.5)';
            c.fillRect(ox + 1, 8 + drift, 3, 6);
            c.fillRect(ox + 18, 8 + drift, 3, 6);
            c.fillRect(ox + 8, 1 + drift, 6, 3);
            c.fillRect(ox + 8, 18 + drift, 6, 3);
            c.fillStyle = 'rgba(30,15,60,0.4)';
            c.fillRect(ox, 10 + drift, 2, 4);
            c.fillRect(ox + 20, 10 + drift, 2, 4);
            c.fillRect(ox + 10, 0, 2, 2);
            c.fillRect(ox + 10, 20, 2, 2);
            c.fillStyle = 'rgba(80,40,160,0.1)';
            c.beginPath();
            c.arc(ox + 11, 11 + drift, 10, 0, Math.PI * 2);
            c.fill();
        }

        addSheet('void_elemental_float', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genNightmareBeastWalk() {
        const fw = 24, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const tentPhase = f % 2;

            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 6, 2 + bob, 12, 12);
            c.fillRect(ox + 4, 6 + bob, 16, 8);
            c.fillRect(ox + 8, 0 + bob, 8, 14);
            c.fillStyle = '#141422';
            c.fillRect(ox + 7, 3 + bob, 10, 10);
            c.fillRect(ox + 5, 7 + bob, 14, 6);
            c.fillRect(ox + 9, 1 + bob, 6, 12);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 8, 5 + bob, 2, 2);
            c.fillRect(ox + 14, 4 + bob, 2, 3);
            c.fillRect(ox + 6, 8 + bob, 2, 2);
            c.fillRect(ox + 12, 9 + bob, 3, 2);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 8, 5 + bob, 1, 1);
            c.fillRect(ox + 14, 4 + bob, 1, 1);
            c.fillRect(ox + 6, 8 + bob, 1, 1);
            c.fillRect(ox + 12, 9 + bob, 1, 1);
            c.fillStyle = '#050508';
            c.fillRect(ox + 9, 10 + bob, 6, 2);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 2 + tentPhase, 8 + bob, 4, 10);
            c.fillRect(ox + 18 - tentPhase, 6 + bob, 4, 12);
            c.fillRect(ox + tentPhase, 12 + bob, 3, 8);
            c.fillRect(ox + 20 - tentPhase, 10 + bob, 3, 8);
            c.fillStyle = '#141422';
            c.fillRect(ox + 2 + tentPhase, 10 + bob, 2, 8);
            c.fillRect(ox + 19 - tentPhase, 8 + bob, 2, 10);
            c.fillRect(ox + tentPhase, 14 + bob, 2, 6);
            c.fillRect(ox + 21 - tentPhase, 12 + bob, 2, 6);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + tentPhase, 18 + bob, 2, 4);
            c.fillRect(ox + 2 + tentPhase, 16 + bob, 2, 3);
            c.fillRect(ox + 20 - tentPhase, 16 + bob, 2, 4);
            c.fillRect(ox + 22 - tentPhase, 14 + bob, 2, 3);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 6, 14 + bob, 12, 10);
            c.fillRect(ox + 4, 18 + bob, 16, 6);
            c.fillRect(ox + 8, 20 + bob, 8, 8);
            c.fillStyle = '#141422';
            c.fillRect(ox + 7, 16 + bob, 10, 8);
            c.fillRect(ox + 5, 20 + bob, 14, 4);
            c.fillRect(ox + 9, 22 + bob, 6, 6);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 5 - (f % 2), 24 + bob, 4, 4);
            c.fillRect(ox + 14 + (f % 2), 24 + bob, 4, 4);
            c.fillRect(ox + 3 - (f % 2), 26 + bob, 4, 4);
            c.fillRect(ox + 16 + (f % 2), 26 + bob, 4, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 6 - (f % 2), 26 + bob, 2, 2);
            c.fillRect(ox + 15 + (f % 2), 26 + bob, 2, 2);
            c.fillStyle = 'rgba(40,10,80,0.12)';
            c.fillRect(ox + 2, 0 + bob, 20, 28);
        }

        addSheet('nightmare_beast_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTwistedCopyWalk() {
        const fw = 16, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;
            const twist = (f === 1 || f === 3) ? 1 : 0;

            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 4, bob + 0, 8, 6);
            c.fillRect(ox + 3, bob + 2, 10, 4);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 5, bob + 1, 6, 4);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 5, bob + 4, 6, 5);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 5, bob + 4, 6, 3);
            c.fillStyle = '#cc22ff';
            c.fillRect(ox + 6, bob + 5, 2, 2);
            c.fillRect(ox + 10, bob + 6, 2, 1);
            c.fillStyle = '#ee44ff';
            c.fillRect(ox + 6, bob + 5, 1, 1);
            c.fillRect(ox + 10, bob + 6, 1, 1);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 7, bob + 8, 4, 1);
            c.fillRect(ox + 8, bob + 9, 2, 1);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 3 + twist, bob + 9, 10, 10);
            c.fillRect(ox + 2 + twist, bob + 12, 12, 7);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 4 + twist, bob + 10, 8, 8);
            c.fillRect(ox + 3 + twist, bob + 13, 10, 5);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 4 + twist, bob + 11, 3, 4);
            c.fillRect(ox + 9 + twist, bob + 14, 3, 3);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 1 - twist, bob + 10, 3, 10);
            c.fillRect(ox + 12 + twist, bob + 11, 3, 8);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 1 - twist, bob + 16, 2, 6);
            c.fillRect(ox + 13 + twist, bob + 15, 2, 5);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox - twist, bob + 18, 2, 3);
            c.fillRect(ox + 14 + twist, bob + 17, 2, 3);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 4, bob + 19, 8, 5);
            c.fillRect(ox + 3, bob + 22, 10, 3);
            c.fillRect(ox + 5, bob + 25, 6, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 3, bob + 21, 2, 4);
            c.fillRect(ox + 11, bob + 20, 2, 5);
            c.fillStyle = 'rgba(100,40,180,0.1)';
            c.fillRect(ox + 2, bob + 8, 12, 1);
            c.fillRect(ox + 2, bob + 16, 12, 1);
            c.fillRect(ox + 2, bob + 24, 12, 1);
        }

        addSheet('twisted_copy_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genDimensionTearPulse() {
        const fw = 20, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const pulse = (f === 1 || f === 3) ? 1 : 0;
            const flicker = (f === 2) ? 1 : 0;

            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 8, 0, 4, 2);
            c.fillRect(ox + 6, 2, 8, 2);
            c.fillRect(ox + 4, 4, 12, 2);
            c.fillRect(ox + 2, 6, 16, 2);
            c.fillRect(ox, 8, 20, 2);
            c.fillRect(ox, 20, 20, 2);
            c.fillRect(ox + 2, 22, 16, 2);
            c.fillRect(ox + 4, 24, 12, 2);
            c.fillRect(ox + 6, 26, 8, 2);
            c.fillRect(ox + 8, 28, 4, 2);
            c.fillStyle = '#050510';
            c.fillRect(ox + 6, 4, 8, 22);
            c.fillRect(ox + 4, 6, 12, 18);
            c.fillRect(ox + 2, 8, 16, 14);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 8, 6, 4, 18);
            c.fillRect(ox + 6, 10, 8, 10);
            c.fillRect(ox + 4, 14, 12, 6);
            c.fillStyle = '#2a1a4a';
            c.fillRect(ox + 8, 8, 4, 14);
            c.fillRect(ox + 6, 12, 8, 6);
            c.fillStyle = '#4a2a8a';
            c.fillRect(ox + 8, 10, 4, 10);
            c.fillRect(ox + 7, 14, 6, 4);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox + 9, 12, 2, 6);
            c.fillRect(ox + 8, 15, 4, 2);
            c.fillStyle = '#8a6acc';
            c.fillRect(ox + 9, 14, 2, 2);
            c.fillStyle = '#141422';
            c.fillRect(ox + 6, 2, 2, 2);
            c.fillRect(ox + 12, 2, 2, 2);
            c.fillRect(ox + 3, 6, 2, 2);
            c.fillRect(ox + 15, 6, 2, 2);
            c.fillRect(ox, 10, 2, 2);
            c.fillRect(ox + 18, 10, 2, 2);
            c.fillRect(ox, 18, 2, 2);
            c.fillRect(ox + 18, 18, 2, 2);
            c.fillRect(ox + 3, 22, 2, 2);
            c.fillRect(ox + 15, 22, 2, 2);
            c.fillRect(ox + 6, 26, 2, 2);
            c.fillRect(ox + 12, 26, 2, 2);
            c.fillStyle = `rgba(80,40,160,${0.08 + pulse * 0.04})`;
            c.beginPath();
            c.arc(ox + 10, 15, 10, 0, Math.PI * 2);
            c.fill();
        }

        addSheet('dimension_tear_pulse', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genShadeWalk() {
        const fw = 14, fh = 14, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4, 2 + bob, 6, 8);
            c.fillRect(ox + 3, 4 + bob, 8, 4);
            c.fillRect(ox + 5, 0 + bob, 4, 10);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5, 3 + bob, 4, 6);
            c.fillRect(ox + 4, 5 + bob, 6, 2);
            c.fillStyle = '#cc0022';
            c.fillRect(ox + 5, 4 + bob, 2, 2);
            c.fillRect(ox + 9, 4 + bob, 2, 2);
            c.fillStyle = '#ff2244';
            c.fillRect(ox + 5, 4 + bob, 1, 1);
            c.fillRect(ox + 9, 4 + bob, 1, 1);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 2 - legOff, 5 + bob, 2, 4);
            c.fillRect(ox + 10 + legOff, 5 + bob, 2, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 2 - legOff, 6 + bob, 1, 3);
            c.fillRect(ox + 11 + legOff, 6 + bob, 1, 3);
            c.fillStyle = '#0a0a18';
            c.fillRect(ox + 4 - legOff, 10 + bob, 2, 3);
            c.fillRect(ox + 8 + legOff, 10 + bob, 2, 3);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5 - legOff, 10 + bob, 1, 3);
            c.fillRect(ox + 9 + legOff, 10 + bob, 1, 3);
            c.fillStyle = 'rgba(10,10,24,0.3)';
            c.fillRect(ox + 3, 12, 8, 1);
            c.fillRect(ox + 4, 13, 6, 1);
        }

        addSheet('shade_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genMirrorImageWalk();
    _genDoppelgangerWalk();
    _genVoidElementalFloat();
    _genNightmareBeastWalk();
    _genTwistedCopyWalk();
    _genDimensionTearPulse();
    _genShadeWalk();

    // === TOWER OF THE FALLEN KING — WALK ANIMATIONS ===

    function _genTowerKnightWalk() {
        const fw = 22, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 6, bob + 0, 10, 6);
            c.fillRect(ox + 5, bob + 2, 12, 4);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 7, bob + 1, 8, 4);
            c.fillStyle = '#6a4a2a';
            c.fillRect(ox + 8, bob + 0, 2, 2);
            c.fillRect(ox + 14, bob + 1, 2, 1);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 6, bob + 4, 10, 3);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 7, bob + 5, 8, 1);
            c.fillStyle = '#c4a882';
            c.fillRect(ox + 7, bob + 5, 8, 5);
            c.fillStyle = '#b49872';
            c.fillRect(ox + 8, bob + 6, 6, 3);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 9, bob + 7, 2, 2);
            c.fillRect(ox + 13, bob + 7, 2, 2);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 4, bob + 10, 14, 10);
            c.fillRect(ox + 3, bob + 14, 16, 6);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 5, bob + 12, 12, 6);
            c.fillStyle = '#7a7a82';
            c.fillRect(ox + 6, bob + 11, 2, 2);
            c.fillRect(ox + 14, bob + 11, 2, 2);
            c.fillRect(ox + 6, bob + 19, 2, 2);
            c.fillRect(ox + 14, bob + 19, 2, 2);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox + 7, bob + 13, 3, 2);
            c.fillRect(ox + 12, bob + 16, 2, 2);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 1, bob + 12, 3, 8);
            c.fillRect(ox + 18, bob + 12, 3, 8);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 2, bob + 14, 1, 4);
            c.fillRect(ox + 19, bob + 14, 1, 4);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox, bob + 12, 4, 8);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 1, bob + 13, 2, 6);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 1, bob + 15, 2, 2);
            c.fillStyle = '#8a8a92';
            c.fillRect(ox + 19, bob + 4, 2, 14);
            c.fillStyle = '#9a9aa2';
            c.fillRect(ox + 19, bob + 4, 1, 10);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox + 18, bob + 16, 4, 2);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 5 - legOff, bob + 20, 4, 8);
            c.fillRect(ox + 13 + legOff, bob + 20, 4, 8);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 6 - legOff, bob + 20, 2, 8);
            c.fillRect(ox + 14 + legOff, bob + 20, 2, 8);
            c.fillStyle = '#2a2a32';
            c.fillRect(ox + 4 - legOff, bob + 28, 5, 3);
            c.fillRect(ox + 13 + legOff, bob + 28, 5, 3);
        }

        addSheet('tower_knight_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTowerMageWalk() {
        const fw = 16, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4, bob + 0, 8, 6);
            c.fillRect(ox + 3, bob + 2, 10, 4);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 5, bob + 1, 6, 4);
            c.fillStyle = '#d4b896';
            c.fillRect(ox + 5, bob + 4, 6, 5);
            c.fillStyle = '#c4a886';
            c.fillRect(ox + 6, bob + 5, 4, 3);
            c.fillStyle = '#aa44ff';
            c.fillRect(ox + 6, bob + 6, 2, 1);
            c.fillRect(ox + 10, bob + 6, 2, 1);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 3, bob + 9, 10, 10);
            c.fillRect(ox + 2, bob + 12, 12, 7);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 4, bob + 10, 8, 8);
            c.fillRect(ox + 3, bob + 13, 10, 5);
            c.fillStyle = '#4a2a6a';
            c.fillRect(ox + 6, bob + 12, 4, 1);
            c.fillRect(ox + 7, bob + 14, 2, 1);
            c.fillRect(ox + 6, bob + 16, 4, 1);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox, bob + 4, 2, 20);
            c.fillStyle = '#6a4a2a';
            c.fillRect(ox, bob + 4, 1, 16);
            c.fillStyle = '#6a4aaa';
            c.fillRect(ox, bob + 2, 2, 3);
            c.fillStyle = '#8a6acc';
            c.fillRect(ox, bob + 2, 1, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 1, bob + 11, 2, 6);
            c.fillRect(ox + 13, bob + 11, 2, 6);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 15, 1, 3);
            c.fillRect(ox + 14, bob + 15, 1, 3);
            c.fillStyle = '#0a0a1a';
            c.fillRect(ox + 4 - legOff, bob + 19, 8, 4);
            c.fillRect(ox + 3 - legOff, bob + 22, 10, 3);
            c.fillRect(ox + 5 - legOff, bob + 25, 6, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4 - legOff, bob + 26, 3, 2);
            c.fillRect(ox + 9 + legOff, bob + 26, 3, 2);
        }

        addSheet('tower_mage_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTowerArcherWalk() {
        const fw = 18, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#2a3a1a';
            c.fillRect(ox + 5, bob + 0, 8, 5);
            c.fillRect(ox + 4, bob + 2, 10, 4);
            c.fillStyle = '#3a4a2a';
            c.fillRect(ox + 6, bob + 1, 6, 3);
            c.fillStyle = '#c4a882';
            c.fillRect(ox + 6, bob + 4, 6, 5);
            c.fillStyle = '#b49872';
            c.fillRect(ox + 7, bob + 5, 4, 3);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 8, bob + 6, 1, 2);
            c.fillRect(ox + 11, bob + 6, 1, 2);
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 3, bob + 9, 12, 10);
            c.fillStyle = '#6d4c2a';
            c.fillRect(ox + 5, bob + 10, 8, 8);
            c.fillStyle = '#4a2d10';
            c.fillRect(ox + 5, bob + 12, 8, 1);
            c.fillRect(ox + 5, bob + 16, 8, 1);
            c.fillRect(ox + 9, bob + 9, 1, 10);
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 1, bob + 11, 3, 7);
            c.fillRect(ox + 14, bob + 11, 3, 7);
            c.fillStyle = '#c4a882';
            c.fillRect(ox + 1, bob + 18, 2, 3);
            c.fillRect(ox + 15, bob + 18, 2, 3);
            c.fillStyle = '#6d4c2a';
            c.fillRect(ox, bob + 6, 2, 20);
            c.fillStyle = '#8b4513';
            c.fillRect(ox, bob + 6, 1, 20);
            c.fillStyle = '#d4b896';
            c.fillRect(ox, bob + 8, 2, 1);
            c.fillRect(ox, bob + 16, 2, 1);
            c.fillRect(ox, bob + 24, 2, 1);
            c.fillStyle = '#6d4c2a';
            c.fillRect(ox + 14, bob + 8, 4, 10);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 15, bob + 6, 2, 4);
            c.fillRect(ox + 17, bob + 6, 2, 4);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 3, bob + 19, 12, 2);
            c.fillStyle = '#3a4a2a';
            c.fillRect(ox + 5 - legOff, bob + 21, 4, 6);
            c.fillRect(ox + 10 + legOff, bob + 21, 4, 6);
            c.fillStyle = '#2a3a1a';
            c.fillRect(ox + 6 - legOff, bob + 23, 2, 4);
            c.fillRect(ox + 11 + legOff, bob + 23, 2, 4);
            c.fillStyle = '#4a3a2a';
            c.fillRect(ox + 4 - legOff, bob + 27, 5, 3);
            c.fillRect(ox + 10 + legOff, bob + 27, 5, 3);
        }

        addSheet('tower_archer_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTowerHealerWalk() {
        const fw = 16, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 4, bob + 0, 8, 6);
            c.fillRect(ox + 3, bob + 2, 10, 4);
            c.fillStyle = '#fff';
            c.fillRect(ox + 5, bob + 1, 6, 4);
            c.fillStyle = '#d4b896';
            c.fillRect(ox + 5, bob + 4, 6, 5);
            c.fillStyle = '#c4a886';
            c.fillRect(ox + 6, bob + 5, 4, 3);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 7, bob + 6, 1, 1);
            c.fillRect(ox + 10, bob + 6, 1, 1);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 7, bob + 2, 2, 1);
            c.fillRect(ox + 7, bob + 3, 1, 2);
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 3, bob + 9, 10, 10);
            c.fillRect(ox + 2, bob + 12, 12, 7);
            c.fillStyle = '#fff';
            c.fillRect(ox + 4, bob + 10, 8, 8);
            c.fillRect(ox + 3, bob + 13, 10, 5);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 3, bob + 9, 10, 1);
            c.fillRect(ox + 3, bob + 18, 10, 1);
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 1, bob + 11, 2, 6);
            c.fillRect(ox + 13, bob + 11, 2, 6);
            c.fillStyle = '#d4b896';
            c.fillRect(ox + 1, bob + 15, 1, 3);
            c.fillRect(ox + 14, bob + 15, 1, 3);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox, bob + 4, 2, 20);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox, bob + 4, 1, 16);
            c.fillStyle = '#27ae60';
            c.fillRect(ox, bob + 2, 2, 3);
            c.fillStyle = '#2ecc71';
            c.fillRect(ox, bob + 2, 1, 2);
            c.fillStyle = '#d5dbdb';
            c.fillRect(ox + 4 - legOff, bob + 19, 8, 4);
            c.fillRect(ox + 3 - legOff, bob + 22, 10, 3);
            c.fillRect(ox + 5 - legOff, bob + 25, 6, 2);
            c.fillStyle = '#d4b896';
            c.fillRect(ox + 4 - legOff, bob + 26, 3, 2);
            c.fillRect(ox + 9 + legOff, bob + 26, 3, 2);
        }

        addSheet('tower_healer_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTowerAssassinWalk() {
        const fw = 16, fh = 26, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 5, bob + 0, 6, 6);
            c.fillRect(ox + 4, bob + 2, 8, 4);
            c.fillStyle = '#141422';
            c.fillRect(ox + 6, bob + 1, 4, 4);
            c.fillStyle = '#cc0022';
            c.fillRect(ox + 7, bob + 3, 2, 1);
            c.fillRect(ox + 10, bob + 3, 2, 1);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 6, bob + 5, 4, 2);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 3, bob + 7, 10, 10);
            c.fillRect(ox + 2, bob + 10, 12, 7);
            c.fillStyle = '#141422';
            c.fillRect(ox + 4, bob + 8, 8, 8);
            c.fillRect(ox + 3, bob + 11, 10, 5);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 3, bob + 15, 10, 2);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 7, bob + 15, 2, 2);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 1, bob + 9, 2, 6);
            c.fillRect(ox + 13, bob + 9, 2, 6);
            c.fillStyle = '#141422';
            c.fillRect(ox + 1, bob + 13, 1, 3);
            c.fillRect(ox + 14, bob + 13, 1, 3);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 1, bob + 14, 1, 6);
            c.fillRect(ox + 14, bob + 14, 1, 6);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 1, bob + 14, 1, 2);
            c.fillRect(ox + 14, bob + 14, 1, 2);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 4 - legOff, bob + 17, 3, 6);
            c.fillRect(ox + 9 + legOff, bob + 17, 3, 6);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5 - legOff, bob + 19, 1, 4);
            c.fillRect(ox + 10 + legOff, bob + 19, 1, 4);
            c.fillStyle = '#1a1a28';
            c.fillRect(ox + 3 - legOff, bob + 23, 4, 3);
            c.fillRect(ox + 9 + legOff, bob + 23, 4, 3);
        }

        addSheet('tower_assassin_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genRoyalGuardWalk() {
        const fw = 26, fh = 36, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 8, bob + 0, 10, 3);
            c.fillRect(ox + 8, bob + 0, 2, 5);
            c.fillRect(ox + 16, bob + 0, 2, 5);
            c.fillRect(ox + 12, bob + 0, 2, 4);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 9, bob + 1, 8, 1);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 8, bob + 0, 2, 1);
            c.fillRect(ox + 16, bob + 0, 2, 1);
            c.fillRect(ox + 12, bob + 0, 2, 1);
            c.fillStyle = '#c8a832';
            c.fillRect(ox + 8, bob + 3, 10, 6);
            c.fillRect(ox + 6, bob + 5, 14, 4);
            c.fillStyle = '#d4b442';
            c.fillRect(ox + 9, bob + 4, 8, 4);
            c.fillStyle = '#aa8822';
            c.fillRect(ox + 8, bob + 7, 10, 3);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 10, bob + 8, 2, 2);
            c.fillRect(ox + 14, bob + 8, 2, 2);
            c.fillStyle = '#c4a882';
            c.fillRect(ox + 10, bob + 8, 6, 4);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 11, bob + 9, 2, 2);
            c.fillRect(ox + 15, bob + 9, 2, 2);
            c.fillStyle = '#c8a832';
            c.fillRect(ox + 4, bob + 12, 18, 12);
            c.fillRect(ox + 2, bob + 16, 22, 8);
            c.fillStyle = '#d4b442';
            c.fillRect(ox + 6, bob + 14, 14, 8);
            c.fillStyle = '#e8c852';
            c.fillRect(ox + 8, bob + 14, 10, 2);
            c.fillRect(ox + 8, bob + 20, 10, 2);
            c.fillStyle = '#aa8822';
            c.fillRect(ox + 10, bob + 16, 6, 2);
            c.fillStyle = '#c8a832';
            c.fillRect(ox + 1, bob + 12, 4, 6);
            c.fillRect(ox + 21, bob + 12, 4, 6);
            c.fillStyle = '#d4b442';
            c.fillRect(ox + 2, bob + 13, 2, 4);
            c.fillRect(ox + 22, bob + 13, 2, 4);
            c.fillStyle = '#c8a832';
            c.fillRect(ox + 1, bob + 18, 3, 8);
            c.fillRect(ox + 22, bob + 18, 3, 8);
            c.fillStyle = '#d4b442';
            c.fillRect(ox + 2, bob + 20, 1, 4);
            c.fillRect(ox + 23, bob + 20, 1, 4);
            c.fillStyle = '#c4a882';
            c.fillRect(ox + 1, bob + 26, 3, 3);
            c.fillRect(ox + 22, bob + 26, 3, 3);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 23, bob + 2, 2, 28);
            c.fillStyle = '#9a5a2a';
            c.fillRect(ox + 23, bob + 2, 1, 24);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 22, bob + 0, 4, 4);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 23, bob + 0, 2, 3);
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 21, bob + 2, 2, 3);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 6 - legOff, bob + 24, 5, 8);
            c.fillRect(ox + 15 + legOff, bob + 24, 5, 8);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 7 - legOff, bob + 26, 3, 6);
            c.fillRect(ox + 16 + legOff, bob + 26, 3, 6);
            c.fillStyle = '#2a2a32';
            c.fillRect(ox + 5 - legOff, bob + 32, 7, 3);
            c.fillRect(ox + 14 + legOff, bob + 32, 7, 3);
            c.fillStyle = '#c8a832';
            c.fillRect(ox + 5 - legOff, bob + 32, 7, 1);
            c.fillRect(ox + 14 + legOff, bob + 32, 7, 1);
        }

        addSheet('royal_guard_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genDarkCounselorWalk() {
        const fw = 18, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 5, bob + 0, 8, 6);
            c.fillRect(ox + 4, bob + 2, 10, 4);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 6, bob + 1, 6, 4);
            c.fillStyle = '#c4a080';
            c.fillRect(ox + 6, bob + 4, 6, 5);
            c.fillStyle = '#b49070';
            c.fillRect(ox + 7, bob + 5, 4, 3);
            c.fillStyle = '#ccaa00';
            c.fillRect(ox + 7, bob + 6, 1, 1);
            c.fillRect(ox + 10, bob + 6, 1, 1);
            c.fillStyle = '#8a6a4a';
            c.fillRect(ox + 8, bob + 8, 3, 1);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 3, bob + 9, 12, 10);
            c.fillRect(ox + 2, bob + 12, 14, 7);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 4, bob + 10, 10, 8);
            c.fillRect(ox + 3, bob + 13, 12, 5);
            c.fillStyle = '#4a2a6a';
            c.fillRect(ox + 6, bob + 12, 4, 1);
            c.fillRect(ox + 7, bob + 14, 2, 1);
            c.fillRect(ox + 6, bob + 16, 4, 1);
            c.fillRect(ox + 7, bob + 18, 2, 1);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox, bob + 4, 2, 22);
            c.fillStyle = '#4a3a2a';
            c.fillRect(ox, bob + 4, 1, 18);
            c.fillStyle = '#2a0a3a';
            c.fillRect(ox, bob + 2, 2, 3);
            c.fillStyle = '#4a1a5a';
            c.fillRect(ox, bob + 2, 1, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 1, bob + 11, 2, 7);
            c.fillRect(ox + 15, bob + 11, 2, 7);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 1, bob + 16, 1, 3);
            c.fillRect(ox + 16, bob + 16, 1, 3);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 4 - legOff, bob + 19, 10, 4);
            c.fillRect(ox + 3 - legOff, bob + 22, 12, 3);
            c.fillRect(ox + 5 - legOff, bob + 25, 8, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 5 - legOff, bob + 27, 3, 2);
            c.fillRect(ox + 10 + legOff, bob + 27, 3, 2);
        }

        addSheet('dark_counselor_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTwistedNobleWalk() {
        const fw = 18, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;
            const twist = (f === 1 || f === 3) ? 1 : 0;

            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 5, bob + 0, 8, 6);
            c.fillRect(ox + 4, bob + 2, 10, 4);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 6, bob + 1, 6, 4);
            c.fillStyle = '#8a6a5a';
            c.fillRect(ox + 6, bob + 4, 6, 5);
            c.fillStyle = '#7a5a4a';
            c.fillRect(ox + 7, bob + 5, 4, 3);
            c.fillStyle = '#aa00ff';
            c.fillRect(ox + 7, bob + 5, 2, 2);
            c.fillRect(ox + 11, bob + 6, 1, 1);
            c.fillStyle = '#5a3a2a';
            c.fillRect(ox + 8, bob + 8, 3, 1);
            c.fillRect(ox + 9, bob + 9, 2, 1);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 3 + twist, bob + 9, 12, 10);
            c.fillRect(ox + 2 + twist, bob + 12, 14, 7);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 4 + twist, bob + 10, 10, 8);
            c.fillRect(ox + 3 + twist, bob + 13, 12, 5);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 5 + twist, bob + 11, 3, 4);
            c.fillRect(ox + 10 + twist, bob + 14, 3, 3);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 1 - twist, bob + 10, 3, 8);
            c.fillRect(ox + 14 + twist, bob + 11, 3, 7);
            c.fillStyle = '#3a2a4a';
            c.fillRect(ox + 1 - twist, bob + 14, 2, 6);
            c.fillRect(ox + 15 + twist, bob + 14, 2, 5);
            c.fillStyle = '#8a6a5a';
            c.fillRect(ox - twist, bob + 16, 2, 3);
            c.fillRect(ox + 16 + twist, bob + 15, 2, 3);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 4, bob + 19, 10, 4);
            c.fillRect(ox + 3, bob + 22, 12, 3);
            c.fillRect(ox + 5, bob + 25, 8, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 3, bob + 21, 2, 4);
            c.fillRect(ox + 13, bob + 20, 2, 5);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 4, bob + 26, 3, 2);
            c.fillRect(ox + 10, bob + 26, 3, 2);
        }

        addSheet('twisted_noble_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genShadowAdvisorWalk() {
        const fw = 16, fh = 26, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const fade = (f === 1 || f === 3) ? 0.05 : 0;

            c.fillStyle = `rgba(20,20,40,${0.4 - fade})`;
            c.fillRect(ox + 4, bob + 0, 8, 6);
            c.fillRect(ox + 3, bob + 2, 10, 4);
            c.fillStyle = `rgba(30,30,50,${0.5 - fade})`;
            c.fillRect(ox + 5, bob + 1, 6, 4);
            c.fillStyle = `rgba(40,40,60,${0.5 - fade})`;
            c.fillRect(ox + 5, bob + 4, 6, 5);
            c.fillStyle = `rgba(50,50,70,${0.6 - fade})`;
            c.fillRect(ox + 6, bob + 5, 4, 3);
            c.fillStyle = '#aa44ff';
            c.fillRect(ox + 6, bob + 5, 2, 1);
            c.fillRect(ox + 10, bob + 6, 2, 1);
            c.fillStyle = '#cc66ff';
            c.fillRect(ox + 6, bob + 5, 1, 1);
            c.fillRect(ox + 10, bob + 6, 1, 1);
            c.fillStyle = `rgba(20,20,40,${0.3 - fade})`;
            c.fillRect(ox + 3, bob + 9, 10, 10);
            c.fillRect(ox + 2, bob + 12, 12, 7);
            c.fillStyle = `rgba(30,30,50,${0.4 - fade})`;
            c.fillRect(ox + 4, bob + 10, 8, 8);
            c.fillRect(ox + 3, bob + 13, 10, 5);
            c.fillStyle = `rgba(20,20,40,${0.25 - fade})`;
            c.fillRect(ox + 1, bob + 11, 2, 6);
            c.fillRect(ox + 13, bob + 11, 2, 6);
            c.fillStyle = `rgba(30,30,50,${0.35 - fade})`;
            c.fillRect(ox + 1, bob + 15, 1, 3);
            c.fillRect(ox + 14, bob + 15, 1, 3);
            c.fillStyle = `rgba(20,20,40,${0.2 - fade})`;
            c.fillRect(ox + 4, bob + 19, 8, 4);
            c.fillRect(ox + 3, bob + 22, 10, 3);
            c.fillRect(ox + 5, bob + 25, 6, 1);
            c.fillStyle = 'rgba(80,40,160,0.08)';
            c.fillRect(ox + 2, bob + 8, 12, 1);
            c.fillRect(ox + 2, bob + 16, 12, 1);
            c.fillRect(ox + 2, bob + 24, 12, 1);
        }

        addSheet('shadow_advisor_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genFallenPaladinWalk() {
        const fw = 24, fh = 34, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 7, bob + 0, 10, 6);
            c.fillRect(ox + 6, bob + 2, 12, 4);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 8, bob + 1, 8, 4);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 10, bob + 0, 2, 2);
            c.fillRect(ox + 15, bob + 1, 2, 1);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 7, bob + 4, 10, 3);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 8, bob + 5, 8, 1);
            c.fillStyle = '#b49872';
            c.fillRect(ox + 8, bob + 5, 8, 5);
            c.fillStyle = '#a48862';
            c.fillRect(ox + 9, bob + 6, 6, 3);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 10, bob + 7, 2, 2);
            c.fillRect(ox + 14, bob + 7, 2, 2);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 4, bob + 10, 16, 12);
            c.fillRect(ox + 2, bob + 14, 20, 8);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 6, bob + 12, 12, 8);
            c.fillStyle = '#2a0a2a';
            c.fillRect(ox + 7, bob + 13, 2, 6);
            c.fillRect(ox + 15, bob + 13, 2, 6);
            c.fillRect(ox + 9, bob + 15, 6, 2);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox, bob + 12, 5, 10);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 1, bob + 13, 3, 8);
            c.fillStyle = '#6a6a72';
            c.fillRect(ox + 2, bob + 15, 1, 4);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox, bob + 18, 2, 4);
            c.fillRect(ox + 3, bob + 20, 2, 2);
            c.fillStyle = '#8a8a92';
            c.fillRect(ox + 20, bob + 6, 2, 10);
            c.fillStyle = '#9a9aa2';
            c.fillRect(ox + 20, bob + 6, 1, 6);
            c.fillStyle = '#5a3a1a';
            c.fillRect(ox + 19, bob + 14, 4, 2);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 20, bob + 4, 2, 3);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 1, bob + 16, 3, 6);
            c.fillRect(ox + 20, bob + 16, 3, 6);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 2, bob + 18, 1, 4);
            c.fillRect(ox + 21, bob + 18, 1, 4);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 6 - legOff, bob + 22, 4, 8);
            c.fillRect(ox + 14 + legOff, bob + 22, 4, 8);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 7 - legOff, bob + 24, 2, 6);
            c.fillRect(ox + 15 + legOff, bob + 24, 2, 6);
            c.fillStyle = '#2a2a32';
            c.fillRect(ox + 5 - legOff, bob + 30, 6, 3);
            c.fillRect(ox + 13 + legOff, bob + 30, 6, 3);
        }

        addSheet('fallen_paladin_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genFallenKingWalk() {
        const fw = 40, fh = 56, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legPhase = f % 4;

            c.fillStyle = '#aa8822';
            c.fillRect(ox + 12, bob + 0, 16, 4);
            c.fillRect(ox + 10, bob + 2, 20, 3);
            c.fillRect(ox + 8, bob + 4, 24, 2);
            c.fillStyle = '#ccaa44';
            c.fillRect(ox + 14, bob + 0, 4, 2);
            c.fillRect(ox + 22, bob + 0, 4, 2);
            c.fillRect(ox + 18, bob + 0, 3, 3);
            c.fillStyle = '#8a6a12';
            c.fillRect(ox + 16, bob + 0, 2, 2);
            c.fillRect(ox + 20, bob + 1, 2, 1);
            c.fillStyle = '#880000';
            c.fillRect(ox + 13, bob + 1, 2, 1);
            c.fillRect(ox + 25, bob + 1, 2, 1);
            c.fillRect(ox + 19, bob + 0, 1, 1);
            c.fillStyle = '#8a7a6a';
            c.fillRect(ox + 14, bob + 4, 12, 10);
            c.fillRect(ox + 12, bob + 6, 16, 8);
            c.fillStyle = '#9a8a7a';
            c.fillRect(ox + 16, bob + 6, 8, 6);
            c.fillStyle = '#cc2200';
            c.fillRect(ox + 16, bob + 8, 3, 3);
            c.fillRect(ox + 23, bob + 8, 3, 3);
            c.fillStyle = '#ff4422';
            c.fillRect(ox + 17, bob + 9, 1, 1);
            c.fillRect(ox + 24, bob + 9, 1, 1);
            c.fillStyle = '#5a4a3a';
            c.fillRect(ox + 18, bob + 13, 6, 2);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox + 19, bob + 13, 1, 1);
            c.fillRect(ox + 22, bob + 13, 1, 1);
            c.fillStyle = '#7a7a7a';
            c.fillRect(ox + 16, bob + 14, 8, 4);
            c.fillRect(ox + 17, bob + 16, 6, 4);
            c.fillRect(ox + 18, bob + 18, 4, 3);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 8, bob + 16, 24, 16);
            c.fillRect(ox + 6, bob + 20, 28, 12);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 10, bob + 18, 20, 12);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 12, bob + 18, 4, 4);
            c.fillRect(ox + 22, bob + 20, 6, 3);
            c.fillRect(ox + 14, bob + 26, 8, 2);
            c.fillStyle = '#aa8822';
            c.fillRect(ox + 16, bob + 22, 8, 4);
            c.fillRect(ox + 18, bob + 20, 4, 8);
            c.fillStyle = '#880000';
            c.fillRect(ox + 17, bob + 22, 2, 2);
            c.fillRect(ox + 21, bob + 23, 2, 1);
            c.fillStyle = '#8b0000';
            c.fillRect(ox + 6, bob + 16, 4, 30);
            c.fillRect(ox + 30, bob + 16, 4, 30);
            c.fillStyle = '#660000';
            c.fillRect(ox + 4, bob + 20, 4, 24);
            c.fillRect(ox + 32, bob + 20, 4, 24);
            c.fillStyle = '#440000';
            c.fillRect(ox + 2, bob + 26, 4, 18);
            c.fillRect(ox + 34, bob + 26, 4, 18);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4, bob + 34, 2, 6);
            c.fillRect(ox + 34, bob + 36, 2, 4);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 2, bob + 22, 6, 12);
            c.fillRect(ox + 32, bob + 22, 6, 12);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 3, bob + 24, 4, 8);
            c.fillRect(ox + 33, bob + 24, 4, 8);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 2, bob + 34, 5, 4);
            c.fillRect(ox + 33, bob + 34, 5, 4);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 3, bob + 35, 3, 2);
            c.fillRect(ox + 34, bob + 35, 3, 2);
            c.fillStyle = '#aa8822';
            c.fillRect(ox + 35, bob + 12, 3, 20);
            c.fillStyle = '#ccaa44';
            c.fillRect(ox + 36, bob + 12, 1, 16);
            c.fillStyle = '#880000';
            c.fillRect(ox + 35, bob + 10, 3, 3);
            c.fillRect(ox + 34, bob + 11, 5, 1);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 10, bob + 32, 7, 14);
            c.fillRect(ox + 23, bob + 32, 7, 14);
            c.fillRect(ox + 8, bob + 36, 10, 10);
            c.fillRect(ox + 22, bob + 36, 10, 10);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 12, bob + 34, 4, 12);
            c.fillRect(ox + 24, bob + 34, 4, 12);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 10, bob + 32, 4, 3);
            c.fillRect(ox + 26, bob + 32, 4, 3);
            c.fillStyle = '#aa8822';
            c.fillRect(ox + 8, bob + 46, 8, 4);
            c.fillRect(ox + 24, bob + 46, 8, 4);
            c.fillRect(ox + 6, bob + 48, 10, 4);
            c.fillRect(ox + 24, bob + 48, 10, 4);
            c.fillStyle = '#ccaa44';
            c.fillRect(ox + 8, bob + 48, 6, 2);
            c.fillRect(ox + 26, bob + 48, 6, 2);
            c.fillStyle = 'rgba(100,20,0,0.08)';
            c.fillRect(ox + 4, bob + 4, 32, 48);
        }

        addSheet('fallen_king_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genTowerGuardianWalk() {
        const fw = 20, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 6, bob + 0, 8, 6);
            c.fillRect(ox + 5, bob + 2, 10, 4);
            c.fillStyle = '#6a6a72';
            c.fillRect(ox + 7, bob + 1, 6, 4);
            c.fillStyle = '#ff6600';
            c.fillRect(ox + 8, bob + 3, 2, 2);
            c.fillRect(ox + 12, bob + 3, 2, 2);
            c.fillStyle = '#ffaa00';
            c.fillRect(ox + 8, bob + 3, 1, 1);
            c.fillRect(ox + 12, bob + 3, 1, 1);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 4, bob + 6, 12, 10);
            c.fillRect(ox + 3, bob + 10, 14, 6);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 5, bob + 8, 10, 6);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 7, bob + 8, 1, 4);
            c.fillRect(ox + 13, bob + 10, 1, 3);
            c.fillRect(ox + 9, bob + 12, 3, 1);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 1, bob + 8, 3, 8);
            c.fillRect(ox + 16, bob + 8, 3, 8);
            c.fillStyle = '#5a5a62';
            c.fillRect(ox + 2, bob + 10, 1, 4);
            c.fillRect(ox + 17, bob + 10, 1, 4);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 1, bob + 16, 3, 3);
            c.fillRect(ox + 16, bob + 16, 3, 3);
            c.fillStyle = '#3a3a42';
            c.fillRect(ox + 5 - legOff, bob + 16, 4, 8);
            c.fillRect(ox + 11 + legOff, bob + 16, 4, 8);
            c.fillStyle = '#4a4a52';
            c.fillRect(ox + 6 - legOff, bob + 18, 2, 6);
            c.fillRect(ox + 12 + legOff, bob + 18, 2, 6);
            c.fillStyle = '#2a2a32';
            c.fillRect(ox + 4 - legOff, bob + 24, 5, 3);
            c.fillRect(ox + 11 + legOff, bob + 24, 5, 3);
            c.fillStyle = 'rgba(255,100,0,0.1)';
            c.beginPath();
            c.arc(ox + 10, bob + 10, 10, 0, Math.PI * 2);
            c.fill();
        }

        addSheet('tower_guardian_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genTowerKnightWalk();
    _genTowerMageWalk();
    _genTowerArcherWalk();
    _genTowerHealerWalk();
    _genTowerAssassinWalk();
    _genRoyalGuardWalk();
    _genDarkCounselorWalk();
    _genTwistedNobleWalk();
    _genShadowAdvisorWalk();
    _genFallenPaladinWalk();
    _genFallenKingWalk();
    _genTowerGuardianWalk();

    // === THRONE OF ETERNITY — WALK ANIMATIONS ===

    function _genEternityLordWalk() {
        const fw = 50, fh = 64, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legPhase = f % 4;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 14, bob + 0, 22, 5);
            c.fillRect(ox + 12, bob + 2, 26, 4);
            c.fillRect(ox + 10, bob + 4, 30, 3);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 16, bob + 0, 6, 3);
            c.fillRect(ox + 28, bob + 0, 6, 3);
            c.fillRect(ox + 22, bob + 0, 6, 4);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 15, bob + 1, 3, 2);
            c.fillRect(ox + 29, bob + 1, 3, 2);
            c.fillRect(ox + 23, bob + 0, 4, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 16, bob + 5, 18, 12);
            c.fillRect(ox + 14, bob + 8, 22, 10);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 18, bob + 7, 14, 8);
            c.fillRect(ox + 16, bob + 10, 18, 4);
            c.fillStyle = '#ff2200';
            c.fillRect(ox + 18, bob + 10, 4, 4);
            c.fillRect(ox + 28, bob + 10, 4, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 19, bob + 11, 2, 2);
            c.fillRect(ox + 29, bob + 11, 2, 2);
            c.fillStyle = '#ffaa88';
            c.fillRect(ox + 20, bob + 12, 1, 1);
            c.fillRect(ox + 30, bob + 12, 1, 1);
            c.fillStyle = '#050510';
            c.fillRect(ox + 22, bob + 16, 8, 3);
            c.fillStyle = '#ff2200';
            c.fillRect(ox + 23, bob + 16, 2, 2);
            c.fillRect(ox + 27, bob + 16, 2, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4, bob + 18, 14, 12);
            c.fillRect(ox + 32, bob + 18, 14, 12);
            c.fillRect(ox + 2, bob + 22, 18, 8);
            c.fillRect(ox + 30, bob + 22, 18, 8);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 6, bob + 20, 10, 8);
            c.fillRect(ox + 34, bob + 20, 10, 8);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 4, bob + 18, 6, 3);
            c.fillRect(ox + 40, bob + 18, 6, 3);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 5, bob + 18, 4, 2);
            c.fillRect(ox + 41, bob + 18, 4, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 12, bob + 18, 26, 20);
            c.fillRect(ox + 10, bob + 24, 30, 14);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 14, bob + 20, 22, 16);
            c.fillRect(ox + 12, bob + 26, 26, 10);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 20, bob + 26, 10, 6);
            c.fillRect(ox + 22, bob + 24, 6, 10);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 22, bob + 28, 6, 2);
            c.fillRect(ox + 24, bob + 26, 2, 6);
            c.fillStyle = '#ffaa00';
            c.fillRect(ox + 24, bob + 28, 2, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 2, bob + 24, 8, 14);
            c.fillRect(ox + 40, bob + 24, 8, 14);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 3, bob + 28, 6, 10);
            c.fillRect(ox + 41, bob + 28, 6, 10);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 2, bob + 38, 8, 6);
            c.fillRect(ox + 40, bob + 38, 8, 6);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 3, bob + 39, 6, 4);
            c.fillRect(ox + 41, bob + 39, 6, 4);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 44, bob + 14, 4, 26);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 45, bob + 14, 2, 22);
            c.fillStyle = '#f9e547';
            c.fillRect(ox + 46, bob + 16, 1, 18);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 44, bob + 12, 4, 4);
            c.fillRect(ox + 43, bob + 13, 6, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox, bob + 26, 6, 12);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 27, 4, 10);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 2, bob + 30, 2, 4);
            c.fillRect(ox + 1, bob + 29, 4, 1);
            c.fillStyle = 'rgba(100,0,0,0.7)';
            c.fillRect(ox + 10, bob + 18, 4, 40);
            c.fillRect(ox + 36, bob + 18, 4, 40);
            c.fillStyle = 'rgba(140,0,0,0.6)';
            c.fillRect(ox + 8, bob + 22, 4, 34);
            c.fillRect(ox + 38, bob + 22, 4, 34);
            c.fillStyle = 'rgba(80,0,0,0.5)';
            c.fillRect(ox + 6, bob + 28, 4, 26);
            c.fillRect(ox + 40, bob + 28, 4, 26);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 6, bob + 44, 2, 6);
            c.fillRect(ox + 40, bob + 46, 2, 4);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 12 - legOff, bob + 38, 10, 16);
            c.fillRect(ox + 28 + legOff, bob + 38, 10, 16);
            c.fillRect(ox + 10 - legOff, bob + 42, 14, 12);
            c.fillRect(ox + 26 + legOff, bob + 42, 14, 12);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 14 - legOff, bob + 40, 6, 14);
            c.fillRect(ox + 30 + legOff, bob + 40, 6, 14);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 12 - legOff, bob + 38, 4, 3);
            c.fillRect(ox + 34 + legOff, bob + 38, 4, 3);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 10 - legOff, bob + 54, 12, 4);
            c.fillRect(ox + 28 + legOff, bob + 54, 12, 4);
            c.fillRect(ox + 8 - legOff, bob + 56, 14, 4);
            c.fillRect(ox + 28 + legOff, bob + 56, 14, 4);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 10 - legOff, bob + 56, 10, 2);
            c.fillRect(ox + 30 + legOff, bob + 56, 10, 2);
            c.fillStyle = 'rgba(200,150,0,0.06)';
            c.fillRect(ox, bob + 0, 50, 64);
        }

        addSheet('eternity_lord_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genEternitySpawn1Walk() {
        const fw = 20, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 5, bob + 0, 10, 6);
            c.fillRect(ox + 4, bob + 2, 12, 4);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 6, bob + 1, 8, 4);
            c.fillStyle = '#ff4400';
            c.fillRect(ox + 7, bob + 3, 2, 2);
            c.fillRect(ox + 11, bob + 3, 2, 2);
            c.fillStyle = '#ff8844';
            c.fillRect(ox + 7, bob + 3, 1, 1);
            c.fillRect(ox + 11, bob + 3, 1, 1);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 3, bob + 6, 14, 10);
            c.fillRect(ox + 2, bob + 10, 16, 6);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 4, bob + 8, 12, 6);
            c.fillRect(ox + 3, bob + 12, 14, 4);
            c.fillStyle = '#d4ac0d';
            c.fillRect(ox + 8, bob + 10, 4, 2);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 1, bob + 8, 2, 8);
            c.fillRect(ox + 17, bob + 8, 2, 8);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 1, bob + 12, 1, 6);
            c.fillRect(ox + 18, bob + 12, 1, 6);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox, bob + 10, 3, 6);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 1, bob + 11, 1, 4);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 17, bob + 4, 2, 12);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 17, bob + 4, 1, 8);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 4 - legOff, bob + 16, 4, 8);
            c.fillRect(ox + 12 + legOff, bob + 16, 4, 8);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 5 - legOff, bob + 18, 2, 6);
            c.fillRect(ox + 13 + legOff, bob + 18, 2, 6);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 3 - legOff, bob + 24, 5, 3);
            c.fillRect(ox + 12 + legOff, bob + 24, 5, 3);
        }

        addSheet('eternity_spawn_1_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genEternitySpawn2Walk() {
        const fw = 16, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 4, bob + 0, 8, 5);
            c.fillRect(ox + 3, bob + 2, 10, 3);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 5, bob + 1, 6, 3);
            c.fillStyle = '#1a1a2a';
            c.fillRect(ox + 5, bob + 3, 6, 4);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 6, bob + 4, 4, 2);
            c.fillStyle = '#aa44ff';
            c.fillRect(ox + 6, bob + 4, 2, 1);
            c.fillRect(ox + 10, bob + 4, 2, 1);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 3, bob + 7, 10, 8);
            c.fillRect(ox + 2, bob + 10, 12, 6);
            c.fillStyle = '#2a1a3a';
            c.fillRect(ox + 4, bob + 8, 8, 6);
            c.fillRect(ox + 3, bob + 11, 10, 4);
            c.fillStyle = '#aa44ff';
            c.fillRect(ox + 6, bob + 10, 4, 1);
            c.fillStyle = '#3a2a1a';
            c.fillRect(ox, bob + 3, 2, 18);
            c.fillStyle = '#4a3a2a';
            c.fillRect(ox, bob + 3, 1, 14);
            c.fillStyle = '#aa44ff';
            c.fillRect(ox, bob + 1, 2, 3);
            c.fillStyle = '#cc66ff';
            c.fillRect(ox, bob + 1, 1, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 1, bob + 9, 2, 5);
            c.fillRect(ox + 13, bob + 9, 2, 5);
            c.fillStyle = '#0a0010';
            c.fillRect(ox + 4 - legOff, bob + 15, 8, 4);
            c.fillRect(ox + 3 - legOff, bob + 18, 10, 3);
            c.fillRect(ox + 5 - legOff, bob + 21, 6, 2);
            c.fillStyle = '#1a0a2a';
            c.fillRect(ox + 4 - legOff, bob + 22, 3, 2);
            c.fillRect(ox + 9 + legOff, bob + 22, 3, 2);
        }

        addSheet('eternity_spawn_2_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genEternitySpawn3Walk() {
        const fw = 14, fh = 22, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const legOff = (f % 2 === 0) ? 0 : 1;

            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 4, bob + 0, 6, 5);
            c.fillRect(ox + 3, bob + 2, 8, 3);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5, bob + 1, 4, 3);
            c.fillStyle = '#ff2200';
            c.fillRect(ox + 5, bob + 2, 2, 1);
            c.fillRect(ox + 9, bob + 2, 2, 1);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 3, bob + 5, 8, 7);
            c.fillRect(ox + 2, bob + 8, 10, 5);
            c.fillStyle = '#141422';
            c.fillRect(ox + 4, bob + 6, 6, 5);
            c.fillRect(ox + 3, bob + 9, 8, 3);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 1 - legOff, bob + 7, 2, 5);
            c.fillRect(ox + 11 + legOff, bob + 7, 2, 5);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 1 - legOff, bob + 10, 1, 5);
            c.fillRect(ox + 12 + legOff, bob + 10, 1, 5);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 1 - legOff, bob + 10, 1, 2);
            c.fillRect(ox + 12 + legOff, bob + 10, 1, 2);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 4 - legOff, bob + 12, 3, 6);
            c.fillRect(ox + 8 + legOff, bob + 12, 3, 6);
            c.fillStyle = '#141422';
            c.fillRect(ox + 5 - legOff, bob + 14, 1, 4);
            c.fillRect(ox + 9 + legOff, bob + 14, 1, 4);
            c.fillStyle = '#0a0a14';
            c.fillRect(ox + 3 - legOff, bob + 18, 4, 3);
            c.fillRect(ox + 8 + legOff, bob + 18, 4, 3);
        }

        addSheet('eternity_spawn_3_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genEternityLordWalk();
    _genEternitySpawn1Walk();
    _genEternitySpawn2Walk();
    _genEternitySpawn3Walk();

    // === ATTACK ANIMATIONS ===

    function _genAttackSlashAnim() {
        const fw = 48, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const alpha = 1 - f * 0.3;

            c.strokeStyle = 'rgba(255,255,255,' + (alpha * 0.8) + ')';
            c.lineWidth = 3 - f;
            c.beginPath();
            c.arc(ox + 24, 24, 20 - f * 2, -0.8 - f * 0.2, 1.2 + f * 0.2);
            c.stroke();
            c.strokeStyle = 'rgba(200,220,255,' + (alpha * 0.9) + ')';
            c.lineWidth = 2 - f * 0.5;
            c.beginPath();
            c.arc(ox + 24, 24, 18 - f * 2, -0.6 - f * 0.2, 1.0 + f * 0.2);
            c.stroke();
            c.fillStyle = 'rgba(255,255,255,' + (alpha * 0.6) + ')';
            c.fillRect(ox + 30 - f * 4, 8 + f * 4, 2, 2);
            c.fillRect(ox + 34 - f * 2, 12 + f * 2, 2, 2);
            c.fillRect(ox + 8 + f * 2, 30 - f * 4, 2, 2);
            c.fillRect(ox + 36 - f * 4, 20, 2, 2);
        }

        addSheet('attack_slash_anim', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAttackArrowAnim() {
        const fw = 40, fh = 8, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const speed = f * 8;

            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 24 + speed, 2, 6, 4);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 26 + speed, 3, 4, 2);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 4 + speed, 3, 20, 2);
            c.fillStyle = '#a0522d';
            c.fillRect(ox + 4 + speed, 3, 18, 1);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + speed, 2, 4, 2);
            c.fillRect(ox + speed, 4, 4, 2);
            c.fillStyle = 'rgba(139,69,19,0.4)';
            c.fillRect(ox + speed, 3, 6, 2);
        }

        addSheet('attack_arrow_anim', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAttackSpellAnim() {
        const fw = 40, fh = 40, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const scale = f < 2 ? 0.5 + f * 0.3 : 1.5 - (f - 2) * 0.4;
            const alpha = f < 3 ? 1 : 0.5;
            const r = 12 * scale;

            c.fillStyle = 'rgba(155,89,182,' + (0.6 * alpha) + ')';
            c.beginPath();
            c.arc(ox + 20, 20, r, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(186,104,204,' + (0.5 * alpha) + ')';
            c.beginPath();
            c.arc(ox + 20, 20, r * 0.7, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(200,150,255,' + (0.7 * alpha) + ')';
            c.beginPath();
            c.arc(ox + 20, 20, r * 0.4, 0, Math.PI * 2);
            c.fill();
            var pSize = 2 + f;
            c.fillStyle = 'rgba(186,104,204,' + (0.5 * alpha) + ')';
            c.fillRect(ox + 8 - f * 2, 8 - f, pSize, pSize);
            c.fillRect(ox + 28 + f * 2, 8 - f, pSize, pSize);
            c.fillRect(ox + 8 - f, 28 + f, pSize, pSize);
            c.fillRect(ox + 28 + f, 28 + f, pSize, pSize);
            c.fillRect(ox + 4, 18 - f, 2, 2);
            c.fillRect(ox + 34 + f, 18 - f, 2, 2);
        }

        addSheet('attack_spell_anim', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAttackHealAnim() {
        const fw = 32, fh = 32, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const alpha = f < 3 ? 1 : 0.5;
            const rise = f * 3;

            c.fillStyle = 'rgba(46,204,113,' + (0.5 * alpha) + ')';
            c.fillRect(ox + 12, 4 - rise, 3, 3);
            c.fillRect(ox + 18, 6 - rise, 3, 3);
            c.fillRect(ox + 8, 10 - rise, 3, 3);
            c.fillRect(ox + 22, 8 - rise, 3, 3);
            c.fillStyle = 'rgba(39,174,96,' + (0.6 * alpha) + ')';
            c.fillRect(ox + 14, 2 - rise, 4, 4);
            c.fillRect(ox + 10, 8 - rise, 4, 4);
            c.fillRect(ox + 18, 6 - rise, 4, 4);
            c.fillStyle = 'rgba(46,204,113,' + (0.8 * alpha) + ')';
            c.beginPath();
            c.arc(ox + 16, 16 - rise, 6, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(39,174,96,' + (0.9 * alpha) + ')';
            c.beginPath();
            c.arc(ox + 16, 16 - rise, 3, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(255,255,255,' + (0.7 * alpha) + ')';
            c.fillRect(ox + 15, 12 - rise, 2, 8);
            c.fillRect(ox + 13, 14 - rise, 6, 2);
        }

        addSheet('attack_heal_anim', canvas, { frameWidth: fw, frameHeight: fh });
    }

    function _genAttackBashAnim() {
        const fw = 48, fh = 24, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const alpha = 1 - f * 0.3;
            const r = 20 - f * 4;

            c.fillStyle = 'rgba(189,195,199,' + (0.4 * alpha) + ')';
            c.beginPath();
            c.ellipse(ox + 24, 12, r, r * 0.4, 0, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(189,195,199,' + (0.6 * alpha) + ')';
            c.beginPath();
            c.ellipse(ox + 24, 12, r * 0.7, r * 0.3, 0, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(236,240,241,' + (0.7 * alpha) + ')';
            c.beginPath();
            c.ellipse(ox + 24, 12, r * 0.4, r * 0.2, 0, 0, Math.PI * 2);
            c.fill();
            c.strokeStyle = 'rgba(189,195,199,' + (0.5 * alpha) + ')';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(ox + 24, 12, r * 0.9, -0.5, 0.5);
            c.stroke();
        }

        addSheet('attack_bash_anim', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genAttackSlashAnim();
    _genAttackArrowAnim();
    _genAttackSpellAnim();
    _genAttackHealAnim();
    _genAttackBashAnim();
}
