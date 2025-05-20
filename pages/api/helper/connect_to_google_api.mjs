import { google } from "googleapis";
//import keys from "../../../google-sheets-credentials.json" assert { type: "json" };

export async function connect_to_google_api() {
	//
	//
	// authentication
	const auth = await authorizeGoogle();

	const authClientObject = await auth.getClient();
	//console.log("verbindung mit google api hergestellt");
	const googleresponse = await getgoogleresponse(authClientObject);

	//console.log(googleresponse);
	return googleresponse;
}
async function authorizeGoogle() {
	//hello
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
