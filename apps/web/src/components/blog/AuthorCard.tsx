"use client";

import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export function AuthorCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-16 p-6 rounded-2xl border border-border bg-card backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-text font-bold text-lg flex-shrink-0">
          Y
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary">Yoseph Ephrem Kifle</h3>
          <p className="text-sm text-secondary mt-0.5">
            Software Engineer building production systems. Based in Addis Ababa, Ethiopia.
          </p>
          <div className="flex gap-3 mt-3">
            <a
              href="https://github.com/Joephy527"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/yoseph-ephrem-joephy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              <LinkedInIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
