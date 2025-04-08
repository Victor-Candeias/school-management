import { apiSChoolClient } from "./apiClient"; // Import the axios instances for making API requests

import { YearsInterface } from "../types/Interfaces"; // Import the types for user and school data

import axios, { AxiosError, isAxiosError } from "axios";

export async function getYearBySchoolId(schoolId: string): Promise<YearsInterface[]> {
    try {
        console.log("getYearBySchoolId():schoolId=", schoolId);

        const response = await apiSChoolClient.post<YearsInterface[]>(
            "/years/find",
            { schoolId },
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
            console.error("Axios error:", axiosError.response?.data, axiosError.message);
        } else {
            console.error("Erro desconhecido:", error);
        }
        

        return [];
    }
}


export async function getAllSchools(): Promise<YearsInterface[]> {
    try {
        const response = await apiSChoolClient.get<YearsInterface[]>(
            "/schools/find",
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

interface CreateYearResponse {
    id: string;
    status: number;
    message: string;
}

// Função para registrar um usuário
export async function createYear({
    schoolId,
    name,
}: YearsInterface): Promise<CreateYearResponse> {
    try {
        const response = await apiSChoolClient.post<CreateYearResponse>(
            "/years/add",
            { schoolId, name }, // Corpo da requisição
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
