import { useState } from "react";
import styles from "./FormsLayout.module.css"; // Estilos para o modal
import ConfirmationModal from "@/components/Ui/ConfirmedModal";
import { YearsInterface } from "@/interfaces/Interfaces";
import { GenerateGuidId } from "@/Utils/Utils";
import Button from "@/components/Ui/Button";
import { createYear } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext"; // Import the authentication context to manage login state
import Loader from "@/components/Ui/Loader";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import ComboBox from "@/components/Ui/combobox";

interface ModalLayoutProps {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const AddYear = ({ isOpen, onConfirm, onCancel }: ModalLayoutProps) => {
	const [yearName, setYearName] = useState(""); // State to store the selected year name
	const [commomErrors, setCommomErrors] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false); // Control modal open
	const [modalCaption, setModalCaption] = useState("");
	const [isCancelButton, setIsCancelButton] = useState(true);
	const [loading, setLoading] = useState(false); // State to track loading state
	const { contextUser, refreshData } = useAuth(); // Get the function to store login data in context

	if (!isOpen) return null;

	/****************************************************************************************************************************
		Create a list of years from the current year to 5 years back
	*****************************************************************************************************************************/
	const currentYear = new Date().getFullYear();
	const years: { id: string; name: string }[] = [];

	for (let ano = currentYear + 1; ano >= currentYear - 5; ano--) {
		years.push({ id: ano.toString(), name: `${ano - 1}/${ano}` });
	}

	/****************************************************************************************************************************
		Methods that record the operation
	*****************************************************************************************************************************/
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent default form behavior (page reload)

		// Basic form validation to ensure required fields are filled
		if (!yearName) {
			// toast.warning("Please fill in all required fields.");
			setCommomErrors("O campos são obrigatórios!!!");
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
		const data: YearsInterface = {
			userId: contextUser?.userId ?? "", // Ensure userId is fetched from context
			schoolId: GenerateGuidId(), // Generate a unique ID for the school
			yearId: GenerateGuidId(),
			name: yearName,
		};

		try {
			// Attempt to create a new school via the API
			const response = await createYear(data);

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
		setYearName("");

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
									<ComboBox
										options={years} // Pass the list of available years to the ComboBox
										caption="Select Year"
										selected={yearName}
										disabled={false}
										onChange={
											(e) =>
												setYearName(
													e.target.options[e.target.selectedIndex].text
												) // Set the selected year name
										}
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

export default AddYear;
