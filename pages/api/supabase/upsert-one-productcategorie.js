import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";
export const revalidate = 5;
export default async function Handler(req, res) {
  const slug = req.query.tag;
  // get all products from google
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
  //nothing
  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=0"; // table: Produkte
  const selectStr = `select * where B="${slug}"`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());

  // remove unusable parts from the fetched text string
  let result = reformatAll(res_);
  //console.log(result);

  // format the array

  const insertArr = [];
  const upsertid = Math.random();
  result.map((row, i) => {
    const obj = {};
    obj["term_slug"] = row.term_slug;
    obj["term_name"] = row.term_name;
    obj["slider1_1_on_homepage_slider"] = row.slider1_1_on_homepage_slider;
    obj["portfolio_bild"] = row.portfolio_bild;
    obj["data"] = row;
    obj["homepage_slider_"] = row.homepage_slider_;
    obj["order_product_page"] = row.order_product_page;
    obj["product_to_scrap_infotext"] = row.product_to_scrap_infotext;
    obj["Montageanleitung"] = row.Montageanleitung;
    obj["autocad_Daten"] = row.autocad_Daten;
    obj["Produktdatenblatt"] = row.Produktdatenblatt;
    obj["upsertid"] = upsertid;

    insertArr.push(obj);
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // const { data, error } = await supabase
  // 	.from("produkte")
  // 	.delete()
  // 	.neq("slug", "thisisjustarandomvalue");
  // just a random value to delete all rows

  const { data, error } = await supabase
    .from("produktkategorien")
    .upsert(insertArr)
    .select();

  res.status(200).json({ upsertid: upsertid, data: data, error: error });
}
