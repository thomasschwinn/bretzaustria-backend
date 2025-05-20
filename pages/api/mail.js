const nodemailer = require("nodemailer");
import { main } from "./nodemailer";
//import { nodemailer } from "nodemailer";

export default function handler(req, res) {
	const body = JSON.parse(req.body);

	// const body = {
	// 	apikey: "8889b6be-8c1d-4c5f-a5c4-670db7e503bf",
	// 	subject: "Terminanfrage von bretz-austria.at",
	// 	botcheck: false,
	// 	Anrede: "Frau",
	// 	Vorname: "asdfadf",
	// 	Nachname: "asdfa",
	// 	Email: "asdfasd@asdfd.ee",
	// 	Telefon: "034534",
	// 	message: "adfadfasd",
	// 	from_name: "bretz-austria.at",
	// };

	// check origin
	if (
		req.headers.origin == "http://localhost:3000" ||
		req.headers.origin == "http://localhost:3001" ||
		req.headers.origin == "https://bretz-austria.at" ||
		req.headers.origin == "https://bretz-austria-next-google-ap.vercel.app" ||
		req.headers.origin == "https://bretzaustria-app-router.vercel.app"
	) {
		main(body).then(
			function (value) {
				res.status(200).json({
					success: "true",
					data: "something...",
					message: "a message that is displayed when the email was send",
				});
			},
			function (error) {
				res.status(200).json({ status: "no success" });
			}
		);
	} else {
		res.status(200).json({ status: "no success" });
	}
}
