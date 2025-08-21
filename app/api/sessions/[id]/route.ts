import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await DatabaseService.getSession(params.id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session GET error:", error);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { mode, title } = await request.json();

    const updateData: any = {};
    if (mode && ["single", "compare"].includes(mode)) {
      updateData.mode = mode;
    }
    if (title !== undefined) {
      updateData.title = title;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    await DatabaseService.updateSession(params.id, updateData);

    return NextResponse.json({ message: "Session updated successfully" });
  } catch (error) {
    console.error("Session PUT error:", error);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DatabaseService.deleteSession(params.id);

    return NextResponse.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Session DELETE error:", error);

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
