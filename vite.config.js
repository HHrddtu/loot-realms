import { defineConfig } from 'vite';

function removeCrossorigin() {
    return {
        name: 'remove-crossorigin',
        transformIndexHtml(html) {
            return html.replace(/ crossorigin/g, '');
        }
    };
}

export default defineConfig({
    base: './',
    plugins: [removeCrossorigin()],
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
