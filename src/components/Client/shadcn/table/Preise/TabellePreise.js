"use client";

import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
registerAllModules();
import { useUserStore } from "@/lib/zustand/useUserStore";
import { supabase } from "@/lib/supabaseClient";
import { HotTable } from "@handsontable/react";
import { useEffect, useRef, useState } from "react";
import ColumdfieldSelector from "@/components/Client/tables/sub/ColumdfieldSelector";

export default function TabellePreise({ produkte }) {
	const [data, setData] = useState([]);
	const hotRef = useRef(null);

	const keys = Object.keys(produkte[0]);
	//console.log(keys);

	const obj = {};
	const columns = [];

	keys.map((row, i) => {
		const obj2 = {};
		obj2["data"] = row;
		obj[row] = null;
		columns.push(obj2);
	});

	const dataSchema = { obj };

	useEffect(() => {
		async function fetchData() {
			// let thisdata;
			// let thiserror;
			// if (selected.term_slug == "sale") {
			// 	const { data, error } = await supabase
			// 		.from("produkte")
			// 		//.select("slug, bezugsstoff_1(slug)")
			// 		.select(columnselector)
			// 		.eq("stock_status", "instock")
			// 		.gt("sale_price", 1)
			// 		.order("order_sale_loop", { ascending: true });
			// 	thisdata = data;
			// } else if (selected.term_slug == "shop") {
			// 	const { data, error } = await supabase
			// 		.from("produkte")
			// 		//.select("slug, bezugsstoff_1(slug)")
			// 		.select(columnselector)
			// 		.eq("_online_bestellbar", true)
			// 		.order("stock_status", { ascending: true })
			// 		.order("order_shop", { ascending: true });
			// 	thisdata = data;
			// } else {
			// 	const { data, error } = await supabase
			// 		.from("produkte")
			// 		//.select("slug, bezugsstoff_1(slug)")
			// 		.select(columnselector)
			// 		.eq("termslug", selected.term_slug)
			// 		.order("stock_status", { ascending: true })
			// 		.order("order_in_product_category_loop", { ascending: true });
			// 	thisdata = data;
			// }
			// //console.log(thisdata);
			// const finaldata = [];
			// thisdata.map((row, i) => {
			// 	delete row.data;
			// 	finaldata.push(row);
			// });
			// setData(finaldata);
			//
			//change the settings of cells after rendering
			// const hot = hotRef.current.hotInstance;
			// hot.updateSettings({
			// 	cells(row, col) {
			// 		const cellProperties = {};
			// 		if (
			// 			selected.term_slug != "stoffe" &&
			// 			selectedHandsonTableLayout.name == "Stoffe Farben"
			// 		) {
			// 			//make all cells after the second cell readOnly = true
			// 			if (col > 2) {
			// 				cellProperties.readOnly = true;
			// 			}
			// 		} else {
			// 			if (col > 2) {
			// 				cellProperties.readOnly = false;
			// 			}
			// 		}
			// 		return cellProperties;
			// 	},
			// });
		}
		fetchData();
	}, []);

	return (
		<>
			{/* <ColumdfieldSelector
				fieldSelectArr={fieldSelectArr}
				columnselector={columnselector}
				setColumselector={setColumselector}
				selectedHandsonTableLayout={selectedHandsonTableLayout}
				setSelectedHandsonTableLayout={setSelectedHandsonTableLayout}
			/> */}

			<HotTable
				ref={hotRef}
				data={produkte}
				dataSchema={dataSchema}
				colHeaders={keys}
				columns={columns}
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
