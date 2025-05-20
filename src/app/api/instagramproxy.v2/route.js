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
	let instaData = await response.json();

	const imgArr = [];
	const instaLinkArr = [];

	const textArr = [];
	const carouselArr = [];

	// only use the first 6 postings
	const instaArr = instaData?.data?.items;

	// make an array with the texts
	let count = 0;
	instaArr?.map((el, i) => {
		if (count < 6) {
		} else {
			return;
		}
		//console.log(count);
		// voerst nur photopostings benutzen, videos machma evtl später
		if (el?.carousel_media) {
			// build the main image array
			imgArr.push(el?.carousel_media[0]?.image_versions?.items[0]?.url);

			// build the text Array
			textArr.push(el?.caption?.text);

			// build the carousel Array
			const carArr = el?.carousel_media;
			const helper = [];
			carArr.map((row, e) => {
				const obj = {};
				obj.type = "image";
				obj.media = row?.image_versions.items[0]?.url;

				helper.push(obj);
			});
			// console.log(helper);
			// console.log(carArr);
			carouselArr.push({ data: helper, vid_first: false });

			// build the link Array
			const link = "https://instagram.com/p/" + el?.code;
			instaLinkArr.push(link);

			count++;
		}
	});
	return Response.json({imgArr:imgArr,textArr:textArr,instaLinkArr:instaLinkArr,carouselArr:carouselArr});
}
