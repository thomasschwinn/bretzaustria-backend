import { createClient } from "@supabase/supabase-js";
import { reformatAll } from "../../../src/lib/reformatFetchedTextString";
import { scrapDataFromForm } from "../../../src/lib/scrapDataFromForm";
import { JSDOM } from "jsdom";

export default async function Handler(req, res) {
	const url = req.query.url;
	//console.log(url);
	const document = await scrapDataFromForm(url);
	const image = document.querySelector(".slider1 > .slider1slide > a > img")
		? document
				.querySelector(".slider1 > .slider1slide > a > img")
				.getAttribute("data-src")
		: "";
	const title = document.querySelector(
		".woocommerce-notices-wrapper + div >section > div >div > div > div >div > div"
	)
		? document.querySelector(
				".woocommerce-notices-wrapper + div >section > div >div > div > div >div > div"
		  ).innerHTML
		: "";
	const price = document.querySelector(".woocommerce-Price-amount > bdi")
		? document.querySelector(".woocommerce-Price-amount > bdi").innerHTML
		: "";

	//console.log(price);
	//console.log(image);

	res.status(200).json({ src: image, title: title, price: price });
}

async function getinfotext(url_de, url_en, url_fr, querySelector, innerHTML) {
	const htmlSelector = innerHTML ? "innerHTML" : "outerHTML";
	const document_de = await scrapDataFromForm(url_de);
	const document_en = await scrapDataFromForm(url_en);
	const document_fr = await scrapDataFromForm(url_fr);
	const infotext_de = document_de.querySelector(querySelector)[htmlSelector];
	const infotext_en = document_en.querySelector(querySelector)[htmlSelector];
	const infotext_fr = document_fr.querySelector(querySelector)[htmlSelector];
	//console.log(infotext_de);

	const obj = {
		infotext_de: infotext_de,
		infotext_en: infotext_en,
		infotext_fr: infotext_fr,
	};
	//console.log(obj);
	return obj;
}
