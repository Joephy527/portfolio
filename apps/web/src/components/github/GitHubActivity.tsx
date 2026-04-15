"use client";

import { motion } from "framer-motion";
import type { GitHubEvent } from "@/lib/github";

function formatEventType(type: string): string {
  const map: Record<string, string> = {
    PushEvent: "Pushed to",
    CreateEvent: "Created",
    WatchEvent: "Starred",
    ForkEvent: "Forked",
    PullRequestEvent: "Pull request on",
    IssuesEvent: "Issue on",
    IssueCommentEvent: "Commented on",
    DeleteEvent: "Deleted in",
    ReleaseEvent: "Released",
  };
  return map[type] || type;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function GitHubActivity({ events }: { events: GitHubEvent[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-xl border border-border bg-surface p-6"
    >
      <h3 className="text-sm font-medium text-secondary mb-4">Recent Public Activity</h3>
      <div className="space-y-3">
        {events.slice(0, 10).map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            className="flex items-center gap-3 text-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-secondary">{formatEventType(event.type)}</span>
            <span className="font-medium text-primary truncate">{event.repo.name}</span>
            <span className="text-xs text-muted ml-auto flex-shrink-0">
              {timeAgo(event.created_at)}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
