import SchoolLayout from "@/components/layout/SchoolLayout"; // Import the SchoolLayout component to display the main content of the schools page
import ProtectedRoute from "@/components/layout/ProtectedRoute"; // Import the ProtectedRoute component to restrict access to authorized users only
import Header from "@/components/layout/header"; // Import the Header component for the top navigation bar
import styles from "@/styles/pages.module.css"; // Import the CSS module for page styling

// Schools component: A page that displays the list of schools and provides navigation features.
// This page is protected by the ProtectedRoute component, which ensures only authorized users can access it.
export default async function Schools() {
  return (
    <ProtectedRoute> {/* Protect this route, ensuring only authenticated users can access it */}
      <div className={styles.container}>
        {/* Top section - Navbar */}
        <Header />

        {/* Bottom section - Content area */}
        <div className={styles.content}>
          <SchoolLayout /> {/* Displays the main content related to schools */}
        </div>
      </div>
    </ProtectedRoute>
  );
}
