"use client";
import React, { useEffect, useState } from "react";
import { SongListSkeletonWrapper, Tabs } from "@/components";
import { ArtistDetail } from "@/interfaces/ArtistDetail.interface";
import {
  Favorites,
  ItemsFavorites,
  tabs,
} from "@/interfaces/MainPage.interface";
import { getFavorites } from "@/services/services";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BiLibrary } from "react-icons/bi";
import { useFavoriteStore, useSnackbarStore } from "@/store";

export const Sidebar = () => {
  const { data: session } = useSession();
  const [dataResult, setDataResult] = useState<ItemsFavorites[]>();
  const [itemTypeCurrent, setItemTypeCurrent] = useState("track");
  const [isLoading, setIsLoading] = useState(false);
  const { isChangeFavorite, setIsChangeFavorite } = useFavoriteStore();
  const { addAlert } = useSnackbarStore();

  useEffect(() => {
    if (session?.accessToken) {
      setIsLoading(true);
      const fetchFavorites = async () => {
        try {
          const response = await getFavorites(
            session?.accessToken as string,
            itemTypeCurrent
          );

          if (itemTypeCurrent === "track") {
            const tracks = response?.items?.map((item: Favorites) => {
              const track = item.track;
              return {
                id: track?.id,
                name: track?.name,
                artists: track?.artists
                  ?.map((artist) => artist.name)
                  .join(", "),
                image: track?.album.images[2]?.url,
                type: "track",
              };
            });

            setDataResult(tracks);
          }
          if (itemTypeCurrent === "album") {
            const albums = response?.items?.map((item: Favorites) => {
              const album = item.album;

              return {
                id: album?.id,
                name: album?.name,
                artists: album?.artists,
                image: album?.images[2]?.url,
                type: "album",
              };
            });
            setDataResult(albums);
          }
          if (itemTypeCurrent === "artist") {
            const artists = response?.artists?.items?.map(
              (item: ArtistDetail) => {
                return {
                  id: item.id,
                  name: item.name,
                  image: item.images[2]?.url,
                  type: "artist",
                };
              }
            );
            setDataResult(artists);
          }
        } catch (error) {
          addAlert({
            msg: "Error al obtener las canciones favoritas",
            severity: "error",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchFavorites();

      if (isChangeFavorite) {
        fetchFavorites();
        setIsChangeFavorite(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemTypeCurrent, session?.accessToken, isChangeFavorite]);

  const handleViewFavorite = (itemType: string) => {
    setItemTypeCurrent(itemType);
  };

  return (
    <div className="bg-black text-gray-300 w-76 flex flex-col hidden sm:block">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BiLibrary className="h-6 w-6" />
            <span className="font-semibold">Tu biblioteca</span>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <Tabs
            tabs={tabs}
            onChange={handleViewFavorite}
            itemTypeCurrent={itemTypeCurrent}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 max-h-[60vh]">
        <div className=" border-t border-gray-800 pt-8">
          <div className="space-y-2 px-4">
            {isLoading && <SongListSkeletonWrapper count={10} />}
            {dataResult?.map((data, index) => (
              <div className="w-56 rounded-lg hover:bg-white/50" key={index}>
                <Link
                  href={`/${itemTypeCurrent}/${data?.id}`}
                  className="flex items-center block py-2 text-sm text-gray-400 hover:text-white"
                >
                  <Image
                    src={data?.image}
                    alt={data?.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <h4 className="text-[16px] font-bold text-white hover:underline cursor-pointer ml-2">
                    {data?.name}
                  </h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
