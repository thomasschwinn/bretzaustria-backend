import { NextRequest } from "next/server";

export async function GET(req) {
	const url = new URL(req.url);
	const query = url.searchParams.get("theverysecretquery");
	if (query != "sadfiqwer78234laksfhklfasdjh") {
		return Response.json({ response: "hello" });
	}

	const fetchUrl =
		"https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=bretz_austria&url_embed_safe=true";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "9c897907bcmshe907ed9aa99fcd7p140bcajsn56864b0d4442",
			"X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com",
		},
		next: { revalidate: 9000 }, // revalidation after 2,5hrs
	};
	const response = await fetch(fetchUrl, options);
	const result = await response.json();
	return Response.json(result);
}
