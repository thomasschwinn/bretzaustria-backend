// import { googleHandler } from "./fetch-directly-from-google";
// import { localTmpHandler } from "./fetch-from-local-tmp-folder";

import fsPromises from "fs/promises";

export default async function handler(req, res) {
	const { folder, filename } = req.query;

	const result = await fetch_from_special_folder(folder, filename);

	res.status(200).json(result);
	// if fetchFrom = "local_tmp_folder"
	// fetchFrom == "google_virtualisation_api"
	// 	? await googleHandler(req, res)
	// 	: fetchFrom == "local_tmp_folder"
	// 	? await localTmpHandler(req, res)
	// 	: res.status(200).json({ message: "check the environment variables" });
}

async function fetch_from_special_folder(folder, filename) {
	// fetching the product categorie data
	const jsonData = await fsPromises.readFile(
		"/tmp/" + folder + "/" + filename + ".json"
	);
	let data = JSON.parse(jsonData);
	return data;
}
