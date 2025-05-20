"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const path = usePathname();
	//console.log(path);

	const menu = [
		{ name: "Home", link: "/" },
		{ name: "fetch Infotext", link: "/fetchinfotext" },
	];
	return (
		<div className={`container mx-auto px-8 my-8   `}>
			<div className="flex">
				{menu.map((row, i) => {
					return (
						<Link
							key={i}
							href={row.link}
							className={`p-4 m-2 hover:bg-slate-400 ${
								row.link === path ? "bg-green-200" : "bg-slate-300"
							}`}
						>
							{row.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
