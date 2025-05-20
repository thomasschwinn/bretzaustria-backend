const puppeteer = require("puppeteer");

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

		//store html content in the reactstorefront file
		//await fs.writeFile('reactstorefront.html', html);

		//close headless chrome
		await browser.close();
		res.status(500).json({ result: html });
	} catch (err) {
		res.status(500).json({ error: "failed to load data" });
	}
}
