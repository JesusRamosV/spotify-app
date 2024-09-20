import { CurrentTrack, PlayerControls, Volume } from "@/components";

export const Footer = () => {
  return (
    <footer className="fixed flex justify-between bottom-0 bg-[#67A656] text-white h-[70px] w-full  md:px-[10px] shadow-xl  bg-black p-4 mt-8">
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </footer>
  );
};
