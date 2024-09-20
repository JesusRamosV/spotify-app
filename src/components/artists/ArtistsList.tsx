"use client";
import { Pagination } from "@/components";
import { Artists, TypeSearch } from "@/interfaces/MainPage.interface";
import { searchSpotify } from "@/services/services";
import { useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  artists: string;
}

const TOTAL_PAGE_SIZE = 8;

export const ArtistsList = ({ artists }: Props) => {
  const [results, setResults] = useState<Artists>();
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { data: session } = useSession();
  const { addAlert } = useSnackbarStore();

  useEffect(() => {
    if (artists && session?.accessToken) {
      setTimeout(() => {
        handleSearch(artists);
      }, 1000);
      handleSearch(artists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artists, session?.accessToken, pageIndex]);

  const handleSearch = async (query: string) => {
    try {
      const data = await searchSpotify(
        query,
        session?.accessToken as string,
        TypeSearch.Artists,
        pageIndex * TOTAL_PAGE_SIZE,
        TOTAL_PAGE_SIZE
      );
      setResults(data.artists);
      setTotalPages(Math.ceil(data.artists.total / TOTAL_PAGE_SIZE));
    } catch (error) {
      addAlert({
        msg: "Error al buscar el listado de artistas",
        severity: "error",
      });
    }
  };

  const handlePage = (page: number) => {
    setPageIndex(page);
  };

  return (
    <section className="mt-8">
      <div className="flex items-center pb-2">
        <h2 className="text-2xl font-bold ">Artistas</h2>
        <Pagination
          currentPage={pageIndex}
          onPageChange={handlePage}
          totalPages={totalPages}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {results?.items?.map((artist, index) => (
          <Link key={index} href={`/artist/${artist.id}`}>
            <div className="text-center hover:bg-white/20 rounded-md cursor-pointer p-2">
              <Image
                src={artist.images[0]?.url}
                alt={artist?.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-2"
              />
              <h3 className="font-semibold">{artist.name}</h3>
              <p className="text-sm text-gray-400">{artist.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
