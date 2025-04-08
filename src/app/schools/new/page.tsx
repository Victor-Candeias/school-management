import ProtectedRoute from "../../../components/layout/ProtectedRoute";
import AddSchoolForm from "@/components/layout/forms/AddSchoolForm";
import styles from "../../../styles/formpages.module.css";

export default function AddSchool() {
	return (
		<ProtectedRoute>
			<div className={styles.main_container}>
				<AddSchoolForm />
			</div>
		</ProtectedRoute>
	);
}
