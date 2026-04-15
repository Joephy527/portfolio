"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;

    await fetch(`/api/blogs/${postId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-zinc-400 hover:text-red-500 transition-colors"
    >
      Delete
    </button>
  );
}
