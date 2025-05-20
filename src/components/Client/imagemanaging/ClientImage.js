"use client";
import Image from "next/image";

export default function ClientImage({ imgurl, imgsrc }) {
	return (
		<Image
			src={imgsrc}
			unoptimized
			width={372}
			height={200}
			alt={""}
			className="bg-white"
			onClick={() => window.my_modal_3.showModal()}
		/>
	);
}
