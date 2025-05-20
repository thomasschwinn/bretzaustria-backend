"use client";
import { useState } from "react";

export default function ButtonDeleteAndInsertTranslations() {
	const [loading, setLoading] = useState();
	async function clickhandler() {
		setLoading("loading");
		const result = await fetch(
			"/api/supabase/delete-and-insert-all-translations",
			{
				cache: "no-store",
			}
		);
		//console.log(result);
		setLoading("result");
		//console.log(result);
	}
	return (
		<>
			<button
				onClick={() => {
					clickhandler();
				}}
				className="btn btn-warning mx-4"
			>
				delete and import all translations
			</button>
			{loading == "loading" ? (
				<>
					... loading ...{" "}
					<span className="loading loading-spinner loading-sm"></span>
				</>
			) : loading == "result" ? (
				"Done"
			) : (
				""
			)}
		</>
	);
}
