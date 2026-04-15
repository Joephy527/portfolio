import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { getPublishedPosts } from "@/lib/queries";

export const metadata: Metadata = { title: "Blog | Yoseph Ephrem Kifle" };

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-dvh relative">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-12 pb-28">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-primary">Blog</h1>
          <p className="mt-2 text-secondary">Thoughts on code, design, and building things.</p>
        </div>

        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-muted text-center py-20">No posts yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}
