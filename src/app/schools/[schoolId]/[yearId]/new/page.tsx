import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AddClassForm from "@/components/layout/forms/AddClassForm";
import styles from "@/styles/formpages.module.css";
import { notFound } from "next/navigation";

export default async function AddYear({ params }: { params: { schoolId: string, yearId: string } }) {
    const { schoolId, yearId } = await params;

    if (!schoolId) return notFound();
	
	return (
		<ProtectedRoute>
			<div className={styles.main_container}>
				<AddClassForm schoolId={schoolId} yearId={yearId} />
			</div>
		</ProtectedRoute>
	);
}