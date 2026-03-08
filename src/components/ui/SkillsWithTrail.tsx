import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Importiamo le icone ufficiali (Si = Simple Icons)
import { 
  SiPython, 
  SiCplusplus, 
  SiPytorch, 
  SiTensorflow, 
  SiScikitlearn, 
  SiOpencv, 
  SiDocker, 
  SiGit, 
  SiLinux, 
  SiPostgresql 
} from "react-icons/si";
import { TbMathFunction } from "react-icons/tb"; // Un'icona matematica per MATLAB

// Sostituiamo le emoji con i componenti React delle icone
const skillsData = [
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
  { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
  { name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F7931E" },
  { name: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8" },
  { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { name: "Git", icon: <SiGit />, color: "#F05032" },
  { name: "Linux", icon: <SiLinux />, color: "#FCC624" },
  { name: "SQL", icon: <SiPostgresql />, color: "#4169E1" },
  { name: "MATLAB", icon: <TbMathFunction />, color: "#D04A02" },
];

const particleColors = ["#3b82f6", "#60a5fa", "#8b5cf6", "#1e3a8a"];

export const SkillsWithTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallenSkills, setFallenSkills] = useState<string[]>([]);

  const handleFall = (skillName: string) => {
    if (!fallenSkills.includes(skillName)) {
      setFallenSkills((prev) => [...prev, skillName]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const particle = document.createElement("div");
    const size = Math.random() * 8 + 4; 
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    
    particle.style.position = "absolute";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none"; 
    particle.style.boxShadow = `0 0 10px ${color}`;
    particle.style.zIndex = "0";

    container.appendChild(particle);

    const destinationX = x + (Math.random() - 0.5) * 50;
    const destinationY = y + 50 + Math.random() * 50; 

    const animation = particle.animate(
      [
        { transform: `translate(-50%, -50%) scale(1)`, opacity: 0.8 },
        { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
      ],
      { duration: 800 + Math.random() * 400, easing: "cubic-bezier(0, .9, .57, 1)" }
    );

    animation.onfinish = () => { particle.remove(); };
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-6xl mx-auto px-4 py-24 overflow-hidden">
      <div className="text-center mb-20 relative z-10 pointer-events-none">
        <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2">Explore My</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Practical Skills</h3>
        <p className="text-neutral-500 text-sm">(Try clicking on them 😉)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10 max-w-4xl mx-auto">
        {skillsData.map((skill, index) => {
          const isFallen = fallenSkills.includes(skill.name);

          return (
            <motion.div
              key={skill.name}
              onClick={() => handleFall(skill.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={isFallen ? { y: 800, rotate: (Math.random() * 90) - 45, opacity: 0 } : { opacity: 1, y: 0, rotate: 0 }}
              whileHover={isFallen ? {} : { scale: 1.1, y: -5 }}
              whileTap={isFallen ? {} : { scale: 0.95 }}
              transition={isFallen ? { duration: 0.8, ease: "easeIn" } : { duration: 0.4, delay: index * 0.05 }}
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl transition-colors ${isFallen ? "cursor-default" : "cursor-pointer hover:bg-white/5"} group`}
            >
              {/* Qui applichiamo il colore specifico della tecnologia all'icona */}
              <span 
                className="text-3xl transition-all group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </span>
              <span className="text-lg font-semibold text-neutral-300 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};