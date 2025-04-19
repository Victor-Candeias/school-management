"use client";

import { getAllClasses } from "@/api/apiClient";
import Card from "@/components/Ui/Card";
import { useAuth } from "@/context/AuthContext";
import { ClassInterface } from "@/interfaces/Interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Ui/Loader";

interface ClassesLayoutProps {
	userId: string;
	schoolId: string;
	yearId: string;
}

export default function ClassesLayout({
	userId,
	schoolId,
	yearId,
}: ClassesLayoutProps) {
	const [classes, setClasses] = useState<ClassInterface[]>([]); // State to store the list of classes
	const [loading, setLoading] = useState(true); // State to track loading state
	const { setCurrentClass, refreshFlag } = useAuth(); // Get the user context (userId)
	const router = useRouter(); // Initialize the router for navigation

	// Fetch classes when the component mounts
	useEffect(() => {
		const fetchClasses = async () => {
			const result = await getAllClasses(schoolId, yearId, userId); // Fetch classes based on userId, schoolId, and yearId
			setClasses(result); // Store the fetched classes in state
			setLoading(false);
		};

		fetchClasses(); // Call the fetch function
	}, [userId, schoolId, yearId, refreshFlag]); // Empty dependency array ensures the effect runs only once on mount

	// Navigation to enter a selected class
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		const target = event.target as HTMLDivElement;

		// find year info
		const foundClass = classes.find((cls) => cls.classId === target.id);

		// set context
		setCurrentClass({
			id: target.id,
			name: foundClass?.className ?? "",
			level: foundClass?.classLevel ?? ""
		});

		router.push(`/${userId}/${schoolId}/${yearId}/${target.id}`); // Navigate to the school's specific page using its ID
	};

	// Show a loading message while the schools are being fetched
	if (loading) {
		return <Loader />;
	}

	return (
		<>
			{classes &&
				classes.map((classItem) => (
					<Card
						key={classItem.classId}
						id={classItem.classId}
						backColor="fuchsia"
						header={classItem.className}
						text={"Students: " + "classItem.Alunos"} // It looks like there is an issue here. It should be classItem.students or similar
						onClick={EnterData}
					/>
				))}
		</>
	);
}
