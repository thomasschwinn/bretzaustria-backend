import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
  // get all products from google
  // define the fetch
  const fetchUrl =
    "https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

  const conStr = "/gviz/tq?tq=";

  const sheetselectorStr = "&gid=361555892"; // table: Produkte
  let selectStr = `Select A, B, C, D,E,F`;

  const res_ = await fetch(
    `${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
  ).then((x) => x.text());
  //console.log(res_);

  // remove unusable parts from the fetched text string
  const resultraw = reformatAll(res_);
  //console.log(result);

  // format the array

  //console.log(insertArr);

  // redúce the array to a number configured in environment variables

  // end

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("translations")
    .delete()
    .neq("term", "thisisjustarandomvalue_asdfasdfasdfsadf");
  // just a random value to delete all rows

  const { data: insertResult } = await supabase
    .from("translations")
    .insert(resultraw);

  res.status(200).json(resultraw);
}
