import { NextResponse } from "next/server";
import { db, blogPosts } from "@portfolio/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const post = await db
      .insert(blogPosts)
      .values({
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        tags: body.tags,
        published: body.published || false,
      })
      .returning();

    return NextResponse.json(post[0], { status: 201 });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
