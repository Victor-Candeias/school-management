import { useState } from "react";
import styles from "./FormsLayout.module.css"; // Estilos para o modal
import ConfirmationModal from "@/components/Ui/ConfirmedModal";
import { SchoolInterface } from "@/interfaces/Interfaces";
import { GenerateGuidId } from "@/Utils/Utils";
import Button from "@/components/Ui/Button";
import { createSchool } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import Loader from "@/components/Ui/Loader";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface ModalLayoutProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const AddSchool = ({ isOpen, onConfirm, onCancel }: ModalLayoutProps) => {
	const [schoolData, setSchoolData] = useState({
		code: "",
		name: "",
		address: "",
		addressCP: "",
		email: "",
		contact: "",
	});
	const [commomErrors, setCommomErrors] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false); // Control modal open
	const [modalCaption, setModalCaption] = useState("");
	const [isCancelButton, setIsCancelButton] = useState(true);
	const [loading, setLoading] = useState(false); // State to track loading state
	const { contextUser, refreshData } = useAuth(); // Get the function to store login data in context

	if (!isOpen) return null;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setSchoolData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	/****************************************************************************************************************************
		Methods that record the operation
	*****************************************************************************************************************************/
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent default form behavior (page reload)

		// Basic form validation to ensure required fields are filled
		if (!schoolData.code || !schoolData.name || !schoolData.email) {
			// toast.warning("Please fill in all required fields.");
			setCommomErrors("O campos são obrigatórios!!!");
			return;
		}

		// Validate email format using a regular expression
		if (!/\S+@\S+\.\S+/.test(schoolData.email)) {
			// toast.warning("Please enter a valid email.");
			setCommomErrors("Tem se inserir um email válido!!!");
			return;
		}

		setModalCaption("Tem a certeza que deseja adicionar o ano Escolar?");
		setIsCancelButton(false);

		// update refersh flag
		refreshData();
		
		// Show modal
		setIsModalOpen(true); // Abre o modal de confirmação
	};

	const handleConfirmSubmit = async () => {
		setIsModalOpen(false);

		// Construct the school data object
		const data: SchoolInterface = {
			userId: contextUser?.userId ?? "", // Ensure userId is fetched from context
			schoolId: GenerateGuidId(), // Generate a unique ID for the school
			code: schoolData.code,
			name: schoolData.name,
			address: schoolData.address,
			cpAddress: schoolData.addressCP,
			email: schoolData.email,
			contact: schoolData.contact,
		};

		try {
			// Attempt to create a new school via the API
			const response = await createSchool(data);

			// Check for any error in the response
			if (response.status >= 400) {
				throw new Error(`Failed to create school: ${response.message}`);
			}

			// Show a success message on successful school creation
			// toast.success("School added successfully!");

			// Reset all form fields
			resetData();

			setLoading(true);

			// Redirect to the schools list page
			onConfirm();
		} catch (error) {
			// Display error message if the creation fails
			console.log(error);
			// toast.error("Error adding school. Please try again.\n" + error);
		}
	};

	/****************************************************************************************************************************
		Cancel handler: Reset form and navigate back to the previous page
	*****************************************************************************************************************************/
	const handleCancel = async (event: React.FormEvent) => {
		event.preventDefault();

		setModalCaption("Tem a certeza que deseja cancelar a operação?");
		setIsCancelButton(true);

		// Show modal
		setIsModalOpen(true); // Abre o modal de confirmação
	};

	const handleConfirmCancel = () => {
		// Caso o usuário confirme o cancelamento, reinicia o formulário e volta para a página anterior
		setIsModalOpen(false);

		// Reset all form fields
		resetData();

		// Navigate back to the previous page
		onCancel();
	};

	/****************************************************************************************************************************
		Closes the modal if the user cancels the action
	*****************************************************************************************************************************/
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const resetData = () => {
		// Reset all form fields
		setSchoolData({
			code: "",
			name: "",
			address: "",
			addressCP: "",
			email: "",
			contact: "",
		});

		setModalCaption("");
	};

	// Show a loading message while the schools are being fetched
	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<div className="flex items-center justify-center min-h-[65vh] bg-cover bg-center">
					<div className="bg-white border border-blue-500 bg-opacity-80 p-4 rounded-2xl shadow-lg w-full max-w-md">
						<motion.form
							onSubmit={handleSubmit}
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 30 }}
							transition={{ duration: 0.4 }}
						>
							<h2 className="text-xl font-bold text-blue-500 text-center mb-6">
								Adicionar nova Escola
							</h2>

							<div className="mb-2">
								<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
									<Lock className="w-5 h-5 text-gray-500" />
									<input
										id="code"
										name="code"
										type="text"
										value={schoolData.code}
										onChange={handleInputChange}
										placeholder="Código da escola..."
										className="w-full border border-gray-300 outline-none bg-gray-200"
										required
									/>
								</label>
							</div>

							<div className="mb-2">
								<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
									<Lock className="w-5 h-5 text-gray-500" />
									<input
										id="name"
										type="text"
										value={schoolData.name}
										onChange={handleInputChange}
										placeholder="Nome da Escola...."
										className="w-full border border-gray-300 outline-none bg-gray-200"
										required
									/>
								</label>
							</div>

							<div className="mb-2">
								<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
									<Lock className="w-5 h-5 text-gray-500" />
									<input
										id="address"
										type="text"
										value={schoolData.address}
										onChange={handleInputChange}
										placeholder="Morada da escola..."
										className="w-full border border-gray-300 outline-none bg-gray-200"
										required
									/>
								</label>
							</div>

							<div className="mb-2">
								<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
									<Lock className="w-5 h-5 text-gray-500" />
									<input
										id="addressCP"
										type="text"
										value={schoolData.addressCP}
										onChange={handleInputChange}
										placeholder="Código Postal da escola..."
										className="w-full border border-gray-300 outline-none bg-gray-200"
										required
									/>
								</label>
							</div>

							<div className="mb-4">
								<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
									<Mail className="w-5 h-5 text-gray-500" />
									<input
										id="email"
										type="email"
										placeholder="Email da Escola..."
										value={schoolData.email}
										onChange={handleInputChange}
										className="w-full border-gray-300 outline-none bg-gray-200"
									/>
								</label>
							</div>

							<div className="mb-2">
								<label className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
									<Lock className="w-5 h-5 text-gray-500" />
									<input
										id="contact"
										type="text"
										value={schoolData.contact}
										onChange={handleInputChange}
										placeholder="Contacto da Escola..."
										className="w-full border border-gray-300 outline-none bg-gray-200"
										required
									/>
								</label>
							</div>
							{/* Button group for form actions */}
							<div className={styles.buttonGroup}>
								<Button
									label="Cancelar"
									customClass={styles.cancelButton}
									type="button"
									handleClick={handleCancel} // Cancel action
								/>
								<Button
									label="Adicionar >>>"
									customClass={styles.confirmButton}
									type="submit"
								/>
								{/* Submit button */}
							</div>
						</motion.form>
						{commomErrors && (
							<p className="text-sm text-red-500 mt-1">{commomErrors}</p>
						)}
					</div>
				</div>
				{/* Modal de confirmação */}
				<ConfirmationModal
					isOpen={isModalOpen}
					caption={modalCaption}
					onConfirm={isCancelButton ? handleConfirmCancel : handleConfirmSubmit}
					onCancel={handleCloseModal}
				/>
			</div>
		</div>
	);
};

export default AddSchool;
