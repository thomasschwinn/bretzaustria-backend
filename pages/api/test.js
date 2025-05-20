import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";
import { google } from "googleapis";

export default async function Handler(req, res) {
	const auth = await authorizeGoogle();
const help=""
	const authClientObject = await auth.getClient();
	//console.log("verbindung mit google api hergestellt");
	const googleresponse = await getgoogleresponse(authClientObject);
	const spreadsheetId = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
	const spreadsheetDimension = "ROWS";
	const range = "Sprachen";
	const rawJSON = await googleresponse.spreadsheets.values.get({
		spreadsheetId: spreadsheetId,
		range,
		majorDimension: spreadsheetDimension,
	});
	res.status(200).json(rawJSON); //asdfasdf
}
async function authorizeGoogle() {
	const auth = new google.auth.GoogleAuth({
		keyFile: "./google-sheets-credentials.json",
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
	});
	return auth;
}

async function getgoogleresponse(authClientObject) {
	const googleresponse = google.sheets({
		version: "v4",
		auth: authClientObject,
	});
	return googleresponse;
}
