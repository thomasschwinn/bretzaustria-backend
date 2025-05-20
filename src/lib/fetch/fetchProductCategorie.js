export async function fetchProductCategorie(termslug, locale, fields) {
	// fetch directly from supabase
	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/produktkategorien?term_slug=eq.${termslug}&select=*`;

	let header = {};
	if (process.env.Environment && process.env.Environment == "localhost") {
		header = {
			next: { revalidate: 0 },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	} else {
		header = {
			next: { tags: [termslug] },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	}
	const res = await fetch(apiRoute, header);
	const data = await res.json();
	//console.log(data);

	//

	return data;
}
