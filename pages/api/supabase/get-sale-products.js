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

  let { data: saleproducts, error } = await supabase
    .from("produkte")
    .select(
      `slug,title, price,sale_price,productimage,preisanhang,sale_verfuegbarkeit,lieferzeit`
    )
    .neq("sale_price", null)
    .eq("stock_status", "instock")

    .order("order_sale_loop");

  //console.log(error);

  try {
    res.status(200).json(saleproducts);
  } catch (err) {
    res.status(500).json(error);
  }
}
