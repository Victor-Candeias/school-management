interface ComboBoxProps {
	caption: string;
    customStyle?: string;
}

export default function Label({ caption, customStyle }: ComboBoxProps) {
    return <label className={customStyle}>{caption}</label>
}