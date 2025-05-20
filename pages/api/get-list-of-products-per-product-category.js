import { connect_to_google_api } from "./helper/connect_to_google_api.mjs";
import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	try {
		const { term_slug } = req.query;
		const googleresponse = await connect_to_google_api();

		const data_for_product_lists = await fetch_google_sheet_data(
			"query-Produkte-for-loops-only-instock",
			googleresponse
		);

		let result = [];
		data_for_product_lists.map((row, i) => {
			if (row.term_slug == term_slug) {
				result.push(row);
			}
		});

		if (result.length == 0) {
			result = { message: "no product list found" };
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}
