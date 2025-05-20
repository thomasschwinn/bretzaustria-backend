//const fs = require("fs");
const path = require("path");
const https = require("https");
const fetch = require("node-fetch");
import { promises as fs } from "fs";

export default async function Handler(req, res) {
	// const download = await downloadFile(
	// 	"https://bretz.de/wp-content/uploads/2023/01/balaao-2023_slider.jpg"
	// );

	//
	// relative path to the file
	// const filePath = "c:/tmp/balaao-2023_slider.jpg";

	// // reusable arrow function to encode file data to base64 encoded string
	// let encodedfile = convertBase64(filePath);
	// encodedfile =
	// 	"data:image/jpeg;name=balaao-2023_slider.jpg;base64," + encodedfile;
	//console.log(encodedfile);

	//

	//
	const result = await movetobunny(
		"https://bretz.de/wp-content/uploads/2023/01/balaao-2023_slider.jpg",
		"hello.jpg"
	);

	// const url =
	// 	"https://storage.bunnycdn.com/bretz-austria-ab-11-2022/produktkategorien/asdfasdfasdfwerwerasdf.jpg";
	// const options = {
	// 	method: "PUT",
	// 	headers: {
	// 		AccessKey: "f1e7a6de-bd76-4ea2-a59687c9a7bc-91c4-48cd",
	// 		"content-type": "application/octet-stream",
	// 	},
	// 	body: encodedfile,
	// };

	// fetch(url, options)
	// 	.then((res) => res.json())
	// 	.then((json) => console.log(json))
	// 	.catch((err) => console.error("error:" + err));
	// //

	try {
		res.status(200).json({ success: "success" });
	} catch (err) {
		res.status(500).json({ error: "error" });
	}
}

async function downloadFile(url) {
	const filename = path.basename(url);

	https.get(url, (res) => {
		const fileStream = fs.createWriteStream(`/tmp/${filename}`);
		res.pipe(fileStream);

		fileStream.on("finish", () => {
			fileStream.close();

			return "download finished";
		});
	});

	// from vercel
	//use the tmp serverless function folder to create the write stream for the pdf
	// let writeStream = fs.createWriteStream(`/tmp/${filename}.pdf`);
	// doc.pipe(writeStream);
	// doc.text(title);
	// doc.end();
}

function convertBase64(path) {
	// read binary data from file
	const bitmap = fs.readFileSync(path);
	// convert the binary data to base64 encoded string
	const blob = Buffer.from(bitmap);
	// return bitmap.toString("base64");
	return blob;
}

async function movetobunny(urldownload, newfilename) {
	// download file and buffer it
	const response = await fetch(urldownload);
	const blob = await response.blob();
	const arraybuffer = await blob.arrayBuffer();
	const buffer = Buffer.from(arraybuffer);

	// upload file to bunny
	const url =
		"https://storage.bunnycdn.com/bretz-austria-ab-11-2022/produktkategorien/" +
		newfilename;
	const options = {
		method: "PUT",
		headers: {
			AccessKey: "f1e7a6de-bd76-4ea2-a59687c9a7bc-91c4-48cd",
			"content-type": "application/octet-stream",
		},
		body: buffer,
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error("error:" + err));
}
