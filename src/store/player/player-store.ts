import { PlayerProps } from "@/store";
import { create } from "zustand";

interface State {
  currentPlaying: PlayerProps | null;
  playerState: boolean;
  setPlayerState: (playerState: boolean) => void;
  setPlaying: (playing: PlayerProps) => void;
}

export const usePlayerStore = create<State>()((set) => ({
  currentPlaying: null,
  playerState: false,
  setPlayerState: (playerState: boolean) => set({ playerState }),
  setPlaying: (playing: PlayerProps) => set({ currentPlaying: playing }),
  volume: 0,
}));
