"use client";
import { useState } from "react";
export default function WriteInfotext({ termslug }) {
	const [loading, setLoading] = useState();
	async function clickhandler(term_slug) {
		setLoading("loading");
		const result = await fetch(
			"/api/supabase/scrap-productcategories-and-insert?termslug=" + termslug,
			{
				cache: "no-store",
			}
		);
		setLoading("result");
	}

	return (
		<div className="py-2">
			<button
				className="btn btn-warning mx-4"
				onClick={() => clickhandler(termslug)}
			>
				write scraped data {termslug}
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
		</div>
	);
}
