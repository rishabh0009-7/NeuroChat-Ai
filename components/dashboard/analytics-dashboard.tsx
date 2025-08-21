"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Download,
  TrendingUp,
  MessageCircle,
  DollarSign,
  Clock,
  Users,
} from "lucide-react";
import { formatDate, formatLatency, formatCost } from "@/lib/utils";

// Mock data - replace with real data from Supabase
const mockStats = {
  totalMessages: 1247,
  totalCost: 23.45,
  activeSessions: 8,
  avgLatency: 1200,
};

const mockLatencyData = [
  { model: "GPT-4o", latency: 800, cost: 0.03 },
  { model: "Claude 3.5", latency: 1200, cost: 0.02 },
  { model: "Gemini 2.0", latency: 600, cost: 0.01 },
  { model: "Mistral Large", latency: 1500, cost: 0.015 },
  { model: "DeepSeek", latency: 900, cost: 0.025 },
  { model: "Llama 3.1", latency: 2000, cost: 0.005 },
];

const mockUsageData = [
  { date: "2024-01-01", messages: 45, cost: 0.89 },
  { date: "2024-01-02", messages: 67, cost: 1.23 },
  { date: "2024-01-03", messages: 89, cost: 1.67 },
  { date: "2024-01-04", messages: 123, cost: 2.34 },
  { date: "2024-01-05", messages: 156, cost: 2.89 },
  { date: "2024-01-06", messages: 98, cost: 1.78 },
  { date: "2024-01-07", messages: 134, cost: 2.45 },
];

const mockRecentMessages = [
  {
    id: "1",
    model: "GPT-4o",
    role: "user",
    content: "How do I implement authentication?",
    tokens: 12,
    cost: 0.0003,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    model: "Claude 3.5",
    role: "assistant",
    content: "Here are the steps to implement authentication...",
    tokens: 156,
    cost: 0.0021,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "3",
    model: "Gemini 2.0",
    role: "user",
    content: "Explain React hooks",
    tokens: 8,
    cost: 0.0001,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "4",
    model: "Mistral Large",
    role: "assistant",
    content: "React hooks are functions that allow you to...",
    tokens: 234,
    cost: 0.0035,
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: "5",
    model: "DeepSeek",
    role: "user",
    content: "Best practices for API design",
    tokens: 15,
    cost: 0.0004,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  const exportCSV = () => {
    // TODO: Implement CSV export
    console.log("Exporting CSV...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Monitor your AI chat usage, costs, and performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Messages
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {mockStats.totalMessages.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Cost
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  ${mockStats.totalCost.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Active Sessions
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {mockStats.activeSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Avg Latency
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatLatency(mockStats.avgLatency)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latency & Cost by Model */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Latency & Cost by Model
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockLatencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="latency"
                  fill="#8884d8"
                  name="Latency (ms)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="cost"
                  fill="#82ca9d"
                  name="Cost ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Usage Over Time */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Usage Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="messages"
                  stroke="#8884d8"
                  name="Messages"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="#82ca9d"
                  name="Cost ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Messages Table */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Messages
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Tokens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {mockRecentMessages.map((message) => (
                  <tr
                    key={message.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                      {message.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      <span
                        className={cn(
                          "px-2 py-1 text-xs rounded-full",
                          message.role === "user"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        )}
                      >
                        {message.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {message.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {message.tokens}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {formatCost(message.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(message.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
