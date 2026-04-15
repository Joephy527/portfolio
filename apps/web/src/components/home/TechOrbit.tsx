"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const techs = [
  { name: "Python", color: "#3572A5" },
  { name: "Go", color: "#00ADD8" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "FastAPI", color: "#009688" },
  { name: "Docker", color: "#2496ED" },
  { name: "Redis", color: "#DC382D" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "GCP", color: "#4285F4" },
  { name: "Node.js", color: "#339933" },
  { name: "Express", color: "#000000" },
  { name: "Tailwind", color: "#06B6D4" },
];

const RADIUS = 155;
const SPEED = 0.0003; // radians per ms

export function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const frozenRotation = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Continuous rotation when not hovering
  useAnimationFrame((_, delta) => {
    if (!isHovering) {
      setRotation((prev) => {
        const next = prev + delta * SPEED;
        frozenRotation.current = next;
        return next;
      });
    }
  });

  function handleMouseEnter() {
    frozenRotation.current = rotation;
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  const currentRotation = isHovering ? frozenRotation.current : rotation;

  return (
    <div
      ref={containerRef}
      className="relative w-[380px] h-[380px] mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted"
        animate={isHovering
          ? { width: 8, height: 8, opacity: 1 }
          : { width: [8, 14, 8], height: [8, 14, 8], opacity: [0.4, 0.8, 0.4] }
        }
        transition={isHovering
          ? { duration: 0.3 }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Orbit ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle"
        style={{ width: RADIUS * 2 + 10, height: RADIUS * 2 + 10 }}
      />

      {/* Tech pills */}
      {techs.map((tech, i) => {
        const baseAngle = (i / techs.length) * Math.PI * 2 - Math.PI / 2;
        const angle = baseAngle + currentRotation;
        const baseX = Math.cos(angle) * RADIUS;
        const baseY = Math.sin(angle) * RADIUS;

        // Magnetic pull toward cursor
        const dx = mouse.x - baseX;
        const dy = mouse.y - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 200) * 20;
        const pullX = dist > 0 ? (dx / dist) * pull : 0;
        const pullY = dist > 0 ? (dy / dist) * pull : 0;

        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={mounted ? {
              opacity: 1,
              scale: 1,
            } : { opacity: 0, scale: 0 }}
            transition={{
              opacity: { delay: i * 0.08, duration: 0.4 },
              scale: { delay: i * 0.08, duration: 0.4, type: "spring", stiffness: 200, damping: 15 },
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              x: baseX + pullX,
              y: baseY + pullY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            whileHover={{ scale: 1.15, zIndex: 10 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-border shadow-sm cursor-default whitespace-nowrap"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-[11px] font-medium text-secondary">
              {tech.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
