import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get("timeRange") || "30d") as
      | "7d"
      | "30d"
      | "90d";
    const limit = parseInt(searchParams.get("limit") || "50");

    // Get all analytics data in parallel
    const [userStats, modelUsage, recentMessages] = await Promise.all([
      DatabaseService.getUserStats(timeRange),
      DatabaseService.getModelUsageStats(timeRange),
      DatabaseService.getRecentMessages(limit),
    ]);

    return NextResponse.json({
      userStats,
      modelUsage,
      recentMessages,
      timeRange,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analytics GET error:", error);

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
