import fs from "fs";

export async function write_for_product_categories(data, folder, locales) {
	//
	// create a subfolder for the product-categorie files
	let subfolder = folder + "product-categories";
	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";
	//const file = subfolder + fileName;
	//
	// first we write a file with the complete data of the sheet
	let file = subfolder + "all-product-categories.json";
	fs.writeFile(file, JSON.stringify(data), function (err, data) {
		if (err) {
			throw err;
		}
	});

	//
	// then we write a single file for every product category
	const dataForSingleProdCat = JSON.parse(JSON.stringify(data));
	const singleprodcatfiles = await write_single_product_categorie_files(
		subfolder,
		dataForSingleProdCat
	);
	//console.log(data);
	//
	// then write the file for the homepage slider
	const homepagesliderfile = await write_single_for_homepage_slider(
		folder,
		data
	);

	//
	// then write a special file for page /produkte
	const fileforpageProdukte = await write_file_for_page_produkte(folder, data);

	// then write a file with all slugs
	const allprodcatcslugs = await write_all_product_categorie_slugs(
		subfolder,
		data,
		locales
	);

	return file;
}

async function write_single_product_categorie_files(folder, data) {
	data.map((row, i) => {
		// set the filename for product categories
		let thisFileName;
		if (row.term_name) {
			thisFileName = "product-categorie-" + row.term_slug + ".json";
		}
		delete row.term_id;
		delete row.slider1_1_on_homepage_slider;
		delete row.portfolio_bild;
		delete row.slider1_1;
		delete row.slider1_2;
		delete row.slider1_3;
		delete row.slider1_4;
		delete row.slider1_5;
		delete row.slider1_6;
		delete row.slider1_7;
		delete row.slider1_8;
		delete row.slider2_2;
		delete row.slider2_3;
		delete row.slider2_4;
		delete row.slider2_5;
		delete row.slider2_6;
		delete row.slider2_7;
		delete row.slider2_8;
		delete row.slider2_9;
		delete row.image_url;
		delete row.info_tab_auf_produktseite_de;
		delete row.Produktgruppenfilter;
		delete row.Produktgruppenfiilter_1;
		delete row.Produktgruppenfiilter_2;
		delete row.Produktgruppenfiilter_3;
		delete row.Produktgruppenfiilter_4;
		delete row.stoffe_tab_ausblenden;
		delete row.info_tab_ausblenden;
		delete row.headline_kontakt_tab;
		delete row.lieferzeit;

		const file = folder + thisFileName;
		const stringToWrite = JSON.stringify(row);
		fs.writeFile(file, stringToWrite, function (err, data) {
			//if (err) throw err;
			//console.log(location + " wurde erstellt");
		});
		//console.log(thisFileName + " wurde geschrieben");
	});

	return "ok";
}

async function write_single_for_homepage_slider(folder, data) {
	//
	// make sure that this file is in the /special subfolder
	let subfolder = folder + "special";

	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";

	const newArr = [];
	//console.log(data);
	data.map((row, i) => {
		if (row.slider1_1_on_homepage_slider == "TRUE") {
			newArr.push({
				term_slug: row.term_slug,
				term_name: row.term_name,
				img: row.slider1_1,
			});
		}

		//console.log(thisFileName + " wurde geschrieben");
	});

	const file = subfolder + "list_for_homepage_slider.json";
	fs.writeFile(file, JSON.stringify(newArr), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});

	return;
}

async function write_file_for_page_produkte(folder, data) {
	//
	// make sure that this file is in the /special subfolder

	let subfolder = folder + "special";
	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";
	//
	const newArr = [];
	//console.log(data);
	data.map((row, i) => {
		if (row.order_product_page != "") {
			newArr.push({
				term_slug: row.term_slug,
				term_name: row.term_name,
				Produktgruppenfilter: row.Produktgruppenfilter,
				portfolio_bild: row.portfolio_bild,
			});
		}

		//console.log(thisFileName + " wurde geschrieben");
	});
	//console.log(newArr);
	const file = subfolder + "list_for_produkte_page.json";
	fs.writeFile(file, JSON.stringify(newArr), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});
	return;
}

async function write_all_product_categorie_slugs(subfolder, data, locales) {
	const newArr = [];
	const anotherArr = [];
	//console.log(data);
	locales.map((localesrow, i) => {
		data.map((row, i) => {
			newArr.push({ term_slug: row.term_slug, locale: localesrow.locale });

			// and we create another array only with slugs
			anotherArr.push(row.term_slug);

			//console.log(thisFileName + " wurde geschrieben");
		});
	});
	const file1 = subfolder + "all-product-categorie-slugs.json";
	fs.writeFile(file1, JSON.stringify(newArr), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});
	const file2 = subfolder + "all-product-category-slugs-helper.json";
	fs.writeFile(file2, JSON.stringify(anotherArr), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});

	// and create a json file just with the term_slugs, that will help us product loops later

	return;
}
