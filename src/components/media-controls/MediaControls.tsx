"use client";
import { ArtistDetail } from "@/interfaces/ArtistDetail.interface";
import { Favorites, labels } from "@/interfaces/MainPage.interface";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/services/services";
import { useFavoriteStore, useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { CgAdd } from "react-icons/cg";
import { HiCheckCircle } from "react-icons/hi";
import { IoPlayCircleSharp } from "react-icons/io5";

interface Props {
  id: string;
  type: string;
}

export const MediaControls = ({ id, type }: Props) => {
  const { data: session } = useSession();
  const { addAlert } = useSnackbarStore();
  const { favorites, isChangeFavorite, setIsChangeFavorite, setFavorites } =
    useFavoriteStore();

  useEffect(() => {
    if (session?.accessToken) {
      const fetchFavorites = async () => {
        try {
          const response = await getFavorites(
            session?.accessToken as string,
            type
          );

          if (type === "track") {
            const tracks = response?.items?.map((item: Favorites) => {
              const track = item.track;
              return track?.id;
            });

            setFavorites(tracks);
          }
          if (type === "album") {
            const albums = response?.items?.map((item: Favorites) => {
              const album = item.album;

              return album?.id;
            });
            setFavorites(albums);
          }
          if (type === "artist") {
            const artists = response?.artists?.items?.map(
              (item: ArtistDetail) => {
                return item.id;
              }
            );
            setFavorites(artists);
          }
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
      console.error("Error al agregar a favoritos:", error);
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
      <button className=" text-black font-semibold p-3 rounded-full hover:scale-105 transition">
        <IoPlayCircleSharp className="text-[#61e055] w-14 h-14" />
      </button>
      {type === "album" || type === "track" ? (
        <div>
          {favorites?.includes(id) ? (
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
          onClick={favorites?.includes(id) ? removeFavorite : addFavorite}
          className="border border-gray-300 text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition"
        >
          {favorites?.includes(id) ? "Siguiendo" : "Seguir"}
        </button>
      )}
    </div>
  );
};
