import RegisterForm from "@/components/layout/forms/RegisterForm";
import styles from "./register.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.main_container}>
      <RegisterForm />
    </div>
  );
}
