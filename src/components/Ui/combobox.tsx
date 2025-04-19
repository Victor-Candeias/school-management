"use client";

import styles from "./combobox.module.css";

interface ComboBoxProps {
	options: { id: string; name: string }[];
	caption: string;
	selected: string;
	customClass?: string;
	disabled: boolean;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ComboBox({
	options,
	caption,
	selected,
	customClass,
	disabled,
	onChange,
}: ComboBoxProps) {
	let comboClass = styles.combobox;

	if (customClass) comboClass = customClass;

	return (
		<select
			className={comboClass}
			onChange={onChange}
			value={selected}
			disabled={disabled}
		>
			<option className={comboClass} value="" disabled>
				{caption}
			</option>
			{options.map((school, index) => (
				<option className={comboClass} key={index} value={school.id}>
					{school.name}
				</option>
			))}
		</select>
	);
}
