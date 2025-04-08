import { SetStateAction } from "react";
import { useAuth } from "../../context/AuthContext"; // Importa o contexto

import styles from "./leftside.module.css";
import Label from "../ui/label";
import ComboBox from "../ui/combobox";

const schoolOptions = [
	{ id: "1", name: "Quinta de Marrocos" },
	{ id: "2", name: "Pedro Santarem" },
];

const yearOptions = [
	{ id: "1", name: "2023/2024" },
	{ id: "2", name: "2024/2025" },
];

export default function LeftSide() {
	const { setCurrentSchool, setCurrentYear, refreshData, year } =
		useAuth();

	const handleSelectSchool = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setCurrentSchool(event.target.value as string);
		setCurrentYear("");
		refreshData();
	};

	const handleSelectYear = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setCurrentYear(event.target.value as string);
		refreshData();
	};

	/*
				<Label caption="Ano:" />
			<ComboBox
				options={yearOptions}
				caption="Seleciona um ano"
				selected={year}
				onChange={handleSelectYear}
				disabled={school == ""}
			/>
	
	*/

	return (
		<div className={styles.leftside}>
			{schoolOptions.map((school) => (
				<>
					<Label caption="Escola:" />
					<ComboBox
						options={schoolOptions}
						caption="Seleciona uma escola"
						selected={school.name}
						onChange={handleSelectSchool}
						disabled={false}
					/>
				</>
			))}
		</div>
	);
}
