import styles from "./ConfirmedModal.module.css"; // Estilos para o modal

interface ModalLayoutProps {
	isOpen: boolean;
	caption: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmationModal = ({
	isOpen,
	caption,
	onConfirm,
	onCancel,
}: ModalLayoutProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h2>{caption}</h2>
				<div className={styles.buttonGroup}>
					<button className={styles.cancelButton} onClick={onCancel}>
						Não
					</button>
					<button className={styles.confirmButton} onClick={onConfirm}>
						Sim
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
