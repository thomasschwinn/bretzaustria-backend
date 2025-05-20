import cloudinary from "cloudinary";

export default async function Handler(req, res) {
	// max file size is 99mb, if the folder is bigger it returns an error
	cloudinary.v2.config({
		cloud_name: "dhtsndsje",
		api_key: "796477254192539",
		api_secret: "BHLJuSNK2noaWePPv7qjF1Jwkzs",
		secure: true,
	});

	const result = cloudinary.v2.utils.download_folder("bezugsstoffe");

	//console.log(request.headers);
	res.status(200).json(result);
}
