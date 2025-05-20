export async function fetchPages(page) {
	//console.log(page);
	//fetch from supabase
	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pages?page=eq.${page}&select=*`;
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
	//console.log(data);
	return data;
}
