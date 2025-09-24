const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  // Calculate total number of pages needed
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render pagination if there's only one page or less
  if (totalPages <= 1) return null;

  // Calculate the range of pages to show (4 pages at a time)
  const getVisiblePages = () => {
    const visiblePageCount = 4; // Number of page buttons to display
    // Calculate starting page, ensuring it doesn't go below 1
    let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    // Calculate ending page based on starting page
    let endPage = startPage + visiblePageCount - 1;

    // Adjust if we're near the end of the page range
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePageCount + 1);
    }

    // Adjust if we're near the beginning and don't have enough pages
    if (endPage - startPage + 1 < visiblePageCount && startPage > 1) {
      startPage = Math.max(1, endPage - visiblePageCount + 1);
    }

    // Generate array of visible page numbers
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // Get the array of page numbers to display
  const visiblePages = getVisiblePages();

  return (
    // Main container - centered with flex layout and gap spacing
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous button - disabled on first page */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))} // Go to previous page, min page 1
        disabled={currentPage === 1} // Disable if on first page
        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>

      {/* Show first page and ellipsis if needed - for large page ranges */}
      {visiblePages[0] > 1 && (
        <>
          {/* First page button */}
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            1
          </button>
          {/* Ellipsis when there's a gap between first page and visible pages */}
          {visiblePages[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Visible page buttons - dynamically generated */}
      {visiblePages.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${
            // Highlight current page with different styling
            currentPage === number ? 'bg-black text-white' : 'hover:bg-gray-50'
          }`}
        >
          {number}
        </button>
      ))}

      {/* Show last page and ellipsis if needed - for large page ranges */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {/* Ellipsis when there's a gap between visible pages and last page */}
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          {/* Last page button */}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button - disabled on last page */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} // Go to next page, max totalPages
        disabled={currentPage === totalPages} // Disable if on last page
        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
