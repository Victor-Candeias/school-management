"use client";

import {
	HomeIcon,
	UserGroupIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Ui/DropDownButton";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
	const {
		contextUser,
		schools,
		year,
		classes,
		resetCurrentClass,
		resetCurrentSchool,
		resetCurrentYear,
	} = useAuth(); // Get the function to store login data in context
	const router = useRouter();

	const shouldShowSidebar = schools?.id || year?.id || classes?.id;

	// Schools
	const onHandleLayout = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		const target = event.target as HTMLLIElement;

		// process the layouts
		if (target.id === "schools") {
			// reset
			resetCurrentSchool();
			resetCurrentYear();
			resetCurrentClass();
			// navega para a schools
			router.push(`/${contextUser?.userId}`);
		} else if (target.id === "years") {
			resetCurrentYear();
			resetCurrentClass();
			router.push(`/${contextUser?.userId}/${schools?.id}`);
		} else if (target.id === "classes") {
			resetCurrentClass();
			router.push(`/${contextUser?.userId}/${schools?.id}/${year?.id}`);
		}
	};

	return (
		<>
			{/* Overlay para fechar o menu em mobile md:static */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden opacity-95"
					onClick={onClose}
				/>
			)}
			{shouldShowSidebar && (
				<aside
					className={`opacity-90 fixed top-18 left-2 h-[calc(100vh-6rem)] w-48 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500 rounded-tr-lg rounded-br-lg p-4 z-50 transition-transform transform
          ${
						isOpen ? "translate-x-0" : "-translate-x-full"
					} md:translate-x-0 md:block md:static`}
				>
					<nav>
						<ul className="space-y-2">
							{schools?.id && (
								<li>
									<Dropdown
										id="schools"
										caption="Escolas"
										backColor="blue"
										Icon={HomeIcon}
										onHandleLayout={onHandleLayout}
									/>
								</li>
							)}

							{/* select year */}
							{year?.id && (
								<li>
									<Dropdown
										id="years"
										caption="Anos Escolares"
										backColor="green"
										Icon={UserGroupIcon}
										onHandleLayout={onHandleLayout}
									/>
								</li>
							)}
							{/* select class */}
							{classes?.id && (
								<li>
									<Dropdown
										id="classes"
										caption="Turmas"
										backColor="fuchsia"
										Icon={Cog6ToothIcon}
										onHandleLayout={onHandleLayout}
									/>
								</li>
							)}
						</ul>
					</nav>
				</aside>
			)}
		</>
	);
}
