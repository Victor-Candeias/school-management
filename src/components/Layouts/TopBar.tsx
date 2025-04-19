"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { logout } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

interface TopBarProps {
	onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
	const { setLogout, contextUser, schools, year, classes } = useAuth(); // Get the function to store login data in context

	const handleLogout = async () => {
		await logout();
		setLogout();
	};

	// bg-gray-600
	return (
		<header className="opacity-90 fixed top-0 left-10 w-[calc(100%-100px)] h-14 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white flex items-center rounded-br-lg rounded-bl-lg px-4 z-50">
			<h2 className="text-l font-semibold m-5">{contextUser?.user}</h2>

			{/* Versão visível apenas em telas maiores */}
			<div className="hidden lg:flex lg:flex-row lg:items-center">
				{schools?.name && (
					<h2 className="text-base font-semibold bg-transparent text-white p-2 m-5 whitespace-nowrap">
						{schools?.name}
					</h2>
				)}
				{year?.name && (
					<h2 className="text-base font-semibold m-5 p-2 bg-transparent text-white whitespace-nowrap">
						{year?.name}
					</h2>
				)}
				{classes?.name && (
					<h2 className="text-base font-semibold m-5 p-2 bg-transparent text-white whitespace-nowrap">
						{classes?.name}
					</h2>
				)}
			</div>

			{/* Dropdown visível apenas em telas pequenas */}
			<div className="block lg:hidden">
				<select className="w-full p-2 bg-gray-700 text-white rounded">
					{schools?.name && <option value="school">{schools?.name}</option>}
					{year?.name && <option value="year">{year?.name}</option>}
					{classes?.name && <option value="class">{classes?.name}</option>}
				</select>
			</div>

			<button
				className="ml-auto cursor-pointer w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-1 p-2"
				onClick={handleLogout}
			>
				<ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
				Logout
			</button>

			{/* Botão visível só no mobile */}
			<button
				className="md:hidden text-white"
				onClick={onToggleSidebar}
				aria-label="Abrir menu"
			>
				<Bars3Icon className="h-10 w-10 m-2" />
			</button>
		</header>
	);
}
