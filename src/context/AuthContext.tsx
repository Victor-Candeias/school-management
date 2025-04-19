"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Para navegar após logout

interface SchoolContext {
	id: string;
	name: string;
}

interface YearContext {
	id: string;
	name: string;
}

interface ClassContext {
	id: string;
	name: string;
	level: string;
}

interface User {
	userId: string;
	user: string;
	role: string;
}

interface AuthContextType {
	contextUser: User | null;
	schools: SchoolContext | null;
	year: YearContext | null;
	classes: ClassContext | null;
	refreshFlag: boolean;
	refreshData: () => void;
	setLogin: (contextUser: User) => void;
	setLogout: () => void;
	setCurrentSchool: (schools: SchoolContext) => void;
	resetCurrentSchool: () => void;
	setCurrentYear: (year: YearContext) => void;
	resetCurrentYear: () => void;
	setCurrentClass: (classes: ClassContext) => void;
	resetCurrentClass: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [contextUser, setUser] = useState<User | null>(null);
	const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
	const [schools, setSchools] = useState<SchoolContext | null>(null);
	const [year, setYear] = useState<YearContext | null>(null);
	const [classes, setClasses] = useState<ClassContext | null>(null);

	const router = useRouter();

	// Método para forçar atualização dos componentes que usam o contexto
	const refreshData = () => {
		setRefreshFlag((prev) => !prev);
	};

	const setLogin = (user: User) => {
		setUser(user);
		// localStorage.setItem("token", user.token); // Salva o token
		refreshData();
	};

	const setLogout = () => {
		setUser(null);
		resetCurrentClass();
		resetCurrentSchool();
		resetCurrentYear();
		refreshData();

		// localStorage.removeItem("token"); // Remove o token do armazenamento local
		router.push("/login"); // Redireciona para a página de login
	};

	const setCurrentSchool = (school: SchoolContext) => {
		setSchools(school);
		refreshData();
	};

	const resetCurrentSchool = () => {
		setSchools(null);
		refreshData();
	};

	const setCurrentYear = (year: YearContext) => {
		setYear(year);
		refreshData();
	};

	const resetCurrentYear = () => {
		setYear(null);
		refreshData();
	};

	const setCurrentClass = (classes: ClassContext) => {
		setClasses(classes);
		refreshData();
	};

	const resetCurrentClass = () => {
		setClasses(null);
		refreshData();
	};

	return (
		<AuthContext.Provider
			value={{
				contextUser,
				refreshData,
				setLogin,
				setLogout,
				setCurrentSchool,
				resetCurrentSchool,
				setCurrentYear,
				resetCurrentYear,
				setCurrentClass,
				resetCurrentClass,
				schools,
				year,
				classes,
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
