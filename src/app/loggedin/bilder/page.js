//const fetch = require("node-fetch");

//import { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import ImageAdminClient from "@/components/Client/imagemanaging/ImageAdminClient";

export default async function Bilder({ searchParams }) {
	const bunnyStorageZone = "bretz-austria-ab-11-2022";
	const bunnyStorageZoneWithSlash = "/" + bunnyStorageZone;

	//console.log(searchParams);
	let path;
	if (!searchParams.path) {
		path = ".";
	} else {
		path = searchParams.path;
	}
	const basedir = ".";
	const dir = basedir;
	let bunnyurl = "https://bretz-austria.b-cdn.net/";
	let imgurl = "https://media.bretz-austria.at/";
	//const url = `https://storage.bunnycdn.com/bretz-austria-ab-11-2022/${dir}/`;

	const options = {
		next: { revalidate: 0 },
		method: "GET",
		headers: {
			accept: "application/json",
			AccessKey: "f1e7a6de-bd76-4ea2-a59687c9a7bc-91c4-48cd",
		},
	};
	const data = await fetch(
		`https://storage.bunnycdn.com/bretz-austria-ab-11-2022/${path}/`,
		options
	).then((response) => response.json());
	if (searchParams) {
		if (path == ".") {
			path = "";
		}
		imgurl = "https://media.bretz-austria.at" + path + "/";
		bunnyurl = "https://bretz-austria.b-cdn.net" + path + "/";
	}
	const bunnyPath = data[0].Path;
	let folderpath = "";

	//console.log(folderpath);
	//console.log(bunnyPath);

	//console.log(data);

	return (
		<ImageAdminClient
			data={data}
			path={path}
			bunnyPath={bunnyPath}
			bunnyStorageZone={bunnyStorageZone}
			folderpath={folderpath}
			imgurl={imgurl}
			bunnyStorageZoneWithSlash={bunnyStorageZoneWithSlash}
			bunnyurl={bunnyurl}
		/>
	);
}
