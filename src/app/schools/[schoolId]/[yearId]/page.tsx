import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Header from "@/components/layout/header";
import ClassLayout from "@/components/layout/ClassLayout";
import styles from "@/styles/pages.module.css";
import { notFound } from "next/navigation";

/**
 * The `Classes` component displays a list of classes for a specific school and year.
 * 
 * It uses the `schoolId` and `yearId` parameters to fetch and display the class layout for the provided school and academic year.
 * If the schoolId or yearId is not provided, the component redirects to a "not found" page.
 * 
 * The page is protected by the `ProtectedRoute` component, ensuring that only authenticated users can access it.
 * 
 * @param {object} params - The route parameters passed to the component.
 * @param {string} params.schoolId - The ID of the school.
 * @param {string} params.yearId - The ID of the academic year.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default async function Classes({ params }: { params: { schoolId: string, yearId: string } }) {
	const { schoolId } = await params;
	const { yearId } = await params;

	// If either the schoolId or yearId is not provided, return a "not found" page
    if (!schoolId || !yearId) return notFound();

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				{/* Upper part of the page (Navbar) */}
				<Header />

				{/* Lower part of the page (Content) */}
				<div className={styles.content}>
					<ClassLayout schooldId={schoolId} yearId={yearId} />
				</div>
			</div>
		</ProtectedRoute>
	);
}
