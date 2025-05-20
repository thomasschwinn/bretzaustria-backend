import { supabase } from "@/lib/supabaseClient";

const listOfColumnsToFetch = `title,
productimage,
slug,
stock_status,

price,
sale_price,
slider2___, slider3___
, slider4___, slider5___, slider6___, slider7___, slider8___,zeichnung_1___,zeichnung_2___


`;

export async function fetchProductsSale(cols) {
	let list;
	if (cols == "all") {
		list = "*";
	} else {
		list = listOfColumnsToFetch;
	}

	//setIsLoadingDetail("products");
	const { data, error } = await supabase
		.from("produkte")
		//.select("slug, bezugsstoff_1(slug)")
		.select(list)
		.eq("stock_status", "instock")
		.gt("sale_price", 1)
		.order("order_sale_loop", { ascending: true });

	return { data: data, error: error };
}
export async function fetchProductsProdCat(prodCat, cols) {
	let list;
	if (cols == "all") {
		list = "*";
	} else {
		list = listOfColumnsToFetch;
	}
	//setIsLoadingDetail("products");
	const { data, error } = await supabase
		.from("produkte")
		//.select("slug, bezugsstoff_1(slug)")
		.select(list)
		.eq("termslug", prodCat)

		.order("stock_status", { ascending: true })
		.order("order_in_product_category_loop", { ascending: true });

	return { data: data, error: error };
}
export async function fetchProductsShop(cols) {
	let list;
	if (cols == "all") {
		list = "*";
	} else {
		list = listOfColumnsToFetch;
	}
	//setIsLoadingDetail("products");
	const { data, error } = await supabase
		.from("produkte")
		//.select("slug, bezugsstoff_1(slug)")
		.select(list)
		.eq("_online_bestellbar", true)
		.order("stock_status", { ascending: true })
		.order("order_shop", { ascending: true });

	return { data: data, error: error };
}

export async function fetchListOfColumnsFromProducts() {
	//setIsLoadingDetail("products");
	const { data, error } = await supabase
		.from("produkte")
		//.select("slug, bezugsstoff_1(slug)")
		.select()
		.limit(1)
		.single();

	const dataCols = Object.keys(data);
	const columns = [];
	dataCols.map((row, i) => {
		if (row == "data") {
			return;
		}
		columns.push(row);
	});
	//console.log(columns);

	return { data: columns, error: error };
}
export async function fetchListOfProducts() {
	//setIsLoadingDetail("products");
	const { data, error } = await supabase
		.from("produkte")
		//.select("slug, bezugsstoff_1(slug)")
		.select()
		.limit(1)
		.single();

	const dataCols = Object.keys(data);
	const columns = [];
	dataCols.map((row, i) => {
		if (row == "data") {
			return;
		}
		columns.push(row);
	});
	//console.log(columns);

	return { data: columns, error: error };
}
