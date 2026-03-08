// src/components/elements/StaggeredMenuDemo.tsx
import React from 'react';
import { StaggeredMenu } from '../ui/StaggeredMenu';

// Spostiamo i dati fuori per pulizia
const menuItems = [
  { label: 'Home', ariaLabel: 'Scroll to top', link: '#' },
  { label: 'Education', ariaLabel: 'View academic background', link: '#education' },
  { label: 'Skills', ariaLabel: 'View technical skills', link: '#skills' },
  { label: 'Projects', ariaLabel: 'View portfolio projects', link: '#projects' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/Lori-in-the-clouds' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lorenzo-di-maio-08557b22b/' }
];

export const StaggeredMenuDemo = () => {
  return (
    <div style={{ height: '100vh', background: 'transparent', position: 'relative' }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        // Colore del pulsante "Menu" quando è chiuso (Bianco nitido)
        menuButtonColor="#ffffff"
        // Colore del pulsante quando il menu è aperto (Azzurro Elettrico)
        openMenuButtonColor="#00b4ff" 
        changeMenuColorOnOpen={true}
        // Colori dei "layer" che scorrono all'apertura (Nero -> Blu Notte -> Indaco)
        colors={['#050505', '#080808', '#111827']}
        logoUrl="" 
        // Colore per i dettagli e le interazioni (Azzurro delle onde)
        accentColor="#00b4ff" 
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
        isFixed={true} 
      />
    </div>
  );
};