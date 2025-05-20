// These styles apply to every route in the application
import "../../globals.css";
import Link from "next/link";
// import Link from "next/link";// import local fonts
import localFont from "next/font/local";
import {
	createServerActionClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchTranslation } from "@/lib/fetch/fetchTranslation";
import { fetchOptions } from "@/lib/fetch/fetchOptions";
const kaftanserifRegular = localFont({
	src: "../fonts/basicAndLatinSubsets/kaftanserif-regular-subset.ttf",

	display: "fallback",
	variable: "--kaftan-font",
});

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
import Header from "@/components/Header/Header";
import ZustandHelperUser from "@/lib/zustand/ZustandHelperUser";
import IsLoadingWrapper from "@/components/Client/IsLoadingWrapper";
export const dynamic = "force-dynamic";
export default async function LoggedinLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();
	//console.log(user);
	if (!user) {
		// This route can only be accessed by authenticated users.
		// Unauthenticated users will be redirected to the `/login` route.
		redirect("/");
		//console.log("not logged in");
	}

	const t = [];

	return (
		// <html
		// 	className={`${kaftanserifRegular.variable} ${ppPangramSansRoundedBold.variable}  ${ppPangramSansRoundedSemibold.variable} ${ppPangramSansRoundedMedium.variable} overflow-y-scroll pr-0`}
		// >
		// 	<body
		// 		className={`  font-pMedium leading-6 text-[16px] antialiased tracking-wide bg-slate-50 `}
		// 	>
		<>
			{" "}
			<ZustandHelperUser parentUser={user} />
			<IsLoadingWrapper />
			<Header locale="de" t={t} user={user} />
			<div className="w-[1880px] mx-auto  ">{children}</div>
		</>
		// 	</body>
		// </html>
	);
}
