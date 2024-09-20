"use client";
import { MediaControls, SongList, SongListSkeletonWrapper } from "@/components";
import { TracksItem } from "@/interfaces/MainPage.interface";
import { getPopularTracks } from "@/services/services";
import { useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
}

export const PopularTracks = ({ id }: Props) => {
  const [results, setResults] = useState<TracksItem[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { addAlert } = useSnackbarStore();

  useEffect(() => {
    if (id && session?.accessToken) {
      handleSearch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session?.accessToken]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await getPopularTracks(
        query,
        session?.accessToken as string
      );
      setResults(data.tracks);
    } catch (error) {
      addAlert({
        msg: "Error al buscar las canciones mas populares",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <MediaControls id={id} type="artist" />
      <h2 className="text-2xl font-bold mb-4">Populares</h2>

      <div className="space-y-4">
        {isLoading && <SongListSkeletonWrapper count={5} />}
        {results?.slice(0, 5)?.map((song, index) => {
          const data = {
            id: song?.id,
            name: song?.name,
            image: song?.album?.images[0]?.url,
            title: song?.name,
            type: song?.type,
            artists: song?.artists,
            duration_ms: song?.duration_ms,
            context_uri: song?.album?.uri,
            track_number: song?.track_number,
          };
          return <SongList key={index} data={data} />;
        })}
      </div>
    </div>
  );
};
