"use client";

import "handsontable/dist/handsontable.full.min.css";
import { createArticleNumberFirstPart } from "@/components/Client/tables/Datenbankbearbeiten/lib/buildBuerowareData/createArticleNumberFirstPart";
//import Handsontable from "handsontable/base	";
import { registerAllModules } from "handsontable/registry";
registerAllModules();
//import { useUserStore } from "@/lib/zustand/useUserStore";
import { supabase } from "@/lib/supabaseClient";
//import { HotTable } from "@handsontable/react";
import HotTable from "@/components/Client/ssrtable/HotTable";
import { useEffect, useRef, useState } from "react";
//import ColumdfieldSelector from "@/components/Client/tables/sub/ColumdfieldSelector";
//import { Suspense } from "react";

import { getAllStoffeInstock } from "@/components/Client/tables/Datenbankbearbeiten/lib/buildBuerowareData/getAllStoffeInstock";
import { getTheProducts } from "@/components/Client/tables/Datenbankbearbeiten/lib/buildBuerowareData/getTheProducts";
import { TbSquareChevronsDown } from "react-icons/tb";

export default function TabelleStammDaten({
	//fetchProductList,
	filterForProd,
	filterForTable,
	url,
}) {
	const [produkte, setProdukte] = useState([]);
	const [stoffe, setStoffe] = useState([]);
	const [fuesse, setFuesse] = useState([]);
	const [columnNames, setColumNames] = useState([]);
	const [columnHeaders, setColumnHeaders] = useState([]);
	const [totalRows, setTotalRows] = useState();
	const [windowWidthHeight, setWindowwidthHeight] = useState();
	const [prodcat, setProdCat] = useState();
	//console.log(filterForProd);

	async function buildDataForBueroware() {
		const vktoekfactor = 2.17038;
		// get all fabrics that are insotck

		const stoffeRaw = await fetch(`${url}/api/supabase/getAllStoffeInstock`);
		//console.log(stoffeRaw);
		const { stoffe, anzahlStoffe, stoffeError } = await stoffeRaw.json();
		//console.log(stoffe);
		setStoffe(stoffe);

		// get the productlist to work with
		const { data, error } = await getTheProducts(filterForProd, filterForTable);
		//const productsRaw = await fetch();
		//console.log(data);

		// get the columnnames of the fetched productlist
		const keys = Object.keys(data[0]);

		// set the Name of the produktkategorie for the filename when we export
		setProdCat(data[0].produktkategorie.title);

		//console.log(keys);

		// get the columnames of the foreign key produktkategorie that was fetched with the produclist
		const keysProduktkategorien = Object.keys(data[0].produktkategorie);

		// build an array that contains every product with every selected foot
		const produktListeMitFuessen = [];
		data.map((prod, i) => {
			// create the product title for Bueroware
			const title = `${prod.produktkategorie.hersteller.hersteller} ${prod.produktart} ${prod.produktkategorie.title} ${prod.title}${prod.produktkategorie.modellnummer}`;
			//console.log(prod);
			// create the first part of the artikelnummer for Bueroware
			// const artnr = prod.title.includes("_")
			// 	? `${prod.title

			// 			.replace("-", "")
			// 			.replace("-", "")
			// 			.replace("-", "")
			// 			.replace("_", prod.produktkategorie.modellnummer)}`
			// 	: `${prod.title.replace("-", "").replace("-", "").replace("-", "")}${
			// 			prod.produktkategorie.modellnummer
			// 	  }`;
			const artnr = createArticleNumberFirstPart(prod);
			//console.log(artnr);
			//console.log(artnr.toLocaleLowerCase());
			//console.log(prod);
			// create an object with a lot of information that we use later
			const obj = {
				// the title for Bueroware, ex. "Bretz Sessel Teratai A106"
				Text: `${prod.produktkategorie.hersteller.hersteller} ${
					prod.produktart
				} ${
					prod.produktkategorie.title != prod.produktart
						? prod.produktkategorie.title
						: ""
				} ${
					prod.title.includes("_")
						? `${prod.title.replace("_", prod.produktkategorie.modellnummer)}`
						: `${prod.title}${
								prod.produktkategorie.modellnummer
									? prod.produktkategorie.modellnummer
									: ""
						  }`
				}`,

				// a short text for a field in Bueroware, this field is not really important
				kurzbeschreibung: prod.text ? prod.text : false,

				// declare if the product has a Bezugsstoff, boolean
				produktmitbezugsstoff: prod.produktmitbezugsstoff,

				// declare if a product has a foot, boolean
				produktmitfuss: prod.produktmitfuss,

				// the first part of the artikelnummer for Bueroware, contains the productname
				// and the number of the productcategorie, ex. "mli106"
				artnr: artnr,
				//breite: prod.breite,
				//tiefe: prod.tiefe,
				//hoehe: prod.hoehe,
				//sitzhoehe: prod.sitzhoehe,
				//sitztiefe: prod.sitztiefe,
				Bilddateiname: prod.Bilddateiname,
				// hersteller: prod.produktkategorie.hersteller.hersteller,
				// produktart: prod.produktart,
				// declare Standardlieferant 1 for Bueroware, ex. "330033"
				"Standardlieferant 1":
					prod.produktkategorie.hersteller.bueroware_herstellernummer,
				Warengruppe: prod.produktkategorie.warengruppe_bueroware,
				cbm: Math.round((prod.breite * prod.hoehe * prod.tiefe) / 100000) / 10,
				gewicht: prod.gewicht,
			};
			//console.log(obj.Text);

			// declare sizes if field is set to false
			//console.log(prod);
			if (prod.masseInBeschreibungAusblenden == false) {
				obj["breite"] = prod.breite;
				obj["tiefe"] = prod.tiefe;
				obj["hoehe"] = prod.hoehe;
				obj["sitzhoehe"] = prod.sitzhoehe;
				obj["sitztiefe"] = prod.sitztiefe;
				obj["liegeflaeche"] = prod.bettLiegeflaeche;
				obj["liegehoehe"] = prod.bettLiegehoehe;
			}

			// declares if - in terms of feet - the product overwrites the information of
			// the productcategory
			//console.log(prod.standardfuss.title.includes("übernommen"));
			const productOverwritesProductCategorie =
				prod.standardfuss.title.includes("übernommen") ? false : true;

			// declare the standardfuss of the product
			// a declaratio of a standardfuss in the producttable overwrites the declaration
			// in the produktkategorie
			// if the product is declared with out any foot, nothing is added
			//console.log(prod);
			if (prod.produktmitfuss) {
				if (productOverwritesProductCategorie) {
					obj["fuss"] = prod.standardfuss.title;
					obj["fussartnr"] = prod.standardfuss.artnr;
				} else {
					obj["fuss"] = prod.produktkategorie.standardfuss.title;
					obj["fussartnr"] = prod.produktkategorie.standardfuss.artnr;
				}
			}

			// run through all fields, look for fields that include "preis_"
			// add these fields to the object, in the end we get a price field for every fabric
			// these are the prices for the standardfuss
			keys.map((row) => {
				if (row.includes("preis_")) {
					obj[row] = prod[row];
					//console.log(row);
				}
			});
			//console.log(obj);
			// add this object to an array
			produktListeMitFuessen.push(obj);
			//console.log(produktListeMitFuessen);

			// check if there is a aufpreisfuss declared in the productlist
			let aufpreisFussInProduct;

			//aufpreisfuss 1
			let e = 0;

			const hoehe = prod.hoehe;
			const sitzhoehe = prod.sitzhoehe;
			//console.log(keysProduktkategorien);
			//console.log(prod);
			if (
				productOverwritesProductCategorie == false &&
				prod.produktmitfuss == true
			) {
				keysProduktkategorien.map((row, i) => {
					if (row.includes("aufpreisfuss")) {
						//console.log("triggered");
						e = e + 1;
						//console.log(e);
						let fuss;
						let preis;
						//console.log(row);

						const newOjb = { ...obj };

						// wenn ein fuss definiert ist, mach das...
						//console.log(prod.produktkategorie[`aufpreisfuss${e}`]);
						if (prod.produktkategorie[`aufpreisfuss${e}`]) {
							// aufpreis fuss name
							// obj[`aufpreisfuss${row}title`] =
							// 	prod.produktkategorie[`aufpreisfuss${row}`].title;
							const fuss = prod.produktkategorie[`aufpreisfuss${e}`].title;
							const artnr = prod.produktkategorie[`aufpreisfuss${e}`].artnr;
							//console.log(artnr);

							// aufpreis fuss preis, manchmal kann ein produkt mehr füsse haben als andere
							let fussAnzahl;
							if (prod.anzahlfuesse) {
								fussAnzahl = prod.anzahlfuesse;
							} else {
								fussAnzahl = prod.produktkategorie.anzahlfuesse;
							}
							//console.log(prod.produktkategorie.anzahlfuesse);

							// obj[`aufpreisfuss${row}preis`] =
							// 	prod.produktkategorie[`aufpreisfuss${row}`][
							// 		`aufpreis${fussAnzahl}er`
							// 	];
							// get the aufpreis depending on the feets
							let aufpreis =
								prod.produktkategorie[`aufpreisfuss${e}`][
									`aufpreis${fussAnzahl}er`
								];
							// if 2 feet, divide the price for four feet
							if (fussAnzahl == 2) {
								aufpreis =
									prod.produktkategorie[`aufpreisfuss${e}`][`aufpreis4er`] / 2;
							}
							//console.log(
							// 	prod.produktkategorie[`aufpreisfuss${e}`][
							// 		`aufpreis${fussAnzahl}er`
							// 	]
							// );
							//console.log("Auffpreis: " + aufpreis);
							//console.log(fussAnzahl);

							keys.map((row) => {
								if (row.includes("preis_")) {
									newOjb[row] = prod[row] + aufpreis;
								}
							});
							newOjb["hoehe"] =
								hoehe + prod.produktkategorie[`aufpreisfuss${e}zusatzhoehe`];
							//console.log(sitzhoehe);
							if (sitzhoehe) {
								newOjb["sitzhoehe"] =
									sitzhoehe +
									prod.produktkategorie[`aufpreisfuss${e}zusatzhoehe`];
							}

							newOjb["fuss"] = fuss;
							newOjb["fussartnr"] = artnr;
							//console.log(artnr);
							// add this to the array
							produktListeMitFuessen.push(newOjb);
						}
					}
				});
			}
		});

		//console.log(produktListeMitFuessen);
		//console.log(data);

		const prodArr = [];
		stoffe.map((stoff, stoffKey) => {
			const stoffpreisgruppe =
				stoff.stoffartgruppe.stoffpreisgruppe.stoffpreisgruppe;
			//console.log(stoff.stoffartgruppe.stoffpreisgruppe.stoffpreisgruppe);

			produktListeMitFuessen.map((produkt, produktKey) => {
				// wenn für eine Stoffpreisgruppe kein Preis angegeben ist, kein Produkt ertellen
				if (!produkt[`preis_${stoffpreisgruppe}`]) {
					//	console.log("triggered");
					return;
				}
				//console.log(produkt.preis_70);
				const prodObj = {};
				const keys = Object.keys(produkt);
				//console.log(produkt);
				// langtext start
				//console.log(produkt.sitztiefe);
				const text = produkt.kurzbeschreibung
					? produkt.kurzbeschreibung + "\n"
					: "";
				const breite = produkt.breite ? `Breite: ${produkt.breite}cm\n` : "";
				const tiefe = produkt.tiefe ? `Tiefe: ${produkt.tiefe}cm\n` : "";
				const hoehe = produkt.hoehe ? `Höhe: ${produkt.hoehe}cm\n` : "";
				const sitzhoehe = produkt.sitzhoehe
					? `Sitzhöhe: ${produkt.sitzhoehe}cm\n`
					: "";
				const sitztiefe =
					produkt.sitztiefe && produkt.sitztiefe != ""
						? `Sitztiefe: ${produkt.sitztiefe}cm\n`
						: "";
				const liegehoehe = produkt.liegehoehe
					? `Liegehöhe: ${produkt.liegehoehe}cm\n`
					: "";
				const liegeflaeche = produkt.liegeflaeche
					? `Liegefläche: ${produkt.liegeflaeche.replace(" x", "cm x")}cm\n`
					: "";
				const bezugsstoff =
					produkt.produktmitbezugsstoff == true
						? `Bezugsstoff: ${stoff.title}`
						: "";
				const fussText =
					produkt.produktmitfuss == true ? `\nFüße: ${produkt.fuss}` : "";

				const langtext = `${text}${breite}${tiefe}${hoehe}${sitzhoehe}${sitztiefe}${liegehoehe}${liegeflaeche}${bezugsstoff}${fussText}`;

				// langtext ende

				let stoffkurz;
				if (stoff.title == "fremdstoff") {
					stoffkurz = "fremd";
				} else if (stoff.title.includes("BOH")) {
					stoffkurz = "65" + "." + stoff.title.split(" ")[1];
				} else {
					stoffkurz =
						stoff.title.split(" ")[0] + "." + stoff.title.split(" ")[1];
				}

				// artikelnummer deklarieren je nachdem ob das Produkt einen Fuss hat oder nicht
				if (produkt.produktmitfuss == true) {
					//console.log(produkt.artnr);
					prodObj["Artikelnummer"] =
						produkt.artnr + "." + stoffkurz + "." + produkt.fussartnr;
				} else {
					prodObj["Artikelnummer"] = produkt.artnr + "." + stoffkurz;
				}

				const vk =
					produkt[
						`preis_${stoff.stoffartgruppe.stoffpreisgruppe.stoffpreisgruppe}`
					];
				prodObj["VK 1 Brutto"] = vk;
				prodObj["Langtext"] = langtext;
				//console.log(produkt);

				keys.map((key, keyKey) => {
					//console.log(key);
					if (
						!key.includes(["preis_"]) &&
						!key.includes(["fuss"]) &&
						!key.includes(["stoff"]) &&
						!key.includes(["artnr"]) &&
						!key.includes("hersteller")
					) {
						prodObj[key] = produkt[key];
					}
				});
				prodObj["EK 1 Netto"] = Math.round((vk * 100) / vktoekfactor) / 100;
				//prodObj["bezugsstoff"] = stoff.title;
				prodArr.push(prodObj);
			});

			//console.log(prodArr);
		});
		//console.log(prodArr);
		setProdukte(prodArr);
		setTotalRows(prodArr.length);
		//setColumNames(Object.keys(prodArr[0]));
		setColumnHeaders(Object.keys(prodArr[0]));
		//console.log(prodArr);

		// const { data: fuesse, error: fuesseError } = await supabase
		// 	.from("_a_fuesse")
		// 	.select("*")
		// 	.eq("instock", true);
		//setFuesse(fuesse);

		// konfiguration der fuesse
		const fussArr = [];
	}

	//console.log(allfabricsValues);
	//const [data, setData] = useState(productlist);
	//console.log(data);
	// console.log(produkte);

	//const [prodCat, setProdCat] = useState(data[0].termslug);
	//console.log(selectedlist);

	// build column headers
	//	const columnHeaders = Object.keys(data[0]);
	//console.log(columnHeaders);
	//console.log(data);

	// build data schema & column names
	const dataSchema = {};

	//console.log(dataSchema);

	//const columns = Object.keys(productlist[0]);

	//console.log(columns);

	//const keys = Object.keys(data[0]);
	const hotRef = useRef(null);

	// run this whenever another product is selected
	useEffect(() => {
		//console.log("hello");
		if (filterForProd == "Select a product") {
			setProdukte([]);
			setTotalRows();
			return;
		}

		// build data for Bueroware
		buildDataForBueroware();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterForProd]);

	function buttonClickCallback() {
		// get the time
		const d = new Date();
		let hour = d.getHours();
		let minutes = d.getMinutes();
		let seconds = d.getSeconds();
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + TbSquareChevronsDown;
		}
		const hot = hotRef.current.hotInstance;
		const exportPlugin = hot.getPlugin("exportFile");
		exportPlugin.downloadFile("csv", {
			bom: true,
			columnDelimiter: ";",
			columnHeaders: true,
			exportHiddenColumns: true,
			exportHiddenRows: true,
			fileExtension: "csv",
			filename: `${prodcat}_bueroware_import_erstellt_[YYYY]-[MM]-[DD]--${hour}-${minutes}-${seconds}`,
			mimeType: "text/csv",
			rowDelimiter: "\r\n",
			rowHeaders: true,
		});
	}
	//asdf
	useEffect(() => {
		// let hot;
		// let exportPlugin;
		// if (produkte.length < 0) {
		// 	console.log(produkte.length);
		// 	hot = hotRef.current.hotInstance;
		// 	exportPlugin = hot.getPlugin("exportFile");
		// }
		//const hot = hotRef.current.hotInstance;
		//const exportPlugin = hot.getPlugin("exportFile");
		// buttonClickCallback = () => {
		// 	exportPlugin.downloadFile("csv", {
		// 		bom: false,
		// 		columnDelimiter: ",",
		// 		columnHeaders: false,
		// 		exportHiddenColumns: true,
		// 		exportHiddenRows: true,
		// 		fileExtension: "csv",
		// 		filename: "Handsontable-CSV-file_[YYYY]-[MM]-[DD]",
		// 		mimeType: "text/csv",
		// 		rowDelimiter: "\r\n",
		// 		rowHeaders: true,
		// 	});
		// };
	}, [produkte]);

	return (
		<>
			{totalRows && <div>{totalRows} Produkte</div>}

			{produkte && (
				<>
					{" "}
					<HotTable
						ref={hotRef}
						data={produkte}
						// dataSchema={dataSchema}
						colHeaders={columnHeaders}
						//columns={columnNames}
						height={600}
						width={1800}
						minSpareRows={1}
						licenseKey="non-commercial-and-evaluation"
						columnSorting={true}
						// enable filtering
						filters={true}
						// enable the column menu
						dropdownMenu={true}
						fixedColumnsStart={1}
						manualColumnResize={true}
					/>
					<div className="controls">
						<button
							id="export-file"
							onClick={(...args) => buttonClickCallback(...args)}
						>
							Download CSV
						</button>
					</div>
					{/* <button className="btn" onClick={(...args) => handleSave(...args)}>
						save
					</button> */}
				</>
			)}
		</>
	);
}
