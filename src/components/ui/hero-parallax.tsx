"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {

  const firstRow = products.slice(0, 6);
  const secondRow = products.slice(6, 12);
  const thirdRow = products.slice(12, 18);
  const ref = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 1. MOLLA REATTIVA: Alta rigidità (250) e alto ammortizzamento (40)
  // Questo fa "scattare" le icone in posizione senza farle rimbalzare e senza ritardi.
  const springConfig = { stiffness: 400, damping: 40, bounce: 0, restDelta: 0.001 };

  // 2. FINESTRA CORTISSIMA: [0, 0.08] significa che l'animazione finisce
  // quando hai scrollato appena l'8% della sezione (praticamente quando superi il titolo).
  const translateX = useSpring(useTransform(scrollYProgress, [0, 0.03], [150, 0]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 0.03], [-150, 0]), springConfig);
  
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.03], [-200, 0]), springConfig);
  
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.03], [25, 0]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.03], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.03], [0.2, 1]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[80vh] md:h-[100vh] min-h-[600px] overflow-hidden antialiased relative flex flex-col items-center [perspective:1000px] [transform-style:preserve-3d]"
    >
    
      <Header />
      
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="w-full flex flex-col items-center z-0" 
      >
        <motion.div style={{ x: translateX }} className="w-full mt-4 md:mt-10">
          <MarqueeRow items={firstRow} speed={40} />
        </motion.div>
        
        <motion.div style={{ x: translateXReverse }} className="w-full mt-6 md:mt-8">
          <MarqueeRow items={secondRow} speed={45} reverse={true} />
        </motion.div>
        
        <motion.div style={{ x: translateX }} className="w-full mt-6 md:mt-8">
          <MarqueeRow items={thirdRow} speed={40} />
        </motion.div>
      </motion.div>
    </div>
  );
};

// ... il resto del codice (Header, MarqueeRow e ProductCard) rimane IDENTICO a prima ...

export const Header = () => {
  return (
    // Il contenitore mantiene il padding alto per permettere alle icone di scorrere da sotto
    <div className="max-w-7xl mx-auto pt-10 md:pt-40 pb-0 px-4 w-full">
    
      <div className="pointer-events-auto">
        
        {/* Contenitore della scritta + linea */}
        <div className="relative inline-block mb-4"> 
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl text-white font-bold tracking-tighter pr-4"
          >
            Skills
          </motion.h2>

          {/* La Linea Animata Sottostante */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            className="absolute -bottom-2 left-0 h-2 md:h-2 bg-gradient-to-r from-[#00b4ff] via-[#3b82f6] to-[#1010c2] rounded-full z-10"
          />
        </div>

        {/* Paragrafo descrittivo con una morbida comparsa ritardata */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-2xl text-base md:text-xl mt-4 text-neutral-400"
        >
        </motion.p>
        
      </div>
    </div>
  );
};

const MarqueeRow = ({
  items,
  reverse = false,
  // speed base: più è alto, più è lento. 15 è un'ottima velocità elegante.
  speed = 15, 
}: {
  items: any[];
  reverse?: boolean;
  speed?: number;
}) => {
  // 1. FORZA BRUTA: Creiamo un blocco gigantesco (12 copie dell'array!).
  // Con 6 icone * 12 copie = 72 icone. È largo più di 10.000 pixel. 
  // È fisicamente impossibile che il tuo schermo veda il "buco".
  const copies = 12;
  const baseBlock = Array(copies).fill(items).flat();

  return (
    // Il contenitore genitore nasconde tutto ciò che esce dallo schermo
    <div className="flex overflow-hidden w-full flex-nowrap">
      
      <motion.div
        // w-max è fondamentale: dice al div di essere largo quanto tutte le icone
        className="flex flex-nowrap w-max"
        // Spostiamo il nastro gigante esattamente a metà. 
        // Essendo composto da due "Metà" identiche, il salto indietro sarà invisibile.
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        // Moltiplichiamo la velocità per il numero di copie (15 * 12 = 180 secondi).
        // Questo mantiene le icone fluide e leggibili.
        transition={{ repeat: Infinity, ease: "linear", duration: speed * copies }}
      >
        
        {/* METÀ 1: L'ordine delle icone qui è esattamente quello del tuo array */}
        <div className="flex flex-nowrap items-center">
          {baseBlock.map((product, idx) => (
            <div key={`meta1-${product.title}-${idx}`} className="pr-6 md:pr-8 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* METÀ 2: Copia identica incollata dietro. 
            Quando la Metà 1 esce dallo schermo, la Metà 2 è già lì al suo posto. */}
        <div className="flex flex-nowrap items-center">
          {baseBlock.map((product, idx) => (
            <div key={`meta2-${product.title}-${idx}`} className="pr-6 md:pr-8 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <motion.div 
      // EFFETTO RIALZO: L'icona si alza di 20px in modo elastico
      whileHover={{ 
        y: -20, 
        scale: 1.05,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }}
      // Manteniamo le tue grandezze originali: h-40 w-40
      className="group/product h-24 w-24 md:h-40 md:w-40 relative shrink-0 cursor-pointer flex items-center justify-center"
    >
      
      {/* Contenitore dell'immagine con i tuoi padding originali */}
      <div className="h-full w-full p-4 md:p-6 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          // L'ombra drop-shadow appare solo all'hover per dare l'effetto di distacco dal fondo
          className="object-contain h-full w-full opacity-100 transition-all will-change-transform group-hover:drop-shadow-[0_30px_30px_rgba(255,255,255,0.12)]" 
        />
      </div>
      
    </motion.div>
  );
};