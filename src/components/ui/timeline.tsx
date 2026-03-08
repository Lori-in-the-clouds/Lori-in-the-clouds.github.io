"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Sottocomponente per il punto della Timeline
const TimelinePoint = ({ 
  scrollYProgress, 
  containerRef, // Passiamo il ref del contenitore principale
}: { 
  scrollYProgress: any, 
  containerRef: React.RefObject<HTMLDivElement>
}) => {
  const [isActive, setIsActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!dotRef.current || !containerRef.current) return;

    // Otteniamo la posizione del punto rispetto al contenitore della timeline
    const containerRect = containerRef.current.getBoundingClientRect();
    const dotRect = dotRef.current.getBoundingClientRect();
    
    // Calcoliamo la posizione relativa del punto (0 a 1) all'interno del contenitore
    const dotRelativePos = (dotRect.top - containerRect.top) / containerRect.height;
    
    // Attiviamo se il progresso dello scroll ha raggiunto o superato la posizione del punto
    const currentProgress = scrollYProgress.get();
    
    // Aggiungiamo un piccolo offset (0.02) per compensare lo spessore visivo della linea
    if (currentProgress >= dotRelativePos - 0.02) {
      if (!isActive) setIsActive(true);
    } else {
      if (isActive) setIsActive(false);
    }
  });

  return (
    <div 
      ref={dotRef}
      className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#171717] border border-white/5 flex items-center justify-center z-50 shadow-2xl"
    >
      <motion.div
        animate={{
          // Colore blu quando la striscia tocca il punto
          backgroundColor: isActive ? "#00b4ff" : "#262626",
          boxShadow: isActive ? "0px 0px 15px rgba(0, 180, 255, 0.6)" : "none",
          scale: isActive ? 1.2 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-4 w-4 rounded-full border border-white/10"
      />
    </div>
  );
};