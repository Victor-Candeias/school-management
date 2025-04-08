"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
	children: ReactNode; // Conteúdo da página protegida
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { contextUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!contextUser?.token) {
			router.push("/login"); // Redireciona para a página de login se não estiver autenticado
		}
	}, [contextUser, router]);

	// Retorna null enquanto redireciona
	if (!contextUser?.token) {
		return null;
	}

	return <>{children}</>; 
}
