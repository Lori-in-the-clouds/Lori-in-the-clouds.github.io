import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { 
  SiPython, SiCplusplus, SiPytorch, SiTensorflow, SiScikitlearn, 
  SiOpencv, SiDocker, SiGit, SiLinux, SiPostgresql 
} from "react-icons/si";
import { TbMathFunction } from "react-icons/tb";
import { FaAws } from "react-icons/fa";

const skillsData = [
  { id: "python", name: "Python", icon: <SiPython size={24} />, color: "#3776AB" },
  { id: "cpp", name: "C++", icon: <SiCplusplus size={24} />, color: "#00599C" },
  { id: "pytorch", name: "PyTorch", icon: <SiPytorch size={24} />, color: "#EE4C2C" },
  { id: "tf", name: "TensorFlow", icon: <SiTensorflow size={24} />, color: "#FF6F00" },
  { id: "scikit", name: "Scikit", icon: <SiScikitlearn size={24} />, color: "#F7931E" },
  { id: "cv", name: "OpenCV", icon: <SiOpencv size={24} />, color: "#5C3EE8" },
  { id: "aws", name: "AWS", icon: <FaAws size={24} />, color: "#FF9900" },
  { id: "docker", name: "Docker", icon: <SiDocker size={24} />, color: "#2496ED" },
  { id: "git", name: "Git", icon: <SiGit size={24} />, color: "#F05032" },
  { id: "linux", name: "Linux", icon: <SiLinux size={24} />, color: "#FCC624" },
  { id: "sql", name: "SQL", icon: <SiPostgresql size={24} />, color: "#4169E1" },
  { id: "matlab", name: "MATLAB", icon: <TbMathFunction size={24} />, color: "#D04A02" },
];

export const GravitySkills = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const bodiesRef = useRef<{ [key: number]: Matter.Body }>({});
  const elementsRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const cardWidth = 176;
  const cardHeight = 64;

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = engineRef.current;
    const { world } = engine;
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Pulizia iniziale per evitare duplicati in sviluppo
    Matter.World.clear(world, false);
    Matter.Engine.clear(engine);

    const floor = Matter.Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
    const wallLeft = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    const wallRight = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });
    Matter.World.add(world, [floor, wallLeft, wallRight]);

    const cols = width < 768 ? 2 : 4;
    const spacingX = (width - cols * cardWidth) / (cols + 1);
    const startY = 80;

    skillsData.forEach((skill, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = spacingX + col * (cardWidth + spacingX) + cardWidth / 2;
      const y = startY + row * (cardHeight + 40) + cardHeight / 2;

      const body = Matter.Bodies.rectangle(x, y, cardWidth, cardHeight, {
        isStatic: true,
        restitution: 0.5,
        friction: 0.1,
        chamfer: { radius: 16 },
      });

      bodiesRef.current[index] = body;
      Matter.World.add(world, body);
    });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const update = () => {
      skillsData.forEach((_, index) => {
        const body = bodiesRef.current[index];
        const el = elementsRef.current[index];
        if (body && el) {
          el.style.transform = `translate(${body.position.x - cardWidth / 2}px, ${body.position.y - cardHeight / 2}px) rotate(${body.angle}rad)`;
        }
      });
      requestAnimationFrame(update);
    };
    update();

    return () => {
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
    };
  }, []);

  // FUNZIONE DI RISVEGLIO MANUALE (Forzata)
  const wakeUp = (index: number) => {
    const body = bodiesRef.current[index];
    if (body && body.isStatic) {
      console.log(`Risveglio skill: ${skillsData[index].name}`); // Debug log
      Matter.Body.setStatic(body, false);
      // Applica una forza verso il basso per forzare la gravità
      Matter.Body.applyForce(body, body.position, { x: 0, y: 0.05 });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20 bg-black">
      <div 
        ref={sceneRef} 
        className="relative w-full h-[700px] border border-white/10 rounded-3xl overflow-hidden bg-neutral-900/20"
      >
        {skillsData.map((skill, index) => (
          <div
            key={skill.id}
            ref={(el) => { elementsRef.current[index] = el; }}
            // Usiamo onPointerOver per massima compatibilità (Mouse + Touch)
            onPointerOver={() => wakeUp(index)}
            onPointerDown={() => wakeUp(index)}
            className="absolute top-0 left-0 w-44 h-16 bg-black border border-white/20 rounded-2xl flex items-center gap-3 px-4 cursor-pointer z-50 shadow-xl touch-none"
            style={{ 
                willChange: "transform",
                boxShadow: `0 0 10px ${skill.color}33` 
            }}
          >
            <div style={{ color: skill.color }}>{skill.icon}</div>
            <span className="text-white font-medium text-sm select-none pointer-events-none">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};