"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export function SideAccents() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20"
      >
        <div className="w-px h-16 bg-border" />
        <a href="https://github.com/Joephy527" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors"><GitHubIcon size={16} /></a>
        <a href="https://linkedin.com/in/yoseph-ephrem-joephy" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors"><LinkedInIcon size={16} /></a>
        <a href="mailto:yosephkifle15@gmail.com" className="text-muted hover:text-primary transition-colors"><Mail size={16} /></a>
        <div className="w-px h-16 bg-border" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20"
      >
        <div className="w-px h-16 bg-border" />
        <a href="mailto:yosephkifle15@gmail.com" className="text-muted text-[11px] tracking-widest [writing-mode:vertical-lr] rotate-180 hover:text-secondary transition-colors">
          yosephkifle15@gmail.com
        </a>
        <div className="w-px h-16 bg-border" />
      </motion.div>
    </>
  );
}
