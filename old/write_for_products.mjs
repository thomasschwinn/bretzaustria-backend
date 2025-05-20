import fs from "fs";
import fsPromises from "fs/promises";

export async function write_for_products(folder, products, locales) {
	//
	// create a subfolder for the product files
	let subfolder = folder + "products";
	if (!fs.existsSync(subfolder)) {
		fs.mkdirSync(subfolder);
	}
	subfolder = subfolder + "/";

	//
	// first we write a file with the complete data of the sheet
	let file = subfolder + "all-products.json";
	fs.writeFile(file, JSON.stringify(products), function (err, data) {
		if (err) {
			throw err;
		}
	});

	//
	// then we write a single file for every product
	const dataForSingleProduct = JSON.parse(JSON.stringify(products));
	const singleprodcatfiles = await write_single_product_files(
		subfolder,
		dataForSingleProduct
	);

	//
	// then we write a file with for every product-categorie with all products of that product-categorie that are in stock
	const dataForProductLoops = JSON.parse(JSON.stringify(products));
	const productloops = await write_product_loop_files(
		subfolder,
		dataForProductLoops
	);
	//
	// then we write a file with all product slugs
	const dataForProductSlugs = JSON.parse(JSON.stringify(products));
	const productslugs = await write_all_product_slugs(
		subfolder,
		dataForProductLoops,
		locales
	);

	return;
}

async function write_single_product_files(subfolder, dataForSingleProduct) {
	dataForSingleProduct.map((row, i) => {
		// set the filename for product categories
		let thisFileName;

		thisFileName = "product-" + row.slug + ".json";

		const file = subfolder + thisFileName;
		const stringToWrite = JSON.stringify(row);
		fs.writeFile(file, stringToWrite, function (err, data) {
			//if (err) throw err;
			//console.log(location + " wurde erstellt");
		});
		//console.log(thisFileName + " wurde geschrieben");
	});
	return;
}

async function write_product_loop_files(subfolder, dataForProductLoops) {
	const jsonData = await fsPromises.readFile(
		"/tmp/product-categories/all-product-category-slugs-helper.json"
	);
	const theSlugs = JSON.parse(jsonData);
	//console.log(theSlugs);

	theSlugs.map((slug, i) => {
		//console.log(slug);
		const newArr = [];
		dataForProductLoops.map((row, i) => {
			if (slug == row.term_slug && row.stock_status == "instock") {
				newArr.push({
					title: row.title,
					slug: row.slug,
					order: row.order_in_product_category_loop,
					price: row.price,
					sale_price: row.sale_price,
					slider1: row.slider1,
					lieferzeit: row.lieferzeit,
				});
			}
		});
		const file =
			subfolder + "all-products-instock-of-product-category-" + slug + ".json";
		//console.log(file);
		fs.writeFile(file, JSON.stringify(newArr), function (err, data) {
			//if (err) throw err;
			//console.log(location + " wurde erstellt");
		});
	});
	return;
}

async function write_all_product_slugs(subfolder, data, locales) {
	const newArr = [];
	const anotherArr = [];
	//console.log(data);
	locales.map((localesrow, i) => {
		data.map((row, i) => {
			newArr.push({ slug: row.slug, locale: localesrow.locale });

			// and we create another array only with slugs
			anotherArr.push(row.slug);

			//console.log(thisFileName + " wurde geschrieben");
		});
	});
	const file1 = subfolder + "all-product-slugs.json";
	fs.writeFile(file1, JSON.stringify(newArr), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});
	const file2 = subfolder + "all-product-slugs-helper.json";
	fs.writeFile(file2, JSON.stringify(anotherArr), function (err, data) {
		//if (err) throw err;
		//console.log(location + " wurde erstellt");
	});

	// and create a json file just with the term_slugs, that will help us product loops later

	return;
}
