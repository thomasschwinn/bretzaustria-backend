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

  let { data: product, error } = await supabase
    .from("produkte")
    .select(
      `*, termslug(term_slug,Produktdatenblatt,autocad_Daten,Montageanleitung,term_name,textslogan_${locale},imgfirstrow)`
    )
    .eq("slug", slug);
  //console.log(product);

  try {
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(error);
  }
}
