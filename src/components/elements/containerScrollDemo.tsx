"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";

// Importiamo le icone che avevamo selezionato
import { 
  SiPython, SiCplusplus, SiPytorch, SiTensorflow, SiScikitlearn, 
  SiOpencv, SiDocker, SiGit, SiLinux, SiPostgresql 
} from "react-icons/si";
import { TbMathFunction } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { motion } from "motion/react";


export function SkillsSection() {
  return (
    <div className="flex flex-col bg-black">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Sviluppo Soluzioni AI con <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
                Il Mio Tech Stack
              </span>
            </h1>
          </>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 h-full ">
          
          {skillsData.map((skill) => (
  <motion.div
    key={skill.id}
    // RIALZO ISTANTANEO
    whileHover={{ 
      y: -35, 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 600, // Molto più rigida = più veloce
        damping: 25,    // Evita rimbalzi eccessivi ma mantiene la velocità
        mass: 0.5       // Più leggero = parte prima
      } 
    }}
    whileTap={{ scale: 0.95 }}
    
    // RIMOSSO "transition-all" per evitare conflitti
    className="group relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer shadow-xl border border-white/10"
    style={{ 
      backgroundColor: skill.color,
      transformStyle: "preserve-3d",
    }}
  >
    {/* ICONA MULTICOLORE */}
    <div className="text-5xl mb-4 relative z-10 drop-shadow-lg">
      {skill.icon}
    </div>

    {/* NOME SKILL */}
    <p className="text-black/80 font-bold text-xs uppercase tracking-widest relative z-10">
      {skill.name}
    </p>

    {/* OMBRA DINAMICA VELOCE */}
    <motion.div 
      variants={{
        hover: { 
          opacity: 1, 
          bottom: -45, 
          scale: 1.2,
          transition: { type: "spring", stiffness: 600, damping: 25 } 
        }
      }}
      initial={{ opacity: 0, bottom: -10, scale: 1 }}
      whileHover="hover"
      className="absolute inset-x-4 h-6 bg-black/70 blur-2xl pointer-events-none" 
    />
  </motion.div>
))}
        </div>
      </ContainerScroll>
    </div>
  );
}

const skillsData = [
  { id: "python", name: "Python", icon: <SiPython />, color: "#3776AB" },
  { id: "pytorch", name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
  { id: "tf", name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
  { id: "cpp", name: "C++", icon: <SiCplusplus />, color: "#00599C" },
  { id: "aws", name: "AWS", icon: <FaAws />, color: "#FF9900" },
  { id: "docker", name: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { id: "linux", name: "Linux", icon: <SiLinux />, color: "#FCC624" },
  { id: "sql", name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
  { id: "scikit", name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F7931E" },
  { id: "cv", name: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8" },
  { id: "math", name: "Math/DS", icon: <TbMathFunction />, color: "#D04A02" },
  { id: "git", name: "Git", icon: <SiGit />, color: "#F05032" },
];