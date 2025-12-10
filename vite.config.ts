yimport path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const apiUrl = env.VITE_API_URL || 'http://localhost:3002';
    
    return {
      base: './',
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: mode === 'development' ? {
          '/api': {
            target: apiUrl,
            changeOrigin: true,
            secure: false,
          }
        } : undefined
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
