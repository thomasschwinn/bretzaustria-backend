import { build_usable_json } from "./helper/build_usable_json";
const fs = require("fs");
// function justadelay(delay) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, delay);
// 	});
// }

async function fetchdata(
	spreadSheetId,
	sheetName,
	sqlString,
	showEmptyFields,
	delay
) {
	const base = `https://docs.google.com/spreadsheets/d/${spreadSheetId}/gviz/tq?`;
	//console.log(sheetName, searchKey, searchValue, fieldsToSelect);
	let sql_query = encodeURIComponent(sqlString);

	const url = `${base}&sheet=${sheetName}&tq=${sql_query}`;
	//console.log(url);
	const fetchdata = await fetch(url);

	const text = await fetchdata.text();
	//console.log(text);

	// leere Felder werden je nach query erst in der folgenden Funktion ausgefiltert
	const rows = build_usable_json(text, showEmptyFields);
	//re-format the data to a table like json
	//console.log(rows);
	//const pause = await justadelay(delay);
	return rows;
}

export default async function googleHandler(req, res) {
	let { spreadSheetId, sheetName, sqlString, showEmptyFields, delay } =
		req.query;
	//console.log(req.query);

	// if no spreadSheetId is queried, there is a standard spreadSheetId hitting the bretz products database
	const bretzProductsSheet = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
	if (spreadSheetId == undefined) {
		spreadSheetId = bretzProductsSheet;
	}

	if (showEmptyFields == undefined) {
		showEmptyFields = "yes";
	}
	// if no searchKey or searchValue is queried, the whole data row will be responded
	if (sqlString == undefined) {
		sqlString = "Select *";
	}
	if (delay == undefined) {
		delay = 0;
	}

	//console.log(fieldsToSelect);
	// awaits requests like /api/fetch-directly-from-google?sheetname=Produkte&searchKey=B&searchValue=Napali
	// searchKey represents the cellname of the sheet (A, B, C, AC, ... something like that) where the searchValue should be found in
	// deeper explanations here https://developers.google.com/chart/interactive/docs/querylanguage?hl=de#language-clauses
	const body = await fetchdata(
		spreadSheetId,
		sheetName,
		sqlString,
		showEmptyFields,
		delay
	);
	//console.log(body);
	// fs.writeFile(
	// 	"/tmp/asdgdfgdfgd.json",
	// 	JSON.stringify(body),
	// 	function (err, data) {
	// 		//if (err) throw err;
	// 		//console.log(location + " wurde erstellt");
	// 	}
	// );
	// fs.writeFile(
	// 	"/tmp/asdgdfgdfgd.json",
	// 	"JSON.stringify(body)",
	// 	function (err, data) {
	// 		//if (err) throw err;
	// 		//console.log(location + " wurde erstellt");
	// 	}
	// );
	res.status(200).json(body);
}
