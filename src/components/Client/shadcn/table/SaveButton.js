import { useUserStore } from "@/lib/zustand/useUserStore";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
export default function SaveButton({
	updateArr,
	fetchProductList,
	selected,
	setChecked,
}) {
	//console.log(updateArr);
	const [update, setUpdate] = useState(false);
	const [errormessage, setErrormessage] = useState(false);
	async function savedata() {
		//console.log(updateArr);

		const productsToUpdate = [];
		updateArr.map((row, i) => {
			const keys = Object.keys(row);
			const keysLength = keys.length;
			// if the object has more than one keys, add the row to a new array
			if (keysLength > 1) {
				productsToUpdate.push(row);
			}
		});

		const { data, error } = await supabase
			.from("produkte")
			.upsert(productsToUpdate)
			.select();
		if (data) {
			setUpdate(false);
			fetchProductList();
			//setChecked(false);
		}
		if (error) {
			setUpdate(false);
			setErrormessage("error: " + error);
		}
	}
	return (
		<>
			<button
				className="btn btn-neutral"
				onClick={savedata}
				//onClick={savedata}
			>
				save changes
			</button>
			{errormessage}
			{update ? <span className="text-2xl pl-8">updating</span> : null}
		</>
	);
}
