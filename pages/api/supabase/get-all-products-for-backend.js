import { createClient } from "@supabase/supabase-js";

export default async function Handler(req, res) {
  let fields = req.query.fields;
  let term_slug = req.query.term_slug;
  if (!fields) {
    fields = "*";
  }
  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data: products, error } = await supabase
    .from("produkte")
    .select("title,slug, price, sale_price,stock_status,productimage, termslug")
    .eq("termslug", term_slug);

  //test
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(error);
  }
}
