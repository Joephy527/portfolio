"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, EyeOff } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string;
  published: boolean;
};

export function BlogEditor({ initialData }: { initialData?: BlogPost }) {
  const [post, setPost] = useState<BlogPost>(
    initialData || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      tags: "",
      published: false,
    }
  );
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(title: string) {
    setPost({
      ...post,
      title,
      slug: post.id ? post.slug : generateSlug(title),
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = post.id ? `/api/blogs/${post.id}` : "/api/blogs";
      const method = post.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push("/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
          placeholder="Post title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Slug</label>
        <input
          type="text"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent font-mono"
          placeholder="post-slug"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Excerpt</label>
        <input
          type="text"
          value={post.excerpt}
          onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
          placeholder="Short description of the post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
          placeholder="React, TypeScript, Web Dev"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-zinc-700">Content (Markdown)</label>
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            {preview ? <EyeOff size={14} /> : <Eye size={14} />}
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
        {preview ? (
          <div className="w-full min-h-[300px] p-4 rounded-lg border border-zinc-300 bg-white prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || "*Nothing to preview*"}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full min-h-[300px] px-4 py-3 rounded-lg border border-zinc-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-y"
            placeholder="Write your post in markdown..."
          />
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Post"}
        </button>
        <button
          onClick={() => setPost({ ...post, published: !post.published })}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
            post.published
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          {post.published ? "Published" : "Draft"}
        </button>
      </div>
    </div>
  );
}
