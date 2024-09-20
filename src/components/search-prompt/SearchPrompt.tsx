import React from "react";
import { LuAlbum, LuMic2, LuMusic, LuSearch } from "react-icons/lu";

export const SearchPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center h-5/6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-8 text-white">
      <div className="mb-8 flex space-x-4">
        <LuSearch size={48} className="animate-bounce" />
        <LuMusic size={48} className="animate-pulse" />
        <LuMic2 size={48} className="animate-bounce delay-100" />
        <LuAlbum size={48} className="animate-pulse delay-200" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-center">
        ¡Descubre tu próxima canción favorita!
      </h2>
      <p className="text-xl mb-6 text-center">
        Usa la barra de búsqueda para encontrar artistas, canciones o álbumes
        increíbles.
      </p>
    </div>
  );
};
