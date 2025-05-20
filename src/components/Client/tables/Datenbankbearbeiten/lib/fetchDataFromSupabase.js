import { supabase } from "@/lib/supabaseClient";

export async function fetchDataFromSupabase(
	table,
	fields,
	rangeFrom,
	rangeTo,
	setErrormessage,
	columnToFilter,
	columnEqualsTo
) {
	//console.log(data, count, error);
	// if no filter variables are available, don't filter anything
	if (!columnEqualsTo && !columnToFilter) {
		const obj = await supabase
			.from(table)

			.select(fields, { count: "exact" })
			.range(rangeFrom, rangeTo);
		setErrormessage(obj.error);
		//console.log(obj);
		return obj;
	} else {
		// else filter...
		const obj = await supabase
			.from(table)

			.select(fields, { count: "exact" })
			.range(rangeFrom, rangeTo)
			.eq(columnToFilter, columnEqualsTo);
		setErrormessage(obj.error);

		return obj;
	}
}
