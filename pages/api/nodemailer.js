"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function main(body) {
	//
	// define the login data for the account the email will be sent from
	let transporter = nodemailer.createTransport({
		host: "smtp.office365.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "webshop@bretz-austria.at", // generated ethereal user
			pass: "Ducati650", // generated ethereal password
		},
	});

	let bodyString = JSON.stringify(body);
	bodyString = bodyString.replaceAll('"', "");
	bodyString = bodyString.replaceAll("{", "");
	bodyString = bodyString.replaceAll("}", "");
	bodyString = bodyString.replaceAll(":", ": ");
	bodyString = bodyString.replaceAll(",", "\n");

	//
	// we use the Vorname and Nachname field from the contact form show them as email sender in your email app (... outlook, etc)
	let absender = '"Vorname Nachname" <email.von.der.webseite@bretz-austria.at>';
	absender = absender.replace("Vorname", body.Vorname);
	absender = absender.replace("Nachname", body.Nachname);

	// send mail with defined transport object
	//const betreff = createBetreff(body);
	//const htmlBody = createHtmlBody(body, betreff);

	//-----------------------------------------------------------------------------------------------------

	const htmlBody = await asyncDecissionMaker(body);
	//const htmlBody = await loadTemplateNewsletterAnmeldung(body);
	//console.log(htmlBody);
	//------------------------------------------------------------------------------------------------------

	const formToEmail = () => {
		if (process.env.CONTACT_FORM_EMAIL_TO) {
			return process.env.CONTACT_FORM_EMAIL_TO;
		} else {
			return "thomas.schwinn@gmail.com";
		}
	};

	let info = await transporter.sendMail({
		// the 'from' segment is very critical, take care when you change it
		from: absender, // sender address
		replyTo: body.Email,

		to: formToEmail, // list of receivers
		subject: body.Betreff, // Subject line
		text: bodyString, // plain text body
		html: htmlBody, // html body
	});

	//console.log("Terminanfrage abgeschickt: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	//console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

async function loadTemplateNewsletterAnmeldung(body) {
	const { readFile } = require("fs/promises");
	const path = require("path");
	const data = await readFile(
		path.join(
			__dirname,
			"../../../../public/email_templates/newsletteranmeldung.html"
		),
		"utf8"
	);
	const returneddata = data
		.replace("#name#", body.Vorname + " " + body.Nachname)
		.replace("#email#", body.Email);

	return returneddata;
}
async function loadTemplateKatalogbestellung(body) {
	const { readFile } = require("fs/promises");
	const path = require("path");
	const data = await readFile(
		path.join(
			__dirname,
			"../../../../public/email_templates/katalogbestellung.html"
		),
		"utf8"
	);

	const returneddata = data
		.replace("#betreff#", body.Betreff)
		.replace("#firma#", body.Firma)
		.replace("#anrede#", body.Anrede)
		.replace("#vorname#", body.Vorname)
		.replace("#nachname#", body.Nachname)
		.replace("#strasse#", body.Strasse)
		.replace("#hausnummer#", body.Hausnummer)
		.replace("#plz#", body.Postleitzahl)
		.replace("#ort#", body.Ort)
		.replace("#land#", body.Land)
		.replace("#email#", body.Email)
		.replace("#telefon#", body.Telefon)
		.replace("#nachricht#", body.Nachricht.replaceAll("\n", "<br />"));

	return returneddata;
}
async function loadTemplateProduktanfrage(body) {
	const { readFile } = require("fs/promises");
	const path = require("path");
	const data = await readFile(
		path.join(
			__dirname,
			"../../../../public/email_templates/produktanfrage.html"
		),
		"utf8"
	);

	const returneddata = data
		.replace("#betreff#", body.Betreff)
		.replace("#firma#", body.Firma)
		.replace("#anrede#", body.Anrede)
		.replace("#vorname#", body.Vorname)
		.replace("#nachname#", body.Nachname)
		.replace("#strasse#", body.Strasse)
		.replace("#hausnummer#", body.Hausnummer)
		.replace("#plz#", body.Postleitzahl)
		.replace("#ort#", body.Ort)
		.replace("#land#", body.Land)
		.replace("#email#", body.Email)
		.replace("#telefon#", body.Telefon)
		.replace("#link#", "<a href='" + body.Link + "'>" + body.link + "</a>")
		.replace(
			"#picture#",
			"<img src='" +
				body.prodpic.replace("/upload", "/upload/c_scale,w_600") +
				"' />"
		)
		.replace("#nachricht#", body.Nachricht.replaceAll("\n", "<br />"));

	return returneddata;
}
async function loadTemplateTerminvereinbarung(body) {
	const { readFile } = require("fs/promises");
	const path = require("path");
	const data = await readFile(
		path.join(
			__dirname,
			"../../../../public/email_templates/Terminvereinbarung.html"
		),
		"utf8"
	);
	// format time and dates to local formats
	let zeit = new Date(body.Zeit);
	zeit = zeit.toLocaleTimeString("de-DE");
	zeit = zeit.slice(0, zeit.length - 3);

	let datum = new Date(body.date);
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	datum = datum.toLocaleDateString("de-DE", options);

	const returneddata = data

		.replace("#anrede#", body.Anrede)
		.replace("#vorname#", body.Vorname)
		.replace("#nachname#", body.Nachname)

		.replace("#email#", body.Email)
		.replace("#telefon#", body.Telefon)
		.replace("#datum#", datum)
		.replace("#zeit#", zeit)
		.replace("#link#", "<a href='" + body.Link + "'>" + body.link + "</a>")

		.replace("#nachricht#", body.Nachricht.replaceAll("\n", "<br />"));

	return returneddata;
}

async function asyncDecissionMaker(body) {
	if (body.Betreff == "Newsletteranmeldung") {
		const data = await loadTemplateNewsletterAnmeldung(body);
		return data;
	}
	if (body.Betreff == "Katalogbestellung" || body.Betreff.includes("Anfrage")) {
		const data = await loadTemplateKatalogbestellung(body);
		return data;
	}
	if (body.Betreff.includes("Produktanfrage")) {
		const data = await loadTemplateProduktanfrage(body);
		return data;
	}
	if (body.Betreff.includes("Terminanfrage")) {
		const data = await loadTemplateTerminvereinbarung(body);
		return data;
	}
}
