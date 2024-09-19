import React from "react";
import { Tabs, Songs, ArtistsList, AlbumsList } from "@/components";

interface Props {
  wordSearch: string;
}

export const SearchList = ({ wordSearch }: Props) => {
  const tabs = [
    "Todo",
    "Canciones",
    "Playlists",
    "Álbumes",
    "Perfiles",
    "Artistas",
    "Podcasts y programas",
  ];

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <Tabs tabs={tabs} />

      <Songs songs={wordSearch} />

      <ArtistsList artists={wordSearch} />

      <AlbumsList albums={wordSearch} />
    </div>
  );
};
