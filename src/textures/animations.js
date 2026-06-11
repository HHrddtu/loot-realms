export function generateAnimations(textures) {
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

            // Hat
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 4, 16, 4);
            c.fillRect(ox + 6, bob + 8, 20, 4);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 4, bob + 12, 24, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 1, 4, 2);

            // Face
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 10, bob + 14, 12, 8);
            c.fillStyle = '#7b68ee';
            c.fillRect(ox + 12, bob + 16, 2, 2);
            c.fillRect(ox + 18, bob + 16, 2, 2);

            // Beard
            c.fillStyle = '#9e9e9e';
            c.fillRect(ox + 12, bob + 20, 8, 4);
            c.fillRect(ox + 10, bob + 22, 12, 4);
            c.fillRect(ox + 12, bob + 26, 8, 2);

            // Robe
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, bob + 16, 16, 12);
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

            // Staff
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 28, bob + 10, 2, 28);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 27, bob + 8, 4, 4);

            // Legs with walk cycle
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

            // Robe stripes
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 10, 18, 12, 2);
            c.fillRect(ox + 10, 22, 12, 2);
        }

        const tex = textures.addSpriteSheet('player_sage_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('player_sage_attack', canvas, { frameWidth: fw, frameHeight: fh });
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
            c.fillRect(ox + 26, 22, 3, 5);
        }

        textures.addSpriteSheet('player_alchemist_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('player_alchemist_attack', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('player_angel_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('player_angel_attack', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('goblin_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('goblin_attack', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('slime_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('rat_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('skeleton_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('skeleton_attack', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('skeleton_archer_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('skeleton_shaman_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('treant_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('skeleton_lord_walk', canvas, { frameWidth: fw, frameHeight: fh });
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

        textures.addSpriteSheet('skeleton_lord_attack', canvas, { frameWidth: fw, frameHeight: fh });
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
}
