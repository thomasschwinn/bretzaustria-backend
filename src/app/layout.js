import {
	createServerActionClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import localFont from "next/font/local";
const kaftanserifRegular = localFont({
	src: "../fonts/basicAndLatinSubsets/kaftanserif-regular-subset.ttf",
	display: "fallback",
	variable: "--kaftan-font",
});
import "../globals.css";

//hello
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
	//console.log(user);

	// if (user) {
	// 	// This route can only be accessed by authenticated users.
	// 	// Unauthenticated users will be redirected to the `/login` route.
	// 	redirect("/loggedin");
	// }

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
				{children}
			</body>
		</html>
	);
}
