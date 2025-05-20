import { TbExternalLink } from "react-icons/tb";

// import { Fragment, useState } from "react";
import { useUserStore } from "@/lib/zustand/useUserStore";
//import SingleProductModal from "@/components/Client/shadcn/table/SingleProductModal";
//import { useUserStore } from "@/lib/zustand/useUserStore";
export default function Modallink({ slug, tablerow, fetchProductList }) {
	const { isOpenModal, setIsOpenModal, setSlug } = useUserStore();
	//const [modalstate, setModalstate] = useState(false);
	//	let [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<>
			<>
				<span
					//type="button"
					onClick={() => {
						setIsOpenModal(true);
						setSlug(slug);
					}}
					className="cursor-pointer"
				>
					<TbExternalLink />
				</span>
				{/* <div className=" inset-0 flex items-center justify-center">
					
				</div> */}
			</>
			{/* <label htmlFor={`my_modal_${tablerow}`} className="cursor-pointer">
				<TbExternalLink />
			</label>
			<input
				type="checkbox"
				id={`my_modal_${tablerow}`}
				className="modal-toggle"
			/>
			<div className="modal">
				<div className="modal-box max-w-[1600px]">
					<h3 className="font-bold text-lg">{slug}</h3>
					<SingleProductModal

					// prodCat={prodCat}
					// saleVerfuegbarkeitArr={saleVerfuegbarkeitArr}
					// stockstatusArr={stockstatusArr}
					// preisanhangArr={preisanhangArr}
					// ausstellungsstueckArr={ausstellungsstueckArr}
					// sale_verfuegbarkeitArr={sale_verfuegbarkeitArr}
					// bezugsstoffAuswahlArr={bezugsstoffAuswahlArr}
					//setModalstate={setModalstate}
					// slugs={slugs}
					/>
					<label htmlFor={`my_modal_${tablerow}`} className="btn">
						Close!
					</label>
				</div>
				<label htmlFor={`my_modal_${tablerow}`} className="modal-backdrop">
					Close!
				</label>
			</div> */}
		</>
	);

	// return (
	// 	<>
	// 		<TbExternalLink onClick={() => setModalstate(true)} />

	// 		{modalstate == true ? (
	// 			<dialog className="modal bg-slate-200 " open={modalstate}>
	// 				<form method="dialog" className="modal-box max-w-[1600px] ">
	// 					<h3 className="font-bold text-lg">{slug}</h3>
	// 					<SingleProductModal
	// 						slug={slug}
	// 						prodCat={prodCat}
	// 						saleVerfuegbarkeitArr={saleVerfuegbarkeitArr}
	// 						stockstatusArr={stockstatusArr}
	// 						preisanhangArr={preisanhangArr}
	// 						ausstellungsstueckArr={ausstellungsstueckArr}
	// 						sale_verfuegbarkeitArr={sale_verfuegbarkeitArr}
	// 						bezugsstoffAuswahlArr={bezugsstoffAuswahlArr}
	// 						setModalstate={setModalstate}
	// 					/>
	// 					<p className="py-4">Click the button below to close</p>
	// 					<div className="modal-action">
	// 						{/* if there is a button, it will close the modal */}
	// 						<button className="btn" onClick={() => setModalstate(false)}>
	// 							Close
	// 						</button>
	// 					</div>
	// 				</form>
	// 			</dialog>
	// 		) : null}
	// 	</>
	// );
}
