import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  const termslug = req.query.termslug;
  const locale = req.query.locale;
  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data: productcategorie, error } = await supabase
    .from("produktkategorien")
    .select(
      `headlinetitle_${locale}, 
                        text1title_${locale}, 
                        text1_${locale}, 
                        textslogan_${locale}, 
                        text2_${locale},
                        imgfirstrow,
                        thirdimage,
                        fourthimage,
                        fifthimage,
                        youtubeid, 
                        secondimage, 
                        sixthimage, 
                        Produktdatenblatt,
                        autocad_Daten,
                        Montageanleitung,
			blobbgimage`
    )
    .eq("term_slug", termslug);

  try {
    res.status(200).json(productcategorie);
  } catch (err) {
    res.status(500).json(error);
  }
}
