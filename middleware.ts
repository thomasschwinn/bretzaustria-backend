import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	// redirect home to login
	// if (req.nextUrl.pathname == "/") {
	// 	return NextResponse.redirect(new URL("/login", req.url));
	// }
	const res = NextResponse.next();
	// Create a Supabase client configured to use cookies
	//console.log(req)
	const supabase = createMiddlewareClient({ req, res });
	// Refresh session if expired - required for Server Components
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
	await supabase.auth.getSession();
	return res;
}
