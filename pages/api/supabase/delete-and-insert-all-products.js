import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  // get all products from google
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
  //nothing
  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=752983156"; // table: Produkte
  const selectStr = `select *`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());

  // remove unusable parts from the fetched text string
  let result = reformatAll(res_);
  //console.log(result);

  // format the array

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

  //console.log(insertArr);

  // redúce the array to a number configured in environment variables

  // end

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("produkte")
    .delete()
    .neq("slug", "thisisjustarandomvalue");
  // just a random value to delete all rows

  const { data: insertResult } = await supabase
    .from("produkte")
    .insert(insertArr);

  res.status(200).json({ result: "success" });
}
