"use client";

import { supabase } from "@/lib/supabaseClientPreise";
import { useEffect, useState } from "react";
import TabellePreise from "@/components/Client/shadcn/table/Preise/TabellePreise";

export default function Preise() {
	const [produkte, setProdukte] = useState();
	const [stoffe, setStoffe] = useState([]);
	const [fuesse, setFuesse] = useState([]);
	const [prodKatFuesse, setProdKatFuesse] = useState();
	async function loadPreise() {
		const { data: stoffe, error: stoffeError } = await supabase
			.from("stoffe")
			.select(
				"title,stoffartgruppen(stoffartgruppe,text,stoffpreisgruppen(stoffpreisgruppe,preis))"
			)
			.eq("instock", true)
			.order("title", { ascending: true });
		setStoffe(stoffe);

		const { data, error } = await //.select("slug, bezugsstoff_1(slug)")
		supabase.from("produkte").select(`
			*,
			produktkategorie(
				*,standardfuss(*)
				,aufpreisfuss1(*)
				,aufpreisfuss2(*)
				,aufpreisfuss3(*)
				,aufpreisfuss4(*)
				,aufpreisfuss5(*)
				),
			standardfuss(*)`);
		//setProdukte(data);
		const produkte = [];
		const keys = Object.keys(data[0]);
		const keysProduktkategorien = Object.keys(data[0].produktkategorie);

		data.map((prod, i) => {
			const title = `${prod.produktkategorie.title} ${prod.title}${prod.produktkategorie.modellnummer}`;
			const artnr = `${prod.title.toLowerCase()}${
				prod.produktkategorie.modellnummer
			}`;

			const obj = {
				title: title,
				produktmitbezugsstoff: prod.produktmitbezugsstoff,
				produktmitfuss: prod.produktmitfuss,
				artnr: artnr,
			};

			// standardfuss
			if (prod.standardfuss) {
				obj["fuss"] = prod.standardfuss.title;
				obj["fussartnr"] = prod.standardfuss.artnr;
			} else if (prod.produktkategorie.standardfuss) {
				obj["fuss"] = prod.produktkategorie.standardfuss.title;
				obj["fussartnr"] = prod.produktkategorie.standardfuss.artnr;
			}

			// preise je stoffgruppe mit standardfuss
			keys.map((row) => {
				if (row.includes("preis_")) {
					obj[row] = prod[row];
				}
			});
			// add this to the array
			produkte.push(obj);

			//aufpreisfuss 1
			let e = 0;
			keysProduktkategorien.map((row, i) => {
				if (row.includes("aufpreisfuss")) {
					e = e + 1;
					//console.log(e);
					let fuss;
					let preis;

					const newOjb = { ...obj };

					// wenn ein fuss definiert ist, mach das...

					if (prod.produktkategorie[`aufpreisfuss${e}`]) {
						// aufpreis fuss name
						// obj[`aufpreisfuss${row}title`] =
						// 	prod.produktkategorie[`aufpreisfuss${row}`].title;
						const fuss = prod.produktkategorie[`aufpreisfuss${e}`].title;
						const artnr = prod.produktkategorie[`aufpreisfuss${e}`].artnr;

						// aufpreis fuss preis, manchmal kann ein produkt mehr füsse haben als andere
						let fussAnzahl;
						if (prod.anzahlfuesse) {
							fussAnzahl = prod.anzahlfuesse;
						} else {
							fussAnzahl = prod.produktkategorie.anzahlfuesse;
						}

						// obj[`aufpreisfuss${row}preis`] =
						// 	prod.produktkategorie[`aufpreisfuss${row}`][
						// 		`aufpreis${fussAnzahl}er`
						// 	];
						const aufpreis =
							prod.produktkategorie[`aufpreisfuss${e}`][
								`aufpreis${fussAnzahl}er`
							];

						keys.map((row) => {
							if (row.includes("preis_")) {
								newOjb[row] = prod[row] + aufpreis;
							}
						});
						newOjb["fuss"] = fuss;
						newOjb["fussartnr"] = artnr;
						// add this to the array
						produkte.push(newOjb);
					}
				}
			});
		});
		setProdukte(produkte);

		const prodArr = [];
		stoffe.map((stoff, stoffKey) => {
			const prodObj = {};
			produkte.map((produkt, produktKey) => {
				const keys = Object.keys(produkt);
				keys.map((key, keyKey) => {
					//console.log(key);
					if (
						!key.includes(["preis_"]) &&
						!key.includes(["fuss"]) &&
						!key.includes(["stoff"])
					) {
						prodObj[key] = produkt[key];
					}

					prodObj["preis"] =
						produkt[
							`preis_${stoff.stoffartgruppen.stoffpreisgruppen.stoffpreisgruppe}`
						];
					let stoffkurz;
					if (stoff.title == "fremdstoff") {
						stoffkurz = "fremd";
					} else if (stoff.title.includes("BOH")) {
						stoffkurz = "65" + "." + stoff.title.split(" ")[1];
					} else {
						stoffkurz =
							stoff.title.split(" ")[0] + "." + stoff.title.split(" ")[1];
					}

					prodObj["artnr"] =
						produkt.artnr + "." + produkt.fussartnr + "." + stoffkurz;
				});
			});

			prodObj["bezugsstoff"] = stoff.title;
			prodArr.push(prodObj);
		});
		setProdukte(prodArr);

		const { data: fuesse, error: fuesseError } = await supabase
			.from("_fuesse")
			.select("*")
			.eq("instock", true);
		setFuesse(fuesse);

		// konfiguration der fuesse
		const fussArr = [];
	}

	useEffect(() => {
		loadPreise();
	}, []);

	return <>{produkte && <TabellePreise produkte={produkte} />}</>;
}
