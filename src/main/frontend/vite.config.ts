import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-macros'],
            },
        }),
        dynamicImport(),
    ],
    // 프록시 설정 시작
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    }, // 프록시 설정 끝
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'build',
    },
})
