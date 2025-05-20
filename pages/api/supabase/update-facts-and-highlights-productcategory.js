import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  const termslug = req.query.termslug;
  let infotext_de = req.query.infotext_de;
  let infotext_fr = req.query.infotext_fr;
  let infotext_en = req.query.infotext_en;

  //console.log(req.query);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("produktkategorien")
    .update({
      text2_de: infotext_de,
      text2_en: infotext_en,
      text2_fr: infotext_fr,
    })
    .eq("term_slug", termslug)
    .select();
  const revalidatetag = await fetch(
    `https://beta12345.bretz-austria.at/api/revalidatetag?tag=${termslug}`
  );
  const update_de = await fetch(
    `https://beta12345.bretz-austria.at/de/produktkategorie/${termslug}`
  );
  const update_en = await fetch(
    `https://beta12345.bretz-austria.at/en/produkt-kategorie/${termslug}`
  );
  const update_fr = await fetch(
    `https://beta12345.bretz-austria.at/fr/produkt-kategorie/${termslug}`
  );

  res.status(200).json({ data: data, error: error });
}
