"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Code, Wrench } from "lucide-react";

type SectionItem = {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  bullets?: string[];
  tags?: string[];
};

type Section = {
  title: string;
  icon: React.ReactNode;
  items: SectionItem[];
};

const sections: Section[] = [
  {
    title: "Experience",
    icon: <Briefcase size={18} />,
    items: [
      {
        title: "Full-stack Developer",
        subtitle: "SDL Engineering (Bridgeline)",
        date: "Oct 2025 — Present",
        location: "San Francisco, CA",
        bullets: [
          "Normalized 100% of uploads (DOC/DOCX/XLS/XLSX → PDF) and enforced DocAI-only parsing, cutting parse errors by 25% and improving extraction accuracy by 10%.",
          "Re-ran executive summaries with applied carried costs and enabled multi-proposal uploads without data loss, reducing rework by 20% and supporting up to 6 vendor proposals per project.",
        ],
        tags: ["Python", "FastAPI", "GCP", "Docker"],
      },
      {
        title: "Backend Developer — AKIL",
        subtitle: "Africa to Silicon Valley",
        date: "Mar 2025 — Oct 2025",
        location: "Palo Alto, CA",
        bullets: [
          "Implemented Redis caching; cut API latency 3x and reduced DB load.",
          "Created and shipped a skills-interests matching algorithm in an agile environment, increasing opportunity relevance by 40%.",
          "Designed and launched an onboarding flow, capturing 500+ user data points in the first week to drive personalization.",
          "Owned full development cycle for backend services; partnered with PMs and clients to refine requirements; built and documented REST APIs.",
        ],
        tags: ["Python", "Redis", "PostgreSQL", "REST APIs"],
      },
      {
        title: "Frontend Developer — RateEat",
        subtitle: "Africa to Silicon Valley",
        date: "Aug 2024 — Mar 2025",
        location: "Palo Alto, CA",
        bullets: [
          "Architected a scalable web dashboard and business account system, leading to a 25% increase in business user registrations.",
          "Accelerated web app performance by 50% through server-side rendering, decreasing TTFB from 1.6s to 0.8s.",
          "Deployed a centralized logging and monitoring pipeline on GCP, reducing issue resolution time by 50%.",
          "Fostered an inclusive team via 70+ code reviews and 10+ walkthroughs.",
        ],
        tags: ["React", "Next.js", "GCP", "TypeScript"],
      },
      {
        title: "Full-stack Developer — AfroChat",
        subtitle: "Africa to Silicon Valley",
        date: "Mar 2024 — Jun 2024",
        location: "Palo Alto, CA",
        bullets: [
          "Drove the development of an AI-powered communication engine, guiding a team of engineers to serve 1,000+ users.",
          "Integrated secure OAuth 2.0 login system with role-based access control and encryption; added pytest suites.",
        ],
        tags: ["Python", "React", "OAuth 2.0", "pytest"],
      },
      {
        title: "Full-stack Developer — ESSS Learning",
        subtitle: "Ethiopian Space Science Society",
        date: "Aug 2023 — Feb 2024",
        location: "Addis Ababa, Ethiopia",
        bullets: [
          "Built a learning platform that reached 1,000+ students across Africa.",
        ],
        tags: ["React", "Node.js", "MongoDB"],
      },
    ],
  },
  {
    title: "Education",
    icon: <GraduationCap size={18} />,
    items: [
      {
        title: "Data Structures and Algorithms",
        subtitle: "Africa to Silicon Valley (A2SV)",
        date: "Feb 2024 — Jan 2025",
        bullets: [
          "1,000+ hours of rigorous training in Data Structures and Algorithms.",
        ],
      },
      {
        title: "Full-stack Software Engineer",
        subtitle: "ALX: Tech Academy, Holberton School",
        date: "Jun 2022 — Jul 2023",
        bullets: [
          "Completed a 12-month ALX Software Engineering Programme with a specialization in Frontend development.",
        ],
      },
    ],
  },
  {
    title: "Technical Skills",
    icon: <Code size={18} />,
    items: [
      {
        title: "Languages",
        subtitle: "Python, Go (Golang), JavaScript/TypeScript, C",
        date: "",
      },
      {
        title: "Backend",
        subtitle: "FastAPI, Node.js/Express, Gin, SQLAlchemy, REST APIs",
        date: "",
      },
      {
        title: "Frontend",
        subtitle: "React, Next.js, Redux Toolkit, Tanstack Query, Tailwind CSS",
        date: "",
      },
      {
        title: "Databases",
        subtitle: "PostgreSQL, MongoDB, MySQL, Redis",
        date: "",
      },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench size={18} />,
    items: [
      {
        title: "DevOps & Cloud",
        subtitle: "Docker, Google Cloud Platform, GitHub Actions, Linux/Unix",
        date: "",
      },
      {
        title: "Testing & CI/CD",
        subtitle: "Jest, pytest (unit/integration), test coverage, CI pipelines, monitoring/alerts (GCP)",
        date: "",
      },
      {
        title: "Other",
        subtitle: "Stripe, Webhooks, Postman, Jira",
        date: "",
      },
    ],
  },
];

export function ResumeContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const section = sections[activeIndex];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % sections.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 h-full">
      {/* Sidebar nav — desktop only */}
      <nav className="hidden lg:flex flex-col gap-1 w-44 flex-shrink-0">
        {sections.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActiveIndex(i)}
            className={`
              flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all duration-200 cursor-pointer
              ${i === activeIndex
                ? "bg-accent text-accent-text font-medium"
                : "text-muted hover:text-primary hover:bg-subtle"
              }
            `}
          >
            {s.icon}
            <span>{s.title}</span>
          </button>
        ))}
      </nav>

      {/* Mobile tabs — icons only */}
      <div className="flex lg:hidden gap-2 justify-center pb-2 flex-shrink-0">
        {sections.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActiveIndex(i)}
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg transition-all cursor-pointer
              ${i === activeIndex
                ? "bg-accent text-accent-text"
                : "text-muted bg-subtle"
              }
            `}
            title={s.title}
          >
            {s.icon}
          </button>
        ))}
      </div>

      {/* Content — scrolls on desktop, flows naturally on mobile */}
      <div className="flex-1 min-w-0 lg:overflow-y-auto scrollbar-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Section header */}
            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-muted">{section.icon}</span>
              <h2 className="text-lg font-semibold text-primary">{section.title}</h2>
              <div className="flex-1 h-px bg-border-subtle ml-2" />
            </div>

            {/* Items */}
            <div className="space-y-6 ml-1">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.title + item.subtitle}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIndex * 0.08, duration: 0.35 }}
                  className="relative pl-6 border-l-2 border-border-subtle"
                >
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-muted" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium text-primary">{item.title}</h3>
                      <p className="text-sm text-secondary">{item.subtitle}</p>
                      {item.location && (
                        <p className="text-xs text-muted mt-0.5">{item.location}</p>
                      )}
                    </div>
                    {item.date && (
                      <span className="text-xs text-muted whitespace-nowrap mt-1">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {item.bullets && (
                    <ul className="mt-2 space-y-1.5">
                      {item.bullets.map((bullet, bi) => (
                        <li key={bi} className="text-sm text-secondary leading-relaxed flex gap-2">
                          <span className="text-muted mt-1.5 flex-shrink-0">&#8226;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex px-2 py-0.5 rounded-md bg-tag-bg text-xs text-tag-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
