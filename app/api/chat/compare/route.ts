import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, models, message } = await request.json();

    if (!sessionId || !models || !message || !Array.isArray(models)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Implement actual multi-model comparison
    // For now, return mock responses for all models

    const mockResponses = models.map((model) => ({
      model,
      content: `This is a mock response from ${model} for comparison mode. 

The user asked: "${message}"

In the real implementation, this would:
1. Send the same prompt to multiple AI providers simultaneously
2. Stream responses from each model in parallel
3. Track performance metrics (latency, tokens, cost)
4. Allow side-by-side comparison of responses
5. Provide aggregated analytics

Model: ${model}
Response time: ${Math.floor(Math.random() * 2000 + 500)}ms
Tokens used: ${Math.floor(Math.random() * 200 + 50)}`,
      tokens: Math.floor(Math.random() * 200 + 50),
      latency: Math.floor(Math.random() * 2000 + 500),
      cost: Math.random() * 0.05,
    }));

    // Simulate streaming comparison responses
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        let modelIndex = 0;
        let wordIndex = 0;

        const sendNextChunk = () => {
          if (modelIndex < mockResponses.length) {
            const response = mockResponses[modelIndex];
            const words = response.content.split(" ");

            if (wordIndex < words.length) {
              const chunk = words[wordIndex] + " ";
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    model: response.model,
                    content: chunk,
                    tokens: response.tokens,
                    latency: response.latency,
                    cost: response.cost,
                  })}\n\n`
                )
              );
              wordIndex++;
              setTimeout(sendNextChunk, 50);
            } else {
              // Move to next model
              modelIndex++;
              wordIndex = 0;
              setTimeout(sendNextChunk, 100);
            }
          } else {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          }
        };

        sendNextChunk();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Compare API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
