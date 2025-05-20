"use client";
import React, { useRef } from "react";
import HotTable from "@/components/Client/ssrtable/HotTable";

function Home() {
	const hotRef = useRef(null);

	// you can reference the Handsontable instance via hotRef.current.hotInstance
	//console.log(hotRef.current.hotInstance);

	return (
		<HotTable
			ref={hotRef}
			licenseKey="non-commercial-and-evaluation"
			// you can add options here (https://handsontable.com/docs/8.2.0/Options.html)
		/>
	);
}

export default Home;
