import React from "react";
import { ArtistDetails } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export const page = ({ params }: Props) => {
  const { id } = params;
  return <ArtistDetails id={id} />;
};

export default page;
