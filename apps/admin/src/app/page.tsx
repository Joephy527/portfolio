import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";
import { db, blogPosts, pageViews } from "@portfolio/db";
import { count, desc, sql } from "drizzle-orm";

export default async function DashboardPage() {
  const isAuth = await verifyAuth();
  if (!isAuth) redirect("/login");

  const [totalViews] = await db.select({ count: count() }).from(pageViews);
  const [totalPosts] = await db.select({ count: count() }).from(blogPosts);

  const recentViews = await db
    .select()
    .from(pageViews)
    .orderBy(desc(pageViews.createdAt))
    .limit(20);

  const topPages = await db
    .select({ page: pageViews.page, views: count() })
    .from(pageViews)
    .groupBy(pageViews.page)
    .orderBy(sql`count(*) desc`)
    .limit(10);

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl">
          <h1 className="text-2xl font-bold text-zinc-900 mb-6">Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-zinc-200 bg-white">
              <div className="text-sm text-zinc-500">Total Page Views</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{totalViews.count}</div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 bg-white">
              <div className="text-sm text-zinc-500">Blog Posts</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{totalPosts.count}</div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 bg-white">
              <div className="text-sm text-zinc-500">Recent Views (shown)</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1">{recentViews.length}</div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-8">
            <h2 className="text-sm font-medium text-zinc-500 mb-4">Top Pages</h2>
            {topPages.length > 0 ? (
              <div className="space-y-2">
                {topPages.map((p) => (
                  <div key={p.page} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-700 font-mono">{p.page}</span>
                    <span className="text-zinc-400">{p.views} views</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">No page views yet.</p>
            )}
          </div>

          {/* Recent Views */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="text-sm font-medium text-zinc-500 mb-4">Recent Page Views</h2>
            {recentViews.length > 0 ? (
              <div className="space-y-2">
                {recentViews.map((v) => (
                  <div key={v.id} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-700 font-mono">{v.page}</span>
                    <span className="text-zinc-400">
                      {v.createdAt ? new Date(v.createdAt).toLocaleString() : ""}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">No views yet. Visit your portfolio to start tracking.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
