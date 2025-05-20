import { StorageClient } from "@supabase/storage-js";
const fs = require("fs");

export default async function Handler(req, res) {
  const pathtostore = req.query.pathtostore;
  const input = req.query.input;

  //console.log(termslug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const servicekey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dWt4eXN4Z3l0ZHNtdWh1Y3N2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDY2NDcwOSwiZXhwIjoyMDAwMjQwNzA5fQ.TWahSb6rWnd2H_1MA0QfkxAL-SSOUfbmfqXcvxOb1As";
  const storageClient = new StorageClient(supabaseUrl, {
    apikey: servicekey,
    Authorization: `Bearer ${servicekey}`,
  });

  const save = await fs.writeFile(`/tmp/${pathtostore}`, input);
  const { data, error } = await storageClient
    .from("htmlfiles")
    .update(pathtostore, `/tmp/${pathtostore}`);

  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(error);
  }
}
