import ProtectedRoute from "../../../../../components/layout/ProtectedRoute";
import Header from "../../../../../components/layout/header";
import ClassLayout from "../../../../../components/layout/ClassLayout";
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
					<ClassLayout schoolId={schoolId} yearId={yearId} />
				</div>
			</div>
		</ProtectedRoute>
	);
}
