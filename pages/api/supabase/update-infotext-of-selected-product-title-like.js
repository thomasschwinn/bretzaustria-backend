import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  const title = req.query.title;
  let infotext_de = req.query.infotext_de;
  let infotext_fr = req.query.infotext_fr;
  let infotext_en = req.query.infotext_en;
  //console.log(infotext_de);

  //console.log(req.query);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("produkte")
    .update({
      infotext_de: infotext_de,
      infotext_en: infotext_en,
      infotext_fr: infotext_fr,
    })
    .like("title", "%" + title + "%")
    .select();

  // created array of slug of the returned data
  let slugArr = [];
  data.map((row, i) => {
    slugArr.push(row.slug);
  });

  res.status(200).json({ data: data, error: error, slugs: slugArr });
}
