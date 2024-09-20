"use client";

import { convertMillisecondsToMinutesAndSeconds } from "@/global/helpers";
import {
  Artist,
  Favorites,
  labels,
  TypeSearch,
} from "@/interfaces/MainPage.interface";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  setPlayTrack,
} from "@/services/services";
import { usePlayerStore, useSnackbarStore, useFavoriteStore } from "@/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { HiCheckCircle } from "react-icons/hi";

interface Props {
  data: {
    id: string;
    name: string;
    duration_ms: number;
    artists: Artist[];
    image?: string;
    context_uri: string;
    track_number: number;
  };
  index?: number;
}

export const SongList = ({ data, index }: Props) => {
  const { data: session } = useSession();
  const { setPlaying, setPlayerState } = usePlayerStore();
  const { addAlert } = useSnackbarStore();
  const { favorites, isChangeFavorite, setIsChangeFavorite, setFavorites } =
    useFavoriteStore();
  const [isViewAddSong, setIsViewAddSong] = useState(false);

  useEffect(() => {
    if (session?.accessToken) {
      const fetchFavorites = async () => {
        try {
          const response = await getFavorites(
            session?.accessToken as string,
            TypeSearch.Track
          );

          const tracks = response?.items?.map((item: Favorites) => {
            const track = item.track;
            return track?.id;
          });

          setFavorites(tracks);
        } catch (error) {
          console.error("Error al obtener las canciones favoritas:", error);
        } finally {
        }
      };
      fetchFavorites();

      if (isChangeFavorite) {
        fetchFavorites();
        setIsChangeFavorite(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken, isChangeFavorite]);

  const addFavoriteSong = async () => {
    const response = await addToFavorites(
      session?.accessToken as string,
      data.id,
      TypeSearch.Track
    );
    if (response.status === 200 || response.status === 204) {
      setIsChangeFavorite(true);
      addAlert({
        msg: "Canción añadida a favoritos",
        severity: "success",
      });
    }
  };

  const removeFavorite = async () => {
    try {
      await removeFromFavorites(
        session?.accessToken as string,
        data.id,
        TypeSearch.Track
      );

      setIsChangeFavorite(true);
      addAlert({
        msg: `${labels[TypeSearch.Track]} eliminado de favoritos`,
        severity: "success",
      });
    } catch (error) {
      addAlert({
        msg: ":",
        severity: "error",
      });
    }
  };

  const playTrack = async () => {
    try {
      const response = await setPlayTrack(
        session?.accessToken as string,
        data.context_uri,
        data.track_number
      );

      if (response.status === 204) {
        const currentPlaying = {
          id: data.id,
          name: data.name,
          artists: data.artists.map((artist) => artist.name).join(", "),
          image: data.image || "",
          volume: 0,
        };
        setPlaying(currentPlaying);
        setPlayerState(true);
      }
    } catch (error) {
      console.error("Error al reproducir la canción:", error);
    }
  };
  return (
    <li
      onDoubleClick={playTrack}
      onMouseEnter={() => setIsViewAddSong(true)}
      onMouseLeave={() => setIsViewAddSong(false)}
      className="flex items-center space-x-4 hover:bg-white/20 rounded-md cursor-pointer p-2"
    >
      {index && <h3>{index}</h3>}
      {data?.image && (
        <Image
          src={data?.image}
          alt={data?.name}
          width={50}
          height={50}
          className="rounded-md"
        />
      )}
      <div className="flex-grow">
        <Link className="w-fit flex" href={`/track/${data?.id}`}>
          <h3 className="font-semibold hover:underline cursor-pointer">
            {data?.name}
          </h3>
        </Link>
        <div className="flex">
          {data?.artists?.map((artist, index) => (
            <Link key={index} href={`/artist/${artist?.id}`}>
              <h5 className="text-sm text-gray-400 hover:underline inline cursor-pointer">
                {artist?.name}
              </h5>
              {index !== data.artists?.length - 1 && <span>,&nbsp;</span>}
            </Link>
          ))}
        </div>
      </div>
      {isViewAddSong && favorites?.includes(data.id) ? (
        <HiCheckCircle
          onClick={removeFavorite}
          className="text-green-400 transition-all cursor-pointer"
          size={20}
        />
      ) : (
        isViewAddSong && (
          <CgAdd
            onClick={addFavoriteSong}
            size={20}
            className="cursor-pointer text-gray-300 hover:text-white hover:scale-100"
          />
        )
      )}
      {/* {isViewAddSong && (
        <CgAdd
          onClick={addFavoriteSong}
          size={20}
          className="cursor-pointer text-gray-300 hover:text-white hover:scale-100"
        />
      )} */}
      <span className="text-sm text-gray-400">
        {convertMillisecondsToMinutesAndSeconds(data?.duration_ms)}
      </span>
    </li>
  );
};
