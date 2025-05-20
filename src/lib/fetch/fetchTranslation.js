export async function fetchTranslation(dataToSearch, locale) {
	if (dataToSearch === undefined) {
	}
	if (locale === undefined) {
	}
	let header = {};
	// header for api.bretz-austria.at
	// if (process.env.Environment && process.env.Environment == "localhost") {
	// 	header = { next: { revalidate: 0 } };
	// } else {
	// 	header = { next: { tags: ["translations"] } };
	// }

	// header for supabase
	if (process.env.Environment && process.env.Environment == "localhost") {
		header = {
			next: { revalidate: 0 },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	} else {
		header = {
			next: { tags: ["translations"] },
			headers: {
				apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			},
		};
	}

	// fetch from api.bretz-austria.at
	//const apiRoute = "https://api.bretz-austria.at/api/supabase/get-translations";

	// fetch directly from supabase
	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/translations?select=*`;

	const res = await fetch(apiRoute, header);
	const data = await res.json();
	//console.log(data);

	//
	const newArr = [];
	data.map((row, i) => {
		const obj = {};
		let helper;
		if (!row.components) {
			row.components = "";
		}
		if (!row.pages) {
			row.pages = "";
		}

		const comp = row.components;
		const pages = row.pages;
		let e = 0;
		//console.log(comp);

		dataToSearch.map((str, i) => {
			if (e <= i) {
				if (comp.includes(str) || pages.includes(str)) {
					//console.log(row.term);
					obj["term"] = row.term;
					obj[locale] = row[locale];
					newArr.push(obj);
					e = 99999999999;
				}
			}
		});
	});
	//console.log(newArr);

	const newObj = {};
	newArr.map((row, i) => {
		newObj[row.term] = row[locale];
	});
	//console.log(newObj);

	//console.log(dataToSearch);
	return newObj;
}
