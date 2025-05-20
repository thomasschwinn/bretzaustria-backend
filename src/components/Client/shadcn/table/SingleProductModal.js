"use client";
import Image from "next/image";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import CheckboxOne from "./SingleProductModalComponents/CheckboxOne";

const apikey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const fetcher = (url) => fetch(url).then((res) => res.json());
import { useUserStore } from "@/lib/zustand/useUserStore";
export default function SingleProductModal({
	//slug,
	// prodCat,
	// saleVerfuegbarkeitArr,
	// stockstatusArr,
	// preisanhangArr,
	// sale_verfuegbarkeitArr,
	// ausstellungsstueckArr,
	// bezugsstoffAuswahlArr,
	// setModalstate,
	fetchProductList,
}) {
	const { setIsLoading, slug, dataObj } = useUserStore();
	//console.log(slug);
	//bezugsstoffAuswahlArr.unshift({ slug: null, title: "" });
	//console.log(bezugsstoffAuswahlArr);
	const [accordiontype, setAccordiontype] = useState("single");
	const [accordItemOpen, setAccordItemOpen] = useState("item-0");
	const [updatestatus, setUpdatestatus] = useState(false);
	const [product, setProduct] = useState(null);
	const [updateproduct, setUpdateProduct] = useState([{ slug: slug }]);
	const [newProductWarning, setNewProductWarning] = useState(false);
	const [newProductCreated, setNewProductCreated] = useState(false);
	const [button, setButton] = useState(false);
	const [oldproductoutofstock, setOldproductoutofstock] = useState(false);

	const row = product ? product[0] : [];
	//console.log(row);
	//console.log(row);
	//const keys = Object.keys(row);
	//console.log(keys);
	const mainstr = `
	
	
	title,
	title_en,
	title_fr,
	brand,
	title_addition,
	title_pp_second_row_de,
	title_pp_second_row_en,
	title_pp_second_row_fr,
	slug,
	stock_status,
	termslug,
	termslug2,
	price,
	sale_price,
	preisanhang,
	sale_verfuegbarkeit,
	ausstellungsstueck,

	online_bestellbar,max_quantity_shop,
	lieferzeit,
	permanent_redirect`;
	const imageStr = `productimage,slider2___,
	slider3___,
	slider4___,
	slider5___,
	slider6___,
	slider7___,
	slider8___,zeichnung_1___,zeichnung_2___`;
	const sizesbhtlStr = `
	size_breite_cm,
	size_tiefe_cm,
	size_hoehe_cm,
	size_laenge_cm,
	size_sitzhoehe_cm,
	size_sitztiefe_cm,
	size_durchmesser_cm,
	size_sitzflaeche-breite_cm,
	size_fus_cm,
	size_sitzflaeche_qm,
	size_liegeflaeche_qm
	`;
	const sizescarpets = `size_teppich_faktor,
	size_min_groesse_cm,
	size_max_groesse_cm,
	size_stoff_breite_cm
	`;
	const sizesstoff = `size_stoff_verarbeitungsbreite_cm,

	size_stoff_details_gesamtzusammensetzung,
	size_stoff_details_grund,
	size_stoff_details_flor,
	size_stoff_details_zusatztext,

	size_stoff_details_gewicht_pro_qm_gramm,
	size_stoff_details_scheuertouren,
	size_stoff_details_pillingbildung,

	size_stoff_details_lichtechtheit,
	size_stoff_details_pflegeleichtigkeit`;
	const sizestext = `
	sizeVortext,
	sizeVortext_en,
	sizeVortext_fr,
	sizeNachtext,

	sizeNachtext_en,
sizeNachtext_fr`;

	const sizesbed = `size_matratzenlaenge_cm,
	size_matratzenbreite_cm,
	size_paneelenbreite_cm,
	size_paneelenhoehe_cm,

	size_rahmenbreite_cm,
	size_rahmentiefe_cm,
	size_gesamttiefeinklpaneele_cm,
	size_liegehoehe_standard_cm,

	size_liegehoehe_boxspring_cm`;
	const infotext = `
	infotab_vortext,infotext_de,infotab_Nachtext,
	infotab_vortext_en,infotext_en,infotab_Nachtext_en,
	infotab_vortext_fr,infotext_fr,infotab_Nachtext_fr`;

	const bezugsstoff = `
	bezugsstoff_1,
	bezugsstoff_2,
	bezugsstoff_3,
	bezugsstoff_4,
	bezugsstoff_5
	
	`;
	const farben = `farbe1___,
	farbe2___,
	farbe3___,
	farbe4___,
	farbe5___,
	farbe6___,
	farbe7___,
	farbe8___`;

	const kissen = ` kissenform,
        machart,
        reissverschluss,
        stoffdetails`;

	const kissenArr = kissen.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const farbenArr = farben.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const bezugsstoffArr = bezugsstoff.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const infotabArr = infotext.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const sizesbedArr = sizesbed.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const sizesstoffArr = sizesstoff.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const sizestextArr = sizestext.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const sizescarpetsArr = sizescarpets
		.replace(/(\r\n|\r|\n|\t)/g, "")
		.split(",");
	const sizesbhtArr = sizesbhtlStr.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const imageArr = imageStr.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	const mainstrArr = mainstr.replace(/(\r\n|\r|\n|\t)/g, "").split(",");
	//console.log(imageArr);
	// columns for textareas
	const textareaArr = [];

	// make accordion accessible
	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	const getNumFruit = (i) => {
		return sleep(2000).then(i);
	};
	//console.log(product);
	//console.log(updateproduct);
	//console.log(slugs);
	async function savechanges() {
		//setIsLoading(true);
		let arrForUpdate;

		if (newProductWarning) {
			// if we make a new product, we copy every field from the old product plus the updated fields
			const prodObj = product[0];

			const oldKeys = Object.keys(prodObj);
			const oldValues = Object.values(prodObj);

			const updateObj = updateproduct[0];

			const newKeys = Object.keys(updateObj);
			const newValues = Object.values(updateObj);

			const newObj = {};

			oldKeys.map((row, i) => {
				if (
					row == "data" ||
					row == "created_at" ||
					row == "updated_at" ||
					row == "id"
				) {
					return;
				}
				if (updateObj[row]) {
					newObj[row] = updateObj[row];
				} else {
					newObj[row] = prodObj[row];
				}
			});

			arrForUpdate = [newObj];
		} else {
			// if we only update a product, we only write the updated fields
			arrForUpdate = updateproduct;
		}
		//console.log(arrForUpdate);

		setUpdatestatus(true);

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
		const supabase = createClient(supabaseUrl, supabaseKey, {
			auth: { persistSession: false },
		});

		// // //console.log(arr);

		const { data, error } = await supabase
			.from("produkte")
			.upsert(arrForUpdate)
			.select();

		//console.log(error);
		// if a new product was added, set the "old" product to "outofstock"
		if (oldproductoutofstock == true) {
			const existingproductUpdate = [];
			existingproductUpdate.push({ slug: product[0].slug });
			existingproductUpdate[0].stock_status = "outofstock";
			existingproductUpdate[0].permanent_redirect = arrForUpdate[0].slug;
			//console.log(existingproductUpdate);
			const { data: dataupdate, error: errorupdate } = await supabase
				.from("produkte")
				.upsert(existingproductUpdate)
				.select();
			// console.log(dataupdate);
			// console.log(errorupdate);
			setNewProductWarning(false);
			setNewProductCreated(true);
		} else {
			setNewProductCreated(false);
			setNewProductWarning(false);
		}

		if (data) {
			setUpdatestatus(false);
			const loadnew_thisproduct = await loadproduct(slug);
			fetchProductList();
		}
		//setUpdatestatus(false);
		// // setProduct([]);
		// setProduct(data);
		// setIsLoading(true);
		// console.log(data);
		// console.log(error);
	}

	async function loadproduct(slug) {
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
		const supabase = createClient(supabaseUrl, supabaseKey, {
			auth: { persistSession: false },
		});

		//console.log(arr);

		const { data, error } = await supabase
			.from("produkte")
			.select()
			.eq("slug", slug);

		const obj = { data: data };
		setProduct(data);
		return obj;
	}

	useEffect(() => {
		async function loadnew() {
			const data = await loadproduct(slug);
			//console.log(data.data);

			// setSlugs(data.slugs);
		}
		loadnew();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//console.log(product);
	return (
		<>
			{!product ? (
				<div>loading...</div>
			) : (
				<>
					{JSON.stringify(updateproduct)}
					<div id="accordion">
						{updatestatus == false ? (
							<>
								<div className="flex">
									<div>
										<button
											disabled={button}
											className={`btn ${!button ? "btn-neutral" : "bg-black"}`}
											onClick={savechanges}
										>
											save changes
										</button>
									</div>
									<div>
										{newProductWarning ? (
											<div className="px-4 pt-2">
												<span className="text-red-500 animate-bounce  font-pBold">
													beim Speichern wird ein neues Produkt angelegt
												</span>
												<br />
												<CheckboxOne
													oldproductoutofstock={oldproductoutofstock}
													setOldproductoutofstock={setOldproductoutofstock}
												/>
											</div>
										) : null}
										{newProductCreated ? (
											<span className="text-green-500 animate-bounce px-4 pt-2 font-pBold">
												ein neues Produkt wurde angelegt, das bisherige Produkte
												wurde &quot;outofStock&quot; gesetzt
											</span>
										) : null}
									</div>
								</div>
							</>
						) : (
							<div className="prose">
								<h1>updating... please wait</h1>
								<div className="text-center  top-[500px] absolute w-full">
									<span className=" loading loading-spinner loading-lg "></span>
								</div>
							</div>
						)}
						<Accordion
							className={
								updatestatus == true ? "opacity-20 bg-green-100" : null
							}
							//type={accordiontype}
							type="single"
							collapsible
							value={accordItemOpen}
							onValueChange={setAccordItemOpen}
						>
							{[
								{ title: "Produktname, Preise etc.", arr: mainstrArr },
								{ title: "Infotab", arr: infotabArr },

								{ title: "Bilder", arr: imageArr },
								{ title: "Bezugsstoffe", arr: bezugsstoffArr },
								{ title: "Farben", arr: farbenArr, showonly: ["stoffe"] },

								{ title: "Daten Länge, Breite, Tiefe", arr: sizesbhtArr },
								{ title: "Daten Texte", arr: sizestextArr },
								{
									title: "Daten für Teppich",
									arr: sizescarpetsArr,
									showonly: ["teppiche"],
								},
								{
									title: "Daten für Kissen",
									arr: kissenArr,
									showonly: ["kissen"],
								},
								{
									title: "Daten für Bezugsstoffe",
									arr: sizesstoffArr,
									showonly: ["stoffe"],
								},
								{
									title: "Daten für Betten",
									arr: sizesbedArr,
									showonly: ["betten"],
								},
							].map((accordionRow, i) => {
								if (accordionRow.showonly) {
									//console.log(accordionRow.showonly);
									if (!accordionRow.showonly.includes(product[0].termslug)) {
										return;
									}
								}
								return (
									<>
										<AccordionItem
											className="accordionItems"
											value={`item-${i}`}
										>
											<AccordionTrigger>
												<div className="prose">
													<h4>{accordionRow.title}</h4>
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div
													className={` ${
														accordionRow.title == "images" ? "pt-9" : null
													}`}
												>
													{accordionRow.arr.map((key, i) => {
														if (key == "data") {
															return;
														}
														const val = row[key];

														return (
															<TableRow
																setButton={setButton}
																//slugs={slugs}
																val={val}
																key_={key}
																key={i}
																imageArr={imageArr}
																rowtitle={accordionRow.title}
																newProductWarning={newProductWarning}
																setNewProductWarning={setNewProductWarning}
																// prodCat={prodCat}
																// saleVerfuegbarkeitArr={saleVerfuegbarkeitArr}
																// ausstellungsstueckArr={ausstellungsstueckArr}
																// stockstatusArr={stockstatusArr}
																// preisanhangArr={preisanhangArr}
																// sale_verfuegbarkeitArr={sale_verfuegbarkeitArr}
																// bezugsstoffAuswahlArr={bezugsstoffAuswahlArr}
																product={product}
																setProduct={setProduct}
																updateproduct={updateproduct}
																setUpdateProduct={setUpdateProduct}
															/>
														);
													})}
												</div>
											</AccordionContent>
										</AccordionItem>
									</>
								);
							})}
						</Accordion>
					</div>
				</>
			)}
		</>
	);
}
function TableRow({
	val,
	key_,
	imageArr,
	rowtitle,
	prodCat,
	saleVerfuegbarkeitArr,
	// stockstatusArr,
	// preisanhangArr,
	// sale_verfuegbarkeitArr,
	// ausstellungsstueckArr,
	// bezugsstoffAuswahlArr,
	// product,
	// setProduct,
	updateproduct,
	setUpdateProduct,
	//slugs,
	setButton,
	newProductWarning,
	setNewProductWarning,
}) {
	const { setIsLoading, slug, dataObj } = useUserStore();
	console.log(dataObj);
	//console.log(ausstellungsstueckArr);
	const fallbackimage =
		"data:image/png;base64,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FxfArSAdwUKANTY2FhQUtOcacOzYsUuXLh00aFAAt0JoIFgIpKqqqunTp588edK/w/v3779q1apRo0ZZLJbALobQQLAQGB6Pp7i4eNq0af4dHhUVtXbt2mnTpt1+++2BXQyhhNsaEABtbW1vvPGG37WaM2dObW3tzJkzqRVujjMstFdLS0teXt6mTZv8OPbxxx9fvnx5enp6wLdCSOL7sNAura2tzz777LZt23w9MDExsbCwcNy4cR068K8mVPF3Bf5zOp2vvPKKH7VauHBhXl5ely5d9NgKIYxgwX9vv/32xo0bfTokIyNj7dq1999/v04rIbRxSQg/7d27d8yYMT4dsnLlytmzZ3PbOvxGsOCPixcvDh48WP3brOLi4nbt2sXnAdFOXBLCZy6XKy8vT71WVqt19+7d99xzj65bIRwQLPistLS0pKREcZhvXkcAcUkI3zQ1NaWmptbW1qoMJyYmHjlyhFohULjTHb7Zvn27Yq0sFsuePXuoFQKIMyz44Nq1a/fee29dXZ3K8LZt26ZMmaL3SggrnGHBB+Xl5Yq1mj59+qRJk/TeB+GGMyz4ICsr68CBA17HLBbL+fPnuRhEwHGGBVU1NTUqtdI0beXKldQKeiBYUPXNN9+ojMXExPj9PTPAzREsqNq3b5/K2IIFC7p166b3MghPvIcFJc3NzYqPhj9z5kxycrLe+yA8cYYFJWfOnFEZGz58OLWCfggWlCg+sCsnJ0fvTRDOCBaUnDhxQmVs6NChem+CcEawoKSystLrTHx8fFJSkgHLIGwRLHjncDhsNpvXsfHjx/MF7dAVwYJ3ly9fVhlLSUnRexOEOYIF7xoaGlTG+vXrp/cmCHMEC97V19erjPFxHOiNYMG7xsZGlTEe2wW9ESx4d/XqVZWxzp0767wIwh3Bgncqz5vo1q0bz++C3ggWvGttbfU606tXLwM2QZgjWPDu2rVrXmd4AwsGIFjwzuVymb0CoGk8lxAqMjIyVqxYcfOZ3r17G7MMwhnfhwVADC4JAYhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsODd1q1bIxT8+OOPZm+KEEewAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIhBsACIQbAAiEGwAIgR4fF4zN4BAJRwhgVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVAjH8BG6kTJ8gyXDYAAAAASUVORK5CYII=";

	const noimage =
		"data:image/png;base64,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";
	//console.log(val);
	const [htmlstr, setHtmlstr] = useState(val);
	const [imageerror, setImageerror] = useState(false);
	const [objectForUpdate, setObjectForUpdate] = useState([]);
	const [bg, setBg] = useState();

	let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
	let containsHTML = regexForHTML.test(val);
	//console.log(rowtitle);
	function handlechange(e) {
		//console.log(e);
		const keys = Object.keys(updateproduct[0]);
		const values = Object.values(updateproduct[0]);
		const thisKey = e.target.name;
		let thisVal = e.target.value;
		if (thisKey.includes("bezugsstoff") || thisKey == "title_addition") {
			//console.log("triggered");
			//console.log(thisVal);
			if (thisVal == "") {
				thisVal = null;
			}
			//console.log(thisVal);
		}

		// console.log(values);
		//console.log(updateproduct);
		// make a new obj
		const newObj = {};
		keys.map((row, i) => {
			//console.log(row);
			//console.log(values[i]);
			if (row == "data") {
				return;
			}

			const initSecondrow = updateproduct[1];
			//console.log(initSecondrow);
			if (initSecondrow) {
				if (row == "slug") {
					newObj[row] = values[i];
				}
				if (row == thisKey) {
					newObj[row] = thisVal;
				}
			} else {
				if (row == thisKey) {
					return;
				} else {
					newObj[row] = values[i];
				}
			}
		});
		newObj[thisKey] = thisVal;
		// console.log(updateproduct[0]);
		// console.log(newObj);
		setUpdateProduct([newObj]);

		//
		//

		//
		//

		const str = e.target.value.replace(
			"bretz-austria.b-cdn.net",
			"media.bretz-austria.at"
		);
		setHtmlstr(e.target.value);
		setImageerror(false);
	}

	function handleslug(e) {
		if (e.target.value != slug) {
			setNewProductWarning(true);
		} else {
			setNewProductWarning(false);
		}
		let set = false;
		// console.log(slug);
		// console.log(e.target.value);
		handlechange(e);
		//console.log(slugs);
		dataObj.slugs.map((row, i) => {
			//console.log(row.slug, e.target.value);
			//console.log(row.slug);
			if (row.slug == e.target.value) {
				// console.log(row.slug, e.target.value);
				set = true;
			}
		});

		if (set) {
			setBg("bg-red-300");
			setButton(true);
		} else {
			setBg(null);
			setButton(false);
		}
	}

	function handlefabric(e) {
		const title = e.target.value;
		const name = e.target.name;
		//console.log(e.target.name);
		const number = name.replace("bezugsstoff", "").replace("___", "");
		//console.log(bezugsstoffAuswahlArr);

		bezugsstoffAuswahlArr.map((row, i) => {
			if (row.title == title) {
				//++++++++++++++++++++++++++++++ set the state directly in this function
				// set the new slug
				const slug = {};
				slug.target = { name: `bezugsstoff${number}_slug___`, value: row.slug };
				handlechange(slug);

				// set the new title
				const title = {};
				title.target = {
					name: `bezugsstoff${number}___`,
					value: row.title,
				};

				handlechange(title);
				// set the new image
				const image = {};
				image.target = {
					name: `bezugsstoff${number}_img___`,
					value: row.productimage,
				};
				handlechange(image);
				//console.log(slug);

				document.querySelector(
					`input[name="bezugsstoff${number}_slug___"]`
				).value = row.slug;
				document.querySelector(
					`input[name="bezugsstoff${number}_img___"]`
				).value = row.productimage;
			}
		});
	}

	// dataObj.produktartArr.unshift({
	// 	title_de: null,
	// 	title_en: null,
	// 	title_fr: null,
	// });

	return (
		<>
			<div className={`border-b transition-colors hover:bg-muted/50`}>
				<div className="grid grid-cols-4">
					<div className="py-2 align-middle grid">{key_}: </div>

					{containsHTML == true ? (
						<textarea
							defaultValue={htmlstr}
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlechange}
						/>
					) : key_ == "online_bestellbar" ? (
						<select
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlechange}
							defaultValue={val == null ? "false" : val}
						>
							<option value="true">ja</option>
							<option value="false">nein</option>
						</select>
					) : key_ == "stock_status" ? (
						<select
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlechange}
							defaultValue={val}
						>
							{dataObj.stockstatusArr.map((row, i) => {
								//console.log(row);
								return (
									<option key={i} value={row.value}>
										{row.value}
									</option>
								);
							})}
						</select>
					) : key_ == "title_addition" ? (
						<>
							<select
								data-key={key_}
								className="inputfieldsSingleProduct w-full p-2"
								rows={10}
								name={key_}
								id={key_}
								onChange={handlechange}
								defaultValue={val == null ? "" : val}
							>
								{dataObj.produktartArr.map((row, i) => {
									//console.log(row);
									return (
										<option
											key={i}
											value={row.title_de == null ? "" : row.title_de}
										>
											{row.title_de == null ? "" : row.title_de}
										</option>
									);
								})}
							</select>
						</>
					) : key_ == "bezugsstoff_1" ||
					  key_ == "bezugsstoff_2" ||
					  key_ == "bezugsstoff_3" ||
					  key_ == "bezugsstoff_4" ||
					  key_ == "bezugsstoff_5" ? (
						<>
							<BezugsstoffAuswahl
								key_={key_}
								handlefabric={handlefabric}
								val={val}
								bezugsstoffAuswahlArr={dataObj.bezugsstoffauswahlArr}
								handlechange={handlechange}
							/>
							{/* <select
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlefabric}
							defaultValue={val}
						>
							{bezugsstoffAuswahlArr.map((row, i) => {
								//console.log(row);
								return (
									<option key={i} value={row.slug}>
										{row.title}
									</option>
								);
							})}
						</select> */}

							{/* <input
							defaultValue={htmlstr}
							className="inputfieldsSingleProduct p-2"
							data-key={key_}
							type={
								[
									"price",
									"sale_price",
									"order_sale_loop",
									"order_shop",
									"order_in_product_category_loop",
								].includes(key_)
									? "number"
									: "string"
							}
							name={key_}
							id={key_}
							onChange={handlechange}
						/> */}
						</>
					) : key_ == "ausstellungsstueck" ? (
						<>
							<select
								data-key={key_}
								className="inputfieldsSingleProduct w-full p-2"
								rows={10}
								name={key_}
								id={key_}
								onChange={handlechange}
								defaultValue={val == null ? "" : val}
							>
								{dataObj.ausstellungsstueckArr.map((row, i) => {
									//console.log(row);
									return (
										<option key={i} value={row.value}>
											{row.value}
										</option>
									);
								})}
							</select>
						</>
					) : key_ == "preisanhang" ? (
						<select
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlechange}
							defaultValue={val}
						>
							{dataObj.preisanhangArr.map((row, i) => {
								//console.log(row);
								return (
									<option key={i} value={row.value}>
										{row.value}
									</option>
								);
							})}
						</select>
					) : key_ == "sale_verfuegbarkeit" ? (
						<select
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlechange}
							defaultValue={val}
						>
							{dataObj.saleVerfuegbarkeitArr.map((row, i) => {
								//console.log(row);
								return (
									<option key={i} value={row.value}>
										{row.value}
									</option>
								);
							})}
						</select>
					) : key_ == "termslug" || key_ == "termslug2" ? (
						<select
							data-key={key_}
							className="inputfieldsSingleProduct w-full p-2"
							rows={10}
							name={key_}
							id={key_}
							onChange={handlechange}
							defaultValue={val}
						>
							{key_ == "termslug2" ? <option value=""></option> : null}
							{dataObj.prodCatList.map((row, i) => {
								if (row.term_slug == "sale" || row.term_slug == "shop") {
									return;
								}

								return (
									<option key={i} value={row.term_slug}>
										{row.term_name}
									</option>
								);
							})}
						</select>
					) : (
						<>
							<input
								defaultValue={htmlstr}
								className={`inputfieldsSingleProduct p-2 ${
									key_ == "slug" ? bg : null
								}`}
								data-key={key_}
								type={
									[
										"price",
										"sale_price",
										"order_sale_loop",
										"order_shop",
										"order_in_product_category_loop",
										"max_shop_quantity",
									].includes(key_)
										? "number"
										: "string"
								}
								name={key_}
								id={key_}
								onChange={key_ == "slug" ? handleslug : handlechange}
							/>
						</>
					)}

					<div className="align-middle grid items-center">
						{imageArr.includes(key_) && (
							<Image
								className="transition-all hover:scale-[2] hover:z-[100]"
								unoptimized
								src={
									imageerror == true
										? fallbackimage
										: htmlstr == null || htmlstr == ""
										? noimage
										: htmlstr + "?width=400"
								}
								width={150}
								height={84}
								alt=""
								onError={() => setImageerror(true)}
								onLoad={() => setImageerror(false)}
								//onError={setImageerror(true)}
							/>
						)}
					</div>
					<div className="align-middle grid">
						{rowtitle == "infotab" ? (
							<div dangerouslySetInnerHTML={{ __html: htmlstr }} />
						) : null}
					</div>
				</div>
			</div>
		</>
	);
}

function RenderTextarea({ val, key_ }) {
	function handlechange(e) {
		const el = document.getElementsByTagName(`html_${key_}`);

		el.innerHTML = e.target.value;
	}
	return (
		<textarea
			defaultValue={val}
			data-key={key_}
			className="inputfield w-full p-2"
			rows={10}
			name={key_}
			id={key_}
			onChange={handlechange}
		/>
	);
}

function RenderInput({ val, key_ }) {
	function handlechange(e) {
		document.getElementsByTagName(`html_${key_}`).innerHTML = e.target.value;
	}
	return (
		<input
			defaultValue={val}
			className="inputfield p-2"
			data-key={key_}
			type={
				[
					"price",
					"sale_price",
					"order_sale_loop",
					"order_shop",
					"order_in_product_category_loop",
				].includes(key_)
					? "number"
					: "string"
			}
			name={key_}
			id={key_}
			onChange={handlechange}
		/>
	);
}

function BezugsstoffAuswahl({
	key_,
	val,
	bezugsstoffAuswahlArr,
	handlechange,
}) {
	const [selectedFabric, setSelectedFabric] = useState(() => {
		let fabric;
		//console.log(val);
		bezugsstoffAuswahlArr.map((row, i) => {
			//console.log(row);
			if (row.slug == val) {
				fabric = row;
				//console.log(row);
			}
		});
		return fabric;
	});

	// console.log(val);
	//console.log(selectedFabric);

	const value = val == null ? "" : val;
	//console.log(bezugsstoffAuswahlArr);
	const slug = selectedFabric.slug;

	function handlefabric(e) {
		handlechange(e);
		//console.log(e.target.value);
		const selectedfabric = e.target.value != "" ? e.target.value : null;
		//console.log(selectedfabric);
		let fabric;
		bezugsstoffAuswahlArr.map((row, i) => {
			//console.log(row);
			if (row.slug === selectedfabric) {
				//console.log(row.slug, selectedfabric);
				fabric = row;
			} else {
				// fabric = {
				// 	slug: null,
				// 	title: null,
				// 	productimage: null,
				// 	stock_status: null,
				// };
			}
		});
		//console.log(fabric);
		setSelectedFabric(fabric);
	}
	//console.log(selectedFabric);
	return (
		<>
			<select
				data-key={key_}
				rows={10}
				name={key_}
				id={key_}
				onChange={(e) => handlefabric(e)}
				//onChange={setSelectedFabric}
				defaultValue={value}
				// value={selectedFabric}
				className={`inputfieldsSingleProduct w-full p-2  ${
					selectedFabric.stock_status == "outofstock" ? "bg-red-200" : null
				}`}
				//value={slug}
			>
				{bezugsstoffAuswahlArr.map((row, i) => {
					//console.log(row);
					return (
						<option
							key={i}
							value={row.slug ? row.slug : ""}
							className={
								row.stock_status == "outofstock" ? "bg-red-200" : "bg-white"
							}
						>
							{row.title}
						</option>
					);
				})}
			</select>
			{selectedFabric.productimage && (
				<Image
					src={selectedFabric.productimage + "?width=577&aspect_ratio=7.2125:1"}
					width={300}
					height={300}
					alt=""
				/>
			)}
		</>
	);
}
