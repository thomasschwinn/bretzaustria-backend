import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";
import { scrapDataFromForm } from "../../../src/lib/scrapDataFromForm";
import { JSDOM } from "jsdom";

export default async function Handler(req, res) {
  const url_de = req.query.url_de;
  const url_en = req.query.url_en;
  const url_fr = req.query.url_fr;
  const querySelector = req.query.querySelector;
  const innerHTML = req.query.innerHTML;
  //console.log(req.query);

  // //console.log(produktnummer);
  const obj = await getinfotext(
    url_de,
    url_en,
    url_fr,
    querySelector,
    innerHTML
  );
  // const obj_en = await getinfotext("en", termslug, produktnummer);
  // const obj_fr = await getinfotext("fr", termslug, produktnummer);
  // //console.log(obj_de);
  // //console.log(produktnummer);
  // // fetch data from bretz.de

  // const obj = {
  // 	infotext_de: obj_de.infotext,
  // 	infotext_en: obj_en.infotext,
  // 	infotext_fr: obj_fr.infotext,
  // 	slogan_de: obj_de.slogan,
  // 	slogan_en: obj_en.slogan,
  // 	slogan_fr: obj_fr.slogan,
  // 	bgimage: obj_de.bgimage,
  // };
  // //console.log(obj);

  // //console.log(infotext);

  // // redúce the array to a number configured in environment variables

  // // end

  // // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // // const supabase = createClient(supabaseUrl, supabaseKey,{
  //auth: { persistSession: false },
  //});

  // const { data: dataresult, error: errorresult } = await supabase
  // 	.from("produkte")
  // 	.update(obj)
  // 	.eq("termslug", termslug);

  // console.log(error);
  // console.log(data);

  res.status(200).json(obj);
}

async function getinfotext(url_de, url_en, url_fr, querySelector, innerHTML) {
  const htmlSelector = innerHTML ? "innerHTML" : "outerHTML";
  const document_de = await scrapDataFromForm(url_de);
  const document_en = await scrapDataFromForm(url_en);
  const document_fr = await scrapDataFromForm(url_fr);
  const infotext_de = document_de.querySelector(querySelector)[htmlSelector];
  const infotext_en = document_en.querySelector(querySelector)[htmlSelector];
  const infotext_fr = document_fr.querySelector(querySelector)[htmlSelector];
  //console.log(infotext_de);

  const obj = {
    infotext_de: infotext_de,
    infotext_en: infotext_en,
    infotext_fr: infotext_fr,
  };
  //console.log(obj);
  return obj;
}
