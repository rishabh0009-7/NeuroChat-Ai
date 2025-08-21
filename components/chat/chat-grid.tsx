"use client";

import { AI_PROVIDERS, type ChatMessage } from "@/lib/ai-providers";
import { ChatBubble } from "./chat-bubble";

interface ChatGridProps {
  models: string[];
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatGrid({ models, messages, isLoading }: ChatGridProps) {
  const getProviderForModel = (model: string) => {
    return AI_PROVIDERS.find((provider) => provider.models.includes(model));
  };

  // Group messages by model for comparison view
  const messagesByModel = models.reduce((acc, model) => {
    acc[model] = messages.filter(
      (msg) => msg.role === "user" || msg.model === model
    );
    return acc;
  }, {} as Record<string, ChatMessage[]>);

  return (
    <div className="h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        {models.map((model) => {
          const provider = getProviderForModel(model);
          const modelMessages = messagesByModel[model];

          return (
            <div
              key={model}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col"
            >
              {/* Model header */}
              <div
                className={cn(
                  "p-3 border-b border-slate-200 dark:border-slate-700 rounded-t-xl",
                  provider?.color.replace("bg-", "bg-") + "/10"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{provider?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                      {provider?.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {model}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {modelMessages.length === 0 ? (
                  <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                    <div className="text-2xl mb-2">{provider?.icon}</div>
                    <p className="text-sm">No messages yet</p>
                  </div>
                ) : (
                  modelMessages.map((message, index) => (
                    <ChatBubble
                      key={index}
                      message={message}
                      model={model}
                      isLoading={
                        isLoading && index === modelMessages.length - 1
                      }
                      compact
                    />
                  ))
                )}

                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-xs">Thinking...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
