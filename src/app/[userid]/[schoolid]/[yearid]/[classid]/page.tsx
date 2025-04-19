import Layout from "@/components/Layouts/Layout";
import StudentsLayout from "@/components/Layouts/PagesLayouts/StudentsLayout";
import type { Metadata } from "next";

type Params = Promise<{
	userid: string;
	schoolid: string;
	yearid: string;
	classid: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Páginas dos Estudasntes",
	};
}

export default async function Page(props: { params: Params }) {
	const params = await props.params;

	return (
		<Layout>
			<StudentsLayout
				userId={params.userid}
				schoolId={params.schoolid}
				yearId={params.yearid}
				classId={params.classid}
			/>
		</Layout>
	);
}
