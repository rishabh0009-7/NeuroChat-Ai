"use client";

import {
  AI_PROVIDERS,
  DEFAULT_MODELS,
  type ChatMessage,
} from "@/lib/ai-providers";
import { ChatBubble } from "./chat-bubble";

interface ChatTabsProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatTabs({
  selectedModel,
  onModelSelect,
  messages,
  isLoading,
}: ChatTabsProps) {
  const getProviderForModel = (model: string) => {
    return AI_PROVIDERS.find((provider) => provider.models.includes(model));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Model tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
        {DEFAULT_MODELS.map((model) => {
          const provider = getProviderForModel(model);
          const isSelected = selectedModel === model;

          return (
            <button
              key={model}
              onClick={() => onModelSelect(model)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2",
                isSelected
                  ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              )}
            >
              <span className="text-lg">{provider?.icon}</span>
              <span className="hidden sm:inline">{provider?.name}</span>
              <span className="text-xs opacity-70">{model.split("-")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
              <p className="text-sm">Ask me anything and I'll help you out!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message}
              model={message.model || selectedModel}
              isLoading={isLoading && index === messages.length - 1}
            />
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
