"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

const tagColors: Record<string, string> = {
  "Next.js": "bg-zinc-900 text-white",
  TypeScript: "bg-blue-100 text-blue-700",
  React: "bg-cyan-100 text-cyan-700",
  "Node.js": "bg-green-100 text-green-700",
  Python: "bg-yellow-100 text-yellow-700",
  PostgreSQL: "bg-indigo-100 text-indigo-700",
  MongoDB: "bg-emerald-100 text-emerald-700",
  Redis: "bg-red-100 text-red-700",
  Stripe: "bg-purple-100 text-purple-700",
  FastAPI: "bg-teal-100 text-teal-700",
  GCP: "bg-blue-100 text-blue-700",
  Docker: "bg-sky-100 text-sky-700",
  "REST APIs": "bg-orange-100 text-orange-700",
  "OAuth 2.0": "bg-amber-100 text-amber-700",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-sm overflow-hidden max-w-[320px] w-full mx-auto hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-36 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />

        {/* Muted overlay + link icon on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/50 transition-all duration-300 flex items-start justify-end p-3">
          <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
            <ExternalLink size={14} className="text-zinc-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${tagColors[tag] || "bg-zinc-100 text-zinc-600"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
