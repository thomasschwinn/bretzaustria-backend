"use client";
import { useUserStore } from "@/lib/zustand/useUserStore";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AlteSeite() {
	const { productlist } = useUserStore();
	console.log(productlist);

	const url = "https://www.bretz-austria.at/";
	const pfad = "/produkte/";

	const newArr = [];
	["de", "en", "fr"].map((lang, i) => {
		productlist.map((product, ii) => {
			const completpath = url + lang + pfad + product.slug;
			newArr.push(completpath);
		});
	});
	console.log(newArr);

	const length = newArr.length;
	const htmlstr = ` 
	die Liste hat ${length} Einträge
	<br>
	<br>
	die Liste wird jetzt abgearbeitet...
	<br>
	<br>
	`;
	let fortschrittstr = ``;
	//asdf

	const [list, setList] = useState("");
	const [second, setSecond] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setCounter((counter) => counter + 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);
	useEffect(() => {
		const timer = setInterval(() => setSecond((second) => second + 1), 1000);
		return () => clearInterval(timer);
	}, [second]);
	//console.log(second);
	useEffect(() => {
		//const theintervals = setInterval(countseconds, 1000);
		async function loop() {
			const arr = [];
			for (let index = 0; index < newArr.length; index++) {
				const thisitem = newArr[index];
				setSecond((second) => 0);
				//const theinterval = setInterval(countsecond, 1000);
				//	console.log(thisitem);
				const data = await fetch(
					"/api/supabase/just-call-a-page?url=" + thisitem
				);
				const res = await data.text();
				//console.log(res);
				// fortschrittstr = `${thisitem} wurde geladen in ${second} Sekunden<br> es werden noch ${
				// 	length - index - 1
				// } Produkte geladen<br><br><br>`;
				// const oldlistArr = [list];
				// const oldstr = [...oldlistArr];
				// const newstring = `${oldstr[0]} ${fortschrittstr}`;
				//clearInterval(theinterval);
				setList((list) => fortschrittstr + list);
				// Get num of each fruit
				// if (index == newArr.length) {
				// 	clearInterval(theintervals);
				// }
			}
		}
		loop();
	}, []);
	//console.log(second);
	return (
		<>
			{/* <Script id="asdfasdf">{`
			console.log(JSON.parse(${newArr})`}</Script> */}
			<div>fetch data...</div>
			<div className="font-pBold text-xl">{counter}</div>
			<div dangerouslySetInnerHTML={{ __html: htmlstr }}></div>
			<div
				className="text-green-600 font-pBold"
				dangerouslySetInnerHTML={{ __html: list }}
			></div>
		</>
	);
}
