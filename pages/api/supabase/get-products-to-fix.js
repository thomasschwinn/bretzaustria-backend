import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // const { data, error } = await supabase
  // 	.from("produkte")
  // 	.update({
  // 		slogan_de: `<h3 class="av-special-heading-tag" itemprop="headline"><p></p>
  //                 <p>Th<span class="bre-ft-kftsr">e</span>re<br>
  //                 are <span class="bre-ft-kftsr">n</span>e<span class="bre-ft-kftsr">v</span>er<br>
  //                 <span class="bre-ft-kftsr">en</span>ou<span class="bre-ft-kftsr">g</span>h</p>
  //                 <p></p></h3>`,
  // 		slogan_en: `<h3 class="av-special-heading-tag" itemprop="headline"><p></p>
  //                 <p>Th<span class="bre-ft-kftsr">e</span>re<br>
  //                 are <span class="bre-ft-kftsr">n</span>e<span class="bre-ft-kftsr">v</span>er<br>
  //                 <span class="bre-ft-kftsr">en</span>ou<span class="bre-ft-kftsr">g</span>h</p>
  //                 <p></p></h3>`,
  // 		slogan_fr: `<h3 class="av-special-heading-tag" itemprop="headline"><p></p>
  //                 <p>Th<span class="bre-ft-kftsr">e</span>re<br>
  //                 are <span class="bre-ft-kftsr">n</span>e<span class="bre-ft-kftsr">v</span>er<br>
  //                 <span class="bre-ft-kftsr">en</span>ou<span class="bre-ft-kftsr">g</span>h</p>
  //                 <p></p></h3>`,
  // 	})
  // 	.eq("termslug", "kissen")
  // 	.select();

  let { data, error } = await supabase
    .from("produkte")
    .select("slug, termslug")
    .or(
      "infotext_de.is.null,infotext_en.is.null,infotext_fr.is.null,slogan_de.is.null,slogan_en.is.null,slogan_fr.is.null"
    );

  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(error);
  }
}
