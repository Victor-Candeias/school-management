import { apiSChoolClient } from "./apiClient"; // Import the axios instances for making API requests

import { YearsInterface } from "../types/Interfaces"; // Import the types for user and school data

import axios, { AxiosError, isAxiosError } from "axios";
import { Yrsa } from "next/font/google";

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

        console.log("getYearBySchoolId():response=", response);

        if (
            response.status === 200 &&
            (!response.data || response.data.length === 0)
        ) {
            console.log("No data found or empty response");
            return [];
        }

        return response.data;
    } catch (error) {
        if ((error as AxiosError).isAxiosError) {
            const axiosError = error as AxiosError;
			console.error(
				"Axios error:",
				axiosError.response?.data,
				axiosError.message
			);
        } else {
            console.error("Erro desconhecido:", error);
        }
        
        return [];
    }
}

export async function getYearName(
	userId: string,
	schoolId: string,
	yearId: string
): Promise<YearsInterface | null> {
	try {
		console.log("getYearName();userId=", userId);
		console.log("getYearName();schoolId=", schoolId);
		console.log("getYearName();yearId=", yearId);

		const response = await apiSChoolClient.post<YearsInterface[]>(
			"/years/find",
			{ userId, schoolId, yearId },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

		// Desestruturação para pegar o primeiro item do array
		const [firstYear] = response.data;

		if (!firstYear) {
			console.log("Nenhum dado encontrado.");
			return null;
        }

		return firstYear;
    } catch (error) {
		console.error("Erro ao buscar o ano:", error);
		return null;
    }
}

interface CreateYearResponse {
	yearId: string;
    status: number;
    message: string;
}

// Função para registrar um usuário
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
