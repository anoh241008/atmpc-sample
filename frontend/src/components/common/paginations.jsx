import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
    
  if (totalPages === 0) return null;

  return (
    <div className="flex items-center justify-between mt-5 text-sm">
      {/* LEFT INFO */}
      <p className="text-gray-500">
        Showing {start} to {end} of {totalItems} results
      </p>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="px-3 py-1 border rounded text-gray-500 hover:bg-gray-100"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "text-green-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() =>
            onPageChange(Math.min(currentPage + 1, totalPages))
          }
          className="px-3 py-1 border rounded text-gray-500 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}