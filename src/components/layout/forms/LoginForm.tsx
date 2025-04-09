// Mark the component as a client-side component, allowing usage of hooks and browser APIs.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import { login } from "@/utils/auth"; // Import the login utility function
import Button from "@/components/ui/button"; // Import the Button component
import Input from "@/components/ui/input"; // Import the Input component for user input
import CustomLink from "@/components/ui/customlink"; // Import the CustomLink component for navigation
import formStyles from "./forms.module.css"; // Import the CSS module for styling the form

// LoginForm component: Handles user authentication by submitting email and password
// to the login function, storing the user's login data in context, and navigating to the "schools" page on success.
export default function LoginForm() {
  // Declare state variables for the email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Initialize the router for navigation and the authentication context for login management
  const router = useRouter();
  const { setLogin } = useAuth(); // Get the function to store login data in context

  // Handle form submission: Attempt login and store the user's token and data in context if successful
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Attempt to log in with provided email and password
      const data = await login({ email, password });

      // If login is unsuccessful (status >= 400), throw an error
      if (data.status >= 400) {
        throw new Error(`Login failed: ${data.message}`);
      }

      // Store login data (userId, email, role, token) in context
      setLogin({ userId: data.userId, user: email, role: data.role, token: data.token });

      // Redirect the user to the "/schools" page upon successful login
      router.push("/schools");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again." + error);
    }
  };

  return (
    <form
      className={formStyles.form}
      action="/action_page.php"
      onSubmit={handleSubmit}
    >
      <h2 className={formStyles.h2}>Login</h2>
      <Input
        id="useremail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        id="userpassword"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Button label="Log In" type="submit" />
      <CustomLink href="/register" customClass={formStyles.link}>
        Create a new account
      </CustomLink>
    </form>
  );
}
