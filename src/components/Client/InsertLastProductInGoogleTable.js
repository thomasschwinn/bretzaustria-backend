"use client";
import { useState } from "react";

const people = [];

export default function UpdateOneProduct() {
	const [loading, setLoading] = useState();
	async function clickhandler() {
		setLoading("loading");
		const theslug = document.querySelector("#productsluginput").value;
		const result = await fetch(
			"/api/supabase/update-one-product?slug=" + theslug,
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
				insert last product in google table
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
