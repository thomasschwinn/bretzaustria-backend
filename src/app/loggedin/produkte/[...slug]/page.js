"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import AlteSeite from "@/components/Client/tables/AlteSeite";
import {
	fetchProductsSale,
	fetchProductsShop,
	fetchProductsProdCat,
	fetchListOfColumnsFromProducts,
} from "@/lib/fetchBackend/fetchProducts";
import { fetchProdCats } from "@/lib/fetchBackend/fetchProdCats";
import RenderProductTable from "@/components/Client/shadcn/table/RenderProductTable";
import Loop from "@/components/Client/Pages/produkte/Loop";
import { usePathname } from "next/navigation";
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUserStore } from "@/lib/zustand/useUserStore";
//import Table from "@/components/Client/tables/Table";
import dynamic from "next/dynamic";
const Preiserhoehung = dynamic(
	() => import("@/components/Client/tables/Preiserhoehung"),
	{
		ssr: false,
	}
);
//import Preiserhoehung from "@/components/Client/tables/Preiserhoehung";
// const TabelleKompletteDaten = dynamic(
// 	() => import("@/components/Client/tables/TabelleKompletteDaten"),
// 	{
// 		ssr: false,
// 	}
// );
//import TabelleKompletteDaten from "@/components/Client/tables/TabelleKompletteDaten";
const TabelleStammDaten = dynamic(
	() => import("@/components/Client/tables/TabelleStammDaten"),
	{
		ssr: false,
	}
);
//import TabelleStammDaten from "@/components/Client/tables/TabelleStammDaten";
import SuccessMessage from "@/components/Client/tables/sub/SuccessMessage";
import IsLoading from "@/components/Client/IsLoading";
export default function Produkte() {
	// set state
	const {
		dataObj,
		setDataObj,
		user,
		setProductlist,
		setProdCatList,
		error,
		setError,
		productlist,
		isMainLoading,
		setIsMainLoading,
		setIsLoadingFirst,
		loadingDetail,
		setIsLoadingDetail,
		setColumnListProducts,
		showSuccesMessage,
		setShowSuccessMessage,
		selected,
		setSelected,
		produktartArr,
		setproduktartArr,
	} = useUserStore();
	//console.log("triggered");
	const [isLoading, setIsLoading] = useState(true);

	const userRole = user ? user.role : null;
	const pathname = usePathname();

	async function fetchProductList() {
		setIsLoadingDetail("productlist");
		if (selected.term_slug == "sale") {
			const { data: prodsData, error: prodsError } = await fetchProductsSale();
			setProductlist(prodsData);
		} else if (selected.term_slug == "shop") {
			const { data: prodsData, error: prodsError } = await fetchProductsShop();
			setProductlist(prodsData);
		} else {
			//console.log(selected);
			const prodCat = selected.term_slug;
			//console.log(prodCat);
			const { data: prodsData, error: prodsError } = await fetchProductsProdCat(
				prodCat
			);
			//console.log(prodsData);
			setProductlist(prodsData);
		}
		setIsLoadingDetail("other lists");
	}

	useEffect(() => {
		setIsMainLoading(false);
		async function fetchThings() {
			//console.log("loading");

			// fetch productlist, initially we fetch the sale productlist because we might use this most of the times
			//const { data: prodsData, error: prodsError } = await fetchProductsSale();
			// fetch the names of the product categories
			const obj = await fetchProdCats();
			//console.log(obj);
			//console.log(prodsError);
			if (obj.error) {
				setError({ error: { othertables: obj.error } });
			} else {
				//setProductlist(prodsData);
				//setProdCat(obj.data.prodCat);
				const helper = JSON.parse(JSON.stringify(obj.data.prodCat));
				// add two more elements
				helper.unshift({
					term_slug: "shop",
					term_name: "Shop",
					currentmodel: true,
				});
				helper.unshift({
					term_slug: "sale",
					term_name: "Sale",
					currentmodel: true,
				});
				//console.log(obj.data);
				// we put the prodCatlist in one state because it will change
				setProdCatList(obj.data.prodCat);

				// we put all other lists in one object, because these lists never chang
				setDataObj({
					produktartArr: obj.data.produktartArr,
					prodCatList: obj.data.prodCat,
					mainListBoxList: helper,
					slugs: obj.data.slugs,
					saleVerfuegbarkeitArr: obj.data.saleVerf,
					stockstatusArr: obj.data.stockstatusArr,
					preisanhangArr: obj.data.preisanhangArr,
					ausstellungsstueckArr: obj.data.ausstellungsstueckArr,
					bezugsstoffauswahlArr: obj.data.bezugsstoffauswahlArr,
					farbenArr: obj.data.farbenArr,
					kissenformArr: obj.data.kissenformArr,
					kissenmachartArr: obj.data.kissenmachartArr,
				});
			}

			var colListProducts = await fetchListOfColumnsFromProducts();
			setColumnListProducts(colListProducts.data);
			//console.log(columnListProducts);
			setIsLoading(false);
			setIsLoadingFirst(false);
		}

		fetchThings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//console.log(isMainLoading);

	// is triggered when the main Selector changes
	useEffect(() => {
		fetchProductList();
		//setIsMainLoading(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	return (
		<>
			{showSuccesMessage && (
				<SuccessMessage setShowSuccessMessage={setShowSuccessMessage} />
			)}
			{isLoading ? (
				<p>Loading {loadingDetail}</p>
			) : error ? (
				<div className="prose  max-w-none">
					<h1 className="text-center text-red-600">
						an error occurred while fetching from table {loadingDetail}
					</h1>
					<pre className="text-red-600 font-bold">
						{" "}
						{JSON.stringify(error, null, 2)}
					</pre>
				</div>
			) : (
				<>
					<div className="top-16 w-72 ">
						<Listbox
							value={selected}
							onChange={(e) => {
								setSelected(e);
							}}
						>
							<div className="relative mt-1">
								<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
									<span className="block truncate">
										{selected ? selected.term_name : null}
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
									<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
										{dataObj.mainListBoxList.map((cat, personIdx) => (
											<Listbox.Option
												key={personIdx}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 ${
														!cat.currentmodel ? "bg-red-200" : null
													} pr-4 ${
														active
															? "bg-amber-100 text-amber-900"
															: "text-gray-900"
													} ${
														active && !cat.currentmodel ? " text-white" : null
													}`
												}
												value={cat}
											>
												{({ selected }) => (
													<>
														<span
															className={`block truncate ${
																selected ? "font-medium" : "font-normal"
															}`}
														>
															{cat.term_name}
														</span>
														{selected ? (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
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
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>Produkte bearbeiten</AccordionTrigger>
							<AccordionContent>
								<RenderProductTable fetchProductList={fetchProductList} />
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Loop bearbeiten</AccordionTrigger>
							<AccordionContent>
								<Loop
									//productlist={productlist}
									//selectedlist={selected}
									fetchProductList={fetchProductList}
									//user={user}
									//setShowSuccessMessage={setShowSuccessMessage}
									//setIsLoading={setIsLoading}
								/>
							</AccordionContent>
						</AccordionItem>
						{/* {userRole == "admin" && (
							<>
								<AccordionItem value="item-3">
									<AccordionTrigger>Preiserhöhung</AccordionTrigger>
									<AccordionContent>
										<Preiserhoehung
											//productlist={productlist}
											fetchProductList={fetchProductList}
											//selectedlist={selected}
											//setProductlist={setProductlist}
											//user={user}
											//setShowSuccessMessage={setShowSuccessMessage}
											//setIsLoading={setIsLoading}
										/>
									</AccordionContent>
								</AccordionItem>

								<AccordionItem value="item-4">
									<AccordionTrigger>alles in einer Tabelle</AccordionTrigger>
									<AccordionContent>
										<TabelleKompletteDaten
											//productlist={productlist}
											//prodCat={prodCat}
											//saleVerfuegbarkeitArr={saleVerfuegbarkeitArr}
											//ausstellungsstueckArr={ausstellungsstueckArr}
											//stockstatusArr={stockstatusArr}
											//preisanhangArr={preisanhangArr}
											//sale_verfuegbarkeitArr={saleVerfuegbarkeitArr}
											//allfabrics={bezugsstoffauswahlArr}
											fetchProductList={fetchProductList}
											//selectedlist={selected}
											//setProductlist={setProductlist}
											//user={user}
											//columnListProducts={columnListProducts}
											//setShowSuccessMessage={setShowSuccessMessage}
											//setIsLoading={setIsLoading}
										/>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-5">
									<AccordionTrigger>alte Seite</AccordionTrigger>
									<AccordionContent>
										<AlteSeite />
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-6">
									<AccordionTrigger>Stammdaten</AccordionTrigger>
									<AccordionContent>
										<TabelleStammDaten
											//productlist={productlist}
											//prodCat={prodCat}
											//saleVerfuegbarkeitArr={saleVerfuegbarkeitArr}
											//ausstellungsstueckArr={ausstellungsstueckArr}
											//stockstatusArr={stockstatusArr}
											//preisanhangArr={preisanhangArr}
											//sale_verfuegbarkeitArr={saleVerfuegbarkeitArr}
											//allfabrics={bezugsstoffauswahlArr}
											fetchProductList={fetchProductList}
											//selectedlist={selected}
											//setProductlist={setProductlist}
											//user={user}
											//columnListProducts={columnListProducts}
											//setShowSuccessMessage={setShowSuccessMessage}
											//setIsLoading={setIsLoading}
										/>
									</AccordionContent>
								</AccordionItem>
							</>
						)} */}
					</Accordion>
				</>
			)}
		</>
	);
}
