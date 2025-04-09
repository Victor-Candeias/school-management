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
		<>
			<p>{schoolId}</p>
			<p>{yearId}</p>
			<p>{classId}</p>
			<p>{studentsId}</p>
		</>
	);
}
