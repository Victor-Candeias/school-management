// Import the LoginForm component to handle user authentication.
import LoginForm from "@/components/layout/forms/LoginForm";

// Import the CSS module for styling the login page.
import styles from "./login.module.css";

// LoginPage component: Renders the login form inside a styled container.
// This page is responsible for the user authentication process.
export default function LoginPage() {
  return (
    <div className={styles.main_container}>
      {/* Render the LoginForm component for the user to log in */}
      <LoginForm />
    </div>
  );
}
