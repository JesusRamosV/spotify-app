import React from "react";
import { Songs, ArtistsList, AlbumsList } from "@/components";

interface Props {
  wordSearch: string;
}

export const SearchList = ({ wordSearch }: Props) => {
  return (
    <div className="bg-black text-white flex-1 overflow-y-auto p-6">
      <Songs songs={wordSearch} />

      <ArtistsList artists={wordSearch} />

      <AlbumsList albums={wordSearch} />
    </div>
  );
};
