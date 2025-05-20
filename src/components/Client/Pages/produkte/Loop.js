"use client";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useUserStore } from "@/lib/zustand/useUserStore";
export default function Loop({ fetchProductList }) {
	const { productlist, selected } = useUserStore();
	const [updateloop, setUpdateloop] = useState(false);
	//const [loop, setLoop] = useState(products);

	const [users, setUsers] = useState(productlist);
	//console.log(users);

	// Drag and Drop Handler
	const onDragDropEnds = (oldIndex, newIndex) => {
		//console.log("Drag and drop other tasks");
		//console.log(oldIndex, newIndex);
	};
	//console.log(selectedlist);
	async function saveloop() {
		setUpdateloop(true);
		// get list of products
		const prod = document.querySelectorAll(".products");
		const arr = [];
		Array.from(prod).map((row, i) => {
			// get data-slug attribute from element
			const slug = row.getAttribute("data-slug");
			const obj = {};
			// make object of slug and order number
			obj["slug"] = slug;
			if (selected.term_slug == "sale") {
				obj["order_sale_loop"] = i + 1;
			} else if (selected.term_slug == "shop") {
				obj["order_shop"] = i + 1;
			} else {
				obj["order_in_product_category_loop"] = i + 1;
			}

			//push object to array
			arr.push(obj);
		});
		//console.log(arr);
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
		const supabase = createClient(supabaseUrl, supabaseKey, {
			auth: { persistSession: false },
		});

		const { data, error } = await supabase
			.from("produkte")
			.upsert(arr)
			.select();
		if (data) {
			const newlistdata = await fetchProductList();
			setUpdateloop(false);
		}
		//console.log(data);
		//console.log(error);
	}

	useEffect(() => {
		//console.log("hello");
		setUsers(productlist);
	}, [productlist]);
	//console.log(products);

	return (
		<>
			<div className="  max-w-[1210px] mx-auto">
				<button className="btn btn-neutral" onClick={saveloop}>
					save loop
				</button>
				{updateloop ? <span className="text-2xl pl-8">updating</span> : null}
			</div>

			<div>
				<ReactSortable
					list={users}
					setList={(newlist) => setUsers(newlist)}
					ghostClass="dropArea"
					handle=".dragHandle"
					filter=".ignoreDrag"
					preventOnFilter={true}
					className={`grid-container grid grid-cols-4  max-w-[1210px] mx-auto ${
						updateloop ? "opacity-40" : null
					}`}
					onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
				>
					<>
						{users.map((row, i) => {
							if (row.stock_status == "outofstock") {
								return;
							}
							const price = row.price * 1;
							const saleprice = row.sale_price * 1;
							let preisanhang =
								row.preisanhang == "Laufmeter"
									? "/Lfm."
									: row.preisanhang == "Quadratmeter"
									? "/m<sup>2</sup>"
									: null;
							//console.log(preisanhang);
							const iplusone = i + 1;
							const theid = "drag-" + iplusone;

							return (
								<div
									key={i}
									className="grid-items card  dragHandle grid products"
									data-slug={row.slug}
								>
									<Image
										width={400}
										height={400}
										src={row.productimage + "?width=400"}
										unoptimized
										alt=""
										className="col-start-1 col-end-2 row-start-1 row-end-2"
									/>
									{saleprice ? (
										<div className="col-start-1 col-end-2 row-start-1 row-end-2 py-1 text-right">
											<span className="bg-red-600 text-white px-2 py-1 ">
												Sale!
											</span>
										</div>
									) : null}
									<div className=" text-center p-2.5 mt-4 mb-12 ">
										<span className="productname">{row.title}</span>
										<div className="text-center font-lato700 text-2xl ">
											<span className={`${saleprice ? "line-through" : null}`}>
												€ {price.toLocaleString("de-DE")}
												,-
												<span
													dangerouslySetInnerHTML={{ __html: preisanhang }}
												></span>
											</span>
											{saleprice ? (
												<span className="underline pl-4">
													€ {saleprice.toLocaleString("de-DE")}
													,-
													<span
														dangerouslySetInnerHTML={{
															__html: preisanhang,
														}}
													></span>
												</span>
											) : null}
											<div className="shippingcosts text-xs">zzgl. Versand</div>
											<div className="deliverytime text-xs  ">
												Lieferzeit: {row.lieferzeit} Wochen
											</div>
										</div>
									</div>
									{/* <div className="card-body">
											<h3 className=" h5 card-title m-0">{row.name}</h3>
										</div> */}
									{/* <div className="card-footer d-flex justify-content-between">
											<span>{row.id}</span>
											<span className="btn btn-white border shadow-sm ">=</span>
										</div> */}
								</div>
							);
						})}
					</>
				</ReactSortable>
			</div>
		</>
	);
}
