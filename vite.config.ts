import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  optimizeDeps: {
    force: true,
    include: ['@editora/plugins'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
