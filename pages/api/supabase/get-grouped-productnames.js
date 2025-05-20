import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  const termslug = req.query.termslug;

  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data, error } = await supabase
    .from("view_grouped_product_titles")
    .select()
    .order("title");

  //console.log(error);

  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(error);
  }
}
