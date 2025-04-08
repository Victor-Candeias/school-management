// lista de anos da escolaimport SchoolLayout from "../../components/layout/SchoolLayout";
import ProtectedRoute from "../../../components/layout/ProtectedRoute";
import Header from "../../../components/layout/header";
import styles from "../../../styles/pages.module.css"
import YearLayout from "../../../components/layout/YearLayout";
import { getYearBySchoolId } from "../../../utils/years";

export default async function Year({ params }: { params: { schoolId: string } }) {
    const { schoolId } = await params;

    if (!schoolId) return notFound();
    
    const yearList = await getYearBySchoolId(schoolId);

    console.log(yearList);

    return (
        <ProtectedRoute>
            <div className={styles.container}>
                {/* Parte de Cima (Navbar) */}
                <Header />

                {/* Parte de Baixo (Conteúdo) */}
                <div className={styles.content}>
                    <YearLayout schoolId={schoolId} years={yearList} />
                </div>
            </div>
        </ProtectedRoute>
    );
}

function notFound() {
    throw new Error("Function not implemented.");
}

