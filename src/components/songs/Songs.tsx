"use client";

import { Pagination, SongList } from "@/components";
import { labels, Tracks, TypeSearch } from "@/interfaces/mainpage.interface";
import { searchSpotify } from "@/services/services";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";

interface Props {
  songs: string;
}

const TOTAL_PAGE_SIZE = 4;
export const Songs = ({ songs }: Props) => {
  const [results, setResults] = useState<Tracks>();
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (songs && session?.accessToken) {
      handleSearch(songs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs, session?.accessToken, pageIndex]);

  const handleSearch = async (query: string) => {
    try {
      const data = await searchSpotify(
        query,
        session?.accessToken as string,
        TypeSearch.Track,
        pageIndex * TOTAL_PAGE_SIZE,
        TOTAL_PAGE_SIZE
      );
      setResults(data.tracks);
      setTotalPages(Math.ceil(data.tracks.total / TOTAL_PAGE_SIZE));
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const handlePage = (page: number) => {
    setPageIndex(page);
  };

  const topResult = {
    id: results?.items[0]?.id || "",
    image: results?.items[0]?.album?.images[0]?.url || "",
    title: results?.items[0]?.name || "",
    type: results?.items[0]?.type || "",
    artists: results?.items[0]?.artists,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Resultado más relevante</h2>
        <div className="bg-gray-900 p-4 rounded-lg">
          <Link href={`/track/${topResult.id}`}>
            <Image
              src={topResult.image}
              alt={topResult.title}
              width={200}
              height={200}
              className="rounded-md mb-4"
            />
          </Link>
          <Link href={`/track/${topResult.id}`}>
            <h3 className="text-xl font-bold cursor-pointer">
              {topResult.title}
            </h3>
          </Link>
          <p className="text-gray-400">{labels[topResult?.type]}</p>
          <div className="flex">
            {topResult.artists?.map((artist, index) => (
              <p key={index} className="text-sm">
                {artist.name}, &nbsp;
              </p>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Canciones</h2>
          <Pagination
            currentPage={pageIndex}
            onPageChange={handlePage}
            totalPages={totalPages}
          />
        </div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-4 hover:bg-white/20 rounded-md cursor-pointer p-2">
            <span className="ml-0">#</span>
            <span className="flex-grow">Titulo</span>
            <GoClock size={20} />
          </li>
          {results?.items?.map((song, index) => {
            const data = {
              id: song?.id,
              name: song?.name,
              image: song?.album?.images[0]?.url,
              title: song?.name,
              type: song?.type,
              artists: song?.artists,
              duration_ms: song?.duration_ms,
            };
            return <SongList key={index} data={data} index={index + 1} />;
          })}
        </ul>
      </section>
    </div>
  );
};
