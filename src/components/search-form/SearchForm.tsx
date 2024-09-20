"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiHome, FiSearch, FiX } from "react-icons/fi";

export const SearchForm = () => {
  const router = useRouter();
  const { word } = useParams();
  const [query, setQuery] = useState(word || "");

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (window) {
      window.history.pushState(null, "", `/search/${e.target.value}`);
    }
    setTimeout(() => {
      router.push(`/search/${e.target.value}`);
    }, 500);
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <Link href="/">
        <FiHome className="text-2xl" />
      </Link>
      <div className="relative">
        <FiSearch
          size={25}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          onClick={query?.length > 0 ? () => {} : () => router.push(`/search`)}
          type="text"
          value={query}
          onChange={(e) => handleSubmit(e)}
          placeholder="¿Qué quieres reproducir?"
          className="bg-gray-800 rounded-full py-2  px-14 w-80 focus:outline-none focus:ring-2 focus:ring-white"
        />
        {query?.length > 0 && (
          <FiX
            size={25}
            onClick={() => setQuery("")}
            className="absolute right-3 hover:text-white top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
