import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db";
import { chatWithModel, type ChatMessage } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, models, message } = await request.json();

    if (!sessionId || !models || !message || !Array.isArray(models)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or get session
    let session;
    if (sessionId === "new") {
      session = await DatabaseService.createSession({ mode: "compare" });
    } else {
      session = await DatabaseService.getSession(sessionId);
      if (!session) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }
    }

    // Save user message to database
    const userMessage = await DatabaseService.createMessage({
      sessionId: session.id,
      model: "multi-model",
      role: "user",
      content: message,
    });

    // Prepare messages for AI (include conversation history)
    const conversationHistory = await DatabaseService.getSessionMessages(
      session.id
    );
    const aiMessages: ChatMessage[] = conversationHistory.map((msg: any) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    // Add system message for context
    const systemMessage: ChatMessage = {
      role: "system",
      content:
        "You are a helpful AI assistant. Provide clear, accurate, and helpful responses.",
    };

    const messages = [systemMessage, ...aiMessages];

    // Get responses from all models in parallel
    const modelPromises = models.map(async (model) => {
      try {
        const response = await chatWithModel(model, messages);

        // Save assistant message to database
        await DatabaseService.createMessage({
          sessionId: session.id,
          model,
          role: "assistant",
          content: response.content,
          tokensIn: response.tokens.input,
          tokensOut: response.tokens.output,
          latencyMs: response.latency,
        });

        // Save usage log
        await DatabaseService.createUsageLog({
          sessionId: session.id,
          provider: response.provider,
          model: response.model,
          tokens: response.tokens.input + response.tokens.output,
          cost: response.cost,
        });

        return {
          model,
          content: response.content,
          provider: response.provider,
          tokens: response.tokens,
          cost: response.cost,
          latency: response.latency,
        };
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        return {
          model,
          content: `Error: Failed to get response from ${model}`,
          provider: "unknown",
          tokens: { input: 0, output: 0 },
          cost: 0,
          latency: 0,
          error: true,
        };
      }
    });

    const responses = await Promise.all(modelPromises);

    // Return structured comparison results
    return NextResponse.json({
      sessionId: session.id,
      responses,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Compare API error:", error);

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
