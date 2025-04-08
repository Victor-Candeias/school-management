"use client" // directive.

import { SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importa o contexto
import { useRouter } from "next/navigation";

import styles from "./header.module.css";

export default function Header() {
	const {
		setLogout,
		contextUser
	} = useAuth();

	const router = useRouter();

	const [currentUser, setCurrentUser] = useState("");
	
	const handleMainMenu = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		router.push("/schools")
	};

	useEffect(() => {
		setCurrentUser(contextUser?.role + ": " + contextUser?.user);
	  }, [contextUser]); // Adicionando dependências para garantir atualização correta
	

	const handleLogout = () => {
		setLogout();
	};

	return (
		<div className={styles.header}>
			<a href="#home" className={styles.active} onClick={() => handleMainMenu({ target: { value: "" } })}>
				Home
			</a>
			<label>{currentUser}</label>
			<a href="#home" className={styles.right} onClick={handleLogout}>
				Logout
			</a>
		</div>
	);
}
