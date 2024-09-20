import { convertMillisecondsToMinutesAndSeconds } from "@/global/helpers";
import { Artist, labels } from "@/interfaces/MainPage.interface";
import Image from "next/image";

interface Props {
  track: {
    id: string;
    name: string;
    image: string;
    artists: Artist[];
    duration_ms?: number;
    type: string;
    release_date: Date | string;
    total_tracks?: number;
  };
}

export const SongHeader = ({ track }: Props) => {
  return (
    <div className="flex items-start">
      <Image
        src={track.image}
        alt={track.name}
        width={170}
        height={170}
        className="rounded-full sm:rounded-md shadow-2xl"
      />
      <div className="ml-6 mt-auto">
        <p className="text-white text-sm">{labels[track?.type]}</p>
        <h1 className="text-white text-xl sm:text-6xl font-bold mt-1">
          {track.name}
        </h1>
        <div className="flex items-center text-gray-300 mt-2">
          <h3 className="font-bold">{track?.artists?.[0].name}</h3> •
          <h3 className="text-sm">{track?.name}</h3> •{" "}
          <h3>{`${track?.release_date}`.split("-")[0]} •</h3>
          <h3>
            {track.duration_ms &&
              `${convertMillisecondsToMinutesAndSeconds(track?.duration_ms)}•`}
            {track.total_tracks && ` ${track.total_tracks} canciones `}
          </h3>
        </div>
      </div>
    </div>
  );
};
