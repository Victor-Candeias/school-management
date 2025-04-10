"use client"; // Ensures that this component runs on the client-side.

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook to handle navigation
import formStyles from "./forms.module.css"; // Import custom CSS styles for the form
import ComboBox from "@/components/ui/combobox"; // Custom ComboBox component
import Button from "@/components/ui/button"; // Custom Button component
import { YearsInterface } from "@/types/Interfaces"; // Import interface for years
import { createYear } from "@/utils/years"; // Function to create a new school year
import { useAuth } from "@/context/AuthContext"; // Authentication context to access user data
import { GenerateGuidId } from "@/utils/utils";
/**
 * AddSchoolForm component: A form to add a new school year for a specific school.
 *
 * This form allows the user to select a year and submit it to create a new school year for the given school.
 * It handles the creation of the school year by calling the `createYear` function and redirects the user back to the school details page once the process is complete.
 * The user must be authenticated, and their `userId` is used when creating the year.
 *
 * @param {string} schoolId - The ID of the school to which the year is being added.
 *
 * @returns {JSX.Element} The rendered form for adding a school year.
 */
export default function AddYearForm({ schoolId }: { schoolId: string }) {
	// Check if has values
	if (!schoolId) throw new Error("Erro: schoolId é obrigatório");

	const returnPath = `/schools/${schoolId}`; // The path to return to after submitting or canceling

	const { contextUser } = useAuth(); // Get the user context to retrieve the user's ID
	const [yearName, setYearName] = useState(""); // State to store the selected year name

	const router = useRouter(); // Router hook for navigation

	// Create a list of years from the current year to 5 years back
	const currentYear = new Date().getFullYear();
	const years: { id: string; name: string }[] = [];

	for (let ano = currentYear + 1; ano >= currentYear - 5; ano--) {
		years.push({ id: ano.toString(), name: `${ano - 1}/${ano}` });
	}

	/**
	 * Handle the form submission to create a new school year.
	 *
	 * @param {React.FormEvent} event - The form submit event.
	 */
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// Prepare the data for the new school year
		const data: YearsInterface = {
			userId: contextUser?.userId ?? "", // Get the userId from context
			yearId: GenerateGuidId(),
			schoolId: schoolId,
			name: yearName,
		};

		try {
			console.log(data);

			// Call the createYear function to add the new year
			const response = await createYear(data);

			// If the response indicates an error, throw an exception
			if (response.status >= 400) {
				throw new Error(`Error adding school year: ${response.message}`);
			}

			// Navigate back to the school details page
			router.push(returnPath);
		} catch (error) {
			// Log the error and show an alert to the user
			console.error("Error adding school year:", error);
			alert("Error adding school year. Please try again.");
		}
	};

	/**
	 * Handle the cancel action, prompting the user for confirmation before clearing the form and navigating back.
	 */
	const handleCancel = async (event: React.FormEvent) => {
		event.preventDefault();
		if (confirm("Are you sure you want to cancel?")) {
			setYearName(""); // Clear the year name

			// Navigate back to the school details page
			router.back();
			// router.push(returnPath);
		}
	};

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<h2 className={formStyles.h2}>Adicionar novo Ano escolar</h2>
			<ComboBox
				options={years} // Pass the list of available years to the ComboBox
				caption="Select Year"
				selected={yearName}
				disabled={false}
				onChange={
					(e) => setYearName(e.target.options[e.target.selectedIndex].text) // Set the selected year name
				}
			/>

			<div className={formStyles["button-group"]}>
				<Button
					label="Cancel"
					customBackground="red"
					type="button"
					handleClick={handleCancel} // Handle cancel action
				/>
				<Button label="Add >>>" customBackground="green" type="submit" />{" "}
				{/* Submit the form */}
			</div>
		</form>
	);
}
