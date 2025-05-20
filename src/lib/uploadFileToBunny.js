"use server";
const https = require("https");
//onst fs = require("fs");
import { fs } from "fs";
const REGION = ""; // If German region, set this to an empty string: ''
const BASE_HOSTNAME = "storage.bunnycdn.com";
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = "bretz-austria-ab-11-2022";
const FILENAME_TO_UPLOAD = "filenameyouwishtouse.txt";
const FILE_PATH = "/path/to/your/file/upload.txt";
const ACCESS_KEY =
	"4850a816-c9c5-4001-b3de-c27349b38c5f39e117b8-2645-4681-90a1-6fa14e42c12e";

const uploadFile = async (f) => {
	const readStream = fs.createReadStream(f);
	//const readStream = f;

	const options = {
		method: "PUT",
		host: HOSTNAME,
		path: `/${STORAGE_ZONE_NAME}/${FILENAME_TO_UPLOAD}`,
		headers: {
			AccessKey: ACCESS_KEY,
			"Content-Type": "application/octet-stream",
		},
	};

	const req = https.request(options, (res) => {
		res.on("data", (chunk) => {});
	});

	req.on("error", (error) => {});

	readStream.pipe(req);
};

const main = async (f) => {
	await uploadFile(f);
	return "done";
};

export { main };
