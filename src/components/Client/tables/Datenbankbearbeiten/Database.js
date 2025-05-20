"use client";

import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable";
import { registerAllModules } from "handsontable/registry";
registerAllModules();
import { useUserStore } from "@/lib/zustand/useUserStore";
import { supabase } from "@/lib/supabaseClient";

//import { HotTable } from "@handsontable/react";
import HotTable from "@/components/Client/ssrtable/HotTable";
import { useEffect, useRef, useState } from "react";
import ColumdfieldSelector from "@/components/Client/tables/sub/ColumdfieldSelector";
import HeadlessUiListbox from "@/components/Client/headlessui/Listbox";
import { fetchDataFromSupabase } from "./lib/fetchDataFromSupabase";
import Error from "./sub/Error";
//import { Pagination } from "@tanstack/react-table";
import Pagination from "./sub/Pagination";
//import TabelleStammDaten from "../TabelleStammDaten";
import HeadlessUIModal from "../../headlessui/Modal";

//import dynamic from "next/dynamic";

export default function Database({
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
	url,
}) {
	// sync back
	const drawCheckboxInRowHeaders = function drawCheckboxInRowHeaders(row, TH) {
		// create input
		const input = document.createElement("input");
		const factor = (page - 1) * range;

		// create span
		const span = document.createElement("span");
		span.innerHTML = row + 1 + factor;
		//span.classList.add("px-2");

		// create div
		const div = document.createElement("div");
		div.classList.add("grid");
		div.classList.add("grid-flow-col");
		//div.classList.add("px-2");
		// px-2
		input.type = "checkbox";
		input.addEventListener("click", (e) => {
			handleselectrow(e, row);
		});

		if (row >= 0 && this.getDataAtRowProp(row, "0")) {
			input.checked = true;
		}
		input.classList.add("px-2");
		div.appendChild(span);
		div.appendChild(input);

		Handsontable.dom.empty(TH);

		TH.appendChild(div);
	};
	let selectedRows = [];
	function handleselectrow(e, row) {
		const newArr = [...selectedRows];
		let rowToDelete = -1;
		newArr.map((el, i) => {
			if (el == row) {
				rowToDelete = i;
			}
		});
		if (rowToDelete == -1) {
			newArr.push(row), newArr.sort();
		} else {
			const x = newArr.splice(rowToDelete, 1);
		}
		selectedRows = [...newArr];
		if (selectedRows.length > 0) {
			//console.log(selectedRows);
			setShowDeleteButton(true);
		} else {
			//console.log(selectedRows);
			setShowDeleteButton(false);
		}
		//console.log(selectedRows);
	}

	const handleSave = async () => {
		//console.log(readDataArr);

		// get the highest id number
		let obj = await supabase
			.from(selectedTable)
			.select("id")
			.order("id", { ascending: false })
			.limit(1);

		const highestID = obj.data[0].id;
		let upsertID = highestID + 1;

		const hot = hotRef.current.hotInstance;
		//daten aus Tabelle lesen
		const readDataArr = hot.getData();
		const keys = colHeaders;
		//console.log(readDataArr);
		const newArr = [];
		// build an array to upsert the table
		readDataArr.map((row, i) => {
			//console.log(row);

			// if the third cell of a row is empty, don't do anything with that tow
			if (row[2] == null) {
				return;
			}
			if (row[0]) {
				//console.log(row[0]);
			}
			//console.log(row);
			const obj = {};
			row.map((subrow, subi) => {
				//console.log(subrow);
				//console.log(subrow);
				//console.log(subrow);
				let cell;
				if (subrow == false) {
					cell = false;
				} else {
					if (subrow == "" || subrow == " " || subrow == "  ") {
						cell = null;
					} else {
						cell = subrow;
					}
				}

				//console.log(cell);
				const str = cell;

				obj[keys[subi]] = str;
			});
			if (obj.id == null) {
				obj.id = upsertID;
				upsertID++;
			}
			//console.log(obj);
			newArr.push(obj);
		});

		//console.log(newArr);

		//console.log(highestID);
		//console.log(newArr);
		//console.log(newArr);
		const { data, error } = await supabase
			.from(selectedTable)
			.upsert(newArr)
			.select();

		//console.log(error);
		if (data) {
			//setShowSuccessMessage(true);
			//console.log("hat funktioniert");
			//fetchProductList();
			setDataOfSelectedTable(data);
			//console.log(data);
		}
		if (error) {
			setErrormessage(error);
			//console.log(error);
		}
	};

	async function deleteselectedrows() {
		const hot = hotRef.current.hotInstance;
		//daten aus Tabelle lesen
		const readDataArr = hot.getData();
		const keys = colHeaders;
		//console.log(readDataArr);

		const newArr = [];
		// build an array to upsert the table
		readDataArr.map((row, i) => {
			//console.log(row);

			// if the third cell of a row is empty, don't do anything with that tow
			if (row[2] == null) {
				return;
			}
			if (row[0]) {
				//console.log(row[0]);
			}
			//console.log(row);
			const obj = {};
			row.map((subrow, subi) => {
				//console.log(subrow);

				const str = subrow;

				obj[keys[subi]] = str;
			});
			selectedRows.map((ell, ii) => {
				if (ell == i) {
					newArr.push(obj);
				}
			});
		});

		// async loop to delete every single line
		for (let index = 0; index < newArr.length; index++) {
			const { data, error } = await supabase
				.from(selectedTable)
				.delete()
				.eq("id", newArr[index].id);
			//console.log(newArr[index].id);
			//console.log(data);
			setErrormessage(error);
		}

		const { data, count, error } = await fetchDataFromSupabase(
			selectedTable,
			"*",
			0,
			rangeEnd,
			setErrormessage
		);
		setDataOfSelectedTable(data);
		setUnfilteredDataOfSelectedTable(data);
		setTotalRows(count);
		//console.log(newArr);

		//console.log(selectedRows);
	}

	const [rawListOfTables, setRawListOfTables] = useState("loading...");
	const [selectedTable, setSelectedTable] = useState("select a table");
	const [dataOfSelectedTable, setDataOfSelectedTable] = useState();
	const [unfilteredDataOfSelectedTable, setUnfilteredDataOfSelectedTable] =
		useState();
	const [colHeaders, setColHeaders] = useState();
	const [columns, setColumns] = useState();
	const [filterForTable, setFilterForTable] = useState("just a random string");
	const [filterArr, setFilterArr] = useState();
	const [dataSchema, setDataSchema] = useState();
	const [errormessage, setErrormessage] = useState();
	const [showDeleteRowButton, setShowDeleteButton] = useState();
	const [totalRows, setTotalRows] = useState();
	const [range, setRange] = useState(25);

	const [rangeArr, setRangeArr] = useState();

	const [page, setPage] = useState(1);
	const [count, setCount] = useState();

	const [loadTable, setLoadTable] = useState(false);

	// only used when the table _a_produkte is selected
	const [openModal, setOpenModal] = useState(false);
	let rangeStart = 0;
	let rangeEnd = range - 1;

	useEffect(() => {
		//console.log("useeffect");
		// create the rangeArr
		const helperArr = [];
		let helperStr = 0;
		for (let index = 0; index < 100; index++) {
			helperArr.push(helperStr + range);
			helperStr = helperStr + range;
		}
		setRangeArr([...helperArr]);
		//console.log(helperArr);
		async function fetchData() {
			// get an object with all tables of the database
			const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
			const header = {
				headers: {
					apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
				},
			};
			const res = await fetch(apiRoute, header);

			const dataArr = await res.json();
			//console.log(dataArr);
			setRawListOfTables(dataArr);
		}
		fetchData();
		//}, [selected, columnselector]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const object =
		typeof rawListOfTables === "object"
			? rawListOfTables.paths
			: { object: "is loading" };
	const arrObject = Object.entries(object);

	const arrOfTables = [];
	arrObject.map((el, i) => {
		//console.log(el);
		if (i == 0) {
			return;
		}
		arrOfTables.push(el[0].replace("/", ""));
	});
	arrOfTables.sort();
	arrOfTables.unshift("select a table");
	//console.log(arrOfTables);
	//console.log(object);

	// useeffect for fetching data of table
	useEffect(() => {
		// do nothing, when this is selected
		setPage(1);
		rangeStart = 0;
		rangeEnd = range - 1;

		// fetch data
		async function fetchData() {
			//console.log(rangeStart, rangeEnd);
			let { data, count, error } = await fetchDataFromSupabase(
				selectedTable,
				"*",
				rangeStart,
				rangeEnd,
				setErrormessage
			);
			//console.log(data);
			if (data[0].slug) {
				//console.log("yes");
				data = data.sort(function (a, b) {
					let x = a.slug.toLowerCase();
					let y = b.slug.toLowerCase();
					if (x > y) {
						return 1;
					}
					if (x < y) {
						return -1;
					}
					return 0;
				});
				data = data.sort(function (a, b) {
					let x = a.stock_status.toLowerCase();
					let y = b.stock_status.toLowerCase();
					if (x > y) {
						return 1;
					}
					if (x < y) {
						return -1;
					}
					return 0;
				});
			}
			//console.log(data);
			//console.log(error);

			// set the state of variable
			setDataOfSelectedTable(data);
			setUnfilteredDataOfSelectedTable(data);
			setTotalRows(count);
			//console.log(data);
			//console.log(error);
			// do nothing if data is null
			if (data == null || data == []) {
				return;
			}
			//console.log(data);
			// get the first row of the data
			const firstRow = data[0];

			// get the headers of the first row
			const headers = Object.keys(firstRow);

			// set the state for the table
			setColHeaders(headers);

			// table definitions
			const tableDefinitions = rawListOfTables.definitions[selectedTable];
			const requiredFieldsArr = tableDefinitions.requiredFields;
			const fieldDefinitions = tableDefinitions.properties;
			//console.log(fieldDefinitions);

			//
			//build columns array for the table
			const col = [];

			const fieldsWithForeignKeys = [];
			//const schema = {};
			headers.map((el, i) => {
				let readonlyVar = false;
				let cellTypeVar = "text";
				const obj = { data: el };
				if (fieldDefinitions[el].description) {
					if (fieldDefinitions[el].description.includes("Foreign")) {
						const newobj = stripAString(el, fieldDefinitions[el].description);
						//console.log(el);
						//console.log(str);

						//console.log(el);
						fieldsWithForeignKeys.push(newobj);
					}
				}
				if (
					fieldDefinitions[el].default == "now()" ||
					fieldDefinitions[el].format == "bigint"
				) {
					//console.log(el);
					obj["readOnly"] = true;
				}
				if (fieldDefinitions[el].type == "boolean") {
					obj["type"] = "dropdown";
					obj["source"] = ["true", "false"];
				}
				if (fieldDefinitions[el].format == "numeric") {
					obj["type"] = "numeric";
				}

				//console.log(obj);
				//console.log(fieldsWithForeignKeys);
				col.push(obj);
				//schema[el] = null;
			});
			//console.log(schema);
			// set state for the table

			//console.log(col);
			// sometimes some foreign keys are not found, here we add them manually, if we know the problem...
			if (selectedTable == "_a_produkte") {
				let checker = 0;
				fieldsWithForeignKeys.map((el, i) => {
					if (el.field == "produktkategorie") {
						checker = 1;
					}
				});
				if (checker == 0) {
					fieldsWithForeignKeys.push({
						field: "produktkategorie",
						foreignRelation: "_a_produktkategorien.title",
					});
				}
				//console.log(checker);
				//console.log(fieldsWithForeignKeys);
			}

			//
			// get all foreign keys of this table
			//console.log(col);
			for (let index = 0; index < fieldsWithForeignKeys.length; index++) {
				// Get num of each fruit
				//	console.log(fieldsWithForeignKeys[index]);
				const helperArr =
					fieldsWithForeignKeys[index].foreignRelation.split(".");
				const table = helperArr[0];
				const field = helperArr[1];
				//console.log(table);
				//console.log(field);
				const { data, error } = await supabase
					.from(table)

					.select(`${field}`);
				//console.log(error);
				const newArr = [];
				if (data == []) {
					return;
				}
				data.map((el, i) => {
					newArr.push(el[field]);
				});
				col.map((el, i) => {
					//console.log(el.data);
					//console.log(field);
					if (el.data == fieldsWithForeignKeys[index].field) {
						//console.log(el.data);
						//console.log(newArr);
						if (el.type) {
							return;
						}
						el["type"] = "dropdown";
						el["source"] = newArr;
					}
				});
				//console.log(newArr);
				// .range(0, 9);
			}
			//	console.log(col);
			setColumns(col);

			// only for table _a_produkte
			if (selectedTable == "_a_produkte") {
				col.map((el, i) => {
					if (el.data == "produktkategorie") {
						const theArr = el.source;
						theArr.sort();
						theArr.unshift("Alle Produktkategorien");
						//console.log(theArr);
						setFilterArr(theArr);
					}
				});
			}
		}

		if (selectedTable == "select a table") {
			return;
		} else {
			fetchData();
		}
	}, [selectedTable, range]);

	//console.log("range: " + range);

	useEffect(() => {
		if (page == 1) {
			rangeStart = 0;
			rangeEnd = range - 1;
		} else {
			rangeStart = rangeEnd + 1 + range * (page - 2);
			rangeEnd = rangeEnd + range * (page - 1);
		}

		//console.log(page, range, rangeStart, rangeEnd);

		async function fetchdata() {
			const { data, count, error } = await fetchDataFromSupabase(
				selectedTable,
				"*",
				rangeStart,
				rangeEnd,
				setErrormessage
			);
			//console.log(data);
			//console.log(error);

			// set the state of variable
			setDataOfSelectedTable(data);
			setUnfilteredDataOfSelectedTable(data);
			setTotalRows(count);
		}
		if (selectedTable == "select a table") {
			return;
		} else {
			fetchdata();
		}
	}, [page]);
	// let HotTable;

	useEffect(() => {
		// HotTable = dynamic(() => import("@handsontable/react"), {
		// 	ssr: false,
		// });
		//console.log(filterForTable);
		if (filterForTable == "just a random string") {
			return;
		}

		if (filterForTable == "Alle Produktkategorien") {
			setDataOfSelectedTable(unfilteredDataOfSelectedTable);
			return;
		}
		async function fetchdata() {
			const { data, error } = await fetchDataFromSupabase(
				selectedTable,
				"*",
				0,
				999999999,
				setErrormessage,
				"produktkategorie",
				filterForTable
			);
			//console.log(filterForTable);

			// set the state of variable
			setDataOfSelectedTable(data);
		}
		fetchdata();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterForTable]);

	//useEffect(() => {}, [rangeEnd]);

	// const keys = Object.keys(data[0]);
	const hotRef = useRef(null);
	//console.log(colHeaders);
	//console.log(selectedTable);
	// console.log(selectedRows);
	// console.log(showDeleteRowButton);
	const hiddenColumns = { indicators: true, copyPasteEnabled: false };
	return (
		<>
			<div className="flex gap-4 py-4">
				{errormessage && (
					<Error
						errormessage={errormessage}
						setErrormessage={setErrormessage}
					/>
				)}
				{/* {JSON.stringify(rawListOfTables.definitions)} */}
				<HeadlessUiListbox
					listBoxArr={arrOfTables}
					selectedTable={selectedTable}
					setSelectedTable={setSelectedTable}
				/>
				{filterArr && selectedTable == "_a_produkte" ? (
					<HeadlessUiListbox
						listBoxArr={filterArr}
						filterForTable={filterForTable}
						setFilterForTable={setFilterForTable}
					/>
				) : null}
				{totalRows && (
					<div className="self-center">total rows of table: {totalRows} </div>
				)}
				{rangeArr && selectedTable != "select a table" && totalRows > range ? (
					<span>
						show rows:
						<HeadlessUiListbox
							listBoxArr={rangeArr}
							range={range}
							setRange={setRange}
						/>
					</span>
				) : null}
				{totalRows > range && (
					<div className="overflow-x-scroll flex-nowrap">
						<Pagination
							totalRows={totalRows}
							range={range}
							page={page}
							setPage={setPage}
						/>
					</div>
				)}
				{selectedTable == "_a_produkte" ? (
					<>
						<button
							type="button"
							onClick={() => setOpenModal(true)}
							className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
						>
							Export Büroware
						</button>
						<HeadlessUIModal
							openModal={openModal}
							setOpenModal={setOpenModal}
							filterArr={filterArr}
							filterForTable={filterForTable}
							setFilterForTable={setFilterForTable}
							setErrormessage={setErrormessage}
							url={url}
						/>
					</>
				) : null}
			</div>

			{/* <ColumdfieldSelector
				fieldSelectArr={fieldSelectArr}
				columnselector={columnselector}
				setColumselector={setColumselector}
				selectedHandsonTableLayout={selectedHandsonTableLayout}
				setSelectedHandsonTableLayout={setSelectedHandsonTableLayout}
			/> */}
			{dataOfSelectedTable && (
				<>
					<div id="myTable" className="max-h-[90vh]">
						{HotTable && (
							<HotTable
								ref={hotRef}
								data={dataOfSelectedTable}
								//dataSchema={dataSchema}
								colHeaders={colHeaders}
								columns={columns}
								height="700"
								width="1600"
								minSpareRows={1}
								licenseKey="non-commercial-and-evaluation"
								columnSorting={true}
								// enable filtering
								filters={true}
								// enable the column menu
								dropdownMenu={true}
								fixedColumnsStart={1}
								manualColumnResize={true}
								manualColumnMove={true}
								autoRowSize={true}
								rowHeaders={true}
								afterGetRowHeader={drawCheckboxInRowHeaders}
								contextMenu={true}
								manualColumnFreeze={true}
								hiddenColumns={hiddenColumns}
							></HotTable>
						)}
					</div>
					<div className="flex space-x-2">
						<button
							className="btn bg-green-300"
							onClick={(...args) => handleSave(...args)}
						>
							save
						</button>
						{showDeleteRowButton == true ? (
							<button
								className="btn bg-red-600 "
								onClick={(...args) => deleteselectedrows(...args)}
							>
								delete selected rows
							</button>
						) : null}
					</div>
					{/* {selectedTable == "_a_produkte" ? <HeadlessUIDisclosure /> : null} */}
				</>
			)}
		</>
	);
}

function stripAString(el, str) {
	const str2 = str.replace(`Note:\n`, "");

	const str3 = str2.replace("This is a Foreign Key to `", "");
	const str4 = str3.split("`")[0];
	const obj = {};
	obj["field"] = el;
	obj["foreignRelation"] = str4;
	//console.log(obj);
	return obj;
}
