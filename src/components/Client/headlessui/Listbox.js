"use client";

import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// const people = [
// 	{ name: "Wade Cooper" },
// 	{ name: "Arlene Mccoy" },
// 	{ name: "Devon Webb" },
// 	{ name: "Tom Cook" },
// 	{ name: "Tanya Fox" },
// 	{ name: "Hellen Schmidt" },
// ];

export default function HeadlessUiListbox({
	listBoxArr,
	className,
	selectedTable,
	setSelectedTable,
	filterForTable,
	setFilterForTable,
	range,
	setRange,
	filterForProd,
	setFilterForProd,
}) {
	const people = listBoxArr;
	//console.log(selectedTable);
	const [selected, setSelected] = useState(people[0]);
	useEffect(() => {
		if (selectedTable) {
			setSelectedTable(selected);
		}
		if (filterForTable) {
			setFilterForTable(selected);
		}
		if (range) {
			setRange(selected);
		}
		if (filterForProd) {
			setFilterForProd(selected);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	useEffect(() => {
		if (listBoxArr[0] == "Select a product") {
			setSelected(listBoxArr[0]);
		}
	}, [listBoxArr]);

	return (
		<Listbox
			value={selected}
			onChange={setSelected}
			className="w-72 z-[99999] inline-block"
		>
			<div className="relative mt-1">
				<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
					<span className="block truncate">{selected}</span>
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
					<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
						{people.map((person, personIdx) => (
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
											{person}
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
	);
}
