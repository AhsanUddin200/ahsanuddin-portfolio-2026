import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two HTML entries share the same React app. Only /track-me receives
// private-family link preview metadata; the portfolio index stays unchanged.
export default defineConfig({
  plugins: [react()],
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    trackMe: resolve(import.meta.dirname, 'track-me.html'),
  },
});
