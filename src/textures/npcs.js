export function drawNpcTextures(mk) {
    const npcs = [
        { key: 'npc_elder',    bodyColor: '#8e44ad', robeColor: '#6c3483', detail: '#f1c40f' },
        { key: 'npc_merchant', bodyColor: '#d4ac0d', robeColor: '#b7950b', detail: '#e67e22' },
        { key: 'npc_miner',    bodyColor: '#7f8c8d', robeColor: '#566573', detail: '#f39c12' },
        { key: 'npc_ghost',    bodyColor: '#5dade2', robeColor: '#3498db', detail: '#ecf0f1' }
    ];

    npcs.forEach(npc => {
        mk(npc.key, 32, 48, (c) => {
            c.imageSmoothingEnabled = false;

            c.fillStyle = npc.bodyColor;
            c.fillRect(8, 12, 16, 20);

            c.fillStyle = npc.robeColor;
            c.fillRect(6, 14, 20, 18);
            c.fillRect(4, 20, 24, 10);

            c.fillStyle = '#f5cba7';
            c.fillRect(10, 2, 12, 10);
            c.fillRect(8, 4, 16, 8);

            c.fillStyle = '#2c3e50';
            c.fillRect(12, 6, 3, 3);
            c.fillRect(18, 6, 3, 3);

            c.fillStyle = npc.detail;
            c.fillRect(13, 0, 6, 4);
            c.fillRect(10, 0, 12, 2);

            c.fillStyle = npc.robeColor;
            c.fillRect(10, 32, 5, 14);
            c.fillRect(17, 32, 5, 14);

            c.fillStyle = '#2c3e50';
            c.fillRect(8, 44, 8, 4);
            c.fillRect(16, 44, 8, 4);

            c.fillStyle = npc.bodyColor;
            c.fillRect(2, 16, 6, 12);
            c.fillRect(24, 16, 6, 12);

            c.fillStyle = '#f5cba7';
            c.fillRect(0, 26, 6, 6);
            c.fillRect(26, 26, 6, 6);
        });
    });

    mk('quest_icon', 12, 12, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f1c40f';
        c.fillRect(3, 0, 6, 10);
        c.fillRect(1, 2, 10, 6);
        c.fillStyle = '#0a0a1a';
        c.fillRect(5, 2, 2, 5);
        c.fillRect(4, 7, 4, 2);
        c.fillRect(4, 9, 2, 1);
    });
}
