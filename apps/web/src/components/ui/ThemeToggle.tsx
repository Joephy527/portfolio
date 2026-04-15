"use client";

import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      className={`relative w-9 h-9 rounded-xl shadow-md flex items-center justify-center overflow-hidden cursor-pointer outline-none focus:outline-none focus-visible:outline-none active:outline-none select-none ${
        isDark
          ? "bg-[#1a2d45] border border-[#2a4060]"
          : "bg-[#fffbeb] border border-[#fde68a]"
      }`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.88, rotate: isDark ? -30 : 30 }}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="currentColor"
                className="text-blue-300"
              />
            </svg>
            {[
              { x: -6, y: -6, size: 1.5, delay: 0.2 },
              { x: 6, y: -4, size: 1, delay: 0.35 },
              { x: -3, y: 6, size: 1, delay: 0.5 },
            ].map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-200"
                style={{
                  width: star.size * 2,
                  height: star.size * 2,
                  top: `calc(50% + ${star.y}px)`,
                  left: `calc(50% + ${star.x}px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.6] }}
                transition={{
                  delay: star.delay,
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2 + i * 0.5,
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <motion.div
              className="w-3.5 h-3.5 rounded-full bg-amber-400"
              animate={{ boxShadow: ["0 0 4px rgba(250,204,21,0.3)", "0 0 10px rgba(250,204,21,0.5)", "0 0 4px rgba(250,204,21,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-amber-400 rounded-full"
                style={{
                  width: 1.5,
                  height: i % 2 === 0 ? 4 : 3,
                  top: "50%",
                  left: "50%",
                  transformOrigin: "center center",
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  x: Math.cos((i * Math.PI) / 4) * 10 - 0.75,
                  y: Math.sin((i * Math.PI) / 4) * 10 - (i % 2 === 0 ? 2 : 1.5),
                  rotate: i * 45,
                }}
                transition={{
                  delay: 0.1 + i * 0.03,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
