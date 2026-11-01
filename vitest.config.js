import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    resolve: {
        alias: {
            phaser: fileURLToPath(new URL('./tests/mocks/phaser.js', import.meta.url))
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./tests/setup.js']
    }
});
