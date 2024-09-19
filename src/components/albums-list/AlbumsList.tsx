"use client";
import { AlbumsCards, Pagination } from "@/components";
import { Albums, TypeSearch } from "@/interfaces/MainPage.interface";
import { searchSpotify } from "@/services/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  albums: string;
}

const TOTAL_PAGE_SIZE = 8;

export const AlbumsList = ({ albums }: Props) => {
  const [results, setResults] = useState<Albums>();
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (albums && session?.accessToken) {
      setTimeout(() => {
        handleSearch(albums);
      }, 1000);
      handleSearch(albums);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albums, session?.accessToken, pageIndex]);

  const handleSearch = async (query: string) => {
    try {
      const data = await searchSpotify(
        query,
        session?.accessToken as string,
        TypeSearch.Albums,
        pageIndex * TOTAL_PAGE_SIZE,
        TOTAL_PAGE_SIZE
      );
      setResults(data.albums);
      setTotalPages(Math.ceil(data.albums.total / TOTAL_PAGE_SIZE));
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const handlePage = (page: number) => {
    setPageIndex(page);
  };

  return (
    <section className="mt-8">
      <div className="flex items-center pb-2">
        <h2 className="text-2xl font-bold ">Álbumes</h2>
        <Pagination
          currentPage={pageIndex}
          onPageChange={handlePage}
          totalPages={totalPages}
        />
      </div>

      {results?.items && <AlbumsCards albums={results?.items} />}
    </section>
  );
};
