import { TrackDetails } from "@/components";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function TrackPage({ params }: Props) {
  const { id } = params;
  return (
    <>
      <TrackDetails id={id} />
    </>
  );
}
