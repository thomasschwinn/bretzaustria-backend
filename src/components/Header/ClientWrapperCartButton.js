"use client";

// import { useStore } from "@/lib/Zustand/createUseCookieConsent";
import { GrCart } from "react-icons/gr";
export default function ClientWrapperCartButton() {
	// const { showSnipcart } = useStore();
	return (
		<>
			<GrCart className="w-8 h-8 snipcart-checkout cursor-pointer" />
		</>
	);
}
