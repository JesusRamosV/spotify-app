"use client";
import { Artist } from "@/interfaces/MainPage.interface";
import {
  getCurrentTrack,
  getPlayerState,
  setChangeState,
  setChangeTrack,
} from "@/services/services";
import { usePlayerStore, useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import React from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

export const PlayerControls = () => {
  const { currentPlaying, setPlaying } = usePlayerStore();
  const { data: session } = useSession();
  const { addAlert } = useSnackbarStore();

  const changeTrack = async (type: string) => {
    if (session?.accessToken) {
      try {
        await setChangeTrack(session?.accessToken as string, type);

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
            volume: dataPlayerState.device?.volume_percent,
            pausing: dataPlayerState?.actions?.disallows?.pausing || false,
          });
        }
      } catch (error) {
        addAlert({ msg: "Error al cambiar de canción", severity: "error" });
      }
    }
  };

  const changeState = async (state: boolean) => {
    await setChangeState(session?.accessToken as string, state);
  };
  return (
    <div className="flex items-center gap-2">
      <div>
        <BsShuffle size={15} />
      </div>
      <div>
        <CgPlayTrackPrev
          onClick={() => changeTrack("previous")}
          size={35}
          className="cursor-pointer hover:text-gray-200 hover:scale-110"
        />
      </div>
      <div>
        {!currentPlaying?.pausing ? (
          <BsFillPauseCircleFill
            onClick={() => changeState(false)}
            size={35}
            className="cursor-pointer hover:text-gray-200 hover:scale-110"
          />
        ) : (
          <BsFillPlayCircleFill
            className="cursor-pointer hover:text-gray-200 hover:scale-110"
            onClick={() => changeState(true)}
            size={35}
          />
        )}
      </div>
      <div>
        <CgPlayTrackNext
          onClick={() => changeTrack("next")}
          size={35}
          className="cursor-pointer hover:text-gray-200 hover:scale-110"
        />
      </div>
      <div>
        <FiRepeat size={15} />
      </div>
    </div>
  );
};
