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

  let { data: productcategorie, error } = await supabase
    .from("produkte")
    .select(
      `slug,title, price,sale_price,productimage,preisanhang,sale_verfuegbarkeit,lieferzeit,skizze:data->zeichnung_1___`
    )
    .eq("termslug", termslug)
    .eq("stock_status", "instock")
    .order("sale_price", { ascending: false })
    .order("order_sale_loop")
    .order("order_in_product_category_loop");
  //console.log(error);

  try {
    res.status(200).json(productcategorie);
  } catch (err) {
    res.status(500).json(error);
  }
}
