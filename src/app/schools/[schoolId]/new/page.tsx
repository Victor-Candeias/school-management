import ProtectedRoute from "../../../../components/layout/ProtectedRoute";
import AddSchoolYear from "@/components/layout/forms/AddSchoolYear";
import styles from "../../../../styles/formpages.module.css";
import { notFound } from "next/navigation";

export default async function AddYear({ params }: { params: { schoolId: string } }) {
    const { schoolId } = await params;

    if (!schoolId) return notFound();
	
	return (
		<ProtectedRoute>
			<div className={styles.main_container}>
				<AddSchoolYear schoolId={schoolId} />
			</div>
		</ProtectedRoute>
	);
}
