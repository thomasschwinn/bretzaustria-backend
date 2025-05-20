const handler = async (req, res) => {
	//console.log(process.env.BRETZAUSTRIAURL);
	//console.log(req.body.record);
	//console.log("trigger triggered");
	const url = process.env.BRETZAUSTRIAURL;
	const slug = req.body.record.slug;
	const termslug = req.body.record.termslug;

	// trigger to set for revalidation after next visit
	const revalidateProductTag = await fetch(
		`https://${url}/api/revalidatetag?tag=${slug}`
	);
	const resRev = await revalidateProductTag.json();

	// trigger to maintain the next visit
	const fetchtostartupdate_de = await fetch(
		`https://${url}/de/produkte/${slug}`
	);

	const fetchtostartupdate_en = await fetch(
		`https://${url}/en/produkte/${slug}`
	);
	const fetchtostartupdate_fr = await fetch(
		`https://${url}/fr/produkte/${slug}`
	);

	const revalidateProductCategorieTag = await fetch(
		`https://${url}/api/revalidatetag?tag=${termslug}`
	);
	const resRevProdCat = await revalidateProductCategorieTag.json();
	// trigger to update the productcategorie loops in all languages
	const fetchtostartupdate_catde = await fetch(
		`https://${url}/de/produkt-kategorie/${termslug}`
	);
	const fetchtostartupdate_caten = await fetch(
		`https://${url}/en/produkt-kategorie/${termslug}`
	);
	const fetchtostartupdate_catfr = await fetch(
		`https://${url}/fr/produkt-kategorie/${termslug}`
	);

	// sale
	const revalidateSaleTag = await fetch(
		`https://${url}/api/revalidatetag?tag=sale`
	);
	const resrevalidateSaleTag = await revalidateSaleTag.json();
	const fetchtostartupdate_sale_de = await fetch(`https://${url}/de/sale`);
	const fetchtostartupdate_sale_en = await fetch(`https://${url}/en/sale`);
	const fetchtostartupdate_sale_fr = await fetch(`https://${url}/fr/sale`);
	// shop
	const revalidateShopTag = await fetch(
		`https://${url}/api/revalidatetag?tag=shop`
	);
	const resrevalidateShopTag = await revalidateShopTag.json();
	const fetchtostartupdate_shop_de = await fetch(`https://${url}/de/shop`);
	const fetchtostartupdate_shop_en = await fetch(`https://${url}/en/shop`);
	const fetchtostartupdate_shop_fr = await fetch(`https://${url}/fr/shop`);

	res.send({
		slug: slug,
		termslug: termslug,
		revalidateResponseProduct: resRev,
		revalidateResponseProductCategorie: resRevProdCat,
		revalidateresponseSale: resrevalidateSaleTag,
		revalidateresponseShop: resrevalidateShopTag,
	});
};
export default handler;
