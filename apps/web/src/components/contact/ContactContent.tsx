"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Clock, Zap, MessageCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { useEffect, useState } from "react";

const contactLinks = [
  {
    label: "Email",
    value: "yosephkifle15@gmail.com",
    href: "mailto:yosephkifle15@gmail.com",
    icon: <Mail size={20} />,
  },
  {
    label: "GitHub",
    value: "@Joephy527",
    href: "https://github.com/Joephy527",
    icon: <GitHubIcon size={20} />,
  },
  {
    label: "LinkedIn",
    value: "Yoseph Ephrem Kifle",
    href: "https://linkedin.com/in/yoseph-ephrem-joephy",
    icon: <LinkedInIcon size={20} />,
  },
];

const quickFacts = [
  {
    icon: <Zap size={16} />,
    label: "Response Time",
    value: "Within 24 hours",
  },
  {
    icon: <MessageCircle size={16} />,
    label: "Preferred",
    value: "Email or LinkedIn",
  },
  {
    icon: <MapPin size={16} />,
    label: "Based in",
    value: "Addis Ababa, Ethiopia",
  },
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Addis_Ababa",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums">{time || "--:--"}</span>
  );
}

export function ContactContent() {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-0">
      {/* Left — Text + quick facts */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
        >
          Let&apos;s work<br />together.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 text-secondary leading-relaxed max-w-md"
        >
          Have a project in mind or just want to say hello?
          I&apos;m always open to new opportunities and interesting conversations.
        </motion.p>

        {/* Live timezone widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card backdrop-blur-sm"
        >
          <Clock size={16} className="text-muted" />
          <div className="text-sm">
            <span className="text-muted">Local time — </span>
            <span className="font-medium text-primary">
              <LiveClock />
            </span>
            <span className="text-muted"> (EAT, UTC+3)</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Quick facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 space-y-3"
        >
          {quickFacts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3 text-sm">
              <span className="text-muted">{fact.icon}</span>
              <span className="text-muted">{fact.label}</span>
              <span className="text-primary font-medium">{fact.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — Contact links */}
      <div>
        <div className="space-y-3">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card backdrop-blur-sm hover:border-border hover:shadow-md transition-all group"
            >
              <span className="text-muted group-hover:text-secondary transition-colors">
                {link.icon}
              </span>
              <div className="flex-1">
                <div className="text-xs text-muted uppercase tracking-wider">{link.label}</div>
                <div className="text-sm font-medium text-primary mt-0.5">{link.value}</div>
              </div>
              <ArrowUpRight size={16} className="text-muted group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="mailto:yosephkifle15@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-accent-text text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          <Mail size={16} />
          Send me an email
        </motion.a>

        {/* Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center text-xs text-muted"
        >
          Currently open to full-time roles & freelance projects
        </motion.p>
      </div>
    </div>
  );
}
