import Image from "next/image";
// import Lagerliste from "@/components/Client/shadcn/table/Lagerliste/Lagerliste";
// import Preise from "@/components/Client/shadcn/table/Preise/Preise";
export default function Page() {
	return (
		// <Preise />
		<Image
			src="https://media.bretz-austria.at/homepageslider/bretz-austria-sofa-napali-homepage-slider.jpg"
			alt=""
			fill={true}
			className="object-contain"
		/>
	);
}
