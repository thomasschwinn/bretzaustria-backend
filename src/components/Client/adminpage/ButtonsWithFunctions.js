"use client";
import ButtonDeleteAndInsertProducts from "@/components/Client/ButtonDeleteAndInsertProducts";
import WriteInfotext from "@/components/Client/WriteInfotext";
import WriteScrapedData from "@/components/Client/WriteScrapedData";
import ButtonDeleteAndInsertProductCategroies from "@/components/Client/ButtonDeleteAndInsertProductCategroies";
import ButtonDeleteAndInsertTranslations from "@/components/Client/ButtonDeleteAndInsertTranslations";
import UpdateOneProduct from "@/components/Client/UpdateOneProduct";
import ButtonUpsertProducts from "@/components/Client/ButtonUpsertProducts";
import ButtonUpsertProducCategories from "@/components/Client/ButtonUpsertProducCategories";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Listfiles from "@/components/Client/adminpage/Listfiles";
import RevalidateSlug from "@/components/Client/RevalidateSlug";
export default function ButtonsWithFunctions({ result, slugArr }) {
	const countdowntime = 420; // in seconds
	const [enabled, setEnabled] = useState(false);
	const [counter, setCounter] = useState(countdowntime);
	const [bgcolor, setBgcolor] = useState();

	useEffect(() => {
		enabled == true
			? counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
			: "";
		// (counter % 2 === 0) & (counter < 31)
		// 	? setBgcolor("bg-red-300 ")
		// 	: setBgcolor("bg-red-500 ");
		counter > 30
			? counter % 2 === 0
				? setBgcolor("bg-slate-100 ")
				: setBgcolor("bg-slate-200 ")
			: null;
		counter < 30
			? counter % 2 === 0
				? setBgcolor("bg-red-300 ")
				: setBgcolor("bg-red-500 ")
			: null;

		counter == 0 ? setEnabled(false) : null;
		enabled == false ? setCounter(countdowntime) : null;
	}, [counter, enabled]);
	return (
		<div className={`container mx-auto px-8 my-8   ${bgcolor}`}>
			<div className=" text-red-800 text-bold ">
				ich habe alle filter im google sheet ausgeschaltet
				<span className="py-16">
					<Switch
						checked={enabled}
						onChange={setEnabled}
						className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
					>
						<span className="sr-only">Use setting</span>
						<span
							aria-hidden="true"
							className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
						/>
					</Switch>
				</span>
			</div>

			{enabled && (
				<>
					{" "}
					<div>Countdown: {counter}</div>
					<details className="collapse bg-base-200">
						<summary className="collapse-title text-xl font-medium">
							products
						</summary>
						<div className="collapse-content">
							<details className="collapse bg-base-200">
								<summary className="collapse-title text-xl font-medium">
									- upsert Products
								</summary>
								<div className="collapse-content">
									<ButtonUpsertProducts />
								</div>
							</details>
							<details className="collapse bg-base-200">
								<summary className="collapse-title text-xl font-medium">
									- delete and rewrite all products
								</summary>
								<div className="collapse-content">
									<ButtonDeleteAndInsertProducts />
								</div>
							</details>
							<details className="collapse bg-base-200">
								<summary className="collapse-title text-xl font-medium">
									- update infotext for every single product category
								</summary>
								<div className="collapse-content">
									{result.map((row, i) => {
										return <WriteInfotext key={i} termslug={row.term_slug} />;
									})}
								</div>
							</details>
						</div>
					</details>
					<details className="collapse bg-base-200">
						<summary className="collapse-title text-xl font-medium">
							product categories
						</summary>
						<div className="collapse-content">
							<details className="collapse bg-base-200">
								<summary className="collapse-title text-xl font-medium">
									- upsert product categories
								</summary>
								<div className="collapse-content">
									<ButtonUpsertProducCategories />
								</div>
							</details>
							<details className="collapse bg-base-200">
								<summary className="collapse-title text-xl font-medium">
									- delete and rewrite all product categories
								</summary>
								<div className="collapse-content">
									<ButtonDeleteAndInsertProductCategroies />
								</div>
							</details>
							<details className="collapse bg-base-200">
								<summary className="collapse-title text-xl font-medium">
									- update scraped data for every single product category
								</summary>
								<div className="collapse-content">
									{result.map((row, i) => {
										return (
											<WriteScrapedData key={i} termslug={row.term_slug} />
										);
									})}
								</div>
							</details>
						</div>
					</details>
					<details className="collapse bg-base-200">
						<summary className="collapse-title text-xl font-medium">
							translations
						</summary>
						<div className="collapse-content">
							<ButtonDeleteAndInsertTranslations />
						</div>
					</details>
					<details className="collapse bg-base-200">
						<summary className="collapse-title text-xl font-medium">
							update one product
						</summary>
						<div className="collapse-content">
							<UpdateOneProduct people={slugArr} />
							<div className="h-48"></div>
						</div>
					</details>
					<details className="collapse bg-base-200">
						<summary className="collapse-title text-xl font-medium">
							update text files
						</summary>
						<div className="collapse-content">
							<div>
								<Listfiles />
							</div>
						</div>
					</details>
					<details className="collapse bg-base-200">
						<summary className="collapse-title text-xl font-medium">
							revalidate slug
						</summary>
						<div className="collapse-content">
							<div>
								<RevalidateSlug />
							</div>
						</div>
					</details>
				</>
			)}
		</div>
	);
}
