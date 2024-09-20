"use client";
import { Artist } from "@/interfaces/MainPage.interface";
import { getCurrentTrack, getPlayerState } from "@/services/services";
import { usePlayerStore } from "@/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

const POLLING_INTERVAL = 5000;

export const CurrentTrack = () => {
  const { data: session } = useSession();
  const { currentPlaying, setPlaying, setPlayerState } = usePlayerStore();
  useEffect(() => {
    if (session?.accessToken) {
      const getCurrentTrackData = async () => {
        try {
          const data = await getCurrentTrack(session.accessToken as string);
          const dataPlayerState = await getPlayerState(
            session.accessToken as string
          );
          if (data !== "") {
            const { item } = data;
            setPlaying({
              id: item.id,
              name: item.name,
              artists: item.artists
                .map((artist: Artist) => artist.name)
                .join(", "),
              image: item.album.images[2].url,
              volume: dataPlayerState?.device?.volume_percent,
              pausing: dataPlayerState?.actions?.disallows?.pausing || false,
            });
            setPlayerState(true);
          }
        } catch (error) {
          console.error("Error al obtener la canción actual:", error);
        }
      };
      getCurrentTrackData();

      const intervalId = setInterval(getCurrentTrackData, POLLING_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [session?.accessToken, setPlayerState, setPlaying]);

  return (
    <>
      {currentPlaying ? (
        <div className="flex items-center gap-2">
          <Image
            width={48}
            height={48}
            src={currentPlaying.image}
            alt="current track"
            className="w-12 h-12 rounded-md"
          />
          <div className="flex flex-col ">
            <h4 className="text-sm font-medium">{currentPlaying.name}</h4>

            <h6 className="text-xs text-[#b3b3b3]">{currentPlaying.artists}</h6>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
