import { google } from "googleapis";
import keys from "../../google-sheets-credentials.json";

export default function handler(req, res) {
	try {
		const client = new google.auth.JWT(
			keys.client_email,
			null,
			keys.private_key,
			["https://www.googleapis.com/auth/spreadsheets"]
		);

		client.authorize(async function (err, tokens) {
			if (err) {
				return res.status(400).send(JSON.stringify({ error: true }));
			}

			//asdfasdf
			const gsapi = google.sheets({ version: "v4", auth: client });

			//CUSTOMIZATION FROM HERE
			const opt = {
				spreadsheetId: "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k",
				range: "Sprachen",
			};

			let data = await gsapi.spreadsheets.values.get(opt);
			return res.status(400).send(JSON.stringify(data.data.values));
		});
	} catch (e) {
		return res
			.status(400)
			.send(JSON.stringify({ error: true, message: e.message }));
	}
}
