"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const ref = useRef(null);
  
  // Stato per gestire il rilevamento del mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    // PC: Inizia quando la sezione tocca il top ("start start")
    // Mobile: Inizia molto prima ("start 75%") per evitare il ritardo
    offset: isMobile ? ["start 75%", "end start"] : ["start start", "end start"],
  });

  // Configurazione della molla reattiva
  const springConfig = { stiffness: 400, damping: 40, bounce: 0, restDelta: 0.001 };

  // Trasformazioni sincronizzate allo scroll
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

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto pt-10 md:pt-40 pb-0 px-4 w-full">
      <div className="pointer-events-auto">
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
      </div>
    </div>
  );
};

const MarqueeRow = ({
  items,
  reverse = false,
  speed = 15, 
}: {
  items: any[];
  reverse?: boolean;
  speed?: number;
}) => {
  const copies = 12;
  const baseBlock = Array(copies).fill(items).flat();

  return (
    <div className="flex overflow-hidden w-full flex-nowrap">
      <motion.div
        className="flex flex-nowrap w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed * copies }}
      >
        <div className="flex flex-nowrap items-center">
          {baseBlock.map((product, idx) => (
            <div key={`meta1-${product.title}-${idx}`} className="pr-6 md:pr-8 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

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
      whileHover={{ y: -20, scale: 1.05 }}
      whileTap={{ scale: 0.95 }} // Feedback per il touch
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="group/product h-24 w-24 md:h-40 md:w-40 relative shrink-0 cursor-pointer flex items-center justify-center"
    >
      <div className="h-full w-full p-4 md:p-6 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain h-full w-full opacity-100 transition-all will-change-transform group-hover:drop-shadow-[0_30px_30px_rgba(255,255,255,0.12)]" 
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  );
};