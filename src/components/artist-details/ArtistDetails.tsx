"use client";
import { ArtistAlbums, PopularTracks } from "@/components";
import { ArtistDetail } from "@/interfaces/ArtistDetail.interface";
import { getArtistDetails } from "@/services/services";
import { useSnackbarStore } from "@/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

interface Props {
  id: string;
}

export const ArtistDetails = ({ id }: Props) => {
  const [results, setResults] = useState<ArtistDetail>();
  const { data: session } = useSession();
  const { addAlert } = useSnackbarStore();

  useEffect(() => {
    if (id && session?.accessToken) {
      handleSearch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session?.accessToken]);

  const handleSearch = async (query: string) => {
    try {
      const data = await getArtistDetails(
        query,
        session?.accessToken as string
      );
      setResults(data);
    } catch (error) {
      addAlert({
        msg: "Error obteniendo los detalles del artista",
        severity: "error",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white  ">
      <div className="relative  h-80 mb-6">
        {results?.images.slice(0, 1).map((image, index) => (
          <Image
            key={index}
            src={image.url}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            quality={100}
            alt="Artist Header"
            className=" bg-center bg-cover bg-blend-multiply opacity-70 "
          />
        ))}
        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent w-full">
          <div className="flex items-center mb-2">
            <MdVerified className="text-cyan-400 text-2xl mr-2" />
            <span className="text-sm font-medium">Artista verificado</span>
          </div>
          <h1 className="text-7xl font-bold mb-2">{results?.name}</h1>
          <p className="text-sm">
            {results?.followers.total.toLocaleString("es-ES")} de seguidores
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        <PopularTracks id={id} />
        <ArtistAlbums albums={id} />
      </div>
    </div>
  );
};
