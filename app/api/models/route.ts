import { NextRequest, NextResponse } from "next/server";
import { getAvailableModels, getModelInfo } from "@/lib/openrouter";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get("id");

    if (modelId) {
      // Get specific model info
      const modelInfo = getModelInfo(modelId);
      if (!modelInfo) {
        return NextResponse.json({ error: "Model not found" }, { status: 404 });
      }
      return NextResponse.json({ model: { id: modelId, ...modelInfo } });
    }

    // Get all available models
    const models = getAvailableModels();

    return NextResponse.json({ models });
  } catch (error) {
    console.error("Models GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
