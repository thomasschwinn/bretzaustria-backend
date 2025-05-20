import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  // get all products from google
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
  //nothing
  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=752983156"; // table: Produkte
  const selectStr = `select B`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());

  // remove unusable parts from the fetched text string
  let result = reformatAll(res_);

  let str = "(";

  const length = result.length;

  const arr = [];
  result.map((row, i) => {
    str += `'`;
    str += row.slug;
    str += `'`;
    if (i != length - 1) {
      str += `,`;
    }
    // if (i > 200) {
    // 	return;
    // }
    //console.log(row.slug);
    arr.push(row.slug);

    //console.log(i);
  });
  str += ")";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("produkte")
    .select()
    .not("slug", "eq", arr);

  // just a random value to delete all rows

  // const { data: insertResult } = await supabase
  // 	.from("produkte")
  // 	.insert(insertArr);
  // console.log(insertResult);

  res.status(200).json({ result: data });
}
