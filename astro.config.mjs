// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://lori-in-the-clouds.github.io',
  base: '/', 
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    // Configurazione semplificata e senza errori TypeScript
    compress({
      CSS: true,
      HTML: true, // I default rimuovono già i commenti e minificano
      Image: false, 
      JavaScript: true,
      SVG: true,
    })
  ],

  build: {
    inlineStylesheets: 'always', 
  }
});