"use client";

import { Spin as Hamburger } from "hamburger-react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TopMenu from "@/components/Menu/TopMenu";

export default function HamburgerWrapper({ t, locale, user }) {
	// configure states for headlessui modal
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	let HamburgerColor;
	isOpen == true ? (HamburgerColor = "white") : (HamburgerColor = "black");
	//console.log(t);

	return (
		<>
			<span onClick={openModal} className=" !cursor-pointer">
				<Hamburger
					className=" "
					color={HamburgerColor}
					toggled={isOpen}
					toggle={setIsOpen}
					size={36}
				/>
			</span>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-[50]" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-80" />
					</Transition.Child>

					<div className="fixed inset-0 ">
						<div className="flex min-h-full p-4 justify-center pt-16 text-center">
							<div className=" w-[100vw] top-0 left-0 absolute">
								<div className="container mx-auto h-[89px]  py-4 lg:px-20 grid justify-end content-center">
									<span
										onClick={closeModal}
										className="relative z-[100] !cursor-pointer "
									>
										<Hamburger
											color={HamburgerColor}
											size={36}
											toggled={isOpen}
										/>
									</span>
								</div>
							</div>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel>
									<div className="w-full max-w-[450px] transform overflow-hidden  p-6  text-left align-middle  transition-all">
										<TopMenu
											t={t}
											locale={locale}
											closeModal={closeModal}
											user={user}
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
