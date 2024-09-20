import { AlbumDetails } from "@/components";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;
  return <AlbumDetails id={id} />;
}
