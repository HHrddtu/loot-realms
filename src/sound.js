let ctx = null;
let muted = false;
let musicPlaying = false;
let musicNodes = [];

function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
}

export function toggleMute() {
    muted = !muted;
    if (muted) stopMusic();
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

/* === MEDIEVAL FLUTE MUSIC === */

const MELODY = [
    392, 440, 494, 523, 494, 440, 392, 330,
    349, 392, 440, 392, 349, 330, 294, 330,
    392, 523, 494, 440, 392, 440, 330, 294,
    330, 349, 392, 440, 392, 349, 330, 392
];

const BASS = [
    196, 196, 220, 220, 196, 196, 165, 165,
    175, 175, 196, 196, 175, 175, 165, 165,
    196, 196, 220, 220, 196, 196, 165, 165,
    165, 175, 196, 196, 175, 175, 165, 196
];

let musicTimer = null;
let melodyIdx = 0;

function playNote() {
    if (muted || !musicPlaying) return;
    const c = getCtx();
    const noteLen = 0.28;

    const fo = c.createOscillator();
    const fg = c.createGain();
    fo.type = 'sine';
    fo.frequency.value = MELODY[melodyIdx];
    fg.gain.setValueAtTime(0.04, c.currentTime);
    fg.gain.linearRampToValueAtTime(0.035, c.currentTime + noteLen * 0.7);
    fg.gain.exponentialRampToValueAtTime(0.001, c.currentTime + noteLen);
    fo.connect(fg);
    fg.connect(c.destination);
    fo.start(c.currentTime);
    fo.stop(c.currentTime + noteLen);

    const bo = c.createOscillator();
    const bg = c.createGain();
    bo.type = 'sine';
    bo.frequency.value = BASS[melodyIdx];
    bg.gain.setValueAtTime(0.02, c.currentTime);
    bg.gain.exponentialRampToValueAtTime(0.001, c.currentTime + noteLen);
    bo.connect(bg);
    bg.connect(c.destination);
    bo.start(c.currentTime);
    bo.stop(c.currentTime + noteLen);

    melodyIdx = (melodyIdx + 1) % MELODY.length;
    musicTimer = setTimeout(playNote, noteLen * 1000);
}

export function startMusic() {
    if (musicPlaying || muted) return;
    musicPlaying = true;
    melodyIdx = 0;
    playNote();
}

export function stopMusic() {
    musicPlaying = false;
    if (musicTimer) { clearTimeout(musicTimer); musicTimer = null; }
}
