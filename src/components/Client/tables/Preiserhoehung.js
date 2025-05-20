"use client";

import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";
registerAllModules();
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
//import { HotTable } from "@handsontable/react";
import HotTable from "@/components/Client/ssrtable/HotTable";
import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/zustand/useUserStore";
export default function Preiserhoehung({ fetchProductList }) {
	const { productlist, setProductlist } = useUserStore();
	//console.log(products);
	const columns = Object.keys(productlist[0]);
	//console.log(columns);

	const productprices = [];
	productlist.map((row, i) => {
		const obj = {};
		obj["title"] = row.title;
		obj["slug"] = row.slug;
		obj["old Price"] = row.price;
		obj["price"] = "";
		obj["old Sale Price"] = row.sale_price ? row.sale_price : "";
		obj["sale_price"] = "";
		productprices.push(obj);
	});
	const keys = Object.keys(productprices[0]);
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
			const obj = {};
			row.map((subrow, subi) => {
				// write only this fields in new object
				if (["slug", "price", "sale_price"].includes(keys[subi])) {
					if (subrow != "") {
						// convert type to number when it's a price field
						obj[keys[subi]] = ["price", "sale_price"].includes(keys[subi])
							? +subrow
							: subrow;
					}
				}
			});
			if (!obj.price && !obj.sale_price) {
				return;
			}
			newArr.push(obj);
		});

		const { data, error } = await supabase
			.from("produkte")
			.upsert(newArr)
			.select();
		if (data) {
			fetchProductList();
		}
		//console.log(hot.getData());
		// save all cell's data
		//   fetch('https://handsontable.com/docs/scripts/json/save.json', {
		//     method: 'POST',
		//     mode: 'no-cors',
		//     headers: {
		//       'Content-Type': 'application/json'
		//     },
		//     body: JSON.stringify({ data: hot.getData() })
		//   })
		//     .then(response => {
		//       setOutput('Data saved');
		//       console.log('The POST request is only used here for the demo purposes');
		//     });
	};
	// useEffect(() => {
	// 	const hot = hotRef.current.hotInstance;

	// 	// loadClickCallback = () => {
	// 	//   fetch('https://handsontable.com/docs/scripts/json/load.json')
	// 	//     .then(response => {
	// 	//       response.json().then(data => {
	// 	// 	hot.loadData(data.data);
	// 	// 	// or, use `updateData()` to replace `data` without resetting states
	// 	// 	setOutput('Data loaded');
	// 	//       });
	// 	//     });
	// 	// };
	// });

	return (
		<>
			<HotTable
				ref={hotRef}
				data={productprices}
				dataSchema={{
					title: null,
					slug: null,

					"old Price": null,
					price: null,
					"old Sale Price": null,
					sale_price: null,
				}}
				colHeaders={[
					"title",
					"slug",
					"alter Preis",
					"neuer Preis",
					"alter Sale Preis",
					"neuer Sale Preis",
				]}
				columns={[
					{ data: "title" },
					{ data: "slug" },
					{ data: "old Price" },
					{ data: "price" },
					{ data: "old Sale Price" },
					{ data: "sale_price" },
				]}
				height="auto"
				width="auto"
				minSpareRows={1}
				licenseKey="non-commercial-and-evaluation"
			/>
			<button className="btn" onClick={(...args) => handleSave(...args)}>
				save
			</button>
		</>
	);
}
