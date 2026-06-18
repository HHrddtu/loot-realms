let ctx = null;
let muted = false;

function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
}

export function toggleMute() {
    muted = !muted;
    if (muted) {
        stopZoneMusic();
    } else if (currentZoneKey) {
        const zone = currentZoneKey;
        currentZoneKey = null;
        startZoneMusic(zone);
    }
    return muted;
}

export function isMuted() {
    return muted;
}

function osc(freq, dur, type, vol) {
    if (muted) return;
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.08, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(c.currentTime);
    o.stop(c.currentTime + dur);
}

function noise(dur, vol) {
    if (muted) return;
    const c = getCtx();
    const n = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, n, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
    const s = c.createBufferSource();
    s.buffer = buf;
    const g = c.createGain();
    g.gain.setValueAtTime(vol || 0.04, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    s.connect(g);
    g.connect(c.destination);
    s.start(c.currentTime);
}

export function playAttack() {}

export function playHit() {
    osc(180, 0.1, 'sine', 0.1);
    noise(0.06, 0.05);
}

export function playLevelUp() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => {
        setTimeout(() => osc(f, 0.2, 'sine', 0.07), i * 100);
    });
}

export function playLoot() {
    osc(520, 0.12, 'sine', 0.04);
    setTimeout(() => osc(660, 0.15, 'sine', 0.03), 80);
}

export function playBossHit() {
    osc(120, 0.12, 'sine', 0.08);
    noise(0.08, 0.04);
}

export function playBossAoE() {
    noise(0.35, 0.08);
    osc(80, 0.3, 'sine', 0.09);
    osc(60, 0.35, 'sine', 0.06);
}

export function playBossDeath() {
    osc(350, 0.2, 'sine', 0.08);
    setTimeout(() => osc(280, 0.25, 'sine', 0.06), 120);
    setTimeout(() => osc(200, 0.35, 'sine', 0.05), 250);
    setTimeout(() => noise(0.3, 0.05), 350);
}

export function playEnemyDeath() {
    osc(400, 0.06, 'sine', 0.05);
    osc(250, 0.08, 'sine', 0.04);
}

export function playPortal() {
    osc(440, 0.15, 'sine', 0.04);
    setTimeout(() => osc(550, 0.15, 'sine', 0.04), 80);
    setTimeout(() => osc(660, 0.2, 'sine', 0.03), 160);
}

export function playBreak() {
    osc(400, 0.06, 'sine', 0.05);
    osc(250, 0.08, 'sine', 0.04);
}

export function playPetAttack(type) {
    if (muted) return;
    const c = getCtx();
    if (type === 'attacker') {
        const o1 = c.createOscillator();
        const g1 = c.createGain();
        o1.type = 'sawtooth';
        o1.frequency.setValueAtTime(800, c.currentTime);
        o1.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.08);
        g1.gain.setValueAtTime(0.06, c.currentTime);
        g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
        o1.connect(g1); g1.connect(c.destination);
        o1.start(c.currentTime); o1.stop(c.currentTime + 0.1);
        const o2 = c.createOscillator();
        const g2 = c.createGain();
        o2.type = 'square';
        o2.frequency.setValueAtTime(300, c.currentTime);
        o2.frequency.exponentialRampToValueAtTime(100, c.currentTime + 0.06);
        g2.gain.setValueAtTime(0.04, c.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.07);
        o2.connect(g2); g2.connect(c.destination);
        o2.start(c.currentTime); o2.stop(c.currentTime + 0.07);
        noise(0.05, 0.03);
    } else if (type === 'tank') {
        const o1 = c.createOscillator();
        const g1 = c.createGain();
        o1.type = 'sine';
        o1.frequency.setValueAtTime(120, c.currentTime);
        o1.frequency.exponentialRampToValueAtTime(60, c.currentTime + 0.15);
        g1.gain.setValueAtTime(0.1, c.currentTime);
        g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.18);
        o1.connect(g1); g1.connect(c.destination);
        o1.start(c.currentTime); o1.stop(c.currentTime + 0.18);
        noise(0.1, 0.06);
        const o2 = c.createOscillator();
        const g2 = c.createGain();
        o2.type = 'triangle';
        o2.frequency.setValueAtTime(200, c.currentTime);
        o2.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.12);
        g2.gain.setValueAtTime(0.05, c.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.14);
        o2.connect(g2); g2.connect(c.destination);
        o2.start(c.currentTime); o2.stop(c.currentTime + 0.14);
    } else if (type === 'collector') {
        const o1 = c.createOscillator();
        const g1 = c.createGain();
        o1.type = 'sine';
        o1.frequency.setValueAtTime(1200, c.currentTime);
        o1.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.08);
        g1.gain.setValueAtTime(0.03, c.currentTime);
        g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
        o1.connect(g1); g1.connect(c.destination);
        o1.start(c.currentTime); o1.stop(c.currentTime + 0.12);
        const o2 = c.createOscillator();
        const g2 = c.createGain();
        o2.type = 'sine';
        o2.frequency.setValueAtTime(1600, c.currentTime + 0.04);
        o2.frequency.exponentialRampToValueAtTime(1100, c.currentTime + 0.12);
        g2.gain.setValueAtTime(0.025, c.currentTime + 0.04);
        g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
        o2.connect(g2); g2.connect(c.destination);
        o2.start(c.currentTime + 0.04); o2.stop(c.currentTime + 0.15);
    } else {
        const o1 = c.createOscillator();
        const g1 = c.createGain();
        o1.type = 'sine';
        o1.frequency.setValueAtTime(600, c.currentTime);
        o1.frequency.exponentialRampToValueAtTime(400, c.currentTime + 0.1);
        g1.gain.setValueAtTime(0.04, c.currentTime);
        g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
        o1.connect(g1); g1.connect(c.destination);
        o1.start(c.currentTime); o1.stop(c.currentTime + 0.12);
        const o2 = c.createOscillator();
        const g2 = c.createGain();
        o2.type = 'triangle';
        o2.frequency.setValueAtTime(500, c.currentTime);
        o2.frequency.exponentialRampToValueAtTime(350, c.currentTime + 0.08);
        g2.gain.setValueAtTime(0.03, c.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
        o2.connect(g2); g2.connect(c.destination);
        o2.start(c.currentTime); o2.stop(c.currentTime + 0.1);
    }
}

export function playPetPickup() {
    if (muted) return;
    const c = getCtx();
    const o1 = c.createOscillator();
    const g1 = c.createGain();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(800, c.currentTime);
    o1.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.06);
    g1.gain.setValueAtTime(0.04, c.currentTime);
    g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o1.connect(g1); g1.connect(c.destination);
    o1.start(c.currentTime); o1.stop(c.currentTime + 0.1);
    const o2 = c.createOscillator();
    const g2 = c.createGain();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(1100, c.currentTime + 0.05);
    o2.frequency.exponentialRampToValueAtTime(1500, c.currentTime + 0.12);
    g2.gain.setValueAtTime(0.03, c.currentTime + 0.05);
    g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
    o2.connect(g2); g2.connect(c.destination);
    o2.start(c.currentTime + 0.05); o2.stop(c.currentTime + 0.15);
}

/* === ZONE MUSIC SYSTEM === */

let zoneMusicActive = false;
let zoneMusicNodes = [];
let zoneMusicTimers = [];
let currentZoneKey = null;
let crossfadeGain = null;

const ZONE_DEFS = {
    forest: {
        create(c) {
            const nodes = [];
            const padGain = c.createGain();
            padGain.gain.value = 0;
            padGain.connect(c.destination);
            const pad = c.createOscillator();
            pad.type = 'sine';
            pad.frequency.value = 130;
            pad.connect(padGain);
            pad.start();
            nodes.push({ osc: pad, gain: padGain, target: 0.035 });

            const pad2 = c.createOscillator();
            pad2.type = 'sine';
            pad2.frequency.value = 195;
            const pad2Gain = c.createGain();
            pad2Gain.gain.value = 0;
            pad2.connect(pad2Gain);
            pad2Gain.connect(c.destination);
            pad2.start();
            nodes.push({ osc: pad2, gain: pad2Gain, target: 0.02 });

            const notes = [523, 587, 659, 784, 659, 587, 523, 440, 523, 659, 784, 880, 784, 659, 523, 440];
            let noteIdx = 0;
            const playChime = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.025, now + 0.1);
                g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 2);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playChime, 2500 + Math.random() * 3000));
            };
            zoneMusicTimers.push(setTimeout(playChime, 1000));
            return nodes;
        }
    },

    mine: {
        create(c) {
            const nodes = [];
            const droneGain = c.createGain();
            droneGain.gain.value = 0;
            droneGain.connect(c.destination);
            const drone = c.createOscillator();
            drone.type = 'sawtooth';
            drone.frequency.value = 55;
            const droneFilter = c.createBiquadFilter();
            droneFilter.type = 'lowpass';
            droneFilter.frequency.value = 200;
            drone.connect(droneFilter);
            droneFilter.connect(droneGain);
            drone.start();
            nodes.push({ osc: drone, gain: droneGain, target: 0.03 });

            const drone2 = c.createOscillator();
            drone2.type = 'sine';
            drone2.frequency.value = 82;
            const drone2Gain = c.createGain();
            drone2Gain.gain.value = 0;
            drone2.connect(drone2Gain);
            drone2Gain.connect(c.destination);
            drone2.start();
            nodes.push({ osc: drone2, gain: drone2Gain, target: 0.025 });

            let beatCount = 0;
            const playBeat = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'triangle';
                o.frequency.value = beatCount % 4 === 0 ? 80 : 120;
                g.gain.setValueAtTime(0.04, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.2);
                beatCount++;
                zoneMusicTimers.push(setTimeout(playBeat, 800 + (beatCount % 2 === 0 ? 200 : 0)));
            };
            zoneMusicTimers.push(setTimeout(playBeat, 500));

            const metallicHit = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'square';
                o.frequency.value = 2000 + Math.random() * 1000;
                g.gain.setValueAtTime(0.015, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.1);
                zoneMusicTimers.push(setTimeout(metallicHit, 3000 + Math.random() * 4000));
            };
            zoneMusicTimers.push(setTimeout(metallicHit, 2000));
            return nodes;
        }
    },

    village: {
        create(c) {
            const nodes = [];
            const padGain = c.createGain();
            padGain.gain.value = 0;
            padGain.connect(c.destination);
            const pad = c.createOscillator();
            pad.type = 'sine';
            pad.frequency.value = 165;
            pad.connect(padGain);
            pad.start();
            nodes.push({ osc: pad, gain: padGain, target: 0.03 });

            const notes = [392, 440, 523, 440, 392, 330, 392, 440, 523, 587, 523, 440, 392, 330, 294, 330];
            let noteIdx = 0;
            const playMelody = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.03, now + 0.08);
                g.gain.linearRampToValueAtTime(0.025, now + 0.35);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.6);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playMelody, 600));
            };
            zoneMusicTimers.push(setTimeout(playMelody, 400));

            const bassNotes = [196, 220, 196, 165, 175, 196, 165, 196];
            let bassIdx = 0;
            const playBass = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = bassNotes[bassIdx % bassNotes.length];
                g.gain.setValueAtTime(0.02, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.6);
                bassIdx++;
                zoneMusicTimers.push(setTimeout(playBass, 1200));
            };
            zoneMusicTimers.push(setTimeout(playBass, 200));
            return nodes;
        }
    },

    cave: {
        create(c) {
            const nodes = [];
            const rumbleGain = c.createGain();
            rumbleGain.gain.value = 0;
            rumbleGain.connect(c.destination);
            const rumble = c.createOscillator();
            rumble.type = 'sine';
            rumble.frequency.value = 42;
            const lfo = c.createOscillator();
            lfo.frequency.value = 0.3;
            const lfoGain = c.createGain();
            lfoGain.gain.value = 5;
            lfo.connect(lfoGain);
            lfoGain.connect(rumble.frequency);
            lfo.start();
            rumble.connect(rumbleGain);
            rumble.start();
            nodes.push({ osc: rumble, gain: rumbleGain, target: 0.04 });
            nodes.push({ osc: lfo, gain: null, target: 0 });

            const notes = [1047, 1319, 1568, 1319, 1047, 880, 1047, 784];
            let noteIdx = 0;
            const playNote = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.018, now + 0.05);
                g.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 3);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playNote, 3500 + Math.random() * 2000));
            };
            zoneMusicTimers.push(setTimeout(playNote, 1500));

            const subHit = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = 35;
                g.gain.setValueAtTime(0.035, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 1);
                zoneMusicTimers.push(setTimeout(subHit, 6000 + Math.random() * 5000));
            };
            zoneMusicTimers.push(setTimeout(subHit, 3000));
            return nodes;
        }
    },

    castle: {
        create(c) {
            const nodes = [];
            const padGain = c.createGain();
            padGain.gain.value = 0;
            padGain.connect(c.destination);
            const pad = c.createOscillator();
            pad.type = 'sawtooth';
            pad.frequency.value = 110;
            const filter = c.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 300;
            pad.connect(filter);
            filter.connect(padGain);
            pad.start();
            nodes.push({ osc: pad, gain: padGain, target: 0.015 });

            const pad2Gain = c.createGain();
            pad2Gain.gain.value = 0;
            pad2Gain.connect(c.destination);
            const pad2 = c.createOscillator();
            pad2.type = 'sine';
            pad2.frequency.value = 165;
            pad2.connect(pad2Gain);
            pad2.start();
            nodes.push({ osc: pad2, gain: pad2Gain, target: 0.025 });

            const pad3Gain = c.createGain();
            pad3Gain.gain.value = 0;
            pad3Gain.connect(c.destination);
            const pad3 = c.createOscillator();
            pad3.type = 'sine';
            pad3.frequency.value = 220;
            pad3.connect(pad3Gain);
            pad3.start();
            nodes.push({ osc: pad3, gain: pad3Gain, target: 0.015 });

            const notes = [220, 262, 330, 392, 440, 392, 330, 262, 220, 196, 220, 262, 330, 392, 440, 523];
            let noteIdx = 0;
            const playNote = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.022, now + 0.1);
                g.gain.linearRampToValueAtTime(0.018, now + 0.6);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 1);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playNote, 700));
            };
            zoneMusicTimers.push(setTimeout(playNote, 600));

            const tension = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sawtooth';
                o.frequency.value = 110;
                const f = c.createBiquadFilter();
                f.type = 'lowpass';
                f.frequency.setValueAtTime(200, now);
                f.frequency.linearRampToValueAtTime(600, now + 2);
                g.gain.setValueAtTime(0.01, now);
                g.gain.linearRampToValueAtTime(0.02, now + 2);
                g.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
                o.connect(f);
                f.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 3);
                zoneMusicTimers.push(setTimeout(tension, 8000));
            };
            zoneMusicTimers.push(setTimeout(tension, 4000));
            return nodes;
        }
    },

    arena: {
        create(c) {
            const nodes = [];
            const padGain = c.createGain();
            padGain.gain.value = 0;
            padGain.connect(c.destination);
            const pad = c.createOscillator();
            pad.type = 'square';
            pad.frequency.value = 82;
            const filter = c.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 250;
            pad.connect(filter);
            filter.connect(padGain);
            pad.start();
            nodes.push({ osc: pad, gain: padGain, target: 0.012 });

            const pad2Gain = c.createGain();
            pad2Gain.gain.value = 0;
            pad2Gain.connect(c.destination);
            const pad2 = c.createOscillator();
            pad2.type = 'sawtooth';
            pad2.frequency.value = 110;
            pad2.connect(pad2Gain);
            pad2.start();
            nodes.push({ osc: pad2, gain: pad2Gain, target: 0.015 });

            let beat = 0;
            const playBeat = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'square';
                o.frequency.value = beat % 2 === 0 ? 110 : 82;
                g.gain.setValueAtTime(0.03, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.15);
                beat++;
                zoneMusicTimers.push(setTimeout(playBeat, 350));
            };
            zoneMusicTimers.push(setTimeout(playBeat, 200));

            const hiHat = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const n = Math.floor(c.sampleRate * 0.03);
                const buf = c.createBuffer(1, n, c.sampleRate);
                const d = buf.getChannelData(0);
                for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
                const s = c.createBufferSource();
                s.buffer = buf;
                const g = c.createGain();
                const f = c.createBiquadFilter();
                f.type = 'highpass';
                f.frequency.value = 6000;
                g.gain.setValueAtTime(0.02, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                s.connect(f);
                f.connect(g);
                g.connect(c.destination);
                s.start(now);
                zoneMusicTimers.push(setTimeout(hiHat, 350));
            };
            zoneMusicTimers.push(setTimeout(hiHat, 375));
            return nodes;
        }
    },

    hell: {
        create(c) {
            const nodes = [];
            const droneGain = c.createGain();
            droneGain.gain.value = 0;
            droneGain.connect(c.destination);
            const drone = c.createOscillator();
            drone.type = 'sawtooth';
            drone.frequency.value = 55;
            const f = c.createBiquadFilter();
            f.type = 'lowpass';
            f.frequency.value = 150;
            drone.connect(f);
            f.connect(droneGain);
            drone.start();
            nodes.push({ osc: drone, gain: droneGain, target: 0.025 });

            const drone2Gain = c.createGain();
            drone2Gain.gain.value = 0;
            drone2Gain.connect(c.destination);
            const drone2 = c.createOscillator();
            drone2.type = 'sine';
            drone2.frequency.value = 73;
            drone2.connect(drone2Gain);
            drone2.start();
            nodes.push({ osc: drone2, gain: drone2Gain, target: 0.03 });

            const dissonance = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sawtooth';
                o.frequency.value = 55 + Math.random() * 110;
                const fl = c.createBiquadFilter();
                fl.type = 'lowpass';
                fl.frequency.value = 200;
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.015, now + 0.3);
                g.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
                o.connect(fl);
                fl.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 2);
                zoneMusicTimers.push(setTimeout(dissonance, 4000 + Math.random() * 3000));
            };
            zoneMusicTimers.push(setTimeout(dissonance, 2000));

            const pulse = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = 35;
                g.gain.setValueAtTime(0.04, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.8);
                zoneMusicTimers.push(setTimeout(pulse, 2000));
            };
            zoneMusicTimers.push(setTimeout(pulse, 1000));
            return nodes;
        }
    },

    snowy: {
        create(c) {
            const nodes = [];
            const padGain = c.createGain();
            padGain.gain.value = 0;
            padGain.connect(c.destination);
            const pad = c.createOscillator();
            pad.type = 'sine';
            pad.frequency.value = 165;
            pad.connect(padGain);
            pad.start();
            nodes.push({ osc: pad, gain: padGain, target: 0.03 });

            const pad2Gain = c.createGain();
            pad2Gain.gain.value = 0;
            pad2Gain.connect(c.destination);
            const pad2 = c.createOscillator();
            pad2.type = 'sine';
            pad2.frequency.value = 220;
            pad2.connect(pad2Gain);
            pad2.start();
            nodes.push({ osc: pad2, gain: pad2Gain, target: 0.018 });

            const notes = [880, 988, 1047, 1175, 1047, 988, 880, 784, 880, 1047, 1175, 1319, 1175, 1047, 880, 784];
            let noteIdx = 0;
            const playChime = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.02, now + 0.05);
                g.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 3);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playChime, 3000 + Math.random() * 2000));
            };
            zoneMusicTimers.push(setTimeout(playChime, 800));
            return nodes;
        }
    },

    meadow: {
        create(c) {
            const nodes = [];
            const padGain = c.createGain();
            padGain.gain.value = 0;
            padGain.connect(c.destination);
            const pad = c.createOscillator();
            pad.type = 'sine';
            pad.frequency.value = 165;
            pad.connect(padGain);
            pad.start();
            nodes.push({ osc: pad, gain: padGain, target: 0.03 });

            const notes = [440, 523, 587, 659, 587, 523, 440, 392, 440, 523, 659, 784, 659, 523, 440, 392];
            let noteIdx = 0;
            const playChime = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.025, now + 0.1);
                g.gain.exponentialRampToValueAtTime(0.001, now + 2);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 2.5);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playChime, 2500 + Math.random() * 2000));
            };
            zoneMusicTimers.push(setTimeout(playChime, 500));
            return nodes;
        }
    },

    cemetery: {
        create(c) {
            const nodes = [];
            const rumbleGain = c.createGain();
            rumbleGain.gain.value = 0;
            rumbleGain.connect(c.destination);
            const rumble = c.createOscillator();
            rumble.type = 'sine';
            rumble.frequency.value = 40;
            rumble.connect(rumbleGain);
            rumble.start();
            nodes.push({ osc: rumble, gain: rumbleGain, target: 0.035 });

            const notes = [440, 415, 392, 370, 349, 330, 311, 330];
            let noteIdx = 0;
            const playNote = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'sine';
                o.frequency.value = notes[noteIdx % notes.length];
                g.gain.setValueAtTime(0, now);
                g.gain.linearRampToValueAtTime(0.02, now + 0.05);
                g.gain.exponentialRampToValueAtTime(0.001, now + 2);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 2.5);
                noteIdx++;
                zoneMusicTimers.push(setTimeout(playNote, 3500 + Math.random() * 3000));
            };
            zoneMusicTimers.push(setTimeout(playNote, 2000));
            return nodes;
        }
    },

    mine_boss: {
        create(c) {
            const nodes = [];
            const droneGain = c.createGain();
            droneGain.gain.value = 0;
            droneGain.connect(c.destination);
            const drone = c.createOscillator();
            drone.type = 'sawtooth';
            drone.frequency.value = 55;
            const fl = c.createBiquadFilter();
            fl.type = 'lowpass';
            fl.frequency.value = 200;
            drone.connect(fl);
            fl.connect(droneGain);
            drone.start();
            nodes.push({ osc: drone, gain: droneGain, target: 0.02 });

            let beat = 0;
            const playBeat = () => {
                if (!zoneMusicActive || muted) return;
                const now = c.currentTime;
                const o = c.createOscillator();
                const g = c.createGain();
                o.type = 'square';
                o.frequency.value = beat % 2 === 0 ? 110 : 82;
                g.gain.setValueAtTime(0.03, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                o.connect(g);
                g.connect(c.destination);
                o.start(now);
                o.stop(now + 0.15);
                beat++;
                zoneMusicTimers.push(setTimeout(playBeat, 400));
            };
            zoneMusicTimers.push(setTimeout(playBeat, 300));
            return nodes;
        }
    }
};

const FALLBACK_ZONE = 'forest';

export function startZoneMusic(zoneKey) {
    const key = zoneKey || FALLBACK_ZONE;
    if (currentZoneKey === key && zoneMusicActive) return;
    stopZoneMusic();
    if (muted) return;
    const c = getCtx();
    const def = ZONE_DEFS[key] || ZONE_DEFS[FALLBACK_ZONE];
    zoneMusicActive = true;
    currentZoneKey = key;
    zoneMusicNodes = def.create(c);
    zoneMusicNodes.forEach(n => {
        if (n.gain && n.target !== undefined) {
            n.gain.gain.linearRampToValueAtTime(n.target, c.currentTime + 1.5);
        }
    });
}

export function stopZoneMusic() {
    if (!zoneMusicActive && zoneMusicNodes.length === 0) return;
    const c = ctx;
    if (c && zoneMusicNodes.length > 0) {
        zoneMusicNodes.forEach(n => {
            if (n.gain) {
                try {
                    n.gain.gain.linearRampToValueAtTime(0, c.currentTime + 0.8);
                } catch (e) {}
            }
        });
        setTimeout(() => {
            zoneMusicNodes.forEach(n => {
                try { n.osc.stop(); } catch (e) {}
            });
            zoneMusicNodes = [];
        }, 1000);
    }
    zoneMusicTimers.forEach(t => clearTimeout(t));
    zoneMusicTimers = [];
    zoneMusicActive = false;
    currentZoneKey = null;
}

export function startMusic() {
    startZoneMusic('forest');
}

export function stopMusic() {
    stopZoneMusic();
}
