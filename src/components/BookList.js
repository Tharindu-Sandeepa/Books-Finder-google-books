import React, { useState } from 'react';
import BookItem from './BookItem';
import Pagination from './Pagination'; 

const BookList = ({ books }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  if (!books || !books.length) return <p className="text-center">No books found.</p>;

  // Pagination 
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {currentBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
      <Pagination 
        totalItems={books.length}
        itemsPerPage={booksPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BookList;