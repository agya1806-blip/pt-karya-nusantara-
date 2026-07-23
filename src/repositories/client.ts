import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/database/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createServerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    db: { schema: "public" },
  });
}

export function createRouteHandlerClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: { headers: { "x-application-name": "karya-nusantara-cms" } },
  });
}
