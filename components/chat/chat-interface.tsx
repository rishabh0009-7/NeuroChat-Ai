"use client";

import { useState } from "react";
import { ChatTabs } from "./chat-tabs";
import { ChatGrid } from "./chat-grid";
import { ChatInput } from "./chat-input";
import { ChatSidebar } from "./chat-sidebar";
import {
  AI_PROVIDERS,
  DEFAULT_MODELS,
  type ChatMessage,
} from "@/lib/ai-providers";

export function ChatInterface() {
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODELS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // TODO: Implement actual API call
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: `This is a mock response from ${selectedModel}. In the real implementation, this would stream from the AI provider.`,
        model: selectedModel,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <ChatSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header with mode toggle */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            AI Chat
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("single")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                mode === "single"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              )}
            >
              Single Model
            </button>
            <button
              onClick={() => setMode("compare")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                mode === "compare"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              )}
            >
              Compare Models
            </button>
          </div>
        </div>

        {/* Chat content */}
        <div className="flex-1 overflow-hidden">
          {mode === "single" ? (
            <ChatTabs
              selectedModel={selectedModel}
              onModelSelect={setSelectedModel}
              messages={messages}
              isLoading={isLoading}
            />
          ) : (
            <ChatGrid
              models={DEFAULT_MODELS}
              messages={messages}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
