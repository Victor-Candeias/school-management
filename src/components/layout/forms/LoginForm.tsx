"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Importa o contexto
import { login } from "@/utils/auth";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import CustomLink from "@/components/ui/customlink";
import formStyles from "./forms.module.css";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const { setLogin } = useAuth(); // Obtém a função para salvar o token

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// Tenta fazer o login com as credenciais fornecidas
			const data = await login({ email, password });

			console.log("Token recebido:", data.token);
			console.log("Role recebido:", data.role);

			if (data.status >= 400) {
				throw new Error(`Erro ao fazer login: ${data.message}`);
			}

			setLogin({ userId: data.userId, user: email, role: data.role, token: data.token });

			// Se o login for bem-sucedido, redireciona para a página do menu
			// console.log("Loginform=", `/schools/${data.userId}`);

			router.push("/schools");
		} catch (error) {
			console.error("Erro inesperado:", error);
			alert("Ocorreu um erro inesperado. Tente novamente." + error);
		}
	};

	return (
		<form
			className={formStyles.form}
			action="/action_page.php"
			onSubmit={handleSubmit}
		>
			<h2 className={formStyles.h2}>Login</h2>
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
			<Button label="Entrar" type="submit" />
			<CustomLink href="/register" customClass={formStyles.link}>
				Registar nova conta
			</CustomLink>
		</form>
	);
}
