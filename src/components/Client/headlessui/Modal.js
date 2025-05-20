"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import dynamic from "next/dynamic";

import HeadlessUiListbox from "@/components/Client/headlessui/Listbox";
import { fetchDataFromSupabase } from "@/components/Client/tables/Datenbankbearbeiten/lib/fetchDataFromSupabase";
//import TabelleStammDaten from "../tables/TabelleStammDaten";
const TabelleStammDaten = dynamic(() => import("../tables/TabelleStammDaten"), {
	ssr: false,
});
export default function HeadlessUIModal({
	openModal,
	setOpenModal,
	filterArr,
	setErrormessage,
	url,
}) {
	const [filterForTable, setFilterForTable] = useState("just a random string");
	const [filterForProd, setFilterForProd] = useState("Select a product");
	const [prodArr, setProdArr] = useState([]);
	//console.log(filterArr);
	function closeModal() {
		setOpenModal(false);
	}

	// function openModal() {
	// 	setIsOpen(true);
	// }
	//const [filterForTable, setFilterForTable] = useState(filterArr[0]);

	useEffect(() => {
		async function fetchData() {
			const { data, count, error } = await fetchDataFromSupabase(
				"_a_produkte",
				"title",
				0,
				99999999999,
				setErrormessage,
				"produktkategorie",
				filterForTable,
				"instock"
			);
			//	console.log(data);
			//console.log("fetch error" + error);
			//console.log("triggered");
			if (error) {
				return;
			}
			const arr = [];

			data.map((el, i) => {
				arr.push(el.title);
			});

			arr.sort();
			arr.unshift(`all ${filterForTable} products`);
			arr.unshift("Select a product");
			setProdArr([...arr]);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterForTable]);

	useEffect(() => {
		async function fetchData() {
			const { data, count, error } = await fetchDataFromSupabase(
				"_a_produkte",
				"title",
				0,
				99999999999,
				setErrormessage,
				"produktkategorie",
				filterForTable
			);
			//console.log(data);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterForProd]);

	return (
		<>
			{/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> */}

			<Transition appear show={openModal} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-[9999999999999999]"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full h-[90vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="flex gap-4 py-4">
										<HeadlessUiListbox
											listBoxArr={filterArr}
											filterForTable={filterForTable}
											setFilterForTable={setFilterForTable}
										/>
										{prodArr.length > 2 ? (
											<HeadlessUiListbox
												listBoxArr={prodArr}
												filterForProd={filterForProd}
												setFilterForProd={setFilterForProd}
											/>
										) : null}
									</div>

									<TabelleStammDaten
										filterForProd={filterForProd}
										filterForTable={filterForTable}
										url={url}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
