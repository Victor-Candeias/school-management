import { apiAuthClient } from "./apiClient"; // Import the axios instances for making API requests

interface LoginProps {
	email: string;
	password: string;
}

// Interface para os dados de entrada
interface RegisterProps {
	name: string;
	email: string;
	password: string;
}

// Interface for the expected response from the API
interface LoginResponse {
	status: number;
	message: string;
	userId: string;
	role: string;
	token: string;
}

interface RegisterResponse {
	status: number;
	message: string;
}

// Function to handle user login
export async function login({
	email,
	password,
}: LoginProps): Promise<LoginResponse> {
	// Send POST request to the authentication API to log in
	const response = await apiAuthClient.post<LoginResponse>(
		"/auth/login", // Endpoint for the login action
		{ email, password }, // Request body containing email and password
		{
			headers: {
				"Content-Type": "application/json", // Set Content-Type header to application/json
			},
			withCredentials: true, // Important for sending and receiving cookies (e.g., authToken)
		}
	);

	const result: LoginResponse = {
		status: response.status,
		message: response.data.message,
		userId: response.data.userId,
		role: response.data.role,
		token: response.data.token,
	};

	// Return the response data (e.g., auth token, user details)
	return result;
}

// Função para registrar um usuário
export async function register({
	name,
	email,
	password,
}: RegisterProps): Promise<RegisterResponse> {
	try {
		const response = await apiAuthClient.post<RegisterResponse>(
			"/auth/register",
			{ name, email, password }, // Corpo da requisição
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		console.log("✅ Registro bem-sucedido:", response.data);

		return {
			status: response.status,
			message: response.data?.message || "Usuário registrado com sucesso!",
		};
	} catch (error: unknown) {
		console.error("❌ Erro no registro:", error);

		if (error instanceof Error) {
			return {
				status: 500,
				message: error.message || "Erro desconhecido no servidor",
			};
		}

		return {
			status: 500,
			message: "Erro inesperado ao processar o registro",
		};
	}
}
