"use client";
import { useState } from "react";

export default function ButtonDeleteAndInsertProducts() {
	const [loading, setLoading] = useState("waiting");
	const [deleting, setDelete] = useState();
	async function clickhandler() {
		setDelete("");
		setLoading("loading");
		const result = await fetch("/api/supabase/upsert-products", {
			cache: "no-store",
		});
		const upsertdata = await result.json();
		if (upsertdata.error == null) {
			setLoading("upsertdone");
		} else {
			setLoading(upsertdata.error);
		}
		const upsertid = upsertdata.upsertid;
		// const deleteupdatedslug =
		// 	upsertdata.error == null
		// 		? await deleteproductwithchangedslug(upsertid)
		// 		: "";

		//console.log(result);
	}

	// async function deleteproductwithchangedslug(upsertid) {
	// 	setDelete("deleting");
	// 	const result = await fetch(
	// 		"/api/supabase/delete-products-that-do-not-match-upsert-id?upsertid=" +
	// 			upsertid,
	// 		{
	// 			cache: "no-store",
	// 		}
	// 	);
	// 	const deletetdata = await result.json();
	// 	//console.log(deletetdata);

	// 	if (deletetdata) {
	// 		setDelete("done");
	// 	}
	// }
	return (
		<>
			<button
				onClick={() => {
					clickhandler();
				}}
				className="btn btn-warning mx-4"
			>
				upsert products
			</button>
			{loading == "loading" ? (
				<>
					... upserting ...{" "}
					<span className="loading loading-spinner loading-sm"></span>
				</>
			) : loading == "upsertdone" ? (
				<span className="text-green-600 font-bold">upsert done</span>
			) : loading == "waiting" ? (
				""
			) : (
				" upsert error:" + loading + ""
			)}
			<span className="mx-3"></span>
			{deleting == "deleting" ? (
				<>
					... nach Produkten suchen bei denen der Slug geändert wurde ...{" "}
					<span className="loading loading-spinner loading-sm"></span>
				</>
			) : deleting == "done" ? (
				<span className="text-green-600 font-bold">
					eventuelle alte Einträge entfernt
				</span>
			) : (
				""
			)}
		</>
	);
}
