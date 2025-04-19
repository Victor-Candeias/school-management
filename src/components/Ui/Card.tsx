"use client"; // ✅ Mark as a Client Component

import React from "react";
import clsx from "clsx";

interface InputProps {
	id: string;
	backColor: string;
	header?: string;
	text?: string;
	subText?: string;
	data?: string; // Use a more specific type if possible
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Card({
	id,
	backColor,
	header,
	text,
	subText,
	data,
	onClick,
}: InputProps) {
	const colorMap = {
		blue: 'bg-blue-600 hover:bg-blue-700',
		green: 'bg-green-600 hover:bg-green-700',
		fuchsia: 'bg-fuchsia-600 hover:bg-fuchsia-700',
		orange: 'bg-orange-300 hover:bg-orange-600'
	};

		const classes = clsx(
			'card text-center m-4 p-1.5 w-[250px] h-[200px] text-white rounded-[15px] hover:cursor-pointer hover:border hover:border-white transition duration-200',
			colorMap[backColor as keyof typeof colorMap]
		);

	return (
		<div
			key={id}
			id={id}
			className={classes}
			onClick={(e) => onClick(e)}
		>
			<h3>{header}</h3>
			<p>{text}</p>
			{subText && <p>{subText}</p>}
			{data && <p>{data}</p>}
		</div>
	);
}
