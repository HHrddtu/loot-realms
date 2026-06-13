import Phaser from 'phaser';

export class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.activeEmitters = [];
    }

    _mk(key, w, h, drawFn) {
        if (this.scene.textures.exists(key)) return;
        const canvas = this.scene.textures.createCanvas(key, w, h);
        const ctx = canvas.getContext();
        drawFn(ctx, w, h);
        canvas.refresh();
    }

    init() {
        this._mk('particle_white', 12, 12, (ctx, w, h) => {
            const g = ctx.createRadialGradient(6, 6, 0, 6, 6, 6);
            g.addColorStop(0, 'rgba(255,255,255,1)');
            g.addColorStop(0.5, 'rgba(255,255,255,0.6)');
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_red', 12, 12, (ctx, w, h) => {
            const g = ctx.createRadialGradient(6, 6, 0, 6, 6, 6);
            g.addColorStop(0, 'rgba(255,60,60,1)');
            g.addColorStop(0.5, 'rgba(255,0,0,0.7)');
            g.addColorStop(1, 'rgba(200,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_gold', 14, 14, (ctx, w, h) => {
            const g = ctx.createRadialGradient(7, 7, 0, 7, 7, 7);
            g.addColorStop(0, 'rgba(255,220,50,1)');
            g.addColorStop(0.4, 'rgba(241,196,15,0.8)');
            g.addColorStop(1, 'rgba(241,196,15,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_green', 12, 12, (ctx, w, h) => {
            const g = ctx.createRadialGradient(6, 6, 0, 6, 6, 6);
            g.addColorStop(0, 'rgba(80,255,130,1)');
            g.addColorStop(0.5, 'rgba(46,204,113,0.7)');
            g.addColorStop(1, 'rgba(46,204,113,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_blue', 12, 12, (ctx, w, h) => {
            const g = ctx.createRadialGradient(6, 6, 0, 6, 6, 6);
            g.addColorStop(0, 'rgba(100,170,255,1)');
            g.addColorStop(0.5, 'rgba(52,152,219,0.7)');
            g.addColorStop(1, 'rgba(52,152,219,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_spark', 8, 8, (ctx, w, h) => {
            const g = ctx.createRadialGradient(4, 4, 0, 4, 4, 4);
            g.addColorStop(0, 'rgba(255,255,170,1)');
            g.addColorStop(0.3, 'rgba(255,255,255,0.9)');
            g.addColorStop(1, 'rgba(255,255,200,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_heal', 12, 12, (ctx, w, h) => {
            const g = ctx.createRadialGradient(6, 6, 0, 6, 6, 6);
            g.addColorStop(0, 'rgba(100,255,150,1)');
            g.addColorStop(0.5, 'rgba(50,200,100,0.6)');
            g.addColorStop(1, 'rgba(46,204,113,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_shield', 12, 12, (ctx, w, h) => {
            const g = ctx.createRadialGradient(6, 6, 0, 6, 6, 6);
            g.addColorStop(0, 'rgba(120,180,255,1)');
            g.addColorStop(0.5, 'rgba(52,152,219,0.6)');
            g.addColorStop(1, 'rgba(52,152,219,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });

        this._mk('particle_snow', 8, 8, (ctx, w, h) => {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(4, 4, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(200,220,255,0.5)';
            ctx.beginPath();
            ctx.arc(4, 4, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        this._mk('particle_leaf', 10, 10, (ctx, w, h) => {
            ctx.fillStyle = '#5a9c4f';
            ctx.beginPath();
            ctx.ellipse(5, 5, 4, 2.5, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#3a7c2f';
            ctx.beginPath();
            ctx.ellipse(5, 5, 2, 1, 0.3, 0, Math.PI * 2);
            ctx.fill();
        });
        this._mk('particle_ember', 10, 10, (ctx, w, h) => {
            const g = ctx.createRadialGradient(5, 5, 0, 5, 5, 5);
            g.addColorStop(0, 'rgba(255,200,50,1)');
            g.addColorStop(0.4, 'rgba(255,100,0,0.8)');
            g.addColorStop(1, 'rgba(255,50,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_dust', 6, 6, (ctx, w, h) => {
            const g = ctx.createRadialGradient(3, 3, 0, 3, 3, 3);
            g.addColorStop(0, 'rgba(170,150,120,0.8)');
            g.addColorStop(1, 'rgba(140,120,90,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
        });
        this._mk('particle_drop', 6, 8, (ctx, w, h) => {
            ctx.fillStyle = 'rgba(100,180,255,0.8)';
            ctx.beginPath();
            ctx.ellipse(3, 4, 2, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    destroy() {
        this.activeEmitters.forEach(e => { try { e.destroy(); } catch (_) {} });
        this.activeEmitters = [];
    }

    stopEnvironment() {
        this.activeEmitters.forEach(e => { try { e.destroy(); } catch (_) {} });
        this.activeEmitters = [];
    }

    screenShake(intensity, duration) {
        this.scene.cameras.main.shake(duration || 200, intensity || 0.005);
    }

    spawnEnemyDeath(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_white', {
            speed: { min: 60, max: 160 },
            scale: { start: 1.5, end: 0 },
            lifespan: { min: 300, max: 600 },
            quantity: 12,
            emitting: false,
            tint: [0xffffff, 0xffcc88, 0xff8844, 0xffaa66]
        });
        p.setDepth(150);
        p.explode(12);
        this.scene.time.delayedCall(700, () => p.destroy());
    }

    spawnHitSpark(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_spark', {
            speed: { min: 50, max: 130 },
            scale: { start: 1.2, end: 0 },
            lifespan: { min: 150, max: 350 },
            quantity: 6,
            emitting: false,
            tint: [0xffffaa, 0xffffff, 0xffdd44]
        });
        p.setDepth(150);
        p.explode(6);
        this.scene.time.delayedCall(400, () => p.destroy());
    }

    spawnDamageToPlayer(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_red', {
            speed: { min: 80, max: 180 },
            scale: { start: 1.8, end: 0 },
            lifespan: { min: 300, max: 600 },
            quantity: 10,
            emitting: false,
            tint: [0xff4444, 0xff0000, 0xff2222]
        });
        p.setDepth(150);
        p.explode(10);
        this.scene.time.delayedCall(650, () => p.destroy());
    }

    spawnLootPickup(x, y, rarity) {
        const colors = {
            common: 0xcccccc, uncommon: 0x2ecc71, rare: 0x3498db,
            epic: 0x9b59b6, legendary: 0xf1c40f
        };
        const tint = colors[rarity] || 0xffffff;
        const p = this.scene.add.particles(x, y, 'particle_gold', {
            speed: { min: 30, max: 90 },
            scale: { start: 1.8, end: 0 },
            lifespan: { min: 400, max: 800 },
            quantity: 14,
            emitting: false,
            tint: tint,
            gravityY: -60
        });
        p.setDepth(150);
        p.explode(14);
        this.scene.time.delayedCall(850, () => p.destroy());
    }

    spawnLevelUp(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_gold', {
            speed: { min: 80, max: 200 },
            scale: { start: 2.5, end: 0 },
            lifespan: { min: 600, max: 1100 },
            quantity: 30,
            emitting: false,
            tint: [0xf1c40f, 0xffd700, 0xffffff, 0xffaa00],
            angle: { min: 0, max: 360 },
            gravityY: -100
        });
        p.setDepth(150);
        p.explode(30);
        this.scene.time.delayedCall(1200, () => p.destroy());
        this.screenShake(0.006, 250);
    }

    spawnHealEffect(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_heal', {
            speed: { min: 20, max: 60 },
            scale: { start: 1.2, end: 0 },
            lifespan: { min: 400, max: 800 },
            quantity: 12,
            emitting: false,
            angle: { min: 220, max: 320 },
            tint: [0x55ff88, 0x2ecc71, 0x88ffaa]
        });
        p.setDepth(150);
        p.explode(12);
        this.scene.time.delayedCall(850, () => p.destroy());
    }

    spawnShieldEffect(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_shield', {
            speed: { min: 10, max: 40 },
            scale: { start: 1, end: 0 },
            lifespan: { min: 500, max: 900 },
            quantity: 16,
            emitting: false,
            tint: [0x66aaff, 0x3388ff, 0x99ccff]
        });
        p.setDepth(150);
        p.explode(16);
        this.scene.time.delayedCall(950, () => p.destroy());
    }

    spawnBossDeath(x, y) {
        const p = this.scene.add.particles(x, y, 'particle_gold', {
            speed: { min: 100, max: 280 },
            scale: { start: 3, end: 0 },
            lifespan: { min: 700, max: 1500 },
            quantity: 40,
            emitting: false,
            tint: [0xf1c40f, 0xff6600, 0xff0000, 0xffffff, 0xffaa00],
            angle: { min: 0, max: 360 },
            gravityY: -80
        });
        p.setDepth(150);
        p.explode(40);
        this.scene.time.delayedCall(1600, () => p.destroy());
        this.screenShake(0.012, 400);
    }

    startSnowfall(worldW, worldH) {
        const cam = this.scene.cameras.main;
        const emitter = this.scene.add.particles(0, 0, 'particle_snow', {
            x: { min: 0, max: cam.width },
            y: -30,
            speedX: { min: -20, max: 20 },
            speedY: { min: 30, max: 80 },
            scale: { start: 1.2, end: 0.4 },
            lifespan: { min: 5000, max: 10000 },
            quantity: 3,
            frequency: 50,
            tint: [0xe8f0ff, 0xffffff, 0xd0e8ff, 0xcce0ff],
            alpha: { start: 1, end: 0.4 },
            rotate: { min: 0, max: 360 }
        });
        emitter.setScrollFactor(0);
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }

    startForestLeaves(worldW, worldH) {
        const emitter = this.scene.add.particles(0, 0, 'particle_leaf', {
            x: { min: 0, max: worldW },
            y: -30,
            speedX: { min: -15, max: 40 },
            speedY: { min: 20, max: 55 },
            scale: { start: 1.2, end: 0.3 },
            lifespan: { min: 6000, max: 11000 },
            quantity: 2,
            frequency: 150,
            tint: [0x5a9c4f, 0x7abc5f, 0x9fdc6f, 0xc4a035, 0x88bb44],
            alpha: { start: 1, end: 0.3 },
            rotate: { min: 0, max: 360 },
            angle: { min: 70, max: 110 }
        });
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }

    startFirefly(worldW, worldH) {
        const emitter = this.scene.add.particles(0, 0, 'particle_gold', {
            x: { min: 0, max: worldW },
            y: { min: 100, max: worldH },
            speedX: { min: -12, max: 12 },
            speedY: { min: -12, max: 12 },
            scale: { start: 0.5, end: 1 },
            lifespan: { min: 4000, max: 8000 },
            quantity: 1,
            frequency: 300,
            tint: [0xf1c40f, 0xffd700, 0xffee44],
            alpha: { start: 0.2, end: 1 },
            blendMode: 'ADD'
        });
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }

    startHellEmbers(worldW, worldH) {
        const emitter = this.scene.add.particles(0, 0, 'particle_ember', {
            x: { min: 0, max: worldW },
            y: { min: worldH * 0.3, max: worldH },
            speedX: { min: -25, max: 25 },
            speedY: { min: -80, max: -160 },
            scale: { start: 1.5, end: 0 },
            lifespan: { min: 2500, max: 5000 },
            quantity: 3,
            frequency: 60,
            tint: [0xff6600, 0xff3300, 0xffaa00, 0xff0000, 0xff8800],
            alpha: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }

    startMineDust(worldW, worldH) {
        const emitter = this.scene.add.particles(0, 0, 'particle_dust', {
            x: { min: 0, max: worldW },
            y: { min: 0, max: worldH },
            speedX: { min: -8, max: 8 },
            speedY: { min: -5, max: 5 },
            scale: { start: 0.8, end: 0 },
            lifespan: { min: 4000, max: 8000 },
            quantity: 2,
            frequency: 200,
            tint: [0xaa9977, 0x887755, 0xccaa88],
            alpha: { start: 0.6, end: 0 }
        });
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }

    startCaveDrip(worldW, worldH) {
        const emitter = this.scene.add.particles(0, 0, 'particle_drop', {
            x: { min: 0, max: worldW },
            y: -10,
            speedX: { min: -3, max: 3 },
            speedY: { min: 60, max: 120 },
            scale: { start: 0.8, end: 0.3 },
            lifespan: { min: 1200, max: 2500 },
            quantity: 1,
            frequency: 350,
            tint: [0x5599dd, 0x3377bb, 0x77bbee],
            alpha: { start: 0.9, end: 0.2 }
        });
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }

    startCandleGlow(worldX, worldY) {
        const emitter = this.scene.add.particles(worldX, worldY, 'particle_ember', {
            speedX: { min: -5, max: 5 },
            speedY: { min: -15, max: -30 },
            scale: { start: 0.6, end: 1.2 },
            lifespan: { min: 600, max: 1200 },
            quantity: 1,
            frequency: 100,
            tint: [0xff6600, 0xffaa00, 0xff4400, 0xffcc44],
            alpha: { start: 0.9, end: 0 },
            blendMode: 'ADD'
        });
        emitter.setDepth(100);
        this.activeEmitters.push(emitter);
        return emitter;
    }
}
