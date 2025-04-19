import Layout from "@/components/Layouts/Layout";
import SchoolsLayout from "@/components/Layouts/PagesLayouts/SchoolsLayout";
import { Metadata } from "next";

type Params = Promise<{
	userid: string;
	schoolid: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Página das Escolas",
	};
}

export default async function Users(props: { params: Params }) {
    const params = await props.params;

	return (
		<Layout>
			<SchoolsLayout userId={params.userid} />
		</Layout>
	);
}
