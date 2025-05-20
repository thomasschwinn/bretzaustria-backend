import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  const slug = req.query.tag;

  // get all products from google
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
  //nothing
  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=752983156"; // table: Produkte
  const selectStr = `select * where B="${slug}"`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());
  //console.log(res_);
  // remove unusable parts from the fetched text string
  let result = reformatAll(res_);
  //console.log(result);

  // format the array
  //console.log(result);
  const insertArr = [];
  const thetermslug = result[0].term_slug;
  const upsertid = Math.random();
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
    obj["upsertid"] = upsertid;

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

  // const { data, error } = await supabase
  // 	.from("produkte")
  // 	.delete()
  // 	.neq("slug", "thisisjustarandomvalue");
  // just a random value to delete all rows

  const { data, error } = await supabase
    .from("produkte")
    .upsert(insertArr)
    .select();

  //console.log(error);
  const revalidate_product = await fetch(
    `https://beta12345.bretz-austria.at/api/revalidatetag?tag=${slug}`
  );
  const product_result = await revalidate_product.json();
  const revalidate_productcategorie = await fetch(
    `https://beta12345.bretz-austria.at/api/revalidatetag?tag=${thetermslug}`
  );

  const productcategorie_result = await revalidate_productcategorie.json();

  const fetchtostartupdate_de = await fetch(
    `https://beta12345.bretz-austria.at/de/produkte/${slug}`
  );
  const fetchtostartupdate_en = await fetch(
    `https://beta12345.bretz-austria.at/en/produkte/${slug}`
  );
  const fetchtostartupdate_fr = await fetch(
    `https://beta12345.bretz-austria.at/fr/produkte/${slug}`
  );
  const fetchtostartupdate_catde = await fetch(
    `https://beta12345.bretz-austria.at/de/produkt-kategorie/${thetermslug}`
  );
  const fetchtostartupdate_caten = await fetch(
    `https://beta12345.bretz-austria.at/en/produkt-kategorie/${thetermslug}`
  );
  const fetchtostartupdate_catfr = await fetch(
    `https://beta12345.bretz-austria.at/fr/produkt-kategorie/${thetermslug}`
  );

  const sale = result[0].sale_price
    ? await fetch(
        `https://beta12345.bretz-austria.at/api/revalidatetag?tag=sale`
      )
    : "not a sale product";
  const errormessageUpsert = error
    ? "beim upsert ist ein Fehler aufgetreten"
    : "upsert ok";

  res.status(200).json({
    title: result[0].title,
    slug: result[0].slug,
    productlink:
      "https://beta12345.bretz-austria.at/de/produkte/" + result[0].slug,

    upsert: errormessageUpsert,
    product: product_result,
    productcategorie: productcategorie_result,
  });
}
