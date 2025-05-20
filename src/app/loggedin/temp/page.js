"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { blurhashFromUrl } from "@/lib/blurhashFromUrl";
import { Blurhash } from "react-blurhash";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function App() {
	const [blurhash, setBlurhash] = useState(false);
	const [update, setUpdate] = useState("let's start...");
	const [arrOfTables, setArrOffTables] = useState([
		"produkte",
		"produktkategorien",
	]);
	const [columns, setColumns] = useState();
	const [table, setTable] = useState();
	const [column, setColumn] = useState();
	const [urlArr, setUrlArr] = useState([]);
	const [buttonStatus, setButtonStatus] = useState(true);
	const [columnToUpdate, setColumnToUpdate] = useState();

	useEffect(() => {
		// async function getTables() {
		// 	//console.log(table, column);
		// 	const apiRoute = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
		// 	const header = {
		// 		headers: {
		// 			apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		// 		},
		// 	};
		// 	const res = await fetch(apiRoute, header);
		// 	const dataArr = await res.json();
		// 	const object =
		// 		typeof dataArr === "object" ? dataArr.paths : { object: "is loading" };
		// 	const arrObject = Object.entries(object);
		// 	const arrOfTables = [];
		// 	arrObject.map((el, i) => {
		// 		//console.log(el);
		// 		if (i == 0) {
		// 			return;
		// 		}
		// 		arrOfTables.push(el[0].replace("/", ""));
		// 	});
		// 	arrOfTables.sort();
		// 	setArrOffTables(arrOfTables);
		// 	//console.log(arrOfTables);
		// }
		// getTables();
	}, []);

	async function start() {
		// let { data, error } = await supabase
		// 	.from(table)
		// 	.select("first_img")
		// 	.neq("first_img", null);

		// console.log(data);
		let txt = "";
		let newUpdate = "";
		for (let index = 0; index < urlArr.length; index++) {
			txt = "";
			newUpdate = "";
			const img = urlArr[index];

			// check if the url is already in the database
			let { data: duplicates, duplicateserror } = await supabase
				.from("images")
				.select("path")
				.ilike(
					"path",
					img
						.replace("https://media.bretz-austria.at", "")
						.replace("https://bretz-austria.b-cdn.net", "")
				);

			console.log("duplicates", duplicates, img);
			//console.log("duplicateserror", duplicateserror);

			// if the image is not already in the database, write it now to the database
			if (duplicates == []) {
				console.log("no duplicate");
				txt = `<p>${index + 1} of ${
					urlArr.length
				}</p><p> fetching ${img}...</p><img src="${img.replace(
					"https://bretz-austria.b-cdn.net",
					"https://media.bretz-austria.at"
				)}?width=200" >`;
				newUpdate = `${newUpdate} ${txt}`;
				setUpdate(newUpdate);

				const a = await blurhashFromUrl({ imageUrl: img });
				txt = `<p>blurhash created, now writing into database...`;
				newUpdate = `${newUpdate} ${txt}`;
				setUpdate(newUpdate);

				const { data: upsert, error } = await supabase
					.from("images")
					.upsert([
						{
							path: img
								.replace("https://media.bretz-austria.at", "")
								.replace("https://bretz-austria.b-cdn.net", ""),
							width: a.width,
							height: a.height,
							blurhash: a.blurhash,
							bunnyUrl: img.replace(
								"https://media.bretz-austria.at",
								"https://bretz-austria.b-cdn.net"
							),
							ratio: `${a.width} / ${a.height}`,
						},
					])
					.select();
				// update the table where we got the images from with the id, so we can reference it in future
				const idToWrite = upsert[0].id;
				const { updatedColumn } = await supabase
					.from(table)
					.update({ columnToUpdate: idToWrite })
					.eq(column, img)
					.select();
				console.log("updated column", updatedColumn);

				txt = `<p>image with metadata and blurhash added to database`;
			} else {
				txt = `<p>image is already in database`;
				console.log("triggered");
				newUpdate = `${newUpdate} ${txt}`;
				setUpdate(newUpdate);
			}
		}
	}

	async function getColumns(e) {
		const a = await supabase.from(e).select("*").range(0, 0);
		const columns = Object.keys(a.data[0]);
		setColumns(columns);
		setTable(e);
	}
	async function getArrOfImages(e) {
		const otherfield = table == "produkte" ? "slug" : "term_slug";

		const a = await supabase
			.from(table)
			.select(e, otherfield)
			.neq(e, null)
			.neq(e, "");
		const arr = [];
		//console.log(a.data);

		a.data.map((el, i) => {
			arr.push(el[e]);
		});
		setUrlArr(arr);
		setColumn(e);
		setButtonStatus(false);
	}
	//console.log(urlArr);
	return (
		<div className="container mx-auto grid gap-4">
			make a request to the database
			<div>
				<Select
					onValueChange={(e) => {
						getColumns(e);
					}}
				>
					<SelectTrigger className="w-[50%]">
						<SelectValue placeholder="wähle eine Tabelle aus" />
					</SelectTrigger>
					<SelectContent className="overflow-y-auto max-h-[30rem]">
						<SelectGroup>
							{arrOfTables.map((table, i) => {
								return (
									<SelectItem key={i} value={table}>
										{table}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div>
				{columns && (
					<Select
						onValueChange={(e) => {
							getArrOfImages(e);
						}}
					>
						<SelectTrigger className="w-[50%]">
							<SelectValue placeholder="wählen Sie ein Feld aus" />
						</SelectTrigger>
						<SelectContent className="overflow-y-auto max-h-[30rem]">
							<SelectGroup>
								{columns.map((column, i) => {
									return (
										<SelectItem key={i} value={column}>
											{column}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</div>
			<div>
				<Textarea
					placeholder="the result will be here"
					//readOnly
					rows="10"
					value={JSON.stringify(urlArr, undefined, 4)}
					onChange={(e) => setUrlArr(JSON.parse(e.target.value))}
				/>
			</div>
			<div>
				{columns && (
					<Select
						onValueChange={(e) => {
							setColumnToUpdate(e);
						}}
					>
						<SelectTrigger className="w-[50%]">
							<SelectValue placeholder="wählen Sie ein Feld aus, indem die id eingefügt wird" />
						</SelectTrigger>
						<SelectContent className="overflow-y-auto max-h-[30rem]">
							<SelectGroup>
								{columns.map((column, i) => {
									return (
										<SelectItem key={i} value={column}>
											{column}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</div>
			<div>
				<Button
					onClick={() => {
						start();
						setButtonStatus(true);
					}}
					disabled={buttonStatus}
				>
					make blurhash
				</Button>
			</div>
			<div dangerouslySetInnerHTML={{ __html: update }}></div>
		</div>
	);
}
