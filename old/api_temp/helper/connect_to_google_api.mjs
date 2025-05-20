import { google } from "googleapis";

export async function connect_to_google_api() {
	//
	//
	// authentication
	const auth = new google.auth.GoogleAuth({
		keyFile: "./google-sheets-credentials.json",
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
	});
	const authClientObject = await auth.getClient();
	//console.log("verbindung mit google api hergestellt");

	const googleresponse = google.sheets({
		version: "v4",
		auth: authClientObject,
	});
	//console.log(googleresponse);
	return googleresponse;
}
