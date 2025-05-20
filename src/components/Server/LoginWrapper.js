import {
	createServerActionClient,
	createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LoginWrapper({ children }) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		// This route can only be accessed by authenticated users.
		// Unauthenticated users will be redirected to the `/login` route.
		redirect("/loggedin");
	}
	return <>{children}</>;
}
