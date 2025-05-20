import { sql } from "@vercel/postgres";

export async function psql(sqlstring) {
	//const { rows, fields } = await sql`${sqlstring}`;
	const sqlresult = await sql`${sqlstring};`;
	return sqlresult;
}
