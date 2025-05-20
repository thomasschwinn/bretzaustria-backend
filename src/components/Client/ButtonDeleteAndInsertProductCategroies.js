"use client";
import { useState } from "react";

export default function ButtonDeleteAndInsertProductCategroies() {
	const [loading, setLoading] = useState();
	async function clickhandler() {
		setLoading("loading");
		const result = await fetch(
			"/api/supabase/delete-and-insert-all-productcategories",
			{
				cache: "no-store",
			}
		);

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
				delete and import all product categories
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
