import { reformatAll } from "../../../../src/lib/reformatFetchedTextString";

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

	const sheetselectorStr = "&gid=752983156"; // table: Produkte

	// We need this fields:
	//
	const selectStr = `Select A, B,E,F,G,H,I,J, BP, BQ,BR,BT, BW, CK, CL, CU, DN, DT Where  D="instock" AND O=TRUE AND BT="kissen" ORDER BY N`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());
	//console.log(res_);

	// remove unusable parts from the fetched text string
	const result = reformatAll(res_);

	const highlowprice = createhighestandlowestprice(result);

	const productnames = createlistofproductnames(result);

	// create an object
	const theResultObj = {};

	// put all products in "produkte"
	theResultObj["produkte"] = result;
	theResultObj["highlowprice"] = highlowprice;
	theResultObj["productnames"] = productnames;

	// //console.log(request.headers);
	res.status(200).json(theResultObj);
}

function createhighestandlowestprice(rows) {
	// create an array of all prices
	let prices = [];
	rows.map((row, i) => {
		if (!row.sale_price) {
			row.sale_price = "";
		}
		if (!row.preisanhang) {
			row.preisanhang = "";
		}
		if (!row.kissenform) {
			row.kissenform = "";
		}
		if (!row.machart) {
			row.machart = "";
		}
		if (!row.reissverschluss) {
			row.reissverschluss = "";
		}
		if (row.sale_price != "") {
			prices.push(row.sale_price * 1);
		} else {
			prices.push(row.price * 1);
		}
	});
	prices.sort(function (a, b) {
		return a - b;
	});
	prices = [...new Set(prices)];

	const priceHigh = Math.round(prices[prices.length - 1] / 10) * 10;
	const priceLow = Math.round(prices[0] / 10) * 10;
	const priceHiLow = [priceLow, priceHigh];
	return priceHiLow;
}

function createlistofproductnames(rows) {
	let productnames = [];
	rows.map((row, i) => {
		productnames.push(row.title);
	});
	productnames.sort();
	productnames = [...new Set(productnames)];
	return productnames;
}
