import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/buddy-harmony/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      components: path.resolve(import.meta.dirname, './src/components'),
      hooks: path.resolve(import.meta.dirname, './src/hooks'),
      layout: path.resolve(import.meta.dirname, './src/layout'),
      lib: path.resolve(import.meta.dirname, './src/lib'),
      modules: path.resolve(import.meta.dirname, './src/modules'),
      routing: path.resolve(import.meta.dirname, './src/routing'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['json-summary', 'lcov', 'text'],
      include: ['src/**'],
    },
  },
});
