import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        avatarUrl: user.user_metadata?.avatar_url || null,
        role: user.role || "user",
        createdAt: user.created_at,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
