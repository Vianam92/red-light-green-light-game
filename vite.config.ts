import { defineConfig } from "vite";
import { resolve } from "path";
import {
  configDefaults,
  defineConfig as defineVitestConfig,
} from "vitest/config";
import { VitePWA } from 'vite-plugin-pwa';

// Configuración de Vite
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // Integración de Vitest
  test: defineVitestConfig({
    test: {
      framework: {
        type: "mocha",
      },
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    coverage: {
      provider: "istanbul",
    },
  }),
});

