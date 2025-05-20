import { connect_to_google_api } from "./helper/connect_to_google_api.mjs";
import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	try {
		const googleresponse = await connect_to_google_api();
		const data_for_product_category_slugs = await fetch_google_sheet_data(
			"query-all-product-category-slugs",
			googleresponse
		);
		let result = data_for_product_category_slugs;

		if (!result) {
			result = { message: "no product found" };
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}
