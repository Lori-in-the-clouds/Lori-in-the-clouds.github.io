"use client";
import React, { useState, useRef, useEffect, type ReactElement } from "react";
import { motion } from "framer-motion";

// --- INTERFACCE ---
interface Project {
  title: string;
  description: string;
  status: string;
  tech: string[];
  video?: string; // <-- Modificato da 'gif' a 'video'
  github?: string;
}

interface CardBodyProps {
  project: Project;
  setLock?: (val: boolean) => void;
}

export const ProjectsGrid = () => {
  const projects: Project[] = [
    {
      title: "SIDS Revelation",
      description: "A Computer Vision project focused on classification of SIDS-related visual patterns using Deep Learning architectures.",
      status: "Completed",
      video: "/projects_files/SIDS.mp4", // <-- Modificato in .mp4
      tech: ["TensorFlow", "Keras", "OpenCV", "Python"],
      github: "https://github.com/Lori-in-the-clouds/SIDS_revelation_project"
    },
    {
      title: "Black Hole Simulation",
      description: "An advanced physics simulation modeling light bending and the event horizon of a Schwarzschild black hole.",
      status: "Completed",
      video: "/projects_files/black_hole.mp4", // <-- Modificato in .mp4
      tech: ["C++", "OpenGL", "GLS","FFmpeg"],
      github: "https://github.com/Lori-in-the-clouds/Black_Hole_Simulation"
    },
    {
      title: "EdgeVine IoT",
      description: "An AI-powered IoT ecosystem for precision viticulture, utilizing edge computing and sensor networks.",
      status: "In Progress",
      video: "", // <-- Lasciato vuoto
      tech: ["C++","Python"],
      github: ""
    }
  ];

  // --- LOGICA CAROSELLO MOBILE (Invariata) ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollWidth <= clientWidth) return; 
    const index = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (projects.length - 1));
    setActiveIndex(index);
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].clientWidth;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].clientWidth;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto -mt-20 md:mt-0 pt-10 md:pt-40 pb-20 px-4 w-full relative z-10">
      
      {/* Titolo Allineato con gradiente aggiornato per coerenza col logo */}
      <div className="relative inline-block mb-12 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl text-white font-bold tracking-tighter pr-4"
        >
          Projects
        </motion.h2>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute -bottom-2 left-0 h-2 bg-gradient-to-r from-[#00b4ff] via-[#3b82f6] to-[#1010c2] rounded-full z-10"
        />
      </div>

      {/* CAROSELLO MOBILE / GRIGLIA DESKTOP */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="
          flex flex-nowrap overflow-x-auto gap-8 pb-4 px-2
          snap-x snap-mandatory scrollbar-hide
          md:grid md:grid-cols-3 md:gap-12 md:overflow-visible md:pb-0 md:px-0
          [perspective:900px] 
        "
      >
        {projects.map((project, idx) => (
          <div key={idx} className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center">
            <CardContainer>
              <CardBody project={project} />
            </CardContainer>
          </div>
        ))}
      </div>
      
      {/* --- CONTROLLI DI NAVIGAZIONE (Solo su Mobile) --- */}
      <div className="flex md:hidden items-center justify-center gap-6 mt-6">
        
        {/* Freccia Sinistra */}
        <button 
          onClick={scrollToPrev}
          disabled={activeIndex === 0}
          className={`w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 transition-all active:scale-95 ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
          aria-label="Progetto precedente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        {/* Pallini Indicatori */}
        <div className="flex items-center gap-2.5">
          {projects.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                activeIndex === i 
                  ? "w-7 bg-[#00b4ff]" 
                  : "w-2 bg-white/20"  
              }`} 
            />
          ))}
        </div>

        {/* Freccia Destra */}
        <button 
          onClick={scrollToNext}
          disabled={activeIndex === projects.length - 1}
          className={`w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 transition-all active:scale-95 ${activeIndex === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
          aria-label="Progetto successivo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>

      </div>
    </div>
  );
};

// --- CONTENITORE: LOGICA TILT POTENZIATA E PIÙ REATTIVA ---
const CardContainer = ({ children }: { children: ReactElement<CardBodyProps> }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isLocked) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    
    const activeTilt = yPct < 0 ? 1 : 0; 
    
    setRotateY(xPct * 50 * activeTilt); 
    setRotateX(-yPct * 50 * activeTilt);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); setIsLocked(false); }}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }} 
        style={{ transformStyle: "preserve-3d" }}
        className="w-full"
      >
        {React.cloneElement(children, { setLock: setIsLocked })}
      </motion.div>
    </div>
  );
};

// --- CORPO DELLA CARD: STRATI Z E OMBRE POTENZIATI ---
const CardBody = ({ project, setLock }: CardBodyProps) => {
  return (
    <div className="relative h-[600px] md:h-[650px] w-full rounded-[2.5rem] border border-white/[0.1] bg-neutral-900/60 backdrop-blur-2xl p-8 flex flex-col transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_50px_120px_-25px_rgba(59,130,246,0.35)] overflow-hidden">
      
      <div style={{ transformStyle: "preserve-3d" }} className="flex flex-col h-full pointer-events-none">
        
        <div 
          style={{ transform: "translateZ(120px)" }} 
          className={`text-[10px] font-black uppercase tracking-[0.25em] mb-6 px-4 py-1.5 rounded-full border w-fit ${
            project.status === "Completed" 
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" 
              : "border-amber-500/40 bg-amber-500/10 text-amber-400"
          }`}
        >
          {project.status}
        </div>

        <h3 style={{ transform: "translateZ(100px)" }} className="text-3xl font-bold text-white mb-4 drop-shadow-[0_15px_15px_rgba(0,0,0,0.7)] tracking-tighter leading-tight">
          {project.title}
        </h3>

        <div style={{ transform: "translateZ(80px)" }} className="w-full h-40 md:h-48 rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-neutral-800">
          {/* --- MODIFICA QUI: Tag video ottimizzato al posto dell'img --- */}
          {project.video && (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover scale-110"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}
        </div>

        <p style={{ transform: "translateZ(60px)" }} className="text-neutral-300 text-sm leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="mt-auto flex flex-col gap-8 pointer-events-auto">
          <div style={{ transform: "translateZ(90px)" }} className="flex flex-wrap gap-2.5">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] font-bold font-mono text-blue-300 border border-blue-500/30 px-3 py-1 rounded-xl bg-blue-500/5">
                {t}
              </span>
            ))}
          </div>

          {project.github && (
            <div 
              onMouseEnter={() => setLock?.(true)} 
              onMouseLeave={() => setLock?.(false)}
              style={{ transform: "translateZ(140px)" }}
              className="relative group w-full h-14 overflow-hidden rounded-xl border border-white/20 bg-black cursor-pointer z-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                <div className="absolute left-0 top-0 h-full w-0 transition-all duration-500 group-hover:w-full bg-white z-0" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 group-hover:opacity-0 transition-opacity duration-300">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <div className="relative z-20 font-bold text-white group-hover:text-black transition-colors duration-500 pl-8 pointer-events-none">
                  View on GitHub
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};