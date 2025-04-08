"use client"; // directive.

import { useRouter } from "next/navigation";
import { YearsInterface } from "@/types/Interfaces";

import Card from "@/components/ui/card";
import SmallButton from "@/components/ui/smallButton";
import styles from "./Common.module.css";

interface YearsLayoutProps {
	years: YearsInterface[];
	schoolId: string;
}

export default function YearLayout({ years, schoolId }: YearsLayoutProps) {
	const currentSchoolId = schoolId;

	console.log("Enter year layout:", currentSchoolId);

	const router = useRouter();

	const Return = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools`);
	};

	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools/${currentSchoolId}/new`);
	};

	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		console.log(target.id);
		router.push(`/schools/${currentSchoolId}/${currentSchoolId}${target.id}`);
	};

	return (
		<div className={styles.rightside}>
			<div>
				<SmallButton
					key={0}
					id="returnSchool"
					caption="&laquo; Voltar"
					customClass={styles.blue_button}
					onClick={Return}
				/>
				<SmallButton
					key={1}
					id="addYear"
					caption="Adicionar Ano"
					customClass={styles.green_button}
					onClick={AddData}
				/>
			</div>
			{years && years.map((item) => (
				<Card
					key={item.id}
					id={item.id!}
					header={item.name}
					customClass={styles.card_year}
					onClick={EnterData}
				/>
			))}
		</div>
	);
}
