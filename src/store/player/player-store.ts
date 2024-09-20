import { PlayerProps } from "@/store";
import { create } from "zustand";

interface State {
  currentPlaying: PlayerProps | null;
  setPlaying: (playing: PlayerProps) => void;
}

export const usePlayerStore = create<State>()((set) => ({
  currentPlaying: null,
  setPlaying: (playing: PlayerProps) => set({ currentPlaying: playing }),
  volume: 0,
}));
