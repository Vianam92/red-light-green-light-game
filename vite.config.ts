import { defineConfig } from 'vite';
import { resolve } from 'path';

// Configuración de Vite
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});

