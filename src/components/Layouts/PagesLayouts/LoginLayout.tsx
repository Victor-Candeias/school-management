"use client";

import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { login } from "@/api/apiClient";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import Loader from "@/components/Ui/Loader";

export default function LoginLayout() {
	const router = useRouter();
	const { setLogin } = useAuth(); // Get the function to store login data in context

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailErrMessage, setEmailErrMessage] = useState("");
	const [passwordErrMessage, setPasswordErrMessage] = useState("");
	const [commomErrors, setCommomErrors] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (email === "") {
				setEmailErrMessage("Email é um campo obrigatório!!!");
				return;
			}

			const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const emailValçidation = regex.test(email);

			if (!emailValçidation) {
				setEmailErrMessage("Formato do Email é inválido!!!");
				return;
			}

			if (password === "") {
				setPasswordErrMessage("Password é um campo obrigatório!!!");
				return;
			}

			setIsSubmitting(true);

			const response = await login({ email, password });

			// If login is unsuccessful (status >= 400), throw an error
			if (response.status >= 400) {
				setCommomErrors(`Login failed: ${response.message}`);
				return;
			}

			// Store login data (userId, email, role, token) in context
			setLogin({
				userId: response.userId ?? "",
				user: email,
				role: response.role ?? "",
			});

			// Redirect the user to the "/schools" page upon successful login
			router.push(`/${response.userId}`);
		} catch (error) {
			setCommomErrors(`Login failed: ${error}`);
		}
	};

	const onEmptied = () => {
		setEmailErrMessage("");
		setPasswordErrMessage("");
		setIsSubmitting(false);
		setCommomErrors("");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-cover bg-center">
			<div className="bg-white border border-blue-500 bg-opacity-80 p-8 rounded-2xl shadow-lg w-full max-w-md">
				<motion.form
					onSubmit={onSubmit}
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 30 }}
					transition={{ duration: 0.4 }}
				>
					<h1 className="text-3xl font-bold text-center mb-6">Login</h1>

					<div className="mb-4">
						<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
							<Mail className="w-5 h-5 text-gray-500" />
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onEmptied={onEmptied}
								className="w-full outline-none bg-transparent"
							/>
						</label>
						{emailErrMessage && (
							<p className="text-sm text-red-500 mt-1">{emailErrMessage}</p>
						)}
					</div>

					<div className="mb-2">
						<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
							<Lock className="w-5 h-5 text-gray-500" />
							<input
								type="password"
								placeholder="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full outline-none bg-transparent"
							/>
						</label>
						{passwordErrMessage && (
							<p className="text-sm text-red-500 mt-1">{passwordErrMessage}</p>
						)}
					</div>

					<div className="text-right mb-6">
						<Link href="/forgot-password">
							<span className="cursor-pointer text-sm text-blue-600 hover:underline cursor-pointer">
								Esqueci a senha?
							</span>
						</Link>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
					>
						{isSubmitting && (
							<Loader />
						)}
						{isSubmitting ? "A validar o utilizador..." : "Entrar"}
					</button>

					<p className="text-center text-sm text-gray-600 mt-6">
						Não tem conta?{" "}
						<Link href="/signup">
							<span className="cursor-pointer text-blue-600 hover:underline font-medium cursor-pointer">
								Criar conta
							</span>
						</Link>
					</p>
				</motion.form>
				{commomErrors && (
					<p className="text-sm text-red-500 mt-1">{commomErrors}</p>
				)}
			</div>
		</div>
	);
}
