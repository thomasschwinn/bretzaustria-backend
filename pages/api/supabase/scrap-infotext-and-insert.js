import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";
import { scrapData } from "../../../src/lib/scrapData";
import { JSDOM } from "jsdom";

export default async function Handler(req, res) {
  const termslug = req.query.termslug;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data, error } = await supabase
    .from("produktkategorien")
    .select("product_to_scrap_infotext")
    .eq("term_slug", termslug);

  // const produktnummer = 4;
  const produktnummer = data[0].product_to_scrap_infotext * 1;
  //console.log(produktnummer);
  const obj_de = await getinfotext("de", termslug, produktnummer);
  const obj_en = await getinfotext("en", termslug, produktnummer);
  const obj_fr = await getinfotext("fr", termslug, produktnummer);
  //console.log(obj_de);
  //console.log(produktnummer);
  // fetch data from bretz.de

  const obj = {
    infotext_de: obj_de.infotext,
    infotext_en: obj_en.infotext,
    infotext_fr: obj_fr.infotext,
    slogan_de: obj_de.slogan,
    slogan_en: obj_en.slogan,
    slogan_fr: obj_fr.slogan,
    bgimage: obj_de.bgimage,
  };
  //console.log(obj);

  //console.log(infotext);

  // redúce the array to a number configured in environment variables

  // end

  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey,{
  //auth: { persistSession: false },
  //});

  const { data: dataresult, error: errorresult } = await supabase
    .from("produkte")
    .update(obj)
    .eq("termslug", termslug);

  // console.log(error);
  // console.log(data);

  res.status(200).json({ data: dataresult, error: errorresult });
}

async function getprodcatslugs() {
  // get all actual product category slugs
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=0"; // table: Produktkategorien
  const selectStr = `select B,CF Where D>=1`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());

  // remove unusable parts from the fetched text string
  //
  let result = reformatAll(res_);
  return result;
}

async function getinfotext(locale, termslug, produktnummer) {
  const document = await scrapData(locale, "prodCat", termslug);
  //console.log(document);
  // we only need one link from this document
  let linkOfFirstProduct;

  // for balaao we take the third link, because the first two where in the wrong language
  // at the point of creating this script

  // if (termslug == "balaao") {
  if (document.querySelector("#av-layout-grid-5 article a")) {
    linkOfFirstProduct = document.querySelectorAll(
      "#av-layout-grid-5 article a"
    )[produktnummer].href;
    //console.log(linkOfFirstProduct);
  } else {
    // just to prevent an error
    linkOfFirstProduct = "https://api.bretz-austria.at";
  }
  // } else {
  // if (document.querySelector("#av-layout-grid-5 article a")) {
  // 	linkOfFirstProduct = document.querySelector(
  // 		"#av-layout-grid-5 article a"
  // 	).href;
  // 	//console.log(linkOfFirstProduct);
  // } else {
  // 	// just to prevent an error
  // 	linkOfFirstProduct = "https://api.bretz-austria.at";
  // }
  // }

  //console.log(linkOfFirstProduct);
  // now we fetch data from this link
  const res2 = await fetch(linkOfFirstProduct);
  const html2 = await res2.text();
  const dom2 = new JSDOM(html2);
  //const document2 = dom2.window.document;
  const document2 = await scrapData("de", "url", linkOfFirstProduct);

  let tabinfoScrapedText;

  if (
    document2.querySelector("#av_section_2 .tabcontainer .tab_inner_content")
  ) {
    tabinfoScrapedText = document2
      .querySelector("#av_section_2 .tabcontainer .tab_inner_content")
      .outerHTML.replace(
        ` class="tab_inner_content invers-color" itemprop="text"`,
        ""
      )
      .replace(`<strong>`, `<span class="font-semibold">`)
      .replace("</strong>", "</span>");
  } else {
    tabinfoScrapedText = undefined;
  }

  // get the slogan
  let slogan;
  if (document2.querySelector("#av_section_3 .av-special-heading-tag")) {
    slogan = document2.querySelector(
      "#av_section_3 .av-special-heading-tag"
    ).outerHTML;
  }
  //console.log(slogan);

  // get background image
  const imgfirstrow = document.querySelector(
    "#full_slider_1 > div > ul > li > div > img"
  ).src;
  //console.log(imgfirstrow);

  const obj = {
    infotext: tabinfoScrapedText,
    slogan: slogan,
    bgimage: imgfirstrow,
  };

  //console.log(obj);
  return obj;
}
