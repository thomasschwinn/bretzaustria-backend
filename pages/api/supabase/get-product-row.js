import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  const slug = req.query.slug;
  const locale = req.query.locale;
  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data: product, error: producterror } = await supabase
    .from("produkte")
    .select(
      `created_at, 
			title,
			slug,
			termslug,
			stock_status,
			_online_bestellbar,
			price,
			sale_price,
			preisanhang,
			sale_verfuegbarkeit,
			ausstellungsstueck,
			lieferzeit,
			infotab_vortext,
			infotext_de,
			infotab_Nachtext,
			infotab_vortext_en,
			infotext_en,
			infotab_Nachtext_en,
			infotab_vortext_fr,
			infotext_fr,
			infotab_Nachtext_fr,
			sizeVortext,
			sizeNachtext,
			sizeVortext_en,
			sizeNachtext,
			sizeVortext_fr,
			sizeNachtext_fr `
    )
    //.select("*")
    .eq("slug", slug);

  // let { data: product, error: sortedrowproducterror } = await supabase
  // 	.from("produkte")

  // 	.select("*")
  // 	.eq("slug", slug);

  let { data: termslugs, error: termslugserror } = await supabase
    .from("produktkategorien")
    .select(`term_slug`)
    .neq("order_product_page", null);
  let { data: _ausstellungsstueck, error: error_ausstellungsstueck } =
    await supabase.from("_ausstellungsstueck").select(`value`);
  let { data: _sale_verfuegbarkeit, error: error_sale_verfuegbarkeit } =
    await supabase.from("_sale_verfuegbarkeit").select(`value`);
  let { data: _stock_status, error: error_stock_status } = await supabase
    .from("_stock_status")
    .select(`value`);
  let { data: _preisanhang, error: error_preisanhang } = await supabase
    .from("_preisanhang")
    .select(`value`);

  //

  try {
    res.status(200).json({
      product: product,
      termslugs: termslugs,
      _ausstellungsstueck: _ausstellungsstueck,
      _sale_verfuegbarkeit: _sale_verfuegbarkeit,
      _preisanhang: _preisanhang,
      _stock_status: _stock_status,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: { product: producterror, termslugs: termslugserror } });
  }
}
