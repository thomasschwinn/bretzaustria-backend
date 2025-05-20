"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function App() {
	const [result, setResult] = useState();
	useEffect(() => {
		async function fetchSupabase() {
			let { data: images1, error } = await supabase
				.from("produktkategorien")
				.select("term_slug,thirdimage");

			setResult(images1);
			console.log(images1);

			for (let index = 0; index < images1.length; index++) {
				const img = images1[index]?.thirdimage?.replace(
					"https://media.bretz-austria.at",
					"https://bretz-austria.b-cdn.net"
				);
				console.log(img);
				if (img != undefined && img != "") {
					console.log(img);
					let { data: images, error: imageserror } = await supabase
						.from("images")
						.select("*")
						.eq("bunnyUrl", img);

					console.log(images);

					const { data } = await supabase
						.from("produktkategorien")
						.update({ thirdimage_rel: images[0].id })
						.eq("term_slug", images1[index].term_slug)
						.select();
					console.log(data);
				}
			}
		}

		fetchSupabase();
	}, []);

	return (
		<div className="container mx-auto mt-12">
			<pre>{JSON.stringify(result, undefined, 4)}</pre>
		</div>
	);
}
