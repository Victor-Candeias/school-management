"use client"; // directive.

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import the context

import Card from "@/components/ui/card";
import SmallButton from "@/components/ui/smallButton";
import styles from "./Common.module.css";
import { useEffect, useState } from "react";
import { ClassInterface } from "@/types/Interfaces";
import { getAllClasses } from "@/utils/classes";
import Loader from "@/components/ui/loader";

/**
 * `ClassLayout` is responsible for displaying the list of classes for a specific school and academic year.
 * 
 * It fetches the list of classes for a given `schoolId` and `yearId`, and allows users to add new classes, navigate back to the previous page, and enter a selected class.
 * The component is protected by the user authentication context to ensure the logged-in user's data is fetched.
 * 
 * @param {string} schooldId - The ID of the school.
 * @param {string} yearId - The ID of the academic year.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function ClassLayout({
	schooldId,
	yearId,
}: {
	schooldId: string;
	yearId: string;
}) {
	const currentSchoolId = schooldId;
	const currentYearId = yearId;

	console.log(currentSchoolId);
	console.log(currentYearId);

	const [classes, setclasses] = useState<ClassInterface[]>([]); // State to store the list of classes
	const [loading, setLoading] = useState(true); // State to track loading state
	const { contextUser } = useAuth(); // Get the user context (userId)
	const router = useRouter(); // Initialize the router for navigation

	// Fetch classes when the component mounts
	useEffect(() => {
		const fetchClasses = async () => {
			const result = await getAllClasses(
				schooldId,
				yearId,
				contextUser?.userId
			); // Fetch classes based on userId, schoolId, and yearId
			setclasses(result); // Store the fetched classes in state
			setLoading(false); // Set loading to false after fetching is complete
		};

		fetchClasses(); // Call the fetch function
	}, []); // Empty dependency array ensures the effect runs only once on mount

	// Navigation to return to the school page
	const Return = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools/${currentSchoolId}`);
	};

	// Navigation to add a new class
	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools/${currentSchoolId}/${currentYearId}/new`);
	};

	// Navigation to enter a selected class
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		console.log(target.id);
		router.push(`/schools/${currentSchoolId}/${currentYearId}/${target.id}`);
	};

	// Show a loading message while the classes are being fetched
	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.rightside}>
			<div>
				<SmallButton
					key={9999999}
					id="returnYear"
					caption="&laquo; Back"
					customClass={styles.blue_button}
					onClick={Return}
				/>
				<SmallButton
					key={9999991}
					id="addClass"
					caption="Add Class"
					customClass={styles.green_button}
					onClick={AddData}
				/>
			</div>
			{classes &&
				classes.map((classItem, index) => (
					<Card
						key={classItem.id}
						id={index.toString()}
						header={classItem.name}
						text={"Students: " + "classItem.Alunos"} // It looks like there is an issue here. It should be classItem.students or similar
						customClass={styles.card_classes}
						onClick={EnterData}
					/>
				))}
		</div>
	);
}
