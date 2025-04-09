"use client"; // Directive to indicate that this file is executed on the client-side

import { useRouter } from "next/navigation"; // Import the useRouter hook to navigate programmatically
import { SchoolInterface } from "@/types/Interfaces"; // Import the SchoolInterface type for type safety
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to access user data

import Card from "@/components/ui/card"; // Import the Card component to display each school
import SmallButton from "@/components/ui/smallButton"; // Import the SmallButton component for adding a new school
import Loader from "@/components/ui/loader";

import styles from "./Common.module.css"; // Import the CSS module for styling
import { useEffect, useState } from "react"; // Import useEffect and useState hooks for managing component state
import { getAllSchools } from "@/utils/schools"; // Import the function to fetch all schools

// SchoolLayout component: Displays a list of schools and allows the user to add a new school or view details of a school.
// The component fetches the schools list when it mounts and provides options to add a school or navigate to the specific school page.
export default function SchoolLayout() {
	const [schools, setSchools] = useState<SchoolInterface[]>([]); // State to store the list of schools
	const [loading, setLoading] = useState(true); // State to track loading state
	const { contextUser } = useAuth(); // Get the user context (userId)
	const router = useRouter(); // Initialize the router for navigation

	// Fetch schools when the component mounts
	useEffect(() => {
		const fetchSchools = async () => {
			const result = await getAllSchools(contextUser?.userId); // Fetch schools based on userId
			setSchools(result); // Store the fetched schools in state
			setLoading(false); // Set loading to false after fetching is complete
		};

		fetchSchools(); // Call the fetch function
	}, []); // Empty dependency array ensures the effect runs only once on mount

	// Handler to add a new school
	const AddData = (event: React.MouseEvent<HTMLButtonElement>): void => {
		router.push("/schools/new"); // Navigate to the "new school" page
	};

	// Handler to navigate to the years page of a selected school
	const EnterData = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement; // Get the clicked element
		router.push(`/schools/${target.id}`); // Navigate to the school's specific page using its ID
	};

	// Show a loading message while the schools are being fetched
	if (loading) {
		return <Loader />;
	}

	// Render the list of schools and the option to add a new school
	return (
		<div className={styles.rightside}>
			<div>
				<SmallButton
					key={0}
					id="addYear"
					caption="Adicionar Escola" // Button caption: "Add School"
					customClass={styles.green_button}
					onClick={AddData} // Trigger the AddData function on click
				/>
			</div>
			{schools && 
				schools.map((school) => (
					<Card
						key={school.id}
						id={school.code} // School code as the ID
						header={school.name} // School name as the header
						text={school.code} // School code as the main text
						subText={school.email} // School email as subtext
						data={school.contact} // School contact information
						customClass={styles.card_school}
						onClick={EnterData} // Navigate to the school's details on click
					/>
				))}
		</div>
	);
}
