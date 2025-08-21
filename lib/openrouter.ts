import OpenAI from "openai";

// OpenRouter configuration
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
    "X-Title": "NeuroChat - Multi-Model AI Chatbot",
  },
});

// Available models on OpenRouter
export const OPENROUTER_MODELS = {
  // OpenAI Models
  "gpt-4o": {
    name: "GPT-4o",
    provider: "openai",
    contextLength: 128000,
    pricing: { input: 0.0025, output: 0.01 },
  },
  "gpt-4o-mini": {
    name: "GPT-4o Mini",
    provider: "openai",
    contextLength: 128000,
    pricing: { input: 0.00015, output: 0.0006 },
  },
  "gpt-4-turbo": {
    name: "GPT-4 Turbo",
    provider: "openai",
    contextLength: 128000,
    pricing: { input: 0.01, output: 0.03 },
  },

  // Anthropic Models
  "claude-3-5-sonnet": {
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    contextLength: 200000,
    pricing: { input: 0.003, output: 0.015 },
  },
  "claude-3-opus": {
    name: "Claude 3 Opus",
    provider: "anthropic",
    contextLength: 200000,
    pricing: { input: 0.015, output: 0.075 },
  },
  "claude-3-haiku": {
    name: "Claude 3 Haiku",
    provider: "anthropic",
    contextLength: 200000,
    pricing: { input: 0.00025, output: 0.00125 },
  },

  // Google Models
  "gemini-2.0-flash": {
    name: "Gemini 2.0 Flash",
    provider: "google",
    contextLength: 1000000,
    pricing: { input: 0.000075, output: 0.0003 },
  },
  "gemini-2.0-pro": {
    name: "Gemini 2.0 Pro",
    provider: "google",
    contextLength: 1000000,
    pricing: { input: 0.000375, output: 0.0015 },
  },

  // Mistral Models
  "mistral-large-latest": {
    name: "Mistral Large",
    provider: "mistral",
    contextLength: 32768,
    pricing: { input: 0.0007, output: 0.0028 },
  },
  "mistral-medium-latest": {
    name: "Mistral Medium",
    provider: "mistral",
    contextLength: 32768,
    pricing: { input: 0.00014, output: 0.00042 },
  },

  // DeepSeek Models
  "deepseek-chat": {
    name: "DeepSeek Chat",
    provider: "deepseek",
    contextLength: 32768,
    pricing: { input: 0.00014, output: 0.00028 },
  },

  // Meta Models
  "llama-3.1-8b": {
    name: "Llama 3.1 8B",
    provider: "meta",
    contextLength: 8192,
    pricing: { input: 0.0000002, output: 0.0000002 },
  },
  "llama-3.1-70b": {
    name: "Llama 3.1 70B",
    provider: "meta",
    contextLength: 8192,
    pricing: { input: 0.0000007, output: 0.0000008 },
  },
};

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  content: string;
  model: string;
  provider: string;
  tokens: {
    input: number;
    output: number;
  };
  cost: number;
  latency: number;
}

export async function chatWithModel(
  model: string,
  messages: ChatMessage[],
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<ChatResponse> {
  const startTime = Date.now();

  try {
    const completion = await openrouter.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    });

    const endTime = Date.now();
    const latency = endTime - startTime;

    const response = completion.choices[0]?.message?.content || "";
    const usage = completion.usage;

    // Calculate cost based on model pricing
    const modelInfo =
      OPENROUTER_MODELS[model as keyof typeof OPENROUTER_MODELS];
    const inputCost = modelInfo
      ? (usage?.prompt_tokens || 0) * modelInfo.pricing.input
      : 0;
    const outputCost = modelInfo
      ? (usage?.completion_tokens || 0) * modelInfo.pricing.output
      : 0;
    const totalCost = inputCost + outputCost;

    return {
      content: response,
      model,
      provider: modelInfo?.provider || "unknown",
      tokens: {
        input: usage?.prompt_tokens || 0,
        output: usage?.completion_tokens || 0,
      },
      cost: totalCost,
      latency,
    };
  } catch (error) {
    console.error(`Error chatting with model ${model}:`, error);
    throw new Error(`Failed to get response from ${model}: ${error}`);
  }
}

export async function streamChatWithModel(
  model: string,
  messages: ChatMessage[],
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<ReadableStream> {
  try {
    const completion = await openrouter.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    });

    const encoder = new TextEncoder();

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });
  } catch (error) {
    console.error(`Error streaming with model ${model}:`, error);
    throw new Error(`Failed to stream response from ${model}: ${error}`);
  }
}

export function getAvailableModels() {
  return Object.entries(OPENROUTER_MODELS).map(([id, model]) => ({
    id,
    ...model,
  }));
}

export function getModelInfo(modelId: string) {
  return OPENROUTER_MODELS[modelId as keyof typeof OPENROUTER_MODELS];
}
