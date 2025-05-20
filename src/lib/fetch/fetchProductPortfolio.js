export async function fetchProductPortfolio() {
	//fetch from supabase
	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/produktkategorien?order=order_productportfolio_page&select=term_name,term_slug,portfolio_bild,produktgruppenfilter_1,produktgruppenfilter_2,order_productportfolio_page`;
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
			next: { tags: ["productportfolio"] },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	}

	const res = await fetch(apiRoute, header);
	const data = await res.json();
	const newdata = [];
	data.map((row, i) => {
		if (!row.order_productportfolio_page) {
			return;
		}
		const obj = row;
		obj["Produktgruppenfilter"] =
			row.produktgruppenfilter_1 + " " + row.produktgruppenfilter_2;
		delete obj["order_productportfolio_page"];
		delete obj["produktgruppenfilter_1"];
		delete obj["produktgruppenfilter_2"];
		newdata.push(obj);
	});
	//console.log(newdata);

	return newdata;
}
