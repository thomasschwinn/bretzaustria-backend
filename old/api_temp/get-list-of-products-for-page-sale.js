import { connect_to_google_api } from "./helper/connect_to_google_api.mjs";
import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	try {
		const googleresponse = await connect_to_google_api();
		const data_for_product_sale = await fetch_google_sheet_data(
			"query-Produkte_fuer_sale",
			googleresponse
		);
		let result = data_for_product_sale;

		if (!result) {
			result = { message: "no product found" };
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}
