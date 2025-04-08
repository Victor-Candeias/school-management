"use client"; // ⚠️ IMPORTANTE para usar hooks no App Router

import ProtectedRoute from "../components/layout/ProtectedRoute";
import Schools from "./schools/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
	return (
		<ProtectedRoute>
			<ToastContainer />
			<Schools />
		</ProtectedRoute>
	);
}
