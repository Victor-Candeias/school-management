import styles from "./Button.module.css";

interface InputProps {
	type: "submit" | "reset" | "button";
	customClass?: string;
	label: string;
	handleClick?: (event: React.FormEvent) => Promise<void>;
}

export default function Button({
	type,
	label,
	customClass,
	handleClick
}: InputProps) {
	return (
		<button
			type={type}
			className={`${styles.btn} ${customClass}`}
			onClick={handleClick}
		>
			{label}
		</button>
	);
}
