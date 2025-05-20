var cloudinary = require("cloudinary");

async function getdata(cursor) {
	//console.log(cursor);
	const c1 = await cloudinary.config({
		cloud_name: "dhtsndsje", // add your cloud_name
		api_key: "796477254192539", // add your api_key
		api_secret: "BHLJuSNK2noaWePPv7qjF1Jwkzs", // add your api_secret

		secure: true,
	});

	if (cursor == "0") {
		const c2 = await cloudinary.v2.api
			.resources({ type: "upload", max_results: 500 })
			.then((result) => {
				//console.log(result);
				return result;
			});
		return c2;
	} else {
		const c2 = await cloudinary.v2.api
			.resources({ type: "upload", max_results: 500, next_cursor: cursor })
			.then((result) => {
				//console.log(result);
				return result;
			});
		return c2;
	}
}

export default async function handler(req, res) {
	let quer = req.query.cursor;
	//console.log(quer);
	if (!quer) {
		quer = "0";
	}
	const result = await getdata(quer);

	//console.log(result);
	res.status(200).json(result);
}
