"use client";
import Link from "next/link";
import Image from "next/image";
import { FcFolder } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { useState, useRef } from "react";
import { main } from "@/lib/uploadFileToBunny";

export default function ImageAdminClient({
	data,
	path,
	bunnyPath,
	bunnyStorageZone,
	folderpath,
	imgurl,
	bunnyStorageZoneWithSlash,
	bunnyurl,
}) {
	const [modalimg, setModalimg] = useState({});
	const [isCopied, setIsCopied] = useState(false);
	function imageClickHandler(imgsrc, bunnysrc) {
		setModalimg({ imgsrc: imgsrc, bunnysrc, bunnysrc });
		window.my_modal_3.showModal();
	}
	const [uploadFileName, setUploadFileName] = useState();
	const inputRef = useRef();

	async function uploadFile(e) {
		e.preventDefault();

		// console.log("upload started");
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());

		const d = await main(formJson.myfile);
	}

	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	}
	let thepath = false;
	if (path !== "") {
		thepath = true;
	}
	//console.log(thepath);
	const upperPathArr = path.split("/");
	upperPathArr.pop();
	//console.log(upperPathArr);
	let upperPathStr = "";
	upperPathArr.map((el, i) => {
		if (!el == "") {
			upperPathStr += "/" + el;
		}
	});
	//console.log(upperPathStr);
	// onClick handler function for the copy button
	function handleCopyClick(str) {
		// Asynchronously call copyTextToClipboard
		copyTextToClipboard(str)
			.then(() => {
				// If successful, update the isCopied state value
				setIsCopied(true);
				setTimeout(() => {
					setIsCopied(false);
				}, 1500);
			})
			.catch((err) => {});
	}
	//console.log(imgurl);
	return (
		<>
			<div className="container mx-auto">
				<div className="grid grid-cols-4 gap-4">
					{data.map((row, i) => {
						if (
							bunnyPath.replace("/", "").replace("/", "") != bunnyStorageZone
						) {
							//console.log();
							folderpath =
								bunnyPath.replace(bunnyStorageZoneWithSlash, "") +
								row.ObjectName;
							//console.log(folderpath);
						} else {
							folderpath = "/" + row.ObjectName;
						}
						const imgsrc = imgurl + row.ObjectName;
						const bunnysrc = bunnyurl + row.ObjectName;
						//console.log(i, path);
						return (
							<>
								{i == 0 && thepath ? (
									<div key={i} className="bg-slate-300  p-1  ">
										<Link href={`/loggedin/bilder?path=${upperPathStr}`}>
											<div className="bg-white ">
												<FcOpenedFolder className="w-32 h-32" />
											</div>
										</Link>
										<form method="post" onSubmit={uploadFile}>
											<input
												type="file"
												id="myfile"
												name="myfile"
												//onChange={uploadile}
												//ref={inputRef}
												//onChange={() => uploadFile(inputRef.current.files[0])}
											/>
											<button type="submit">hochladen</button>
										</form>
									</div>
								) : (
									<div key={i} className="bg-slate-300  p-1 ">
										{/* {i == 0 && thepath && (
									<>
										<Link href={`/loggedin/bilder?path=${upperPathStr}`}>
											<div className="bg-white ">
												<FcOpenedFolder className="w-32 h-32" />
											</div>
										</Link>
										<input type="file" id="myfile" name="myfile" />
									</>
								)} */}
										{row.IsDirectory && (
											<Link href={`?path=${folderpath}`}>
												<div className="bg-white h-full">
													{row.ObjectName}
													<FcFolder className="w-32 h-32" />
												</div>
											</Link>
										)}
										{!row.IsDirectory && (
											<>
												<Image
													src={imgsrc + "?width=372"}
													width={372}
													height={200}
													alt={""}
													className="bg-white"
													onClick={() => imageClickHandler(imgsrc, bunnysrc)}
												/>
												<div>{row.ObjectName}</div>
												<div className="w-[0px] h-[0px]">
													<Image
														unoptimized
														width={372}
														height={200}
														alt={""}
														src={imgsrc}
													/>
													<Image
														unoptimized
														width={372}
														height={200}
														alt={""}
														src={bunnysrc}
													/>
												</div>
											</>
										)}
									</div>
								)}
							</>
						);
					})}
				</div>
			</div>
			<dialog id="my_modal_3" className="modal">
				<form method="dialog" className="modal-box">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>

					<div className="grid grid-cols-2 grid-rows-1">
						<div className="bg-slate-200 p-2">
							<Image
								unoptimized
								src={modalimg.imgsrc}
								width={300}
								height={300}
								alt=""
								onClick={() => handleCopyClick(modalimg.imgsrc)}
							/>{" "}
						</div>
						{/* <div className="bg-slate-200 p-2">
							bunny url
							<Image
								unoptimized
								src={modalimg.bunnysrc}
								width={300}
								height={300}
								alt=""
								onClick={() => handleCopyClick(modalimg.bunnysrc)}
							/>{" "}
						</div> */}
					</div>
					<span>{isCopied ? "url in Zwischenablage kopiert" : ""}</span>
					<p className="py-4">Press ESC key or click on ✕ button to close</p>
				</form>
			</dialog>
		</>
	);
}
