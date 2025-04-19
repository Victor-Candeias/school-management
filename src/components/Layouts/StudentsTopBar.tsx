"use client";

import {
	Bars3Icon,
	Cog6ToothIcon,
	HomeIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import Dropdown from "../Ui/DropDownButton";
import { useState } from "react";
import AddSchool from "./FormsLayout/AddSchool";

export default function StudentsTopBar() {
	const { contextUser, schools, year, classes, refreshData } = useAuth(); // Get the function to store login data in context
	const [isModalOpen, setIsModalOpen] = useState(false); // Control modal open
	const [isCancelButton, setIsCancelButton] = useState(true);
	const [isBarOpen, setIsBarOpen] = useState(false);

	const onHandleAddNew = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		const target = event.target as HTMLLIElement;

		try {

			if (target.id === "schoolsnew") {
				// navega para a schools
				setIsCancelButton(false);
				// Show modal
				setIsModalOpen(true); // Abre o modal de confirmação
			} else if (target.id === "yearsnew") {
			}
			if (target.id === "classesnew") {
			}
		}
		catch(error) {
			console.log("onHandleAddNew();error=", error);
		}
	};

	// Add school
	const handleConfirmSubmit = async () => {
		setIsModalOpen(false);

		// Redirect to the schools list page
		refreshData();
	};

	/****************************************************************************************************************************
		Closes the modal if the user cancels the action
	*****************************************************************************************************************************/
	const handleCloseModal = async () => {
		setIsModalOpen(false);
	};

	// bg-gray-600
	return (
		<>
			{/* Overlay para fechar o menu em mobile md:static */}
			{isBarOpen && (
				<div
					className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden opacity-95"
					onClick={() => setIsBarOpen(!isBarOpen)}
				>
					<p>sfdsfsd</p>
				</div>
			)}

			<header className="opacity-90 fixed left-50 w-[calc(100%-350px)] h-14 bg-transparent text-white flex items-center pl-2 rounded-lg px-4 z-50">
				{/* Menu mobile quando isBarOpen = true */}
				{!isBarOpen && (
					<>
						{/* Versão visível apenas em telas maiores */}
						<div className="hidden gap-4 lg:flex lg:flex-row lg:items-center">
							{contextUser?.userId && !schools?.name && (
								<Dropdown
									id="schoolsnew"
									caption="Nova Escola"
									backColor="blue"
									Icon={HomeIcon}
									onHandleLayout={onHandleAddNew}
								/>
							)}
							{schools?.name && !year?.name && (
								<Dropdown
									id="yearsnew"
									caption="Novo Ano Escolar"
									backColor="green"
									Icon={UserGroupIcon}
									onHandleLayout={onHandleAddNew}
								/>
							)}
							{year?.name && !classes?.name && (
								<Dropdown
									id="classesnew"
									caption="Nova Turma"
									backColor="fuchsia"
									Icon={Cog6ToothIcon}
									onHandleLayout={onHandleAddNew}
								/>
							)}
							{classes?.name && (
								<>
									<Dropdown
										id="studentnew"
										caption="Novo Aluno"
										backColor="orange"
										Icon={Cog6ToothIcon}
										onHandleLayout={onHandleAddNew}
									/>
									<Dropdown
										id="classes"
										caption="Turmas"
										backColor="orange"
										Icon={Cog6ToothIcon}
										onHandleLayout={onHandleAddNew}
									/>
								</>
							)}
						</div>
					</>
				)}

				{/* Botão visível só no mobile */}
				<button
					className="md:hidden text-white bg-gray-800 rounded-lg"
					onClick={() => setIsBarOpen(!isBarOpen)}
					aria-label="Abrir menu"
				>
					<Bars3Icon className="h-10 w-10 m-2" />
				</button>
			</header>
			{/* Modal de confirmação */}
			<AddSchool
				isOpen={isModalOpen}
				onConfirm={isCancelButton ? handleCloseModal : handleConfirmSubmit}
				onCancel={handleCloseModal}
			/>
		</>
	);
}
