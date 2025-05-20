import fs from "fs";

export async function write_for_options(folder, options) {
	//
	// make sure that this file is in the /special subfolder

	let subfolder = folder + "special";
	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";

	// reformat options
	let optionsNew = {};
	options.map((row, i) => {
		let thekey = row.key;
		optionsNew[thekey] = row.value;
	});
	const file = subfolder + "options.json";
	fs.writeFile(file, JSON.stringify(optionsNew), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});
	return;
}
