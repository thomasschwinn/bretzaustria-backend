import { StorageClient } from "@supabase/storage-js";

export default async function Handler(req, res) {
	const file = req.query.file;
	const bucket = req.query.bucket;

	//console.log(termslug);
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL +"/storage/v1";
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	const servicekey =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dWt4eXN4Z3l0ZHNtdWh1Y3N2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDY2NDcwOSwiZXhwIjoyMDAwMjQwNzA5fQ.TWahSb6rWnd2H_1MA0QfkxAL-SSOUfbmfqXcvxOb1As";
	const storageClient = new StorageClient(supabaseUrl, {
		apikey: servicekey,
		Authorization: `Bearer ${servicekey}`,
	});

	const rawdata = await fetch(
		`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${file}`
	);
	const data = await rawdata.text();
	//console.log(error);
	//console.log(data);

	try {
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: "etwas ist schiefgelaufen" });
	}
}
