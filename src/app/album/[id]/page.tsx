import { AlbumDetails } from "@/components";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const AlbumsPage = ({ params }: Props) => {
  const { id } = params;
  return <AlbumDetails id={id} />;
};

export default AlbumsPage;
