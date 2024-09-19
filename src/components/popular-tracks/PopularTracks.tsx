"use client";
import { SongList } from "@/components";
import { TracksItem } from "@/interfaces/mainpage.interface";
import { getPopularTracks } from "@/services/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
}

export const PopularTracks = ({ id }: Props) => {
  const [results, setResults] = useState<TracksItem[]>();
  const { data: session } = useSession();

  useEffect(() => {
    if (id && session?.accessToken) {
      handleSearch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session?.accessToken]);

  const handleSearch = async (query: string) => {
    try {
      const data = await getPopularTracks(
        query,
        session?.accessToken as string
      );
      setResults(data.tracks);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Populares</h2>

      <div className="space-y-4">
        {results?.slice(0, 5)?.map((song, index) => {
          const data = {
            id: song?.id,
            name: song?.name,
            image: song?.album?.images[0]?.url,
            title: song?.name,
            type: song?.type,
            artists: song?.artists,
            duration_ms: song?.duration_ms,
          };
          return <SongList key={index} data={data} />;
        })}
      </div>
    </div>
  );
};
