"use client";

import FlipCard from "@/components/Ui/FlipCard";

interface StudentsLayoutProps {
	userId: string;
	schoolId: string;
    yearId: string;
    classId: string;
}

export default function YearsLayout({ userId, schoolId, yearId, classId }: StudentsLayoutProps) {
	console.log("ENTER students");
	return (
		<>
			<FlipCard userId={userId} />
			<FlipCard schoolId={schoolId} />
			<FlipCard yearId={yearId} />
			<FlipCard classId={classId} />
			<FlipCard userId={userId} />
			<FlipCard schoolId={schoolId} />
			<FlipCard yearId={yearId} />
			<FlipCard classId={classId} />
		</>
	);
}
