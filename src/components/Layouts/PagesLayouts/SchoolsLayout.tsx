"use client";

import { getAllSchools } from "@/api/apiClient";
import Card from "@/components/Ui/Card";
import { useAuth } from "@/context/AuthContext";
import { SchoolInterface } from "@/interfaces/Interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Ui/Loader";

interface SchoolsLayoutProps {
	userId: string;
}

export default function SchoolsLayout({ userId }: SchoolsLayoutProps) {
	const [schools, setSchools] = useState<SchoolInterface[]>([]); // State to store the list of schools
	const { setCurrentSchool, resetCurrentClass, resetCurrentYear, refreshFlag } =
		useAuth(); // Get the user context (userId)
	const [loading, setLoading] = useState(true); // State to track loading state
	const router = useRouter(); // Initialize the router for navigation

	// Fetch schools when the component mounts
	useEffect(() => {
		const fetchSchools = async () => {
			const result = await getAllSchools(userId); // Fetch schools based on userId
			resetCurrentClass();
			resetCurrentYear();
			setSchools(result); // Store the fetched schools in state
			setLoading(false);
		};

		fetchSchools(); // Call the fetch function
	}, [userId, refreshFlag, resetCurrentClass, resetCurrentYear]); // Empty dependency array ensures the effect runs only once on mount

	// Handler to navigate to the years page of a selected school
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		const target = event.target as HTMLDivElement; // Get the clicked element

		// find school info
		const foundSchool = schools.find((school) => school.schoolId === target.id);

		// set context
		setCurrentSchool({
			id: target.id,
			name: foundSchool?.name ?? "",
		});

		router.push(`/${userId}/${target.id}`); // Navigate to the school's specific page using its ID
	};

	// Show a loading message while the schools are being fetched
	if (loading) {
		return <Loader />;
	}

	return (
		<>
			{schools &&
				schools.map((school) => (
					<Card
						key={school.schoolId}
						id={school.schoolId} // School code as the ID
						backColor="blue"
						header={school.name} // School name as the header
						text={school.code} // School code as the main text
						subText={school.email} // School email as subtext
						data={school.contact} // School contact information
						onClick={EnterData} // Navigate to the school's details on click
					/>
				))}
		</>
	);
}
