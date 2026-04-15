import { NextResponse } from "next/server";
import { db, pageViews } from "@portfolio/db";

export async function POST(request: Request) {
  try {
    const { page, referrer } = await request.json();

    await db.insert(pageViews).values({
      page,
      referrer: referrer || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track page view:", error);
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
