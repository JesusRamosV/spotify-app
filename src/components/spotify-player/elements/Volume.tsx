"use client";
import { setChangeVolume } from "@/services/services";
import { usePlayerStore } from "@/store";
import { useSession } from "next-auth/react";
import React from "react";
import { FiVolume1 } from "react-icons/fi";

export const Volume = () => {
  const { data: session } = useSession();
  const { currentPlaying } = usePlayerStore();

  const setVolume = async (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    await setChangeVolume(
      session?.accessToken as string,
      parseInt(target.value)
    );
  };
  return (
    <div className="flex flex-end items-center content-center">
      <FiVolume1 size={25} />

      <input
        type="range"
        min="0"
        max="100"
        defaultValue={currentPlaying?.volume}
        className="bg-white text-white w-[15rem] h-[0.5rem] rounded-lg"
        onMouseUp={(e) => setVolume(e)}
      />
    </div>
  );
};
