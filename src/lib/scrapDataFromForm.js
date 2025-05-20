import { JSDOM } from "jsdom";

export async function scrapDataFromForm(url) {
	// fetch data from bretz.de website
	const res = await fetch(url, { next: { revalidate: 300 } });
	const html = await res.text();
	//console.log(html);

	// define a JSDOM model
	const dom = new JSDOM(html);

	// make a document, we can now with "normal" JS selectors select the element we need
	const document = dom.window.document;
	//console.log(document);
	return document;
}
