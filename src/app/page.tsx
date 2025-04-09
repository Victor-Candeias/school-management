"use client"; // ⚠️ IMPORTANT: This directive indicates that the file is executed on the client-side, allowing the use of React hooks in the App Router.

import ProtectedRoute from "@/components/layout/ProtectedRoute"; // Import the ProtectedRoute component to protect the route from unauthorized access
import { ToastContainer } from "react-toastify"; // Import ToastContainer to display toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications styling

// Home component: This is the landing page that is protected from unauthorized access by wrapping it with the ProtectedRoute component.
// It includes the ToastContainer component for displaying global toast notifications and can later render other components (like Schools).
export default function Home() {
	return (
		<ProtectedRoute> {/* Wraps the page content in ProtectedRoute to enforce authentication */}
			<ToastContainer /> {/* Displays toast notifications */}
			{/* <Schools /> */} {/* A placeholder for rendering the Schools component or other components */}
		</ProtectedRoute>
	);
}
