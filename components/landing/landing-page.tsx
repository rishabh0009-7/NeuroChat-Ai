"use client";

import { useState } from "react";
import {
  Zap,
  Brain,
  BarChart3,
  Shield,
  Sparkles,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";
import { ChatInterface } from "../chat/chat-interface";

export function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <ChatInterface />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              NeuroChat
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Features
            </button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Pricing
            </button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              About
            </button>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 mb-8">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Compare AI Models in One Place
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            ⚡ Compare AI Models
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              in One Place
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the power of multiple AI models side by side. Chat with
            GPT-4, Claude, Gemini, and more, all in one beautiful interface.
            Compare responses, analyze performance, and choose the best AI for
            your needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setShowDemo(true)}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Try Demo
            </button>

            <button className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold rounded-xl transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                6+
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                AI Models
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Real-time
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Comparison
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Analytics
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Dashboard
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why Choose NeuroChat?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built for developers, researchers, and AI enthusiasts who want to
              explore and compare the latest AI models efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Multi-Model Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Access GPT-4, Claude, Gemini, Mistral, DeepSeek, and Llama
                models all in one place.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Performance Analytics
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track latency, cost, and usage patterns across all models with
                detailed analytics.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Enterprise Security
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Built on Supabase with enterprise-grade security,
                authentication, and data protection.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Beautiful UI/UX
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Modern, glassy interface with dark/light mode support and
                responsive design.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Real-time Streaming
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Experience AI responses in real-time with streaming technology
                and typing effects.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Vercel Ready
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Deploy instantly to Vercel with zero configuration and automatic
                scaling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Ready to Experience the Future of AI Chat?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Join thousands of users who are already comparing AI models with
            NeuroChat.
          </p>
          <button
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start Chatting Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              NeuroChat
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            © 2024 NeuroChat. Built with Next.js, Supabase, and TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
