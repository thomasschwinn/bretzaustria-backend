export function createArticleNumberFirstPart(prod) {
	const artnr = prod.title.includes("_")
		? `${prod.title

				.replace("-", "")
				.replace("-", "")
				.replace("-", "")
				.replace(
					"_",
					prod.produktkategorie.modellnummer
						? prod.produktkategorie.modellnummer
						: ""
				)}`
		: `${prod.title.replace("-", "").replace("-", "").replace("-", "")}${
				prod.produktkategorie.modellnummer
					? prod.produktkategorie.modellnummer
					: ""
		  }`;
	//console.log(artnr);
	return artnr.toLocaleLowerCase();
}
