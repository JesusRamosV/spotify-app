import spotifyApi from "@/config/api";
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

    // return response.data.tracks.map((track) => ({
    //   id: track.id,
    //   title: track.name,
    //   artist: track.artists.map((artist) => artist.name).join(", "),
    //   album: track.album.name,
    //   albumCover: track.album.images[0]?.url,
    //   duration: convertMillisecondsToMinutesAndSeconds(track.duration_ms),
    //   popularity: track.popularity,
    // }));
  } catch (error) {
    console.error("Error obteniendo las recomendaciones:", error);
    throw error;
  }
};
