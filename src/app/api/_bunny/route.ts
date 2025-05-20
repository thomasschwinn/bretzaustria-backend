// import https from "https";
// import multer from "multer";

import type { NextApiRequest, NextApiResponse } from "next";
// type Data = any;
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// export const config = {
// 	api: {
// 		bodyParser: false, // Disable the default Next.js body parsing
// 	},
// };
export async function handler() {
// req: NextApiRequest | any,
// res: NextApiResponse<Data> | any
	// const STORAGE_ZONE_NAME = "zonegoeshere";
	// const HOSTNAME = ``;
	// const FILENAME_TO_UPLOAD = `testing.png`;
	// const ACCESS_KEY = "keygoeshere";
	// const options = {
	// 	method: "PUT",
	// 	host: HOSTNAME,
	// 	path: ` / ${STORAGE_ZONE_NAME} /test/${FILENAME_TO_UPLOAD} `,
	// 	headers: {
	// 		AccessKey: ACCESS_KEY,
	// 		"Content-Type": "application/octet-stream",
	// 	},
	// };
	// upload.single("file")(req, res, (err) => {
	// 	if (err) {
	// 		return res.status(500).json({ error: err });
	// 	}
	// 	const fileBuffer = req.file.buffer;
	// 	const request = https.request(options, (resp) => {
	// 		resp.on("data", (chunk) => {
	// 			console.log(chunk.toString("utf8"));
	// 		});
	// 	});
	// 	request.on("error", (error: any) => {
	// 		console.error(error);
	// 	});
	// 	request.write(fileBuffer);
	// 	request.end();
	// 	return res.status(200).json({ body: "" });
	// });
	// res.status(200).json({ body: "Upload successfull" });
}
export default handler;
