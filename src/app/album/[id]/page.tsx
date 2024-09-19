import { AlbumDetails } from "@/components";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params }: Props) => {
  const { id } = params;
  return <AlbumDetails id={id} />;
};

export default page;
