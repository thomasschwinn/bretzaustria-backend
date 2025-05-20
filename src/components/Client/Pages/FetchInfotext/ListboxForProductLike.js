import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ListboxForProduct({
	arr,
	infotextDe,
	infotextFr,
	infotextEn,
}) {
	const [selected, setSelected] = useState();
	const [query, setQuery] = useState("");
	const [titleupdate, setTitleupdate] = useState("");
	//console.log(selected);

	async function updateproducts() {
		const thetitle = selected;
		const str = `?title=${encodeURIComponent(
			selected
		)}&infotext_de=${encodeURIComponent(
			infotextDe
		)}&infotext_en=${encodeURIComponent(
			infotextEn
		)}&infotext_fr=${encodeURIComponent(infotextFr)}`;
		//console.log(str);
		setTitleupdate("updating database");
		const data = await fetch(
			`/api/supabase/update-infotext-of-selected-product-title-like${str}`
		);
		const res = await data.json();
		const info =
			res.error == null
				? "database updated"
				: "ein Fehlder ist aufgetreten: " + error;
		setTitleupdate(info);
		setTitleupdate(info + ", now revalidating and updating pages");

		//console.log(res.slugs);
		// send an array of slug to start revalidation
		const slugs = res.slugs;
		const revalidation = await revalidateproducts(slugs);

		//console.log(res.error);
	}

	async function revalidateproducts(slugs) {
		//console.log(res);
		let responsetext = "";
		// running the revalidation and the updating
		for (let index = 0; index < slugs.length; index++) {
			// set the revalidation

			// push the update
			const update = await fetch(
				"/api/supabase/revalidate-and-push-to-update-one-product?tag=" +
					slugs[index]
			);
			const updateres = await update.json();
			responsetext +=
				"<br/> https://beta12345.bretz-austria.at/de/produkte/" +
				slugs[index] +
				"  updated";
			setTitleupdate(responsetext);
		}
		//console.log(titleArr);
	}
	useEffect(() => {}, [titleupdate]);
	//console.log(selected);
	return (
		<div className="bg-slate-200 p-4">
			update products that match the entered part of the name
			<div className=" w-72 ">
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs"
					onChange={(e) => setSelected(e.target.value)}
				/>
			</div>{" "}
			<button className="btn btn-outline" onClick={() => updateproducts()}>
				update products
			</button>
			<div dangerouslySetInnerHTML={{ __html: titleupdate }} />
		</div>
	);
}
