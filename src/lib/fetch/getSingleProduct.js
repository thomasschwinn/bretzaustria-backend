import { fetchData } from "./fetchData";

export async function getSingleProduct(slug) {
	// we fetch a big list of all products, because we have more than 1000 products in our google sheet
	// and the google api is limited to 300 requests per minute
	// nextjs caches the request for a minute so we have no problem when we request the whole list and filter
	// it on the server, only the deployment time may increase
	const products = await fetchData("RawProducts");
	//console.log(products);
	// for sync
	//console.log("products" + products);
	products.map((product, i) => {
		if (product.slug == slug) {
			//console.log(product);
			return product;
		}
	});
}
