import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AddSchoolForm from "@/components/layout/forms/AddSchoolForm";
import styles from "@/styles/formpages.module.css";
// import { getUserIdFromCookies } from "@/utils/authHelpers";

export default async function AddSchool() {
	// get user id
	/*
	const userId = await getUserIdFromCookies();
	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	//userId={userId} />
	*/

	return (
		<ProtectedRoute>
			<div className={styles.main_container}>
				<AddSchoolForm /> 
			</div>
		</ProtectedRoute>
	);
}
