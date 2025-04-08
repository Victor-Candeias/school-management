import LoginForm from "@/components/layout/forms/LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.main_container}>
      <LoginForm />
    </div>
  );
}
