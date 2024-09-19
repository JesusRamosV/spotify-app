import { AlbumElement } from "@/interfaces/MainPage.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  albums: AlbumElement[];
}

export const AlbumsCards = ({ albums }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {albums?.map((album, index) => (
        <Link href={`/album/${album.id}`} key={index}>
          <div
            className="hover:bg-white/20 rounded-md cursor-pointer"
            key={index}
          >
            <div className="w-full flex items-center justify-center">
              <Image
                src={album.images[0]?.url}
                alt={album.name}
                width={150}
                height={150}
                className="rounded-md my-2"
              />
            </div>
            <div className="px-4">
              <h3 className="text-md font-semibold truncate">{album.name}</h3>
              <div className="flex flex-wrap px-2">
                <p className="text-[12px] text-gray-400 truncate">
                  {`${album.release_date}`.split("-")[0]} •
                </p>
                <p className="flex flex-wrap text-[12px] text-gray-400 ">
                  {album.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
