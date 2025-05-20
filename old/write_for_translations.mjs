import fs from "fs";
import { json_Array_of_object_formatter } from "./reformat_data_from_google_api.mjs";

export async function write_for_translations(folder, translations_raw) {
	const translations = translations_raw.data.values;
	//console.log(translations);
	//
	// make sure that this file is in the /special subfolder

	let subfolder = folder + "special";
	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";

	let jsonObject = {};

	let thelength = translations.length - 1;

	translations.map((row, i) => {
		let translate_row = {};
		translate_row.de = row[1];
		translate_row.en = row[2];
		translate_row.fr = row[3];

		let xx = row[0];
		jsonObject[xx] = translate_row;
	});

	const file = subfolder + "translations.json";
	fs.writeFile(file, JSON.stringify(jsonObject), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});

	return jsonObject;
}
