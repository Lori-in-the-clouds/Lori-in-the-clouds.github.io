"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// 1. Sottocomponente per il punto (Pallina)
const TimelinePoint = ({ 
  scrollYProgress, 
  containerRef 
}: { 
  scrollYProgress: any, 
  containerRef: React.RefObject<HTMLDivElement | null> 
}) => {
  const [isActive, setIsActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (!dotRef.current || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const dotRect = dotRef.current.getBoundingClientRect();
    const dotRelativePos = (dotRect.top - containerRect.top) / containerRect.height;
    
    if (latest >= dotRelativePos - 0.01) {
      if (!isActive) setIsActive(true);
    } else {
      if (isActive) setIsActive(false);
    }
  });

  return (
    <div ref={dotRef} className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#171717] border border-white/5 flex items-center justify-center z-50 shadow-2xl">
      <motion.div
        animate={{
          backgroundColor: isActive ? "#00b4ff" : "#262626",
          boxShadow: isActive ? "0px 0px 15px rgba(0, 180, 255, 0.6)" : "none",
          scale: isActive ? 1.25 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="h-4 w-4 rounded-full border border-white/10"
      />
    </div>
  );
};

// 2. Il motore della Timeline (Riceve i dati)
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <TimelinePoint scrollYProgress={scrollYProgress} containerRef={containerRef} />
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">{item.title}</h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div style={{ height: height + "px" }} className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-neutral-800">
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform, background: "linear-gradient(to bottom, #00b4ff, #1e90ff, #3b82f6, #1d4ed8, #1010c2)" }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full shadow-[0_0_10px_#00b4ff]"
          />
        </div>
      </div>
    </div>
  );
};

// 3. IL COMPONENTE DA IMPORTARE IN ASTRO (Con i tuoi dati inclusi)
export function TimelineDemo() {
  const data = [
    {
      title: "2016 - 2021",
      content: (
        <div>
          <p className="mb-2 text-xs font-bold tracking-widest text-blue-500 uppercase">[September 2016 – September 2021] | Modena, Italy</p>
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Scientific High School Diploma</h4>
          <p className="text-neutral-300 font-semibold text-base mb-2">Liceo Scientifico "Wiligelmo" di Modena</p>
        </div>
      ),
    },
    {
      title: "2021 - 2024",
      content: (
        <div>
          <p className="mb-2 text-xs font-bold tracking-widest text-blue-500 uppercase">[September 2021 – September 2024] | Modena, Italy</p>
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">BSc Computer Science Engineering</h4>
          <div className="mb-8 text-sm font-normal text-neutral-400">
            <p className="text-neutral-300 font-semibold text-base mb-2">University of Modena and Reggio Emilia</p>
            Mastering the fundamentals of software engineering, distributed systems, and hardware-software integration.
          </div>
          <img src="timeline/Unimore.jpg" alt="Unimore" className="h-44 w-full md:w-3/4 rounded-lg object-cover border border-white/10" />
        </div>
      ),
    },
    {
      title: "2026 - Present",
      content: (
        <div>
          <p className="mb-2 text-xs font-bold tracking-widest text-blue-500 uppercase">[January 2026 – Present] | Modena, Italy</p>
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">MSc Artificial Intelligence Engineering</h4>
          <div className="mb-8 text-sm font-normal text-neutral-400">
            <p className="text-neutral-300 font-semibold text-base mb-2">University of Modena and Reggio Emilia</p>
            Curriculum covers core areas such as Machine Learning, Deep Learning, and Computer Vision.
          </div>
          <img src="timeline/Unimore.jpg" alt="Unimore AI" className="h-44 w-full md:w-3/4 rounded-lg object-cover border border-white/10" />
        </div>
      ),
    }
  ];

  return (
    <>
      {/* Sezione Intestazione con Sottolineatura Animata */}
      <div className="max-w-7xl mx-auto pt-10 md:pt-40 pb-0 px-4 w-full">
        <div className="relative inline-block mb-12"> {/* Contenitore della scritta + linea */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl text-white font-bold tracking-tighter pr-4 pb-2"
          >
            Education
          </motion.h2>

          {/* La Linea Animata Sottostante - Coerente con Skills */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            // Stesso gradiente blu e altezza del titolo Skills
            className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-[#00b4ff] via-[#3b82f6] to-[#1010c2] rounded-full z-10"
          />
        </div>
      </div>

      {/* Il motore della Timeline con i tuoi dati */}
      <div className="relative w-full overflow-clip">
        <Timeline data={data} />
      </div>
    </>
  );
}