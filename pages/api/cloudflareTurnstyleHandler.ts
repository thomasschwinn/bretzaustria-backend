import type { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const form = new URLSearchParams();
	form.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY as string);
	//form.append("response", req.body["cf-turnstile-response"]);
	form.append("response", req.body);
	form.append("remoteip", req.headers["x-forwarded-for"] as string);
	//console.log(req.body);

	const result = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{ method: "POST", body: form }
	);
	const json = await result.json();
	//console.log(req.headers);
	//console.log(json.success);
	// if (json.success == false) {
	// 	var output = { message: "das hat nicht funktioniert...." };
	// }
	// if (json.success == true) {
	// 	var output = { message: "das hat hervorragend funktioniert" };
	// }
	res.status(result.status).json(json);
}
