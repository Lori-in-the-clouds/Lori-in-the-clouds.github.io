"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface CanvasTextProps {
  text: string;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
  animationDuration?: number;
  lineWidth?: number;
  lineGap?: number;
  curveIntensity?: number;
  overlay?: boolean;
}

function resolveColor(color: string): string {
  if (color.startsWith("var(")) {
    const varName = color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return resolved || color;
  }
  return color;
}

export function CanvasText({
  text,
  className = "",
  // CAMBIA QUI: Forza il nero assoluto per non avere aloni grigi
  backgroundClassName = "bg-blue-600 dark:bg-blue-700", 
  // COLORI: Usiamo solo i tuoi blu più luminosi e il bianco per il contrasto
  colors = [
  "rgba(0, 153, 255, 1)",
  "rgba(0, 153, 255, 0.9)",
  "rgba(0, 153, 255, 0.8)",
  "rgba(0, 153, 255, 0.7)",
  "rgba(0, 153, 255, 0.6)",
  "rgba(0, 153, 255, 0.5)",
  "rgba(0, 153, 255, 0.4)",
  "rgba(0, 153, 255, 0.3)",
  "rgba(0, 153, 255, 0.2)",
  "rgba(0, 153, 255, 0.1)",
],
  animationDuration = 3, // Leggermente più veloce per dare energia
  lineWidth = 3,         // CAMBIA QUI: Linee molto più grosse (da 1.5 a 3)
  lineGap = 5,           // CAMBIA QUI: Linee più vicine per riempire il testo
  curveIntensity = 35,   // Curve più dolci per non distorcere troppo le lettere
  overlay = false,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [bgColor, setBgColor] = useState("#0a0a0a");
  const [resolvedColors, setResolvedColors] = useState<string[]>([]);

  const updateColors = useCallback(() => {
    if (bgRef.current) {
      const computed = window.getComputedStyle(bgRef.current);
      setBgColor(computed.backgroundColor);
    }
    const resolved = colors.map(resolveColor);
    setResolvedColors(resolved);
  }, [colors]);

  useEffect(() => {
    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [updateColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    if (!canvas || !textEl || resolvedColors.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const rect = textEl.getBoundingClientRect();
    const width = Math.ceil(rect.width) || 400;
    const height = Math.ceil(rect.height) || 200;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const numLines = Math.floor(height / lineGap) + 10;
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const phase = (elapsed / animationDuration) * Math.PI * 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < numLines; i++) {
        const y = i * lineGap;

        const curve1 = Math.sin(phase) * curveIntensity;
        const curve2 = Math.sin(phase + 0.5) * curveIntensity * 0.6;

        const colorIndex = i % resolvedColors.length;
        ctx.strokeStyle = resolvedColors[colorIndex];
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          width * 0.33,
          y + curve1,
          width * 0.66,
          y + curve2,
          width,
          y,
        );
        ctx.stroke();
      }

      textEl.style.backgroundImage = `url(${canvas.toDataURL()})`;
      textEl.style.backgroundSize = `${width}px ${height}px`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [
    bgColor,
    resolvedColors,
    animationDuration,
    lineWidth,
    lineGap,
    curveIntensity,
  ]);

  return (
    <span className={cn("relative inline", overlay && "absolute inset-0")}>
      <span
        ref={bgRef}
        className={cn(
          "pointer-events-none absolute h-0 w-0 opacity-0",
          backgroundClassName,
        )}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <span
        ref={textRef}
        className={cn(
          "bg-clip-text text-transparent",
          "px-3 pb-1",
          overlay ? "absolute inset-0" : "inline",
          className,
        )}
        style={{
          WebkitBackgroundClip: "text",
          width: "auto"
        }}
      >
        {text}
      </span>
    </span>
  );
}
