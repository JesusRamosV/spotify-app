"use client";
import { SearchForm } from "@/components/search-form/SearchForm";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa";

export const TopMenu = () => {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className=" bg-black text-white p-4 ">
      <div className=" mx-auto flex items-center justify-between">
        <Link href="/">
          <FaSpotify className="hidden sm:block" size={30} />
        </Link>
        <SearchForm />

        <div className="flex items-center space-x-4">
          <a href="https://www.spotify.com/es/download/" target="_blank">
            <button className="hidden sm:block bg-white text-black px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform">
              Instalar app
            </button>
          </a>
          <div className="relative group">
            <div>
              <Image
                src={session?.user?.image as string}
                alt="user"
                width={40}
                height={40}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="rounded-full cursor-pointer"
              />
            </div>
            {isProfileOpen && (
              <div className="absolute z-20 right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 group-hover:block">
                <button
                  onClick={async () => await signOut()}
                  className="w-full flex block px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
