"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiHome, FiSearch } from "react-icons/fi";

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
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          onClick={query?.length > 0 ? () => {} : () => router.push(`/search`)}
          type="text"
          value={query}
          onChange={(e) => handleSubmit(e)}
          placeholder="¿Qué quieres reproducir?"
          className="bg-gray-800 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
    </div>
  );
};
