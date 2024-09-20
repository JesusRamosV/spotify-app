"use client";
import { MediaControls, SongList, SongListSkeletonWrapper } from "@/components";
import { TracksItem } from "@/interfaces/MainPage.interface";
import { getRecommendations } from "@/services/services";
import { useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  context_uri: string;
  track_number: number;
}

export const RecommendationsSection = ({
  id,
  context_uri,
  track_number,
}: Props) => {
  const [results, setResults] = useState<TracksItem[]>([]);
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
      const data = await getRecommendations(
        query,
        session?.accessToken as string
      );
      setResults(data.tracks);
    } catch (error) {
      addAlert({
        msg: "Error al buscar las canciones recomendadas",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mb-[40px] p-4">
      <MediaControls
        id={id}
        type="track"
        context_uri={context_uri}
        track_number={track_number}
      />

      <h2 className="text-white text-2xl font-bold mb-4">Recomendaciones</h2>
      <p className="text-gray-400 mb-4">Basadas en esta canción</p>
      <ul className="space-y-4">
        {isLoading && <SongListSkeletonWrapper count={5} />}
        {results.map((song, index) => {
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
      </ul>
    </div>
  );
};
