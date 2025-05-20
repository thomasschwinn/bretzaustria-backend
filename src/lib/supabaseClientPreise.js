import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fpemnwfcasrpuiuwgqdg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZW1ud2ZjYXNycHVpdXdncWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3Mjg4OTIsImV4cCI6MjAxMTMwNDg5Mn0._56qU_AFBGC0iSOip1i6w1T0veadCvAYEtp3qaWZ3wQ";
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
//asdfasd
