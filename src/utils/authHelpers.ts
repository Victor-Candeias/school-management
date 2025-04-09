// src/utils/auth.ts
/*
import Cookies from 'js-cookie';

export async function getUserIdFromCookies(): Promise<string | null> {
  const userID = Cookies.get('userID'); // Para pegar o cookie

  return userID ?? "";
}
*/


import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken' // ou outro decoder, dependendo do token

interface UserIdPayload {
    userId: string;
  }

export async function getTokenFromCookies() {
  const cookieStore = await cookies() // Usando await para resolver a Promise
  return cookieStore.get('userID')?.value
}

export function decodeUserId<T = UserIdPayload>(userID: string): T | null {
  try {
    return jwt.decode(userID) as T
  } catch (err) {
    console.error('Erro ao decodificar token:', err)
    return null
  }
}

export async function getUserIdFromCookies(): Promise<string | null> {
  const userID = await getTokenFromCookies()
  if (!userID) return null

  const decoded = decodeUserId(userID)
  return decoded?.userId ?? null
}
