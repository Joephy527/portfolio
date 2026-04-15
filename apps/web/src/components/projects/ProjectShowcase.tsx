"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

const tagColors: Record<string, string> = {
  "Next.js": "bg-tag-bg text-tag-text",
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
  Go: "bg-cyan-100 text-cyan-700",
  Express: "bg-tag-bg text-tag-text",
  Firebase: "bg-amber-100 text-amber-700",
  Firestore: "bg-orange-100 text-orange-700",
  Gemini: "bg-violet-100 text-violet-700",
  Tailwind: "bg-sky-100 text-sky-700",
  OpenAI: "bg-emerald-100 text-emerald-700",
  Azure: "bg-blue-100 text-blue-700",
  "Frontier AI Models": "bg-violet-100 text-violet-700",
  Webhooks: "bg-tag-bg text-tag-text",
  WebSockets: "bg-pink-100 text-pink-700",
};

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden shadow-2xl shadow-black/10 transition-transform duration-300 ease-out will-change-transform"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const project = projects[active];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActive((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects.length]);

  return (
    <div className="flex h-full gap-8 lg:gap-12 items-center">
      {/* Left — Project list */}
      <div className="hidden md:flex flex-col gap-1 w-48 flex-shrink-0">
        {projects.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setActive(i)}
            className={`
              text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer
              ${i === active
                ? "bg-accent text-accent-text font-medium shadow-sm"
                : "text-muted hover:text-primary hover:bg-subtle"
              }
            `}
          >
            <span className="block truncate">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Center — Featured project */}
      <div className="flex-1 flex flex-col min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center"
          >
            {/* Image with 3D tilt */}
            <div className="w-full lg:w-[55%] aspect-[16/10] flex-shrink-0">
              <TiltImage src={project.image} alt={project.title} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-border transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-secondary leading-relaxed text-sm mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${tagColors[tag] || "bg-tag-bg text-tag-text"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile nav dots */}
              <div className="flex md:hidden gap-2 mt-6">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      i === active ? "bg-accent w-6" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Keyboard hint */}
        <div className="hidden lg:flex items-center gap-4 mt-8 text-xs text-muted">
          <span>Navigate with</span>
          <div className="flex gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-muted">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-muted">↓</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
