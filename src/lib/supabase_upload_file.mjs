import { StorageClient } from "@supabase/storage-js";
//const fs = require("fs/promises");
const fs = require("fs");

export async function updatefile(input, pathtostore) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const servicekey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dWt4eXN4Z3l0ZHNtdWh1Y3N2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDY2NDcwOSwiZXhwIjoyMDAwMjQwNzA5fQ.TWahSb6rWnd2H_1MA0QfkxAL-SSOUfbmfqXcvxOb1As";
  const storageClient = new StorageClient(supabaseUrl, {
    apikey: servicekey,
    Authorization: `Bearer ${servicekey}`,
  });

  // save the file temporary
  const save = await fs.writeFile(`/tmp/${pathtostore}`, input);
  const { data, error } = await storageClient
    .from("htmlfiles")
    .update(pathtostore, `/tmp/${pathtostore}`);
}
