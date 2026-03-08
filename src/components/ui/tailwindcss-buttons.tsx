import React from "react";
import { cn } from "../../lib/utils"; 

interface MovingBorderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MovingBorderButton = ({ children, onClick, className }: MovingBorderButtonProps) => {
  
  const handleAction = (e: React.MouseEvent) => {
    // 1. Logica di scroll interna per "Get in Touch"
    if (typeof children === "string" && children.toLowerCase().includes("get in touch")) {
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // 2. Eseguiamo l'onClick se passato
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleAction}
      type="button"
      // z-index elevato per stare sopra Waves/Beams
      className={cn(
        "group relative z-[100] inline-flex h-11 items-center justify-center overflow-hidden rounded-full p-[1.5px] focus:outline-none transition-all active:scale-95 pointer-events-auto",
        "hover:shadow-[0_0_15px_rgba(0,180,255,0.35)]",
        className
      )}
    >
      {/* 1. IL CONTORNO ANIMATO (Quello che dà il colore ai bordi) */}
      <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#00b4ff_25%,#0f172a_50%,#00b4ff_75%,#0f172a_100%)]" />

      {/* 2. IL CORPO DEL TASTO (Lo sfondo bianco panna) */}
      <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#f8fafc] px-8 py-1 text-base font-bold backdrop-blur-3xl overflow-hidden">
        
        {/* LIVELLO 1: Testo Blu Notte iniziale */}
        <span className="relative z-20 text-[#0f172a] transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-10">
          {children}
        </span>
        
        {/* LIVELLO 2: Testo Nero + Freccia che entra all'hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 text-black opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          <span className="font-bold">{children}</span>
          <svg className="h-4 w-4 text-[#00b4ff]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </span>
    </button>
  );
};