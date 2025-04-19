import Layout from "@/components/Layouts/Layout";
import YearsLayout from "@/components/Layouts/PagesLayouts/YearsLayout";
import { Metadata } from "next";

type Params = Promise<{
	userid: string;
	schoolid: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Página dos Anos Lectivos",
	};
}

export default async function Schools(props: { params: Params }) {
    const params = await props.params;

    return (
        <Layout>
            <YearsLayout userId={params.userid} schoolId={params.schoolid} />
        </Layout>
    );
}
