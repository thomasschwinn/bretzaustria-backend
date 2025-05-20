import { reformatAll } from "../../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=0"; // table: Produktkategorien

	// select the fields "term_name", "term_slug", "portfolio_bild", "Produktgruppenfilter"
	// where field "order_product_page" is not null
	const selectStr = `select A, B, CC, AW Where D is not null order by D`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());

	// remove unusable parts from the fetched text string
	let result = reformatAll(res_);

	//console.log(request.headers);
	res.status(200).json(result);
}
