import { SupabaseClient, createClient } from "@supabase/supabase-js";

const SupabaseProjectUrl: string = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SupabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const client: SupabaseClient = createClient(
  SupabaseProjectUrl,
  SupabaseAnonKey
)

export default client
