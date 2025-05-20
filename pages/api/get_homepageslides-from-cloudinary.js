import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

export default async function Handler(req, res) {
	try {
		const googleresponse = await connect_to_google_api();
		const data_for_homepageslider = await fetch_google_sheet_data(
			"query-Produktkategorien_fuer_homepageslider",
			googleresponse
		);
		let result = data_for_homepageslider;

		if (!result) {
			result = { message: "no product found" };
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}
