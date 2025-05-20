export async function fetchProductCategorieSlugs() {
	const apiRoute =
		"https://api.bretz-austria.at/api/supabase/get-productcategorieslugs";

	const res = await fetch(apiRoute, { next: { revalidate: 60 } });
	const data = await res.json();
	//console.log(data);

	//

	return data;
}
