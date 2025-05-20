import fs from "fs";

export async function write_single_json_files_from_array(
	data,
	folder,
	field_to_get_filename
) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}

	const newdata = await replaceCloudinaryUrl(data);

	newdata.map((row, i) => {
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
async function replaceCloudinaryUrl(data) {
	// this one is very important!!!!!!!!!------------------------------------------
	// here we replace the cloudinary url with another url
	//const new_url = "bretz-austria-cloudinary.b-cdn.net";
	const new_url = "res.cloudinary.com";
	const cloudinary_url = "res.cloudinary.com";
	// first we stringify the data
	let newData = JSON.stringify(data);
	// the we replace All urls
	newData = newData.replaceAll(cloudinary_url, new_url);
	// then we parse it again to json
	newData = JSON.parse(newData);

	return newData;
}

export async function write_single_json_file_from_object_or_array(
	data,
	folder,
	filename
) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}

	const newdata = await replaceCloudinaryUrl(data);

	fs.writeFile(
		folder + filename,
		JSON.stringify(newdata),
		function (err, data) {
			//if (err) throw err;
			//console.log(location + " wurde erstellt");
		}
	);

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
