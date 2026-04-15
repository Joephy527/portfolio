"use client";

import { motion } from "framer-motion";
import type { ContributionWeek } from "@/lib/github";

const levelColors: Record<string, string> = {
  NONE: "bg-subtle",
  FIRST_QUARTILE: "bg-emerald-200",
  SECOND_QUARTILE: "bg-emerald-300",
  THIRD_QUARTILE: "bg-emerald-500",
  FOURTH_QUARTILE: "bg-emerald-700",
};

export function ContributionGraph({
  weeks,
  totalContributions,
}: {
  weeks: ContributionWeek[];
  totalContributions: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="rounded-xl border border-border bg-surface backdrop-blur-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondary">Contribution Activity</h3>
        <span className="text-sm text-muted">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="flex gap-[3px] overflow-x-auto">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] text-xs text-muted mr-1 flex-shrink-0">
          <span className="h-[13px]" />
          <span className="h-[13px] leading-[13px]">Mon</span>
          <span className="h-[13px]" />
          <span className="h-[13px] leading-[13px]">Wed</span>
          <span className="h-[13px]" />
          <span className="h-[13px] leading-[13px]">Fri</span>
          <span className="h-[13px]" />
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: weekIndex * 0.005 + dayIndex * 0.01,
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className={`w-[13px] h-[13px] rounded-sm ${levelColors[day.contributionLevel] || "bg-subtle"}`}
                title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3 text-xs text-muted">
        <span>Less</span>
        {Object.values(levelColors).map((color, i) => (
          <div key={i} className={`w-[13px] h-[13px] rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  );
}
