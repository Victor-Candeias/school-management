"use client"; // directive.

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Importa o contexto

import Card from "@/components/ui/card";
import SmallButton from "@/components/ui/smallButton";
import styles from "./Common.module.css";

const classOptions = [
	{ id: "1", name: "Turma 7º A", Alunos: "20" },
	{ id: "2", name: "Turma 7º B", Alunos: "24" },
	{ id: "1", name: "Turma 7º C", Alunos: "25" },
	{ id: "2", name: "Turma 7º C", Alunos: "26" },
];

export default function ClassLayout({
	yearId,
}: {
	yearId: string;
}) {
	const { contextUser } = useAuth();
	const currentYserId = yearId;

	console.log("currentSchoolId=", currentSchoolId);
	console.log("currentYserId=", currentYserId);

	console.log("Enter SchoolLayout");

	const router = useRouter();

	const Return = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools/${schoolId}`);
	};

	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools/${schoolId}/${yearId}/new`);
	};

	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		console.log(target.id);
		router.push(`/schools/${schoolId}/${yearId}/${contextUser?.userId}${target.id}`);
	};

	return (
		<div className={styles.rightside}>
			<div>
				<SmallButton
					key={9999999}
					id="returnYear"
					caption="&laquo; Voltar"
					customClass={styles.blue_button}
					onClick={Return}
				/>
				<SmallButton
					key={9999991}
					id="addClass"
					caption="Adicionar Turma"
					customClass={styles.green_button}
					onClick={AddData}
				/>
			</div>
			{classOptions.map((classItem) => (
				<Card
					key={classItem.id}
					id={classItem.id}
					header={classItem.name}
					text={"Alunos: " + classItem.Alunos}
					customClass={styles.card_classes}
					onClick={EnterData}
				/>
			))}
		</div>
	);
}
