import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ListboxForProdCat({
	arr,
	infotextDe,
	infotextFr,
	infotextEn,
}) {
	//console.log(arr);
	const [selected, setSelected] = useState(arr[0]);
	const [prodcatupdate, setProdcatupdate] = useState(false);

	async function updateproductcategory() {
		const str = `?termslug=${
			selected.term_slug
		}&infotext_de=${encodeURIComponent(
			infotextDe
		)}&infotext_en=${encodeURIComponent(
			infotextEn
		)}&infotext_fr=${encodeURIComponent(infotextFr)}`;

		setProdcatupdate("updating");
		const data = await fetch(
			`/api/supabase/update-infotext-all-products-of-productcategorie${str}`
		);
		const res = await data.json();
		const info =
			res.error == null ? "done" : "ein Fehlder ist aufgetreten: " + error;
		setProdcatupdate(info);
	}
	return (
		<div className="bg-slate-200 p-4">
			{" "}
			update all products of a product category
			<div className=" w-72 ">
				<Listbox value={selected} onChange={setSelected}>
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">{selected.term_slug}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{arr.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-amber-100 text-amber-900" : "text-gray-900"
											}`
										}
										value={person}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{person.term_slug}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			</div>{" "}
			<button
				className="btn btn-outline"
				onClick={() => updateproductcategory()}
			>
				update productcategory
			</button>
			{prodcatupdate}
		</div>
	);
}
