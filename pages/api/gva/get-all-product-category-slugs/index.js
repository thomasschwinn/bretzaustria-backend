import { reformatAll } from "../../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
	// get the query string
	// const { searchParams } = new URL(request.url);
	// const slug = searchParams.get("slug");
	//console.log(folder);

	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=0"; // table: Produktkategorien
	const selectStr = `select B Where D>=1`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());

	// remove unusable parts from the fetched text string
	let result = reformatAll(res_);

	// redúce the array to a number configured in environment variables
	if (process.env.PRODUCT_CATEGORY_SLUGS_TO_RETURN) {
		const render = process.env.PRODUCT_SLUGS_TO_RETURN * 1;
		// shuffle the array
		result = result.sort((a, b) => 0.5 - Math.random());
		result = result.slice(0, render);
	}

	//console.log(request.headers);
	res.status(200).json(result);
}
