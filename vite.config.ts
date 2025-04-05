import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.mp3', '**/*.wav'],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});

