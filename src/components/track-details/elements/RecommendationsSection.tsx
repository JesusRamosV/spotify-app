"use client";
import { SongList } from "@/components/song-list/SongList";
import { TracksItem } from "@/interfaces/MainPage.interface";
import { getRecommendations } from "@/services/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}

export const RecommendationsSection = ({ id }: Props) => {
  const [results, setResults] = useState<TracksItem[]>([]);
  console.log("🚀 ~ RecommendationsSection ~ results:", results);
  const { data: session } = useSession();

  useEffect(() => {
    if (id && session?.accessToken) {
      handleSearch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session?.accessToken]);

  const handleSearch = async (query: string) => {
    try {
      const data = await getRecommendations(
        query,
        session?.accessToken as string
      );
      setResults(data.tracks);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };
  return (
    <div className="mb-[40px] p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Recomendaciones</h2>
      <p className="text-gray-400 mb-4">Basadas en esta canción</p>
      <ul className="space-y-4">
        {results.map((song, index) => {
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
      </ul>
    </div>
  );
};
