"use client";

import { Leaf, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [isLoadingEmail, setIsLoadingEmail] = useState(false);
	const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

	// Handler for Email (OTP) Login
	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoadingEmail(true);

		// This tells Auth.js to trigger the Nodemailer provider we set up
		// 'callbackUrl' is where they go after clicking the link in their email
		await signIn("nodemailer", { email, callbackUrl: "/" });

		// Note: We don't set loading to false here because the page will redirect!
	};

	// Handler for Google Login
	const handleGoogleLogin = async () => {
		setIsLoadingGoogle(true);
		await signIn("google", { callbackUrl: "/" });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
				{/* Header Logo & Title */}
				<div className="flex flex-col items-center mb-8">
					<div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
						<Leaf className="w-6 h-6" />
					</div>
					<h1 className="text-2xl font-black text-gray-900 tracking-tight">
						Welcome to DAP
					</h1>
					<p className="text-sm text-gray-500 mt-2 text-center">
						Log in or create an account to manage your greenery.
					</p>
				</div>

				{/* Email OTP Form */}
				<form onSubmit={handleEmailLogin} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="h-12"
						/>
					</div>
					<Button
						type="submit"
						disabled={isLoadingEmail || isLoadingGoogle}
						className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-bold"
					>
						{isLoadingEmail ? (
							<Loader2 className="w-5 h-5 animate-spin" />
						) : (
							"Continue with Email"
						)}
					</Button>
				</form>

				{/* Divider */}
				<div className="relative my-8">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-200"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-4 bg-white text-gray-500">
							Or continue with
						</span>
					</div>
				</div>

				{/* Google Button */}
				<Button
					type="button"
					variant="outline"
					disabled={isLoadingGoogle || isLoadingEmail}
					onClick={handleGoogleLogin}
					className="w-full h-12 border-gray-200 text-gray-900 font-bold hover:bg-gray-50"
				>
					{isLoadingGoogle ? (
						<Loader2 className="w-5 h-5 animate-spin" />
					) : (
						<>
							{/* Google SVG Logo */}
							<svg
								className="w-5 h-5 mr-2"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Google
						</>
					)}
				</Button>

				<p className="text-xs text-gray-400 text-center mt-8">
					By clicking continue, you agree to our Terms of Service and Privacy
					Policy.
				</p>
			</div>
		</div>
	);
}
