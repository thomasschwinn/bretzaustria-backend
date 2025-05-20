"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "i18n-config";
export default function ClientLanguageLink({
	locale,
	closeModal,
	hovershadowclass,
}) {
	let pathname = usePathname();
	//console.log(locale, pathname);
	//console.log(i18n.locales);

	i18n.locales.map((locale, i) => {
		//console.log("/" + locale);
		pathname = pathname.replace("/" + locale, "");
		//console.log(pathname);
	});

	return (
		<>
			{i18n.locales.map((locale, i) => {
				return (
					<Link
						key={i}
						onClick={closeModal}
						className={`${hovershadowclass} px-4`}
						href={"/" + locale + pathname}
					>
						{locale}
					</Link>
				);
			})}
		</>
	);
}
