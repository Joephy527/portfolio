import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/queries";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { BackToTop } from "@/components/blog/BackToTop";
import { BlogList } from "@/components/blog/BlogList";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="min-h-dvh relative">
      <ReadingProgress />
      <BackToTop />

      <div className="max-w-7xl mx-auto px-6 py-12 pb-28 flex gap-12">
        {/* Main content */}
        <article className="flex-1 max-w-2xl mx-auto min-w-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-secondary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags?.split(",").map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex px-2.5 py-0.5 rounded-full bg-subtle text-xs font-medium text-secondary"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-text text-[10px] font-bold">Y</div>
                  <span className="text-secondary font-medium">Yoseph Ephrem</span>
                </div>
                <span>·</span>
                {date && <time>{date}</time>}
                <span>·</span>
                <span>{readTime} min read</span>
              </div>

              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            <div className="mt-6 h-px bg-border" />
          </header>

          {/* Content */}
          <div className="prose max-w-none text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Bottom share */}
          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted">Enjoyed this post?</p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Author */}
          <AuthorCard />

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-semibold text-primary mb-4">More posts</h3>
              <BlogList posts={relatedPosts} />
            </div>
          )}
        </article>

        {/* Table of contents — desktop sidebar */}
        <TableOfContents />
      </div>
    </main>
  );
}
