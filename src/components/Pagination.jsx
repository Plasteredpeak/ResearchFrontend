import React from "react";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPage = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const goToPreviousPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    goToPage(prevPage);
  };

  const goToNextPage = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    goToPage(nextPage);
  };

  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="btn btn-primary"
      >
        Previous
      </button>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="btn btn-primary"
      >
        Next
      </button>
    </div>
  );
}
