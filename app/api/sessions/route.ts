import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const sessions = await DatabaseService.getUserSessions(limit);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Sessions GET error:", error);

    if (error instanceof Error && error.message.includes("not authenticated")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { mode, title } = await request.json();

    if (!mode || !["single", "compare"].includes(mode)) {
      return NextResponse.json(
        { error: "Invalid mode. Must be 'single' or 'compare'" },
        { status: 400 }
      );
    }

    const session = await DatabaseService.createSession({ mode, title });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("Sessions POST error:", error);

    if (error instanceof Error && error.message.includes("not authenticated")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
