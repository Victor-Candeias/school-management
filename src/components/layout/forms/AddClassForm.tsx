"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClass, getLevels } from "@/utils/classes";
import { getYearName } from "@/utils/years";
import { useAuth } from "@/context/AuthContext";
import { GenerateGuidId } from "@/utils/utils";
import { ClassInterface, Levels } from "@/types/Interfaces";

import { toast } from "react-toastify";

import formStyles from "./forms.module.css";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import ComboBox from "@/components/ui/combobox";

// Component for adding a new class
export default function AddClassForm({
	schoolId,
	yearId,
}: {
	schoolId: string;
	yearId: string;
}) {
	// Throw an error if required props are missing
	if (!schoolId || !yearId)
		throw new Error("Error: schoolId and yearId are required");

	// Define the return path after form submission or cancel
	const returnPath = `/schools/${schoolId}/${yearId}`;

	const { contextUser } = useAuth();

	// State hooks for managing form data
	const [className, setClassName] = useState("");
	const [classLevel, setClassLevel] = useState("");
	const [yearName, setYearName] = useState("");
	const [levels, setLevels] = useState<Levels[]>([]);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	// Fetch year and levels data on component mount
	useEffect(() => {
		const fetchSchools = async () => {
			const result = await getYearName(
				contextUser?.userId ?? "",
				schoolId,
				yearId,
			);

			console.log("await getYearName=", result);

			setYearName(result?.name ?? "")
		};

		const fetchLevels = async () => {
			const result = await getLevels();
			setLevels(result);
			setLoading(false);
		};

		fetchSchools();
		fetchLevels();
	}, []);

	// Handle form submission
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const selectedLevel = levels.find((level) => level.id === classLevel);

		// Construct class data object
		const data: ClassInterface = {
			userId: contextUser?.userId ?? "",
			schoolId: schoolId,
			yearId: yearId,
			classId: GenerateGuidId(),
			className: className,
			classYear: yearName,
			classLevel: selectedLevel?.name ?? "",
		};

		try {
			const response = await createClass(data);

			if (response.status != null && response.status >= 400) {
				throw new Error(`Failed to create class: ${data.message}`);
			}

			toast.success("Class added successfully!");
			router.push(returnPath);
		} catch (error) {
			console.error("Error adding class:", error);
			toast.error("Error adding class. Please try again.");
		}
	};

	// Handle form cancellation
	const handleCancel = async (event: React.FormEvent) => {
		event.preventDefault();

		if (confirm("Are you sure you want to cancel?")) {
			setClassName("");
			setClassLevel("");
			setYearName("");
			setLevels([]);
			setLoading(true);

			router.back();
		}
	};

	// Show loader while fetching data
	if (loading) {
		return <Loader />;
	}

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<h2 className={formStyles.h2}>Adicionar Aluno</h2>
			<Input
				id="className"
				type="text"
				value={className}
				onChange={(e) => setClassName(e.target.value)}
				placeholder="Class name..."
				required
			/>
			<ComboBox
				options={levels}
				caption="Select Level"
				selected={classLevel}
				disabled={false}
				onChange={(e) => setClassLevel(e.target.value)}
			/>
			<Input
				id="yearName"
				type="text"
				value={yearName}
				onChange={(e) => console.log(e.target.value)}
				placeholder="School year..."
				required
				disabled={true}
			/>
			<div className={formStyles["button-group"]}>
				<Button
					label="Cancel"
					customBackground="red"
					type="button"
					handleClick={handleCancel}
				/>
				<Button label="Add >>>" customBackground="green" type="submit" />
			</div>
		</form>
	);
}
