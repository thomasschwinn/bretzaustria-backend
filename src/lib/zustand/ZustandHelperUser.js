"use client";
import { useUserStore } from "./useUserStore";
import { useEffect } from "react";
export default function ZustandHelperUser({ parentUser }) {
	const { setUser } = useUserStore();

	useEffect(() => {
		//console.log(parentUser);
		setUser(parentUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return "hello";
}
