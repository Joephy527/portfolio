"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Briefcase,
  PenLine,
  MessageCircle,
  FolderOpen,
  FileText,
  Mail,
  ExternalLink,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { label: string; icon: React.ReactNode; href: string; description?: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <House size={18} />,
    href: "/",
  },
  {
    label: "Work",
    icon: <Briefcase size={18} />,
    submenu: [
      { label: "Projects", icon: <FolderOpen size={16} />, href: "/projects", description: "Things I've built" },
      { label: "GitHub", icon: <GitHubIcon size={16} />, href: "/github", description: "Open source activity" },
      { label: "Resume", icon: <FileText size={16} />, href: "/resume", description: "Experience & skills" },
    ],
  },
  {
    label: "Blog",
    icon: <PenLine size={18} />,
    href: "/blog",
  },
  {
    label: "Connect",
    icon: <MessageCircle size={18} />,
    submenu: [
      { label: "Contact", icon: <Mail size={16} />, href: "/contact", description: "Get in touch" },
      { label: "LinkedIn", icon: <LinkedInIcon size={16} />, href: "https://linkedin.com/in/yoseph-ephrem-joephy", description: "Professional network" },
      { label: "GitHub", icon: <GitHubIcon size={16} />, href: "https://github.com/Joephy527", description: "Code & contributions" },
    ],
  },
];

const spring = { type: "spring" as const, stiffness: 500, damping: 30 };

export function DynamicActionBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setActiveMenu(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) { if (e.key === "Escape") setActiveMenu(null); }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => { setActiveMenu(null); }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  function handleItemClick(item: NavItem) {
    if (item.href) { router.push(item.href); setActiveMenu(null); }
    else if (item.submenu) { setActiveMenu(activeMenu === item.label ? null : item.label); }
  }

  function isActive(item: NavItem): boolean {
    if (item.href) return pathname === item.href;
    if (item.submenu) return item.submenu.some((sub) => pathname === sub.href);
    return false;
  }

  const activeSubmenu = navItems.find((item) => item.label === activeMenu)?.submenu;

  return (
    <div ref={barRef} className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50">
      <motion.div layout transition={spring} className="bg-surface backdrop-blur-xl border-t border-border md:border md:rounded-2xl shadow-lg shadow-black/5 overflow-hidden md:w-auto">
        {/* Submenu */}
        <AnimatePresence mode="wait">
          {activeSubmenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ...spring, opacity: { duration: 0.15 } }}
              className="overflow-hidden"
            >
              <div className="p-3 pb-1 min-w-[280px]">
                {activeSubmenu.map((sub) => {
                  const isExternal = sub.href.startsWith("http");
                  return (
                    <motion.a
                      key={sub.label}
                      href={sub.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => { if (!isExternal) { e.preventDefault(); router.push(sub.href); setActiveMenu(null); } }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary hover:bg-[var(--nav-hover)] hover:text-primary transition-colors duration-200 group"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="flex-shrink-0 text-muted group-hover:text-primary transition-colors">{sub.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{sub.label}</div>
                        {sub.description && <div className="text-xs text-muted group-hover:text-secondary">{sub.description}</div>}
                      </div>
                      {isExternal && <ExternalLink size={12} className="text-muted" />}
                    </motion.a>
                  );
                })}
              </div>
              <div className="mx-3 mb-2 h-px bg-border" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-around md:justify-start md:gap-1 px-1 md:px-2 py-2">
          {navItems.map((item) => {
            const active = isActive(item);
            const isOpen = activeMenu === item.label;
            return (
              <motion.button
                key={item.label}
                onClick={() => handleItemClick(item)}
                className={`relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isOpen ? "bg-accent text-accent-text" : active ? "bg-[var(--nav-active)] text-primary" : "text-muted hover:text-primary hover:bg-[var(--nav-hover)]"
                }`}
                whileTap={{ scale: 0.95 }}
                transition={spring}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
