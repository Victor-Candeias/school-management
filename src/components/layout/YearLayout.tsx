"use client"; // ⚠️ IMPORTANT: This directive is used to indicate that this component uses client-side hooks and will be rendered on the client side.

import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import { YearsInterface } from "@/types/Interfaces"; // Import the interface for years data

import Card from "@/components/ui/card"; // Import the Card component to display individual year information
import SmallButton from "@/components/ui/smallButton"; // Import the SmallButton component for smaller buttons
import styles from "./Common.module.css"; // Import the CSS module for styling
import { useEffect, useState } from "react"; // Importing React hooks for state management and side effects
import { getYearBySchoolId } from "@/utils/years"; // Importing the utility function to fetch years by schoolId
import { useAuth } from "@/context/AuthContext"; // Importing the context to access authenticated user information
import Loader from "@/components/ui/loader"; // Importing the Loader component to show a loading spinner

/**
 * YearLayout component: Displays a list of years for a specific school.
 *
 * This component is responsible for fetching and displaying the list of years available for a specific school.
 * It allows the user to:
 * - Navigate back to the schools page
 * - Add a new year to the school
 * - Navigate to the year details page by clicking on a specific year.
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} props.schoolId - The ID of the school whose years are being displayed.
 */
interface YearsLayoutProps {
	schoolId: string;
}

export default function YearLayout({ schoolId }: YearsLayoutProps) {
	const [years, setYears] = useState<YearsInterface[]>([]); // State to store the list of years for the selected school
	const [loading, setLoading] = useState(true); // State to track if data is still being loaded
	const { contextUser } = useAuth(); // Access the user context (userId) to pass it in the API request
	const router = useRouter(); // Router to navigate between pages

	// Fetch the list of years when the component mounts
	useEffect(() => {
		const fetchSchools = async () => {
			const result = await getYearBySchoolId(
				contextUser?.userId ?? "", // Use the userId from the context, fallback to an empty string if undefined
				schoolId // Pass the currentSchoolId to the API function
			);
			setYears(result); // Set the fetched years into the state
			setLoading(false); // Set loading state to false once the data has been fetched
		};

		fetchSchools(); // Call the function to fetch data
	}, []); // Empty dependency array ensures the effect runs only once on mount

	console.log(years);

	// Navigate back to the schools page
	const Return = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools`); // Navigate to the schools page
	};

	// Navigate to the page for adding a new year
	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push(`/schools/${schoolId}/new`); // Navigate to the add new year page
	};

	// Navigate to the page for the selected year
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		console.log(target.id); // Log the selected year's ID
		router.push(`/schools/${schoolId}/${target.id}`); // Navigate to the selected year's details page
	};

	// Show a loading spinner while the data is being fetched
	if (loading) {
		return <Loader />; // Display the loader until data is available
	}

	return (
		<div className={styles.rightside}>
			<div>
				{/* Button to navigate back to the schools page */}
				<SmallButton
					key={0}
					id="returnSchool"
					caption="&laquo; Voltar" // Button text: "Back"
					customClass={styles.blue_button} // Apply blue button style
					onClick={Return} // Call the return function on click
				/>
				{/* Button to navigate to the page for adding a new year */}
				<SmallButton
					key={1}
					id="addYear"
					caption="Adicionar Ano" // Button text: "Add Year"
					customClass={styles.green_button} // Apply green button style
					onClick={AddData} // Call the add data function on click
				/>
			</div>
			{/* Display a list of years fetched from the API */}
			{years &&
				years.map((item) => (
					<Card
						key={item.yearId}
						id={item.yearId} // Pass the year ID to the card component
						header={item.name} // Display the year name in the header
						customClass={styles.card_year} // Apply custom styling to the card
						onClick={EnterData} // Navigate to the selected year details page on click
					/>
				))}
		</div>
	);
}
