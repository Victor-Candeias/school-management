"use client";

import styles from "./rightside.module.css";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../ui/card";
import { useAuth } from "../../context/AuthContext"; // Importa o contexto

const schoolOptions = [
	{ id: "1", name: "Quinta de Marrocos" },
	{ id: "2", name: "Pedro Santarem" },
];

const yearOptions = [
	{ id: "1", name: "2023/2024" },
	{ id: "2", name: "2024/2025" },
];

export default function RightSide() {
	const { refreshFlag, setCurrentSchool, school, setCurrentYear, year } =
		useAuth();
	const [numbers, setNumbers] = useState<number[]>([]);

	const [board, setBoard] = useState<JSX.Element[]>([]);
	const router = useRouter();

	console.log("School vazio=", school == "");






	const AddData = (event: React.MouseEvent<HTMLDivElement>): void => {
		const target = event.target as HTMLDivElement;

		alert(target.id);

		if (target.id === "addSchool") {
			AddSchool(target.id);
		} else {
			
		}
	};

	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		console.log(target.id);
	};

	const AddSchool = (id: string) => {
		console.log(id);
		router.push("/addschool");
	};

	return (
		<div className={styles.rightside}>
			<Card
				key={0}
				id="addSchool"
				header="Adicionar Escola"
				backgrounColor={"#03734a"}
				onClick={AddData}
			/>
			{schoolOptions.map((schoolMao, index) => (
				<Card
					key={index}
					id={schoolMao.id}
					header={schoolMao.name}
					backgrounColor={"#04aa6d"}
					onClick={AddData}
				/>
			))}
		</div>
	);
}
