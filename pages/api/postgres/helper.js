import { sql } from "@vercel/postgres";

export async function deleteallproducts() {
	const result = await sql`DELETE from produkte;`;
	return result;
}
