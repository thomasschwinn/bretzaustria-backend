import { createClient } from "@supabase/supabase-js";

export default async function Handler(req, res) {
  const upsertid = req.query.upsertid;
  //console.log(upsertid);

  //console.log(insertArr);

  // redúce the array to a number configured in environment variables

  // end

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase
    .from("produktkategorien")
    .delete()
    .neq("upsertid", upsertid);

  res.status(200).json({ error: error });
}
