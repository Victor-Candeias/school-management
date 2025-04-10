import { apiSChoolClient } from "./apiClient"; // Import the axios instances for making API requests
import { ClassInterface, Levels } from "@/types/Interfaces"; // Import the types for user and school data
import { GenerateGuidId } from "./utils";

export async function getClassById(id: string): Promise<ClassInterface> {
	try {
		const response = await apiSChoolClient.post<ClassInterface>(
			"/class/findbyid",
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
		return {} as ClassInterface; // Retorna um objeto vazio em caso de erro
	}
}

export async function getAllClasses(
	schoolId: string,
	yearId: string,
	userId?: string
): Promise<ClassInterface[]> {
	try {
		const response = await apiSChoolClient.post<ClassInterface[]>(
			"/class/find",
			{ userId, schoolId, yearId },
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

export async function getLevels(): Promise<Levels[]> {
	try {
		const response = await apiSChoolClient.get<string[]>("/class/levels", {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		if (!response.data || response.data.length === 0) {
			console.log("No data found or empty response");
			return [];
		}

		return response.data.map((name) => ({
			id: GenerateGuidId(),
			name,
		}));
	} catch (error) {
		console.error("Erro ao buscar níveis:", error);
		return [];
	}
}

export async function createClass({
	userId,
	schoolId,
	yearId,
	classId,
	className,
	classYear,
	classLevel,
}: ClassInterface): Promise<ClassInterface | { message: string, status: number  }> {
	try {
		const response = await apiSChoolClient.post<ClassInterface>(
			"/class/add",
			{ userId, schoolId, yearId, classId, className, classYear, classLevel }, // Corpo da requisição
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		console.log("✅ Registro bem-sucedido:", response.data);

		return {
			...response.data,
			status: response.status,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return { message: errorMessage };
	}
}

export async function getClass(
	schoolId: string,
	yearId: string,
	classId: string,
	userId?: string
): Promise<ClassInterface| { message: string, status: number }> {
	try {
		const response = await apiSChoolClient.post<ClassInterface>(
			"/class/find",
			{ userId, schoolId, yearId, classId },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);

		// Verifica se o status é 200 OK e se a resposta tem dados
		return {
			...response.data,
			status: response.status,
		};

		return response.data;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return { message: errorMessage, status: 500 };
	}
}
