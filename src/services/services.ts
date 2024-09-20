import { spotifyApi } from "@/config/api";
import { TypeSearch } from "@/interfaces/MainPage.interface";
export const searchSpotify = async (
  query: string,
  token: string,
  type: TypeSearch,
  offset: number,
  limit: number
) => {
  try {
    const response = await spotifyApi.get("/search", {
      params: { q: query, type: `${type}`, limit, offset },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar en Spotify:", error);
    throw error;
  }
};

export const getPopularTracks = async (artistId: string, token: string) => {
  try {
    const response = await spotifyApi.get(`/artists/${artistId}/top-tracks`, {
      params: { market: "ES" },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las canciones más populares:", error);
    throw error;
  }
};

export const getAlbumDetails = async (albumId: string, token: string) => {
  try {
    const response = await spotifyApi.get(`/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles del álbum:", error);
    throw error;
  }
};

export const getArtistDetails = async (artistId: string, token: string) => {
  try {
    const response = await spotifyApi.get(`/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles del artista:", error);
    throw error;
  }
};

export const getAlbumsArtist = async (
  artistId: string,
  token: string,
  limit: number,
  offset: number
) => {
  try {
    const response = await spotifyApi.get(`/artists/${artistId}/albums`, {
      params: { limit, offset },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los álbumes del artista:", error);
    throw error;
  }
};

export const getTrackDetails = async (trackId: string, token: string) => {
  try {
    const response = await spotifyApi.get(`/tracks/${trackId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de la canción:", error);
    throw error;
  }
};

export const getRecommendations = async (
  trackId: string,
  accessToken: string,
  limit = 5
) => {
  try {
    const response = await spotifyApi.get("/recommendations", {
      params: {
        seed_tracks: trackId,
        limit: limit,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error obteniendo las recomendaciones:", error);
    throw error;
  }
};

export const getFollowing = async (token: string) => {
  try {
    const response = await spotifyApi.get("/me/following", {
      params: { type: "artist" },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la canción actual:", error);
    throw error;
  }
};

export const getCurrentTrack = async (token: string) => {
  try {
    const response = await spotifyApi.get("/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la reproducción actual:", error);
    throw error;
  }
};

export const getPlayerState = async (token: string) => {
  try {
    const response = await spotifyApi.get("/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el estado de la canción:", error);
    throw error;
  }
};

export const setChangeTrack = async (token: string, type: string) => {
  try {
    const response = await spotifyApi.post(
      `/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar de canción:", error);
    throw error;
  }
};

export const setChangeState = async (token: string, state: boolean) => {
  try {
    const response = await spotifyApi.put(
      `/me/player/${state ? "play" : "pause"}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar de estado:", error);
    throw error;
  }
};

export const setChangeVolume = async (token: string, volume: number) => {
  try {
    const response = await spotifyApi.put(
      "/me/player/volume",
      {},
      {
        params: { volume_percent: volume },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar el volumen:", error);
    throw error;
  }
};

export const setPlayTrack = async (
  token: string,
  context_uri: string,
  track_number: number
) => {
  try {
    const response = await spotifyApi.put(
      "/me/player/play",
      {
        context_uri,
        offset: { position: track_number - 1 },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error al reproducir la canción:", error);
    throw error;
  }
};

export const getFavorites = async (token: string, itemType: string) => {
  let endpoint = "";

  switch (itemType) {
    case "track":
      endpoint = "/me/tracks";
      break;
    case "album":
      endpoint = "/me/albums";
      break;
    case "artist":
      endpoint = "/me/following?type=artist";
      break;
    default:
      break;
  }
  try {
    const response = await spotifyApi.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los artistas favoritos:", error);
    throw error;
  }
};

export const addToFavorites = async (
  token: string,
  itemId: string,
  itemType: string
) => {
  let endpoint;

  switch (itemType) {
    case "track":
      endpoint = `/me/tracks`;
      break;
    case "artist":
      endpoint = `/me/following?type=artist&ids=${itemId}`;
      break;
    case "album":
      endpoint = `/me/albums`;
      break;
    default:
      throw new Error("Tipo de ítem no soportado");
  }

  try {
    const response = await spotifyApi.put(
      endpoint,
      {
        ids: [itemId],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
    throw error;
  }
};

export const removeFromFavorites = async (
  token: string,
  itemId: string,
  itemType: string
) => {
  let endpoint;

  switch (itemType) {
    case "track":
      endpoint = `/me/tracks?ids=${itemId}`;
      break;
    case "artist":
      endpoint = `/me/following?type=artist&ids=${itemId}`;
      break;
    case "album":
      endpoint = `/me/albums?ids=${itemId}`;
      break;
    default:
      throw new Error("Tipo de ítem no soportado");
  }

  const response = await spotifyApi.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200 && response.status !== 204) {
    throw new Error("Error al quitar de favoritos");
  }
};
