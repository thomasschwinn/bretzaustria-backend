// api/savepdf.js

//const PDFDocument = require("pdfkit");
const fs = require("fs");
//import aws from "aws-sdk";

//import { getData } from "../api/helper/write_json_files_in_tmp_folder.mjs";

export default async function handler(req, res) {
	let { spreadSheetId, sheetName, sqlString, showEmptyFields, delay } =
		req.query;
	const bretzProductsSheet = "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";
	if (spreadSheetId == undefined) {
		spreadSheetId = bretzProductsSheet;
	}

	if (showEmptyFields == undefined) {
		showEmptyFields = "yes";
	}
	// if no searchKey or searchValue is queried, the whole data row will be responded
	if (sqlString == undefined) {
		sqlString = "Select *";
	}
	if (delay == undefined) {
		delay = 0;
	}
	const base = `https://docs.google.com/spreadsheets/d/${spreadSheetId}/gviz/tq?`;
	//console.log(sheetName, searchKey, searchValue, fieldsToSelect);
	let sql_query = encodeURIComponent(sqlString);

	const url = `${base}&sheet=${sheetName}&tq=${sql_query}`;
	//console.log(url);
	const fetchdata = await fetch(url);

	const text = await fetchdata.text();

	fs.writeFile("/tmp/qwerqwerqwe.json", text, function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});

	res.status(200).json({ message: "sdf" });
	//Send the data for the pdf in the request as query params such as the title and filename
	// const {
	// 	query: { title, filename },
	// } = req;
	//const doc = new PDFDocument();
	//use the tmp serverless function folder to create the write stream for the pdf
	// writeStream.on("finish", function () {
	// 	//once the doc stream is completed, read the file from the tmp folder
	// 	const fileContent = fs.readFileSync(`/tmp/${filename}.pdf`);
	// 	//create the params for the aws s3 bucket
	// 	var params = {
	// 		Key: `${filename}.pdf`,
	// 		Body: fileContent,
	// 		Bucket: "your-s3-bucket-name",
	// 		ContentType: "application/pdf",
	// 	};
	// 	//Your AWS key and secret pulled from environment variables
	// 	const s3 = new aws.S3({
	// 		accessKeyId: process.env.YOUR_AWS_KEY,
	// 		secretAccessKey: process.env.YOUR_AWS_SECRET,
	// 	});
	// 	s3.putObject(params, function (err, response) {
	// 		res.status(200).json({ response: `File ${filename} saved to S3` });
	// 	});
	// });
}
