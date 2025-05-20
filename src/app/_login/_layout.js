import {
	createServerActionClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import localFont from "next/font/local";
const kaftanserifRegular = localFont({
	src: "/fonts/basicAndLatinSubsets/kaftanserif-regular-subset.ttf",
	display: "fallback",
	variable: "--kaftan-font",
});
import "./globals.css";
// import Header from "@/components/Header/Header";
// import { fetchData } from "@/lib/fetch/fetchData";
// import { fetchTranslation } from "@/lib/fetch/fetchTranslation";
// import Link from "next/link";

const ppPangramSansRoundedBold = localFont({
	src: "../fonts/basicAndLatinSubsets/pppangramsansrounded-bold-subset.ttf",
	display: "fallback",
	variable: "--pBold-font",
});
const ppPangramSansRoundedMedium = localFont({
	src: "../fonts/basicAndLatinSubsets/pppangramsansrounded-medium-subset.ttf",
	display: "fallback",
	variable: "--pMedium-font",
});
const ppPangramSansRoundedSemibold = localFont({
	src: "../fonts/basicAndLatinSubsets/pppangramsansrounded-semibold-subset.ttf",
	display: "fallback",
	variable: "--pSemibold-font",
});

export const dynamic = "force-dynamic";
export default async function LoggedinLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		// This route can only be accessed by authenticated users.
		// Unauthenticated users will be redirected to the `/login` route.
		redirect("/loggedin");
	}

	// const signOut = async () => {
	// 	"use server";
	// 	const supabase = createServerActionClient({ cookies });
	// 	await supabase.auth.signOut();
	// 	redirect("/login");
	// };
	//console.log(user);

	// const options_data = fetchData("options");
	// const t_data = fetchTranslation(["header", "footer"], "de");

	// // Wait for the promises to resolve
	// const [t, options] = await Promise.all([t_data, options_data]);
	return (
		<html
			className={`${kaftanserifRegular.variable} ${ppPangramSansRoundedBold.variable}  ${ppPangramSansRoundedSemibold.variable} ${ppPangramSansRoundedMedium.variable} overflow-y-scroll pr-0`}
		>
			<body className="  font-pMedium leading-6 text-[16px] antialiased tracking-wide bg-slate-50">
				{/* <span className="text-green-500 font-pBold z-50  py-8 absolute top-0 left-[50%] translate-x-[-50%] ">
					logged in as {user.email}
				</span> */}
				{/* 
				<div className="w-[1880px] mx-auto grid grid-rows-1 grid-cols-6 bg-slate-100">
					<Link href="/loggedin">
						<div className="text-center py-4 hover:bg-green-100">home</div>
					</Link>
					<Link href="/loggedin/produkte">
						<div className="text-center py-4 hover:bg-green-100">Produkte</div>
					</Link>
					<div className="text-center py-4 hover:bg-green-100">Sale</div>
					<div className="text-center py-4 hover:bg-green-100">
						Produktkategorien
					</div>
					<div className="text-center py-4 hover:bg-green-100">
						Übersetzungen
					</div>
					<div className="text-center py-4 hover:bg-green-100">Options</div>
				</div> */}
				{children}
			</body>
		</html>
	);
}
