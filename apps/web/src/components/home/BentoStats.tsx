"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function useCountUp(target: number, duration: number = 1500, delay: number = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) {
          ref.current = requestAnimationFrame(tick);
        }
      }
      ref.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration, delay]);

  return count;
}

const stats = [
  { label: "Companies", value: 5, suffix: "+", delay: 200 },
  { label: "Users Served", value: 2000, suffix: "+", delay: 400 },
  { label: "API Speedup", value: 3, suffix: "x", delay: 600 },
  { label: "Projects Shipped", value: 6, suffix: "+", delay: 800 },
];

export function BentoStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const count = useCountUp(stat.value, 1500, stat.delay);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
      className="p-4 rounded-xl border border-border bg-card backdrop-blur-sm"
    >
      <div className="text-2xl font-bold text-primary tabular-nums">
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-xs text-muted mt-1">{stat.label}</div>
    </motion.div>
  );
}
