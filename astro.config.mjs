// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // AGGIUNGI QUESTE DUE RIGHE:
  site: 'https://lori-in-the-clouds.github.io',
  base: '/', 
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});