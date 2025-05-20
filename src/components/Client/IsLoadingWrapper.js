"use client";

import { useUserStore } from "@/lib/zustand/useUserStore";
import IsLoading from "@/components/Client/IsLoading";
export default function IsLoadingWraper() {
	const { isMainLoading } = useUserStore();
	//console.log(isMainLoading);
	return <>{isMainLoading && <IsLoading />}</>;
}
