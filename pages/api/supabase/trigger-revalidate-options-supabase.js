const handler = async (req, res) => {
	//console.log(process.env.BRETZAUSTRIAURL);
	//console.log(req.body.record);
	//console.log("trigger triggered");
	const url = process.env.BRETZAUSTRIAURL;
	// const slug = req.body.record.slug;
	// const termslug = req.body.record.termslug;
	// console.log("url: " + url);
	// console.log("slug: " + slug);
	// console.log("termslug: " + termslug);

	// trigger to set for revalidation after next visit
	const revalidateProductTag = await fetch(
		`https://${url}/api/revalidatetag?tag=options`
	);
	const resRev = await revalidateProductTag.json();

	// trigger to maintain the next visit
	const fetchtostartupdate_de = await fetch(`https://${url}/de/`);

	const fetchtostartupdate_en = await fetch(`https://${url}/en/`);
	const fetchtostartupdate_fr = await fetch(`https://${url}/fr/`);

	res.send({ "revalidated tag": "options" });
};
export default handler;
