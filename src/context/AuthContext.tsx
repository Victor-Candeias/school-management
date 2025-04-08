"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Para navegar após logout

interface School {
	id: string;
	name: string;
}

interface Year {
	id: string;
	name: string;
}

interface User {
	userId: string;
	user: string;
	role: string;
	token: string;
}

interface AuthContextType {
	contextUser: User | null;
	school: School | null; // Agora usa o objeto School
	year: Year | null;
	refreshFlag: boolean;
	refreshData: () => void;
	setLogin: (contextUser: User) => void;
	setLogout: () => void;
	setCurrentSchool: (school: School) => void; // Agora recebe um objeto válido
	setCurrentYear: (year: Year) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [contextUser, setUser] = useState<User | null>(null);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
	const [school, setSchool] = useState<School | null>(null);
	const [year, setYear] = useState<Year | null>(null);

	const router = useRouter();

	// Método para forçar atualização dos componentes que usam o contexto
	const refreshData = () => {
		setRefreshFlag((prev) => !prev);
	};

	const setLogin = (user: User) => {
		setUser(user);
		localStorage.setItem("token", user.token); // Salva o token
	};

	const setLogout = () => {
		setUser(null);
		localStorage.removeItem("token"); // Remove o token do armazenamento local
		router.push("/login"); // Redireciona para a página de login
	};
	const setCurrentSchool = (school: School) => {
		setSchool(school);
	};

	const setCurrentYear = (year: Year) => {
		setYear(year);
	};

	return (
		<AuthContext.Provider
			value={{
				contextUser,
				refreshData,
				setLogin,
				setLogout,
				setCurrentSchool,
				school,
				setCurrentYear,
				year,
				refreshFlag,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
};
