import styles from "./smallButton.module.css";

interface SmallButtonProps {
	id: string;
	caption?: string;
	customClass?: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SmallButton({
	id,
	caption,
	customClass,
	onClick,
}: SmallButtonProps) {
	return (
		<button
			className={`${styles.btn} ${customClass}`}
			onClick={onClick}
			id={id}
		>
			{caption}
		</button>
	);
}
