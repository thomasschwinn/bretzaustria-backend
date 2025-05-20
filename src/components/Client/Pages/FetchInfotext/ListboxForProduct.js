import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
	{ id: 1, name: "Wade Cooper" },
	{ id: 2, name: "Arlene Mccoy" },
	{ id: 3, name: "Devon Webb" },
	{ id: 4, name: "Tom Cook" },
	{ id: 5, name: "Tanya Fox" },
	{ id: 6, name: "Hellen Schmidt" },
];

export default function ListboxForProduct({
	arr,
	infotextDe,
	infotextFr,
	infotextEn,
}) {
	const [selected, setSelected] = useState();
	const [query, setQuery] = useState("");
	const [titleupdate, setTitleupdate] = useState("");
	//console.log(arr);

	const filteredPeople =
		query === ""
			? arr
			: arr.filter((person) =>
					person.title
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	async function updateproducts() {
		const thetitle = selected.title;
		const str = `?title=${encodeURIComponent(
			selected.title
		)}&infotext_de=${encodeURIComponent(
			infotextDe
		)}&infotext_en=${encodeURIComponent(
			infotextEn
		)}&infotext_fr=${encodeURIComponent(infotextFr)}`;
		//console.log(str);
		setTitleupdate("updating database");
		const data = await fetch(
			`/api/supabase/update-infotext-of-selected-product-title${str}`
		);
		const res = await data.json();
		const info =
			res.error == null
				? "database updated"
				: "ein Fehlder ist aufgetreten: " + error;
		setTitleupdate(info);
		setTitleupdate(info + ", now revalidating and updating pages");
		const revalidation = await revalidateproducts(thetitle);

		//console.log(res.error);
	}

	async function revalidateproducts(thetitle) {
		const data = await fetch("/api/supabase/get-all-product-slugs");
		const res = await data.json();
		let titleArr = [];
		res.map((row, i) => {
			if (row.title == thetitle) {
				titleArr.push(row.slug);
			}
		});

		// running the revalidation and the updating
		for (let index = 0; index < titleArr.length; index++) {
			// set the revalidation
			const revalidate = await fetch(
				"https://beta12345.bretz-austria.at/api/revalidatetag?tag=" +
					titleArr[index]
			);
			const revdata = await revalidate.json();
			setTitleupdate(
				titleupdate + "<br/> revalidate response: " + JSON.stringify(revdata)
			);

			// push the update
			const update = await fetch(
				"/api/supabase/revalidate-and-push-to-update-one-product?slug=" +
					titleArr[index]
			);
			const updateres = await update.json();
			setTitleupdate(
				titleupdate +
					"<br/> https://beta12345.bretz-austria.at/de/produkte/" +
					titleArr[index] +
					" has been updated"
			);
		}
		//console.log(titleArr);
	}
	//console.log(selected);
	return (
		<div className="bg-slate-200 p-4">
			{" "}
			update products that match the entered name
			<div className=" w-72 ">
				<Combobox value={selected} onChange={setSelected}>
					<div className="relative mt-1">
						<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
							<Combobox.Input
								className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
								displayValue={(person) => person.title}
								onChange={(event) => setQuery(event.target.value)}
							/>
							<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</Combobox.Button>
						</div>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}
						>
							<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{filteredPeople.length === 0 && query !== "" ? (
									<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
										Nothing found.
									</div>
								) : (
									filteredPeople.map((person) => (
										<Combobox.Option
											key={person.id}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active ? "bg-teal-600 text-white" : "text-gray-900"
												}`
											}
											value={person}
										>
											{({ selected, active }) => (
												<>
													<span
														className={`block truncate ${
															selected ? "font-medium" : "font-normal"
														}`}
													>
														{person.title}
													</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																active ? "text-white" : "text-teal-600"
															}`}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Combobox.Option>
									))
								)}
							</Combobox.Options>
						</Transition>
					</div>
				</Combobox>
			</div>{" "}
			<button className="btn btn-outline" onClick={() => updateproducts()}>
				update products
			</button>
			<div dangerouslySetInnerHTML={{ __html: titleupdate }} />
		</div>
	);
}
