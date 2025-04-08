import Link from "next/link";
import { ReactNode } from "react";
import styles from "./customlink.module.css";

interface CustomLinkProps {
	href?: string;
	children: ReactNode;
	customClass?: string;
	icon?: ReactNode;
	handleClick?: () => void;
}

export default function CustomLink({
	href,
	children,
	customClass,
	icon,
	handleClick
}: CustomLinkProps) {
	let linkClass = styles["custom-link"];
	let hrefPath = "";

	if (customClass) linkClass = customClass;
	if (href) hrefPath = href.toString();

	return (
		<div className={styles["custom-div"]}>
			<Link
				onClick={handleClick}
				href={hrefPath}
				className={linkClass}
			>
				{icon && <span className="link-icon">{icon}</span>}
				{children}
			</Link>
		</div>
	);
}
