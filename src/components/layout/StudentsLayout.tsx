"use client"; // directive.

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import the context

import Card from "@/components/ui/card";
import FlipCard from "@/components/ui/FlipCard";
import SmallButton from "@/components/ui/smallButton";
import styles from "./Common.module.css";
import { useEffect, useState } from "react";
import { StudentInterface } from "@/types/Interfaces";
import { getAllStudents } from "@/utils/students";
import Loader from "@/components/ui/loader";

/**
 * `ClassLayout` is responsible for displaying the list of classes for a specific school and academic year.
 * 
 * It fetches the list of classes for a given `schoolId` and `yearId`, and allows users to add new classes, navigate back to the previous page, and enter a selected class.
 * The component is protected by the user authentication context to ensure the logged-in user's data is fetched.
 * 
 * @param {string} schoolId - The ID of the school.
 * @param {string} yearId - The ID of the academic year.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function StudentsLayout({
	schoolId,
	yearId,
	classId
}: {
	schoolId: string;
	yearId: string;
	classId: string;
}) {
	console.log(schoolId);
	console.log(yearId);
	console.log(classId);

	const [students, setStudents] = useState<StudentInterface[]>([]); // State to store the list of classes
	const [loading, setLoading] = useState(true); // State to track loading state
	const { contextUser } = useAuth(); // Get the user context (userId)
	const router = useRouter(); // Initialize the router for navigation

	// Fetch classes when the component mounts
	useEffect(() => {
		const fetchStudents = async () => {
			const result = await getAllStudents(
				schoolId,
				yearId,
				classId,
				contextUser?.userId
			); // Fetch classes based on userId, schoolId, and yearId
			setStudents(result); // Store the fetched classes in state
			setLoading(false); // Set loading to false after fetching is complete
		};

		fetchStudents(); // Call the fetch function
	}, []); // Empty dependency array ensures the effect runs only once on mount

	// Navigation to return to the school page
	const Return = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		router.back(); // .push(`/schools/${schoolId}`);
	};

	// Navigation to add a new class
	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		console.log("ClassLayout() - Call new");
		router.push(`/schools/${schoolId}/${yearId}/${classId}/new`);
	};

	// Navigation to enter a selected class
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		const target = event.target as HTMLDivElement;
		console.log(target.id);
		router.push(`/schools/${schoolId}/${yearId}/${classId}/${target.id}`);
	};

	// Show a loading message while the classes are being fetched
	if (loading) {
		return <Loader />;
	}
	/*
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
					caption="Add Student"
					customClass={styles.green_button}
					onClick={AddData}
				/>
			</div>
	*/

	return (
		<div className={styles.layout}>
			<FlipCard />
			{/*students &&
				students.map((studentItem, index) => (
					<Card
						key={studentItem.id}
						id={index.toString()}
						header={studentItem.className}
						text={"Students: " + "classItem.Alunos"} 
						customClass={styles.card_classes}
						onClick={EnterData}
					/>
				))*/}
		</div>
	);
}
