import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://umwgqlsbzxfpbimlmorc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtd2dxbHNienhmcGJpbWxtb3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NzAxMDUsImV4cCI6MjAzOTI0NjEwNX0.ku6Hb8B0ebQfrW7tEwzYtEChcJt3O3qdrvO6k2nTgXw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
