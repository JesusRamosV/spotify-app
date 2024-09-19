import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoPlayCircleSharp } from "react-icons/io5";

export const PlayerControls = () => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <button className=" text-black font-semibold p-3 rounded-full hover:scale-105 transition">
        <IoPlayCircleSharp className=" text-green-500 w-14 h-14" />
      </button>
      <button className="border border-gray-300 text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition">
        Seguir
      </button>
      <button className="text-white hover:text-gray-300">
        <FiMoreHorizontal className="w-8 h-8" />
      </button>
    </div>
  );
};
