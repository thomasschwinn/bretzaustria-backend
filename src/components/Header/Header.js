import Grid from "@/components/Grid/Grid";
import GridElement from "@/components/Grid/GridElement";
import BretzLogo from "@/components/SvgComponents/BretzLogo";
import HamburgerWrapper from "@/components/Header/HamburgerWrapper";

import ClientWrapperCartButton from "@/components/Header/ClientWrapperCartButton";

import Link from "next/link";
// import ZustandHelperUser from "@/lib/zustand/ZustandHelperUser";

export default function Header({ locale, t, user }) {
	//console.log(user);

	return (
		<>
			{/* <ZustandHelperUser parentUser={user} /> */}
			<header className="w-full bg-white z-[19] fixed top-0">
				<div className="container mx-auto py-4 lg:px-[50px] relative">
					<Grid rows="1" cols="3">
						<GridElement row="1" col="1" hor="start" ver="center">
							<Link href={`/${locale}/`}>
								<BretzLogo className="h-16" />
							</Link>
						</GridElement>
						<GridElement row="1" col="1" ver="center">
							<div className="text-center font-pSemiBold text-green-600 max-w-full">
								loggedin as {user.email}
							</div>
						</GridElement>
						<GridElement row="1" col="1" hor="end" ver="center">
							<div className="flex flex-row ">
								<HamburgerWrapper t={t} locale={locale} user={user} />
							</div>
						</GridElement>
					</Grid>
				</div>
			</header>
			<div className="h-[94px] "></div>
		</>
	);
}
