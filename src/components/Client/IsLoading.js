"use client";
import { InfinitySpin } from "react-loader-spinner";
export default function IsLoading() {
	return (
		<div className="   h-screen flex  justify-center items-center z-[999999]">
			<div>
				<InfinitySpin width="200" color="#4fa94d" />
				<div className="text-center">loading...</div>
			</div>
		</div>
	);
}
