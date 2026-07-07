// Setup file for vitest
// Mock canvas context for Phaser

if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.getContext = () => ({
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        fillRect: () => {},
        strokeRect: () => {},
        clearRect: () => {},
        beginPath: () => {},
        closePath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        arc: () => {},
        fill: () => {},
        stroke: () => {},
        createRadialGradient: () => ({
            addColorStop: () => {}
        }),
        createLinearGradient: () => ({
            addColorStop: () => {}
        }),
        measureText: () => ({ width: 0 }),
        drawImage: () => {},
        getImageData: () => ({ data: [] }),
        putImageData: () => {},
        scale: () => {},
        rotate: () => {},
        translate: () => {},
        save: () => {},
        restore: () => {},
        clip: () => {},
        rect: () => {},
        quadraticCurveTo: () => {},
        bezierCurveTo: () => {},
        arcTo: () => {},
        ellipse: () => {},
        setTransform: () => {},
        resetTransform: () => {},
        canvas: { width: 800, height: 600 }
    });
    
    // Mock HTMLCanvasElement.getContext
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type) {
        if (type === '2d') {
            return canvas.getContext('2d');
        }
        return originalGetContext.call(this, type);
    };
}
