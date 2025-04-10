import ProtectedRoute from "../../../../../components/layout/ProtectedRoute";
import Header from "../../../../../components/layout/header";
import StudentsLayout from "@/components/layout/StudentsLayout";
import styles from "../../../../../styles/pages.module.css";
import { notFound } from "next/navigation";

export default async function Studdents({ params }: { params: { schoolId: string, yearId: string, classId: string } }) {
	const { schoolId, yearId, classId } = params;

    if (!schoolId || !yearId || !classId) return notFound();

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				{/* Parte de Cima (Navbar) */}
				<Header />

				{/* Parte de Baixo (Conteúdo) */}
				<div className={styles.content}>
					<StudentsLayout schoolId={schoolId} yearId={yearId} classId={classId} />
				</div>
			</div>
		</ProtectedRoute>
	);
}
