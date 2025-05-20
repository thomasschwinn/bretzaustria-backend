import { reformatAll } from "../../../src/lib/reformatFetchedTextString";

import { sql } from "@vercel/postgres";
import { deleteallproducts } from "./helper";

var format = require("pg-format");

export default async function Handler(req, res) {
	// get the query string
	// const { searchParams } = new URL(request.url);
	// const slug = searchParams.get("slug");
	//console.log(folder);

	// define the fetch
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
	//nothing
	const conStr = "/gviz/tq?tq=";

	const sheetselectorStr = "&gid=752983156"; // table: Produkte
	const selectStr = `select B where D="instock" ORDER BY BT`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text());

	// remove unusable parts from the fetched text string
	let result = reformatAll(res_);

	// redúce the array to a number configured in environment variables
	if (process.env.PRODUCT_SLUGS_TO_RETURN) {
		const render = process.env.PRODUCT_SLUGS_TO_RETURN * 1;
		// shuffle the array
		//result = result.sort((a, b) => 0.5 - Math.random());
		result = result.slice(0, render);
	}

	// insert the slugs into the postgres table
	let insertStr = "";
	let insertArr = [];

	const resultlength = result.length - 1;

	result.map((slug, i) => {
		insertStr += "(`" + slug.slug + "`)";
		if (i != resultlength) {
			insertStr += ",";
		}
		insertArr.push(slug.slug);
	});
	//console.log(insertStr);
	const client = await sql.connect();
	await client.sql`DELETE from produkte`;

	await client.sql`INSERT INTO produkte (slug) Values ($1), [${insertArr}]`;
	//console.log(slug.slug);

	client.release();
	//console.log(request.headers);
	res.status(200).json(insertStr);
}
