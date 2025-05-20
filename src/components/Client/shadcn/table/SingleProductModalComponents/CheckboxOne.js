"use client";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxOne({
	oldproductoutofstock,
	setOldproductoutofstock,
}) {
	return (
		<>
			<Checkbox
				id="oldproductoutofstockID"
				name="oldproductoutofstockName"
				checked={oldproductoutofstock}
				onCheckedChange={setOldproductoutofstock}
			/>
			<label
				htmlFor="oldproductoutofstockID"
				className="pl-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				bisheriges Produkt outofstock setzen
			</label>
		</>
	);
}
