"use client";

import { useAuth } from "@/context/AuthContext";
import { YearsInterface } from "@/interfaces/Interfaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getYearBySchoolId } from "@/api/apiClient";
import Card from "@/components/Ui/Card";
import Loader from "@/components/Ui/Loader";

interface YearsLayoutProps {
	userId: string;
	schoolId: string;
}

export default function YearsLayout({ userId, schoolId }: YearsLayoutProps) {
	const [years, setYears] = useState<YearsInterface[]>([]); // State to store the list of years for the selected school
	const [loading, setLoading] = useState(true); // State to track loading state
	const { setCurrentYear, resetCurrentClass, refreshFlag } =
		useAuth(); // Access the user context (userId) to pass it in the API request
	const router = useRouter(); // Router to navigate between pages

	// Fetch the list of years when the component mounts
	useEffect(() => {
		const fetchSchools = async () => {
			const result = await getYearBySchoolId(
				userId, // Use the userId from the context, fallback to an empty string if undefined
				schoolId // Pass the currentSchoolId to the API function
			);
			resetCurrentClass();
			setYears(result); // Set the fetched years into the state
			setLoading(false)
		};

		fetchSchools(); // Call the function to fetch data
	}, [userId, schoolId, resetCurrentClass, refreshFlag]); // Empty dependency array ensures the effect runs only once on mount

	// Navigate to the page for the selected year
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		const target = event.target as HTMLDivElement;
		// find year info
		const foundYear = years.find((year) => year.yearId === target.id);

		// set context
		setCurrentYear({
			id: target.id,
			name: foundYear?.name ?? "",
		});

		router.push(`/${userId}/${schoolId}/${target.id}`); // Navigate to the school's specific page using its ID
	};

	// Show a loading message while the schools are being fetched
	if (loading) {
		return <Loader />;
	}

	return (
		<>
			{/* Display a list of years fetched from the API */}
			{years &&
				years.map((item) => (
					<Card
						key={item.yearId}
						id={item.yearId} // Pass the year ID to the card component
						backColor="green"
						header={item.name} // Display the year name in the header
						onClick={EnterData} // Navigate to the selected year details page on click
					/>
				))}
		</>
	);
}
