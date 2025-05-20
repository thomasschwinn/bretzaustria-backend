import { supabase } from "@/lib/supabaseClient";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const filterForProd = searchParams.get("filterForProd");

	let filterVar;
	let filterField;

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

	//return { data, error };
	return NextResponse.json({ data: "asdf", error: "ASF" });
}
