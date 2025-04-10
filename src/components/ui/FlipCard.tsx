import styles from "./flipcard.module.css";

export default function FlipCard() {
	return (
		<div className={styles["flip-card"]}>
			<div className={styles["flip-card-inner"]}>
				<div className={styles["flip-card-front"]}>
					<p>Olá</p>
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
