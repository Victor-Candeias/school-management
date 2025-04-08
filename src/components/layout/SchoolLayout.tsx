"use client"; // directive.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SchoolInterface } from "@/types/Interfaces";
import { getAllSchools } from "@/utils/schools";
import { useAuth } from "@/context/AuthContext"; // Importa o contexto

import Card from "@/components/ui/card";
import SmallButton from "@/components/ui/smallButton";

import styles from "./Common.module.css";

interface SchoolLayoutProps {
	schools: SchoolInterface[];
}

export default function SchoolLayout() {
	const router = useRouter();
	const { contextUser } = useAuth();
	const [schoolList, setSchoolList] = useState<SchoolInterface[]>([]);

	useEffect(() => {
		const fetchSchools = async () => {
		  const schools = await getAllSchools(contextUser?.userId); // Espera pela resolução da promessa
		  setSchoolList(schools); // Atualiza o estado com a lista de escolas
		};
		fetchSchools();
	  }, []);

	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		// create new school
		router.push("/schools/new");
	};

	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		// move the years page
		const target = event.target as HTMLDivElement;
		console.log(target.id);
		router.push(`/schools/${contextUser?.userId}${target.id}`);
	};

	return (
		<div className={styles.rightside}>
			<div>
				<SmallButton
					key={0}
					id="addYear"
					caption="Adicionar Escola"
					customClass={styles.green_button}
					onClick={AddData}
				/>
			</div>
			{schoolList && schoolList.map((school) => (
				<Card
					key={school.id}
					id={school.code}
					header={school.name}
					text={school.code}
					subText={school.email}
					data={school.contact}
					customClass={styles.card_school}
					onClick={EnterData}
				/>
			))}
		</div>
	);
}
