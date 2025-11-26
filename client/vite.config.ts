import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.join(__dirname, 'src/renderer'),
  base: './',
  build: {
    outDir: path.join(__dirname, 'dist/renderer'),
    emptyDirOnly: true,
  },
  server: {
    port: 5173,
  },
});
