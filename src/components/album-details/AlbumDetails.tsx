"use client";
import { PlayerControls } from "@/components/player-controls/PlayerControls";
import { SongList } from "@/components/song-list/SongList";
import { SongHeader } from "@/components/track-details/elements";
import { AlbumElement } from "@/interfaces/mainpage.interface";
import { getAlbumDetails } from "@/services/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";

interface Props {
  id: string;
}

export const AlbumDetails = ({ id }: Props) => {
  const [album, setAlbum] = useState<AlbumElement>();
  console.log("🚀 ~ TrackDetails ~ results:", album);
  const { data: session } = useSession();

  useEffect(() => {
    if (id && session?.accessToken) {
      setTimeout(() => {
        handleSearch(id);
      }, 1000);
      handleSearch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session?.accessToken]);

  const handleSearch = async (query: string) => {
    try {
      const data = await getAlbumDetails(query, session?.accessToken as string);
      setAlbum(data);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const albumHeader = {
    id: album?.id || "",
    image: album?.images[0]?.url || "",
    name: album?.name || "",
    artists: album?.artists || [],
    type: album?.album_type || "",
    release_date: album?.release_date || "",
    total_tracks: album?.total_tracks || 0,
  };

  return (
    <div className="">
      <main className="flex flex-col mx-auto px-4 py-2">
        <div className="overflow-auto p-2 bg-gradient-to-b from-gray-400 to-gray-800">
          {album && <SongHeader track={albumHeader} />}
        </div>
        <div className="px-6">
          <PlayerControls />
          <ul className="space-y-4">
            <li className="flex items-center space-x-4 hover:bg-white/20 rounded-md cursor-pointer p-2">
              <span className="ml-0">#</span>
              <span className="flex-grow">Titulo</span>
              <GoClock size={20} />
            </li>
            {album?.tracks?.items?.map((song, index) => {
              const data = {
                id: song?.id,
                name: song?.name,
                title: song?.name,
                type: song?.type,
                artists: song?.artists,
                duration_ms: song?.duration_ms,
              };

              return <SongList key={index} data={data} index={index + 1} />;
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};
