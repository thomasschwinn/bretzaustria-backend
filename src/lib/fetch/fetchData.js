// export const config = {
// 	api: {
// 		bodyParser: {
// 			sizeLimit: "5mb",
// 		},
// 		responseLimit: "8mb",
// 	},
// };

export async function fetchData(dataToFetch, dataToSearch, locale) {
	if (dataToSearch === undefined) {
	}
	if (locale === undefined) {
	}

	// define api routes
	let apiRoute;

	const apiForAllTranslations =
		"https://api.bretz-austria.at/api/gva/get-translations-by-key-and-locale";

	const apiListForProduktePageFilter =
		"https://api.bretz-austria.at/api/gva/get-list-for-produkte-page";
	const apiSingleProduct =
		"https://api.bretz-austria.at/api/gva/get-single-product";

	const apiSingleProductCategory =
		"https://api.bretz-austria.at/api/gva/get-single-product-category";
	const apiHomepageslides =
		"https://api.bretz-austria.at/api/gva/get-homepage-slider";
	const apiProductListByTermSlug =
		"https://api.bretz-austria.at/api/gva/get-list-of-products-by-termslug";

	const apiOptions = "https://api.bretz-austria.at/api/get-options";

	const apiProductCategorieSlugs =
		"https://api.bretz-austria.at/api/gva/get-all-product-category-slugs?aasdf";

	const apiProductSlugs =
		"https://api.bretz-austria.at/api/gva/get-all-product-slugs?eff";

	// const apiAllProducts =
	// 	"https://api.bretz-austria.at/api/get_all_products_raw";

	//const apiRawProducts = `${getBaseUrl()}api/all-products-raw`;

	// const apiRawProductCategories =
	// 	"https://api.bretz-austria.at/api/get_all_product_categories_raw";

	const apiTranslations =
		"https://api.bretz-austria.at/api/get-translations-query-by-keys"; // needs a query string like ?keys=?keys=Alle%20Produkte,Shop
	//console.log(apiRawProducts);//console.log

	const apiShop = "https://api.bretz-austria.at/api/gva/get-all-shop-products";
	const apiKissenShop =
		"https://api.bretz-austria.at/api/gva/get-kissen-shop-products";
	const apiStoffeShop =
		"https://api.bretz-austria.at/api/gva/get-stoffe-shop-products";
	const apiZubehoerShop =
		"https://api.bretz-austria.at/api/gva/get-moebelzubehoer-shop-products";

	const apiSale =
		"https://api.bretz-austria.at/api/gva/get-list-of-sale-products";

	if (dataToFetch == "alltranslations") {
		apiRoute = apiForAllTranslations + "?keys=allkeys&locale=" + locale;
		//console.log(apiRoute);
	}
	if (dataToFetch == "shop") {
		apiRoute = apiShop;
	}
	if (dataToFetch == "shopkissen") {
		apiRoute = apiKissenShop;
	}
	if (dataToFetch == "shopstoffe") {
		apiRoute = apiStoffeShop;
	}
	if (dataToFetch == "shopzuehoer") {
		apiRoute = apiZubehoerShop;
	}
	if (dataToFetch == "homepageslides") {
		apiRoute = apiHomepageslides;
	}
	if (dataToFetch == "sale") {
		apiRoute = apiSale;
	}
	if (dataToFetch == "listForProduktePageFilter") {
		apiRoute = apiListForProduktePageFilter;
	}
	if (dataToFetch == "ProductListByTermSlug") {
		apiRoute = apiProductListByTermSlug + "?termslug=" + dataToSearch;
	}
	if (dataToFetch == "options") {
		apiRoute = apiOptions;
	}
	if (dataToFetch == "ProductCategorieSlugs") {
		apiRoute = apiProductCategorieSlugs;
	}
	if (dataToFetch == "ProductSlugs") {
		apiRoute = apiProductSlugs;
	}
	if (dataToFetch == "allProducts") {
		apiRoute = apiAllProducts;
	}
	if (dataToFetch == "singleProduct") {
		apiRoute = apiSingleProduct + "?slug=" + dataToSearch;
	}
	if (dataToFetch == "singleProductCategory") {
		apiRoute = apiSingleProductCategory + "?slug=" + dataToSearch;
	}
	if (dataToFetch == "RawProducts") {
		apiRoute = apiRawProducts;
	}

	if (dataToFetch == "allProductCategories") {
		apiRoute = apiRawProductCategories;
	}
	let localestring = "";
	if (dataToFetch == "translations") {
		if (locale) {
			localestring = "&locale=" + locale;
		}
		apiRoute = apiTranslations + "?keys=" + dataToSearch + localestring;
	}

	const res = await fetch(apiRoute, { next: { revalidate: 300 } });
	const data = res.json();
	return data;
}
