export function drawEnemyTextures(mk) {
    mk('goblin', 28, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2ecc71';
        c.fillRect(10, 2, 8, 4);
        c.fillRect(6, 6, 16, 8);
        c.fillRect(8, 14, 12, 4);
        c.fillStyle = '#27ae60';
        c.fillRect(8, 4, 4, 4);
        c.fillRect(18, 4, 4, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 8, 3, 3);
        c.fillRect(16, 8, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(11, 9, 1, 1);
        c.fillRect(17, 9, 1, 1);
        c.fillStyle = '#c0392b';
        c.fillRect(12, 12, 5, 2);
        c.fillStyle = '#ecf0f1';
        c.fillRect(12, 12, 1, 1);
        c.fillRect(15, 12, 1, 1);
        c.fillStyle = '#2ecc71';
        c.fillRect(8, 16, 4, 6);
        c.fillRect(16, 16, 4, 6);
        c.fillStyle = '#229954';
        c.fillRect(4, 16, 4, 5);
        c.fillRect(20, 16, 4, 5);
        c.fillStyle = '#8b4513';
        c.fillRect(7, 22, 5, 4);
        c.fillRect(16, 22, 5, 4);
        c.fillStyle = '#a0522d';
        c.fillRect(12, 6, 2, 2);
    });

    mk('slime', 24, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#9b59b6';
        c.fillRect(8, 4, 8, 4);
        c.fillRect(4, 8, 16, 6);
        c.fillRect(2, 12, 20, 4);
        c.fillStyle = '#8e44ad';
        c.fillRect(4, 16, 16, 3);
        c.fillRect(6, 19, 12, 2);
        c.fillStyle = '#bb6bd9';
        c.fillRect(6, 6, 4, 3);
        c.fillStyle = '#fff';
        c.fillRect(8, 8, 3, 3);
        c.fillRect(14, 8, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(9, 9, 1, 2);
        c.fillRect(15, 9, 1, 2);
        c.fillStyle = '#d5a6e6';
        c.fillRect(10, 14, 4, 2);
    });

    mk('rat', 24, 20, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#e67e22';
        c.fillRect(12, 2, 5, 5);
        c.fillRect(8, 4, 12, 6);
        c.fillStyle = '#d35400';
        c.fillRect(6, 6, 16, 6);
        c.fillRect(4, 8, 20, 4);
        c.fillStyle = '#e67e22';
        c.fillRect(2, 4, 4, 3);
        c.fillStyle = '#000';
        c.fillRect(6, 6, 2, 2);
        c.fillRect(16, 6, 2, 2);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 8, 2, 2);
        c.fillRect(14, 8, 2, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(11, 10, 3, 1);
        c.fillStyle = '#d35400';
        c.fillRect(6, 12, 4, 5);
        c.fillRect(14, 12, 4, 5);
        c.fillStyle = '#8b4513';
        c.fillRect(5, 17, 5, 2);
        c.fillRect(14, 17, 5, 2);
        c.fillStyle = '#a0522d';
        c.fillRect(20, 6, 4, 2);
    });

    mk('skeleton', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#ecf0f1';
        c.fillRect(8, 0, 8, 6);
        c.fillRect(6, 6, 12, 4);
        c.fillStyle = '#bdc3c7';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(10, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillRect(11, 5, 2, 1);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 10, 4, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(8, 12, 8, 6);
        c.fillRect(10, 18, 4, 4);
        c.fillStyle = '#95a5a6';
        c.fillRect(6, 12, 2, 6);
        c.fillRect(16, 12, 2, 6);
        c.fillStyle = '#ecf0f1';
        c.fillRect(4, 14, 2, 2);
        c.fillRect(18, 14, 2, 2);
        c.fillStyle = '#7f8c8d';
        c.fillRect(9, 22, 3, 4);
        c.fillRect(13, 22, 3, 4);
    });

    mk('skeleton_archer', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#ecf0f1';
        c.fillRect(8, 0, 8, 6);
        c.fillRect(6, 6, 12, 4);
        c.fillStyle = '#bdc3c7';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(10, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillStyle = '#8b4513';
        c.fillRect(4, 8, 2, 12);
        c.fillRect(4, 8, 1, 2);
        c.fillRect(4, 18, 1, 2);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 10, 4, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(8, 12, 8, 6);
        c.fillRect(10, 18, 4, 4);
        c.fillStyle = '#95a5a6';
        c.fillRect(6, 12, 2, 6);
        c.fillRect(16, 12, 2, 6);
        c.fillStyle = '#7f8c8d';
        c.fillRect(9, 22, 3, 4);
        c.fillRect(13, 22, 3, 4);
    });

    mk('skeleton_shaman', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#9b59b6';
        c.fillRect(6, 0, 12, 4);
        c.fillStyle = '#ecf0f1';
        c.fillRect(8, 4, 8, 6);
        c.fillStyle = '#8e44ad';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(11, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 10, 4, 2);
        c.fillStyle = '#8e44ad';
        c.fillRect(6, 12, 12, 8);
        c.fillRect(8, 20, 8, 4);
        c.fillStyle = '#9b59b6';
        c.fillRect(4, 14, 2, 6);
        c.fillRect(18, 14, 2, 6);
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 14, 4, 2);
        c.fillStyle = '#7f8c8d';
        c.fillRect(9, 24, 3, 3);
        c.fillRect(13, 24, 3, 3);
    });

    mk('zombie', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#7d8a4a';
        c.fillRect(8, 0, 8, 6);
        c.fillRect(6, 6, 12, 6);
        c.fillStyle = '#5a6a2a';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#ff0000';
        c.fillRect(10, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillStyle = '#4a5a1a';
        c.fillRect(11, 5, 2, 1);
        c.fillStyle = '#7d8a4a';
        c.fillRect(10, 12, 4, 2);
        c.fillStyle = '#5a6a2a';
        c.fillRect(6, 14, 12, 6);
        c.fillRect(8, 20, 8, 4);
        c.fillStyle = '#4a5a1a';
        c.fillRect(4, 14, 2, 6);
        c.fillRect(18, 14, 2, 6);
        c.fillStyle = '#3a4a0a';
        c.fillRect(9, 24, 3, 3);
        c.fillRect(13, 24, 3, 3);
    });

    mk('ice_golem', 28, 30, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5dade2';
        c.fillRect(10, 0, 10, 6);
        c.fillRect(6, 6, 16, 10);
        c.fillRect(4, 16, 20, 6);
        c.fillStyle = '#3498db';
        c.fillRect(12, 2, 3, 3);
        c.fillRect(17, 2, 3, 3);
        c.fillStyle = '#fff';
        c.fillRect(13, 3, 1, 1);
        c.fillRect(18, 3, 1, 1);
        c.fillStyle = '#85c1e9';
        c.fillRect(8, 8, 4, 4);
        c.fillRect(18, 8, 4, 4);
        c.fillStyle = '#2e86c1';
        c.fillRect(6, 22, 6, 6);
        c.fillRect(16, 22, 6, 6);
        c.fillStyle = '#1a5276';
        c.fillRect(5, 28, 7, 2);
        c.fillRect(16, 28, 7, 2);
    });

    mk('frost_wraith', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#aed6f1';
        c.fillRect(8, 0, 8, 4);
        c.fillRect(6, 4, 12, 6);
        c.fillStyle = '#5dade2';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#fff';
        c.fillRect(10, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillStyle = '#aed6f1';
        c.fillRect(10, 10, 4, 2);
        c.fillStyle = '#85c1e9';
        c.fillRect(6, 12, 12, 8);
        c.fillRect(8, 20, 8, 4);
        c.fillStyle = '#d6eaf8';
        c.fillRect(4, 12, 2, 8);
        c.fillRect(18, 12, 2, 8);
        c.fillStyle = '#aed6f1';
        c.fillRect(2, 16, 2, 4);
        c.fillRect(20, 16, 2, 4);
        c.fillStyle = '#5499c7';
        c.fillRect(9, 24, 3, 3);
        c.fillRect(13, 24, 3, 3);
    });

    mk('snow_wolf', 28, 24, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d5dbdb';
        c.fillRect(4, 6, 6, 4);
        c.fillRect(18, 6, 6, 4);
        c.fillRect(6, 4, 16, 8);
        c.fillStyle = '#aeb6bf';
        c.fillRect(8, 2, 4, 4);
        c.fillRect(16, 2, 4, 4);
        c.fillStyle = '#000';
        c.fillRect(9, 6, 2, 2);
        c.fillRect(17, 6, 2, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(12, 8, 4, 2);
        c.fillStyle = '#ecf0f1';
        c.fillRect(12, 10, 4, 2);
        c.fillStyle = '#d5dbdb';
        c.fillRect(6, 12, 16, 6);
        c.fillStyle = '#aeb6bf';
        c.fillRect(4, 18, 4, 4);
        c.fillRect(10, 18, 4, 4);
        c.fillRect(16, 18, 4, 4);
        c.fillStyle = '#7f8c8d';
        c.fillRect(4, 22, 4, 2);
        c.fillRect(10, 22, 4, 2);
        c.fillRect(16, 22, 4, 2);
    });

    mk('ice_elemental', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d4efdf';
        c.fillRect(8, 0, 8, 4);
        c.fillRect(6, 4, 12, 6);
        c.fillStyle = '#82e0aa';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#fff';
        c.fillRect(10, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillStyle = '#d4efdf';
        c.fillRect(10, 10, 4, 2);
        c.fillStyle = '#abebc6';
        c.fillRect(6, 12, 12, 6);
        c.fillRect(8, 18, 8, 4);
        c.fillStyle = '#d4efdf';
        c.fillRect(4, 14, 2, 4);
        c.fillRect(18, 14, 2, 4);
        c.fillStyle = '#7dcea0';
        c.fillRect(2, 16, 2, 2);
        c.fillRect(20, 16, 2, 2);
        c.fillStyle = '#52be80';
        c.fillRect(9, 22, 3, 4);
        c.fillRect(13, 22, 3, 4);
    });

    mk('frost_mage', 24, 28, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2c3e50';
        c.fillRect(6, 0, 12, 4);
        c.fillRect(8, 4, 8, 4);
        c.fillStyle = '#aed6f1';
        c.fillRect(10, 6, 4, 4);
        c.fillStyle = '#5dade2';
        c.fillRect(10, 2, 2, 2);
        c.fillRect(14, 2, 2, 2);
        c.fillStyle = '#fff';
        c.fillRect(11, 3, 1, 1);
        c.fillRect(15, 3, 1, 1);
        c.fillStyle = '#2c3e50';
        c.fillRect(6, 10, 12, 10);
        c.fillRect(8, 20, 8, 4);
        c.fillStyle = '#34495e';
        c.fillRect(4, 12, 2, 8);
        c.fillRect(18, 12, 2, 8);
        c.fillStyle = '#5dade2';
        c.fillRect(10, 12, 4, 2);
        c.fillStyle = '#1a252f';
        c.fillRect(9, 24, 3, 3);
        c.fillRect(13, 24, 3, 3);
    });

    mk('imp', 20, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#c0392b';
        c.fillRect(6, 2, 8, 4);
        c.fillRect(4, 6, 12, 6);
        c.fillStyle = '#e74c3c';
        c.fillRect(4, 2, 2, 4);
        c.fillRect(14, 2, 2, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(7, 6, 2, 2);
        c.fillRect(11, 6, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(8, 7, 1, 1);
        c.fillRect(12, 7, 1, 1);
        c.fillStyle = '#c0392b';
        c.fillRect(4, 12, 12, 4);
        c.fillRect(6, 16, 8, 2);
        c.fillStyle = '#922b21';
        c.fillRect(4, 14, 2, 4);
        c.fillRect(14, 14, 2, 4);
        c.fillStyle = '#7b241c';
        c.fillRect(5, 18, 3, 3);
        c.fillRect(12, 18, 3, 3);
    });

    mk('fire_demon', 32, 34, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#c0392b';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(6, 6, 20, 10);
        c.fillRect(4, 16, 24, 8);
        c.fillStyle = '#e74c3c';
        c.fillRect(10, 2, 3, 4);
        c.fillRect(19, 2, 3, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(11, 8, 3, 3);
        c.fillRect(18, 8, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(12, 9, 1, 1);
        c.fillRect(19, 9, 1, 1);
        c.fillStyle = '#f39c12';
        c.fillRect(13, 12, 6, 2);
        c.fillStyle = '#c0392b';
        c.fillRect(6, 18, 4, 6);
        c.fillRect(22, 18, 4, 6);
        c.fillStyle = '#922b21';
        c.fillRect(8, 24, 6, 6);
        c.fillRect(18, 24, 6, 6);
        c.fillStyle = '#7b241c';
        c.fillRect(7, 30, 7, 3);
        c.fillRect(18, 30, 7, 3);
    });

    mk('demon_minion', 24, 26, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#8b0000';
        c.fillRect(8, 0, 8, 4);
        c.fillRect(6, 4, 12, 8);
        c.fillStyle = '#a52a2a';
        c.fillRect(4, 4, 2, 4);
        c.fillRect(18, 4, 2, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(9, 6, 2, 2);
        c.fillRect(13, 6, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(10, 7, 1, 1);
        c.fillRect(14, 7, 1, 1);
        c.fillStyle = '#8b0000';
        c.fillRect(6, 12, 12, 6);
        c.fillRect(8, 18, 8, 4);
        c.fillStyle = '#5c0000';
        c.fillRect(4, 14, 2, 4);
        c.fillRect(18, 14, 2, 4);
        c.fillStyle = '#3a0000';
        c.fillRect(7, 22, 4, 3);
        c.fillRect(13, 22, 4, 3);
    });

    mk('purple_demon', 32, 34, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#6c3483';
        c.fillRect(10, 0, 12, 6);
        c.fillRect(6, 6, 20, 10);
        c.fillRect(4, 16, 24, 8);
        c.fillStyle = '#8e44ad';
        c.fillRect(10, 2, 3, 4);
        c.fillRect(19, 2, 3, 4);
        c.fillStyle = '#f1c40f';
        c.fillRect(11, 8, 3, 3);
        c.fillRect(18, 8, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(12, 9, 1, 1);
        c.fillRect(19, 9, 1, 1);
        c.fillStyle = '#f39c12';
        c.fillRect(13, 12, 6, 2);
        c.fillStyle = '#6c3483';
        c.fillRect(6, 18, 4, 6);
        c.fillRect(22, 18, 4, 6);
        c.fillStyle = '#5b2c6f';
        c.fillRect(8, 24, 6, 6);
        c.fillRect(18, 24, 6, 6);
        c.fillStyle = '#4a235a';
        c.fillRect(7, 30, 7, 3);
        c.fillRect(18, 30, 7, 3);
    });

    mk('ice_spirit', 36, 38, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d6eaf8';
        c.fillRect(12, 0, 12, 6);
        c.fillRect(8, 6, 20, 10);
        c.fillRect(6, 16, 24, 8);
        c.fillStyle = '#aed6f1';
        c.fillRect(12, 2, 3, 4);
        c.fillRect(21, 2, 3, 4);
        c.fillStyle = '#fff';
        c.fillRect(13, 8, 3, 3);
        c.fillRect(20, 8, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(14, 9, 1, 1);
        c.fillRect(21, 9, 1, 1);
        c.fillStyle = '#5dade2';
        c.fillRect(14, 12, 8, 2);
        c.fillStyle = '#d6eaf8';
        c.fillRect(4, 18, 4, 8);
        c.fillRect(28, 18, 4, 8);
        c.fillStyle = '#85c1e9';
        c.fillRect(8, 24, 8, 6);
        c.fillRect(20, 24, 8, 6);
        c.fillStyle = '#5499c7';
        c.fillRect(6, 30, 10, 4);
        c.fillRect(20, 30, 10, 4);
    });

    mk('ice_shard', 14, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#d6eaf8';
        c.fillRect(5, 0, 4, 4);
        c.fillRect(3, 4, 8, 6);
        c.fillRect(1, 10, 12, 4);
        c.fillStyle = '#aed6f1';
        c.fillRect(5, 2, 2, 2);
        c.fillRect(5, 6, 6, 4);
        c.fillStyle = '#85c1e9';
        c.fillRect(3, 12, 8, 2);
    });

    mk('cave_spider', 24, 22, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2c3e50';
        c.fillRect(8, 2, 8, 4);
        c.fillRect(6, 6, 12, 8);
        c.fillStyle = '#34495e';
        c.fillRect(2, 6, 4, 3);
        c.fillRect(18, 6, 4, 3);
        c.fillRect(2, 10, 4, 3);
        c.fillRect(18, 10, 4, 3);
        c.fillStyle = '#e74c3c';
        c.fillRect(9, 6, 2, 2);
        c.fillRect(13, 6, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(10, 7, 1, 1);
        c.fillRect(14, 7, 1, 1);
        c.fillStyle = '#2c3e50';
        c.fillRect(6, 14, 12, 4);
        c.fillRect(8, 18, 8, 2);
        c.fillStyle = '#1a252f';
        c.fillRect(4, 16, 2, 4);
        c.fillRect(18, 16, 2, 4);
    });

    mk('cave_bat', 22, 18, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5d4e37';
        c.fillRect(8, 4, 6, 6);
        c.fillStyle = '#3e2e1a';
        c.fillRect(2, 4, 6, 4);
        c.fillRect(14, 4, 6, 4);
        c.fillRect(0, 6, 4, 3);
        c.fillRect(18, 6, 4, 3);
        c.fillStyle = '#e74c3c';
        c.fillRect(9, 6, 2, 2);
        c.fillRect(12, 6, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(10, 7, 1, 1);
        c.fillRect(13, 7, 1, 1);
        c.fillStyle = '#5d4e37';
        c.fillRect(8, 10, 6, 4);
        c.fillStyle = '#3e2e1a';
        c.fillRect(6, 14, 4, 3);
        c.fillRect(12, 14, 4, 3);
    });

    mk('stone_golem', 28, 30, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#7f8c8d';
        c.fillRect(10, 0, 8, 6);
        c.fillRect(6, 6, 16, 10);
        c.fillRect(4, 16, 20, 8);
        c.fillStyle = '#95a5a6';
        c.fillRect(12, 2, 2, 2);
        c.fillRect(16, 2, 2, 2);
        c.fillStyle = '#f39c12';
        c.fillRect(12, 8, 4, 2);
        c.fillStyle = '#bdc3c7';
        c.fillRect(8, 8, 4, 4);
        c.fillRect(18, 8, 4, 4);
        c.fillStyle = '#6c7a89';
        c.fillRect(6, 24, 6, 4);
        c.fillRect(16, 24, 6, 4);
        c.fillStyle = '#515a5a';
        c.fillRect(5, 28, 7, 2);
        c.fillRect(16, 28, 7, 2);
    });

    mk('earth_worm', 28, 16, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#a0522d';
        c.fillRect(2, 4, 24, 8);
        c.fillStyle = '#8b4513';
        c.fillRect(4, 6, 20, 4);
        c.fillStyle = '#cd853f';
        c.fillRect(2, 4, 4, 2);
        c.fillRect(22, 4, 4, 2);
        c.fillStyle = '#000';
        c.fillRect(4, 6, 1, 1);
        c.fillRect(6, 6, 1, 1);
        c.fillStyle = '#a0522d';
        c.fillRect(2, 12, 4, 2);
        c.fillRect(8, 12, 4, 2);
        c.fillRect(14, 12, 4, 2);
        c.fillRect(20, 12, 4, 2);
    });

    mk('giant_bat', 40, 32, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#4a3728';
        c.fillRect(14, 8, 12, 10);
        c.fillStyle = '#3e2c1a';
        c.fillRect(2, 8, 12, 6);
        c.fillRect(26, 8, 12, 6);
        c.fillRect(0, 10, 6, 4);
        c.fillRect(34, 10, 6, 4);
        c.fillStyle = '#e74c3c';
        c.fillRect(16, 10, 3, 3);
        c.fillRect(22, 10, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(17, 11, 1, 1);
        c.fillRect(23, 11, 1, 1);
        c.fillStyle = '#c0392b';
        c.fillRect(18, 14, 4, 2);
        c.fillStyle = '#4a3728';
        c.fillRect(14, 18, 12, 6);
        c.fillStyle = '#3e2c1a';
        c.fillRect(12, 24, 6, 4);
        c.fillRect(22, 24, 6, 4);
    });

    mk('small_bat', 18, 14, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5d4e37';
        c.fillRect(6, 4, 6, 4);
        c.fillStyle = '#3e2e1a';
        c.fillRect(2, 4, 4, 3);
        c.fillRect(12, 4, 4, 3);
        c.fillStyle = '#e74c3c';
        c.fillRect(7, 5, 1, 1);
        c.fillRect(10, 5, 1, 1);
        c.fillStyle = '#5d4e37';
        c.fillRect(6, 8, 6, 3);
        c.fillStyle = '#3e2e1a';
        c.fillRect(4, 11, 4, 2);
        c.fillRect(10, 11, 4, 2);
    });

    // Castle bandits
    mk('bandit_melee', 28, 30, (c) => {
        c.imageSmoothingEnabled = false;
        // Head
        c.fillStyle = '#8b6914';
        c.fillRect(10, 0, 8, 6);
        c.fillStyle = '#a07828';
        c.fillRect(10, 0, 8, 2);
        // Eyes
        c.fillStyle = '#e74c3c';
        c.fillRect(11, 3, 2, 2);
        c.fillRect(15, 3, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(12, 4, 1, 1);
        c.fillRect(16, 4, 1, 1);
        // Body (brown tunic)
        c.fillStyle = '#6d4c2a';
        c.fillRect(8, 6, 12, 10);
        c.fillStyle = '#5a3d1a';
        c.fillRect(10, 6, 8, 10);
        // Belt
        c.fillStyle = '#2c1e14';
        c.fillRect(8, 12, 12, 2);
        // Arms
        c.fillStyle = '#8b6914';
        c.fillRect(4, 8, 4, 6);
        c.fillRect(20, 8, 4, 6);
        // Sword (right hand)
        c.fillStyle = '#bdc3c7';
        c.fillRect(22, 4, 2, 8);
        c.fillStyle = '#95a5a6';
        c.fillRect(23, 2, 1, 4);
        c.fillStyle = '#8b4513';
        c.fillRect(20, 12, 6, 2);
        // Legs
        c.fillStyle = '#4a2d10';
        c.fillRect(8, 16, 4, 8);
        c.fillRect(16, 16, 4, 8);
        // Boots
        c.fillStyle = '#2c1e14';
        c.fillRect(7, 22, 6, 4);
        c.fillRect(15, 22, 6, 4);
    });

    mk('bandit_ranger', 26, 28, (c) => {
        c.imageSmoothingEnabled = false;
        // Head (hood)
        c.fillStyle = '#2c3e50';
        c.fillRect(9, 0, 8, 6);
        c.fillStyle = '#34495e';
        c.fillRect(8, 0, 10, 3);
        // Eyes
        c.fillStyle = '#e67e22';
        c.fillRect(10, 3, 2, 2);
        c.fillRect(14, 3, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(11, 4, 1, 1);
        c.fillRect(15, 4, 1, 1);
        // Body (dark leather)
        c.fillStyle = '#2c3e50';
        c.fillRect(7, 6, 12, 10);
        c.fillStyle = '#34495e';
        c.fillRect(9, 6, 8, 10);
        // Bow (left)
        c.fillStyle = '#8b4513';
        c.fillRect(2, 6, 2, 10);
        c.fillStyle = '#a0522d';
        c.fillRect(1, 6, 1, 10);
        c.fillStyle = '#bdc3c7';
        c.fillRect(2, 4, 1, 14);
        // Quiver (back)
        c.fillStyle = '#6d4c2a';
        c.fillRect(20, 4, 3, 8);
        c.fillStyle = '#95a5a6';
        c.fillRect(21, 2, 1, 4);
        c.fillRect(21, 10, 1, 4);
        // Arms
        c.fillStyle = '#8b6914';
        c.fillRect(3, 8, 4, 4);
        c.fillRect(19, 8, 4, 4);
        // Legs
        c.fillStyle = '#1a252f';
        c.fillRect(7, 16, 4, 6);
        c.fillRect(15, 16, 4, 6);
        // Boots
        c.fillStyle = '#4a2d10';
        c.fillRect(6, 20, 6, 4);
        c.fillRect(14, 20, 6, 4);
    });

    mk('bandit_elite', 32, 34, (c) => {
        c.imageSmoothingEnabled = false;
        // Head (helmet)
        c.fillStyle = '#7f8c8d';
        c.fillRect(11, 0, 10, 7);
        c.fillStyle = '#95a5a6';
        c.fillRect(12, 0, 8, 3);
        c.fillStyle = '#6c7a7d';
        c.fillRect(11, 2, 10, 1);
        // Eyes
        c.fillStyle = '#e74c3c';
        c.fillRect(13, 4, 2, 2);
        c.fillRect(17, 4, 2, 2);
        c.fillStyle = '#000';
        c.fillRect(14, 5, 1, 1);
        c.fillRect(18, 5, 1, 1);
        // Body (heavy armor)
        c.fillStyle = '#566573';
        c.fillRect(8, 7, 16, 12);
        c.fillStyle = '#7f8c8d';
        c.fillRect(10, 7, 12, 12);
        // Armor plates
        c.fillStyle = '#95a5a6';
        c.fillRect(10, 9, 12, 2);
        c.fillRect(10, 13, 12, 2);
        // Shield (left)
        c.fillStyle = '#7f8c8d';
        c.fillRect(2, 8, 6, 10);
        c.fillStyle = '#95a5a6';
        c.fillRect(3, 9, 4, 8);
        c.fillStyle = '#e74c3c';
        c.fillRect(4, 11, 2, 4);
        // Sword (right)
        c.fillStyle = '#bdc3c7';
        c.fillRect(24, 4, 2, 12);
        c.fillStyle = '#95a5a6';
        c.fillRect(25, 2, 1, 6);
        c.fillStyle = '#8b4513';
        c.fillRect(22, 14, 6, 2);
        // Arms
        c.fillStyle = '#566573';
        c.fillRect(4, 10, 4, 6);
        c.fillRect(22, 10, 4, 6);
        // Legs
        c.fillStyle = '#3d3d3d';
        c.fillRect(8, 19, 6, 8);
        c.fillRect(18, 19, 6, 8);
        // Boots
        c.fillStyle = '#2c2c2c';
        c.fillRect(7, 25, 8, 5);
        c.fillRect(17, 25, 8, 5);
    });
}
