import { useState, useEffect } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  fetchData: (offset: number, limit: number) => Promise<void>;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  fetchData,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  useEffect(() => {
    fetchData(currentPage * itemsPerPage, itemsPerPage);
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalItems, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page - 1);
  };

  return {
    currentPage,
    totalPages,
    goToPage,
  };
};
