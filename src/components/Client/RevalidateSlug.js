"use client";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function RevalidateSlug() {
	const [query, setQuery] = useState("");

	const [loading, setLoading] = useState();
	const [revalidate1, setRevalidate1] = useState();
	async function clickhandler() {
		setLoading("loading");
		const theslug = document.querySelector("#sluginput").value;
		//console.log(theslug);
		const res = await fetch(
			"https://beta12345.bretz-austria.at/api/revalidatepath?path=" + theslug,
			{
				cache: "no-store",
			}
		);
		const data = await res.json();
		//console.log(data);
		if (data.revalidated == true) {
			setLoading("result");
		}
		//console.log(theslug);
		setRevalidate1("... fetching the product to start the update ...");
		// fetch the slug to start revalidation
		const rev1 = await fetch(
			"https://beta12345.bretz-austria.at/de/produkte/" + theslug,
			{
				cache: "no-store",
			}
		);
		const rev1data = await rev1.text();
		setRevalidate1("fetching done");

		//console.log(result);
	}

	return (
		<div className=" w-72">
			<input name="#sluginput" id="sluginput" />
			<button
				onClick={() => {
					clickhandler();
				}}
				className="btn btn-warning mx-4 my-8"
			>
				revalidate slug
			</button>
			{loading == "loading" ? (
				<>
					... revalidating ...{" "}
					<span className="loading loading-spinner loading-sm"></span>
				</>
			) : loading == "result" ? (
				"revalidation done"
			) : (
				""
			)}
			{setRevalidate1}
		</div>
	);
}
