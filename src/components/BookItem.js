import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookItem = ({ book }) => {
  const { title, authors, imageLinks, averageRating, publishedDate, pageCount } = book.volumeInfo;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= Math.floor(rating) ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-300" />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col md:flex-row border rounded-lg shadow-lg overflow-hidden bg-white transform hover:scale-105 transition-transform duration-300 cursor-pointer"onClick={handleClick}>
      {imageLinks?.thumbnail && (
        <img
          src={imageLinks.thumbnail}
          alt={title}
          className="w-full md:w-48 h-48 md:h-72 object-cover"
        />
      )}
      <div className="flex flex-col justify-between p-4 md:p-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mb-2 md:mb-4">by {authors?.join(', ') || 'Unknown'}</p>
          <div className="flex items-center mb-2 md:mb-4">
            {renderStars(averageRating || 0)}
            <span className="ml-2 text-gray-600 text-sm md:text-base">
              {averageRating ? `(${averageRating}/5)` : 'No Ratings'}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Published:</span> {publishedDate || 'N/A'}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Pages:</span> {pageCount || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookItem;