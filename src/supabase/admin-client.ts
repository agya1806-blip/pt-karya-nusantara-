import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/database/types";
import supabaseConfig from "./config";

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdminClient() {
  if (adminClient) return adminClient;

  if (!supabaseConfig.serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. This client should only be used in secure server contexts."
    );
  }

  adminClient = createClient<Database>(
    supabaseConfig.url,
    supabaseConfig.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return adminClient;
}
