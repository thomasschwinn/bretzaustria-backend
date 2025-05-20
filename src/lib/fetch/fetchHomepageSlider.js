export async function fetchHomepageSlider() {
	//fetch from supabase
	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/produktkategorien?slider1_1_on_homepage_slider=eq.TRUE&select=term_name,term_slug,homepage_slider,html`;
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
			next: { revalidate: 60 },
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
