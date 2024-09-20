import axios, { AxiosError, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";

interface SpotifyApiError extends AxiosError {
  response?: AxiosResponse<{
    error: {
      status: number;
      message: string;
    };
  }>;
}

const BASE_URL = "https://api.spotify.com/v1";

export const spotifyApi = axios.create({
  baseURL: BASE_URL,
});

spotifyApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: SpotifyApiError) => {
    if (error.response?.status === 401) {
      console.log("Token expirado o inválido. Cerrando sesión...");

      try {
        await signOut({ redirect: false });

        window.location.href = "/api/auth/signin";
      } catch (signOutError) {
        console.error("Error al cerrar sesión:", signOutError);
      }
    }
    return Promise.reject(error);
  }
);
