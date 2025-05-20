"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

export default function SuccessMessage({ setShowSuccessMessage }) {
	let [isOpen, setIsOpen] = useState(true);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(false);
		}, 500);
		const timer2 = setTimeout(() => {
			setShowSuccessMessage(false);
		}, 3000);
		return () => {
			clearTimeout(timer);
			clearTimeout(timer2);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{/* <div className="fixed inset-0 flex items-center justify-center z-[99999999]">
				<button
					type="button"
					onClick={openModal}
					className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					Open dialog
				</button>
			</div> */}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-[9999999999]"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-75"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-1000"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-green-900 bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center ">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-100  "
								enterFrom="opacity-0 scale-95 "
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-1000"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
										<div className="text-3xl text-center">
											Speicherung war erfolgreich
										</div>
									</Dialog.Title>
									{/* <div className="mt-2">
										<p className="text-sm text-gray-500">
											Your payment has been successfully submitted. We’ve sent
											you an email with all of the details of your order.
										</p>
									</div> */}

									{/* <div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
									</div> */}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
