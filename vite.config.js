import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        host: '0.0.0.0',
        port: 5173
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/phaser')) return 'phaser';
                    if (id.includes('node_modules/firebase')) return 'firebase';
                    if (id.includes('node_modules/peerjs')) return 'peerjs';
                }
            }
        }
    }
});
