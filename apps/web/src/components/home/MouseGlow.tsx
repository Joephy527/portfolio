"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

export function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradient =
    theme === "dark"
      ? "radial-gradient(circle, rgba(56,130,220,0.08) 0%, rgba(30,80,140,0.05) 30%, transparent 70%)"
      : "radial-gradient(circle, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.03) 30%, transparent 70%)";

  return (
    <div
      className="fixed pointer-events-none z-0 transition-all duration-500 ease-out"
      style={{
        left: pos.x - 300,
        top: pos.y - 300,
        width: 600,
        height: 600,
        background: gradient,
        borderRadius: "50%",
      }}
    />
  );
}
