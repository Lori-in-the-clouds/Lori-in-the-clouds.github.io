// src/components/ui/Logo.tsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-4 group cursor-pointer", className)}>
      <div className="relative h-10 w-12">
        <svg
          viewBox="0 0 120 100"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Iniziale L - Animata con disegno del tracciato */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            d="M20 20 V80 H50"
            stroke="#00b4ff" // Blu elettrico coerente con la timeline
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Iniziale D - Stilizzata e "aperta" per un look tech */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            d="M60 20 V80 C90 80 105 65 105 50 C105 35 90 20 60 20Z"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dettaglio "Neural Link" - Tre punti che richiamano i dati */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
            cx="60" cy="50" r="4"
            fill="#00b4ff"
          />
        </svg>
      </div>

      {/* Nome a lato delle iniziali */}
      <div className="flex flex-col border-l border-white/10 pl-4">
        <span className="text-xl font-bold tracking-tighter text-white leading-none">
          LORENZO
        </span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-neutral-500 leading-none mt-1 group-hover:text-[#00b4ff] transition-colors">
          DI MAIO
        </span>
      </div>
    </div>
  );
};