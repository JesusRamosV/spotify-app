import React from "react";
import { ArtistDetails } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;
  return <ArtistDetails id={id} />;
}
