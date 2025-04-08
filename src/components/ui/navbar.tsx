import styles from "./navbar.module.css";

export default function NavBar() {
	const HideShow = () => {
		const htmlTag = document.getElementById("myTopnav");
		if (htmlTag && htmlTag.className === "topnav") {
			htmlTag.className += " responsive";
		} else if (htmlTag) {
			htmlTag.className = "topnav";
		}
	};

	return (
		<div className={styles.topnav} id="myTopnav">
			<a href="#home" className={styles.active}>
				Home
			</a>
			<a href="#news">News</a>
			<a href="#contact">Contact</a>
			<a href="#about">About</a>
			<a href="javascript:void(0);" className={styles.icon} onClick={HideShow}>
				<i className={styles["fa fa-bars"]}></i>
			</a>
		</div>
	);
}
