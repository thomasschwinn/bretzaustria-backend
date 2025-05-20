//import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
	// get the query string
	// const { searchParams } = new URL(request.url);
	// const slug = searchParams.get("slug");
	//console.log(folder);
	// const { termslug } = req.query;
	// if (!termslug) {
	// 	res.status(200).json({ result: "es wurde kein termslug übergeben" });
	// }

	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=506430845"; // table: Produkte

	// We need this fields:
	//
	const selectStr = `Insert A values("hello")`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());

	// remove unusable parts from the fetched text string

	// //console.log(request.headers);
	res.status(200).json("hello");
}
