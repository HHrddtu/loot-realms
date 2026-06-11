export function drawEnemyTextures(mk) {
    mk('goblin', 24, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#27ae60';
        c.fillRect(8, 0, 8, 4);
        c.fillRect(4, 4, 16, 8);
        c.fillRect(6, 12, 12, 4);
        c.fillStyle = '#1e8449';
        c.fillRect(6, 2, 2, 4);
        c.fillRect(16, 2, 2, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(9, 6, 2, 2);
        c.fillRect(13, 6, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(10, 6, 1, 1);
        c.fillRect(14, 6, 1, 1);
        c.fillStyle = '#c0392b';
        c.fillRect(10, 10, 4, 1);
        c.fillStyle = '#27ae60';
        c.fillRect(7, 14, 4, 6);
        c.fillRect(13, 14, 4, 6);
        c.fillStyle = '#1e8449';
        c.fillRect(4, 14, 3, 4);
        c.fillRect(17, 14, 3, 4);
        c.fillStyle = '#8b4513';
        c.fillRect(7, 20, 4, 4);
        c.fillRect(13, 20, 4, 4);
    });

    mk('slime', 20, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#9b59b6';
        c.fillRect(6, 6, 8, 4);
        c.fillRect(4, 8, 12, 4);
        c.fillRect(2, 10, 16, 4);
        c.fillStyle = '#8e44ad';
        c.fillRect(4, 14, 12, 4);
        c.fillRect(6, 16, 8, 2);
        c.fillStyle = '#fff';
        c.fillRect(7, 8, 2, 2);
        c.fillRect(12, 8, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(7, 9, 1, 1);
        c.fillRect(13, 9, 1, 1);
    });

    mk('rat', 20, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#e67e22';
        c.fillRect(10, 2, 4, 4);
        c.fillRect(6, 4, 10, 4);
        c.fillStyle = '#d35400';
        c.fillRect(8, 4, 8, 6);
        c.fillRect(4, 6, 14, 4);
        c.fillRect(2, 8, 16, 2);
        c.fillStyle = '#000';
        c.fillRect(5, 5, 1, 1);
        c.fillRect(14, 5, 1, 1);
        c.fillStyle = '#ecf0f1';
        c.fillRect(9, 8, 1, 1);
        c.fillRect(12, 8, 1, 1);
        c.fillStyle = '#d35400';
        c.fillRect(5, 10, 3, 4);
        c.fillRect(12, 10, 3, 4);
        c.fillStyle = '#8b4513';
        c.fillRect(4, 14, 4, 2);
        c.fillRect(12, 14, 4, 2);
    });
}
