"use client"; // This component is client-side only as it contains state management and navigation logic

import { useState } from "react"; // Import the useState hook to manage form data
import { useRouter } from "next/navigation"; // Import the useRouter hook to handle page navigation
import { register } from "../../../utils/auth"; // Import the register function to handle user registration
import Button from "@/components/ui/button"; // Import the Button component for submitting the form
import Input from "@/components/ui/input"; // Import the Input component for form fields
import formStyles from "./forms.module.css"; // Import the CSS module for styling the form
import CustomLink from "../../ui/customlink"; // Import the CustomLink component for navigation

// RegisterForm component: A form to register new users
// It handles form submission, user registration, and error handling.
export default function RegisterForm() {
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email
  const [password, setPassword] = useState(""); // State to store the user's password
  const router = useRouter(); // Router to navigate after successful registration

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Attempt to register the user with the provided credentials
      const data = await register({ name, email, password });

      // Check if the response status is not successful
      if (data.status >= 400) {
        throw new Error(`Error registering user: ${data.message}`);
      }

      // If registration is successful, redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <form className={formStyles.form} onSubmit={handleSubmit}>
      <h2 className={formStyles.h2}>Register</h2> {/* Form header */}
      
      {/* Input for user's name */}
      <Input
        id="username"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      
      {/* Input for user's email */}
      <Input
        id="useremail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      {/* Input for user's password */}
      <Input
        id="userpassword"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      {/* Submit button */}
      <Button label="Register" type="submit" />
      
      {/* Link to navigate to the login page */}
      <CustomLink href="/login" customClass={formStyles.link}>
        Already have an account? Log in
      </CustomLink>
    </form>
  );
}
