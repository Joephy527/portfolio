import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";
import { db, blogPosts } from "@portfolio/db";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteButton } from "@/components/DeleteButton";

export default async function BlogsPage() {
  const isAuth = await verifyAuth();
  if (!isAuth) redirect("/login");

  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-zinc-900">Blog Posts</h1>
            <Link
              href="/blogs/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              <Plus size={16} />
              New Post
            </Link>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
            {posts.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50">
                    <th className="text-left px-4 py-3 font-medium text-zinc-500">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-zinc-500">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-zinc-500">Date</th>
                    <th className="text-right px-4 py-3 font-medium text-zinc-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-zinc-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-zinc-900">{post.title}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            post.published
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                      </td>
                      <td className="px-4 py-3 text-right space-x-3">
                        <Link
                          href={`/blogs/${post.id}`}
                          className="text-zinc-400 hover:text-zinc-900 transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton postId={post.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-zinc-400 p-6 text-center">No blog posts yet. Create your first one.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
