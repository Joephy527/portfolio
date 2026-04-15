import { redirect, notFound } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";
import { BlogEditor } from "@/components/BlogEditor";
import { db, blogPosts } from "@portfolio/db";
import { eq } from "drizzle-orm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAuth = await verifyAuth();
  if (!isAuth) redirect("/login");

  const { id } = await params;

  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (posts.length === 0) notFound();

  const post = posts[0];

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-zinc-900 mb-6">Edit Post</h1>
          <BlogEditor
            initialData={{
              id: post.id,
              title: post.title,
              slug: post.slug,
              content: post.content,
              excerpt: post.excerpt,
              tags: post.tags,
              published: post.published ?? false,
            }}
          />
        </div>
      </main>
    </>
  );
}
