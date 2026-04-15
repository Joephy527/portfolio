"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { text: "const developer = {", color: "text-zinc-400" },
  { text: '  name: "Yoseph Ephrem Kifle",', color: "text-emerald-400" },
  { text: '  role: "Software Engineer",', color: "text-emerald-400" },
  { text: "  stack: [", color: "text-zinc-400" },
  { text: '    "Python", "Go", "TypeScript",', color: "text-amber-400" },
  { text: '    "React", "Next.js", "FastAPI",', color: "text-amber-400" },
  { text: '    "Node.js", "Express"', color: "text-amber-400" },
  { text: "  ],", color: "text-zinc-400" },
  { text: '  focus: "Building at scale",', color: "text-sky-400" },
  { text: '  status: "Open to opportunities"', color: "text-violet-400" },
  { text: "};", color: "text-zinc-400" },
];

export function CodeBlock() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);

  // Delay start until component is visible
  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (currentLine >= codeLines.length) return;

    const line = codeLines[currentLine].text;

    if (currentChar < line.length) {
      const speed = 18 + Math.random() * 12;
      const timeout = setTimeout(() => setCurrentChar((c) => c + 1), speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [started, currentLine, currentChar]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="rounded-xl border border-border bg-zinc-950 overflow-hidden shadow-lg"
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-800">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 text-[10px] text-zinc-500 font-mono">about.ts</span>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-xs leading-6">
        {codeLines.map((line, i) => {
          if (i > currentLine) return (
            <div key={i} className="invisible">
              <span className="text-zinc-600 select-none mr-4">
                {String(i + 1).padStart(2, " ")}
              </span>
              <span>{line.text}</span>
            </div>
          );

          const displayText =
            i < currentLine
              ? line.text
              : line.text.slice(0, currentChar);

          return (
            <div key={i}>
              <span className="text-zinc-600 select-none mr-4">
                {String(i + 1).padStart(2, " ")}
              </span>
              <span className={line.color}>{displayText}</span>
              {i === currentLine && currentLine < codeLines.length && (
                <span className="inline-block w-[6px] h-3.5 bg-zinc-400 ml-px translate-y-[2px] animate-pulse" />
              )}
            </div>
          );
        })}

        {/* Final empty line with cursor — space always reserved */}
        <div className={currentLine >= codeLines.length ? "" : "invisible"}>
          <span className="text-zinc-600 select-none mr-4">
            {String(codeLines.length + 1).padStart(2, " ")}
          </span>
          <span className="inline-block w-[6px] h-3.5 bg-zinc-400 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
