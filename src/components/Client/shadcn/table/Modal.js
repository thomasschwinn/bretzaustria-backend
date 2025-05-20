import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useUserStore } from "@/lib/zustand/useUserStore";
import dynamic from "next/dynamic";
const SingleProductModal = dynamic(
	() => import("@/components/Client/shadcn/table/SingleProductModal"),
	{
		ssr: false,
	}
);
export default function Modal({ fetchProductList }) {
	//console.log(fetchProductList);
	const { isOpenModal, setIsOpenModal } = useUserStore();
	return (
		<Transition appear show={isOpenModal} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-[99999]"
				onClose={() => setIsOpenModal(false)}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-[1800px] max-h-[90vh] transform overflow-x-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<SingleProductModal fetchProductList={fetchProductList} />

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										onClick={() => setIsOpenModal(false)}
									>
										Close!
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
