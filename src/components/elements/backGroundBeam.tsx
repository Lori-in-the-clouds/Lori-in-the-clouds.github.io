"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CanvasText } from "@/components/ui/canvas-text";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export const ContactSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] as any 
      } 
    },
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden" 
        viewport={{ once: false, amount: 0.4 }} 
        className="max-w-4xl mx-auto p-4 relative z-10 text-center"
      >
        
        {/* Titolo Principale */}
        <motion.div variants={itemVariants} className="relative inline-block mb-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter pb-2">
            
            {/* La parte "Let's build" mantiene il suo colore sfumato bianco-grigio */}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
              Let&apos;s build <br /> 
            </span>

            {/* VERSIONE MOBILE: Testo semplice, colorato a tinta unita (nascosto su desktop) */}
            <span className="text-[#00b4ff] md:hidden">
              something together
            </span>

            {/* VERSIONE DESKTOP: Il CanvasText animato originale (nascosto su mobile) */}
            <span className="hidden md:inline-block px-2">
              <CanvasText 
                  text="something together" 
                  colors={[
                    "rgba(0, 153, 255, 1)", 
                    "rgba(0, 153, 255, 0.8)", 
                    "rgba(0, 153, 255, 0.6)", 
                    "rgba(0, 153, 255, 0.4)"
                  ]}
                  animationDuration={3}
                  curveIntensity={35}
                />
            </span>
          </h2>
        </motion.div>

        {/* Email e Social */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-10">
          <a 
            href="mailto:lorenzodimaio02@gmail.com" 
            className="text-2xl md:text-3xl text-white font-mono hover:text-[#00b4ff] transition-all duration-300 border-b border-neutral-800 hover:border-[#00b4ff] pb-2"
          >
            lorenzodimaio02@gmail.com
          </a>

          <div className="flex gap-12 relative z-10 mt-6">
            {/* LinkedIn */}
            <motion.a 
              whileHover={{ scale: 1.1, color: "#00b4ff" }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/lorenzo-di-maio-08557b22b/" 
              target="_blank" 
              className="group flex items-center gap-2 text-neutral-400 transition-colors duration-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-lg font-medium">LinkedIn</span>
            </motion.a>

            {/* GitHub */}
            <motion.a 
              whileHover={{ scale: 1.1, color: "#00b4ff" }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/Lori-in-the-clouds" 
              target="_blank" 
              className="group flex items-center gap-2 text-neutral-400 transition-colors duration-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-lg font-medium">GitHub</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <BackgroundBeams className="opacity-100" />
    </div>
  );
};