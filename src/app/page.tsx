import ProtectedRoute from "@/components/ProtectedRoute";

type Params = Promise<{
	children: React.ReactNode;
}>;

export default async function Home(props: { params: Params }) {
	const params = await props.params;

	return <ProtectedRoute>{params.children}</ProtectedRoute>;
}
