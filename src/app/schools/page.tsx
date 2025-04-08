import SchoolLayout from "@/components/layout/SchoolLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Header from "@/components/layout/header";
import styles from "@/styles/pages.module.css";

export default async function Schools() {
	return (
		<ProtectedRoute>
			<div className={styles.container}>
				{/* Parte de Cima (Navbar) */}
				<Header />

				{/* Parte de Baixo (Conteúdo) */}
				<div className={styles.content}>
					<SchoolLayout />
				</div>
			</div>
		</ProtectedRoute>
	);
}
