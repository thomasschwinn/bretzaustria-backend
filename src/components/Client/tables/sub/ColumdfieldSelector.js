"use client";

import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ColumdfieldSelector({
	fieldSelectArr,
	columnselector,
	setColumselector,
	selectedHandsonTableLayout,
	setSelectedHandsonTableLayout,
}) {
	useEffect(() => {
		setColumselector(selectedHandsonTableLayout.fields);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedHandsonTableLayout]);

	//console.log(selectedHandsonTableLayout);
	//console.log(columnselector);

	return (
		<>
			<div className="w-72  ">
				<Listbox
					value={selectedHandsonTableLayout}
					onChange={setSelectedHandsonTableLayout}
				>
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">
								{selectedHandsonTableLayout.name}
							</span>
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
							<Listbox.Options className="absolute z-[9999999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{fieldSelectArr.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-amber-100 text-amber-900" : "text-gray-900"
											}`
										}
										value={person}
									>
										{({ selectedHandsonTableLayout }) => (
											<>
												<span
													className={`block truncate ${
														selectedHandsonTableLayout
															? "font-medium"
															: "font-normal"
													}`}
												>
													{person.name}
												</span>
												{selectedHandsonTableLayout ? (
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
			</div>
			{selectedHandsonTableLayout.name == "Stoffe Farben" ? (
				<div className="py-2 text-red-600">
					Farben werden ausschließlich bei Stoffen definiert
				</div>
			) : (
				<div className="py-2 text-red-600">{` `}</div>
			)}
		</>
	);
}
