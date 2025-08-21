import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Session {
  id: string;
  started_at: string;
  user_id: string;
  mode: "single" | "compare";
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  model: string;
  role: "user" | "assistant";
  content: string;
  tokens_in: number;
  tokens_out: number;
  latency_ms: number;
  created_at: string;
}

export interface UsageLog {
  id: string;
  session_id: string;
  provider: string;
  model: string;
  tokens: number;
  cost: number;
  created_at: string;
}
