"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { TechOrbit } from "./TechOrbit";
import { BentoStats } from "./BentoStats";
import { CodeBlock } from "./CodeBlock";
import { MouseGlow } from "./MouseGlow";

export function Hero() {
  return (
    <div className="relative z-10 h-full">
      <MouseGlow />

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-full px-6 md:px-16 lg:px-32 xl:px-40 py-16 lg:py-0 gap-12 lg:gap-16">
        {/* Left — Text content */}
        <div className="flex-1 max-w-xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface backdrop-blur-sm text-secondary text-sm font-medium border border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <AnimatedText
            text="Yoseph Ephrem Kifle"
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary"
            delay={0.3}
          />

          {/* Title */}
          <AnimatedText
            text="Software Engineer"
            as="h2"
            className="mt-3 text-lg md:text-xl font-medium text-muted"
            delay={0.6}
          />

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 text-secondary leading-relaxed"
          >
            Full-stack engineer building production systems from San Francisco to Addis Ababa.
            I ship fast, optimize relentlessly, and thrive in cross-functional teams.
          </motion.p>

          {/* Bento stats */}
          <div className="mt-8">
            <BentoStats />
          </div>
        </div>

        {/* Right — Visual elements */}
        <div className="flex-1 flex flex-col items-center gap-8 max-w-md w-full">
          {/* Tech orbit */}
          <TechOrbit />

          {/* Code block */}
          <div className="w-full">
            <CodeBlock />
          </div>
        </div>
      </div>
    </div>
  );
}
