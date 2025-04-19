import clsx from "clsx";

interface DropdownProps {
	id: string;
	caption: string;
	backColor: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	onHandleLayout: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Dropdown = ({
	id,
	caption,
	backColor,
	Icon,
	onHandleLayout,
}: DropdownProps) => {
	const onClickLayout: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
		onHandleLayout(event);
	};
	const colorMap = {
		blue: "bg-blue-600 hover:bg-blue-700",
		green: "bg-green-600 hover:bg-green-700",
		fuchsia: "bg-fuchsia-600 hover:bg-fuchsia-700",
		orange: 'bg-orange-600 hover:bg-orange-700'
	};

	const classes = clsx(
		"text-left cursor-pointer w-40 text-white font-semibold py-3 rounded-lg transition duration-200 flex pl-2 gap-2",
		colorMap[backColor as keyof typeof colorMap]
	);
	return (
		<div className="relative">
			<a id={id} className={classes} onClick={onClickLayout}>
				<Icon className="h-5 w-5" />
				{caption}
			</a>
		</div>
	);
};

export default Dropdown;
