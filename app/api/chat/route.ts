import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db";
import { streamChatWithModel, type ChatMessage } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, model, message, mode = "single" } = await request.json();

    if (!sessionId || !model || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or get session
    let session;
    if (sessionId === "new") {
      session = await DatabaseService.createSession({ mode });
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
      model,
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

    // Get streaming response from OpenRouter
    const stream = await streamChatWithModel(model, messages);

    // Return streaming response
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

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
