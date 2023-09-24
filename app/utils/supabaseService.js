import { createClient } from "@supabase/supabase-js";

export const supabaseRole = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_S_ROLE
);
