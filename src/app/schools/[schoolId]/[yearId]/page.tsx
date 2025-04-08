import ProtectedRoute from "../../../../components/layout/ProtectedRoute";
import Header from "../../../../components/layout/header";
import ClassLayout from "../../../../components/layout/ClassLayout";
import styles from "../../../../styles/pages.module.css";
import { notFound } from "next/navigation";

export default async function Classes({ params }: { params: { yearId: string } }) {
	const { yearId } = await params;

    if (!yearId) return notFound();

	console.log("Classes();schyearIdoolId=", yearId);

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				{/* Parte de Cima (Navbar) */}
				<Header />

				{/* Parte de Baixo (Conteúdo) */}
				<div className={styles.content}>
					<ClassLayout yearId={yearId} />
				</div>
			</div>
		</ProtectedRoute>
	);
}
