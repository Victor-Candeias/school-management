import ProtectedRoute from "@/components/layout/ProtectedRoute"; // Import the ProtectedRoute component to protect the route from unauthorized access
import Header from "@/components/layout/header"; // Import the Header component for the navigation bar
import styles from "@/styles/pages.module.css"; // Import the CSS file for styling the page layout
import YearLayout from "@/components/layout/YearLayout"; // Import the YearLayout component to display the details of the selected year
import { notFound } from "next/navigation"; // Import the notFound function to handle cases when the schoolId is not found

/**
 * Year component: Displays information about a specific school year.
 * 
 * This page is protected by the `ProtectedRoute` component, meaning only authenticated users can access it.
 * It includes a `Header` for navigation and a `YearLayout` component that renders the content related to the selected school year.
 * If the `schoolId` is not provided or invalid, the page will display a "not found" error.
 * 
 * @param {object} params - The URL parameters passed to the page.
 * @param {string} params.schoolId - The ID of the school selected by the user.
 */
export default async function Year({
	params,
}: {
	params: { schoolId: string };
}) {
	const { schoolId } = await params; // Extract the schoolId parameter from the URL

	// If schoolId is not provided or invalid, return a "not found" response
	if (!schoolId) return notFound();

	return (
		<ProtectedRoute> {/* Protects the page so only authenticated users can access it */}
			<div className={styles.container}>
				{/* Top section (Navbar) */}
				<Header />

				{/* Bottom section (Content) */}
				<div className={styles.content}>
					<YearLayout schoolId={schoolId} /> {/* Renders the YearLayout component, passing the schoolId */}
				</div>
			</div>
		</ProtectedRoute>
	);
}
