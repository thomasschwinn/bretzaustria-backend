// the file function to run in from the file
import { getData } from "../../components/createjsonfiles/first.mjs";

// an async function to return  that data
async function myFunction() {
	const auth = new google.auth.GoogleAuth({
		keyFile: "./google-sheets-credentials.json",
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
	});
	const authClientObject = await auth.getClient();
	//console.log("verbindung mit google api hergestellt");

	const sheets = google.sheets({ version: "v4", auth: authClientObject });
	const range = `Produktkategorien!A:BZ`;
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k",
		range,
		majorDimension: "ROWS",
	});
	//console.log("verbindung mit sheet hergestellt");
	let rows = response.data.values;
}

// just a function that returns success when the imported file was processed, all we nee in this cas
export default function handler(req, res) {
	myFunction().then(
		function (value) {
			res.status(200).json({ status: "success" });
		},
		function (error) {
			res.status(200).json({ status: "no success" });
		}
	);
}
