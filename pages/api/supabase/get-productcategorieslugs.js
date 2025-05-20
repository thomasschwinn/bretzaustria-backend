import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data: productcategorie, error } = await supabase
    .from("produktkategorien")
    .select("term_slug")
    .neq("order_product_page", null)
    .order("term_slug", { ascending: true });

  try {
    res.status(200).json(productcategorie);
  } catch (err) {
    res.status(500).json(error);
  }
}
