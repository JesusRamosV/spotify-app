"use client";

import { Pagination as PaginationLib } from "flowbite-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  console.log(currentPage, totalPages);

  return (
    <div className="flex overflow-x-auto ml-auto sm:justify-center">
      <PaginationLib
        layout="navigation"
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel=""
        nextLabel=""
        showIcons
      />
    </div>
  );
};
