// import fs from "fs";
// import { build_usable_json } from "./helper/build_usable_json";

// export async function localTmpHandler(req, res) {
// 	const query = req.query.write;

// 	let thePath;
// 	let sheetName;
// 	console.log(query);

// 	if (
// 		query == "product-categories" ||
// 		query == "produktkategorien" ||
// 		query == "Produktkategorien"
// 	) {
// 		thePath = "/tmp/all-product-categories.json";
// 		sheetName = "Produktkategorien";
// 	}
// 	if (query == "products" || query == "Produkte" || query == "produkte") {
// 		thePath = "/tmp/all-products.json";
// 		sheetName = "Produkte";
// 	}
// 	if (query == "translations") {
// 		thePath = "/tmp/translation.json";
// 		sheetName = "translations";
// 	}

// 	try {
// 		const spreadsheetId = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

// 		const base = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?`;
// 		//const sheetName = "Produktkategorien";
// 		const sql_query = encodeURIComponent("Select *");
// 		const url = `${base}&sheet=${sheetName}&tq=${sql_query}`;
// 		const fetchdata = await fetch(url);

// 		const text = await fetchdata.text();

// 		const rows = build_usable_json(text); //re-format the data to a table like json

// 		fs.writeFileSync(thePath, JSON.stringify(rows));

// 		// send result
// 		res.status(200).json({ message: "Success" });
// 	} catch (error) {
// 		return res.status(500).json(error);
// 	}
// }
