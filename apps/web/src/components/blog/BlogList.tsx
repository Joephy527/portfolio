"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string;
  createdAt: Date | number | null;
};

export function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-4">
      {posts.map((post, i) => {
        const date = post.createdAt
          ? new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "";

        return (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block p-4 md:p-5 rounded-2xl border border-border hover:border-border bg-surface hover:shadow-sm transition-all duration-200 overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-primary group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-secondary line-clamp-2">{post.excerpt}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {date && <time className="text-xs text-muted mr-1">{date}</time>}
                    {post.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex px-2 py-0.5 rounded-md bg-tag-bg text-xs text-tag-text"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-muted group-hover:text-secondary group-hover:translate-x-1 transition-all duration-200 mt-1 flex-shrink-0"
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
