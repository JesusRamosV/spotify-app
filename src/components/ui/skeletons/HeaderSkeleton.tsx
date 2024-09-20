"use client";

import React from "react";

export const HeaderSkeleton = () => {
  return (
    <div className="flex items-start animate-pulse">
      <div className="w-[170px]  bg-gray-300 rounded-full sm:rounded-md"></div>
      <div className="ml-6 mt-auto">
        <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-8 sm:h-12 bg-gray-300 rounded mb-2"></div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-28 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};
