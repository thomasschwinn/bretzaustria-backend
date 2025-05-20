import { reformatAll } from "@/lib/reformatFetchedTextString";
import ButtonsWithFunctions from "@/components/Client/adminpage/ButtonsWithFunctions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../../../components/LogoutButton";

export default async function App() {
	// const supabase = createServerComponentClient({ cookies });

	// const {
	// 	data: { user },
	// } = await supabase.auth.getUser();
	const fetchUrl =
		"https://docs.google.com/spreadsheets/d/1dcNcCF9Kw12ai5zAz2eURYoQrOT6UTpOCo7_6BY8j0k";

	const conStr = "/gviz/tq?tq=";

	let sheetselectorStr = "&gid=0"; // table: Produktkategorien
	let selectStr = `select B Where D>=1`;

	const res_ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text(), { cache: "no-store" });

	// remove unusable parts from the fetched text string
	let result = reformatAll(res_);
	//console.log(result);

	// fetch again from another table
	sheetselectorStr = "&gid=752983156"; // table: Produkte
	selectStr = `select B `;
	const res__ = await fetch(
		`${fetchUrl}${conStr}${selectStr}${sheetselectorStr}`
	).then((x) => x.text(), { cache: "no-store" });
	const resultslugs = reformatAll(res__);
	resultslugs.sort();
	const slugArr = [];
	resultslugs.map((row, i) => {
		const obj = { id: i + 1, name: row.slug };
		slugArr.push(obj);
	});
	//console.log(slugArr);

	//const files = await rawfiles.json();

	return (
		<>
			{/* {user ? (
				<div className="flex items-center gap-4">
					Hey, {user.email}!
					<LogoutButton />
				</div>
			) : (
				<Link
					href="/login"
					className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
				>
					Login
				</Link>
			)} */}
			<ButtonsWithFunctions result={result} slugArr={slugArr} />
		</>
	);
}
