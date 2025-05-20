import { createClient } from "@supabase/supabase-js";
export const revalidate = 5;
export default async function Handler(req, res) {
  const objstr = req.query.obj;
  //console.log(objstr);
  let obj = {};
  if (objstr != "null") {
    obj = JSON.parse(objstr);
  } else {
    obj = req.query;
    delete obj.obj;
  }
  //const obj = JSON.parse(objstr);
  //console.log(obj);
  //console.log(obj);

  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("produkte")
    .update(obj)
    .eq("slug", obj.slug)
    .select();
  //console.log(data);

  // set the revalidation for the product
  const domain = process.env.BRETZWEBSITE;
  const revalidateProduct = await fetch(
    domain + "/api/revalidatetag?tag=" + obj.slug
  );
  const revalidateLoop = await fetch(
    domain + "/api/revalidatetag?tag=" + obj.termslug
  );

  // load the pages to start the update
  const de = await fetch(domain + "/de/produkte/" + obj.slug);
  const en = await fetch(domain + "/en/produkte/" + obj.slug);
  const fr = await fetch(domain + "/fr/produkte/" + obj.slug);
  //console.log(data);
  //console.log(error);
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(error);
  }
}
