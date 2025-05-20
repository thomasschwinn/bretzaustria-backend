import { build_usable_json } from "./build_usable_json";

export async function fetchdata(sheetName, sqlString) {
	const bretzProductsSheet = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
	const base = `https://docs.google.com/spreadsheets/d/${bretzProductsSheet}/gviz/tq?`;
	//console.log(sheetName, searchKey, searchValue, fieldsToSelect);
	let sql_query = encodeURIComponent(sqlString);

	const url = `${base}&sheet=${sheetName}&tq=${sql_query}`;
	//console.log(url);
	const fetchdata = await fetch(url);

	const text = await fetchdata.text();
	//console.log(text);

	// leere Felder werden je nach query erst in der folgenden Funktion ausgefiltert
	const rows = build_usable_json(text);
	//re-format the data to a table like json
	//console.log(rows);
	//const pause = await justadelay(delay);
	return rows;
}
