export interface AIProvider {
  name: string;
  models: string[];
  color: string;
  icon: string;
}

export const AI_PROVIDERS: AIProvider[] = [
  {
    name: "OpenAI",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
    color: "bg-green-500",
    icon: "🤖",
  },
  {
    name: "Anthropic",
    models: ["claude-3-5-sonnet", "claude-3-opus", "claude-3-haiku"],
    color: "bg-purple-500",
    icon: "🧠",
  },
  {
    name: "Google",
    models: ["gemini-2.0-flash", "gemini-2.0-pro", "gemini-1.5-pro"],
    color: "bg-blue-500",
    icon: "🔍",
  },
  {
    name: "Mistral",
    models: [
      "mistral-large-latest",
      "mistral-medium-latest",
      "mistral-small-latest",
    ],
    color: "bg-orange-500",
    icon: "🌪️",
  },
  {
    name: "DeepSeek",
    models: ["deepseek-chat", "deepseek-coder"],
    color: "bg-teal-500",
    icon: "🔬",
  },
  {
    name: "Meta",
    models: ["llama-3.1-8b", "llama-3.1-70b", "llama-3.1-405b"],
    color: "bg-indigo-500",
    icon: "🦙",
  },
];

export const DEFAULT_MODELS = [
  "gpt-4o",
  "claude-3-5-sonnet",
  "gemini-2.0-flash",
  "mistral-large-latest",
  "deepseek-chat",
  "llama-3.1-8b",
];

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: Date;
}

export interface ChatResponse {
  content: string;
  model: string;
  tokens: number;
  latency: number;
}
