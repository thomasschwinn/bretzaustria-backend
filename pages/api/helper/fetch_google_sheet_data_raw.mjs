import { json_Array_of_object_formatter } from "./reformat_data_from_google_api.mjs";
export async function fetch_google_sheet_data(range, googleresponse) {
	const spreadsheetId = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
	const spreadsheetDimension = "ROWS";

	const rawJSON = await googleresponse.spreadsheets.values.get({
		spreadsheetId: spreadsheetId,
		range,
		majorDimension: spreadsheetDimension,
	});
	//console.log(range);

	return rawJSON.data.values;
}
