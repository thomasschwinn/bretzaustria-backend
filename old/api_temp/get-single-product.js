import { connect_to_google_api } from "./helper/connect_to_google_api.mjs";
import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	try {
		const { slug } = req.query;
		const googleresponse = await connect_to_google_api();

		const data_for_single_product_pages = await fetch_google_sheet_data(
			"query-Produkte_fuer_singleproductpages",
			googleresponse
		);
		let result;
		data_for_single_product_pages.map((row, i) => {
			if (row.slug == slug) {
				result = row;
			}
		});
		if (!result) {
			result = { message: "no product found" };
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}

// this function checks the age of a local file and does something dependend on that age
// import { fetchdata } from "../api/helper/fetch_google_sheet_data.mjs";
// const Fs = require("fs");
// import fsPromises from "fs/promises";
// import path from "path";
async function googleHandler(req, res) {
	let { slug } = req.query;
	//console.log(req.query);
	const timeNow = Math.round(Date.now() / 1000);

	const FileTimestamp = Fs.statSync("/tmp/special/options.json");
	const timeFile = Math.round(FileTimestamp.ctimeMs / 1000);
	const timeFileplussixmin = timeFile + 600; // zehn Minuten

	if (timeFileplussixmin > timeNow) {
		//console.log("fetch local");
		const jsonData = await fsPromises.readFile(
			"/tmp/products/all-products.json"
		);
		const rows = JSON.parse(jsonData);
		rows.map((row, i) => {
			if (row.slug == slug) {
				res.status(200).json(row);
			}
		});
	} else {
		//console.log("fetch from google");
		const body = await fetchdata("Produkte", `Select * where C="${slug}"`);

		res.status(200).json(body[0]);
	}

	// if no spreadSheetId is queried, there is a standard spreadSheetId hitting the bretz products database
}
