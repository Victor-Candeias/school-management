import Header from "@/components/layout/header";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import StudentsLayout from "@/components/layout/StudentsLayout";
import SideBar from "@/components/ui/sideBar";
import styles from "@/styles/students.module.css";

export default function Student({
	params,
}: {
	params: {
		schoolId: string;
		yearId: string;
		classId: string;
		studentsId: string;
	};
}) {
	const { schoolId, yearId, classId, studentsId } = params;

	return (
		<ProtectedRoute>
			<div className={styles.container}>
				<Header schoolId={schoolId} yearId={yearId} classId={classId} studentsId={studentsId} />
				<div className={styles.main}>
					{/* Sidebar */}
					<div className={styles.sidebar}>
						{/* Coloca aqui o conteúdo da barra lateral */}
						<SideBar />
					</div>

					{/* Conteúdo principal */}
					<div className={styles.content}>
						<StudentsLayout
							schoolId={schoolId}
							yearId={yearId}
							classId={classId}
						/>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
