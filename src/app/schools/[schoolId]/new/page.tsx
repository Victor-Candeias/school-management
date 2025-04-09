import ProtectedRoute from "@/components/layout/ProtectedRoute"; // Importing ProtectedRoute to ensure only authenticated users can access this page
import AddSchoolYear from "@/components/layout/forms/AddSchoolYear"; // Import the form component for adding a new school year
import styles from "@/styles/formpages.module.css"; // Import the CSS module for styling the page
import { notFound } from "next/navigation"; // Import the notFound function to show a 404 page if necessary

/**
 * AddYear component: Handles the page for adding a new year to a specific school.
 * 
 * This component is responsible for rendering a form to add a new school year to a specific school. 
 * It ensures that only authenticated users can access the page through the ProtectedRoute component.
 * If the schoolId is not found in the URL parameters, it redirects to a 404 page.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {object} props.params - The dynamic parameters from the route.
 * @param {string} props.params.schoolId - The ID of the school where the new year is being added.
 */
export default async function AddYear({ params }: { params: { schoolId: string } }) {
    const { schoolId } = await params; // Extract schoolId from the params

    if (!schoolId) return notFound(); // If schoolId is not present, redirect to a 404 page

    return (
        <ProtectedRoute>
            {/* Main container for the Add School Year page */}
            <div className={styles.main_container}>
                <AddSchoolYear schoolId={schoolId} /> {/* Render the AddSchoolYear form component with the schoolId */}
            </div>
        </ProtectedRoute>
    );
}
