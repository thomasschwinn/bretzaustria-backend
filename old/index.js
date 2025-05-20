import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
	const { query } = req;

	// get full files
	if (query.thepath) {
		//Find the absolute path of the json directory
		const jsonDirectory = path.join(process.cwd(), "/public/json/");
		//Read the json data file data.json
		const fileContents = await fs.readFile(
			jsonDirectory + query.thepath,
			"utf8"
		);
		const jsondata = JSON.parse(fileContents);
		//Return the content of the data file in json format
		res.status(200).json(jsondata);
	}
}
