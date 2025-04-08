"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../../utils/auth";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import formStyles from "./forms.module.css";
import CustomLink from "../../ui/customlink";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Tenta fazer o login com as credenciais fornecidas
			const data = await register({ name, email, password });

			console.log("Token recebido:", data.message);
			console.log("Role recebido:", data.status);

			if (data.status >= 400) {
				throw new Error(`Erro ao fazer login: ${data.message}`);
			}

			// Se o login for bem-sucedido, redireciona para a página do menu
			router.push("/login");
		} catch (error) {
			console.error("Erro inesperado:", error);
		}
	};

	return (
		<form
			className={formStyles.form}
			action="/action_page.php"
			onSubmit={handleSubmit}
		>
			<h2 className={formStyles.h2}>Registar</h2>
			<Input
				id="uzsername"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Nome"
				required
			/>
			<Input
				id="useremail"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				required
			/>
			<Input
				id="userpassword"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Senha"
				required
			/>
			<Button label="Registrar" type="submit" />
			<CustomLink href="/login" customClass={formStyles.link}>
				Efetuar login
			</CustomLink>
		</form>
	);
}
