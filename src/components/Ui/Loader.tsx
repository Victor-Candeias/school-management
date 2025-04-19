import styles from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
			<div className={styles.loader}></div>
			</div>
		</div>
	);
};

export default Loader;