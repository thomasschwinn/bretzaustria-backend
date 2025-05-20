import { connect_to_google_api } from "./helper/connect_to_google_api.mjs";
import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	try {
		const { term_slug } = req.query;
		const googleresponse = await connect_to_google_api();

		const data_for_single_product_category_pages =
			await fetch_google_sheet_data(
				"query-Produktkategorien_fuer_prodcat_pages",
				googleresponse
			);
		let result;
		data_for_single_product_category_pages.map((row, i) => {
			if (row.term_slug == term_slug) {
				result = row;
			}
		});
		if (!result) {
			result = { message: "no product category found" };
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}
