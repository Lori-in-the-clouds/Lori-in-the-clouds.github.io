import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATI DELLE SKILL & ICONE ---
// Sostituisci i percorsi src con le icone reali nella tua cartella public/
const skillData = [
  // Input Layer
  { id: "python", name: "Python", icon: "/icons/python.svg", color: "#3776AB", x: 100, y: 150 },
  { id: "cpp", name: "C++", icon: "/icons/cpp.svg", color: "#00599C", x: 100, y: 350 },
  // Hidden Layer 1
  { id: "pytorch", name: "PyTorch", icon: "/icons/pytorch.svg", color: "#EE4C2C", x: 350, y: 100 },
  { id: "tf", name: "TensorFlow", icon: "/icons/tensorflow.svg", color: "#FF6F00", x: 350, y: 250 },
  { id: "scikit", name: "Sk-Learn", icon: "/icons/scikit.svg", color: "#F7931E", x: 350, y: 400 },
  // Hidden Layer 2 (Cyber/CV)
  { id: "cv", name: "Comp. Vision", icon: "/icons/opencv.svg", color: "#00FF00", x: 600, y: 150 },
  { id: "cyber", name: "Cybersecurity", icon: "/icons/cyber.svg", color: "#FF00FF", x: 600, y: 350 },
  // Output Layer (Molteplici, non convogliano in uno!)
  { id: "aieng", name: "AI Engineer", icon: "/icons/ai.svg", color: "#3b82f6", x: 850, y: 250 },
  { id: "mlops", name: "MLOps", icon: "/icons/mlops.svg", color: "#3b82f6", x: 850, y: 400 },
];

// Definizione delle connessioni (chi si collega a chi)
const connections = [
  { from: "python", to: "pytorch" }, { from: "python", to: "tf" }, { from: "python", to: "scikit" },
  { from: "cpp", to: "tf" }, { from: "cpp", to: "cv" },
  { from: "pytorch", to: "cv" }, { from: "tf", to: "cv" }, { from: "tf", to: "aieng" }, { from: "scikit", to: "aieng" },
  { from: "cv", to: "aieng" }, { from: "cyber", to: "aieng" }, { from: "pytorch", to: "mlops" },
];

export const SkillGraphPlayground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>(() => {
    // Inizializziamo le posizioni base
    return skillData.reduce((acc, skill) => {
      acc[skill.id] = { x: skill.x, y: skill.y };
      return acc;
    // --- MODIFICA QUESTA RIGA QUI SOTTO ---
    }, {} as { [key: string]: { x: number; y: number } }); 
  });

  // Funzione che aggiorna la posizione quando un nodo viene trascinato
  const updateNodePosition = (id: string, info: any) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setNodePositions((prev) => ({
      ...prev,
      // Calcoliamo la posizione relativa al container
      [id]: {
        x: info.point.x - containerRect.left,
        y: info.point.y - containerRect.top,
      },
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 relative overflow-visible">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          Skill-Playground Neural Architecture
        </h2>
        <p className="text-neutral-400">
          Grab, drag, and interact with my dynamic technical synapses.
        </p>
      </div>

      {/* Area del Playground */}
      <div 
        ref={containerRef}
        className="relative w-full h-[600px] border-2 border-dashed border-blue-500/20 rounded-3xl bg-neutral-950 overflow-hidden cursor-crosshair shadow-[0_0_30px_rgba(59,130,246,0.1)]"
      >
        
        {/* --- LAYER 1: SVG per le connessioni dinamiche --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {connections.map((conn, idx) => {
            const start = nodePositions[conn.from];
            const end = nodePositions[conn.to];
            if (!start || !end) return null;
            return (
              <motion.line
                key={`${conn.from}-${conn.to}-${idx}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#3b82f6" // Blu neon
                strokeWidth="1.5"
                strokeOpacity="0.4"
                className="animate-pulse" // Impulso sinaptico
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            );
          })}
        </svg>

        {/* --- LAYER 2: I Nodi (I Neuroni) --- */}
        {skillData.map((skill) => (
          <motion.div
            key={skill.id}
            drag // ABILITA IL DRAG TOTALMENTE
            dragConstraints={containerRef} // Non farli uscire dall'area
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDrag={(event, info) => updateNodePosition(skill.id, info)} // Aggiorna le linee in tempo reale
            initial={{ x: skill.x, y: skill.y }}
            whileHover={{ scale: 1.1, cursor: "grabbing" }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 30px rgba(59,130,246,0.8)" }}
            className="absolute flex items-center gap-3 bg-black border-2 border-blue-500 rounded-full px-5 py-3 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm group select-none transition-colors hover:border-blue-300 hover:bg-blue-950/40"
            style={{ 
              x: nodePositions[skill.id].x - 60, // Centriamo il nodo sulla coordinata
              y: nodePositions[skill.id].y - 25,
              zIndex: 10
            }}
          >
            {/* --- SPAZIO PER ICONA --- */}
            {/* Sostituisci questo div con: <img src={skill.icon} alt={skill.name} class="w-6 h-6 object-contain" /> */}
            <div className="w-6 h-6 rounded-full border border-neutral-700" style={{ backgroundColor: skill.color }} />
            
            <span className="font-semibold text-sm md:text-base">{skill.name}</span>

            {/* Effetto bagliore (Glow) neon al passaggio del mouse */}
            <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity -z-10" />
          </motion.div>
        ))}
        
      </div>
    </div>
  );
};