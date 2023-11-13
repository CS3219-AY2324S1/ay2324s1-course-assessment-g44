import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 8080;

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: port,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/setupTests.js'],
  },
});
