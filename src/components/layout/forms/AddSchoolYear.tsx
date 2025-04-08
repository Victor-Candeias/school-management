"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import formStyles from "./forms.module.css";
import ComboBox from "@/components/ui/combobox";
import Button from "@/components/ui/button";
import { YearsInterface } from "@/types/Interfaces";
import { createYear } from "@/utils/years";

export default function AddSchoolForm({ schoolId }: { schoolId: string }) {
	const currentSchoolId = schoolId;
	const returnPath = `/schools/${schoolId}`;

	console.log(currentSchoolId);

	const [yearName, setYearName] = useState("");

	const router = useRouter();

	const currentYear = new Date().getFullYear();
	const years: { id: string; name: string }[] = [];

	for (let ano = currentYear + 1; ano >= currentYear - 5; ano--) {
		years.push({ id: ano.toString(), name: `${ano - 1}/${ano}` });
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const data: YearsInterface = {
			schoolId: currentSchoolId,
			name: yearName,
		};

		console.log(data);

		try {
			const response = await createYear(data);

			console.log("AddSchoolForm():response:", response);

			if (response.status >= 400) {
				throw new Error(`Erro ao fazer login: ${data.message}`);
			}

			// volta ao menu anteriro
			router.push(returnPath);
		} catch (error) {
			console.error("Erro ao adicionar escola:", error);
			alert("Erro ao adicionar escola. Tente novamente.");
		}
	};

	const handleCancel = () => {
		if (confirm("Tem certeza que deseja cancelar?")) {
			setYearName("");

			// volta ao menu
			router.push(returnPath);
		}
	};

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<h2 className={formStyles.h2}>Adicionar novo Ano escolar</h2>
			<ComboBox
				options={years}
				caption="Selecione o ano"
				selected={yearName}
				disabled={false}
				onChange={(e) =>
					setYearName(e.target.options[e.target.selectedIndex].text)
				}
			/>
			<div className={formStyles["button-group"]}>
				<Button
					label="Cancelar"
					customBackground="red"
					type="button"
					handleClick={handleCancel}
				/>
				<Button label="Adicionar >>>" customBackground="green" type="submit" />
			</div>
		</form>
	);
}
