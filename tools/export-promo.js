/**
 * Экспорт промо-изображений персонажей
 * Откройте этот файл в браузере и нажмите кнопки для сохранения PNG
 */

// Функции отрисовки игроков (скопированы из src/textures/player.js)
function drawPlayerTextures(mk) {
    mk('player_sage', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#2d1b4e';
        c.fillRect(10, 0, 12, 4);
        c.fillRect(8, 4, 16, 4);
        c.fillRect(6, 8, 20, 4);
        c.fillStyle = '#3d2b5e';
        c.fillRect(4, 12, 24, 2);
        c.fillRect(12, 2, 8, 2);
        c.fillRect(10, 6, 12, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 1, 4, 2);
        c.fillRect(12, 2, 2, 2);
        c.fillRect(18, 2, 2, 2);
        c.fillStyle = '#d5c4a1';
        c.fillRect(10, 14, 12, 8);
        c.fillRect(8, 16, 16, 6);
        c.fillStyle = '#c4b494';
        c.fillRect(11, 17, 2, 1);
        c.fillRect(17, 17, 2, 1);
        c.fillRect(12, 20, 8, 1);
        c.fillStyle = '#7b68ee';
        c.fillRect(12, 16, 2, 2);
        c.fillRect(18, 16, 2, 2);
        c.fillStyle = '#9b8bff';
        c.fillRect(12, 16, 1, 1);
        c.fillRect(18, 16, 1, 1);
        c.fillStyle = '#9e9e9e';
        c.fillRect(12, 20, 8, 4);
        c.fillRect(10, 22, 12, 4);
        c.fillRect(12, 26, 8, 2);
        c.fillStyle = '#bdbdbd';
        c.fillRect(10, 23, 2, 3);
        c.fillRect(20, 23, 2, 3);
        c.fillRect(12, 27, 2, 2);
        c.fillRect(18, 27, 2, 2);
        c.fillStyle = '#2d1b4e';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#3d2b5e';
        c.fillRect(8, 16, 16, 12);
        c.fillStyle = '#4a3a6a';
        c.fillRect(10, 18, 12, 2);
        c.fillRect(14, 16, 4, 6);
        c.fillStyle = '#6a3d9a';
        c.fillRect(6, 28, 20, 2);
        c.fillStyle = '#2d1b4e';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        c.fillStyle = '#d5c4a1';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        c.fillStyle = '#5a3d1a';
        c.fillRect(0, 26, 6, 8);
        c.fillStyle = '#f5f5dc';
        c.fillRect(1, 27, 4, 6);
        c.fillStyle = '#2d1b4e';
        c.fillRect(1, 27, 4, 1);
        c.fillRect(1, 31, 4, 1);
        c.fillStyle = '#8b6914';
        c.fillRect(28, 10, 2, 28);
        c.fillStyle = '#6a3d9a';
        c.fillRect(27, 8, 4, 4);
        c.fillStyle = '#9b59b6';
        c.fillRect(28, 9, 2, 2);
        c.fillStyle = 'rgba(155,89,182,0.2)';
        c.fillRect(26, 6, 6, 6);
        c.fillStyle = '#1a0e2e';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        c.fillStyle = '#3d2b1f';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
    });

    mk('player_alchemist', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#5a3d1a';
        c.fillRect(8, 0, 16, 4);
        c.fillRect(6, 4, 20, 4);
        c.fillRect(4, 8, 24, 4);
        c.fillStyle = '#6b4423';
        c.fillRect(10, 1, 12, 2);
        c.fillRect(8, 5, 16, 2);
        c.fillStyle = '#8b6914';
        c.fillRect(2, 12, 28, 2);
        c.fillStyle = '#f39c12';
        c.fillRect(10, 14, 5, 4);
        c.fillRect(17, 14, 5, 4);
        c.fillStyle = '#2c3e50';
        c.fillRect(11, 15, 3, 2);
        c.fillRect(18, 15, 3, 2);
        c.fillStyle = '#5dade2';
        c.fillRect(11, 15, 1, 1);
        c.fillRect(18, 15, 1, 1);
        c.fillStyle = '#f39c12';
        c.fillRect(15, 15, 2, 2);
        c.fillStyle = '#c4956a';
        c.fillRect(10, 14, 12, 8);
        c.fillStyle = '#b4855a';
        c.fillRect(11, 15, 10, 6);
        c.fillStyle = '#a4754a';
        c.fillRect(11, 17, 2, 1);
        c.fillRect(17, 17, 2, 1);
        c.fillStyle = '#6b4423';
        c.fillRect(10, 20, 12, 4);
        c.fillRect(8, 22, 16, 4);
        c.fillRect(10, 26, 12, 2);
        c.fillStyle = '#7a5a33';
        c.fillRect(8, 23, 2, 3);
        c.fillRect(22, 23, 2, 3);
        c.fillRect(10, 27, 2, 2);
        c.fillRect(20, 27, 2, 2);
        c.fillStyle = '#5a3d1a';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#6b4423';
        c.fillRect(8, 16, 16, 12);
        c.fillStyle = '#8b6914';
        c.fillRect(6, 28, 20, 2);
        c.fillStyle = '#3d2b1f';
        c.fillRect(6, 26, 20, 2);
        c.fillStyle = '#f1c40f';
        c.fillRect(14, 25, 4, 4);
        c.fillStyle = '#5a3d1a';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        c.fillStyle = '#c4956a';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        c.fillStyle = '#27ae60';
        c.fillRect(0, 24, 6, 8);
        c.fillStyle = '#2ecc71';
        c.fillRect(1, 25, 4, 5);
        c.fillStyle = '#5a3d1a';
        c.fillRect(1, 23, 4, 2);
        c.fillStyle = 'rgba(39,174,96,0.2)';
        c.fillRect(0, 22, 6, 8);
        c.fillStyle = '#3d2b1f';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        c.fillStyle = '#2c1e14';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
        c.fillStyle = '#e74c3c';
        c.fillRect(26, 22, 3, 5);
        c.fillStyle = '#3498db';
        c.fillRect(27, 20, 3, 5);
        c.fillStyle = 'rgba(231,76,60,0.2)';
        c.fillRect(26, 21, 3, 6);
    });

    mk('player_angel', 32, 48, (c) => {
        c.imageSmoothingEnabled = false;
        c.fillStyle = '#f1c40f';
        c.fillRect(10, 0, 12, 4);
        c.fillRect(8, 2, 16, 6);
        c.fillRect(6, 6, 20, 4);
        c.fillStyle = '#d4ac0d';
        c.fillRect(8, 4, 2, 6);
        c.fillRect(22, 4, 2, 6);
        c.fillStyle = '#fdebd0';
        c.fillRect(10, 8, 12, 8);
        c.fillStyle = '#f5cba7';
        c.fillRect(11, 9, 10, 6);
        c.fillStyle = '#5dade2';
        c.fillRect(12, 10, 2, 2);
        c.fillRect(18, 10, 2, 2);
        c.fillStyle = '#85c1e9';
        c.fillRect(12, 10, 1, 1);
        c.fillRect(18, 10, 1, 1);
        c.fillStyle = '#34495e';
        c.fillRect(12, 9, 2, 1);
        c.fillRect(18, 9, 2, 1);
        c.fillStyle = '#e8a0a0';
        c.fillRect(14, 14, 4, 1);
        c.fillStyle = 'rgba(241,196,15,0.3)';
        c.fillRect(10, 0, 12, 2);
        c.fillRect(8, 1, 16, 1);
        c.fillStyle = '#ecf0f1';
        c.fillRect(0, 10, 6, 8);
        c.fillRect(26, 10, 6, 8);
        c.fillStyle = '#ffffff';
        c.fillRect(1, 11, 4, 6);
        c.fillRect(27, 11, 4, 6);
        c.fillStyle = '#d5dbdb';
        c.fillRect(0, 12, 2, 4);
        c.fillRect(30, 12, 2, 4);
        c.fillRect(1, 14, 1, 3);
        c.fillRect(30, 14, 1, 3);
        c.fillStyle = 'rgba(241,196,15,0.1)';
        c.fillRect(0, 8, 6, 10);
        c.fillRect(26, 8, 6, 10);
        c.fillStyle = '#ecf0f1';
        c.fillRect(6, 14, 20, 16);
        c.fillStyle = '#ffffff';
        c.fillRect(8, 16, 16, 12);
        c.fillStyle = '#f1c40f';
        c.fillRect(6, 28, 20, 2);
        c.fillRect(14, 18, 4, 6);
        c.fillRect(12, 20, 8, 2);
        c.fillStyle = '#ecf0f1';
        c.fillRect(2, 16, 4, 12);
        c.fillRect(26, 16, 4, 12);
        c.fillStyle = '#fdebd0';
        c.fillRect(2, 28, 4, 4);
        c.fillRect(26, 28, 4, 4);
        c.fillStyle = '#8b4513';
        c.fillRect(27, 18, 2, 14);
        c.fillStyle = '#a0522d';
        c.fillRect(25, 20, 6, 8);
        c.fillStyle = '#f5f5dc';
        c.fillRect(26, 21, 4, 6);
        c.fillStyle = '#8b4513';
        c.fillRect(28, 16, 2, 4);
        c.fillStyle = '#ecf0f1';
        c.fillRect(10, 30, 5, 10);
        c.fillRect(17, 30, 5, 10);
        c.fillStyle = '#f1c40f';
        c.fillRect(9, 38, 6, 6);
        c.fillRect(17, 38, 6, 6);
    });
}

// Масштабирование с nearest-neighbor (для пиксель-арта)
function scaleCanvas(srcCanvas, scale) {
    const srcCtx = srcCanvas.getContext('2d');
    const srcData = srcCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
    
    const dstCanvas = document.createElement('canvas');
    dstCanvas.width = srcCanvas.width * scale;
    dstCanvas.height = srcCanvas.height * scale;
    const dstCtx = dstCanvas.getContext('2d');
    dstCtx.imageSmoothingEnabled = false;
    
    const dstData = dstCtx.createImageData(dstCanvas.width, dstCanvas.height);
    
    for (let y = 0; y < dstCanvas.height; y++) {
        for (let x = 0; x < dstCanvas.width; x++) {
            const srcX = Math.floor(x / scale);
            const srcY = Math.floor(y / scale);
            const srcIdx = (srcY * srcCanvas.width + srcX) * 4;
            const dstIdx = (y * dstCanvas.width + x) * 4;
            
            dstData.data[dstIdx] = srcData.data[srcIdx];
            dstData.data[dstIdx + 1] = srcData.data[srcIdx + 1];
            dstData.data[dstIdx + 2] = srcData.data[srcIdx + 2];
            dstData.data[dstIdx + 3] = srcData.data[srcIdx + 3];
        }
    }
    
    dstCtx.putImageData(dstData, 0, 0);
    return dstCanvas;
}

// Сохранение canvas как PNG
function saveCanvasAsPNG(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Генерация всех изображений
function generateAll() {
    const scale = 8; // Увеличение 8x
    const textures = {};
    
    const mk = (key, w, h, drawFn) => {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        drawFn(ctx);
        textures[key] = canvas;
    };
    
    drawPlayerTextures(mk);
    
    // Создаем увеличенные версии
    const result = {};
    for (const [key, canvas] of Object.entries(textures)) {
        result[key] = scaleCanvas(canvas, scale);
    }
    
    return result;
}

// UI
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Экспорт промо-изображений персонажей</h1>
        <p>Нажмите кнопки для сохранения PNG файлов (увеличение 8x)</p>
        <div class="buttons">
            <button id="btn-sage">Скачать Sage (Мудрец)</button>
            <button id="btn-alchemist">Скачать Alchemist (Алхимик)</button>
            <button id="btn-angel">Скачать Angel (Ангел)</button>
            <button id="btn-all">Скачать всех</button>
        </div>
        <div id="preview" class="preview"></div>
    `;
    
    const images = generateAll();
    
    // Превью
    const preview = document.getElementById('preview');
    for (const [key, canvas] of Object.entries(images)) {
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        img.alt = key;
        img.title = key;
        preview.appendChild(img);
    }
    
    // Кнопки
    document.getElementById('btn-sage').onclick = () => saveCanvasAsPNG(images.player_sage, 'promo_sage.png');
    document.getElementById('btn-alchemist').onclick = () => saveCanvasAsPNG(images.player_alchemist, 'promo_alchemist.png');
    document.getElementById('btn-angel').onclick = () => saveCanvasAsPNG(images.player_angel, 'promo_angel.png');
    document.getElementById('btn-all').onclick = () => {
        saveCanvasAsPNG(images.player_sage, 'promo_sage.png');
        setTimeout(() => saveCanvasAsPNG(images.player_alchemist, 'promo_alchemist.png'), 500);
        setTimeout(() => saveCanvasAsPNG(images.player_angel, 'promo_angel.png'), 1000);
    };
});
