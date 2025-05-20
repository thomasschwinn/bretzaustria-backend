"use client";

import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
registerAllModules();
import { useUserStore } from "@/lib/zustand/useUserStore";
import { supabase } from "@/lib/supabaseClient";
// import { HotTable } from "@handsontable/react";
import HotTable from "@/components/Client/ssrtable/HotTable";
import { useEffect, useRef, useState } from "react";
import ColumdfieldSelector from "@/components/Client/tables/sub/ColumdfieldSelector";

export default function TabelleKompletteDaten({
	//products,
	fetchProductList,

	//setProducts,
	//columnListProducts,
	// prodCat,
	// saleVerf,
	// stockstatusArr,
	// preisanhangArr,
	// sale_verfuegbarkeitArr,
	// ausstellungsstueckArr,
	// allfabrics,
	//setShowSuccessMessage,
}) {
	const { productlist, prodCat, columnListProducts, dataObj, selected } =
		useUserStore();
	const saleValues = [];
	dataObj.saleVerfuegbarkeitArr.map((row, i) => {
		saleValues.push(row.value);
	});

	const stockstatusValues = [];
	dataObj.stockstatusArr.map((row, i) => {
		stockstatusValues.push(row.value);
	});

	const preisanhangValues = [];
	dataObj.preisanhangArr.map((row, i) => {
		preisanhangValues.push(row.value);
	});

	const sale_verfuegbarkeitValues = [];
	dataObj.saleVerfuegbarkeitArr.map((row, i) => {
		sale_verfuegbarkeitValues.push(row.value);
	});

	const allfabricsValues = [];
	dataObj.bezugsstoffauswahlArr.map((row, i) => {
		allfabricsValues.push(row.slug);
	});

	const ausstellungsstueckValues = [];
	dataObj.ausstellungsstueckArr.map((row, i) => {
		ausstellungsstueckValues.push(row.value);
	});

	const farbenValues = [];
	dataObj.farbenArr.map((row, i) => {
		farbenValues.push(row.name);
	});

	const kissenformValues = [];
	dataObj.kissenformArr.map((row, i) => {
		kissenformValues.push(row.value);
	});

	const kissenmachartValues = [];
	dataObj.kissenmachartArr.map((row, i) => {
		kissenmachartValues.push(row.value);
	});
	//console.log(farbenValues);

	//console.log(allfabricsValues);
	const [data, setData] = useState(productlist);

	//const [prodCat, setProdCat] = useState(data[0].termslug);
	//console.log(selectedlist);

	// build column headers
	const columnHeaders = Object.keys(data[0]);
	//console.log(columnHeaders);
	//console.log(data);

	// build data schema & column names
	const dataSchema = {};

	//console.log(dataSchema);
	//console.log(columnNames);

	const columns = Object.keys(productlist[0]);

	//console.log(columns);

	const keys = Object.keys(data[0]);
	const hotRef = useRef(null);

	// function handleSave() {
	// 	console.log(hot.getData());
	// }
	const handleSave = async () => {
		const hot = hotRef.current.hotInstance;
		//daten aus Tabelle lesen
		const readDataArr = hot.getData();

		const newArr = [];
		readDataArr.map((row, i) => {
			if (row[0] == null) {
				return;
			}
			//console.log(row);
			const obj = {};
			row.map((subrow, subi) => {
				if (["price", "sale_price"].includes(keys[subi])) {
					// set type to number for special fields
					//console.log(subrow);
					if (subrow == "0" || subrow == null) {
						obj[keys[subi]] = null;
					} else {
						obj[keys[subi]] = +subrow;
					}
				} else if (["true", "false"].includes(row)) {
					// convert string to boolean
					let myBool = subrow.toLowerCase() === "true"; // true
					obj[keys[subi]] = myBool;
				} else {
					const str =
						subrow != null && subrow != ""
							? subrow.replace(
									"bretz-austria.b-cdn.net",
									"media.bretz-austria.at"
							  )
							: subrow;
					obj[keys[subi]] = str;
				}
			});

			newArr.push(obj);
		});
		//console.log(readDataArr);
		//console.log(newArr);
		//console.log(newArr);
		const { data, error } = await supabase
			.from("produkte")
			.upsert(newArr)
			.select();

		if (data) {
			//setShowSuccessMessage(true);
			//console.log("hat funktioniert");
			fetchProductList();
		}
		if (error) {
		}
	};

	//cells with images
	const cellsWithImages = [
		"productimage",
		"slider2___",
		"slider3___",
		"slider4___",
		"slider5___",
		"slider6___",
		"slider7___",
		"slider8___",
		"zeichnung_1___",
		"zeichnung_2___",
	];

	// call this function as an option in a cell where an image should be rendered
	function imageRenderer(instance, td, row, col, prop, value, cellProperties) {
		const img = document.createElement("img");

		img.src = value;

		img.addEventListener("mousedown", (event) => {
			event.preventDefault();
		});

		td.innerText = "";
		td.appendChild(img);

		return td;
	}
	function coverRenderer(instance, td, row, col, prop, value, cellProperties) {
		const img = document.createElement("img");

		img.src = value + "?width=200";

		img.addEventListener("mousedown", (event) => {
			event.preventDefault();
		});

		td.innerText = "";
		td.appendChild(img);

		return td;
	}

	async function handleAlleFelder() {
		fetchlist(selectedlist, "all");
	}

	const fieldSizes = `
        
        size_breite_cm,
        size_tiefe_cm,
        size_hoehe_cm,
        size_sitzhoehe_cm,
        size_sitztiefe_cm,
        size_laenge_cm,
        size_durchmesser_cm,
        size_sitzflaeche - breite_cm,
        size_fus_cm,
        size_sitzflaeche_qm,
        size_liegeflaeche_qm,
        size_teppich_faktor,
	size_teppichform,
        size_min_groesse_cm,
        size_max_groesse_cm,
        size_stoff_breite_cm,
        size_stoff_verarbeitungsbreite_cm,
        size_stoff_details_gesamtzusammensetzung,
        size_stoff_details_grund,
        size_stoff_details_flor,
        size_stoff_details_zusatztext,
        size_stoff_details_gewicht_pro_qm_gramm,
        size_stoff_details_scheuertouren,
        size_stoff_details_pillingbildung,
        size_stoff_details_lichtechtheit,
        size_stoff_details_pflegeleichtigkeit,
        sizeVortext,sizeVortext_en,sizeVortext_fr,sizeNachtext,sizeNachtext_en,sizeNachtext_fr`;

	//asdfasd
	const fieldsKissen = `title,slug,price,sale_price,
        size_breite_cm,
        size_tiefe_cm,
        size_hoehe_cm,
        kissenform,
        machart,
        reissverschluss,
        stoffdetails`;

	const fieldsStoffeGroessen = `title,slug,price,      size_stoff_breite_cm,
        size_stoff_verarbeitungsbreite_cm,
        size_stoff_details_gesamtzusammensetzung,
        size_stoff_details_grund,
        size_stoff_details_flor,
        size_stoff_details_zusatztext,
        size_stoff_details_gewicht_pro_qm_gramm,
        size_stoff_details_scheuertouren,
        size_stoff_details_pillingbildung,
        size_stoff_details_lichtechtheit,
        size_stoff_details_pflegeleichtigkeit`;
	const fieldsStoffeFarben = `
	title,
	slug,
	price,
	farbe1___,
	farbe2___,
	farbe3___,
	farbe4___,
	farbe5___,
	farbe6___,
	farbe7___,
	farbe8___,productimage,slider2___
	`;

	const fieldsText = `
	title,
	slug,
	infotab_vortext,
	infotext_de,
	infotab_Nachtext,
	infotab_vortext_en,
	infotext_en,
	infotab_Nachtext_en,
	infotab_vortext_fr,
	infotext_fr,
	infotab_Nachtext_fr,
	
	`;

	const fieldsMain = `title,slug,price,sale_price,stock_status`;
	const mainPlusSizes = fieldsMain + "," + fieldSizes;
	const fieldSelectArr = [
		{ name: "Hauptfelder", fields: fieldsMain },
		{ name: "Kissen", fields: fieldsKissen },
		{ name: "Größen", fields: mainPlusSizes },
		{ name: "Stoffe Größen", fields: fieldsStoffeGroessen },
		{ name: "Stoffe Farben", fields: fieldsStoffeFarben },
	];

	const [columnselector, setColumselector] = useState(fieldSelectArr[0].fields);
	const [selectedHandsonTableLayout, setSelectedHandsonTableLayout] = useState(
		fieldSelectArr[0]
	);

	const columnNames = [];
	columnHeaders.map((row, i) => {
		dataSchema[row] = null;

		const obj = {
			data: row,
		};
		if (
			[
				"stock_status",
				"preisanhang",
				"sale_verfuegbarkeit",
				"ausstellungsstueck",
				"online_bestellbar",
				"kissenform",
				"machart",
				"farbe1___",
				"farbe2___",
				"farbe3___",
				"farbe4___",
				"farbe5___",
				"farbe6___",
				"farbe7___",
				"farbe8___",
				"productimage",
				"slider2___",
			].includes(row)
		) {
			obj["type"] = "dropdown";
			if (row == "stock_status") {
				obj["source"] = stockstatusValues;
			}
			if (row == "preisanhang") {
				obj["source"] = preisanhangValues;
			}
			if (row == "sale_verfuegbarkeit") {
				obj["source"] = sale_verfuegbarkeitValues;
			}
			if (row == "ausstellungsstueck") {
				obj["source"] = ausstellungsstueckValues;
			}
			if (row == "kissenform") {
				obj["source"] = kissenformValues;
			}
			if (row == "machart") {
				obj["source"] = kissenmachartValues;
			}
			if (row == "online_bestellbar") {
				obj["source"] = ["true", "false"];
			}
			if (row.includes("farbe")) {
				obj["source"] = farbenValues;
			}
			if (selectedHandsonTableLayout.name == "Stoffe Farben") {
				if (row == "productimage") {
					(obj["data"] = "productimage"), (obj["renderer"] = coverRenderer);
				}
				if (row == "slider2___") {
					(obj["data"] = "slider2___"), (obj["renderer"] = coverRenderer);
				}
				//console.log("triggered");
			}
		}
		columnNames.push(obj);
	});

	useEffect(() => {
		async function fetchData() {
			let thisdata;
			let thiserror;
			if (selected.term_slug == "sale") {
				const { data, error } = await supabase
					.from("produkte")
					//.select("slug, bezugsstoff_1(slug)")
					.select(columnselector)
					.eq("stock_status", "instock")
					.gt("sale_price", 1)
					.order("order_sale_loop", { ascending: true });
				thisdata = data;
			} else if (selected.term_slug == "shop") {
				const { data, error } = await supabase
					.from("produkte")
					//.select("slug, bezugsstoff_1(slug)")
					.select(columnselector)
					.eq("_online_bestellbar", true)
					.order("stock_status", { ascending: true })
					.order("order_shop", { ascending: true });
				thisdata = data;
			} else {
				const { data, error } = await supabase
					.from("produkte")
					//.select("slug, bezugsstoff_1(slug)")
					.select(columnselector)
					.eq("termslug", selected.term_slug)

					.order("stock_status", { ascending: true })
					.order("order_in_product_category_loop", { ascending: true });
				thisdata = data;
			}
			//console.log(thisdata);
			const finaldata = [];
			thisdata.map((row, i) => {
				delete row.data;
				finaldata.push(row);
			});

			setData(finaldata);

			//
			//change the settings of cells after rendering
			const hot = hotRef.current.hotInstance;

			hot.updateSettings({
				cells(row, col) {
					const cellProperties = {};

					if (
						selected.term_slug != "stoffe" &&
						selectedHandsonTableLayout.name == "Stoffe Farben"
					) {
						//make all cells after the second cell readOnly = true
						if (col > 2) {
							cellProperties.readOnly = true;
						}
					} else {
						if (col > 2) {
							cellProperties.readOnly = false;
						}
					}

					return cellProperties;
				},
			});
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, columnselector]);

	return (
		<>
			<ColumdfieldSelector
				fieldSelectArr={fieldSelectArr}
				columnselector={columnselector}
				setColumselector={setColumselector}
				selectedHandsonTableLayout={selectedHandsonTableLayout}
				setSelectedHandsonTableLayout={setSelectedHandsonTableLayout}
			/>

			<HotTable
				ref={hotRef}
				data={data}
				dataSchema={dataSchema}
				colHeaders={columnHeaders}
				columns={columnNames}
				height="auto"
				width="auto"
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
			<button className="btn" onClick={(...args) => handleSave(...args)}>
				save
			</button>
		</>
	);
}
