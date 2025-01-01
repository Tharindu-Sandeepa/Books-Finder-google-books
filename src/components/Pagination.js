import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-6">
      <nav>
        <ul className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className="flex items-center">
              <button
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;