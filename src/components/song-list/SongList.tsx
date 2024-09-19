"use client";
import { convertMillisecondsToMinutesAndSeconds } from "@/app/global/helpers";
import { Artist } from "@/interfaces/MainPage.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    id: string;
    name: string;
    duration_ms: number;
    artists: Artist[];
    image?: string;
  };
  index?: number;
}

export const SongList = ({ data, index }: Props) => {
  return (
    <li className="flex items-center space-x-4 hover:bg-white/20 rounded-md cursor-pointer p-2">
      {index && <h3>{index}</h3>}
      {data?.image && (
        <Image
          src={data?.image}
          alt={data?.name}
          width={50}
          height={50}
          className="rounded-md"
        />
      )}
      <div className="flex-grow">
        <Link href={`/track/${data?.id}`}>
          <h3 className="font-semibold hover:underline cursor-pointer">
            {data?.name}
          </h3>
        </Link>
        <div className="flex">
          {data?.artists?.map((artist, index) => (
            <Link key={index} href={`/artist/${artist?.id}`}>
              <h5 className="text-sm text-gray-400 hover:underline inline cursor-pointer">
                {data?.name}
              </h5>
              {index !== data.artists?.length - 1 && <span>,&nbsp;</span>}
            </Link>
          ))}
        </div>
      </div>
      <span className="text-sm text-gray-400">
        {convertMillisecondsToMinutesAndSeconds(data?.duration_ms)}
      </span>
    </li>
  );
};
