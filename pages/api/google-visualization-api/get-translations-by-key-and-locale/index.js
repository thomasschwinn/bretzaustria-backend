import { reformatAll } from "../../../../src/lib/reformatFetchedTextString";
import { fetch_google_sheet_data } from "../../helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	// get the query string
	// const { searchParams } = new URL(request.url);
	// const slug = searchParams.get("slug");
	//console.log(folder);
	const { keys } = req.query;
	const { locale } = req.query;
	if (!keys) {
		res.status(200).json({ result: "es wurden keine Wörter übergeben" });
	}
	if (!locale) {
		res.status(200).json({ result: "es wurde keine Sprache übergeben" });
	}
	let keysArr = [];
	if (keys.includes(",")) {
		keysArr = keys.split(",");
	} else [(keysArr[0] = keys)];

	//console.log(keysArr);

	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=361555892"; // table: Produkte
	let selectStr = `Select *`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());
	//console.log(res_);

	// remove unusable parts from the fetched text string
	const resultraw = reformatAll(res_);

	// formatting data
	let result = {};
	resultraw.map((key, i) => {
		if (keysArr.includes(key.term)) {
			result[key.term] = key[locale];
		}

		//console.log(key.term);
	});

	// //console.log(request.headers);
	res.status(200).json(result);
}
