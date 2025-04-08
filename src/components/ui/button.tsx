import styles from "./button.module.css";

interface InputProps {
	type: "submit" | "reset" | "button";
	customClass?: string;
	label: string;
	customBackground?: string;
	customColor?: string;
	handleClick?: () => void;
}

export default function Button({
	type,
	label,
	customClass,
	customBackground,
	customColor,
	handleClick
}: InputProps) {
	let buttonClass = styles.btn;
	let buttonBackground = "dodgerblue";
	let buttonColor = "white";

	if (customBackground) buttonBackground = customBackground;
	if (customColor) buttonColor = customColor;

	if (customClass) buttonClass = customClass;

	return (
		<button
			type={type}
			className={buttonClass}
			onClick={handleClick}
			style={{background: buttonBackground, color: buttonColor}}
		>
			{label}
		</button>
	);
}
