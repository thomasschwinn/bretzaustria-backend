"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useUserStore } from "@/lib/zustand/useUserStore";
import IsLoadingWrapper from "@/components/Client/IsLoadingWrapper";

import { InfinitySpin } from "react-loader-spinner";
export default function Login() {
	const { setIsMainLoading } = useUserStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [message, setMessage] = useState(false);
	const [waitingforredirec, setwaitingforredirec] = useState(false);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const errorParam = searchParams.get("error");
	const errorDescParam =
		searchParams.get("error_description") ==
		"Email link is invalid or has expired" ? (
			<div>
				<div>
					Sie haben sich leider zu lange Zeit gelassen um Ihr Paßwort zu ändern.
				</div>
				<div>
					<button
						className=" underline"
						onClick={() => setView("password-reset")}
					>
						Paßwort erneut zurücksetzen.
					</button>
					<button className="underline" onClick={() => setView("sign-in")}>
						Ich habe Login Daten und möchte mich einloggen.
					</button>
				</div>
			</div>
		) : (
			searchParams.get("error_description")
		);
	const [view, setView] = useState(() => {
		if (code) {
			return "update-password";
		} else if (errorParam) {
			return "update-error";
		} else {
			return "sign-in";
		}
	});
	//console.log(view);
	const handleSignUp = async (e) => {
		e.preventDefault();
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});
		setView("check-email");
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		setIsMainLoading(true);
		setMessage(false);
		const raw = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		//console.log(raw);
		if (raw.error) {
			setIsMainLoading(false);
			setMessage("mit diesen Daten können Sie sich nicht einloggen");
		}
		//console.log(raw.error);
		if (raw.data.user) {
			setIsMainLoading(false);
			setwaitingforredirec(true);
			router.push("/loggedin");
			router.refresh();
		}
	};

	async function handlePasswordReset(e) {
		e.preventDefault();
		setIsMainLoading(true);
		setMessage(false);
		//console.log(email);
		const { data, error } = await supabase.auth.resetPasswordForEmail(email);
		setIsMainLoading(false);

		if (!error) {
			setMessage(
				"wir haben Ihnen eine Email mit einem Bestätigungslink geschickt, bitte überprüfen Sie Ihr Email Postfach"
			);
		} else {
			setMessage("netter Versuch...");
		}
	}

	async function handlePasswordUpdate(e) {
		e.preventDefault();
		setIsMainLoading(true);
		setMessage(false);
		const raw = await supabase.auth.updateUser({
			email: email,
			password: password,
		});
		if (raw.error) {
			setIsMainLoading(false);
			setMessage("irgendetwas ist schiefgelaufen");
		}
		//console.log(raw.error);
		if (raw.data.user) {
			setIsMainLoading(false);
			router.push("/loggedin");
			router.refresh();
		}
		//console.log(data, error);
	}

	// if (isMainLoading) {
	// 	return <IsLoading />;
	// }
	return (
		<>
			<IsLoadingWrapper />
			{waitingforredirec && (
				<div className="   h-screen flex  justify-center items-center z-[999999]">
					<div>
						<InfinitySpin width="200" color="#4fa94d" />
						<div className="text-center">
							Sie haben sich erfolgreich eingeloggt und werden umgeleitet
						</div>
						<div className="text-center">
							bitt haben Sie einen Moment Geduld...
						</div>
					</div>
				</div>
			)}
			<main className="min-h-screen bg-background flex flex-col items-center">
				<div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
					<form
						className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
						onSubmit={
							view === "sign-in"
								? handleSignIn
								: view === "password-reset"
								? handlePasswordReset
								: view === "update-password"
								? handlePasswordUpdate
								: null
						}
					>
						{view === "update-error" && errorDescParam}
						{view === "sign-in" ||
						view === "password-reset" ||
						view === "update-password" ? (
							<>
								<label className="text-md" htmlFor="email">
									Email
								</label>
								<input
									className="rounded-md px-4 py-2 bg-inherit border mb-6"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									placeholder="you@example.com"
								/>
							</>
						) : null}
						{view === "sign-in" || view === "update-password" ? (
							<>
								<label className="text-md" htmlFor="password">
									Password
								</label>
								<input
									className="rounded-md px-4 py-2 bg-inherit border mb-6"
									type="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									placeholder="••••••••"
								/>
							</>
						) : null}
						{view === "update-password" ? (
							<button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
								Paßwort updaten
							</button>
						) : null}
						{view === "sign-in" ? (
							<>
								<button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
									Log In
								</button>
								{message && <div className="text-red-500">{message}</div>}
								<p className="text-sm text-center">
									Logindaten vergessen?
									<button
										className="ml-1 underline"
										onClick={() => setView("password-reset")}
									>
										Passwort ändern
									</button>
								</p>
							</>
						) : null}
						{view === "password-reset" && (
							<>
								<button className="bg-green-700 rounded px-4 py-2 text-white mb-6">
									Paßwort Reset link anfordern
								</button>
								<p className="text-sm text-center">
									Sie haben Logindaten?
									<button
										className="ml-1 underline"
										onClick={() => setView("sign-in")}
									>
										hier einloggen
									</button>
								</p>
								{message && <div className="text-red-500">{message}</div>}
							</>
						)}
					</form>
				</div>{" "}
			</main>
		</>
	);
}
