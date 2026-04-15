"use client";

import { motion } from "framer-motion";

export function StatsCard({
  label,
  value,
  index,
}: {
  label: string;
  value: string | number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-xl border border-border bg-surface p-5"
    >
      <div className="text-sm text-secondary">{label}</div>
      <div className="mt-1 text-2xl font-bold text-primary">{value}</div>
    </motion.div>
  );
}
