/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/e-shop/',
  server: {
    open: true, // Автоматически открывает проект в браузере
  },
});
