import React from 'react';
import { useLocation } from 'react-router-dom';
import BookList from '../components/BookList';

const ShowBookListPage = () => {
  const location = useLocation();
  const books = location.state?.books || [];

  return (
    <div className="container mx-auto py-4 mt-24">
     
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <p className="text-gray-500">No books found. Try a different search.</p>
      )}
    </div>
  );
};
export default ShowBookListPage;