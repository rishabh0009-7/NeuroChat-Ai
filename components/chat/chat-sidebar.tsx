"use client";

import { useState } from "react";
import { Plus, MessageSquare, Settings, Crown, Moon, Sun } from "lucide-react";

interface ChatSidebarProps {
  // TODO: Add props for sessions and user data
}

export function ChatSidebar({}: ChatSidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentSessions] = useState([
    {
      id: "1",
      title: "Project Planning",
      lastMessage: "Let's discuss the roadmap...",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Code Review",
      lastMessage: "Can you review this function?",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      title: "Research Help",
      lastMessage: "I need information about...",
      timestamp: "3 days ago",
    },
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement actual theme toggle
  };

  return (
    <div className="w-80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          NeuroChat
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          AI-powered conversations
        </p>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          New Chat
        </button>
      </div>

      {/* Recent Sessions */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Recent Sessions
          </h3>

          <div className="space-y-2">
            {recentSessions.map((session) => (
              <button
                key={session.id}
                className="w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                      {session.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {session.lastMessage}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {session.timestamp}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Settings */}
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        {/* Upgrade Plan */}
        <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all transform hover:scale-105">
          <Crown className="w-5 h-5" />
          <span className="text-sm font-medium">Upgrade Plan</span>
        </button>
      </div>
    </div>
  );
}
