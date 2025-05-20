import { reformatAll } from "../../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
	// get the query string
	// const { searchParams } = new URL(request.url);
	// const slug = searchParams.get("slug");
	//console.log(folder);
	const { termslug } = req.query;
	if (!termslug) {
		res.status(200).json({ result: "es wurde kein termslug übergeben" });
	}

	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=752983156"; // table: Produkte
	const selectStr = `Select * Where BT="${termslug}" AND D="instock" ORDER BY I, L`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());
	//console.log(res_);

	// remove unusable parts from the fetched text string
	const result = reformatAll(res_);

	// //console.log(request.headers);
	res.status(200).json(result);
}
