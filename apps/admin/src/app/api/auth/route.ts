import { NextResponse } from "next/server";
import { signIn, signOut } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const success = await signIn(email, password);

  if (success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function DELETE() {
  await signOut();
  return NextResponse.json({ success: true });
}
