import { connect_to_google_api } from "./helper/connect_to_google_api.mjs";
import { fetch_google_sheet_data } from "./helper/fetch_google_sheet_data.mjs";

export default async function Handler(req, res) {
	//console.log(req.query);

	const query = req.query.keys;
	const locale = req.query.locale;
	//console.log(query);
	if (query == "" || query === undefined) {
		res
			.status(200)
			.json({ message: "you need to pass some queries to get a result" });
		return;
	} else {
		if (!query.includes(",")) {
			res.status(200).json({ message: "query keys are not correct" });
			return;
		}
	}
	const queryArr = query.split(",");

	//console.log(queryArr);

	try {
		const googleresponse = await connect_to_google_api();
		const googleresult = await fetch_google_sheet_data(
			"translations_all",
			googleresponse
		);

		if (!googleresult) {
			res.status(200).json({ message: "no  query result from google" });
			return;
		}
		//console.log(googleresult);

		// const demo = {
		// 	Abhishek: { username: "dtrfrt34", age: 20 },
		// 	Pritam: { key: "atfgr354", age: 19 },
		// 	Rahul: { username: "rrtyny445", age: 26 },
		// 	Binayak: { key: "Jjrgk456", age: 23 },
		// };
		const demo = googleresult;
		//const users = ["Rahul", "Pritam"];

		//const users = ["Alle Produkte", "Shop"];
		const users = queryArr;

		// this result is filtered by the keys, but still includes all languages
		const filtered_googleresult = Object.keys(googleresult)
			.filter((key) => users.includes(key))
			.reduce((obj, key) => {
				obj[key] = googleresult[key];
				return obj;
			}, {});

		// if a locale is passed, we filter the object and return only the passed language
		let finalResult = filtered_googleresult;
		if (locale) {
			finalResult = {};
			for (const property in filtered_googleresult) {
				finalResult[property] = filtered_googleresult[property][locale];
			}
		}

		//console.log(finalResult);
		res.status(200).json(finalResult);
	} catch (err) {
		res.status(500).json({ error: "something went wrong ....." });
	}
}
