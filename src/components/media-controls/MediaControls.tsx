"use client";
import { ArtistDetail } from "@/interfaces/ArtistDetail.interface";
import { Favorites, labels } from "@/interfaces/MainPage.interface";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  setChangeState,
} from "@/services/services";
import { useFavoriteStore, usePlayerStore, useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { CgAdd } from "react-icons/cg";
import { HiCheckCircle } from "react-icons/hi";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";

interface Props {
  id: string;
  type: string;
  context_uri?: string;
  track_number?: number;
}

export const MediaControls = ({
  id,
  type,
  context_uri,
  track_number,
}: Props) => {
  const { data: session } = useSession();
  const { addAlert } = useSnackbarStore();
  const {
    tracksFavorites,
    isChangeFavorite,
    setIsChangeFavorite,
    setTracksFavorites,
    setAlbumsFavorites,
    setArtistsFavorites,
    artistsFavorites,
    albumsFavorites,
  } = useFavoriteStore();
  const { currentPlaying } = usePlayerStore();

  const changeState = async (state: boolean) => {
    await setChangeState(
      session?.accessToken as string,
      state,
      context_uri,
      track_number
    );
  };

  useEffect(() => {
    if (session?.accessToken) {
      const fetchFavorites = async () => {
        try {
          const response = await getFavorites(
            session?.accessToken as string,
            type
          );

          if (type === "tracks") {
            const tracks = response?.items?.map((item: Favorites) => {
              const track = item.track;
              return track?.id;
            });

            setTracksFavorites(tracks);
          }
          if (type === "album") {
            const albums = response?.items?.map((item: Favorites) => {
              const album = item.album;

              return album?.id;
            });
            setAlbumsFavorites(albums);
          }
          if (type === "artist") {
            const artists = response?.artists?.items?.map(
              (item: ArtistDetail) => {
                return item.id;
              }
            );
            setArtistsFavorites(artists);
          }
        } catch (error) {
          addAlert({
            msg: "Error al obtener las canciones favoritas",
            severity: "error",
          });
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
  }, [type, session?.accessToken, isChangeFavorite]);

  const addFavorite = async () => {
    try {
      await addToFavorites(session?.accessToken as string, id, type);

      setIsChangeFavorite(true);
      addAlert({
        msg: `${labels[type]} añadido a favoritos`,
        severity: "success",
      });
    } catch (error) {
      addAlert({
        msg: "Error al agregar a favoritos",
        severity: "error",
      });
    }
  };

  const removeFavorite = async () => {
    try {
      await removeFromFavorites(session?.accessToken as string, id, type);

      setIsChangeFavorite(true);
      addAlert({
        msg: `${labels[type]} eliminado de favoritos`,
        severity: "success",
      });
    } catch (error) {
      addAlert({
        msg: ":",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-8">
      <div>
        {!currentPlaying?.pausing && id === currentPlaying?.id ? (
          <IoPauseCircleSharp
            onClick={() => changeState(false)}
            size={60}
            className="cursor-pointer text-green-500 hover:scale-110"
          />
        ) : (
          <IoPlayCircleSharp
            className="cursor-pointer text-green-500 hover:scale-110"
            onClick={() => changeState(true)}
            size={60}
          />
        )}
      </div>
      {type === "album" || type === "track" ? (
        <div>
          {type === "track" ? (
            tracksFavorites?.includes(id)
          ) : albumsFavorites?.includes(id) ? (
            <HiCheckCircle
              onClick={removeFavorite}
              className="text-green-400 transition-all cursor-pointer"
              size={34}
            />
          ) : (
            <CgAdd
              onClick={addFavorite}
              size={34}
              className="cursor-pointer text-gray-300 hover:text-white hover:scale-100"
            />
          )}
        </div>
      ) : (
        <button
          onClick={
            artistsFavorites?.includes(id) ? removeFavorite : addFavorite
          }
          className="border border-gray-300 text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition"
        >
          {artistsFavorites?.includes(id) ? "Siguiendo" : "Seguir"}
        </button>
      )}
    </div>
  );
};
