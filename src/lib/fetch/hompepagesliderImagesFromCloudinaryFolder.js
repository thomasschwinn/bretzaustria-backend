import cloudinary from "@/lib/datadefinitions/_cloudinary";
import { cache } from "react";

export const hompepagesliderImagesFromCloudinaryFolder = cache(
	async (folder) => {
		const results = await cloudinary.v2.search
			.expression(`folder:${folder}/*`)
			.sort_by("public_id", "desc")
			.max_results(400)
			.execute();

		return results;
	}
);
