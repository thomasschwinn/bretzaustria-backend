"use client";
import Link from "next/link";

export default function TopMenuElement({ children, hovershadowclass }) {
	return (
		<li
			className={` ${hovershadowclass} text-white font-pSemiBold text-[36px]  leading-[4rem] py-4`}
		>
			{children}
		</li>
	);
}
