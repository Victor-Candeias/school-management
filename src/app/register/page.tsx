// RegisterPage component: A page that contains the form for user registration
// It renders the RegisterForm component to allow the user to sign up for an account.
import RegisterForm from "@/components/layout/forms/RegisterForm"; // Import the RegisterForm component
import styles from "./register.module.css"; // Import the CSS module for styling the page

export default function RegisterPage() {
  return (
    <div className={styles.main_container}>
      {/* Render the RegisterForm component */}
      <RegisterForm />
    </div>
  );
}
