"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React from "react";

export const Highlight = ({
  children,
  className,
  color = "rgba(0, 180, 255, 0.2)", // Colore di fallback (indigo-600)
  gradient,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  gradient?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
        // Se passi 'gradient' usa quello, altrimenti usa 'color'
        backgroundImage: gradient 
          ? gradient 
          : `linear-gradient(to right, ${color}, ${color})`,
      }}
      className={cn(
        "relative inline-block rounded-full px-1 pb-1 text-white",
        className
      )}
    >
      {children}
    </motion.span>
  );
};