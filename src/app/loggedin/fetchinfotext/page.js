"use client";

import { useState, useEffect } from "react";

import ListboxForProdCat from "@/components/Client/Pages/FetchInfotext/ListboxForProdCat";
import ListboxForProdCatFactsHighlights from "@/components/Client/Pages/FetchInfotext/ListboxForProdCatFactsHighlights";
import ListboxForProduct from "@/components/Client/Pages/FetchInfotext/ListboxForProduct";
import ListboxForProductLike from "@/components/Client/Pages/FetchInfotext/ListboxForProductLike";
//import { scrapData } from "../../../src/lib/scrapData";
export default function Page() {
	const [infotextDe, setInfotextDe] = useState("");
	const [infotextEn, setInfotextEn] = useState("");
	const [infotextFr, setInfotextFr] = useState("");
	const [infotextObj, setInfotextObj] = useState({});
	const [termslugArr, setTermslugArr] = useState([{ term_slug: "" }]);
	const [prodtitleArr, setProdtitleArr] = useState([{ title: "" }]);

	async function fetchInfotext() {
		const url_de = document.querySelector("#url_de").value;
		const url_en = document.querySelector("#url_en").value;
		const url_fr = document.querySelector("#url_fr").value;
		let querySelector = document.querySelector("#query").value;
		querySelector = encodeURIComponent(querySelector);
		//console.log(querySelector);
		const str = `?url_de=${url_de}&url_en=${url_en}&url_fr=${url_fr}&querySelector=${querySelector}`;
		//console.log(str);
		const data = await fetch(`/api/supabase/scrap-infotext-from-form${str}`);
		const res = await data.json();
		document.querySelector("#infotext_de").value = res.infotext_de;
		setInfotextDe(res.infotext_de);
		document.querySelector("#infotext_en").value = res.infotext_en;
		setInfotextEn(res.infotext_en);
		document.querySelector("#infotext_fr").value = res.infotext_fr;
		setInfotextFr(res.infotext_fr);

		//console.log(res);
	}

	function handlechange(e) {
		if (e.target.title == "infotext_de") {
			setInfotextDe(e.target.value);
		}
		if (e.target.title == "infotext_fr") {
			setInfotextFr(e.target.value);
		}
		if (e.target.title == "infotext_en") {
			setInfotextEn(e.target.value);
		}

		//console.log(e.target.value);
		//console.log(e.target.title);
	}
	async function getProdCatSlugs() {
		const data = await fetch("/api/supabase/get-productcategorieslugs");
		const res = await data.json();

		setTermslugArr(res);
		//console.log(res);
	}

	useEffect(() => {
		const data = async () => {
			const data = await fetch("/api/supabase/get-productcategorieslugs");
			const res = await data.json();
			//console.log("hhadsfasd");
			setTermslugArr(res);

			const data2 = await fetch("/api/supabase/get-grouped-productnames");
			const res2 = await data2.json();
			setProdtitleArr(res2);
		};
		data();
	}, []);

	return (
		<div className="container mx-auto ">
			<div className="prose max-w-none">
				<h1>Fetch Infotext</h1>
			</div>

			<div className="grid grid-cols-2">
				<div className="grid">
					<input
						id="url_de"
						type="text"
						placeholder="bretz.de url einfügen"
						className="input w-full max-w-xs m-2"
					/>
					<input
						id="url_en"
						type="text"
						placeholder="bretz.com url einfügen"
						className="input w-full max-w-xs m-2"
					/>
					<input
						id="url_fr"
						type="text"
						placeholder="bretz.fr url einfügen"
						className="input w-full max-w-xs m-2"
					/>
					<input
						id="query"
						type="text"
						placeholder="css selector einfügen"
						className="input w-full max-w-xs m-2"
					/>
					<button className="btn btn-outline" onClick={() => fetchInfotext()}>
						fetch data
					</button>
				</div>
				<div></div>
				<div className=" mt-16 grid gap-16">
					<div className="pb-16 p-4  bg-slate-200">
						<div className="prose max-w-none">
							<h2>fetched raw German text</h2>
						</div>
						<textarea
							id="infotext_de"
							title="infotext_de"
							className="textarea textarea-bordered w-full"
							placeholder=""
							onChange={(e) => handlechange(e)}
						></textarea>
						<div className="prose max-w-none">
							<h2>formatted German text</h2>
						</div>
						<div dangerouslySetInnerHTML={{ __html: infotextDe }}></div>
					</div>
					<div className="pb-16 p-4  bg-slate-200">
						<div className="prose max-w-none">
							<h2>fetched raw English text</h2>
						</div>
						<textarea
							id="infotext_en"
							title="infotext_en"
							className="textarea textarea-bordered w-full"
							placeholder=""
							onChange={(e) => handlechange(e)}
						></textarea>
						<h2>formatted English text</h2>
						<div dangerouslySetInnerHTML={{ __html: infotextEn }}></div>
					</div>
					<div className="pb-16 p-4  bg-slate-200">
						<h2>fetched raw French text</h2>

						<textarea
							id="infotext_fr"
							title="infotext_fr"
							className="textarea textarea-bordered w-full"
							placeholder=""
							onChange={(e) => handlechange(e)}
						></textarea>
						<h2>formatted French text</h2>
						<div dangerouslySetInnerHTML={{ __html: infotextFr }}></div>
					</div>
				</div>
				<div></div>
				<div>
					<div className="prose max-w-none">
						<h1>update Infotext</h1>
					</div>
					<ListboxForProdCat
						arr={termslugArr}
						infotextDe={infotextDe}
						infotextEn={infotextEn}
						infotextFr={infotextFr}
					/>
					<ListboxForProduct
						arr={prodtitleArr}
						infotextDe={infotextDe}
						infotextEn={infotextEn}
						infotextFr={infotextFr}
					/>
					<ListboxForProductLike
						arr={prodtitleArr}
						infotextDe={infotextDe}
						infotextEn={infotextEn}
						infotextFr={infotextFr}
					/>
					<div className="h-80"></div>
				</div>
				<div></div>
				<div>
					<div className="prose max-w-none">
						<h1>update Facts & Higlights</h1>
					</div>
					<ListboxForProdCatFactsHighlights
						arr={termslugArr}
						infotextDe={infotextDe}
						infotextEn={infotextEn}
						infotextFr={infotextFr}
					/>
				</div>
				<div></div>
			</div>
		</div>
	);
}
