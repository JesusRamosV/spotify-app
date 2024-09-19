"use client";
import {
  RecommendationsSection,
  SongHeader,
} from "@/components/track-details/elements";
import { TracksItem } from "@/interfaces/mainpage.interface";
import { getTrackDetails } from "@/services/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
}

export const TrackDetails = ({ id }: Props) => {
  const [track, setTrack] = useState<TracksItem>();
  console.log("🚀 ~ TrackDetails ~ results:", track);
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
      const data = await getTrackDetails(query, session?.accessToken as string);
      setTrack(data);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const songHeader = {
    id: track?.id || "",
    image: track?.album.images[0]?.url || "",
    name: track?.name || "",
    artists: track?.artists || [],
    type: track?.type || "",
    release_date: track?.album?.release_date || "",
  };
  return (
    <div className="">
      <main className="flex flex-col mx-auto px-4 py-2">
        <div className="overflow-auto p-2 bg-gradient-to-b from-gray-400 to-gray-800">
          {track && <SongHeader track={songHeader} />}
        </div>

        <RecommendationsSection id={id} />
      </main>
    </div>
  );
};
