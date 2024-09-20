import Link from "next/link";
import React from "react";

import { LuDisc, LuFrown, LuHome } from "react-icons/lu";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-white p-8">
      <div className="mb-8 relative">
        <LuDisc size={120} className="text-green-500 animate-spin-slow" />
        <LuFrown
          size={60}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
        />
      </div>
      <h1 className="text-6xl font-bold mb-4 text-center">404</h1>
      <h2 className="text-3xl font-semibold mb-6 text-center">
        ¡Oops! Esta pista no suena
      </h2>
      <p className="text-xl mb-8 text-center text-gray-400">
        Parece que la página que buscas se ha perdido en el remix.
      </p>
      <div className="flex space-x-6">
        <Link href="/">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center transition duration-300">
            <LuHome size={24} className="mr-2" />
            Ir al inicio
          </button>
        </Link>
      </div>
    </div>
  );
};
