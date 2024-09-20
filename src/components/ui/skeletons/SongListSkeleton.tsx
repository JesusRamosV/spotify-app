"use client";

import React from "react";

interface Props {
  showIndex?: boolean;
}

export const SongListSkeleton = ({ showIndex = false }: Props) => {
  return (
    <li className="flex items-center space-x-4 hover:bg-white/20 rounded-md p-2 animate-pulse">
      {showIndex && <div className="w-4 h-4 bg-gray-300 rounded-full"></div>}
      <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
      <div className="flex-grow">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
      </div>
      <div className="w-10 h-4 bg-gray-300 rounded"></div>
    </li>
  );
};

export const SongListSkeletonWrapper = ({ count = 4 }: { count?: number }) => {
  return (
    <ul>
      {[...Array(count)].map((_, index) => (
        <SongListSkeleton key={index} showIndex={index !== undefined} />
      ))}
    </ul>
  );
};
