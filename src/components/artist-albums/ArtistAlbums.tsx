"use client";
import { AlbumsCards, Pagination } from "@/components";
import { Albums } from "@/interfaces/MainPage.interface";
import { getAlbumsArtist } from "@/services/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  albums: string;
}

const TOTAL_PAGE_SIZE = 8;

export const ArtistAlbums = ({ albums }: Props) => {
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
      const data = await getAlbumsArtist(
        query,
        session?.accessToken as string,
        TOTAL_PAGE_SIZE,
        pageIndex * TOTAL_PAGE_SIZE
      );
      setResults(data);
      setTotalPages(Math.ceil(data.total / TOTAL_PAGE_SIZE));
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  const handlePage = (page: number) => {
    setPageIndex(page - 1);
  };

  return (
    <section className="mt-8 mb-32">
      <div className="flex items-center pb-2">
        <h2 className="text-2xl font-bold ">Discografía</h2>
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
