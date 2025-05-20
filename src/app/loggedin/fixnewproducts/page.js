"use client";

import { useState, useEffect } from "react";
export default function App() {
	const [prodtovix, setProdtofix] = useState([]);

	useEffect(() => {
		const data = async () => {
			const data = await fetch("/api/supabase/get-productcategorieslugs");
			const res = await data.json();
			//console.log("hhadsfasd");
			setProdtofix(res);
		};
		data();
	}, []);

	return <div></div>;
}
