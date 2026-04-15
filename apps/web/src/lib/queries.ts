import { db, blogPosts } from "@portfolio/db";
import { eq, and, desc } from "drizzle-orm";

export async function getPublishedPosts() {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt));
}

export async function getPublishedPostBySlug(slug: string) {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
    .limit(1);

  return posts[0] || null;
}
