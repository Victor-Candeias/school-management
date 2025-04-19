import axios from "axios"; // Import the axios library for making HTTP requests
import {
	ClassInterface,
	LoginProps,
	LoginResponse,
	RegisterProps,
	RegisterResponse,
	SchoolInterface,
	YearsInterface,
	CreateSchoolResponse,
	CreateYearResponse,
} from "@/interfaces/Interfaces";

// Define the base URL for the school-related API, falling back to localhost if the environment variable is not set
const API_BASE_SCHOLL_URL =
	process.env.NEXT_PUBLIC_API_SCHOLL_URL || "http://127.0.0.1:8020";

// Create an axios instance for school-related API requests
export const apiSChoolClient = axios.create({
	baseURL: API_BASE_SCHOLL_URL, // Set the base URL for school API requests
	withCredentials: true,
	headers: {
		"Content-Type": "application/json", // Set the content type to JSON for all requests
	},
});

// *********************** Function to handle user login ***********************
export async function login({
	email,
	password,
}: LoginProps): Promise<LoginResponse> {
	try {
		// Send POST request to the authentication API to log in
		const response = await apiSChoolClient.post<LoginResponse>(
			"/auth/login", // Endpoint for the login action
			{ email, password }, // Request body (data)
			{
				headers: {
					"Content-Type": "application/json", // Set Content-Type header to application/json
				},
				withCredentials: true, // Important for sending and receiving cookies (e.g., authToken)
			}
		);

		return response.data;
	} catch (error) {
		return {
			status: 500,
			message: `Erro inesperado ao efetuar login. ${error}`,
		};
	}
}
// *********************** Function to handle user login ***********************

// *********************** Function to handle user register ***********************
export async function register({
	name,
	email,
	password,
}: RegisterProps): Promise<RegisterResponse> {
	try {
		const response = await apiSChoolClient.post<RegisterResponse>(
			"/auth/register",
			{ name, email, password }, // Corpo da requisição
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		return {
			status: response.status,
			message: response.data?.message || "Usuário registrado com sucesso!",
		};
	} catch (error) {
		return {
			status: 500,
			message: `Erro inesperado ao processar o registro. ${error}`,
		};
	}
}
// *********************** Function to handle user register ***********************

// *********************** Function to handle user logout ***********************
export async function logout() {
	try {
		// Send POST request to the authentication API to log in
		const response = await apiSChoolClient.post(
			"/auth/logout", // Endpoint for the login action
			{
				headers: {
					"Content-Type": "application/json", // Set Content-Type header to application/json
				},
				withCredentials: true, // Important for sending and receiving cookies (e.g., authToken)
			}
		);

		return response.data;
	} catch (error) {
		return {
			status: 500,
			message: `Erro inesperado ao efetuar login. ${error}`,
		};
	}
}
// *********************** Function to handle user register ***********************

// *********************** Function to handle get schools ***********************

export async function getAllSchools(
	userId?: string
): Promise<SchoolInterface[]> {
	try {
		const response = await apiSChoolClient.post<SchoolInterface[]>(
			"/schools/find",
			{ userId: userId },
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
	} catch  {
		return [];
	}
}

// *********************** Function to handle get schools ***********************

// *********************** Function to handle get years ***********************

export async function getYearBySchoolId(
	userId: string,
	schoolId: string
): Promise<YearsInterface[]> {
	try {
		const response = await apiSChoolClient.post<YearsInterface[]>(
			"/years/find",
			{ userId, schoolId },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);

		if (
			response.status === 200 &&
			(!response.data || response.data.length === 0)
		) {
			console.log("No data found or empty response");
			return [];
		}

		return response.data;
	} catch (error) {
		console.error("Erro ao buscar escolas:", error);
		return []; // Retorna um array vazio em caso de erro
	}
}

// *********************** Function to handle get years ***********************

// *********************** Function to handle get classes ***********************

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

// *********************** Function to handle get classes ***********************

// *********************** Function to handle create school ***********************

// Função para registrar um usuário
export async function createSchool({
	userId,
	schoolId,
	code,
	name,
	address,
	cpAddress,
	email,
	contact,
}: SchoolInterface): Promise<CreateSchoolResponse> {
	try {
		const response = await apiSChoolClient.post<CreateSchoolResponse>(
			"/schools/add",
			{ userId, schoolId, code, name, address, cpAddress, email, contact }, // Corpo da requisição
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
	} catch (error) {
		return {
			id: "unknown", // Provide a default or placeholder value for id
			status: 500,
			message: "Erro inesperado ao processar o registro.\n" + error,
		};
	}
}

// *********************** Function to handle create school ***********************

// *********************** Function to handle create year ***********************

export async function createYear({
    userId,
    schoolId,
	yearId,
    name,
}: YearsInterface): Promise<CreateYearResponse> {
    try {
        const response = await apiSChoolClient.post<CreateYearResponse>(
            "/years/add",
			{ userId, schoolId, yearId, name }, // Corpo da requisição
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("✅ Registro bem-sucedido:", response.data);

        return {
			yearId: response.data.yearId,
            status: response.status,
            message: response.data?.message || "Usuário registrado com sucesso!",
        };
    } catch (error) {
        return {
            status: 500,
            message: "Erro inesperado ao processar o registro.\r" + error,
        };
    }
}

// *********************** Function to handle create year ***********************
