"use client"; // ✅ Mark as a Client Component

import React from "react";
import styles from "./card.module.css";

interface InputProps {
	id: string;
	header?: string;
	text?: string;
	subText?: string;
	data?: string; // Use a more specific type if possible
	customClass?: string;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Card({ id, header, text, subText, data, customClass, onClick }: InputProps) {
	return (
		<div className={styles.column}>
			<div
				key={id}
				id={id}
				className={`${styles.card} ${customClass}`}
				onClick={(e) => onClick(e)}
			>
				<h3>{header}</h3>
				<p>{text}</p>
				{subText && <p>{subText}</p>}
				{data && <p>{data}</p>}
			</div>
		</div>
	);
}
