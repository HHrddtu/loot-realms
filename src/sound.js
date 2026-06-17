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

export function playPetAttack() {
    osc(600, 0.05, 'square', 0.04);
    osc(450, 0.07, 'sine', 0.03);
}

export function playPetPickup() {
    osc(700, 0.08, 'sine', 0.04);
    setTimeout(() => osc(900, 0.1, 'sine', 0.03), 60);
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
