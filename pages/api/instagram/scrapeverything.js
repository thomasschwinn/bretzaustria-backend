const puppeteer = require("puppeteer");
const fs = require("fs").promises;
import { JSDOM } from "jsdom";

export default async function Handler(req, res) {
	try {
		//initiate the browser
		const browser = await puppeteer.launch();

		//create a new in headless chrome
		const page = await browser.newPage();

		//go to target website
		await page.goto("https://instagram.bretz-austria.at", {
			//wait for content to load
			waitUntil: "networkidle0",
		});

		//get full page html
		const html = await page.content();
		//console.log(html);
		const dom = new JSDOM(html);
		const document = dom.window.document;
		const body = document.querySelector("body").innerHTML;
		const stylesheet = document.querySelector("link").outerHTML;
		//console.log(stylesheet);

		//store html content in the reactstorefront file
		//await fs.writeFile("reactstorefront.html", html);
		res.status(200).json({ html: body, stylesheet: stylesheet });
		//close headless chrome
		await browser.close();
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
	// hello
}
