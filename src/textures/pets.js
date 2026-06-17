export function drawPetTextures(mk) {
    // === COMMON ===

    // pet_slime - 16x14 green blob
    mk('pet_slime', 16, 14, (ctx) => {
        ctx.fillStyle = '#44cc44';
        ctx.beginPath();
        ctx.ellipse(8, 9, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#66ee66';
        ctx.beginPath();
        ctx.ellipse(8, 7, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#222';
        ctx.fillRect(5, 7, 2, 2);
        ctx.fillRect(9, 7, 2, 2);
        ctx.fillStyle = '#fff';
        ctx.fillRect(5, 7, 1, 1);
        ctx.fillRect(9, 7, 1, 1);
    });

    // pet_rat - 14x12 brown
    mk('pet_rat', 14, 12, (ctx) => {
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(2, 4, 10, 6);
        ctx.fillRect(0, 3, 4, 4);
        ctx.fillStyle = '#A07818';
        ctx.fillRect(4, 3, 6, 4);
        ctx.fillStyle = '#222';
        ctx.fillRect(1, 4, 2, 2);
        ctx.fillStyle = '#D4A060';
        ctx.fillRect(0, 9, 2, 2);
        ctx.fillRect(4, 9, 2, 2);
        ctx.fillRect(8, 9, 2, 2);
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(12, 5, 2, 1);
        ctx.fillStyle = '#FF9999';
        ctx.fillRect(0, 5, 1, 1);
        ctx.fillRect(0, 6, 1, 1);
    });

    // pet_bat - 18x14 dark purple
    mk('pet_bat', 18, 14, (ctx) => {
        ctx.fillStyle = '#553388';
        ctx.fillRect(7, 4, 4, 5);
        ctx.fillStyle = '#442277';
        ctx.fillRect(0, 2, 6, 4);
        ctx.fillRect(12, 2, 6, 4);
        ctx.fillStyle = '#6644aa';
        ctx.fillRect(1, 3, 4, 2);
        ctx.fillRect(13, 3, 4, 2);
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(8, 7, 1, 1);
        ctx.fillRect(10, 7, 1, 1);
        ctx.fillStyle = '#FF9999';
        ctx.fillRect(0, 6, 1, 2);
        ctx.fillRect(17, 6, 1, 2);
        ctx.fillStyle = '#fff';
        ctx.fillRect(8, 5, 1, 1);
        ctx.fillRect(10, 5, 1, 1);
    });

    // === UNCOMMON ===

    // pet_wolf - 18x16 grey
    mk('pet_wolf', 18, 16, (ctx) => {
        ctx.fillStyle = '#778899';
        ctx.fillRect(2, 6, 14, 8);
        ctx.fillRect(0, 3, 6, 6);
        ctx.fillStyle = '#8899aa';
        ctx.fillRect(3, 4, 4, 4);
        ctx.fillStyle = '#222';
        ctx.fillRect(1, 4, 2, 2);
        ctx.fillStyle = '#FF4444';
        ctx.fillRect(5, 6, 1, 1);
        ctx.fillStyle = '#aabbcc';
        ctx.fillRect(4, 10, 3, 3);
        ctx.fillRect(8, 10, 3, 3);
        ctx.fillRect(12, 10, 3, 3);
        ctx.fillStyle = '#667788';
        ctx.fillRect(16, 8, 2, 2);
        ctx.fillStyle = '#fff';
        ctx.fillRect(1, 4, 1, 1);
    });

    // pet_spider - 16x16 black/red
    mk('pet_spider', 16, 16, (ctx) => {
        ctx.fillStyle = '#222';
        ctx.fillRect(5, 5, 6, 6);
        ctx.fillStyle = '#333';
        ctx.fillRect(6, 4, 4, 2);
        ctx.fillStyle = '#cc0000';
        ctx.fillRect(7, 5, 2, 2);
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 3, 5, 2);
        ctx.fillRect(11, 3, 5, 2);
        ctx.fillRect(0, 9, 5, 2);
        ctx.fillRect(11, 9, 5, 2);
        ctx.fillRect(1, 5, 4, 1);
        ctx.fillRect(11, 5, 4, 1);
        ctx.fillRect(1, 8, 4, 1);
        ctx.fillRect(11, 8, 4, 1);
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(6, 8, 1, 1);
        ctx.fillRect(9, 8, 1, 1);
    });

    // pet_imp - 14x16 red
    mk('pet_imp', 14, 16, (ctx) => {
        ctx.fillStyle = '#cc3333';
        ctx.fillRect(3, 5, 8, 8);
        ctx.fillStyle = '#dd4444';
        ctx.fillRect(4, 3, 6, 5);
        ctx.fillStyle = '#881111';
        ctx.fillRect(2, 1, 3, 4);
        ctx.fillRect(9, 1, 3, 4);
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(5, 5, 2, 2);
        ctx.fillRect(8, 5, 2, 2);
        ctx.fillStyle = '#222';
        ctx.fillRect(6, 6, 1, 1);
        ctx.fillRect(9, 6, 1, 1);
        ctx.fillStyle = '#aa2222';
        ctx.fillRect(4, 12, 3, 3);
        ctx.fillRect(8, 12, 3, 3);
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(0, 7, 2, 1);
        ctx.fillRect(12, 7, 2, 1);
    });

    // === RARE ===

    // pet_golem - 18x18 stone
    mk('pet_golem', 18, 18, (ctx) => {
        ctx.fillStyle = '#888888';
        ctx.fillRect(3, 6, 12, 10);
        ctx.fillStyle = '#999999';
        ctx.fillRect(4, 3, 10, 7);
        ctx.fillStyle = '#777777';
        ctx.fillRect(0, 8, 4, 8);
        ctx.fillRect(14, 8, 4, 8);
        ctx.fillStyle = '#44aaff';
        ctx.fillRect(6, 5, 2, 3);
        ctx.fillRect(10, 5, 2, 3);
        ctx.fillStyle = '#666666';
        ctx.fillRect(5, 15, 3, 3);
        ctx.fillRect(10, 15, 3, 3);
        ctx.fillStyle = '#aaa';
        ctx.fillRect(7, 10, 4, 2);
    });

    // pet_wraith - 16x18 ghostly
    mk('pet_wraith', 16, 18, (ctx) => {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#6644aa';
        ctx.fillRect(3, 2, 10, 12);
        ctx.fillStyle = '#8866cc';
        ctx.fillRect(4, 1, 8, 8);
        ctx.fillStyle = '#aa88ee';
        ctx.fillRect(5, 2, 6, 4);
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(6, 4, 2, 3);
        ctx.fillRect(9, 4, 2, 3);
        ctx.fillStyle = '#5533aa';
        ctx.fillRect(3, 14, 3, 4);
        ctx.fillRect(7, 14, 3, 4);
        ctx.fillRect(11, 14, 3, 4);
        ctx.globalAlpha = 1;
    });

    // pet_drake - 18x16 orange
    mk('pet_drake', 18, 16, (ctx) => {
        ctx.fillStyle = '#dd6600';
        ctx.fillRect(4, 5, 10, 8);
        ctx.fillStyle = '#ee7722';
        ctx.fillRect(5, 3, 8, 6);
        ctx.fillStyle = '#ff9933';
        ctx.fillRect(6, 2, 6, 4);
        ctx.fillStyle = '#cc0000';
        ctx.fillRect(7, 4, 2, 2);
        ctx.fillRect(11, 4, 2, 2);
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(8, 2, 1, 2);
        ctx.fillRect(10, 2, 1, 2);
        ctx.fillStyle = '#bb5500';
        ctx.fillRect(14, 4, 4, 3);
        ctx.fillRect(0, 6, 4, 3);
        ctx.fillStyle = '#dd6600';
        ctx.fillRect(5, 12, 3, 3);
        ctx.fillRect(10, 12, 3, 3);
    });

    // === LEGENDARY ===

    // pet_phoenix - 20x18 fire bird
    mk('pet_phoenix', 20, 18, (ctx) => {
        ctx.fillStyle = '#ff4400';
        ctx.fillRect(6, 4, 8, 8);
        ctx.fillStyle = '#ff6622';
        ctx.fillRect(7, 2, 6, 6);
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(8, 1, 4, 4);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(9, 2, 2, 2);
        ctx.fillStyle = '#ff2200';
        ctx.fillRect(14, 3, 5, 4);
        ctx.fillRect(1, 3, 5, 4);
        ctx.fillStyle = '#ff8800';
        ctx.fillRect(15, 2, 4, 3);
        ctx.fillRect(1, 2, 4, 3);
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(4, 12, 3, 4);
        ctx.fillRect(9, 12, 3, 4);
        ctx.fillStyle = '#ff3300';
        ctx.fillRect(14, 7, 6, 3);
        ctx.fillRect(0, 7, 6, 3);
        ctx.fillStyle = '#fff';
        ctx.fillRect(8, 3, 1, 1);
        ctx.fillRect(11, 3, 1, 1);
    });

    // pet_dragon - 22x18 dragon
    mk('pet_dragon', 22, 18, (ctx) => {
        ctx.fillStyle = '#228833';
        ctx.fillRect(5, 5, 12, 9);
        ctx.fillStyle = '#33aa44';
        ctx.fillRect(6, 3, 10, 7);
        ctx.fillStyle = '#44cc55';
        ctx.fillRect(7, 2, 8, 5);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(8, 4, 2, 3);
        ctx.fillRect(12, 4, 2, 3);
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(9, 2, 1, 3);
        ctx.fillRect(12, 2, 1, 3);
        ctx.fillStyle = '#ff4400';
        ctx.fillRect(17, 4, 5, 4);
        ctx.fillRect(0, 4, 5, 4);
        ctx.fillStyle = '#228833';
        ctx.fillRect(6, 13, 4, 4);
        ctx.fillRect(12, 13, 4, 4);
        ctx.fillStyle = '#116622';
        ctx.fillRect(8, 0, 2, 3);
        ctx.fillRect(12, 0, 2, 3);
    });

    // pet_celestial - 20x20 divine
    mk('pet_celestial', 20, 20, (ctx) => {
        ctx.fillStyle = '#eedd88';
        ctx.fillRect(6, 6, 8, 8);
        ctx.fillStyle = '#ffeeaa';
        ctx.fillRect(7, 4, 6, 6);
        ctx.fillStyle = '#ffffcc';
        ctx.fillRect(8, 3, 4, 4);
        ctx.fillStyle = '#88ccff';
        ctx.fillRect(9, 5, 2, 2);
        ctx.fillRect(12, 5, 2, 2);
        ctx.fillStyle = '#ddcc66';
        ctx.fillRect(2, 6, 5, 6);
        ctx.fillRect(13, 6, 5, 6);
        ctx.fillStyle = '#ccee88';
        ctx.fillRect(3, 5, 3, 4);
        ctx.fillRect(14, 5, 3, 4);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 8, 3, 3);
        ctx.fillRect(17, 8, 3, 3);
        ctx.fillStyle = '#ffeeaa';
        ctx.fillRect(7, 13, 2, 4);
        ctx.fillRect(11, 13, 2, 4);
        ctx.fillStyle = '#ffdd44';
        ctx.fillRect(9, 0, 2, 4);
    });

    // === CASE TEXTURES ===

    // case_wood - 24x20
    mk('case_wood', 24, 20, (ctx) => {
        ctx.fillStyle = '#8B6914';
        ctx.fillRect(2, 4, 20, 14);
        ctx.fillStyle = '#A07818';
        ctx.fillRect(3, 5, 18, 12);
        ctx.fillStyle = '#6B4914';
        ctx.fillRect(1, 3, 22, 2);
        ctx.fillRect(1, 17, 22, 2);
        ctx.fillStyle = '#c0a040';
        ctx.fillRect(10, 6, 4, 8);
        ctx.fillRect(9, 8, 6, 4);
        ctx.fillStyle = '#333';
        ctx.fillRect(11, 9, 2, 2);
    });

    // case_iron - 24x20
    mk('case_iron', 24, 20, (ctx) => {
        ctx.fillStyle = '#667788';
        ctx.fillRect(2, 4, 20, 14);
        ctx.fillStyle = '#778899';
        ctx.fillRect(3, 5, 18, 12);
        ctx.fillStyle = '#556677';
        ctx.fillRect(1, 3, 22, 2);
        ctx.fillRect(1, 17, 22, 2);
        ctx.fillStyle = '#aabbcc';
        ctx.fillRect(10, 6, 4, 8);
        ctx.fillRect(9, 8, 6, 4);
        ctx.fillStyle = '#333';
        ctx.fillRect(11, 9, 2, 2);
        ctx.fillStyle = '#88aacc';
        ctx.fillRect(4, 8, 3, 3);
        ctx.fillRect(17, 8, 3, 3);
    });

    // case_gold - 24x20
    mk('case_gold', 24, 20, (ctx) => {
        ctx.fillStyle = '#cc9900';
        ctx.fillRect(2, 4, 20, 14);
        ctx.fillStyle = '#ddaa22';
        ctx.fillRect(3, 5, 18, 12);
        ctx.fillStyle = '#aa7700';
        ctx.fillRect(1, 3, 22, 2);
        ctx.fillRect(1, 17, 22, 2);
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(10, 6, 4, 8);
        ctx.fillRect(9, 8, 6, 4);
        ctx.fillStyle = '#884400';
        ctx.fillRect(11, 9, 2, 2);
        ctx.fillStyle = '#ffee44';
        ctx.fillRect(4, 7, 3, 4);
        ctx.fillRect(17, 7, 3, 4);
        ctx.fillStyle = '#ffdd00';
        ctx.fillRect(5, 5, 2, 2);
        ctx.fillRect(17, 5, 2, 2);
    });
}
