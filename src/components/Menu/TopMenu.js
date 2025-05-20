"use client";
import TopMenuWrapper from "@/components/Menu/TopMenuWrapper";
import TopMenuElement from "@/components/Menu/TopMenuElement";
import TopMenuSubMenuWrapper from "@/components/Menu/TopMenuSubMenuWrapper";
import Link from "next/link";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { FaChevronDown } from "react-icons/fa";
//import ClientLanguageLink from "@/components/Menu/ClientLanguageLink";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/zustand/useUserStore";
const menulinkclass = "px-4 text-center text-[20px] py-4";
const hovershadowclass =
	"transition duration-500 hover:shadow-md hover:shadow-neutral-500";

// const AccordionItem = ({ t, header, ...rest }) => (
// 	<Item
// 		{...rest}
// 		header={({ state: { isEnter } }) => (
// 			<>
// 				<span className={`${menulinkclass} ${hovershadowclass}`}>
// 					<span className=" font-pSemiBold text-[36px]">{t["Über uns"]}</span>
// 					<span className="pl-4">
// 						<FaChevronDown
// 							className={`${
// 								isEnter && "rotate-180 transition"
// 							} h-8 w-8 text-white`}
// 						/>
// 					</span>
// 				</span>
// 			</>
// 		)}
// 		//className="border-b"
// 		buttonProps={{
// 			className: ({ isEnter }) =>
// 				`text-white bg-transparent ${isEnter && "text-slate-300"}`,
// 			style: { width: "100%" },
// 		}}
// 		contentProps={{
// 			className: "transition-height duration-200 ease-out",
// 		}}
// 		panelProps={{ className: "p-4" }}
// 	/>
// );

export default function TopMenu({ t, locale, closeModal, user }) {
	//console.log(t);
	// const subMenuArr = [
	// 	{
	// 		title: t["Unternehmensgeschichte_Bretz"],
	// 		link: "unternehmensgeschichte-bretz",
	// 	},
	// 	{ title: "Team", link: "team" },
	// 	{ title: t["Karriere"], link: "karriere" },

	// 	{ title: t["impressum"], link: "impressum" },
	// ];
	const { setIsMainLoading } = useUserStore();
	const router = useRouter();
	const role = user.role;
	const editor = role == "admin" || role == "authenticated" ? true : false;
	//console.log(role);
	//console.log(role);
	const supabase = createClientComponentClient();
	const signOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return (
		<TopMenuWrapper>
			{editor == true ? (
				<TopMenuElement hovershadowclass="text-center">
					<Link
						onClick={() => {
							closeModal();
							//setIsMainLoading(true);
						}}
						className={`${hovershadowclass} px-4 `}
						href={`/loggedin/produkte`}
					>
						Produkte bearbeiten
					</Link>
				</TopMenuElement>
			) : null}
			{editor == true ? (
				<TopMenuElement hovershadowclass="text-center">
					<Link
						onClick={closeModal}
						className={`${hovershadowclass} px-4 `}
						href={`/loggedin/bilder`}
					>
						Bilder verwalten
					</Link>
				</TopMenuElement>
			) : null}
			{role == "admin" ? (
				<TopMenuElement hovershadowclass="text-center">
					<Link
						onClick={closeModal}
						className={`${hovershadowclass} px-4 `}
						href={`/loggedin/datenbankbearbeiten`}
					>
						Datenbank bearbeiten
					</Link>
				</TopMenuElement>
			) : null}
			{user && (
				<TopMenuElement hovershadowclass="text-center">
					<Link
						onClick={signOut}
						className={`${hovershadowclass} px-4 `}
						href={`#`}
					>
						Logg out
					</Link>
				</TopMenuElement>
			)}
			{/* <TopMenuElement hovershadowclass="text-center">
				<Link
					onClick={closeModal}
					className={`${hovershadowclass} px-4`}
					href={`/${locale}/sale`}
				>
					Sale
				</Link>
			</TopMenuElement>
			<TopMenuElement hovershadowclass="text-center">
				<Link
					onClick={closeModal}
					className={`${hovershadowclass} px-4`}
					href={`/${locale}/shop`}
				>
					{t["Shop"]}
				</Link>
			</TopMenuElement>

			<TopMenuElement hovershadowclass="text-center">
				<Link
					onClick={closeModal}
					className={`${hovershadowclass} px-4`}
					href="https://designer.bretz.de/"
					target="_new"
				>
					{t["3DPlaner"]}
				</Link>
			</TopMenuElement>
			<TopMenuElement hovershadowclass="text-center">
				<Link
					onClick={closeModal}
					className={`${hovershadowclass} px-4`}
					href={`/${locale}/katalog`}
				>
					{t["Katalog"]}
				</Link>
			</TopMenuElement>
			<TopMenuElement hovershadowclass="text-center">
				<Link
					onClick={closeModal}
					className={`${hovershadowclass} px-4`}
					href={`/${locale}/terminvereinbarung`}
				>
					{t["Terminvereinbarung"]}
				</Link>
			</TopMenuElement> */}
		</TopMenuWrapper>
	);
}
