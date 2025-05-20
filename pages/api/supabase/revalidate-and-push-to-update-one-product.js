import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
	const slug = req.query.tag;

	const revalidate_product = await fetch(
		`https://beta12345.bretz-austria.at/api/revalidatetag?tag=${slug}`
	);
	const product_result = await revalidate_product.json();
	// const revalidate_productcategorie = await fetch(
	// 	`https://beta12345.bretz-austria.at/api/revalidatetag?tag=${thetermslug}`
	// );
	//console.log(thetermslug);
	//const productcategorie_result = await revalidate_productcategorie.json();

	const fetchtostartupdate_de = await fetch(
		`https://beta12345.bretz-austria.at/de/produkte/${slug}`
	);
	const fetchtostartupdate_en = await fetch(
		`https://beta12345.bretz-austria.at/en/produkte/${slug}`
	);
	const fetchtostartupdate_fr = await fetch(
		`https://beta12345.bretz-austria.at/fr/produkte/${slug}`
	);
	// const fetchtostartupdate_catde = await fetch(
	// 	`https://beta12345.bretz-austria.at/de/produkt-kategorie/${thetermslug}`
	// );
	// const fetchtostartupdate_caten = await fetch(
	// 	`https://beta12345.bretz-austria.at/en/produkt-kategorie/${thetermslug}`
	// );
	// const fetchtostartupdate_catfr = await fetch(
	// 	`https://beta12345.bretz-austria.at/fr/produkt-kategorie/${thetermslug}`
	// );

	// const sale = result[0].sale_price
	// 	? await fetch(
	// 			`https://beta12345.bretz-austria.at/api/revalidatetag?tag=sale`
	// 	  )
	// 	: "not a sale product";
	// const errormessageUpsert = error
	// 	? "beim upsert ist ein Fehler aufgetreten"
	// 	: "upsert ok";

	res.status(200).json({
		productlink: "https://beta12345.bretz-austria.at/de/produkte/" + slug,

		product: product_result,
	});
}
