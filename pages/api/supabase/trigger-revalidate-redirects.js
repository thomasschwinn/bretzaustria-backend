const handler = async (req, res) => {
	//console.log(process.env.BRETZAUSTRIAURL);
	//console.log(req.body.record);
	//console.log("trigger triggered");
	const url = process.env.BRETZAUSTRIAURL;
	const slug = req.body.record.slug;
	const termslug = req.body.record.termslug;

	// trigger to set for revalidation after next visit
	const revalidateProductTag = await fetch(
		`https://${url}/api/revalidatetag?tag=redirects`
	);
	const resRev = await revalidateProductTag.json();

	// trigger to maintain the next visit
	const fetchtostartupdate_de = await fetch(
		`https://${url}/de/produkasdfasf/asdfasdfasdf`
	);

	const fetchtostartupdate_en = await fetch(
		`https://${url}/en/produkasdfasf/sadfasdfasdfasdfasdf`
	);
	const fetchtostartupdate_fr = await fetch(
		`https://${url}/fr/produktasdfasdf/asdfasdf`
	);

	res.send({
		message: "revalidation for redirects triggered",
	});
};
//asdfasdf
export default handler;
