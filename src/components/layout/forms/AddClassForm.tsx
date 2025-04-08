"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ClassInterface } from "@/types/Interfaces";
import { createSchool } from "@/utils/schools";
import { useAuth } from "@/context/AuthContext"; // Importa o contexto

import { toast } from 'react-toastify';

import formStyles from "./forms.module.css";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function AddSchoolForm() {
	const { contextUser } = useAuth();
	// Initialize all state hooks for form inputs
	const [schoolCode, setSchoolCode] = useState("");
	const [schoolName, setSchoolName] = useState("");
	const [schoolAddress, setSchoolAddress] = useState("");
	const [schoolEmail, setSchoolEmail] = useState("");
	const [schoolContact, setSchoolContact] = useState("");

	// Set up Next.js router
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent) => {
		// Prevent full page reload on form submission
		event.preventDefault();

		// Basic validation
		if (!schoolCode || !schoolName || !schoolEmail) {
			toast.warning("Please fill in all required fields.");
			return;
		}

		// Validate email format (optional)
		if (!/\S+@\S+\.\S+/.test(schoolEmail)) {
			toast.warning("Please fill in all required fields.");
			return;
		}

		// Construct school data object based on input values
		/*
		const data: ClassInterface = {
			userId: contextUser?.userId,
			schoolId: sc
			code: schoolCode,
			name: schoolName,
			address: schoolAddress,
			email: schoolEmail,
			contact: schoolContact,
		};
		*/
		try {
			// Attempt to save the school data via API
			/*
			const response = await createSchool(data);

			console.log("AddSchoolForm(): response:", response);

			// Handle possible API error response
			if (response.status >= 400) {
				throw new Error(`Failed to create school: ${data.message}`);
			}
			*/
			
			toast.success("School added successfully!");

			// Redirect user back to the schools list
			router.push("/schools");
		} catch (error) {
			// Log and alert the user if an error occurs
			console.error("Error adding school:", error);
			toast.error("Error adding school. Please try again.");
		}
	};

	const handleCancel = () => {
		// Ask for user confirmation before cancelling
		if (confirm("Are you sure you want to cancel?")) {
			// Reset all form fields
			setSchoolCode("");
			setSchoolName("");
			setSchoolAddress("");
			setSchoolEmail("");
			setSchoolContact("");

			// Navigate back to the schools list
			router.push("/schools");
		}
	};

	return (
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<h2 className={formStyles.h2}>Adicionar nova Escola</h2>
			<Input
				id="schoolcode"
				type="text"
				value={schoolCode}
				onChange={(e) => setSchoolCode(e.target.value)}
				placeholder="Código da escola..."
				required
			/>
			<Input
				id="schoolnamed"
				type="text"
				value={schoolName}
				onChange={(e) => setSchoolName(e.target.value)}
				placeholder="Nome da Escola..."
				required
			/>
			<Input
				id="schooladdress"
				type="text"
				value={schoolAddress}
				onChange={(e) => setSchoolAddress(e.target.value)}
				placeholder="Morada da escola..."
				required
			/>
			<Input
				id="schoolemail"
				type="email"
				value={schoolEmail}
				onChange={(e) => setSchoolEmail(e.target.value)}
				placeholder="Email da Escola"
				required
			/>
			<Input
				id="schoolcontact"
				type="text"
				value={schoolContact}
				onChange={(e) => setSchoolContact(e.target.value)}
				placeholder="Contacto da Escola"
				required
			/>
			<div className={formStyles["button-group"]}>
				<Button
					label="Cancelar"
					customBackground="red"
					type="button"
					handleClick={handleCancel}
				/>
				<Button label="Adicionar >>>" customBackground="green" type="submit" />
			</div>
		</form>
	);
}
