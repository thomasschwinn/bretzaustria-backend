export async function fetchOptions() {
	//fetch from supabase
	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/options?select=key,value`;
	let header = {};

	// header for api.bretz-austria.at
	// if (process.env.Environment && process.env.Environment == "localhost") {
	// 	header = { next: { revalidate: 0 } };
	// } else {
	// 	header = { next: { tags: ["options"] } };
	// }

	// header for supabase

	if (process.env.Environment && process.env.Environment == "localhost") {
		header = {
			next: { revalidate: 0 },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	} else {
		header = {
			next: { tags: ["options"] },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	}

	const res = await fetch(apiRoute, header);
	const data = await res.json();
	const optionsObj = {};
	data.map((row, i) => {
		optionsObj[row.key] = row.value;
	});
	// console.log(optionsObj);
	// console.log(keys);
	// console.log(data);
	return optionsObj;
}
