"use server";

import axios from "axios";
import { encode } from "blurhash";
import jpeg from "jpeg-js";
import PNG from "png-js";
import { join, extname } from "path";

export async function blurhashFromUrl({ imageUrl }) {
	//{ logging }
	try {
		// Download the image
		const response = await axios({
			url: imageUrl,
			responseType: "arraybuffer",
		});

		const contentType = response.headers["content-type"];
		let imageData;

		if (contentType === "image/jpeg") {
			// Decode JPEG
			const jpegData = jpeg.decode(response.data);
			imageData = {
				data: jpegData.data,
				width: jpegData.width,
				height: jpegData.height,
			};
		} else if (contentType === "image/png") {
			// Decode PNG
			const png = new PNG(response.data);
			const pngData = await new Promise((resolve, reject) => {
				png.decodePixels((pixels) => {
					resolve({ data: pixels, width: png.width, height: png.height });
				});
			});
			imageData = pngData;
		} else {
			throw new Error("Unsupported image format");
		}

		// Generate the blurhash
		const blurHash = encode(
			imageData.data,
			imageData.width,
			imageData.height,
			4,
			4
		);
		return {
			blurhash: blurHash,
			width: imageData.width,
			height: imageData.height,
		};
	} catch (error) {
		//logging.error("Error generating BlurHash:", error);
		return null;
	}
}
