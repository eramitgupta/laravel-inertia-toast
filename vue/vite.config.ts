import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const external = ['vue', '@inertiajs/core', '@inertiajs/vue3'];

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
            cssFileName: 'style'
        },
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
        rollupOptions: {
            external,
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue'
                }
            }
        },
        target: 'es2018',
        sourcemap: true
    }
});
