// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

// export const config = {
// 	runtime: "edge",
//hello
// };

export default async function handler(req, res) {
	const spreadsheetId = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const base = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?`;
	const sheetName = "Produktkategorien";
	const query = encodeURIComponent("Select *");
	const url = `${base}&sheet=${sheetName}&tq=${query}`;
	const fetchdata = await fetch(url);

	const text = await fetchdata.text();

	const rows = build_usable_json(text); //re-format the data to a table like json

	res.status(200).json(body);
}
