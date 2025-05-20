import { createClient } from "@supabase/supabase-js";

import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  const slug = req.query.slug;
  // get all products from google
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=752983156"; // table: Produkte
  const selectStr = `select *`;
  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());

  // remove unusable parts from the fetched text string
  let result = reformatAll(res_);
  //console.log(result);
  result = result.pop();
  result = [result];
  //console.log(result);

  const insertArr = [];

  result.map((row, i) => {
    const obj = {};
    obj["slug"] = row.slug;
    obj["stock_status"] = row.stock_status;
    obj["termslug"] = row.term_slug;
    obj["sale_price"] = row.sale_price;
    obj["infotext"] = "";
    obj["data"] = row;
    obj["price"] = row.price;
    obj["preisanhang"] = row.preisanhang;
    obj["sale_verfuegbarkeit"] = row.sale_verfuegbarkeit;
    obj["ausstellungsstueck"] = row.ausstellungsstueck;
    obj["order_sale_loop"] = row.order_sale_loop;
    obj["order_shop"] = row.order_shop;
    obj["online_bestellbar"] = row.online_bestellbar;
    obj["productimage"] = row.productimage;
    obj["order_in_product_category_loop"] = row.order_in_product_category_loop;
    obj["lieferzeit"] = row.lieferzeit;
    obj["title"] = row.title;

    insertArr.push(obj);
  });

  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  let { data, error } = await supabase
    .from("produkte")
    .insert(insertArr)
    .select();

  // nach dem einfügen müssen wir noch felder von einem anderen Produkt der gleichen Gruppen
  // kopieren

  const termslug = result[0].term_slug; // wir suchen nach dem ersten product mit dem gleichen termslug

  const { data: produkteArr, error: proderror } = await supabase
    .from("produkte")
    .select(
      "slogan_de,slogan_en,slogan_fr,infotext_de,infotext_en,infotext_fr,bgimage"
    )
    .eq("termslug", termslug);

  let prodDataToAdd = {};
  // use data from the first entry with data
  produkteArr.map((row, i) => {
    if (row.slogan_de) {
      prodDataToAdd = row;
      return;
    }
  });

  // then add this data to the new product
  const { data: addeddata, error: addederror } = await supabase
    .from("produkte")
    .update(prodDataToAdd)
    .eq("slug", insertArr[0].slug)
    .select();

  try {
    res.status(200).json({ data: data, error: error });
  } catch (err) {
    res.status(500).json({ error: "error" });
  }
}
