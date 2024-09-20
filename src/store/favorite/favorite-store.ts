import { create } from "zustand";

interface State {
  isChangeFavorite: boolean;
  setIsChangeFavorite: (isChangeFavorite: boolean) => void;
  tracksFavorites: string[];
  setTracksFavorites: (favorites: string[]) => void;
  artistsFavorites: string[];
  setArtistsFavorites: (favorites: string[]) => void;
  albumsFavorites: string[];
  setAlbumsFavorites: (favorites: string[]) => void;
}

export const useFavoriteStore = create<State>()((set) => ({
  isChangeFavorite: false,
  setIsChangeFavorite: (isChangeFavorite: boolean) => set({ isChangeFavorite }),
  tracksFavorites: [],
  setTracksFavorites: (tracksFavorites: string[]) => set({ tracksFavorites }),
  artistsFavorites: [],
  setArtistsFavorites: (artistsFavorites: string[]) =>
    set({ artistsFavorites }),
  albumsFavorites: [],
  setAlbumsFavorites: (albumsFavorites: string[]) => set({ albumsFavorites }),
}));
