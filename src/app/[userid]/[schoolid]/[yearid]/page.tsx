import Layout from "@/components/Layouts/Layout";
import ClassesLayout from "@/components/Layouts/PagesLayouts/ClassesLayout";
import { Metadata } from "next";

type Params = Promise<{
	userid: string;
	schoolid: string;
	yearid: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Página das Turmas",
	};
}

export default async function Years(props: { params: Params }) {
	const params = await props.params;

	return (
		<Layout>
			<ClassesLayout
				userId={params.userid}
				schoolId={params.schoolid}
				yearId={params.yearid}
			/>
		</Layout>
	);
}
