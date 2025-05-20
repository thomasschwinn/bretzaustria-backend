import { JSDOM } from "jsdom";

export async function scrapData(locale, url, slug) {
	//console.log(url);
	let newslug = slug;

	// with this function we scrap data from the bretz.de website

	// first we define from which domain (bretz.de, bretz.com or bretz.fr) we scrap, depending on our locale
	// create the domain for the locales
	let domain = "";
	if (locale == "de") {
		domain = "de";
	}
	if (locale == "fr") {
		domain = "fr";

		// on bretz.fr and bretz.com also some slugs are translated, on our website there are not translated
		// slugs, so we have to change them that they match
		newslug = slug
			.replace("bett", "lit")
			.replace("esstisch-konferenztisch", "table-de-repas-conference")
			.replace("stuhlsessel", "chaise");
	}
	if (locale == "en") {
		domain = "com";
		newslug = slug
			.replace("bett", "bed")
			.replace("esstisch-konferenztisch", "dining-table-conference-table")
			.replace("stuhlsessel", "armchair");
	}

	// define the url where we will scrape from
	let scrapurl = "https://api.bretz-austria.at"; // just to prevent an error when a variable is missing
	if (url == "prodCat") {
		scrapurl = `https://bretz.${domain}/produkt/${newslug}/`;
	}
	if (url == "url") {
		scrapurl = slug;
	}

	// fetch data from bretz.de website
	const res = await fetch(scrapurl, { next: { revalidate: 300 } });
	const html = await res.text();

	// define a JSDOM model
	const dom = new JSDOM(html);

	// make a document, we can now with "normal" JS selectors select the element we need
	const document = dom.window.document;
	return document;
}
