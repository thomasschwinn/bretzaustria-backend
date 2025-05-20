export function json_Array_of_object_formatter(batchRowValues, range) {
	var rows = [];

	if (range.includes("translation")) {
		// do something when translation
		rows = do_something_with_translations_data(batchRowValues);
	} else {
		for (var i = 1; i < batchRowValues.length; i++) {
			var rowObject = {};
			for (var j = 0; j < batchRowValues[i].length; j++) {
				// only set object with a value

				rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
			}

			rows.push(rowObject);
		}
	}
	if (range == "options") {
		// do something with option
		rows = do_something_with_options_data(rows);
	}

	return rows;
}

function do_something_with_translations_data(translations) {
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
	return jsonObject;
}

function do_something_with_options_data(options) {
	let optionsNew = {};
	options.map((row, i) => {
		let thekey = row.key;
		optionsNew[thekey] = row.value;
	});
	return optionsNew;
}
