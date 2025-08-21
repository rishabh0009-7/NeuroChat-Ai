"use client";

import { AI_PROVIDERS, type ChatMessage } from "@/lib/ai-providers";
import { formatDate } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatMessage;
  model: string;
  isLoading?: boolean;
  compact?: boolean;
}

export function ChatBubble({
  message,
  model,
  isLoading,
  compact,
}: ChatBubbleProps) {
  const provider = AI_PROVIDERS.find((p) => p.models.includes(model));
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className={cn(
            "max-w-[80%] rounded-2xl px-4 py-2.5",
            "bg-blue-500 text-white",
            compact ? "text-sm" : "text-base"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div className="text-xs opacity-70 mt-1 text-right">
            {formatDate(message.timestamp)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
          provider?.color + " text-white"
        )}
      >
        {provider?.icon}
      </div>

      <div className="flex-1">
        <div
          className={cn(
            "bg-white dark:bg-slate-700 rounded-2xl px-4 py-2.5 border border-slate-200 dark:border-slate-600",
            compact ? "text-sm" : "text-base"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {provider?.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {model}
            </span>
          </div>

          <div className="text-slate-800 dark:text-slate-200">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-pulse bg-slate-300 dark:bg-slate-600 h-4 w-4 rounded-full"></div>
                <div className="animate-pulse bg-slate-300 dark:bg-slate-600 h-4 w-2 rounded"></div>
                <div className="animate-pulse bg-slate-300 dark:bg-slate-600 h-4 w-3 rounded"></div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{formatDate(message.timestamp)}</span>

            {/* Feedback buttons */}
            {!isLoading && (
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors">
                  👍
                </button>
                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors">
                  👎
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
