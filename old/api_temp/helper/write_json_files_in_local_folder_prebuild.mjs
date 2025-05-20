//import { google } from "googleapis";
import fs from "fs";
import path from "path";
//import { promises as fs } from 'fs';
import {
	write_json_Files,
	write_single_json_files_from_array,
	write_single_json_file_from_object_or_array,
} from "./write_json_files.mjs";
import { fetch_google_sheet_data } from "./fetch_google_sheet_data.mjs";

import { connect_to_google_api } from "./connect_to_google_api.mjs";

export async function getData() {
	let folder = path.join(process.cwd(), "public/json");
	// define the absolute path where the files will be written
	// in order to write something on vercel it has to be /tmp
	// on vercel this files will be temporary, on every deployment the files have be re-written when they are need permanently
	//let folder = "/tmp";
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
	folder = folder + "/";

	//
	// to connect with the google api we call a function we created
	// we only need to connect one time if we want to fetch data from several sheets
	//console.log("starting to connect to google api....");

	const googleresponse = await connect_to_google_api();

	//
	// fetch data and write files for every single product category
	//console.log("starting product categories....");
	const data_for_single_product_category_pages = await fetch_google_sheet_data(
		"query-Produktkategorien_fuer_prodcat_pages",
		googleresponse
	);

	const write_single_product_category_files =
		await write_single_json_files_from_array(
			data_for_single_product_category_pages,
			folder + "product-categories",
			"term_slug"
		);
	const write_all_product_categories_in_one_file =
		await write_single_json_file_from_object_or_array(
			data_for_single_product_category_pages,
			folder + "product-categories/lists",
			"/all-product-categories.json"
		);

	const data_for_homepageslider = await fetch_google_sheet_data(
		"query-Produktkategorien_fuer_homepageslider",
		googleresponse
	);
	const write_list_for_homepageslider =
		await write_single_json_file_from_object_or_array(
			data_for_homepageslider,
			folder + "product-categories/lists",
			"/product-categories-list-for-homepageslider.json"
		);

	const data_for_product_category_slugs = await fetch_google_sheet_data(
		"query-all-product-category-slugs",
		googleresponse
	);
	const write_product_category_slugs =
		await write_single_json_file_from_object_or_array(
			data_for_product_category_slugs,
			folder + "product-categories/lists",
			"/product-category-slugs.json"
		);

	//console.log("product categories done !!!!!");

	//
	// fetch data and write files for every single product
	//console.log("starting product categories....");
	const data_for_single_product_pages = await fetch_google_sheet_data(
		"query-Produkte_fuer_singleproductpages",
		googleresponse
	);
	//console.log(data_for_single_product_pages);
	const write_single_product_files = await write_single_json_files_from_array(
		data_for_single_product_pages,
		folder + "products",
		"slug"
	);
	const write_all_products_in_one_file =
		await write_single_json_file_from_object_or_array(
			data_for_single_product_pages,
			folder + "products/lists",
			"/all-products.json"
		);
	const data_for_product_slugs = await fetch_google_sheet_data(
		"query-all-product-slugs",
		googleresponse
	);
	const write_product_Slug = await write_single_json_file_from_object_or_array(
		data_for_product_slugs,
		folder + "products/lists",
		"/all-product-slugs.json"
	);
	const data_for_onlineshop = await fetch_google_sheet_data(
		"query-Produkte_fuer_onlineshop",
		googleresponse
	);
	const write_list_for_onlineshop =
		await write_single_json_file_from_object_or_array(
			data_for_onlineshop,
			folder + "products/lists",
			"/product-list-for-page-onlineshop.json"
		);
	//
	// fetch data and write file with product list for sale
	//console.log("starting product list for sale....");
	const data_for_product_sale = await fetch_google_sheet_data(
		"query-Produkte_fuer_sale",
		googleresponse
	);
	const write_product_list_for_sale =
		await write_single_json_file_from_object_or_array(
			data_for_product_sale,
			folder + "products/lists",
			"/product-list-for-page-sale.json"
		);

	//
	// fetch data for page "produkte"
	const data_for_page_produkte = await fetch_google_sheet_data(
		"query-Produktkategorien-fuer_page_produkte",
		googleresponse
	);
	const write_product_list_for_page_produkte =
		await write_single_json_file_from_object_or_array(
			data_for_page_produkte,
			folder + "product-categories/lists",
			"/product-category-list-for-page-produkte.json"
		);

	//
	// built product lists for every product category, only instock products
	//
	// make a simple array with the produc category term_slugs, we can use an array that we already build before
	const term_slugArr = [];
	data_for_single_product_category_pages.map((row, i) => {
		term_slugArr.push(row.term_slug);
	});
	// fetch all products that are instock
	const data_for_product_lists = await fetch_google_sheet_data(
		"query-Produkte-for-loops-only-instock",
		googleresponse
	);

	term_slugArr.map((row, i) => {
		const prodList = [];
		data_for_product_lists.map((prodrow, ii) => {
			if (row == prodrow.term_slug) {
				prodList.push(prodrow);
			}
		});
		fs.writeFile(
			folder +
				"/products/lists/product-list-for-all-products-instock-of-product-category-" +
				row +
				".json",
			JSON.stringify(prodList),
			function (err, data) {
				//if (err) throw err;
				//console.log(location + " wurde erstellt");
			}
		);
	});
	//
	//--------------------------------------------------------------------------------------------

	//
	// translations data - used for several pages and components
	const data_for_translations = await fetch_google_sheet_data(
		"translations",
		googleresponse
	);
	const write_translations = await write_single_json_file_from_object_or_array(
		data_for_translations,
		folder + "special",
		"/translations.json"
	);

	// translations data - page agbs
	const data_for_translations_page_agbs = await fetch_google_sheet_data(
		"translations_page_agbs",
		googleresponse
	);
	const write_translations_page_agbs =
		await write_single_json_file_from_object_or_array(
			data_for_translations_page_agbs,
			folder + "special",
			"/translations_page_agbs.json"
		);

	// translations data - page widerruf
	const data_for_translations_page_widerruf = await fetch_google_sheet_data(
		"translations_page_widerruf",
		googleresponse
	);
	const write_translations_page_widerruf =
		await write_single_json_file_from_object_or_array(
			data_for_translations_page_widerruf,
			folder + "special",
			"/translations_page_widerruf.json"
		);
	// translations data - page zahlungsweisen
	const data_for_translations_page_zahlungsweisen =
		await fetch_google_sheet_data(
			"translations_page_zahlungsweisen",
			googleresponse
		);
	const write_translations_page_zahlungsweisen =
		await write_single_json_file_from_object_or_array(
			data_for_translations_page_zahlungsweisen,
			folder + "special",
			"/translations_page_zahlungsweisen.json"
		);
	// translations data - component TabInfoText
	const data_for_translations_component_TabInfoText =
		await fetch_google_sheet_data(
			"translations_component_TabInfoText",
			googleresponse
		);
	const write_translations_component_TabInfoText =
		await write_single_json_file_from_object_or_array(
			data_for_translations_component_TabInfoText,
			folder + "special",
			"/translations_component_TabInfoText.json"
		);
	// translations data - component Text1 and component Text2
	const data_for_translations_component_Text1Text2 =
		await fetch_google_sheet_data(
			"translations_component_Text1Text2",
			googleresponse
		);
	const write_translations_component_Text1Text2 =
		await write_single_json_file_from_object_or_array(
			data_for_translations_component_Text1Text2,
			folder + "special",
			"/translations_component_Text1Text2.json"
		);

	//
	// options data
	const data_for_options = await fetch_google_sheet_data(
		"options",
		googleresponse
	);
	const write_options = await write_single_json_file_from_object_or_array(
		data_for_options,
		folder + "special",
		"/options.json"
	);

	return "funktioniert prima!!!";
	// (
	// 		//
	// 		// we do the same for sheet "Sprachen"
	// 		(range = "Sprachen")
	// 	);
	//console.log("fetching sheet Sprachen....");
	const Sprachen_raw = await googleresponse.spreadsheets.values.get({
		spreadsheetId: "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k",
		range,
		majorDimension: "ROWS",
	});



	const Sprachen = json_Array_of_object_formatter(Sprachen_raw.data.values);



	// writing all files with product categories
	const writeProduktkategorien = await write_for_product_categories(
		Produktkategorien,
		folder,
		Sprachen
	);

	//
	// then we fetch options
	range = "options";

	const options_raw = await googleresponse.spreadsheets.values.get({
		spreadsheetId: "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k",
		range,
		majorDimension: "ROWS",
	});



	const options = json_Array_of_object_formatter(options_raw.data.values);



	const writeoptions = await write_for_options(folder, options);

	//
	// then we fetch translations
	range = "translations";

	const translations_raw = await googleresponse.spreadsheets.values.get({
		spreadsheetId: "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k",
		range,
		majorDimension: "ROWS",
	});


	//
	// all the reformatting for translations and write to a file is done in the following function
	const translations = await write_for_translations(folder, translations_raw);

	//
	// then we fetch Produkte
	range = "Produkte";

	const products_raw = await googleresponse.spreadsheets.values.get({
		spreadsheetId: "1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k",
		range,
		majorDimension: "ROWS",
	});



	const products = json_Array_of_object_formatter(products_raw.data.values);




	const writeproducts = await write_for_products(folder, products, Sprachen);



	// //range for locales
	// range = "Sprachen!B1:A20";
	// location = "/tmp/all-locales.json";

	// ergebnis = await connect_to_google_api(range, location);

	// // range for translations
	// range = "translations!B:E";
	// location = "/tmp/translations.json";

	// ergebnis = await connect_to_google_api(range, location);

	// range for options
	// range = "options!B:D";
	// location = "/tmp/options.json";

	// ergebnis = await connect_to_google_api(range, location);

	// // range for all products
	// range = "Produkte!A:DW";
	// location = "/tmp/all-products.json";

	// ergebnis = await connect_to_google_api(range, location);

	// //load the new product categories json file
	// fs.readFile(prod_cat_file_location, "utf-8", function (err, data) {
	// 	if (err) {
	// 		console.log(
	// 			"beim Lesen von " +
	// 				prod_cat_file_location +
	// 				" ist ein Fehler aufgetreten",
	// 			err
	// 		);
	// 		return;
	// 	}
	// 	// write a file for every produkt categories with all json items
	// 	let product_categories = JSON.parse(data);

	// 	// create product categorie folder
	// 	if (!fs.existsSync("/tmp/product-categories")) {
	// 		fs.mkdirSync("/tmp/product-categories");
	// 	}
	// 	//console.log(product_categories);
	// 	product_categories.map((prodcat, i) => {
	// 		let write_file = write_json_Files(
	// 			"/tmp/product-categories/" + prodcat.term_slug + ".json",
	// 			JSON.stringify(prodcat)
	// 		);
	// 		console.log(
	// 			"/tmp/product-categories/" +
	// 				prodcat.term_slug +
	// 				".json wurde erfolgreich erstellt"
	// 		);
	// 	});
	// 	write_product_files(location, product_categories);
	// });
}
getData();

function write_product_files(location, product_categories) {
	// read the new product list file
	fs.readFile(location, "utf-8", function (err, data) {
		if (err) {

				"beim Lesen von " + location + " ist ein Fehler aufgetreten",
				err
			);
			return;
		}
		let products = JSON.parse(data);
		const products_length = products.length;
		const prodcat_length = product_categories.length;

		// create the subfolder for the products
		if (!fs.existsSync("/tmp/products")) {
			fs.mkdirSync("/tmp/products");
		}

		// write a single file for every product
		products.map((prodcat, i) => {
			let write_file = write_json_Files(
				"/tmp/products/" + prodcat.slug + ".json",
				JSON.stringify(prodcat)
			);

				"/tmp/products/" + prodcat.slug + ".json wurde erfolgreich erstellt"
			);
		});

		//  write a list of all products available in the online shop
		let new_list = "[";
		products.map((item, i) => {
			if ((item.stock_status == "instock") & (item.online_bestellbar == "1")) {
				new_list += JSON.stringify(item) + ",";
			}
		});
		new_list += "]";
		// remove last ',' of string
		new_list = new_list.replace(/},]/g, "}]");

		// parse string to array
		new_list = JSON.parse(new_list);

		// sort the array after "order_shop" field
		new_list = new_list.sort((s1, s2) => {
			return s1.order_shop - s2.order_shop;
		});

		//stringify the array
		new_list = JSON.stringify(new_list);
		let write_file = write_json_Files(
			"/tmp/all-products-onlineshop.json",
			new_list
		);

		// todo - write list of products in stock on sale
		new_list = "[";
		products.map((item, i) => {
			if ((item.stock_status == "instock") & item.sale_price) {
				new_list += JSON.stringify(item) + ",";
			}
		});
		new_list += "]";
		// remove last ',' of string
		new_list = new_list.replace(/},]/g, "}]");

		// parse string to array
		new_list = JSON.parse(new_list);

		// sort the array after "order_shop" field
		new_list = new_list.sort((s1, s2) => {
			return s1.order_sale_loop - s2.order_sale_loop;
		});

		//stringify the array
		new_list = JSON.stringify(new_list);

		write_file = write_json_Files("/tmp/all-products-sale.json", new_list);

		// write list of all product category slugs
		new_list = "[";
		// german
		product_categories.map((prodcat, i) => {
			new_list +=
				'{"term_slug":' +
				JSON.stringify(prodcat.term_slug) +
				',"locale": "de"},';
		});
		// english
		product_categories.map((prodcat, i) => {
			new_list +=
				'{"term_slug":' +
				JSON.stringify(prodcat.term_slug) +
				',"locale": "en"},';
		});
		//french
		product_categories.map((prodcat, i) => {
			new_list +=
				'{"term_slug":' +
				JSON.stringify(prodcat.term_slug) +
				',"locale": "fr"},';
		});
		new_list += "]";
		// remove last ',' of string
		new_list = new_list.replace(/},]/g, "}]");
		write_file = write_json_Files(
			"/tmp/all-product-categorie-slugs.json",
			new_list
		);

			"/tmp/all-product-categorie-slugs.json wurde erfolgreich erstellt"
		);

		// write list of all product slugs
		new_list = "[";
		// german
		products.map((prodcat, i) => {
			new_list +=
				'{"slug":' + JSON.stringify(prodcat.slug) + ',"locale": "de"},';
		});
		// english
		products.map((prodcat, i) => {
			new_list +=
				'{"slug":' + JSON.stringify(prodcat.slug) + ',"locale": "en"},';
		});
		// french
		products.map((prodcat, i) => {
			new_list +=
				'{"slug":' + JSON.stringify(prodcat.slug) + ',"locale": "fr"},';
		});
		new_list += "]";
		// remove last ',' of string
		new_list = new_list.replace(/},]/g, "}]");
		write_file = write_json_Files("/tmp/all-product-slugs.json", new_list);


		// todo - write list of products in stock for every product category

		// looping through the product categories
		product_categories.map((prodcat, i) => {
			new_list = "[";

			products.map((item, i) => {
				if (
					(item.stock_status == "instock") &
					(item.term_slug == prodcat.term_slug)
				) {
					new_list += JSON.stringify(item) + ",";
				}
			});

			new_list += "]";
			// remove last ',' of string
			new_list = new_list.replace(/},]/g, "}]");

			// write a file for every product category
			write_file = write_json_Files(
				"/tmp/all-products-instock-of-product-categorie-" +
					prodcat.term_slug +
					".json",
				new_list
			);

				"/tmp/all-products-instock-of-product-categorie-" +
					prodcat.term_slug +
					".json wurde erstellt"
			);
		});
	});
}
