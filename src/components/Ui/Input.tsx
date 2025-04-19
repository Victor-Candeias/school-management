import styles from "./Input.module.css";

interface InputProps {
	id: string;
	type: "email" | "password" | "text";
	value: string;
	placeholder: string;
	required: boolean;
	disabled?: boolean;
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	id,
	type,
	value,
	placeholder,
	required,
	disabled,
	className,
	onChange,
}: InputProps) {
	// auto complet info
	let autoComplete = "username";

	if (type == "password") autoComplete = "current-password";

	return (
		<div className={styles["input-group"]}>
			<input
				className={className}
				id={id}
				onChange={onChange}
				type={type}
				placeholder={placeholder}
				name={id}
				value={value}
				required={required}
				disabled = {disabled ?? false}
				autoComplete={autoComplete}
			/>
		</div>
	);
}
