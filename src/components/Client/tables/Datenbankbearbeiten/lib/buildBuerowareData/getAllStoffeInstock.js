import { supabase } from "@/lib/supabaseClient";
export async function getAllStoffeInstock() {
	const {
		data: stoffe,
		count: anzahlStoffe,
		error: stoffeError,
	} = await supabase
		.from("_a_stoffe")
		.select(
			"title,stoffartgruppe(stoffartgruppe,text,stoffpreisgruppe(stoffpreisgruppe,preis))",
			{ count: "exact" }
		)
		.eq("instock", true)
		.order("title", { ascending: true });
	return { stoffe, anzahlStoffe, stoffeError };
}
