import styles from "./FlipCard.module.css";

interface FlipCardLayoutProps {
	userId?: string;
	schoolId?: string;
	yearId?: string;
	classId?: string;
}
export default function FlipCard({
	userId,
	schoolId,
	yearId,
	classId,
}: FlipCardLayoutProps) {
	return (
		<div className={styles["flip-card"]}>
			<div className={styles["flip-card-inner"]}>
				<div className={styles["flip-card-front"]}>
					<p>{userId}</p>
					<p>{schoolId}</p>
					<p>{yearId}</p>
					<p>{classId}</p>
				</div>
				<div className={styles["flip-card-back"]}>
					<h1>John Doe</h1>
					<p>Architect & Engineer</p>
					<p>We love that guy</p>
				</div>
			</div>
		</div>
	);
}
