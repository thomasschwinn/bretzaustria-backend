import fs from "fs";

export async function write_single_json_files_from_array(
	data,
	folder,
	field_to_get_filename
) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}

	data.map((row, i) => {
		//console.log(row);
		fs.writeFile(
			folder + "/" + row[field_to_get_filename] + ".json",
			JSON.stringify(row),
			function (err, data) {
				//if (err) throw err;
				//console.log(location + " wurde erstellt");
			}
		);
	});
	return "ok";
}
export async function write_single_json_file_from_object_or_array(
	data,
	folder,
	filename
) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
	fs.writeFile(folder + filename, JSON.stringify(data), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});

	return "ok";
}

export async function write_json_Files(folder, fileName, sheetdataJson) {
	fs.writeFile(file, sheetdataJson, function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});
	const newdata = await logdata(folder, fileName, sheetdataJson);
	return fileName;
}

export async function write_all_locales(data, folder) {
	//
	// create a subfolder for the product-categorie files
	let subfolder = folder + "locales";
	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";
}
