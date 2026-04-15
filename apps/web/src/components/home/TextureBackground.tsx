"use client";

import { useEffect, useRef } from "react";

export function TextureBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 10;
      const y = (clientY / innerHeight - 0.5) * 10;
      containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref={containerRef}
        className="absolute inset-[-40px] transition-transform duration-700 ease-out"
      >
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Accent dots at intersections */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0" cy="0" r="1.2" fill="#a1a1aa" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Radial fade — grid fades out towards edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, white 70%)",
        }}
      />

      {/* Extra edge fades for clean bleed */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-white opacity-60" />
    </div>
  );
}
