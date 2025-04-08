import styles from "./input.module.css";

interface InputProps {
	id: string;
	type: "email" | "password" | "text";
	value: string;
	placeholder: string;
	required: boolean;
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	id,
	type,
	value,
	placeholder,
	required,
	className,
	onChange,
}: InputProps) {
	// auto complet info
	let autoComplete = "username";

	if (type == "password") autoComplete = "current-password";
	/*
	Valor	Descrição
username	Nome de usuário para login.
current-password	Senha do usuário (para login).
new-password	Nova senha (para cadastro/troca de senha).
one-time-code	Código de verificação (exemplo: OTP enviado por e-mail/SMS).
*/
	return (
		<div className={styles["input-group"]}>
			<input
				className={className}
				id={id}
				onChange={onChange}
				type={type}
				placeholder={placeholder}
				name="usrnm"
				value={value}
				required={required}
				autoComplete={autoComplete}
			/>
		</div>
	);
}
