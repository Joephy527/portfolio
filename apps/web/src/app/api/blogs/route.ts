import { NextResponse } from "next/server";
import { db, blogPosts } from "@portfolio/db";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(blogPosts.createdAt);

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
