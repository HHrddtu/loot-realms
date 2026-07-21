export const CUTSCENE = {
    beat0: { duration: 4000, bg: 0x000000 },
    beat1: { duration: 3000, bg: 0x1a0800 },
    beat2: { duration: 2500, bg: 0x2a0800 },
    beat3: { duration: 3500, bg: 0x0a0000 },
    beat4: { duration: 8000, bg: 0x0a0010 },
    beat7: { duration: 1500, bg: 0x000000 },
    fadeOut: 400,
    fadeIn: 400,
    beatGap: 150,
    textFade: 500,
    textDisplay: {
        fontFamily: 'Georgia',
        fontSize: '18px',
        fill: '#f1c40f',
        wordWrap: { width: 500 },
        align: 'center',
        lineSpacing: 6
    },
    subtitleStyle: {
        fontFamily: 'Arial',
        fontSize: '14px',
        fill: '#ddd',
        wordWrap: { width: 480 },
        align: 'center',
        lineSpacing: 4
    },
    meteor: {
        startY: -80,
        endY: 500,
        size: 24,
        color: 0xff4400,
        glowColor: 0xff6600,
        trailColor: 0xff2200,
        fallDuration: 1400,
        delay: 6000
    },
    portal: {
        maxScale: 3.5,
        glowColor: 0x8844cc,
        particleColors: [0x8844cc, 0xaa66ee, 0xcc88ff]
    },
    elderFather: {
        x: 250,
        y: 300,
        scale: 1.5
    },
    elderCurrent: {
        x: 550,
        y: 300,
        scale: 1.5
    }
};
