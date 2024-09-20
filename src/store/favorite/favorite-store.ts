import { create } from "zustand";

interface State {
  isChangeFavorite: boolean;
  setIsChangeFavorite: (isChangeFavorite: boolean) => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}

export const useFavoriteStore = create<State>()((set) => ({
  isChangeFavorite: false,
  setIsChangeFavorite: (isChangeFavorite: boolean) => set({ isChangeFavorite }),
  favorites: [],
  setFavorites: (favorites: string[]) => set({ favorites }),
}));
