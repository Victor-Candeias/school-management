import { apiSChoolClient } from "./apiClient"; // Import the axios instances for making API requests

import { SchoolInterface } from "../types/Interfaces"; // Import the types for user and school data

export async function getSchoolById(id: string): Promise<SchoolInterface> {
	try {
		const response = await apiSChoolClient.post<SchoolInterface>(
			"/schools/findbyid",
			{ id },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);

		return {
			...response.data,
			status: response.status,
		};
	} catch (error) {
		console.error("Erro ao buscar escola:", error);
		return {} as SchoolInterface; // Retorna um objeto vazio em caso de erro
	}
}

export async function getAllSchools(userId?: string): Promise<SchoolInterface[]> {
	try {
		console.log("getAllSchools=", userId);

		const response = await apiSChoolClient.post<SchoolInterface[]>(
			"/schools/find",
			{ "userId": userId },
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

interface CreateSchoolResponse {
	id: string;
	status: number;
	message: string;
}

// Função para registrar um usuário
export async function createSchool({
	userId,
	code,
	name,
	address,
	email,
	contact,
}: SchoolInterface): Promise<CreateSchoolResponse> {
	try {
		const response = await apiSChoolClient.post<CreateSchoolResponse>(
			"/schools/add",
			{ userId, code, name, address, email, contact }, // Corpo da requisição
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
