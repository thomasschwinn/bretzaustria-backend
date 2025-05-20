import { supabase } from "@/lib/supabaseClient";

export async function getTheProducts(filterForProd, filterForTable) {
	let filterVar;
	let filterField;
	//
	if (filterForProd.includes("products")) {
		filterField = "produktkategorie";
		filterVar = filterForTable;
	} else {
		filterField = "title";
		filterVar = filterForProd;
	}

	const { data, error } = await supabase
		.from("_a_produkte")
		.select(
			`
                *,
                produktkategorie(
                        *,standardfuss(*)
                        ,aufpreisfuss1(*)
                        ,aufpreisfuss2(*)
                        ,aufpreisfuss3(*)
                        ,aufpreisfuss4(*)
                        ,aufpreisfuss5(*)
                        ,hersteller(*)
                        )
                ,standardfuss(*)
        
                ,aufpreisfuss1(*)
                ,aufpreisfuss2(*)
                ,aufpreisfuss3(*)
                ,aufpreisfuss4(*)
                ,aufpreisfuss5(*)`
		)
		.eq(filterField, filterVar)
		.eq("produktkategorie", filterForTable);
	//console.log(data);
	return { data, error };
}
