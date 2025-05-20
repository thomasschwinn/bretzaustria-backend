"use client";
import Modal from "@/components/Client/shadcn/table/Modal";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useUserStore } from "@/lib/zustand/useUserStore";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import SaveButton from "@/components/Client/shadcn/table/SaveButton";

//import { columns } from "./ProductTable/columns";

import { useRef } from "react";
import Modallink from "@/components/Client/shadcn/table/Modallink";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const showColumnsInTable = [
	"slug",
	"title",
	"price",
	"sale_price",
	"stock_status",
];

let update = [];
let tablerow = 0;
export default function RenderProductTable({ fetchProductList }) {
	const {
		dataObj,
		productlist,
		prodCatList,
		saleVerfuegbarkeitArr,
		selected,
		setSlug,
	} = useUserStore();
	//console.log(productlist);
	const keys = productlist ? Object.keys(productlist[0]) : {};
	//const [priceupdate, setPriceupdate] = useState(false);
	//const [percentage, setPercentage] = useState(1);
	//const [checked, setChecked] = useState(false);

	const handleChecked = (e) => {
		setChecked(!checked);
	};
	//console.log(productlist);
	//console.log(defineColumns);
	const columns = defineColumns(
		keys,
		prodCatList,
		dataObj,
		handleChange,
		defineColumns
	);

	let updateArr = [];
	productlist.map((row) => {
		updateArr.push({ slug: row.slug });
	});
	//console.log(updateArr);

	//console.log(updateArr);
	function handleChange(e) {
		const key = e.target.name;
		const value = e.target.value;
		const slug = e.target.getAttribute("data-slug");
		//const helperarr = JSON.parse(JSON.stringify(updateArr));
		//console.log(key, value, slug);
		const helperarr = [...updateArr];

		//console.log(helperarr);
		helperarr.map((row, i) => {
			if (row.slug == slug) {
				// for the update Array
				row[key] = value;
			}
		});
		updateArr = [...helperarr];
	}
	//console.log(updateArr);
	//const [wirklich, setWirklich] = useState(false);

	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({
		chosen: false,
		selected: false,
		lieferzeit: false,
	});

	const [rowSelection, setRowSelection] = useState({});
	// const [data, setData] = useState(() => {
	// 	if (productlist) {
	// 		return productlist;
	// 	} else {
	// 		return [];
	// 	}
	// });
	// useEffect(() => {
	// 	setData(productlist);
	// }, [productlist]);
	const data = productlist ? productlist : [];
	//console.log(columns);
	let table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		// getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	//console.log(tablerow);

	const columnsNotToRender = [
		"zeichnung_2___",
		"slider3___",
		"slider5___",
		"slider7___",
		"stock_status",
	];
	return (
		<>
			<Modal fetchProductList={fetchProductList} />{" "}
			{/* {JSON.stringify(updateArr)} */}
			<div className="w-full">
				<div className="flex items-center py-4">
					{/* <SaveButton
						fetchProductList={fetchProductList}
						updateArr={updateArr}
						selected={selected}
						//setChecked={setChecked}
					/> */}
					<Input
						placeholder="Filter..."
						value={table.getColumn("title")?.getFilterValue()}
						onChange={(event) =>
							table.getColumn("title")?.setFilterValue(event.target.value)
						}
						className="max-w-sm mx-4"
					/>
					{/* <span className="mx-4">Priceupdate</span>
					<input
						type="checkbox"
						// label="My Value"
						value={checked}
						onChange={handleChecked}
					/>

					{checked && (
						<Input
							className="max-w-sm mx-4"
							name="priceupdate_percent"
							//value={priceupdatePercent}
							pattern="[1-9]"
							onChange={(e) => {
								//setPriceupdatePercent;
								handelPriceUpdate(e);
							}}
						/>
					)} */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									const showdefault = showColumnsInTable.includes(column.id);
									//console.log(column);
									//console.log(showdefault);
									// if (!showdefault) {
									// 	column.toggleVisibility(false);
									// }
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											//checked={showdefault}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => {
								//console.log(headerGroup.headers);
								return (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											if (columnsNotToRender.includes(header.id)) {
												return;
											}
											if (
												[
													"slider2___",
													"slider4___",
													"slider6___",
													"slider8___",
												].includes(header.id)
											) {
												return <TableHead key={header.id}></TableHead>;
											}
											if (header.id.includes("zeichnung")) {
												return <TableHead key={header.id}>Zeichnung</TableHead>;
											}
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
														  )}
												</TableHead>
											);
										})}
									</TableRow>
								);
							})}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => {
									//console.log(row.original.stock_status);
									//tablerow = tablerow + 1;
									//console.log(tablerow);
									return (
										<TableRow
											key={row.id + "zyx"}
											data-state={row.getIsSelected() && "selected"}
											className={`${
												row.original.stock_status == "outofstock"
													? "bg-red-50"
													: null
											}`}
										>
											{row.getVisibleCells().map((cell) => {
												if (columnsNotToRender.includes(cell.column.id)) {
													return;
												}
												return (
													<TableCell key={cell.id + "wvu"}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className="space-x-2">
						{/* <Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button> */}
					</div>
				</div>
			</div>
		</>
	);
}

function defineColumns(
	obj,
	prodCatList,
	dataObj,
	fetchProductList,
	handleChange
) {
	const newobj = { term_slug: null, term_name: " " };
	const prodCat2 = JSON.parse(JSON.stringify(prodCatList));
	prodCat2.unshift(newobj);
	//console.log(prodCat2);

	const keys = obj;
	const columns = [];
	//console.log(keys);

	//console.log(keys);
	keys.map((rowValue, i) => {
		//console.log(rowValue);
		const obj = { accessorKey: rowValue, header: rowValue };
		if (["title"].includes(rowValue)) {
			obj["cell"] = ({ row }) => {
				const slug = row.original.slug;
				if (rowValue == "title") {
					tablerow = tablerow + 1;
				}

				return (
					<>
						<div>
							<input
								key={i + "abc"}
								defaultValue={row.getValue(rowValue)}
								data-slug={slug}
								//value={thisvalue}
								//onChange={handleFormFieldChange}
								name={rowValue}
								className="inputfields"
								onChange={(e) => {
									handleChange(e);
								}}
								type={
									rowValue == "price" || rowValue == "sale_price"
										? "number"
										: null
								}
							/>
							{/* {render == true ? (
								<span className="text-green-500">{row.getValue(rowValue)}</span>
							) : null} */}
							{rowValue == "title" ? (
								<Modallink
									slug={slug}
									tablerow={tablerow}
									fetchProductList={fetchProductList}
								/>
							) : null}
						</div>
					</>
				);
			};
		}

		if (rowValue == "productimage") {
			obj["cell"] = ({ row }) => (
				<Image
					unoptimized
					src={row.getValue(rowValue) + "?width=100"}
					width={100}
					height={56}
					alt=""
					key={i + "def"}
				/>
			);
		}
		if (rowValue == "slider2___") {
			obj["cell"] = ({ row }) => (
				<>
					{" "}
					{row.getValue(rowValue) && (
						<Image
							unoptimized
							src={row.getValue(rowValue) + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
					{row.getValue("slider3___") && (
						<Image
							unoptimized
							src={row.getValue("slider3___") + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
				</>
			);
		}
		if (rowValue == "slider4___") {
			obj["cell"] = ({ row }) => (
				<>
					{" "}
					{row.getValue(rowValue) && (
						<Image
							unoptimized
							src={row.getValue(rowValue) + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
					{row.getValue("slider5___") && (
						<Image
							unoptimized
							src={row.getValue("slider5___") + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
				</>
			);
		}

		if (rowValue == "slider6___") {
			obj["cell"] = ({ row }) => (
				<>
					{" "}
					{row.getValue(rowValue) && (
						<Image
							unoptimized
							src={row.getValue(rowValue) + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
					{row.getValue("slider7___") && (
						<Image
							unoptimized
							src={row.getValue("slider7___") + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
				</>
			);
		}
		if (rowValue == "slider8___") {
			obj["cell"] = ({ row }) => (
				<>
					{" "}
					{row.getValue(rowValue) && (
						<Image
							unoptimized
							src={row.getValue(rowValue) + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
				</>
			);
		}
		if (rowValue == "zeichnung_1___") {
			obj["cell"] = ({ row }) => (
				<>
					{" "}
					{row.getValue(rowValue) && (
						<Image
							unoptimized
							src={row.getValue(rowValue) + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
					{row.getValue("zeichnung_2___") && (
						<Image
							unoptimized
							src={row.getValue("zeichnung_2___") + "?width=100"}
							width={100}
							height={56}
							alt=""
							key={i + "def"}
						/>
					)}
				</>
			);
		}
		// if (
		// 	[
		// 		"stock_status",
		// 		"termslug",
		// 		"termslug2",
		// 		"preisanhang",
		// 		"sale_verfuegbarkeit",
		// 	].includes(rowValue)
		// 	// rowValue.includes("termslug") ||
		// 	// rowValue == "stock_status" ||
		// 	// rowValue == "saleverfuegbarkeit" ||
		// 	// rowValue == "preisanhang" ||
		// 	// rowValue == "sale_verfuegbarkeit"
		// ) {
		// 	//console.log(prodCat2);
		// 	let arr = prodCatList;
		// 	if (rowValue == "termslug2") {
		// 		arr = prodCat2;
		// 	}
		// 	if (rowValue == "stock_status") {
		// 		const stockStatusArr = [];
		// 		dataObj.stockstatusArr.map((row, i) => {
		// 			stockStatusArr.push(row.value);
		// 		});

		// 		arr = stockStatusArr;
		// 	}

		// 	if (rowValue == "preisanhang") {
		// 		arr = dataObj.preisanhangArr;
		// 	}
		// 	if (rowValue == "sale_verfuegbarkeit") {
		// 		arr = dataObj.saleVerfuegbarkeitArr;
		// 	}

		// 	let defaultValue = null;
		// 	// if (
		// 	// 	rowValue == "sale_verfuegbarkeit" &&
		// 	// 	row.original.sale_price == null
		// 	// ) {
		// 	// 	defaultValue = "nicht im Sale";
		// 	// } else {
		// 	// }
		// 	//const defaultValue=row.original.sale_price==null &&
		// 	obj["cell"] = ({ row }) => (
		// 		<>
		// 			<span className="hidden">
		// 				{
		// 					(defaultValue =
		// 						rowValue == "sale verfuegbarkeit" &&
		// 						row.original.sale_price == null
		// 							? (defaultValue = "nicht im Sale")
		// 							: row.getValue(rowValue))
		// 					// (defaultValue = !defaultValue
		// 					// 	? row.getValue(rowValue)
		// 					// 	: defaultValue)
		// 				}
		// 			</span>
		// 			<select
		// 				className="select select-bordered w-full max-w-xs inputfields"
		// 				//defaultValue={row.getValue(rowValue)}
		// 				defaultValue={defaultValue}
		// 				data-slug={row.original.slug}
		// 				key={i + "ghi"}
		// 				//onChange={handleFormFieldChange}
		// 				name={rowValue}
		// 				onChange={(e) => handleChange(e)}
		// 			>
		// 				{arr.map((cat, i) => {
		// 					if (rowValue.includes("termslug")) {
		// 						return (
		// 							<option
		// 								className={`${
		// 									cat.currentmodel == false ? "bg-red-200" : null
		// 								}`}
		// 								key={i + "jkl"}
		// 								value={cat.term_slug}
		// 								// selected={
		// 								// 	cat.term_slug == row.getValue(rowValue) ? true : false
		// 								// }
		// 							>
		// 								{cat.term_name}
		// 							</option>
		// 						);
		// 					}
		// 					if (rowValue == "stock_status") {
		// 						return (
		// 							<option
		// 								// className={`${
		// 								// 	cat.currentmodel == false ? "bg-red-200" : null
		// 								// }`}
		// 								key={i + "mno"}
		// 								value={cat}
		// 								// selected={cat == row.getValue(rowValue) ? true : false}
		// 							>
		// 								{cat}
		// 							</option>
		// 						);
		// 					}
		// 					if (
		// 						rowValue == "preisanhang" ||
		// 						rowValue == "sale_verfuegbarkeit"
		// 					) {
		// 						//console.log(cat);
		// 						return (
		// 							<option
		// 								// className={`${
		// 								// 	cat.currentmodel == false ? "bg-red-200" : null
		// 								// }`}
		// 								key={i + "pqr"}
		// 								value={cat.value}
		// 								// selected={cat.value == row.getValue(rowValue) ? true : false}
		// 							>
		// 								{cat.value == "kein Preisanhang" ? "" : cat.value}
		// 							</option>
		// 						);
		// 					}
		// 				})}
		// 			</select>
		// 		</>
		// 	);
		// }
		columns.push(obj);
	});
	//console.log(columns);
	return columns;
}
