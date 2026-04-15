import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";
import { BlogEditor } from "@/components/BlogEditor";

export default async function NewBlogPage() {
  const isAuth = await verifyAuth();
  if (!isAuth) redirect("/login");

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold text-zinc-900 mb-6">New Blog Post</h1>
          <BlogEditor />
        </div>
      </main>
    </>
  );
}
