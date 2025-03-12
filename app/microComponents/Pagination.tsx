"use client";

import { useState } from "react";
import { PaginationProps } from "./InterfaceAndTypeData";

const Pagination = ({
  totalItems,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: PaginationProps & { onItemsPerPageChange: (value: number) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 mt-4 rounded-lg w-full">
      <div className="text-gray-600">
        Showing {startItem} to {endItem} out of {totalItems}
      </div>

      <div className="flex items-center gap-4">
        {/* Dropdown to select items per page */}
        <select
          className="p-2 border rounded"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={2}>2 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

        {/* Pagination controls */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 disabled:opacity-50"
          aria-label="Previous page"
        >
          ◀
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-2 w-7 h-7 rounded text-sm ${
              currentPage === pageNum ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            aria-label={`Page ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 disabled:opacity-50"
          aria-label="Next page"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;
