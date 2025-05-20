import dynamic from "next/dynamic";
const Database = dynamic(
	() =>
		import("../../../components/Client/tables/Datenbankbearbeiten/Database"),
	{
		ssr: false,
	}
);

//import Database from "@/components/Client/tables/Datenbankbearbeiten/Database";
//asdfasdf

export default function Page() {
	const url = process.env.VERCEL_URL;
	return <Database url={url} />;
}
