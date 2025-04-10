import { apiSChoolClient } from "./apiClient"; // Import the axios instances for making API requests
import { StudentInterface } from "@/types/Interfaces"; // Import the types for user and school data

export async function getAllStudents(
	schoolId: string,
	yearId: string,
	classId: string,
	userId?: string
): Promise<StudentInterface[]> {
	try {
		const response = await apiSChoolClient.post<StudentInterface[]>(
			"/students/find",
			{ userId, schoolId, yearId, classId },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);

		// Verifica se o status é 200 OK e se a resposta tem dados
		if (
			response.status === 200 &&
			(!response.data || response.data.length === 0)
		) {
			console.log("No data found or empty response");

			return []; // Retorna um array vazio se não houver dados
		}

		return response.data;
	} catch (error) {
		console.error("Erro ao buscar escolas:", error);
		return []; // Retorna um array vazio em caso de erro
	}
}

interface CreateStudentsResponse {
	id?: string;
	status: number;
	message: string;
}

export async function createStudent({
	userId,
	schoolId,
	yearId,
	classId,
	studentsId,
	className,
	classYear,
	classLevel,
	studentNumber,
	studentName,
	studentEmail,
}: StudentInterface): Promise<CreateStudentsResponse> {
	try {
		const response = await apiSChoolClient.post<StudentInterface>(
			"/students/add",
			{
				userId,
				schoolId,
				yearId,
				classId,
				studentsId,
				className,
				classYear,
				classLevel,
				studentNumber,
				studentName,
				studentEmail,
			}, // Corpo da requisição
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		console.log("✅ Registro bem-sucedido:", response.data);

		return {
			id: response.data.id,
			status: response.status,
			message: response.data?.message || "Usuário registrado com sucesso!",
		};
	} catch (error: unknown) {
		console.error("❌ Erro no registro:", error);

		if (error instanceof Error) {
			return {
				id: "unknown", // Provide a default or placeholder value for id
				status: 500,
				message: error.message || "Erro desconhecido no servidor",
			};
		}
		return {
			id: "unknown", // Provide a default or placeholder value for id
			status: 500,
			message: "Erro inesperado ao processar o registro",
		};
	}
}
