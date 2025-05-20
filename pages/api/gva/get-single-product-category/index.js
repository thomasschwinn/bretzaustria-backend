import { reformatAll } from "../../../../src/lib/reformatFetchedTextString";

export default async function Handler(req, res) {
	// get the query string
	const { slug } = req.query;
	//console.log(slug);

	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=0"; // table: Produktkategorien
	const selectStr = `select%20*%20Where%20B=%27${slug}%27`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());

	// remove unusable parts from the fetched text string
	const result = reformatAll(res_);

	//console.log(request.headers);
	res.status(200).json(result[0]);
}
