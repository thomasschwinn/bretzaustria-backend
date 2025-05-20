import { supabase } from "@/lib/supabaseClient";
export async function fetchProdCats() {
	const { data: prodCat, error: prodCaterror } = await supabase
		.from("produktkategorien")
		//.select("slug, bezugsstoff_1(slug)")
		.select(`term_slug,term_name,currentmodel`)

		.order("currentmodel", { ascending: false })
		.order("term_name", { ascending: true });
	//console.log(prodCat, prodCaterror);

	const { data: saleVerf, error: saleVerferror } = await supabase
		.from("_sale_verfuegbarkeit")
		.select(`value`)
		.order("value", { ascending: true });

	const { data: stockstatusArr, error: stockstatusArrerror } = await supabase
		.from("_stock_status")
		.select(`value`)
		.order("value", { ascending: true });
	const { data: preisanhangArr, error: preisanhangArrerror } = await supabase
		.from("_preisanhang")
		.select(`value`)
		.order("value", { ascending: false });
	const { data: ausstellungsstueckArr, error: ausstellungsstueckArrerror } =
		await supabase
			.from("_ausstellungsstueck")
			.select(`value`)
			.order("value", { ascending: true });
	const { data: bezugsstoffauswahlArr, error: bezugsstoffauswahlArrerror } =
		await supabase
			.from("produkte")
			.select(`slug,title,productimage,stock_status`)
			.eq("termslug", "stoffe")
			// .eq("stock_status", "instock")
			.order("stock_status", { ascending: true })
			.order("title", { ascending: true });

	const bezugsstoffauswahlArrplus1 = [...bezugsstoffauswahlArr];
	bezugsstoffauswahlArrplus1.unshift({
		slug: null,
		title: null,
		productimage: null,
	});

	const { data: slugs, error: slugserror } = await supabase
		.from("produkte")
		.select("slug");

	const { data: farbenArr, error: farbenerror } = await supabase
		.from("_farben")
		.select();
	//.order("name", { ascending: true });

	const { data: kissenformArr, error: kissenformerror } = await supabase
		.from("_kissenform")
		.select("value")
		.order("value", { ascending: true });

	const { data: kissenmachartArr, error: kissenmacharterror } = await supabase
		.from("_kissenmachart")
		.select("value")
		.order("value", { ascending: true });
	const { data: produktartArr, error: produktartArrerror } = await supabase
		.from("produktart")
		.select("title_de,title_en,title_fr")
		.order("title_de", { ascending: true });
	let produktartArrHelper = false;
	//check if an element with title_de=null is in the array
	produktartArr.map((el, i) => {
		if (el.title_de == null) {
			produktartArrHelper = true;
		}
	});
	// if not, add it
	if (!produktartArrHelper) {
		produktartArr.unshift({ title_de: null });
	}

	//console.log(produktartArr);

	//console.log(farbenArr);
	const returnObj = {};

	if (
		prodCaterror ||
		saleVerferror ||
		stockstatusArrerror ||
		preisanhangArrerror ||
		ausstellungsstueckArrerror ||
		bezugsstoffauswahlArrerror ||
		slugserror ||
		farbenerror ||
		kissenformerror ||
		kissenmacharterror
	) {
		returnObj["error"] = {
			Produktart: produktartArrerror,
			Produktkategorien: prodCaterror,
			Saleverfuegbarkeit: saleVerferror,
			stockstatus: stockstatusArrerror,
			Preisanhang: preisanhangArrerror,
			Ausstellungsstueck: ausstellungsstueckArrerror,
			Bezugsstoffe: bezugsstoffauswahlArrerror,
			Slugs: slugserror,
			Farben: farbenerror,
			Kissenform: kissenformerror,
			Kissenmachart: kissenmacharterror,
		};
	} else {
		//console.log(bezugsstoffauswahlArrplus1);
		returnObj["data"] = {
			produktartArr: produktartArr,
			prodCat: prodCat,
			saleVerf: saleVerf,
			stockstatusArr: stockstatusArr,
			preisanhangArr: preisanhangArr,
			ausstellungsstueckArr: ausstellungsstueckArr,
			bezugsstoffauswahlArr: bezugsstoffauswahlArrplus1,
			slugs: slugs,
			farbenArr: farbenArr,
			kissenformArr: kissenformArr,
			kissenmachartArr: kissenmachartArr,
		};
	}

	return returnObj;
}
